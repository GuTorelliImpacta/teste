// Falha o build de produção se restar placeholder visível, imagem de flyer/banco ou TODO.
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const problemas = []

async function arquivos(dir, filtro) {
  const saida = []
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const caminho = join(dir, e.name)
    if (e.isDirectory()) saida.push(...(await arquivos(caminho, filtro)))
    else if (filtro(caminho)) saida.push(caminho)
  }
  return saida
}

for (const f of await arquivos('dist', (c) => c.endsWith('.html'))) {
  const html = await readFile(f, 'utf8')
  if (html.includes('data-placeholder'))
    problemas.push(`${f}: placeholder visível (data-placeholder)`)
  if (/TODO/.test(html)) problemas.push(`${f}: texto "TODO" no HTML`)
}
for (const f of await arquivos('src/data', (c) => c.endsWith('.ts'))) {
  if (/TODO/.test(await readFile(f, 'utf8'))) problemas.push(`${f}: contém TODO`)
}
for (const f of await arquivos('public', (c) =>
  /flyer|banco|stock|shutterstock|unsplash/i.test(c),
)) {
  problemas.push(`${f}: nome indica flyer/imagem de banco em public/`)
}

if (problemas.length) {
  console.error('check:placeholders FALHOU:\n - ' + problemas.join('\n - '))
  process.exit(1)
}
console.log('check:placeholders OK')
