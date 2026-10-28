export type AmbienteSlug =
  'cozinha' | 'guarda-roupa' | 'closet' | 'home-office' | 'sala-paineis' | 'espacos-pequenos'

export interface Ambiente {
  slug: AmbienteSlug
  nome: string
  curto: string
  titulo: string
  descricao: string
  texto: string
  mensagem: string
}

export interface Projeto {
  id: string
  ambiente: AmbienteSlug
  titulo: string
  /** Até 12 palavras, só fatos reais do projeto. */
  legenda: string
  /** Chave gerada por `npm run images`: "<ambiente>/<arquivo-sem-extensão>". */
  imagem: string
  alt: string
}

export const ambientes: Ambiente[] = [
  {
    slug: 'cozinha',
    nome: 'Cozinha',
    curto: 'Cozinha planejada',
    titulo: 'Cozinha planejada sob medida em Tremembé, Zona Norte de SP',
    descricao:
      'Cozinha planejada sob medida pela Marcenaria Damadi, em Tremembé. Armários, bancadas e nichos pensados para a sua rotina e para o seu espaço.',
    texto:
      'A cozinha é onde a rotina mais pede organização. Planejamos armários, gavetas e nichos sob medida para o seu espaço, com lugar certo para cooktop, forno, geladeira e utensílios. O projeto parte da medição no local e considera como você cozinha, quantas pessoas usam e o que precisa ficar à mão. O resultado é uma cozinha que aproveita cada centímetro, fácil de limpar e feita para durar.',
    mensagem: 'Cozinha',
  },
  {
    slug: 'guarda-roupa',
    nome: 'Guarda-roupa',
    curto: 'Guarda-roupa e dormitório',
    titulo: 'Guarda-roupa sob medida com porta de correr | Marcenaria Damadi',
    descricao:
      'Guarda-roupas e móveis de dormitório sob medida, inclusive com porta de correr, feitos pela Marcenaria Damadi em Tremembé, Zona Norte de SP.',
    texto:
      'Um guarda-roupa sob medida ocupa a parede inteira sem sobrar vão e organiza o que importa: cabides, prateleiras, gavetas e espaço para o que você usa menos. Fazemos com porta de correr ou de abrir, conforme o quarto e a circulação. Medimos o ambiente, combinamos o que vai dentro e entregamos instalado, com acabamento firme e portas bem reguladas.',
    mensagem: 'Guarda-roupa',
  },
  {
    slug: 'closet',
    nome: 'Closet',
    curto: 'Closet',
    titulo: 'Closet planejado sob medida na Zona Norte de SP | Marcenaria Damadi',
    descricao:
      'Closets planejados sob medida pela Marcenaria Damadi, em Tremembé. Organização para roupas, sapatos e acessórios, do jeito que o seu espaço permite.',
    texto:
      'No closet, cada coisa tem lugar: roupas penduradas, dobradas, sapatos, bolsas e acessórios. Projetamos a divisão conforme o seu uso e o tamanho do espaço, seja um cômodo inteiro ou um canto do quarto. Prateleiras, gavetas e cabideiros ficam na altura certa, e o conjunto ganha acabamento que combina com o resto da casa.',
    mensagem: 'Closet',
  },
  {
    slug: 'home-office',
    nome: 'Home office',
    curto: 'Home office',
    titulo: 'Home office planejado sob medida | Marcenaria Damadi, Tremembé',
    descricao:
      'Home office sob medida pela Marcenaria Damadi, em Tremembé. Bancada, nichos e armários que cabem no seu espaço e deixam o trabalho organizado.',
    texto:
      'Trabalhar em casa pede mesa na altura certa, lugar para cabos e equipamentos e armazenamento que esconda a bagunça. Fazemos bancadas, nichos e armários sob medida para caber em um quarto, na sala ou até em um corredor. O projeto considera a luz, as tomadas e como você trabalha, para o espaço ficar prático e agradável.',
    mensagem: 'Home office',
  },
  {
    slug: 'sala-paineis',
    nome: 'Sala e painéis',
    curto: 'Sala, painéis e ripados',
    titulo: 'Painéis ripados e móveis para sala sob medida | Marcenaria Damadi',
    descricao:
      'Painéis ripados, racks e móveis de sala sob medida pela Marcenaria Damadi, em Tremembé, Zona Norte de SP. Projeto cuidadoso e instalação no local.',
    texto:
      'A sala é o cartão de visitas da casa. Fazemos painéis de TV, racks, estantes e painéis ripados, que trazem a madeira para dentro do ambiente com muito charme. Cada peça é desenhada para a sua parede, com passagem de fios escondida e acabamento caprichado. Conversamos sobre o estilo que você quer e adaptamos ao orçamento.',
    mensagem: 'Sala e painéis',
  },
  {
    slug: 'espacos-pequenos',
    nome: 'Espaços pequenos',
    curto: 'Espaços pequenos',
    titulo: 'Móveis planejados para apartamentos pequenos | Marcenaria Damadi',
    descricao:
      'Móveis planejados que aproveitam espaços mínimos. Marcenaria Damadi, em Tremembé, Zona Norte de SP, faz soluções sob medida para apartamentos e casas pequenas.',
    texto:
      'Pouco espaço não precisa significar pouca função. Móveis planejados aproveitam até os cantos mais difíceis: nichos acima de portas, camas com baú, armários até o teto, bancadas que dobram. Medimos com atenção e desenhamos cada solução para o seu caso. Você ganha armazenamento, circulação livre e um ambiente que parece maior.',
    mensagem: 'Espaços pequenos',
  },
]

export const projetos: Projeto[] = []

export const ambientePorSlug = (slug: string): Ambiente | undefined =>
  ambientes.find((a) => a.slug === slug)
