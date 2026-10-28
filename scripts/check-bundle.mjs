// Orçamento de JS inicial da home: <= 100 KB gzip (módulos do index.html + preloads).
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const LIMITE = 100 * 1024
const html = await readFile(join('dist', 'index.html'), 'utf8')
const urls = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1])
let total = 0
for (const u of new Set(urls)) total += gzipSync(await readFile(join('dist', u))).length
const kb = (total / 1024).toFixed(1)
if (total > LIMITE) {
  console.error(`check:bundle FALHOU: JS inicial ${kb} KB gzip > 100 KB`)
  process.exit(1)
}
console.log(`check:bundle OK: JS inicial ${kb} KB gzip (limite 100 KB)`)
