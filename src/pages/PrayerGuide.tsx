import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GUIDE } from '../data/prayer'
import { useApp, NO_STEPS } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { ArabicBlock, Button, Card, Note, ProgressBar, Rich, Toggle, cx, toast } from '../components/ui'
import { Icon } from '../components/Icon'
import { PrayerFigure, POSE_LABEL } from '../components/Illustrations'

export default function PrayerGuide() {
  useDocumentTitle('Je découvre la prière')
  const [params, setParams] = useSearchParams()
  const slowParam = params.get('lent') === '1'
  const slowMode = useApp((s) => s.settings.slowMode)
  const setSettings = useApp((s) => s.setSettings)
  const slow = slowParam || slowMode
  const done = useApp((s) => s.steps['guide-priere'] ?? NO_STEPS)
  const toggleStep = useApp((s) => s.toggleStep)
  const resetSteps = useApp((s) => s.resetSteps)
  const [i, setI] = useState(() => {
    const first = GUIDE.findIndex((g) => !done.includes(g.id))
    return first === -1 ? 0 : first
  })
  const step = GUIDE[i]
  const isDone = done.includes(step.id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [i])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      if (e.key === 'ArrowRight') setI((x) => Math.min(GUIDE.length - 1, x + 1))
      if (e.key === 'ArrowLeft') setI((x) => Math.max(0, x - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const complete = () => {
    if (!isDone) toggleStep('guide-priere', step.id, true)
    if (i < GUIDE.length - 1) setI(i + 1)
    else toast('Vous avez parcouru toute la prière, bravo !')
  }

  return (
    <div className="animate-in">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Link to="/priere" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <Icon name="arrowLeft" size={16} /> La prière
        </Link>
        <div className="w-56">
          <Toggle
            label="Mode lent (débutant)"
            checked={slow}
            onChange={(v) => {
              setSettings({ slowMode: v })
              if (!v && slowParam) setParams({})
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-semibold">Exemple : une prière de 2 rak‘ats (le Fajr)</span>
          <span className="text-muted">
            Étape {i + 1} / {GUIDE.length}
          </span>
        </div>
        <ProgressBar value={((i + 1) / GUIDE.length) * 100} label="Avancement dans le guide" />
        <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-1">
          {GUIDE.map((g, k) => (
            <button
              key={g.id}
              onClick={() => setI(k)}
              className={cx(
                'flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-2 text-xs font-bold transition-colors',
                k === i ? 'bg-primary text-primary-ink' : done.includes(g.id) ? 'bg-primary-soft text-primary' : 'bg-surface-2 text-muted',
              )}
              aria-label={`Étape ${k + 1} : ${g.title}`}
              aria-current={k === i ? 'step' : undefined}
            >
              {done.includes(g.id) && k !== i ? <Icon name="check" size={14} strokeWidth={3} /> : k + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,320px)_1fr]">
        <Card className="self-start p-4 lg:sticky lg:top-8">
          <PrayerFigure key={step.pose + i} pose={step.pose} className="animate-in mx-auto aspect-[8/7] w-full max-w-[320px]" />
          <p className="mt-1 text-center text-sm font-semibold text-muted">{POSE_LABEL[step.pose]}</p>
        </Card>

        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-gold">Étape {i + 1}</p>
          <h1 className="font-display text-[28px] font-medium sm:text-3xl">{step.title}</h1>
          <p className="mt-1 text-[17px] text-ink/90">{step.short}</p>

          {slow && (
            <Card className="mt-4 bg-primary-soft/40 p-4 sm:p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
                <Icon name="info" size={16} /> Explication pas à pas
              </p>
              <div className="space-y-2 text-[16px] leading-relaxed">
                {step.slow.map((t, k) => (
                  <p key={k}>
                    <Rich text={t} />
                  </p>
                ))}
              </div>
            </Card>
          )}

          {step.words && step.words.length > 0 && (
            <div className="mt-5 space-y-3">
              <p className="font-semibold">Ce que l’on dit :</p>
              {step.words.map((w, k) => (
                <div key={k}>
                  <ArabicBlock arabic={w.ar} translit={w.tr} translation={w.fr} source={w.ref} size="text-2xl sm:text-3xl" />
                  {w.repeat && <p className="mt-1 text-sm font-semibold text-gold">À dire {w.repeat}</p>}
                </div>
              ))}
            </div>
          )}

          {step.tip && (
            <Note tone="tip">
              <Rich text={step.tip} />
            </Note>
          )}
          {step.mistakes && slow && (
            <Note tone="warning" title="Erreurs fréquentes">
              <ul className="list-inside list-disc">
                {step.mistakes.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </Note>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <Button variant="secondary" icon="arrowLeft" disabled={i === 0} onClick={() => setI(i - 1)}>
              Précédent
            </Button>
            <Button onClick={complete} icon={isDone ? 'arrowRight' : 'checkCircle'} size="lg">
              {isDone ? (i < GUIDE.length - 1 ? 'Étape suivante' : 'Terminé') : 'J’ai compris cette étape'}
            </Button>
          </div>

          {done.length === GUIDE.length && (
            <Card className="animate-in mt-6 p-5 text-center">
              <Icon name="trophy" size={32} className="mx-auto text-gold" />
              <p className="mt-2 font-display text-[22px] font-medium sm:text-2xl">Vous connaissez maintenant toute la prière !</p>
              <p className="text-muted">Pour les prières de 3 ou 4 rak‘ats, consultez la page de chaque prière : vous y verrez où placer le premier tachahhoud.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link to="/priere/dhohr" className="rounded-[14px] ring-1 ring-line px-4 py-2 text-sm font-semibold hover:border-gold">
                  Prière de 4 rak‘ats
                </Link>
                <Link to="/quiz/quiz-priere" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-ink">
                  Faire le quiz
                </Link>
                <button onClick={() => resetSteps('guide-priere')} className="rounded-xl px-4 py-2 text-sm text-muted hover:text-ink">
                  Recommencer le guide
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
