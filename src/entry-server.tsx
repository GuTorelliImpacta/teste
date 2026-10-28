import { render as renderParaTexto } from 'preact-render-to-string'
import { App } from './App'
import { headParaHtml, lerHead, limparHead } from './lib/head'
import { caminhosEstaticos, resolver } from './rotas'

export { caminhosEstaticos }

export async function renderizar(caminho: string) {
  const { Pagina, params, encontrada } = await resolver(caminho)
  limparHead()
  const html = renderParaTexto(<App inicial={{ caminho, hash: '', Pagina, params }} />)
  const head = lerHead()
  return { html, head: head ? headParaHtml(head) : '', encontrada }
}
