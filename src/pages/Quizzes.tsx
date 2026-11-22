import { Link } from 'react-router-dom'
import { QUIZZES } from '../lib/quizzes'
import { LESSONS } from '../data/lessons'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { Badge, PageHeader, SectionTitle } from '../components/ui'
import { Icon } from '../components/Icon'

export default function Quizzes() {
  useDocumentTitle('Quiz et exercices')
  const results = useApp((s) => s.quizzes)
  const groups = [...new Set(QUIZZES.map((q) => q.group))]
  const attempted = Object.keys(results).length
  return (
    <div className="animate-in">
      <PageHeader title="Quiz et exercices" arabic="اختبر نفسك" icon="trophy" subtitle="Questions à choix multiples, vrai ou faux, mémorisation, lettres arabes, sourates… Chaque réponse est corrigée avec une explication. Vos meilleurs scores sont enregistrés.">
        <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{attempted} quiz déjà tentés</span>
      </PageHeader>
      {groups.map((g) => (
        <section key={g}>
          <SectionTitle>{g === 'Thèmes' ? 'Par thème' : g === 'Coran' ? 'Coran et noms d’Allah' : 'Arabe coranique'}</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUIZZES.filter((q) => q.group === g).map((q) => {
              const r = results[q.id]
              return (
                <Link key={q.id} to={`/quiz/${q.id}`} className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-gold/60">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-ink">
                    <Icon name={q.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{q.title}</span>
                    <span className="block text-sm text-muted">{q.text}</span>
                    {r && (
                      <Badge tone="green" className="mt-1">
                        Meilleur : {r.best}/{r.total}
                      </Badge>
                    )}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
      <SectionTitle>Quiz de fin de leçon</SectionTitle>
      <p className="-mt-1 mb-3 text-sm text-muted">Chaque cours se termine par un quiz. Voici ceux que vous avez déjà faits et ceux qui vous attendent.</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {LESSONS.filter((l) => l.quiz?.length).map((l) => {
          const r = results[`lecon-${l.id}`]
          return (
            <Link key={l.id} to={`/cours/${l.id}#quiz`} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm hover:border-gold/60">
              <span className="font-medium">{l.title}</span>
              {r ? <Badge tone="green">{r.best}/{r.total}</Badge> : <Badge>{l.quiz!.length} questions</Badge>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
