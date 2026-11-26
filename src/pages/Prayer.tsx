import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRAYERS, PRAYER_COURSE, GUIDE } from '../data/prayer'
import { useApp, NO_STEPS } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { Card, LinkButton, PageHeader, ProgressBar, SectionTitle, cx } from '../components/ui'
import { Blocks } from '../components/Content'
import { Icon } from '../components/Icon'
import { PrayerFigure } from '../components/Illustrations'
import { PrayerTimesCard } from '../components/Widgets'

export default function Prayer() {
  useDocumentTitle('La prière')
  const steps = useApp((s) => s.steps['guide-priere'] ?? NO_STEPS)
  const read = useApp((s) => s.steps['cours-priere'] ?? NO_STEPS)
  const toggleStep = useApp((s) => s.toggleStep)
  const [open, setOpen] = useState<string>('')
  const pct = Math.round((steps.length / GUIDE.length) * 100)

  return (
    <div className="animate-in">
      <PageHeader title="Apprendre à faire la prière" arabic="الصلاة" icon="prayer" subtitle="Un cours complet pour apprendre la salât depuis zéro : pourquoi prier, quand, comment, avec les gestes, les paroles et leur sens." />

      {/* Mode découverte */}
      <Card className="relative mb-4 overflow-hidden p-5 sm:mb-6 sm:p-7">
        <div className="relative grid items-center gap-5 sm:grid-cols-[1fr_200px]">
          <div>
                        <h2 className="mt-1 font-display text-[21px] font-medium leading-snug sm:text-3xl">Je découvre la prière</h2>
            <p className="mt-1 text-[15px] text-muted sm:text-base"><span className="sm:hidden">Le guide illustré, étape par étape.</span><span className="hidden sm:inline">Chaque position est illustrée, avec les paroles en arabe, la phonétique et le sens. Le mode lent explique tout tranquillement, sans rien supposer.</span></p>
            <div className="mt-3 flex items-center gap-3 sm:mt-4">
              <ProgressBar value={pct} className="max-w-xs" label="Progression du guide" />
              <span className="shrink-0 whitespace-nowrap text-sm text-muted">
                {steps.length}/{GUIDE.length} étapes
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
              <LinkButton to="/priere/guide?lent=1" icon="play">
                Je découvre la prière (lent)
              </LinkButton>
              <LinkButton to="/priere/guide" variant="secondary" icon="list">
                Guide normal
              </LinkButton>
            </div>
          </div>
          <div className="mx-auto hidden w-full max-w-[220px] grid-cols-3 gap-1 sm:grid">
            {(['takbir', 'ruku', 'sujud', 'qiyam', 'jalsa', 'salam'] as const).map((p) => (
              <PrayerFigure key={p} pose={p} className="aspect-square rounded-xl bg-surface-2/60" />
            ))}
          </div>
        </div>
      </Card>

      <PrayerTimesCard compact />

      <SectionTitle>Les cinq prières</SectionTitle>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
        {PRAYERS.map((p) => (
          <Link key={p.id} to={`/priere/${p.id}`} className="group rounded-[14px] bg-surface ring-1 ring-ink/[0.06] px-1 py-2.5 text-center transition-all hover:ring-gold/45 sm:rounded-2xl sm:p-4">
            <p className="arabic text-lg leading-tight text-gold sm:text-2xl">{p.arabic}</p>
            <p className="truncate text-[12px] font-semibold sm:text-base">{p.name.split(' (')[0]}</p>
            <p className="text-[11px] text-muted sm:text-sm">{p.rakaat} rak‘ats</p>
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: p.rakaat }).map((_, i) => (
                <span key={i} className="h-1 w-2 rounded-full bg-primary/70 sm:h-1.5 sm:w-4" />
              ))}
            </div>
          </Link>
        ))}
      </div>

      <SectionTitle>Le cours complet</SectionTitle>
      <p className="-mt-1 mb-3 text-sm text-muted">
        {read.length}/{PRAYER_COURSE.length} parties lues · ouvrez chaque partie, puis cochez « J’ai lu cette partie ».
      </p>
      <div className="space-y-1.5 sm:space-y-2">
        {PRAYER_COURSE.map((sec, i) => {
          const isOpen = open === sec.id
          const done = read.includes(sec.id)
          return (
            <Card key={sec.id} className="overflow-hidden">
              <button onClick={() => setOpen(isOpen ? '' : sec.id)} className="flex w-full items-center gap-3 px-3.5 py-3 text-left sm:p-4" aria-expanded={isOpen}>
                <span className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9', done ? 'bg-primary text-primary-ink' : 'bg-primary-soft text-primary')}>
                  <Icon name={done ? 'check' : sec.icon} size={18} strokeWidth={done ? 3 : 1.8} />
                </span>
                <span className="flex-1 text-[15px] font-semibold sm:text-base">
                  {i + 1}. {sec.title}
                </span>
                <Icon name="chevronDown" className={cx('text-muted transition-transform', isOpen && 'rotate-180')} />
              </button>
              {isOpen && (
                <div className="animate-in border-t border-line px-3.5 pb-4 pt-1 sm:px-6 sm:pb-5 sm:pt-2">
                  <Blocks blocks={sec.blocks} />
                  <button
                    onClick={() => {
                      toggleStep('cours-priere', sec.id)
                      if (!done) {
                        const nextSec = PRAYER_COURSE[i + 1]
                        if (nextSec) setOpen(nextSec.id)
                      }
                    }}
                    className={cx('mt-4 inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold', done ? 'bg-primary text-primary-ink' : 'ring-1 ring-line hover:ring-gold/60')}
                  >
                    <Icon name="checkCircle" size={16} /> {done ? 'Partie lue' : 'J’ai lu cette partie'}
                  </button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <LinkButton to="/quiz/quiz-priere" icon="trophy">
          Quiz sur la prière
        </LinkButton>
        <LinkButton to="/cours/priere-approfondie" variant="secondary" icon="graduation">
          Approfondir (niveau intermédiaire)
        </LinkButton>
      </div>
    </div>
  )
}
