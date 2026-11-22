import { Link } from 'react-router-dom'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { LESSONS, LEVELS, lessonById } from '../data/lessons'
import { LEARN_SURAHS } from '../data/learnSurahs'
import { DUAS } from '../data/duas'
import { LETTERS } from '../data/arabic'
import { GUIDE } from '../data/prayer'
import { WUDU_STEPS } from '../data/wudu'
import chapters from '../data/chapters.json'
import { activityStats, levelProgress, overallProgress } from '../lib/progress'
import { quizById } from '../lib/quizzes'
import { relativeFr } from '../lib/dates'
import { Badge, Card, EmptyState, Note, PageHeader, ProgressBar, SectionTitle, LinkButton } from '../components/ui'
import { ActivityCalendar, GoalsCard } from '../components/Widgets'
import { Icon } from '../components/Icon'

function Stat({ icon, value, label, sub }: { icon: string; value: string | number; label: string; sub?: string }) {
  return (
    <Card className="p-3 sm:p-4">
      <Icon name={icon} size={18} className="text-gold" />
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums sm:mt-2 sm:text-3xl">{value}</p>
      <p className="text-sm font-semibold">{label}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </Card>
  )
}

export default function ProgressPage() {
  useDocumentTitle('Ma progression')
  const s = useApp()
  const overall = overallProgress(s)
  const stats = activityStats(s.activity)
  const done = LESSONS.filter((l) => s.lessons[l.id]?.status === 'done')
  const review = LESSONS.filter((l) => s.lessons[l.id]?.status === 'review')
  const learnedSurahs = chapters.filter((c) => s.surahs[c.id]?.learned)
  const readSurahs = chapters.filter((c) => s.surahs[c.id]?.read)
  const memorizedDuas = DUAS.filter((d) => s.duas[d.id])
  const quizEntries = Object.entries(s.quizzes).sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
  const avgQuiz = quizEntries.length ? Math.round((quizEntries.reduce((a, [, r]) => a + r.best / r.total, 0) / quizEntries.length) * 100) : 0
  const quizLabel = (id: string) => quizById(id)?.title ?? (id.startsWith('lecon-') ? lessonById(id.slice(6))?.title : id.startsWith('sourate-') ? `Exercice : ${LEARN_SURAHS.find((x) => id.endsWith(`-${x.id}`))?.name ?? 'sourate'}` : id === 'test-arabe' ? 'Test rapide d’arabe' : id)

  return (
    <div className="animate-in">
      <PageHeader title="Ma progression" arabic="تقدمي" icon="chart" subtitle="Vos leçons, sourates, invocations, objectifs et statistiques — enregistrés automatiquement sur cet appareil.">
        <div className="flex items-center gap-3">
          <ProgressBar value={overall.pct} className="max-w-sm bg-white/20" label="Progression générale" />
          <span className="text-sm font-semibold">{overall.pct}% du parcours complet</span>
        </div>
      </PageHeader>

      <Note tone="gentle" title="Votre rythme est le bon">
        Ces statistiques sont là pour vous encourager, pas pour vous juger. Un jour sans apprentissage n’efface rien : tout ce que vous avez appris reste acquis, et vous reprenez simplement où vous en étiez.
      </Note>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        <Stat icon="book" value={done.length} label="Leçons terminées" sub={`sur ${LESSONS.length}`} />
        <Stat icon="sparkle" value={learnedSurahs.length} label="Sourates apprises" sub={`${readSurahs.length} lues`} />
        <Stat icon="hands" value={memorizedDuas.length} label="Invocations mémorisées" sub={`sur ${DUAS.length}`} />
        <Stat icon="calendar" value={stats.activeDays} label="Jours d’apprentissage" sub={`${stats.last30} ces 30 derniers jours`} />
        <Stat icon="letters" value={`${(s.steps['lettres'] ?? []).length}/${LETTERS.length}`} label="Lettres arabes" />
        <Stat icon="prayer" value={`${(s.steps['guide-priere'] ?? []).length}/${GUIDE.length}`} label="Étapes de la prière" />
        <Stat icon="drop" value={`${(s.steps['wudu'] ?? []).length}/${WUDU_STEPS.length}`} label="Étapes des ablutions" />
        <Stat icon="trophy" value={quizEntries.length ? `${avgQuiz}%` : '—'} label="Réussite aux quiz" sub={`${quizEntries.length} quiz tentés`} />
      </div>

      <SectionTitle>Par niveau</SectionTitle>
      <div className="grid gap-3 md:grid-cols-3">
        {LEVELS.map((l) => {
          const p = levelProgress(l.id, s)
          return (
            <Card key={l.id} className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{l.label}</p>
                <span className="arabic text-gold">{l.arabic}</span>
              </div>
              <ProgressBar value={p.pct} className="my-2" label={`Niveau ${l.label}`} />
              <p className="text-sm text-muted">
                {p.done}/{p.total} modules · {p.pct}%
              </p>
            </Card>
          )
        })}
      </div>

      <div className="mt-2 grid gap-5 lg:grid-cols-2">
        <div>
          <SectionTitle>Calendrier de progression</SectionTitle>
          <Card className="p-4 sm:p-5">
            <ActivityCalendar />
          </Card>
        </div>
        <div>
          <SectionTitle>Objectifs de la semaine</SectionTitle>
          <Card className="p-4 sm:p-5">
            <GoalsCard />
          </Card>
        </div>
      </div>

      <div className="mt-2 grid gap-5 lg:grid-cols-2">
        <div>
          <SectionTitle>Leçons à revoir</SectionTitle>
          {review.length === 0 ? (
            <EmptyState icon="refresh" title="Aucune leçon à revoir" text="Sur chaque leçon, le bouton « À revoir plus tard » l’ajoute ici." />
          ) : (
            <Card className="divide-y divide-line">
              {review.map((l) => (
                <Link key={l.id} to={`/cours/${l.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2/50">
                  <span className="font-medium">{l.title}</span>
                  <Badge tone="gold">À revoir</Badge>
                </Link>
              ))}
            </Card>
          )}
        </div>
        <div>
          <SectionTitle>Leçons terminées</SectionTitle>
          {done.length === 0 ? (
            <EmptyState icon="book" title="Pas encore de leçon terminée" action={<LinkButton to="/parcours" size="sm">Voir mon parcours</LinkButton>} />
          ) : (
            <Card className="max-h-80 divide-y divide-line overflow-y-auto">
              {done.map((l) => (
                <Link key={l.id} to={`/cours/${l.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2/50">
                  <span className="font-medium">{l.title}</span>
                  <span className="text-xs text-muted">{relativeFr(s.lessons[l.id].updatedAt)}</span>
                </Link>
              ))}
            </Card>
          )}
        </div>
        <div>
          <SectionTitle>Sourates apprises</SectionTitle>
          {learnedSurahs.length === 0 ? (
            <EmptyState icon="sparkle" title="Aucune sourate marquée comme apprise" action={<LinkButton to="/sourates" size="sm">Commencer par Al-Fâtiha</LinkButton>} />
          ) : (
            <Card className="flex flex-wrap gap-2 p-4">
              {learnedSurahs.map((c) => (
                <Link key={c.id} to={`/coran/${c.id}`} className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
                  {c.nameSimple}
                </Link>
              ))}
            </Card>
          )}
        </div>
        <div>
          <SectionTitle>Invocations mémorisées</SectionTitle>
          {memorizedDuas.length === 0 ? (
            <EmptyState icon="hands" title="Aucune invocation mémorisée" action={<LinkButton to="/douas" size="sm">Voir les invocations</LinkButton>} />
          ) : (
            <Card className="flex flex-wrap gap-2 p-4">
              {memorizedDuas.map((d) => (
                <Link key={d.id} to={`/douas?cat=${d.cat}#${d.id}`} className="rounded-full bg-gold-soft px-3 py-1 text-sm font-semibold text-gold">
                  {d.title}
                </Link>
              ))}
            </Card>
          )}
        </div>
      </div>

      <SectionTitle>Résultats des quiz</SectionTitle>
      {quizEntries.length === 0 ? (
        <EmptyState icon="trophy" title="Aucun quiz pour l’instant" action={<LinkButton to="/quiz" size="sm">Faire un quiz</LinkButton>} />
      ) : (
        <Card className="divide-y divide-line">
          {quizEntries.slice(0, 15).map(([id, r]) => (
            <div key={id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span className="font-medium">{quizLabel(id)}</span>
              <span className="flex items-center gap-2 text-muted">
                <Badge tone={r.best / r.total >= 0.7 ? 'green' : 'gold'}>
                  {r.best}/{r.total}
                </Badge>
                <span className="hidden sm:inline">{r.attempts} essai{r.attempts > 1 ? 's' : ''}</span>
              </span>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
