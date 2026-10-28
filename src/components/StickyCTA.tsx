import { useEffect, useState } from 'preact/hooks'
import { CtaLigar, CtaWhatsApp } from './Cta'

/** Barra fixa só no mobile, depois que o hero sai da tela. */
export function StickyCTA({ chave }: { chave: string }) {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const contato = document.getElementById('contato')
    let heroFora = !hero
    let contatoVisivel = false
    const atualizar = () => setVisivel(heroFora && !contatoVisivel)
    const io = new IntersectionObserver((entradas) => {
      for (const en of entradas) {
        if (en.target === hero) heroFora = !en.isIntersecting
        if (en.target === contato) contatoVisivel = en.isIntersecting
      }
      atualizar()
    })
    if (hero) io.observe(hero)
    if (contato) io.observe(contato)
    atualizar()
    return () => io.disconnect()
  }, [chave])

  if (!visivel) return null
  return (
    <div
      role="region"
      aria-label="Contato rápido"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t border-khaki-300 bg-cream-100/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
    >
      <CtaWhatsApp origem="sticky" variante="whatsapp" className="!min-h-14">
        Pedir orçamento
      </CtaWhatsApp>
      <CtaLigar origem="sticky" className="!min-h-14" />
    </div>
  )
}
