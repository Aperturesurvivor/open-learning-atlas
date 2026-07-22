import { createHash } from 'node:crypto'
import { cp, mkdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const viewerRoot = resolve(here, '..')
const source = resolve(viewerRoot, '..', 'map', 'releases', 'mathematics-v0.3.0-alpha.json')
const target = resolve(viewerRoot, 'public', 'data', 'mathematics-v0.3.0-alpha.json')
const checkOnly = process.argv.includes('--check')

const digest = (value) => createHash('sha256').update(value).digest('hex')
const sourceBytes = await readFile(source)

if (checkOnly) {
  let targetBytes
  try {
    targetBytes = await readFile(target)
  } catch {
    console.error('Viewer data is missing. Run deno task sync-data.')
    process.exit(1)
  }

  if (digest(sourceBytes) !== digest(targetBytes)) {
    console.error('Viewer data differs from the canonical release. Run deno task sync-data.')
    process.exit(1)
  }

  console.log(`Viewer data matches canonical release (${digest(sourceBytes).slice(0, 12)}).`)
  process.exit(0)
}

await mkdir(dirname(target), { recursive: true })
await cp(source, target)
console.log(`Synced canonical atlas data (${digest(sourceBytes).slice(0, 12)}).`)
