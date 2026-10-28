import { site } from '../data/site'
import { CtaWhatsApp, estilos } from './Cta'
import { HorarioBadge } from './HorarioBadge'
import { Picture } from './Picture'

export function Hero() {
  const temFoto = Boolean(site.heroImagem)
  return (
    <section
      id="hero"
      className="escuro relative isolate flex min-h-[85svh] overflow-hidden bg-ink-900 text-cream-100 md:min-h-[640px]"
    >
      <div className="ripado absolute inset-0 -z-20 opacity-60" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="relative z-10 order-2 mt-auto md:order-1 md:mt-0">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-khaki-300">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-copper-400" />
            Marcenaria em Tremembé, São Paulo
          </p>
          <h1 className="h1 font-bold">Móveis planejados sob medida para o seu espaço</h1>
          <p className="mt-5 max-w-xl text-lg text-cream-200">
            Mais de {site.anosExperiencia} anos de marcenaria: projeto cuidadoso, prazo combinado e
            condições especiais de pagamento.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaWhatsApp origem="hero">Pedir orçamento</CtaWhatsApp>
            <a
              href="#projetos"
              className={`inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 font-display font-semibold ${estilos.contorno}`}
            >
              Ver projetos
            </a>
          </div>
          <p className="mt-4 text-sm text-cream-200">Mande uma foto e as medidas do espaço.</p>
          <HorarioBadge className="mt-1 text-cream-200" />
        </div>

        <div className="order-1 md:order-2">
          {temFoto ? (
            <div className="absolute inset-0 -z-10 md:relative md:inset-auto md:z-0 md:mx-auto md:aspect-square md:max-w-[460px] md:losango md:overflow-hidden">
              <Picture
                imagem={site.heroImagem}
                alt={site.heroAlt}
                sizes="(min-width: 768px) 460px, 100vw"
                prioridade
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/10 md:hidden" />
            </div>
          ) : (
            <div
              data-placeholder
              aria-hidden="true"
              className="relative mx-auto h-40 w-40 md:h-auto md:aspect-square md:w-full md:max-w-[460px]"
            >
              <div className="losango absolute inset-0 bg-copper-500" />
              <div className="losango ripado absolute inset-[6%] bg-ink-800" />
              <div className="losango absolute inset-[30%] bg-copper-500/90" />
              <span className="absolute inset-x-0 bottom-[44%] hidden text-center text-xs font-medium uppercase tracking-widest text-khaki-300 md:block">
                TODO foto real
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
