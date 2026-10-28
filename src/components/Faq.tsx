import { faq } from '../data/faq'
import { Secao } from './Secao'

export function Faq() {
  return (
    <Secao id="duvidas" titulo="Dúvidas frequentes" tom="claro">
      <div className="max-w-3xl divide-y divide-khaki-300 border-y border-khaki-300">
        {faq.map((f) => (
          <details key={f.pergunta} className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display font-semibold [&::-webkit-details-marker]:hidden">
              {f.pergunta}
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rotate-45 bg-copper-500 transition-transform duration-200 group-open:rotate-[225deg]"
              />
            </summary>
            <p className="pb-4 pr-8 text-ink-600">{f.resposta}</p>
          </details>
        ))}
      </div>
    </Secao>
  )
}
