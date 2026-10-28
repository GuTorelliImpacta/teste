import { useState } from 'preact/hooks'
import { Link } from '../router'
import { CtaWhatsApp } from './Cta'
import { IconClose, IconMenu } from './Icons'
import { Logo } from './Logo'

export const navegacao = [
  { to: '/#projetos', rotulo: 'Projetos' },
  { to: '/#como-funciona', rotulo: 'Como funciona' },
  { to: '/#duvidas', rotulo: 'Dúvidas' },
  { to: '/#contato', rotulo: 'Contato' },
]

export function Header() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)

  return (
    <header className="sticky top-0 z-40 border-b border-khaki-200 bg-cream-100/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-4">
        <Link to="/" aria-label="Marcenaria Damadi, página inicial" onClick={fechar}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {navegacao.map((n) => (
            <Link key={n.to} to={n.to} className="font-medium text-ink-700 hover:text-copper-600">
              {n.rotulo}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaWhatsApp
            origem="header"
            icone={false}
            className="!min-h-11 !gap-1.5 !px-3 !py-2 sm:!px-4"
          >
            Orçamento
          </CtaWhatsApp>
          <button
            type="button"
            className="inline-flex h-12 w-11 items-center justify-center rounded-lg text-ink-900 hover:bg-cream-200 md:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="border-t border-khaki-200 bg-cream-100 px-4 pb-4 md:hidden"
        >
          <ul>
            {navegacao.map((n) => (
              <li key={n.to} className="border-b border-khaki-200 last:border-0">
                <Link to={n.to} onClick={fechar} className="block py-3.5 font-display font-medium">
                  {n.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
