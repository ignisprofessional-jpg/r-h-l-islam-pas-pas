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
        <span className="rounded-full bg-ink/[0.06] px-3 py-1 text-[13px] font-medium text-muted">{attempted} quiz déjà tentés</span>
      </PageHeader>
      {groups.map((g) => (
        <section key={g}>
          <SectionTitle>{g === 'Thèmes' ? 'Par thème' : g === 'Coran' ? 'Coran et noms d’Allah' : 'Arabe coranique'}</SectionTitle>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {QUIZZES.filter((q) => q.group === g).map((q) => {
              const r = results[q.id]
              return (
                <Link key={q.id} to={`/quiz/${q.id}`} className="group flex items-center gap-3 rounded-[16px] bg-surface ring-1 ring-ink/[0.06] px-3 py-2.5 transition-all hover:ring-gold/45 sm:p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-ink sm:h-11 sm:w-11">
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
      <details className="group mt-6 sm:mt-8 [&_summary::-webkit-details-marker]:hidden">
      <summary className="mb-2 flex cursor-pointer list-none items-center justify-between gap-3 rounded-[16px] bg-surface ring-1 ring-ink/[0.06] px-3.5 py-3 sm:mb-3">
        <span>
          <span className="block font-display text-[19px] font-medium sm:text-2xl">Quiz de fin de leçon</span>
          <span className="text-[13px] text-muted">Un quiz à la fin de chaque cours — touchez pour voir la liste</span>
        </span>
        <Icon name="chevronDown" size={18} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
        {LESSONS.filter((l) => l.quiz?.length).map((l) => {
          const r = results[`lecon-${l.id}`]
          return (
            <Link key={l.id} to={`/cours/${l.id}#quiz`} className="flex items-center justify-between gap-3 rounded-[14px] bg-surface ring-1 ring-ink/[0.06] px-3.5 py-2.5 text-sm hover:ring-gold/45">
              <span className="font-medium">{l.title}</span>
              {r ? <Badge tone="green">{r.best}/{r.total}</Badge> : <Badge>{l.quiz!.length} questions</Badge>}
            </Link>
          )
        })}
      </div>
      </details>
    </div>
  )
}
