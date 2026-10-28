import { Seo } from '../components/Seo'
import { site } from '../data/site'

export function Component() {
  return (
    <section className="bg-cream-100 py-14 md:py-20">
      <Seo
        titulo="Política de privacidade | Marcenaria Damadi"
        descricao="Como o site da Marcenaria Damadi trata dados pessoais: sem cookies de rastreio, sem formulários e com contato direto pelo WhatsApp."
        caminho="/privacidade"
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 text-ink-700">
        <h1 className="h1 font-bold text-ink-900">Política de privacidade</h1>
        <p>Este site existe para você pedir um orçamento. Coletamos o mínimo possível.</p>
        <h2 className="pt-4 font-display text-2xl font-semibold text-ink-900">O que coletamos</h2>
        <p>
          O site não tem formulários, cadastro nem login e não usa cookies de rastreio. Medimos
          visitas de forma anônima, sem identificar você, apenas quando o analytics está ativo.
        </p>
        <h2 className="pt-4 font-display text-2xl font-semibold text-ink-900">WhatsApp</h2>
        <p>
          Ao clicar em “Pedir orçamento”, você abre uma conversa no WhatsApp, serviço de terceiro
          com política própria. Só recebemos o que você escrever e enviar. Usamos essas informações
          apenas para atender o seu pedido.
        </p>
        <h2 className="pt-4 font-display text-2xl font-semibold text-ink-900">Mapa e Instagram</h2>
        <p>
          O mapa do Google só carrega depois que você clica nele. Os links para Instagram e Google
          levam a sites de terceiros, com políticas próprias.
        </p>
        <h2 className="pt-4 font-display text-2xl font-semibold text-ink-900">Seus direitos</h2>
        <p>
          Pela LGPD, você pode pedir acesso, correção ou exclusão dos dados que nos enviou. Escreva
          para o nosso WhatsApp, {site.telefone.exibicao}.
        </p>
        <p>Fotos e depoimentos de clientes só são publicados com autorização.</p>
      </div>
    </section>
  )
}
