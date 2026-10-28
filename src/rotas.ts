import type { ComponentType } from 'preact'
import * as Home from './pages/Home'

export interface Pagina {
  Component: ComponentType
  /** Caminhos (sem barra inicial) que o build deve pré-renderizar para uma rota com parâmetro. */
  getStaticPaths?: () => string[]
}

export interface Rota {
  padrao: string
  carregar: () => Promise<Pagina>
}

export const rotas: Rota[] = [
  { padrao: '/', carregar: () => Promise.resolve(Home) },
  { padrao: '/portfolio/:ambiente', carregar: () => import('./pages/Ambiente') },
  { padrao: '/sobre', carregar: () => import('./pages/Sobre') },
  { padrao: '/privacidade', carregar: () => import('./pages/Privacidade') },
]

const naoEncontrada: Rota = { padrao: '*', carregar: () => import('./pages/NotFound') }

const semBarraFinal = (c: string) => (c.length > 1 ? c.replace(/\/+$/, '') : c)

export function casar(caminho: string): { rota: Rota; params: Record<string, string> } {
  const partes = semBarraFinal(caminho).split('/')
  for (const rota of rotas) {
    const modelo = rota.padrao.split('/')
    if (modelo.length !== partes.length) continue
    const params: Record<string, string> = {}
    const ok = modelo.every((m, i) => {
      if (m.startsWith(':')) {
        params[m.slice(1)] = decodeURIComponent(partes[i])
        return true
      }
      return m === partes[i]
    })
    if (ok) return { rota, params }
  }
  return { rota: naoEncontrada, params: {} }
}

export async function resolver(caminho: string) {
  const { rota, params } = casar(caminho)
  const pagina = await rota.carregar()
  return { Pagina: pagina.Component, params, encontrada: rota !== naoEncontrada }
}

export async function caminhosEstaticos(): Promise<string[]> {
  const todos: string[] = []
  for (const rota of rotas) {
    const pagina = await rota.carregar()
    const lista = pagina.getStaticPaths?.() ?? [rota.padrao.replace(/^\//, '')]
    for (const item of lista) todos.push(item === '' ? '/' : `/${item.replace(/\/$/, '')}/`)
  }
  return todos
}
