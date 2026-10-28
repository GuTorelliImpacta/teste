import { hydrate, render } from 'preact'
import { App } from './App'
import { site } from './data/site'
import { resolver } from './rotas'
import './styles/index.css'

async function iniciar() {
  const raiz = document.getElementById('root')
  if (!raiz) return
  const { pathname, hash } = window.location
  const { Pagina, params } = await resolver(pathname)
  const app = <App inicial={{ caminho: pathname, hash, Pagina, params }} />
  if (raiz.firstElementChild) hydrate(app, raiz)
  else render(app, raiz)

  if (site.analyticsDomain) {
    const s = document.createElement('script')
    s.defer = true
    s.src = 'https://plausible.io/js/script.js'
    s.dataset.domain = site.analyticsDomain
    document.head.appendChild(s)
  }
}

void iniciar()
