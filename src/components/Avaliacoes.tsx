import { site } from '../data/site'
import { IconStar } from './Icons'
import { Secao } from './Secao'

export function Avaliacoes() {
  return (
    <Secao id="avaliacoes" titulo="Quem já contratou aprova">
      <div
        data-reveal
        className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8"
      >
        <p className="font-display text-6xl font-bold leading-none text-ink-900">
          {site.avaliacao.nota}
        </p>
        <div>
          <p role="img" className="flex gap-1 text-copper-500" aria-label="5 de 5 estrelas">
            {[0, 1, 2, 3, 4].map((n) => (
              <IconStar key={n} width={24} height={24} />
            ))}
          </p>
          <p className="mt-1 text-ink-600">{site.avaliacao.total} avaliações no Google</p>
        </div>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center rounded-lg border-2 border-ink-900 px-5 font-display font-semibold hover:bg-ink-900 hover:text-cream-100"
        >
          Ver avaliações no Google
        </a>
      </div>
    </Secao>
  )
}
