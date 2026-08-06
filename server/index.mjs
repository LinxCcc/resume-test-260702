import { createReadStream, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes } from 'node:crypto'
import {
  createSessionToken,
  verifyPassword,
  verifySessionToken
} from './auth.mjs'

const serverDirectory = fileURLToPath(new URL('.', import.meta.url))
const siteDirectory = resolve(
  process.env.SITE_DIRECTORY ||
    fileURLToPath(new URL('../client/', import.meta.url))
)
const loginAssetDirectory = resolve(serverDirectory, 'public')
const loginTemplate = readFileSync(
  resolve(serverDirectory, 'login.html'),
  'utf8'
)

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '127.0.0.1'
const accessPasswordHash = process.env.ACCESS_PASSWORD_HASH || ''
const sessionSecret = process.env.SESSION_SECRET || ''
const passwordVersion = process.env.PASSWORD_VERSION || '1'
const sessionTtlSeconds = Number(process.env.SESSION_TTL_SECONDS || 43200)
const cookieSecure = process.env.COOKIE_SECURE !== 'false'
const trustProxy = process.env.TRUST_PROXY === 'true'
const icpNumber = process.env.ICP_NUMBER || '沪ICP备2026037911号-1'
const cookieName = 'resume_session'

if (!accessPasswordHash) {
  throw new Error('ACCESS_PASSWORD_HASH is required')
}

if (sessionSecret.length < 32) {
  throw new Error('SESSION_SECRET must contain at least 32 characters')
}

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2']
])

const loginAttempts = new Map()
const attemptWindowMs = 10 * 60 * 1000
const blockDurationMs = 30 * 60 * 1000
const maximumFailures = 10

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }

    return entities[character]
  })

const commonHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
}

const setCommonHeaders = (response, contentSecurityPolicy) => {
  Object.entries(commonHeaders).forEach(([name, value]) => {
    response.setHeader(name, value)
  })
  response.setHeader('Content-Security-Policy', contentSecurityPolicy)

  if (cookieSecure) {
    response.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )
  }
}

const parseCookies = (request) => {
  const cookies = new Map()

  for (const item of (request.headers.cookie || '').split(';')) {
    const separatorIndex = item.indexOf('=')

    if (separatorIndex < 0) {
      continue
    }

    const name = item.slice(0, separatorIndex).trim()
    const rawValue = item.slice(separatorIndex + 1).trim()

    try {
      cookies.set(name, decodeURIComponent(rawValue))
    } catch {
      cookies.set(name, rawValue)
    }
  }

  return cookies
}

const isAuthenticated = (request) =>
  verifySessionToken({
    token: parseCookies(request).get(cookieName),
    secret: sessionSecret,
    passwordVersion
  })

const getClientIp = (request) => {
  if (trustProxy) {
    const forwardedIp = request.headers['x-real-ip']

    if (typeof forwardedIp === 'string' && forwardedIp.length <= 64) {
      return forwardedIp
    }
  }

  return request.socket.remoteAddress || 'unknown'
}

const getAttemptState = (ipAddress) => {
  const now = Date.now()
  const current = loginAttempts.get(ipAddress)

  if (current?.blockedUntil > now) {
    return current
  }

  if (
    !current ||
    current.blockedUntil > 0 ||
    current.windowStartedAt + attemptWindowMs < now
  ) {
    const freshState = {
      blockedUntil: 0,
      failures: 0,
      windowStartedAt: now
    }
    loginAttempts.set(ipAddress, freshState)
    return freshState
  }

  return current
}

const recordFailedAttempt = (ipAddress) => {
  const state = getAttemptState(ipAddress)
  state.failures += 1

  if (state.failures >= maximumFailures) {
    state.blockedUntil = Date.now() + blockDurationMs
  }

  return state
}

const clearAttempts = (ipAddress) => {
  loginAttempts.delete(ipAddress)
}

const readJsonBody = async (request) =>
  new Promise((resolveBody, rejectBody) => {
    const chunks = []
    let length = 0

    request.on('data', (chunk) => {
      length += chunk.length

      if (length > 4096) {
        rejectBody(new Error('Request body is too large'))
        request.destroy()
        return
      }

      chunks.push(chunk)
    })

    request.on('end', () => {
      try {
        resolveBody(
          JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        )
      } catch {
        rejectBody(new Error('Invalid JSON body'))
      }
    })

    request.on('error', rejectBody)
  })

const sendJson = (response, statusCode, value) => {
  setCommonHeaders(
    response,
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
  )
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8'
  })
  response.end(JSON.stringify(value))
}

const redirect = (response, location) => {
  setCommonHeaders(
    response,
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
  )
  response.writeHead(302, {
    'Cache-Control': 'no-store',
    Location: location
  })
  response.end()
}

const sendLoginPage = (response) => {
  const nonce = randomBytes(18).toString('base64url')
  const renderedPage = loginTemplate
    .replaceAll('__SCRIPT_NONCE__', nonce)
    .replaceAll('__ICP_NUMBER__', escapeHtml(icpNumber))
    .replaceAll('__ICP_VISIBILITY__', icpNumber ? 'block' : 'none')

  setCommonHeaders(
    response,
    [
      "default-src 'self'",
      `script-src 'nonce-${nonce}'`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; ')
  )
  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': 'text/html; charset=utf-8'
  })
  response.end(renderedPage)
}

