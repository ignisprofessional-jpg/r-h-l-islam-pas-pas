import { useDocumentTitle } from '../lib/hooks'
import { EmptyState, LinkButton } from '../components/ui'

export default function NotFound() {
  useDocumentTitle('Page introuvable')
  return (
    <div className="py-16">
      <EmptyState icon="compass" title="Cette page n’existe pas" text="Le lien est peut-être incorrect. Revenez à l’accueil ou utilisez la recherche." action={<LinkButton to="/" icon="home">Retour à l’accueil</LinkButton>} />
    </div>
  )
}
