import { describe, expect, it } from 'vitest'
import { statusAgora } from './horario'

// São Paulo é UTC-3 o ano todo (sem horário de verão desde 2019).
const sp = (iso: string) => new Date(`${iso}-03:00`)

describe('statusAgora', () => {
  it('aberto em dia útil no expediente', () => {
    expect(statusAgora(sp('2026-10-28T10:00:00')).aberto).toBe(true)
  })
  it('abre às 8h30 em ponto e fecha às 18h em ponto', () => {
    expect(statusAgora(sp('2026-10-28T08:29:00')).aberto).toBe(false)
    expect(statusAgora(sp('2026-10-28T08:30:00')).aberto).toBe(true)
    expect(statusAgora(sp('2026-10-28T17:59:00')).aberto).toBe(true)
    expect(statusAgora(sp('2026-10-28T18:00:00')).aberto).toBe(false)
  })
  it('depois do expediente abre amanhã', () => {
    expect(statusAgora(sp('2026-10-28T19:00:00')).texto).toBe('Fechado, abre amanhã às 8h30')
  })
  it('sexta à noite e fim de semana abrem na segunda', () => {
    expect(statusAgora(sp('2026-10-30T19:00:00')).texto).toBe('Fechado, abre seg às 8h30')
    expect(statusAgora(sp('2026-10-31T12:00:00')).texto).toBe('Fechado, abre seg às 8h30')
    expect(statusAgora(sp('2026-11-01T12:00:00')).aberto).toBe(false)
  })
  it('usa o fuso de São Paulo, não o do servidor', () => {
    expect(statusAgora(new Date('2026-10-28T12:00:00Z')).aberto).toBe(true) // 09:00 em SP
    expect(statusAgora(new Date('2026-10-28T08:00:00Z')).aberto).toBe(false) // 05:00 em SP
  })
})
