import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./index.css', import.meta.url), 'utf8')
const cor = (nome: string): string => {
  const m = css.match(new RegExp(`--color-${nome}:\\s*(#[0-9a-f]{6})`, 'i'))
  if (!m) throw new Error(`token ${nome} não existe`)
  return m[1]
}
const lum = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const razao = (a: string, b: string): number => {
  const [x, y] = [lum(cor(a)), lum(cor(b))].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

// [texto, fundo, mínimo WCAG AA]
const pares: [string, string, number][] = [
  ['ink-900', 'cream-100', 4.5],
  ['ink-500', 'cream-100', 4.5],
  ['copper-600', 'cream-100', 4.5],
  ['cream-100', 'copper-600', 4.5],
  ['cream-100', 'olive-700', 4.5],
  ['cream-100', 'olive-800', 4.5],
  ['cream-100', 'ink-900', 4.5],
  ['khaki-300', 'ink-900', 4.5],
  ['cream-200', 'olive-700', 4.5],
  ['khaki-300', 'olive-700', 3],
  ['copper-300', 'ink-900', 4.5],
  ['cream-50', 'wa-600', 4.5],
  ['cream-100', 'wa-700', 4.5],
  ['copper-500', 'cream-100', 3],
  ['khaki-600', 'cream-100', 3],
]

describe('contraste WCAG AA', () => {
  it.each(pares)('%s sobre %s ≥ %s', (texto, fundo, minimo) => {
    expect(razao(texto, fundo)).toBeGreaterThanOrEqual(minimo)
  })
})