const safeFilePath = (baseDirectory, requestPath) => {
  const decodedPath = decodeURIComponent(requestPath)
  const relativePath = decodedPath.replace(/^\/+/, '')
  const candidate = resolve(baseDirectory, relativePath)

  if (
    candidate !== baseDirectory &&
    !candidate.startsWith(`${baseDirectory}${sep}`)
  ) {
    return null
  }

  return candidate
}

const sendFile = (request, response, filePath, isPrivate = true) => {
  let fileStats

  try {
    fileStats = statSync(filePath)
  } catch {
    return false
  }

  if (!fileStats.isFile()) {
    return false
  }

  setCommonHeaders(
    response,
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; ')
  )
  response.writeHead(200, {
    'Cache-Control': isPrivate
      ? 'private, no-store'
      : 'public, max-age=86400',
    'Content-Length': fileStats.size,
    'Content-Type':
      contentTypes.get(extname(filePath).toLowerCase()) ||
      'application/octet-stream',
    'Last-Modified': fileStats.mtime.toUTCString()
  })

  if (request.method === 'HEAD') {
    response.end()
    return true
  }

  createReadStream(filePath).pipe(response)
  return true
}

const cleanReturnTo = (value) => {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.startsWith('/api/') ||
    value.startsWith('/login')
  ) {
    return '/loading'
  }

  return value
}

const handleLogin = async (request, response) => {
  const ipAddress = getClientIp(request)
  const state = getAttemptState(ipAddress)

  if (state.blockedUntil > Date.now()) {
    sendJson(response, 429, {
      message: '尝试次数过多，请稍后再试。'
    })
    return
  }

  try {
    const body = await readJsonBody(request)
    const password =
      typeof body.password === 'string' ? body.password.slice(0, 256) : ''
    const passwordMatches = await verifyPassword(
      password,
      accessPasswordHash
    )

    if (!passwordMatches) {
      const failedState = recordFailedAttempt(ipAddress)

      if (failedState.blockedUntil > Date.now()) {
        sendJson(response, 429, {
          message: '错误次数已达上限，请30分钟后再试。'
        })
      } else {
        sendJson(response, 401, {
          message: '邀请码不正确，请重新输入。'
        })
      }
      return
    }

    clearAttempts(ipAddress)
    const token = createSessionToken({
      secret: sessionSecret,
      passwordVersion,
      ttlSeconds: sessionTtlSeconds
    })
    const secureAttribute = cookieSecure ? '; Secure' : ''
    response.setHeader(
      'Set-Cookie',
      `${cookieName}=${encodeURIComponent(token)}; HttpOnly${secureAttribute}; SameSite=Strict; Path=/; Max-Age=${sessionTtlSeconds}`
    )
    sendJson(response, 200, {
      redirectTo: cleanReturnTo(body.returnTo)
    })
  } catch {
    sendJson(response, 400, {
      message: '请求格式不正确，请刷新后重试。'
    })
  }
}

const requestHandler = async (request, response) => {
  const requestUrl = new URL(request.url || '/', 'http://localhost')
  const pathname = requestUrl.pathname

  if (request.method === 'POST' && pathname === '/api/auth/login') {
    await handleLogin(request, response)
    return
  }

  if (request.method === 'POST' && pathname === '/api/auth/logout') {
    const secureAttribute = cookieSecure ? '; Secure' : ''
    response.setHeader(
      'Set-Cookie',
      `${cookieName}=; HttpOnly${secureAttribute}; SameSite=Strict; Path=/; Max-Age=0`
    )
    sendJson(response, 200, { ok: true })
    return
  }

  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    pathname.startsWith('/login-assets/')
  ) {
    const assetPath = safeFilePath(
      loginAssetDirectory,
      pathname.replace('/login-assets/', '/')
    )

    if (assetPath && sendFile(request, response, assetPath, false)) {
      return
    }
  }

  const authenticated = isAuthenticated(request)

  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    (pathname === '/login' || (pathname === '/' && !authenticated))
  ) {
    sendLoginPage(response)
    return
  }

  if (pathname === '/api/auth/status') {
    sendJson(response, authenticated ? 200 : 401, {
      authenticated
    })
    return
  }

  if (!authenticated) {
    const acceptsHtml = request.headers.accept?.includes('text/html')

    if (acceptsHtml && (request.method === 'GET' || request.method === 'HEAD')) {
      redirect(response, `/login?returnTo=${encodeURIComponent(pathname)}`)
    } else {
      sendJson(response, 401, { message: 'Unauthorized' })
    }
    return
  }

  if (pathname === '/' || pathname === '/login') {
    redirect(response, '/loading')
    return
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendJson(response, 405, { message: 'Method not allowed' })
    return
  }

  const requestedFile = safeFilePath(siteDirectory, pathname)

  if (requestedFile && sendFile(request, response, requestedFile)) {
    return
  }

  const acceptsHtml = request.headers.accept?.includes('text/html')
  const fallbackFile = resolve(siteDirectory, 'index.html')

  if (acceptsHtml && sendFile(request, response, fallbackFile)) {
    return
  }

  sendJson(response, 404, { message: 'Not found' })
}

const server = createServer((request, response) => {
  requestHandler(request, response).catch(() => {
    if (!response.headersSent) {
      sendJson(response, 500, { message: 'Internal server error' })
    } else {
      response.destroy()
    }
  })
})

server.listen(port, host, () => {
  console.log(`Resume server listening on http://${host}:${port}`)
})
