import { useEffect } from 'preact/hooks'
import { aplicarHeadNoDom, registrarHead, type DadosHead } from '../lib/head'

/** Define title, meta e JSON-LD da página. No build vira HTML; no cliente atualiza o <head>. */
export function Seo(props: DadosHead) {
  if (typeof window === 'undefined') registrarHead(props)
  useEffect(() => {
    aplicarHeadNoDom(props)
  }, [props.caminho]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
