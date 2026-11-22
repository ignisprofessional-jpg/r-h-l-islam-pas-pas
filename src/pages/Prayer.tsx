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
  const [open, setOpen] = useState<string>('pourquoi')
  const pct = Math.round((steps.length / GUIDE.length) * 100)

  return (
    <div className="animate-in">
      <PageHeader title="Apprendre à faire la prière" arabic="الصلاة" icon="prayer" subtitle="Un cours complet pour apprendre la salât depuis zéro : pourquoi prier, quand, comment, avec les gestes, les paroles et leur sens." />

      {/* Mode découverte */}
      <Card className="relative mb-6 overflow-hidden p-5 sm:p-6">
        <div className="pattern-bg pattern-layer" />
        <div className="relative grid items-center gap-5 sm:grid-cols-[1fr_200px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold">Mode « Je découvre la prière »</p>
            <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">Le guide illustré, étape par étape</h2>
            <p className="mt-1 text-muted">Chaque position est illustrée, avec les paroles en arabe, la phonétique et le sens. Le mode lent explique tout tranquillement, sans rien supposer.</p>
            <div className="mt-4 flex items-center gap-3">
              <ProgressBar value={pct} className="max-w-xs" label="Progression du guide" />
              <span className="text-sm text-muted">
                {steps.length}/{GUIDE.length} étapes
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkButton to="/priere/guide?lent=1" icon="play">
                Je découvre la prière (lent)
              </LinkButton>
              <LinkButton to="/priere/guide" variant="secondary" icon="list">
                Guide normal
              </LinkButton>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-[220px] grid-cols-3 gap-1">
            {(['takbir', 'ruku', 'sujud', 'qiyam', 'jalsa', 'salam'] as const).map((p) => (
              <PrayerFigure key={p} pose={p} className="aspect-square rounded-xl bg-surface-2/60" />
            ))}
          </div>
        </div>
      </Card>

      <PrayerTimesCard />

      <SectionTitle>Les cinq prières</SectionTitle>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {PRAYERS.map((p) => (
          <Link key={p.id} to={`/priere/${p.id}`} className="group rounded-2xl border border-line bg-surface p-4 text-center transition-all hover:-translate-y-0.5 hover:border-gold/60">
            <p className="arabic text-2xl text-gold">{p.arabic}</p>
            <p className="font-semibold">{p.name.split(' (')[0]}</p>
            <p className="text-sm text-muted">{p.rakaat} rak‘ats</p>
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: p.rakaat }).map((_, i) => (
                <span key={i} className="h-1.5 w-4 rounded-full bg-primary/70" />
              ))}
            </div>
          </Link>
        ))}
      </div>

      <SectionTitle>Le cours complet</SectionTitle>
      <p className="-mt-1 mb-3 text-sm text-muted">
        {read.length}/{PRAYER_COURSE.length} parties lues · ouvrez chaque partie, puis cochez « J’ai lu cette partie ».
      </p>
      <div className="space-y-2">
        {PRAYER_COURSE.map((sec, i) => {
          const isOpen = open === sec.id
          const done = read.includes(sec.id)
          return (
            <Card key={sec.id} className="overflow-hidden">
              <button onClick={() => setOpen(isOpen ? '' : sec.id)} className="flex w-full items-center gap-3 p-4 text-left" aria-expanded={isOpen}>
                <span className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', done ? 'bg-primary text-primary-ink' : 'bg-primary-soft text-primary')}>
                  <Icon name={done ? 'check' : sec.icon} size={18} strokeWidth={done ? 3 : 1.8} />
                </span>
                <span className="flex-1 font-semibold">
                  {i + 1}. {sec.title}
                </span>
                <Icon name="chevronDown" className={cx('text-muted transition-transform', isOpen && 'rotate-180')} />
              </button>
              {isOpen && (
                <div className="animate-in border-t border-line px-4 pb-5 pt-2 sm:px-6">
                  <Blocks blocks={sec.blocks} />
                  <button
                    onClick={() => {
                      toggleStep('cours-priere', sec.id)
                      if (!done) {
                        const nextSec = PRAYER_COURSE[i + 1]
                        if (nextSec) setOpen(nextSec.id)
                      }
                    }}
                    className={cx('mt-4 inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold', done ? 'bg-primary text-primary-ink' : 'border border-line hover:border-primary')}
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
