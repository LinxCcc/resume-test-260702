import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const projectRoot = new URL('../', import.meta.url)
const serverOutput = new URL('../dist/server/', import.meta.url)
const publicOutput = new URL('../dist/server/public/', import.meta.url)

await rm(serverOutput, { force: true, recursive: true })
await mkdir(publicOutput, { recursive: true })

const sourceStyles = await readFile(
  new URL('src/assets/styles/base.css', projectRoot),
  'utf8'
)
const welcomeStylesStart = sourceStyles.indexOf(
  '/* Welcome and loading flow */'
)
const welcomeStylesEnd = sourceStyles.indexOf(
  '/* Floating utility actions */'
)

if (welcomeStylesStart < 0 || welcomeStylesEnd <= welcomeStylesStart) {
  throw new Error('Unable to locate the shared welcome styles in base.css')
}

await writeFile(
  new URL('welcome.css', publicOutput),
  sourceStyles.slice(welcomeStylesStart, welcomeStylesEnd),
  'utf8'
)

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
