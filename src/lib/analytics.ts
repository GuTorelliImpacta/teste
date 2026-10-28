type Props = Record<string, string | number>

declare global {
  interface Window {
    plausible?: (evento: string, opcoes?: { props: Props }) => void
  }
}

export function track(evento: string, props?: Props): void {
  if (typeof window === 'undefined') return
  window.plausible?.(evento, props ? { props } : undefined)
}
