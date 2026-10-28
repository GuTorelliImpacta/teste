import clsx from 'clsx'
import { useEffect, useState } from 'preact/hooks'
import { site } from '../data/site'
import { statusAgora, type StatusHorario } from '../lib/horario'

/** Sem JS (e no HTML pré-renderizado) mostra o horário fixo; com JS, aberto/fechado. */
export function HorarioBadge({ className }: { className?: string }) {
  const [status, setStatus] = useState<StatusHorario | null>(null)
  useEffect(() => {
    const atualizar = () => setStatus(statusAgora())
    atualizar()
    const id = window.setInterval(atualizar, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className={clsx('flex flex-wrap items-center gap-x-2 text-sm', className)}>
      {status && (
        <span
          className={clsx(
            'inline-flex items-center gap-1.5 font-semibold',
            status.aberto
              ? 'text-wa-600 [.escuro_&]:text-wa-500'
              : 'text-copper-600 [.escuro_&]:text-copper-300',
          )}
        >
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-current" />
          {status.texto}
        </span>
      )}
      <span>{site.horario.texto}</span>
    </p>
  )
}
