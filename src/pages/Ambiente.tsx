import { useEffect } from 'preact/hooks'
import { Link, useParams } from '../router'
import { CtaWhatsApp } from '../components/Cta'
import { Galeria } from '../components/Galeria'
import { Seo } from '../components/Seo'
import { ambientePorSlug, ambientes } from '../data/projetos'
import { track } from '../lib/analytics'
import { jsonLdMigalhas } from '../lib/seo'
import { mensagemAmbiente } from '../lib/whatsapp'
import { NotFound } from './NotFound'

export function getStaticPaths() {
  return ambientes.map((a) => `portfolio/${a.slug}`)
}

export function Component() {
  const { ambiente: slug = '' } = useParams()
  const ambiente = ambientePorSlug(slug)

  useEffect(() => {
    if (ambiente) track('view_ambiente', { ambiente: ambiente.slug })
  }, [ambiente])

  if (!ambiente) return <NotFound />
  const caminho = `/portfolio/${ambiente.slug}`

  return (
    <>
      <Seo
        titulo={ambiente.titulo}
        descricao={ambiente.descricao}
        caminho={caminho}
        jsonLd={[
          jsonLdMigalhas([
            { nome: 'Início', caminho: '/' },
            { nome: ambiente.nome, caminho },
          ]),
        ]}
      />
      <section className="bg-cream-100 pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <nav aria-label="Você está em" className="mb-6 text-sm text-ink-500">
            <Link to="/" className="underline underline-offset-4 hover:text-copper-600">
              Início
            </Link>
            <span aria-hidden="true"> / </span>
            {ambiente.nome}
          </nav>
          <h1 className="h1 max-w-3xl font-bold">{ambiente.curto} sob medida</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-600">{ambiente.texto}</p>
          <div className="mt-6">
            <CtaWhatsApp origem="ambiente" mensagem={mensagemAmbiente(ambiente.mensagem)}>
              Pedir orçamento de {ambiente.nome.toLowerCase()}
            </CtaWhatsApp>
          </div>
          <div className="mt-12">
            <Galeria ambiente={ambiente.slug} />
          </div>
          <nav aria-label="Outros ambientes" className="mt-14 border-t border-khaki-300 pt-6">
            <p className="font-display font-semibold">Outros ambientes</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ambientes
                .filter((a) => a.slug !== ambiente.slug)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/portfolio/${a.slug}/`}
                      className="inline-flex min-h-12 items-center rounded-lg border-2 border-khaki-300 px-4 font-display text-sm font-semibold hover:border-ink-900"
                    >
                      {a.nome}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}
