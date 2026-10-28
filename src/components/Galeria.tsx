import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { Link } from '../router'
import { ambientes, projetos, type AmbienteSlug, type Projeto } from '../data/projetos'
import { track } from '../lib/analytics'
import { mensagemProjeto } from '../lib/whatsapp'
import { CtaWhatsApp } from './Cta'
import { Lightbox } from './Lightbox'
import { Picture } from './Picture'

type Filtro = AmbienteSlug | 'todos'

// Grade bento: 6 posições que fecham a grade de 4 colunas (e de 2 no mobile).
const bento = [
  'col-span-2 row-span-2',
  '',
  '',
  'col-span-2',
  'col-span-2 md:col-span-2',
  'col-span-2 md:col-span-2',
]
const POR_PAGINA = 9

export function Galeria({ ambiente }: { ambiente?: AmbienteSlug }) {
  const [filtro, setFiltro] = useState<Filtro>(ambiente ?? 'todos')
  const [aberto, setAberto] = useState<Projeto | null>(null)
  const [limite, setLimite] = useState(POR_PAGINA)

  const ativo = ambiente ?? filtro
  const lista = projetos.filter((p) => ativo === 'todos' || p.ambiente === ativo)
  const visiveis = lista.slice(0, limite)
  const vazios = ambientes.filter((a) => ativo === 'todos' || a.slug === ativo)

  return (
    <div>
      {!ambiente && (
        <div role="group" aria-label="Filtrar por ambiente" className="mb-6 flex flex-wrap gap-2">
          {([{ slug: 'todos', nome: 'Todos' }, ...ambientes] as const).map((a) => (
            <button
              key={a.slug}
              type="button"
              aria-pressed={ativo === a.slug}
              onClick={() => {
                setFiltro(a.slug)
                setLimite(POR_PAGINA)
              }}
              className={clsx(
                'min-h-12 rounded-lg border-2 px-4 font-display text-sm font-semibold transition-colors',
                ativo === a.slug
                  ? 'border-ink-900 bg-ink-900 text-cream-100'
                  : 'border-khaki-300 bg-transparent text-ink-900 hover:border-ink-900',
              )}
            >
              {a.nome}
            </button>
          ))}
        </div>
      )}

      <ul className="grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[12.5rem] md:grid-cols-4">
        {lista.length > 0
          ? visiveis.map((p, i) => (
              <li key={p.id} className={clsx('group relative', ativo === 'todos' && bento[i % 6])}>
                <button
                  type="button"
                  onClick={() => {
                    track('view_projeto', { projeto: p.id })
                    setAberto(p)
                  }}
                  className="relative block h-full w-full overflow-hidden rounded-[0.625rem] bg-olive-100 text-left"
                  aria-label={`Ampliar: ${p.titulo}`}
                >
                  <Picture
                    imagem={p.imagem}
                    alt={p.alt}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 to-transparent p-3 pt-8 text-sm font-medium text-cream-50">
                    {p.legenda}
                  </span>
                </button>
                <CtaWhatsApp
                  origem="card"
                  mensagem={mensagemProjeto(p.titulo)}
                  variante="sobreCobre"
                  icone={false}
                  className="!absolute right-2 top-2 !min-h-9 !px-3 !py-1 !text-xs"
                >
                  Quero algo assim
                </CtaWhatsApp>
              </li>
            ))
          : vazios.map((a, i) => (
              <li key={a.slug} className={clsx(ativo === 'todos' && bento[i % 6])}>
                <Link
                  to={`/portfolio/${a.slug}/`}
                  data-placeholder
                  className="ripado-escuro group relative flex h-full flex-col justify-between overflow-hidden rounded-[0.625rem] border border-khaki-300 bg-olive-100 p-4 transition-colors hover:border-copper-500"
                >
                  <span aria-hidden="true" className="h-3 w-3 rotate-45 bg-copper-500" />
                  <span>
                    <span className="block font-display text-lg font-semibold">{a.nome}</span>
                    <span className="text-xs font-medium uppercase tracking-widest text-ink-500">
                      TODO foto real
                    </span>
                  </span>
                </Link>
              </li>
            ))}
      </ul>

      {lista.length > limite && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setLimite((l) => l + POR_PAGINA)}
            className="min-h-12 rounded-lg border-2 border-ink-900 px-6 font-display font-semibold hover:bg-ink-900 hover:text-cream-100"
          >
            Ver mais projetos
          </button>
        </div>
      )}

      <Lightbox projeto={aberto} aoFechar={() => setAberto(null)} />
    </div>
  )
}
