import { useEffect, useRef } from 'preact/hooks'
import type { Projeto } from '../data/projetos'
import { mensagemProjeto } from '../lib/whatsapp'
import { CtaWhatsApp } from './Cta'
import { IconClose } from './Icons'
import { Picture } from './Picture'

interface Props {
  projeto: Projeto | null
  aoFechar: () => void
}

export function Lightbox({ projeto, aoFechar }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (projeto && !d.open) d.showModal()
    if (!projeto && d.open) d.close()
  }, [projeto])

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- clique no fundo; Esc e o botão fechar cobrem o teclado
    <dialog
      ref={ref}
      aria-label={projeto ? projeto.titulo : 'Projeto'}
      onClose={aoFechar}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto w-[min(96vw,64rem)] max-w-none overflow-hidden rounded-xl bg-cream-100 p-0 text-ink-900"
    >
      {projeto && (
        <div>
          <div className="relative bg-ink-900">
            <Picture
              imagem={projeto.imagem}
              alt={projeto.alt}
              sizes="(min-width: 1024px) 1024px, 96vw"
              className="max-h-[70svh] w-full object-contain"
            />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Fechar"
              className="absolute right-2 top-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ink-900/80 text-cream-100 hover:bg-ink-900"
            >
              <IconClose />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">{projeto.titulo}</h3>
              <p className="text-ink-500">{projeto.legenda}</p>
            </div>
            <CtaWhatsApp origem="card" mensagem={mensagemProjeto(projeto.titulo)}>
              Quero algo assim
            </CtaWhatsApp>
          </div>
        </div>
      )}
    </dialog>
  )
}
