import { site } from '../data/site'

export type Origem =
  'header' | 'hero' | 'galeria' | 'card' | 'sticky' | 'rodape' | 'processo' | 'ambiente'

export const linkWhatsApp = (mensagem: string): string =>
  `https://wa.me/${site.telefone.wa}?text=${encodeURIComponent(mensagem)}`

export const mensagemGeral = (): string =>
  'Olá! Vim pelo site da Damadi e gostaria de um orçamento.'

export const mensagemAmbiente = (ambiente: string, bairro?: string): string => {
  const base = `Olá! Vim pelo site da Damadi e quero um orçamento de ${ambiente}.`
  const b = bairro?.trim()
  return b ? `${base} Moro em ${b}.` : base
}

export const mensagemProjeto = (titulo: string): string =>
  `Olá! Vi o projeto "${titulo}" no site e quero algo parecido.`
