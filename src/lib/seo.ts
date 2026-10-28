import { site } from '../data/site'
import type { Pergunta } from '../data/faq'

export const urlAbsoluta = (caminho: string): string =>
  `${site.url.replace(/\/$/, '')}${caminho === '/' ? '/' : caminho.replace(/\/?$/, '/')}`

const { endereco } = site

export const jsonLdNegocio = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${urlAbsoluta('/')}#negocio`,
  name: site.nome,
  url: urlAbsoluta('/'),
  telephone: '+55 11 94622-1978',
  image: `${site.url}/og-image.jpg`,
  description:
    'Marcenaria em Tremembé, Zona Norte de São Paulo. Móveis planejados sob medida: cozinhas, guarda-roupas, closets, home office e painéis.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: endereco.rua,
    addressLocality: endereco.cidade,
    addressRegion: endereco.uf,
    postalCode: endereco.cep,
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.horario.abre,
      closes: site.horario.fecha,
    },
  ],
  sameAs: [site.instagram.url, site.mapsUrl],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: site.avaliacao.total,
    bestRating: '5',
  },
})

export const jsonLdFaq = (itens: Pergunta[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: itens.map((i) => ({
    '@type': 'Question',
    name: i.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: i.resposta },
  })),
})

export const jsonLdMigalhas = (itens: { nome: string; caminho: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: itens.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.nome,
    item: urlAbsoluta(it.caminho),
  })),
})
