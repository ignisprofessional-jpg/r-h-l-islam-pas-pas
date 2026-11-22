import { LESSONS } from '../data/lessons'
import { CATEGORIES, type CategoryId } from '../data/types'
import { useDocumentTitle } from '../lib/hooks'
import { PageHeader, SectionTitle, Note, Tile, LinkButton } from '../components/ui'
import { LessonList } from '../components/LessonList'

const byCat = (...c: CategoryId[]) => LESSONS.filter((l) => c.includes(l.category))

export function PillarsHub() {
  useDocumentTitle('Les piliers')
  return (
    <div className="animate-in">
      <PageHeader title="Les piliers de l'islam et de la foi" subtitle="Les cinq actes fondamentaux de l'islam et les six croyances de la foi, expliqués simplement avec leur sens, leurs conditions et leurs modalités." icon="columns" arabic="الأركان" />
      <SectionTitle>Les cinq piliers de l’islam</SectionTitle>
      <LessonList lessons={['piliers-intro', 'shahada', 'pilier-salat', 'pilier-zakat', 'pilier-siyam', 'pilier-hajj'].map((id) => LESSONS.find((l) => l.id === id)!)} />
      <SectionTitle>Les six piliers de la foi (îmân)</SectionTitle>
      <LessonList lessons={['iman-six-piliers', 'qui-est-allah', 'anges', 'livres', 'prophetes', 'jour-dernier', 'destin'].map((id) => LESSONS.find((l) => l.id === id)!)} />
      <div className="mt-6 flex flex-wrap gap-2">
        <LinkButton to="/quiz/quiz-piliers" icon="trophy">
          Quiz sur les piliers
        </LinkButton>
      </div>
    </div>
  )
}

export function BasicsHub() {
  useDocumentTitle("Bases de l'islam")
  return (
    <div className="animate-in">
      <PageHeader title="Apprendre les bases de l'islam" subtitle="Des cours progressifs sur la foi, la vie du Prophète ﷺ, l'histoire et le bon comportement." icon="star" arabic="أساسيات" />
      <SectionTitle>Les fondements de la foi</SectionTitle>
      <LessonList lessons={byCat('foi')} />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Tile to="/bases/noms-allah" icon="star" title="Les 99 noms d'Allah" text="Texte arabe, translittération et sens, avec un quiz." arabic="الأسماء الحسنى" />
      </div>
      <SectionTitle>Le Prophète ﷺ et l’histoire</SectionTitle>
      <LessonList lessons={byCat('prophete', 'histoire')} />
      <SectionTitle>Le bon comportement</SectionTitle>
      <LessonList lessons={byCat('comportement')} />
      <SectionTitle>Pour aller plus loin</SectionTitle>
      <LessonList lessons={byCat('coran', 'hadith', 'fiqh')} />
    </div>
  )
}

export function HalalHub() {
  useDocumentTitle('Halal et haram')
  return (
    <div className="animate-in">
      <PageHeader title="Le halal et le haram" subtitle="Comprendre les règles alimentaires avec leurs nuances, leurs références et les différents avis reconnus — sans culpabilisation." icon="leaf" arabic="الحلال والحرام" />
      <Note tone="gentle" title="Avancer sereinement">
        Ces règles s'apprennent et s'appliquent progressivement. L'islam pose un principe de facilité : « Allah veut pour vous la facilité » (sourate 2, verset 185). Ce qui a été fait par ignorance n'est pas reproché.
      </Note>
      <SectionTitle>{CATEGORIES.halal.label}</SectionTitle>
      <LessonList lessons={byCat('halal')} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Tile to="/questions" icon="help" title="Questions fréquentes" text="Famille non musulmane, santé, situations concrètes" />
        <Tile to="/cours/ecoles-juridiques" icon="graduation" title="Les écoles juridiques" text="Comprendre l’origine des différents avis" />
      </div>
    </div>
  )
}
