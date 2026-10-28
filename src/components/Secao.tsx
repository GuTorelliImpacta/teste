import clsx from 'clsx'
import type { ComponentChildren } from 'preact'

interface Props {
  id?: string
  titulo: string
  apoio?: string
  tom?: 'claro' | 'oliva' | 'escuro'
  children: ComponentChildren
}

const tons = {
  claro: 'bg-cream-100 text-ink-900',
  oliva: 'escuro bg-olive-700 text-cream-100',
  escuro: 'escuro bg-ink-900 text-cream-100',
}

export function Secao({ id, titulo, apoio, tom = 'claro', children }: Props) {
  return (
    <section id={id} className={clsx('relative py-16 md:py-24', tons[tom])}>
      <div className="mx-auto max-w-6xl px-4">
        <div data-reveal className="mb-10 max-w-2xl">
          <span aria-hidden="true" className="mb-4 block h-px w-14 bg-khaki-400" />
          <h2 className="h2 font-bold">{titulo}</h2>
          {apoio && (
            <p
              className={clsx('mt-3 text-lg', tom === 'claro' ? 'text-ink-600' : 'text-cream-200')}
            >
              {apoio}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
