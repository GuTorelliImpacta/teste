const env = import.meta.env as Record<string, string | undefined> | undefined

export const site = {
  nome: 'Marcenaria Damadi Junior',
  marca: 'Damadi',
  url: env?.VITE_SITE_URL ?? 'https://marcenariadamadi.com.br',
  analyticsDomain: env?.VITE_ANALYTICS_DOMAIN ?? '',
  telefone: { exibicao: '(11) 94622-1978', e164: '+5511946221978', wa: '5511946221978' },
  instagram: { usuario: '@marcenariadamadi', url: 'https://www.instagram.com/marcenariadamadi' },
  endereco: {
    rua: 'Rua Carmésia, 42',
    bairro: 'Tremembé',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '02350-060',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Marcenaria+Damadi+Junior+Rua+Carm%C3%A9sia+42+Trememb%C3%A9+S%C3%A3o+Paulo',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Rua+Carm%C3%A9sia+42+Trememb%C3%A9+S%C3%A3o+Paulo&output=embed',
  horario: { dias: 'Seg a sex', abre: '08:30', fecha: '18:00', texto: 'Seg a sex, 8h30 às 18h' },
  avaliacao: { nota: '5,0', total: 6 },
  anosExperiencia: '20',
  /** Prazo real em semanas. Vazio = texto padrão "combinado em contrato". */
  prazoTexto: '',
  /** Região atendida. Vazio = a resposta do FAQ fica genérica (ver content/PENDENCIAS.md). */
  regiaoAtendida: '',
  /** CNPJ e razão social: vazios até o cliente enviar. O rodapé oculta o que estiver vazio. */
  cnpj: '',
  razaoSocial: '',
  /** Foto real para o hero (chave de imagens.generated.json). Vazio = bloco tipográfico. */
  heroImagem: '',
  heroAlt: '',
  /** Nome "Junior" na copy só depois de autorizado. */
  usarNomeJunior: false,
} as const
