import { CtaWhatsApp } from '../components/Cta'
import { Seo } from '../components/Seo'
import { site } from '../data/site'

export function Component() {
  return (
    <section className="bg-cream-100 py-14 md:py-20">
      <Seo
        titulo="Sobre a Marcenaria Damadi | Marceneiro em Tremembé, Zona Norte de SP"
        descricao="Conheça a Marcenaria Damadi: mais de 20 anos de experiência em móveis planejados e sob medida, no Tremembé, Zona Norte de São Paulo."
        caminho="/sobre"
      />
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="h1 font-bold">Sobre a Damadi</h1>
        <div className="mt-6 space-y-4 text-lg text-ink-700">
          <p>
            A Marcenaria Damadi fica no Tremembé, na Zona Norte de São Paulo. São mais de{' '}
            {site.anosExperiencia} anos de experiência em móveis planejados e sob medida.
          </p>
          <p>
            Trabalhamos com projeto cuidadoso, prazo combinado e condições especiais de pagamento,
            porque um bom móvel é o que cabe no espaço e no orçamento de quem vai usar.
          </p>
          <p>
            Cada ambiente começa com uma conversa e a medição no local. Depois vêm o projeto, a
            produção e a instalação, tudo acompanhado de perto.
          </p>
        </div>
        <div className="mt-8">
          <CtaWhatsApp origem="ambiente">Falar com a Damadi</CtaWhatsApp>
        </div>
      </div>
    </section>
  )
}
