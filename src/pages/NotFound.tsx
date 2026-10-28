import { Link } from '../router'
import { CtaWhatsApp } from '../components/Cta'
import { Seo } from '../components/Seo'

export function NotFound() {
  return (
    <section className="bg-cream-100 py-24">
      <Seo
        titulo="Página não encontrada | Marcenaria Damadi"
        descricao="Esta página não existe. Volte ao início ou peça seu orçamento pelo WhatsApp."
        caminho="/404"
        semIndexar
      />
      <div className="mx-auto max-w-xl px-4">
        <span aria-hidden="true" className="mb-6 block h-6 w-6 rotate-45 bg-copper-500" />
        <h1 className="h1 font-bold">Página não encontrada</h1>
        <p className="mt-4 text-lg text-ink-600">
          O endereço não existe mais ou foi digitado errado. Que tal ver nossos projetos ou falar
          direto com a gente?
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaWhatsApp origem="ambiente">Pedir orçamento</CtaWhatsApp>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-ink-900 px-5 font-display font-semibold hover:bg-ink-900 hover:text-cream-100"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  )
}

export { NotFound as Component }
