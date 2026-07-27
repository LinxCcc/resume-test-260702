import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual
} from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const HASH_PREFIX = 'scrypt'
const KEY_LENGTH = 64
const SCRYPT_OPTIONS = {
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024
}

const toBase64Url = (value) => Buffer.from(value).toString('base64url')

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  )
}

export const hashPassword = async (password) => {
  const salt = randomBytes(24)
  const derivedKey = await scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS)

  return [
    HASH_PREFIX,
    SCRYPT_OPTIONS.N,
    SCRYPT_OPTIONS.r,
    SCRYPT_OPTIONS.p,
    salt.toString('base64url'),
    Buffer.from(derivedKey).toString('base64url')
  ].join('$')
}

export const verifyPassword = async (password, encodedHash) => {
  const [prefix, n, r, p, saltValue, hashValue] = encodedHash.split('$')

  if (
    prefix !== HASH_PREFIX ||
    !n ||
    !r ||
    !p ||
    !saltValue ||
    !hashValue
  ) {
    return false
  }

  const expectedHash = Buffer.from(hashValue, 'base64url')
  const derivedKey = await scrypt(
    password,
    Buffer.from(saltValue, 'base64url'),
    expectedHash.length,
    {
      N: Number(n),
      r: Number(r),
      p: Number(p),
      maxmem: 64 * 1024 * 1024
    }
  )

  return safeEqual(Buffer.from(derivedKey), expectedHash)
}

export const createSessionToken = ({
  secret,
  passwordVersion,
  ttlSeconds
}) => {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    nonce: randomBytes(16).toString('base64url'),
    version: passwordVersion
  }
  const encodedPayload = toBase64Url(JSON.stringify(payload))
  const signature = createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url')

  return `${encodedPayload}.${signature}`
}

export const verifySessionToken = ({
  token,
  secret,
  passwordVersion
}) => {
  if (!token || !token.includes('.')) {
    return false
  }

  const [encodedPayload, suppliedSignature] = token.split('.')
  const expectedSignature = createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url')

  if (!safeEqual(suppliedSignature, expectedSignature)) {
    return false
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    )

    return (
      Number.isInteger(payload.exp) &&
      payload.exp > Math.floor(Date.now() / 1000) &&
      payload.version === passwordVersion
    )
  } catch {
    return false
  }
}
