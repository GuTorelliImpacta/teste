import { describe, expect, it } from 'vitest'
import { linkWhatsApp, mensagemAmbiente, mensagemGeral, mensagemProjeto } from './whatsapp'

describe('whatsapp', () => {
  it('monta o link com o número e a mensagem codificada', () => {
    const url = new URL(linkWhatsApp(mensagemGeral()))
    expect(url.origin + url.pathname).toBe('https://wa.me/5511946221978')
    expect(url.searchParams.get('text')).toBe(mensagemGeral())
  })
  it('inclui o bairro só quando informado', () => {
    expect(mensagemAmbiente('Cozinha')).toBe(
      'Olá! Vim pelo site da Damadi e quero um orçamento de Cozinha.',
    )
    expect(mensagemAmbiente('Cozinha', ' Jaçanã ')).toContain('Moro em Jaçanã.')
  })
  it('codifica aspas e acentos do título do projeto', () => {
    const url = new URL(linkWhatsApp(mensagemProjeto('Cozinha & "L"')))
    expect(url.searchParams.get('text')).toBe(
      'Olá! Vi o projeto "Cozinha & "L"" no site e quero algo parecido.',
    )
  })
})
