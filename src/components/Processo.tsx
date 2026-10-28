import { site } from '../data/site'
import { CtaWhatsApp } from './Cta'
import { Secao } from './Secao'

const passos = [
  {
    titulo: 'Conversa e medição',
    texto: 'Você conta o que precisa e a gente mede o espaço no local.',
  },
  { titulo: 'Projeto', texto: 'Desenhamos o móvel e combinamos materiais, medidas e valores.' },
  { titulo: 'Produção', texto: 'Fabricamos sob medida, com acompanhamento até o fim.' },
  { titulo: 'Instalação', texto: 'Entregamos e instalamos, com tudo ajustado e funcionando.' },
]

export function Processo() {
  return (
    <Secao
      id="como-funciona"
      titulo="Como funciona"
      apoio={site.prazoTexto || 'Prazo combinado em contrato, sem surpresa.'}
    >
      <ol className="relative grid gap-0 md:grid-cols-4 md:gap-6">
        {passos.map((p, i) => (
          <li
            key={p.titulo}
            data-reveal
            className="relative flex gap-4 pb-8 last:pb-0 md:block md:pb-0"
          >
            <div className="relative flex flex-col items-center md:mb-4 md:flex-row">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                <span aria-hidden="true" className="losango absolute inset-0 bg-copper-600" />
                <span className="relative font-display font-bold text-cream-50">{i + 1}</span>
              </span>
              {i < passos.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-1 h-full w-px bg-khaki-400 md:ml-2 md:mt-0 md:h-px md:w-full"
                />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-1 text-ink-600">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <CtaWhatsApp origem="processo">Começar pela medição</CtaWhatsApp>
      </div>
    </Secao>
  )
}
