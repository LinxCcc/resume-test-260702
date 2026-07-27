import { randomBytes } from 'node:crypto'
import { chmod, readFile, rename, writeFile } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { hashPassword } from './auth.mjs'

const environmentPath = resolve(
  process.argv[2] || '/etc/resume-site/resume-site.env'
)

const readSecret = (prompt) =>
  new Promise((resolveSecret, rejectSecret) => {
    if (!process.stdin.isTTY) {
      rejectSecret(new Error('该命令需要在交互式终端中运行。'))
      return
    }

    process.stdout.write(prompt)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    let value = ''

    const cleanup = () => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdin.removeListener('data', onData)
      process.stdout.write('\n')
    }

    const onData = (character) => {
      if (character === '\u0003') {
        cleanup()
        rejectSecret(new Error('已取消。'))
        return
      }

      if (character === '\r' || character === '\n') {
        cleanup()
        resolveSecret(value)
        return
      }

      if (character === '\u007f') {
        value = value.slice(0, -1)
        return
      }

      value += character
    }

    process.stdin.on('data', onData)
  })

const replaceEnvironmentValue = (contents, name, value) => {
  const expression = new RegExp(`^${name}=.*$`, 'm')

  if (expression.test(contents)) {
    return contents.replace(expression, `${name}=${value}`)
  }

  return `${contents.trimEnd()}\n${name}=${value}\n`
}

try {
  const password = await readSecret('请输入新的共享密码：')
  const confirmation = await readSecret('请再次输入：')

  if (password.length < 12) {
    throw new Error('密码至少需要 12 个字符。')
  }

  if (password !== confirmation) {
    throw new Error('两次输入的密码不一致。')
  }

  const currentEnvironment = await readFile(environmentPath, 'utf8')
  const currentVersionMatch = currentEnvironment.match(
    /^PASSWORD_VERSION=(.+)$/m
  )
  const currentVersion = Number(currentVersionMatch?.[1] || 0)

  let nextEnvironment = replaceEnvironmentValue(
    currentEnvironment,
    'ACCESS_PASSWORD_HASH',
    await hashPassword(password)
  )
  nextEnvironment = replaceEnvironmentValue(
    nextEnvironment,
    'PASSWORD_VERSION',
    String(Number.isFinite(currentVersion) ? currentVersion + 1 : 1)
  )
  nextEnvironment = replaceEnvironmentValue(
    nextEnvironment,
    'SESSION_SECRET',
    randomBytes(48).toString('base64url')
  )

  const temporaryPath = resolve(
    dirname(environmentPath),
    `.${basename(environmentPath)}.${process.pid}.tmp`
  )
  await writeFile(temporaryPath, nextEnvironment, {
    encoding: 'utf8',
    mode: 0o600
  })
  await chmod(temporaryPath, 0o600)
  await rename(temporaryPath, environmentPath)

  console.log('密码配置已更新；重启网站服务后生效。')
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
