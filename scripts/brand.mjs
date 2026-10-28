// Gera og-image.jpg (1200x630) e apple-touch-icon.png com a marca e as fontes do site.
// Uso: node scripts/brand.mjs (precisa do Chromium do Playwright). Resultado vai para public/.
import { readFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const sora = (await readFile('src/assets/fonts/sora-latin.woff2')).toString('base64')
const fonte = `@font-face{font-family:Sora;src:url(data:font/woff2;base64,${sora}) format('woff2');font-weight:100 800}`

const losango = (cor, interno) =>
  `<svg viewBox="0 0 34 34"><path d="M17 2 32 17 17 32 2 17Z" fill="${cor}"/><path d="M17 9 25 17 17 25 9 17Z" fill="${interno}"/></svg>`

const og = `<style>${fonte}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#241a14;color:#f4f4ec;font-family:Sora,sans-serif;position:relative;overflow:hidden;
background-image:repeating-linear-gradient(90deg,rgba(194,178,128,.14) 0,rgba(194,178,128,.14) 10px,transparent 10px,transparent 22px)}
.d{position:absolute;right:-120px;top:70px;width:520px;height:520px;background:#b8651b;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}
.d::after{content:"";position:absolute;inset:34px;background:#241a14;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}
.t{position:absolute;left:80px;top:90px;width:700px}
.m{display:flex;align-items:center;gap:20px}.m svg{width:76px}
.m b{font-size:52px;letter-spacing:.08em}
.s{font-size:15px;letter-spacing:.3em;color:#d1c297;text-transform:uppercase;margin-top:8px}
h1{font-size:64px;line-height:1.08;letter-spacing:-.02em;margin-top:70px}
p{font-size:28px;color:#e9e9db;margin-top:28px}
</style><div class="d"></div><div class="t"><div class="m">${losango('#b8651b', '#241a14')}<div><b>DAMADI</b><div class="s">Marcenaria</div></div></div>
<h1>Móveis planejados sob medida</h1><p>Tremembé, Zona Norte de São Paulo</p></div>`

const icone = `<style>${fonte}*{margin:0}body{width:180px;height:180px;background:#f4f4ec;display:grid;place-items:center}svg{width:120px}</style>${losango('#b8651b', '#f4f4ec')}`

const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
await p.setContent(og)
await p.evaluate(() => document.fonts.ready)
await p.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 86 })
await p.setViewportSize({ width: 180, height: 180 })
await p.setContent(icone)
await p.screenshot({ path: 'public/apple-touch-icon.png' })
await b.close()
