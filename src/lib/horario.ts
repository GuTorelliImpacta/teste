export interface StatusHorario {
  aberto: boolean
  texto: string
}

const ABRE = 8 * 60 + 30
const FECHA = 18 * 60
const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

function partesSaoPaulo(data: Date): { dia: number; minutos: number } {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(data)
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? ''
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const hora = Number(get('hour')) % 24
  return { dia, minutos: hora * 60 + Number(get('minute')) }
}

export function statusAgora(data: Date = new Date()): StatusHorario {
  const { dia, minutos } = partesSaoPaulo(data)
  const util = dia >= 1 && dia <= 5
  if (util && minutos >= ABRE && minutos < FECHA) {
    return { aberto: true, texto: 'Aberto agora, fecha às 18h' }
  }
  if (util && minutos < ABRE) return { aberto: false, texto: 'Fechado, abre hoje às 8h30' }
  let prox = dia
  do prox = (prox + 1) % 7
  while (prox === 0 || prox === 6)
  const amanha = prox === (dia + 1) % 7
  return { aberto: false, texto: `Fechado, abre ${amanha ? 'amanhã' : DIAS[prox]} às 8h30` }
}
