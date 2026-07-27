import { hashPassword } from '../server/auth.mjs'

const readSecret = (prompt) =>
  new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error('This command requires an interactive terminal.'))
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
        reject(new Error('Cancelled.'))
        return
      }

      if (character === '\r' || character === '\n') {
        cleanup()
        resolve(value)
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

try {
  const password = await readSecret('请输入新的共享密码：')
  const confirmation = await readSecret('请再次输入：')

  if (password.length < 12) {
    throw new Error('密码至少需要 12 个字符。')
  }

  if (password !== confirmation) {
    throw new Error('两次输入的密码不一致。')
  }

  console.log(await hashPassword(password))
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
