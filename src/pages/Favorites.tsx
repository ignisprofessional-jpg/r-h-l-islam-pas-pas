import { useState } from 'react'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { duaById } from '../data/duas'
import { lessonById } from '../data/lessons'
import { EmptyState, IconButton, LinkButton, PageHeader, Tabs } from '../components/ui'
import { VerseQuote } from '../components/Content'
import { DuaCard } from './Duas'
import { LessonList } from '../components/LessonList'

type Tab = 'verses' | 'duas' | 'lessons'

export default function Favorites() {
  useDocumentTitle('Mes favoris')
  const favs = useApp((s) => s.favorites)
  const toggleFavorite = useApp((s) => s.toggleFavorite)
  const [tab, setTab] = useState<Tab>('verses')
  return (
    <div className="animate-in">
      <PageHeader title="Mes favoris" arabic="المفضلة" icon="heart" subtitle="Les versets, invocations et leçons que vous avez mis de côté, pour les retrouver facilement." />
      <Tabs
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'verses', label: `Versets (${favs.verses.length})`, icon: 'book' },
          { id: 'duas', label: `Invocations (${favs.duas.length})`, icon: 'hands' },
          { id: 'lessons', label: `Leçons (${favs.lessons.length})`, icon: 'graduation' },
        ]}
      />
      {tab === 'verses' &&
        (favs.verses.length === 0 ? (
          <EmptyState icon="heart" title="Aucun verset favori" text="Dans le lecteur du Coran, touchez le cœur à côté d’un verset pour l’ajouter ici." action={<LinkButton to="/coran" size="sm">Ouvrir le Coran</LinkButton>} />
        ) : (
          <div>
            {favs.verses.map((k) => (
              <div key={k} className="relative">
                <VerseQuote verseKey={k} />
                <div className="absolute right-3 top-3">
                  <IconButton icon="x" label="Retirer des favoris" onClick={() => toggleFavorite('verses', k)} />
                </div>
              </div>
            ))}
          </div>
        ))}
      {tab === 'duas' &&
        (favs.duas.length === 0 ? (
          <EmptyState icon="hands" title="Aucune invocation favorite" action={<LinkButton to="/douas" size="sm">Voir les invocations</LinkButton>} />
        ) : (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
            {favs.duas.map((id) => {
              const d = duaById(id)
              return d ? <DuaCard key={id} d={d} /> : null
            })}
          </div>
        ))}
      {tab === 'lessons' &&
        (favs.lessons.length === 0 ? (
          <EmptyState icon="graduation" title="Aucune leçon favorite" action={<LinkButton to="/parcours" size="sm">Mon parcours</LinkButton>} />
        ) : (
          <LessonList lessons={favs.lessons.map(lessonById).filter((l) => !!l)} />
        ))}
    </div>
  )
}
