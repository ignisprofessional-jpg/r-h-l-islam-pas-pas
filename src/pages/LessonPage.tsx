import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { LESSONS, lessonById, LEVELS } from '../data/lessons'
import { CATEGORIES } from '../data/types'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { Badge, Button, Card, PageHeader, IconButton, toast, cx } from '../components/ui'
import { Blocks } from '../components/Content'
import { Quiz } from '../components/Quiz'
import { Icon } from '../components/Icon'
import NotFound from './NotFound'

export default function LessonPage() {
  const { id = '' } = useParams()
  const lesson = lessonById(id)
  useDocumentTitle(lesson?.title ?? 'Cours introuvable')
  const status = useApp((s) => s.lessons[id]?.status)
  const fav = useApp((s) => s.favorites.lessons.includes(id))
  const setLesson = useApp((s) => s.setLesson)
  const visit = useApp((s) => s.visitLesson)
  const toggleFavorite = useApp((s) => s.toggleFavorite)

  const { hash } = useLocation()
  useEffect(() => {
    if (lesson) visit(lesson.id)
  }, [lesson, visit])
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
    return () => clearTimeout(t)
  }, [hash, id])

  if (!lesson) return <NotFound />

  const siblings = LESSONS.filter((l) => l.category === lesson.category)
  const idx = siblings.findIndex((l) => l.id === lesson.id)
  const prev = siblings[idx - 1]
  const next = siblings[idx + 1]
  const cat = CATEGORIES[lesson.category]
  const backTo = { piliers: '/piliers', foi: '/bases', prophete: '/bases', comportement: '/bases', halal: '/halal', priere: '/priere', decouvrir: '/parcours', coran: '/parcours', hadith: '/parcours', fiqh: '/parcours', histoire: '/bases' }[lesson.category]

  return (
    <div className="animate-in">
      <PageHeader title={lesson.title} subtitle={lesson.summary} arabic={lesson.arabic} icon={lesson.icon} back={{ to: backTo, label: cat.label }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{LEVELS.find((l) => l.id === lesson.level)?.label}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
            <Icon name="clock" size={13} className="mr-1 inline" />
            {lesson.minutes} min
          </span>
          {status === 'done' && <span className="rounded-full bg-[#d6ad5c] px-3 py-1 text-sm font-semibold text-[#1b1406]">Terminée</span>}
          {status === 'review' && <span className="rounded-full bg-white/25 px-3 py-1 text-sm font-semibold">À revoir</span>}
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
        <article className="min-w-0">
          {lesson.sections.map((sec, i) => (
            <section key={i} id={`s${i}`} className="mb-8 scroll-mt-24">
              <h2 className="mb-2 flex items-center gap-3 font-display text-2xl font-semibold">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 font-sans text-sm text-gold">{i + 1}</span>
                {sec.title}
              </h2>
              <Blocks blocks={sec.blocks} />
            </section>
          ))}

          <Card className="mb-8 p-5">
            <p className="font-semibold">Où en êtes-vous avec cette leçon ?</p>
            <p className="text-sm text-muted">Votre choix est enregistré automatiquement.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                icon="checkCircle"
                variant={status === 'done' ? 'primary' : 'secondary'}
                onClick={() => {
                  setLesson(lesson.id, status === 'done' ? null : 'done')
                  if (status !== 'done') toast('Leçon terminée, bravo !')
                }}
              >
                {status === 'done' ? 'Leçon terminée' : 'J’ai terminé cette leçon'}
              </Button>
              <Button
                icon="refresh"
                variant={status === 'review' ? 'gold' : 'secondary'}
                onClick={() => {
                  setLesson(lesson.id, status === 'review' ? null : 'review')
                  if (status !== 'review') toast('Ajoutée aux leçons à revoir')
                }}
              >
                À revoir plus tard
              </Button>
            </div>
          </Card>

          {lesson.quiz && lesson.quiz.length > 0 && (
            <section className="mb-8" id="quiz">
              <Quiz
                id={`lecon-${lesson.id}`}
                questions={lesson.quiz}
                title="Quiz de fin de leçon"
                onDone={(score, total) => {
                  if (score / total >= 0.6 && !status) setLesson(lesson.id, 'done')
                }}
              />
            </section>
          )}

          {lesson.sources && (
            <div className="mb-8 rounded-2xl border border-line p-4 text-sm text-muted">
              <p className="mb-1 flex items-center gap-2 font-semibold text-ink">
                <Icon name="book" size={16} /> Sources
              </p>
              <ul className="list-inside list-disc space-y-0.5">
                {lesson.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs">Les versets sont chargés en direct depuis Quran.com. Les hadiths sont présentés par leur sens, avec leur référence dans les recueils. Pour toute situation personnelle, rapprochez-vous d’un imam ou d’une personne qualifiée.</p>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            {prev ? (
              <Link to={`/cours/${prev.id}`} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 hover:border-gold/60">
                <Icon name="arrowLeft" size={16} className="text-gold" />
                <span className="text-sm">
                  <span className="block text-xs text-muted">Leçon précédente</span>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/cours/${next.id}`} className="flex items-center justify-end gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-right hover:border-gold/60">
                <span className="text-sm">
                  <span className="block text-xs text-muted">Leçon suivante</span>
                  {next.title}
                </span>
                <Icon name="arrowRight" size={16} className="text-gold" />
              </Link>
            )}
          </div>
        </article>

        <aside className="order-first lg:order-none">
          <div className="space-y-3 lg:sticky lg:top-8">
            <Card className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold">Sommaire</p>
                <IconButton
                  icon="heart"
                  label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  active={fav}
                  onClick={() => {
                    toggleFavorite('lessons', lesson.id)
                    toast(fav ? 'Retiré des favoris' : 'Ajouté aux favoris')
                  }}
                />
              </div>
              <ol className="space-y-1 text-sm">
                {lesson.sections.map((sec, i) => (
                  <li key={i}>
                    <a href={`#s${i}`} className="block rounded-lg px-2 py-1 text-muted hover:bg-surface-2 hover:text-ink">
                      {i + 1}. {sec.title}
                    </a>
                  </li>
                ))}
                {lesson.quiz && (
                  <li>
                    <a href="#quiz" className={cx('block rounded-lg px-2 py-1 font-semibold text-primary hover:bg-surface-2')}>
                      Quiz ({lesson.quiz.length} questions)
                    </a>
                  </li>
                )}
              </ol>
            </Card>
            <div className="hidden lg:block">
              <Badge tone="neutral">{cat.label}</Badge>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
