import { Avaliacoes } from '../components/Avaliacoes'
import { Contato } from '../components/Contato'
import { Diferenciais } from '../components/Diferenciais'
import { CtaWhatsApp } from '../components/Cta'
import { Faq } from '../components/Faq'
import { Galeria } from '../components/Galeria'
import { Hero } from '../components/Hero'
import { Processo } from '../components/Processo'
import { Secao } from '../components/Secao'
import { Seo } from '../components/Seo'
import { TrustBar } from '../components/TrustBar'
import { faq } from '../data/faq'
import { jsonLdFaq, jsonLdNegocio } from '../lib/seo'

export function Component() {
  return (
    <>
      <Seo
        titulo="Marcenaria Damadi | Móveis planejados sob medida na Zona Norte de SP – Tremembé"
        descricao="Marcenaria em Tremembé, Zona Norte de São Paulo. Cozinhas, guarda-roupas, closets e painéis sob medida, com mais de 20 anos de experiência. Peça seu orçamento."
        caminho="/"
        jsonLd={[jsonLdNegocio(), jsonLdFaq(faq)]}
      />
      <Hero />
      <TrustBar />
      <Secao
        id="projetos"
        titulo="Projetos por ambiente"
        apoio="Escolha o ambiente e veja como resolvemos."
      >
        <Galeria />
        <div className="mt-10 flex flex-col items-start gap-3 border-t border-khaki-300 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-semibold">Gostou? Fale sobre o seu ambiente.</p>
          <CtaWhatsApp origem="galeria">Pedir orçamento</CtaWhatsApp>
        </div>
      </Secao>
      <Processo />
      <Diferenciais />
      <Avaliacoes />
      <Faq />
      <Contato />
    </>
  )
}
