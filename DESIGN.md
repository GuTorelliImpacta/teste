# Design: "Oficina Contemporânea"

Calor de madeira + precisão geométrica da marca (losango). Ateliê organizado: acolhedor, confiável, sem frescura.

## Tokens (`src/styles/index.css`, `@theme`)

| Token           | Base                                                          | Uso                   |
| --------------- | ------------------------------------------------------------- | --------------------- |
| `cream` 50–300  | #F4F4EC (100)                                                 | fundo principal       |
| `olive` 50–900  | #5F5F3C (700) para seções, #4A4A2E (800) rodapé               | seções de destaque    |
| `copper` 50–900 | #B8651B (500, só gráficos), **#9A5214 (600, botões e texto)** | CTA, losango, acentos |
| `khaki` 100–600 | #C2B280 (400)                                                 | filetes, detalhes     |
| `ink` 50–900    | #241A14 (900)                                                 | texto, hero, contato  |
| `wa` 500–700    | #0E7A3E (600)                                                 | botão WhatsApp        |

Contraste: `npm test` valida 15 pares (texto ≥ 4,5:1; gráficos ≥ 3:1).
Superfícies alternam: hero `ink` → faixa `cream` → galeria `cream` → processo `cream` → diferenciais `olive` → avaliações/FAQ `cream` → contato `ink` → rodapé `olive`.

## Tipografia

Sora (títulos, geométrica, combina com o wordmark) e Inter (corpo). H1 `clamp(2rem → 3.5rem)`, corpo 17 px, entrelinha 1,5.

## Elementos de marca (CSS puro)

- `losango`: `clip-path` para máscaras e marcadores.
- `ripado` / `ripado-escuro`: ripas verticais com `repeating-linear-gradient`.
- `corte`: canto angular.
- Filetes `khaki` como divisores (herdam o "— MARCENARIA —" do logo).

## Componentes

Header, Hero, TrustBar, Galeria (bento + filtro + `<dialog>`), Processo, Diferenciais, Avaliacoes, Faq (`<details>`), Contato (mapa sob clique), StickyCTA (mobile), Footer, Picture (`srcset` AVIF/WebP/JPEG).

## Movimento

Transições de 150–300 ms, reveal por `IntersectionObserver` (só opacity/transform), `prefers-reduced-motion` respeitado. Sem biblioteca de animação.

## Logo

Marca provisória em SVG + texto. Trocar pelo vetor original (ver `content/PENDENCIAS.md`).
