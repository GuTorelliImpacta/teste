import { useState } from 'preact/hooks'
import { site } from '../data/site'
import { track } from '../lib/analytics'
import { CtaLigar, CtaWhatsApp } from './Cta'
import { HorarioBadge } from './HorarioBadge'
import { IconInstagram, IconPin } from './Icons'

export function Contato() {
  const [mapa, setMapa] = useState(false)
  const e = site.endereco

  return (
    <section id="contato" className="escuro relative bg-ink-900 py-16 text-cream-100 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-16">
        <div data-reveal>
          <span aria-hidden="true" className="mb-4 block h-px w-14 bg-khaki-400" />
          <h2 className="h2 font-bold">Vamos falar do seu ambiente?</h2>
          <p className="mt-3 text-lg text-cream-200">
            Mande uma foto e as medidas do espaço. Respondemos seg–sex, 8h30–18h.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CtaWhatsApp origem="rodape">Pedir orçamento</CtaWhatsApp>
            <CtaLigar origem="rodape" />
          </div>
          <address className="mt-8 space-y-3 not-italic">
            <p className="flex gap-3">
              <IconPin className="mt-1 shrink-0 text-copper-300" />
              <span>
                {e.rua} – {e.bairro}
                <br />
                {e.cidade} – {e.uf}, {e.cep}
              </span>
            </p>
            <HorarioBadge className="pl-8 text-cream-200" />
            <p className="flex flex-wrap gap-x-6 gap-y-2 pl-8">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('click_maps')}
                className="underline underline-offset-4 hover:text-khaki-300"
              >
                Como chegar
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('click_instagram')}
                className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-khaki-300"
              >
                <IconInstagram width={18} height={18} />
                {site.instagram.usuario}
              </a>
            </p>
          </address>
        </div>

        <div
          data-reveal
          className="relative min-h-72 overflow-hidden rounded-[0.625rem] border border-khaki-600 bg-ink-800"
        >
          {mapa ? (
            <iframe
              title="Mapa: Marcenaria Damadi, Rua Carmésia, 42, Tremembé"
              src={site.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                track('click_maps', { acao: 'mapa_interativo' })
                setMapa(true)
              }}
              className="ripado absolute inset-0 flex flex-col items-center justify-center gap-3 text-center hover:bg-ink-700/50"
            >
              <IconPin width={40} height={40} className="text-copper-400" />
              <span className="font-display text-lg font-semibold">Ver o mapa aqui</span>
              <span className="px-6 text-sm text-cream-200">
                O mapa do Google só carrega quando você clica.
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
