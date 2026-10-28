# Decisões

## 1. Preact + prerender próprio, em vez de React + vite-react-ssg

O prompt pedia JS inicial ≤ 100 KB gzip. Com React 19 + React Router 6 + vite-react-ssg o JS da home ficou em ~111 KB. Preact (via `@preact/preset-vite`, mesma API de componentes e hooks) derrubou para **~19 KB**. O vite-react-ssg não funciona com Preact (renderiza no servidor com `react-dom/server`), então o prerender é `scripts/prerender.mjs`: build do cliente + build SSR (`src/entry-server.tsx`) + `preact-render-to-string`, que grava `dist/<rota>/index.html`, `404.html`, `sitemap.xml` e `robots.txt`.
Efeito colateral bom: nenhum script inline, então a CSP pode ser `script-src 'self'` sem hash.
Alternativa descartada: Next.js `output: 'export'` (runtime maior, sem ganho para um site estático).

## 2. Router próprio (~100 linhas)

`src/router.tsx` + `src/rotas.ts`. Cinco rotas, `Link` com `href` real (funciona sem JS), páginas secundárias com code splitting (`import()`), Home no bundle principal para não criar cascata no LCP. Menos dependências = menos risco de cadeia de suprimentos.

## 3. Head sem biblioteca

`src/lib/head.ts` gera as tags (title, description, canonical, OG/Twitter, JSON-LD) a partir de dados tipados. No build vira HTML; no cliente troca as tags marcadas com `data-head`.

## 4. Cores ajustadas para contraste AA

O cobre da marca (#B8651B) dá só 3,9:1 sobre o creme e 4,3:1 com texto branco. Mantido (`copper-500`) para elementos gráficos; botões e texto usam `copper-600` (#9A5214, 5,9:1). Oliva de texto: `olive-700`. Verde do WhatsApp: `wa-600` (#0E7A3E). `src/styles/contraste.test.ts` valida os pares.

## 5. Galeria sem fotos

Sem fotos reais, cada ambiente aparece como cartão "TODO foto real" (`data-placeholder`). `npm run build:prod` falha enquanto houver placeholder. `npm run build` (preview) passa.

## 6. Imagens versionadas já otimizadas

`npm run images` lê `assets-cliente/projetos/**` (fora do git) e grava AVIF/WebP/JPEG em `public/img/projetos` + `src/data/imagens.generated.json`; esses ficam no git para a Vercel não precisar dos originais. Sem `assets-cliente/projetos`, o script não faz nada.

## 7. Fontes

Sora (títulos) e Inter (corpo), variáveis, subset latin, self-host em WOFF2 (via @fontsource, licença OFL), `font-display: swap` com fontes de reserva ajustadas (`size-adjust`) para evitar CLS.

## 8. Analytics

Desligado por padrão. Com `VITE_ANALYTICS_DOMAIN` carrega Plausible (sem cookie). A CSP já libera `plausible.io`. Se trocar de provedor, ajustar `vercel.json`.

## 9. Segurança

Zero `dangerouslySetInnerHTML`/`eval` (regras de ESLint), `npm audit` sem vulnerabilidades, `ignore-scripts=true` no `.npmrc`, Dependabot, CSP restritiva, HSTS e demais cabeçalhos em `vercel.json`. Mapa do Google só em iframe após clique (`frame-src https://www.google.com`).

## 10. Posicionamento

"Marcenaria experiente, projeto sob medida, prazo cumprido, preço justo", conforme as artes do cliente. Sem "luxo" ou "alto padrão". Trocar exige mexer só em `Hero.tsx`, `Diferenciais.tsx` e `Home.tsx`.

## 11. ESLint 9

`eslint-plugin-jsx-a11y` ainda não suporta ESLint 10.
