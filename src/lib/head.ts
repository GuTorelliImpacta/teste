import { site } from '../data/site'
import { urlAbsoluta } from './seo'

export interface DadosHead {
  titulo: string
  descricao: string
  caminho: string
  jsonLd?: object[]
  semIndexar?: boolean
}

export interface TagHead {
  tag: 'title' | 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  texto?: string
}

export function tagsHead(d: DadosHead): TagHead[] {
  const url = urlAbsoluta(d.caminho)
  const imagem = `${site.url}/og-image.jpg`
  const meta = (chave: 'name' | 'property', nome: string, content: string): TagHead => ({
    tag: 'meta',
    attrs: { [chave]: nome, content },
  })
  return [
    { tag: 'title', attrs: {}, texto: d.titulo },
    meta('name', 'description', d.descricao),
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    ...(d.semIndexar ? [meta('name', 'robots', 'noindex')] : []),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', d.titulo),
    meta('property', 'og:description', d.descricao),
    meta('property', 'og:url', url),
    meta('property', 'og:image', imagem),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('name', 'twitter:title', d.titulo),
    meta('name', 'twitter:description', d.descricao),
    meta('name', 'twitter:image', imagem),
    ...(d.jsonLd ?? []).map((j): TagHead => ({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      texto: JSON.stringify(j).replace(/</g, '\\u003c'),
    })),
  ]
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** HTML das tags para o pré-render. Todas levam data-head para o cliente poder trocá-las. */
export function headParaHtml(d: DadosHead): string {
  return tagsHead(d)
    .map((t) => {
      const attrs = Object.entries(t.attrs)
        .map(([k, v]) => ` ${k}="${esc(v)}"`)
        .join('')
      if (t.tag === 'title') return `<title data-head>${esc(t.texto ?? '')}</title>`
      if (t.tag === 'script') return `<script data-head${attrs}>${t.texto}</script>`
      return `<${t.tag} data-head${attrs}>`
    })
    .join('\n    ')
}

export function aplicarHeadNoDom(d: DadosHead): void {
  document.head.querySelectorAll('[data-head]').forEach((el) => el.remove())
  for (const t of tagsHead(d)) {
    const el = document.createElement(t.tag)
    el.setAttribute('data-head', '')
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v)
    if (t.texto) el.textContent = t.texto
    document.head.appendChild(el)
  }
}

/** Coletor usado só no servidor (render síncrono, uma página por vez). */
let coletado: DadosHead | null = null
export const registrarHead = (d: DadosHead) => {
  coletado = d
}
export const lerHead = (): DadosHead | null => coletado
export const limparHead = () => {
  coletado = null
}
