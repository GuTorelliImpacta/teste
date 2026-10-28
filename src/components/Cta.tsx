import clsx from 'clsx'
import type { ComponentChildren } from 'preact'
import { site } from '../data/site'
import { track } from '../lib/analytics'
import { linkWhatsApp, mensagemGeral, type Origem } from '../lib/whatsapp'
import { IconPhone, IconWhatsApp } from './Icons'

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-display text-[0.95rem] font-semibold transition-colors duration-200'

export const estilos = {
  primario: 'bg-copper-600 text-cream-50 hover:bg-copper-700 active:bg-copper-800',
  whatsapp: 'bg-wa-600 text-cream-50 hover:bg-wa-700',
  contorno:
    'border-2 border-current bg-transparent hover:bg-ink-900/5 [.escuro_&]:hover:bg-cream-100/10',
  sobreCobre: 'bg-cream-100 text-ink-900 hover:bg-cream-200',
} as const

interface WaProps {
  origem: Origem
  mensagem?: string
  variante?: keyof typeof estilos
  className?: string
  children: ComponentChildren
  icone?: boolean
}

export function CtaWhatsApp({
  origem,
  mensagem = mensagemGeral(),
  variante = 'primario',
  className,
  children,
  icone = true,
}: WaProps) {
  return (
    <a
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('click_whatsapp', { origem })}
      className={clsx(base, estilos[variante], className)}
    >
      {icone && <IconWhatsApp width={20} height={20} />}
      {children}
    </a>
  )
}

export function CtaLigar({ className, origem }: { className?: string; origem: Origem }) {
  return (
    <a
      href={`tel:${site.telefone.e164}`}
      onClick={() => track('click_ligar', { origem })}
      className={clsx(base, estilos.contorno, className)}
    >
      <IconPhone width={20} height={20} />
      Ligar
    </a>
  )
}
