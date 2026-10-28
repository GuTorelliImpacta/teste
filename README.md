# Site da Marcenaria Damadi Junior

Site institucional + portfólio. Objetivo: levar o visitante ao WhatsApp com o pedido de orçamento. Preact + Tailwind + TypeScript, HTML pré-renderizado, sem backend.

## Rodar

```bash
npm ci
npm run dev          # desenvolvimento
npm run build        # gera dist/ (preview, aceita placeholders)
npm run build:prod   # build + falha se houver placeholder/TODO + orçamento de bundle
npm run preview      # serve dist/ em localhost:4173
npm run lint && npm run typecheck && npm test
npm run test:e2e     # Playwright + axe (npx playwright install chromium antes)
```

Variáveis (ver `.env.example`): `VITE_SITE_URL`, `VITE_ANALYTICS_DOMAIN`. São públicas, nunca coloque segredo.

## Como adicionar um projeto (sem programar)

1. Coloque a foto (JPEG/PNG, original) em `assets-cliente/projetos/<ambiente>/`. Ambientes: `cozinha`, `guarda-roupa`, `closet`, `home-office`, `sala-paineis`, `espacos-pequenos`.
2. Rode `npm run images` (gera as versões otimizadas e o manifesto).
3. Em `src/data/projetos.ts`, acrescente na lista `projetos`:

```ts
{
  id: 'cozinha-01',
  ambiente: 'cozinha',
  titulo: 'Cozinha em L',
  legenda: 'Cozinha em L em apartamento de 55 m²', // até 12 palavras, só fatos reais
  imagem: 'cozinha/nome-do-arquivo',               // pasta/arquivo sem extensão, em minúsculas
  alt: 'Cozinha planejada em L com cooktop e forno',
}
```

4. Faça commit de `public/img/projetos`, `src/data/imagens.generated.json` e `projetos.ts`. Os originais ficam fora do git.
   Para a foto do hero, preencha `heroImagem` e `heroAlt` em `src/data/site.ts`.

## Publicar (Vercel)

1. Importe o repositório. Build: `npm run build:prod`, saída: `dist`.
2. Defina `VITE_SITE_URL` com o domínio final. Cabeçalhos e cache já estão em `vercel.json`.
3. Aponte o domínio (registro.br/DNS) para a Vercel. Depois siga `docs/GOOGLE-BUSINESS-PROFILE.md`.

## Mapa do projeto

`src/data` conteúdo editável · `src/components` UI · `src/pages` rotas · `src/lib` WhatsApp, horário, SEO · `scripts` imagens, prerender, checagens · `content/PENDENCIAS.md` o que falta do cliente · `DESIGN.md` · `DECISIONS.md`.
