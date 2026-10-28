import manifesto from '../data/imagens.generated.json'

interface Entrada {
  width: number
  height: number
  larguras: number[]
}

const imagens = manifesto as Record<string, Entrada>

interface Props {
  imagem: string
  alt: string
  sizes: string
  prioridade?: boolean
  className?: string
}

const src = (chave: string, largura: number, ext: string) =>
  `/img/projetos/${chave}-${largura}.${ext}`

export function Picture({ imagem, alt, sizes, prioridade, className }: Props) {
  const info = imagens[imagem]
  if (!info) return null
  const set = (ext: string) => info.larguras.map((w) => `${src(imagem, w, ext)} ${w}w`).join(', ')
  const maior = info.larguras[info.larguras.length - 1]
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={src(imagem, maior, 'jpg')}
        srcSet={set('jpg')}
        sizes={sizes}
        width={info.width}
        height={info.height}
        alt={alt}
        className={className}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding={prioridade ? 'sync' : 'async'}
        fetchPriority={prioridade ? 'high' : undefined}
      />
    </picture>
  )
}
