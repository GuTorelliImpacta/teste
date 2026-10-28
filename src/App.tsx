import type { ComponentType } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { StickyCTA } from './components/StickyCTA'
import { NavContext } from './router'
import { resolver } from './rotas'

export interface EstadoPagina {
  caminho: string
  hash: string
  Pagina: ComponentType
  params: Record<string, string>
}

function separar(destino: string): { caminho: string; hash: string } {
  const u = new URL(destino, 'https://x.local')
  return { caminho: u.pathname, hash: u.hash }
}

export function App({ inicial }: { inicial: EstadoPagina }) {
  const [estado, setEstado] = useState(inicial)

  const carregar = useCallback(async (destino: string) => {
    const { caminho, hash } = separar(destino)
    const { Pagina, params } = await resolver(caminho)
    setEstado({ caminho, hash, Pagina, params })
  }, [])

  const ir = useCallback(
    (destino: string) => {
      const { caminho } = separar(destino)
      if (caminho === window.location.pathname && !destino.includes('#')) {
        window.scrollTo(0, 0)
        return
      }
      history.pushState(null, '', destino)
      void carregar(destino)
    },
    [carregar],
  )

  useEffect(() => {
    const aoVoltar = () => void carregar(window.location.pathname + window.location.hash)
    window.addEventListener('popstate', aoVoltar)
    return () => window.removeEventListener('popstate', aoVoltar)
  }, [carregar])

  // Rolagem após navegar: âncora ou topo. Na primeiraRef carga o navegador já cuida disso.
  const primeiraRef = useRef(true)
  useEffect(() => {
    if (primeiraRef.current) {
      primeiraRef.current = false
      return
    }
    if (estado.hash) document.getElementById(estado.hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [estado])

  // Reveal: só esconde depois que o JS marcou o <html>, então sem JS tudo aparece.
  useEffect(() => {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzir || !('IntersectionObserver' in window)) return
    document.documentElement.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [estado.caminho])

  const { Pagina } = estado
  return (
    <NavContext.Provider value={{ caminho: estado.caminho, params: estado.params, ir }}>
      <a
        href="#conteudo"
        className="fixed left-2 top-2 z-50 -translate-y-20 rounded-lg bg-ink-900 px-4 py-3 font-semibold text-cream-100 focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Pagina />
      </main>
      <Footer />
      <StickyCTA chave={estado.caminho} />
    </NavContext.Provider>
  )
}
