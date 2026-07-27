import { copyFile, mkdir, rm } from 'node:fs/promises'

const projectRoot = new URL('../', import.meta.url)
const serverOutput = new URL('../dist/server/', import.meta.url)
const publicOutput = new URL('../dist/server/public/', import.meta.url)

await rm(serverOutput, { force: true, recursive: true })
await mkdir(publicOutput, { recursive: true })

const serverFiles = [
  'index.mjs',
  'auth.mjs',
  'change-password.mjs',
  'login.html'
]

for (const fileName of serverFiles) {
  await copyFile(
    new URL(`server/${fileName}`, projectRoot),
    new URL(fileName, serverOutput)
  )
}

const publicFiles = [
  ['src/assets/avatar_welcome.png', 'avatar.png'],
  ['src/assets/lock.svg', 'lock.svg'],
  ['public/favicon.svg', 'favicon.svg'],
  ['public/fonts/signpainter-housescript.woff2', 'signpainter-housescript.woff2']
]

for (const [sourcePath, destinationName] of publicFiles) {
  await copyFile(
    new URL(sourcePath, projectRoot),
    new URL(destinationName, publicOutput)
  )
}
