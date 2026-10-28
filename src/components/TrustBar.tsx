import { site } from '../data/site'
import { IconStar } from './Icons'

const itens = [
  { chave: 'anos', texto: `+${site.anosExperiencia} anos de experiência` },
  { chave: 'prazo', texto: 'Entrega no prazo' },
  { chave: 'pagamento', texto: 'Condições especiais' },
]

export function TrustBar() {
  return (
    <section aria-label="Por que confiar" className="border-b border-khaki-200 bg-cream-50">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 text-sm font-medium md:flex md:justify-between md:text-base">
        <li className="flex items-center gap-2">
          <IconStar className="text-copper-500" width={18} height={18} />
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-khaki-400 underline-offset-4 hover:text-copper-600"
          >
            {site.avaliacao.nota} no Google
          </a>
        </li>
        {itens.map((i) => (
          <li key={i.chave} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rotate-45 bg-copper-500" />
            {i.texto}
          </li>
        ))}
      </ul>
    </section>
  )
}
