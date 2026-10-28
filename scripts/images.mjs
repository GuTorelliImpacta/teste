// Gera AVIF/WebP/JPEG responsivos a partir de assets-cliente/projetos/<ambiente>/*.{jpg,jpeg,png}
// e o manifesto src/data/imagens.generated.json. Os originais nunca vão para o build.
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const ORIGEM = 'assets-cliente/projetos'
const SAIDA = 'public/img/projetos'
const LARGURAS = [480, 768, 1200, 1600]

const ambientes = await readdir(ORIGEM, { withFileTypes: true }).catch(() => null)
if (!ambientes) {
  console.log(`Sem ${ORIGEM}: nada a fazer (manifesto atual mantido).`)
  process.exit(0)
}

const manifesto = {}
await rm(SAIDA, { recursive: true, force: true })
for (const amb of ambientes.filter((e) => e.isDirectory())) {
  const arquivos = (await readdir(join(ORIGEM, amb.name))).filter((f) => /\.(jpe?g|png)$/i.test(f))
  for (const arquivo of arquivos) {
    const nome = parse(arquivo)
      .name.toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
    const chave = `${amb.name}/${nome}`
    const base = sharp(join(ORIGEM, amb.name, arquivo)).rotate()
    const { width, height } = await base.metadata()
    const larguras = LARGURAS.filter((w) => w <= width).concat(width < LARGURAS[0] ? [width] : [])
    await mkdir(join(SAIDA, amb.name), { recursive: true })
    for (const w of larguras) {
      const redim = base.clone().resize({ width: w, withoutEnlargement: true })
      const alvo = join(SAIDA, `${chave}-${w}`)
      await redim.clone().avif({ quality: 55 }).toFile(`${alvo}.avif`)
      await redim.clone().webp({ quality: 75 }).toFile(`${alvo}.webp`)
      await redim.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${alvo}.jpg`)
    }
    manifesto[chave] = { width, height, larguras }
    console.log(`${chave}: ${larguras.join(', ')}`)
  }
}
await writeFile('src/data/imagens.generated.json', JSON.stringify(manifesto, null, 2) + '\n')
