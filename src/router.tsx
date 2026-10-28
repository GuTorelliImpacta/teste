import { createContext, type ComponentChildren } from 'preact'
import { useContext } from 'preact/hooks'

export interface Navegacao {
  caminho: string
  params: Record<string, string>
  ir: (destino: string) => void
}

export const NavContext = createContext<Navegacao>({
  caminho: '/',
  params: {},
  ir: () => {},
})

export const useNavegacao = (): Navegacao => useContext(NavContext)
export const useParams = (): Record<string, string> => useContext(NavContext).params

interface LinkProps {
  to: string
  className?: string
  'aria-label'?: string
  onClick?: (e: MouseEvent) => void
  children?: ComponentChildren
}

/** Link interno: navega sem recarregar; o href real garante que funcione sem JS. */
export function Link({ to, onClick, children, ...resto }: LinkProps) {
  const { ir } = useNavegacao()
  return (
    <a
      {...resto}
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return
        e.preventDefault()
        ir(to)
      }}
    >
      {children}
    </a>
  )
}
