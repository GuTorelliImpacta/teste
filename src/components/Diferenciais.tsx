import { site } from '../data/site'
import { Secao } from './Secao'

const itens = [
  {
    titulo: `+${site.anosExperiencia} anos de marcenaria`,
    texto: 'Experiência de oficina para resolver o que o projeto pede.',
  },
  {
    titulo: 'Excelente custo-benefício',
    texto: 'Móvel sob medida com preço justo, sem pagar por exagero.',
  },
  {
    titulo: 'Condições especiais de pagamento',
    texto: 'Conversamos para o valor caber no seu orçamento.',
  },
  {
    titulo: 'Entrega dentro do prazo',
    texto: 'O prazo combinado é o prazo cumprido.',
  },
]

export function Diferenciais() {
  return (
    <Secao id="diferenciais" titulo="Por que a Damadi" tom="oliva">
      <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
        <ul>
          {itens.map((i) => (
            <li
              key={i.titulo}
              data-reveal
              className="flex gap-4 border-t border-khaki-300/60 py-5 first:border-t-0 first:pt-0"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-khaki-300"
              />
              <div>
                <h3 className="text-xl font-semibold">{i.titulo}</h3>
                <p className="mt-1 text-cream-200">{i.texto}</p>
              </div>
            </li>
          ))}
        </ul>
        <aside data-reveal className="ripado corte self-start bg-ink-900 p-6 text-cream-100 md:p-8">
          <span aria-hidden="true" className="mb-4 block h-4 w-4 rotate-45 bg-copper-400" />
          <p className="font-display text-2xl font-bold leading-tight">
            Pouco espaço? A gente aproveita cada centímetro.
          </p>
          <p className="mt-3 text-cream-200">
            Móveis planejados aproveitam até mesmo espaços mínimos.
          </p>
        </aside>
      </div>
    </Secao>
  )
}
