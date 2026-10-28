export interface Pergunta {
  pergunta: string
  resposta: string
  /** true = resposta genérica até o cliente confirmar o dado (ver content/PENDENCIAS.md). */
  pendente?: boolean
}

export const faq: Pergunta[] = [
  {
    pergunta: 'Como peço um orçamento?',
    resposta:
      'Pelo WhatsApp. Conte qual ambiente você quer e responda às perguntas. Respondemos em horário comercial, de segunda a sexta, das 8h30 às 18h.',
  },
  {
    pergunta: 'O que devo enviar para o orçamento?',
    resposta:
      'Fotos do espaço, as medidas aproximadas e, se tiver, referências do que você gosta. Com isso já dá para conversar. A medição definitiva é feita no local.',
  },
  {
    pergunta: 'Qual é o prazo de entrega?',
    resposta:
      'O prazo depende do projeto e é combinado antes de fechar. Nosso compromisso é entregar dentro do que foi combinado.',
    pendente: true,
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Temos condições especiais de pagamento. Fale com a gente pelo WhatsApp para ver o que cabe no seu orçamento.',
    pendente: true,
  },
  {
    pergunta: 'Quais regiões vocês atendem?',
    resposta:
      'Estamos no Tremembé, na Zona Norte de São Paulo. Chame no WhatsApp com o seu bairro para confirmarmos o atendimento.',
    pendente: true,
  },
  {
    pergunta: 'Vocês trabalham com projeto de arquiteto?',
    resposta:
      'Sim, podemos conversar sobre projetos que você já tenha. Envie o desenho ou as medidas e avaliamos juntos.',
    pendente: true,
  },
  {
    pergunta: 'Os móveis têm garantia?',
    resposta:
      'Os detalhes da garantia são passados no orçamento, por escrito. Pergunte no WhatsApp para o seu caso.',
    pendente: true,
  },
]
