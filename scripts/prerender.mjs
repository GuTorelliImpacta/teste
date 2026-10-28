// Pré-renderiza todas as rotas em HTML estático (dist/**/index.html), sitemap e robots.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = 'dist'
const servidor = 'dist-server'
const siteUrl = (process.env.VITE_SITE_URL ?? 'https://marcenariadamadi.com.br').replace(/\/$/, '')

const modelo = await readFile(join(dist, 'index.html'), 'utf8')
const { renderizar, caminhosEstaticos } = await import(
  pathToFileURL(join(process.cwd(), servidor, 'entry-server.js')).href
)

function montar({ html, head }) {
  if (!modelo.includes('<!--ssr-outlet-->') || !modelo.includes('<!--ssr-head-->')) {
    throw new Error('Template sem marcadores ssr-outlet/ssr-head')
  }
  let pagina = modelo.replace('<!--ssr-outlet-->', html).replace('<!--ssr-head-->', head)
  if (head.includes('<title')) pagina = pagina.replace(/<title>[^<]*<\/title>\s*/, '')
  return pagina
}

async function gravar(arquivo, conteudo) {
  const destino = join(dist, arquivo)
  await mkdir(dirname(destino), { recursive: true })
  await writeFile(destino, conteudo)
}

const caminhos = await caminhosEstaticos()
for (const caminho of caminhos) {
  const r = await renderizar(caminho)
  if (!r.encontrada) throw new Error(`Rota pré-renderizada não casa com nenhuma página: ${caminho}`)
  await gravar(join(caminho, 'index.html'), montar(r))
}
await gravar('404.html', montar(await renderizar('/404-nao-encontrada/')))

const urls = caminhos.map((c) => `  <url><loc>${siteUrl}${c}</loc></url>`).join('\n')
await gravar(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await gravar('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
await rm(servidor, { recursive: true, force: true })
console.log(`Pré-renderizadas ${caminhos.length} rotas + 404`)
