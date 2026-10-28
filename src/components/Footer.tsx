import { Link } from '../router'
import { ambientes } from '../data/projetos'
import { site } from '../data/site'
import { Logo } from './Logo'

const ano = new Date().getFullYear()

export function Footer() {
  const e = site.endereco
  return (
    <footer className="escuro bg-olive-800 pb-24 pt-12 text-cream-200 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <Logo escuro />
          <p className="mt-4 text-sm">
            {e.rua} – {e.bairro}
            <br />
            {e.cidade} – {e.uf}, {e.cep}
          </p>
        </div>
        <nav aria-label="Ambientes">
          <p className="font-display font-semibold text-cream-50">Ambientes</p>
          <ul className="mt-3 space-y-1 text-sm">
            {ambientes.map((a) => (
              <li key={a.slug}>
                <Link
                  className="inline-block py-1 hover:text-khaki-300"
                  to={`/portfolio/${a.slug}/`}
                >
                  {a.curto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <p className="font-display font-semibold text-cream-50">Institucional</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link className="inline-block py-1 hover:text-khaki-300" to="/sobre/">
                Sobre
              </Link>
            </li>
            <li>
              <Link className="inline-block py-1 hover:text-khaki-300" to="/privacidade/">
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs">
        © {ano} {site.razaoSocial || site.nome}
        {site.cnpj && ` · CNPJ ${site.cnpj}`}
      </p>
    </footer>
  )
}
