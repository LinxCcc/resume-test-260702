import { readdir } from 'node:fs/promises'

const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000'
const password = process.env.TEST_ACCESS_PASSWORD

if (!password) {
  throw new Error('TEST_ACCESS_PASSWORD is required')
}

const checks = []
const check = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }

  checks.push(message)
}

const privateAsset = (
  await readdir(new URL('../dist/client/assets/', import.meta.url))
).find((fileName) => fileName.endsWith('.js'))

const loginPage = await fetch(`${baseUrl}/login`, {
  redirect: 'manual'
})
check(loginPage.status === 200, '公开登录页可以访问')
const loginPageMarkup = await loginPage.text()
check(
  loginPageMarkup.includes('id="invite-form"'),
  '登录页包含邀请码表单'
)
check(
  loginPageMarkup.includes('/login-assets/welcome.css'),
  '登录页加载共享欢迎页样式'
)

const welcomeStyles = await fetch(`${baseUrl}/login-assets/welcome.css`)
check(welcomeStyles.status === 200, '共享欢迎页样式可以公开加载')

const protectedPage = await fetch(`${baseUrl}/about`, {
  headers: { Accept: 'text/html' },
  redirect: 'manual'
})
check(protectedPage.status === 302, '未登录访问页面会被重定向')
check(
  protectedPage.headers.get('location')?.startsWith('/login'),
  '未登录访问被送回登录页'
)

const protectedAsset = await fetch(`${baseUrl}/assets/${privateAsset}`, {
  redirect: 'manual'
})
check(protectedAsset.status === 401, '未登录无法下载私密前端文件')

const failedLogin = await fetch(`${baseUrl}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: 'incorrect-password' })
})
check(failedLogin.status === 401, '错误邀请码会被拒绝')

const successfulLogin = await fetch(`${baseUrl}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    password,
    returnTo: '/projects'
  })
})
check(successfulLogin.status === 200, '正确邀请码可以建立会话')
const sessionCookie = successfulLogin.headers.get('set-cookie')?.split(';')[0]
check(Boolean(sessionCookie), '登录成功后签发安全会话')

const authenticatedPage = await fetch(`${baseUrl}/projects`, {
  headers: {
    Accept: 'text/html',
    Cookie: sessionCookie
  },
  redirect: 'manual'
})
check(authenticatedPage.status === 200, '登录后可以访问私密页面')

const authenticatedAsset = await fetch(`${baseUrl}/assets/${privateAsset}`, {
  headers: { Cookie: sessionCookie },
  redirect: 'manual'
})
check(authenticatedAsset.status === 200, '登录后可以读取前端资源')

const logout = await fetch(`${baseUrl}/api/auth/logout`, {
  method: 'POST',
  headers: { Cookie: sessionCookie }
})
check(logout.status === 200, '退出接口可以清除会话')
check(
  logout.headers.get('set-cookie')?.includes('Max-Age=0'),
  '退出响应要求浏览器删除会话'
)

console.log(`Authentication checks passed (${checks.length})`)
for (const message of checks) {
  console.log(`- ${message}`)
}
