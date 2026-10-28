import clsx from 'clsx'

interface Props {
  escuro?: boolean
  className?: string
}

/**
 * Marca provisória em SVG + texto: losango, wordmark DAMADI e "junior".
 * Trocar pelo vetor original quando o cliente enviar (content/PENDENCIAS.md).
 */
export function Logo({ escuro, className }: Props) {
  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <svg
        className="h-[30px] w-[30px] sm:h-[34px] sm:w-[34px]"
        viewBox="0 0 34 34"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M17 2 32 17 17 32 2 17Z" fill="var(--color-copper-500)" />
        <path
          d="M17 9 25 17 17 25 9 17Z"
          fill={escuro ? 'var(--color-ink-900)' : 'var(--color-cream-100)'}
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            'font-display text-[1.1rem] font-bold tracking-[0.06em] sm:text-[1.35rem] sm:tracking-[0.08em]',
            escuro ? 'text-cream-100' : 'text-ink-900',
          )}
        >
          DAMADI
        </span>
        <span
          className={clsx(
            'mt-1 flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.28em]',
            escuro ? 'text-khaki-300' : 'text-olive-700',
          )}
        >
          <span className="h-px w-3 bg-current" aria-hidden="true" />
          Marcenaria
          <span className="h-px w-3 bg-current" aria-hidden="true" />
        </span>
      </span>
    </span>
  )
}
