import { useMemo, useState } from 'react'
import type { QuizQ } from '../data/types'
import { useApp } from '../lib/store'
import { Button, Card, ProgressBar, cx, toast } from './ui'
import { Icon } from './Icon'
import { speakArabic } from '../lib/hooks'

const shuffle = <T,>(a: T[]) => {
  const x = [...a]
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[x[i], x[j]] = [x[j], x[i]]
  }
  return x
}

interface Prepared { q: QuizQ; options: { text: string; correct: boolean }[] }

const prepare = (qs: QuizQ[], shuffleQuestions: boolean): Prepared[] =>
  (shuffleQuestions ? shuffle(qs) : qs).map((q) => {
    const opts = q.options.map((text, i) => ({ text, correct: i === q.answer }))
    return { q, options: q.type === 'vf' ? opts : shuffle(opts) }
  })

const TYPE_LABEL = { qcm: 'Choix multiple', vf: 'Vrai ou faux', memo: 'Mémorisation' }

export function Quiz({ id, questions, title = 'Testez vos connaissances', onDone, shuffleQuestions = true, arabicOptions = false }: { id: string; questions: QuizQ[]; title?: string; onDone?: (score: number, total: number) => void; shuffleQuestions?: boolean; arabicOptions?: boolean }) {
  const [seed, setSeed] = useState(0)
  const items = useMemo(() => prepare(questions, shuffleQuestions), [questions, seed, shuffleQuestions]) // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const saveQuiz = useApp((s) => s.saveQuiz)
  const best = useApp((s) => s.quizzes[id])
  const finished = answers.length === items.length && items.length > 0

  const current = items[i]
  const pick = (k: number) => {
    if (picked !== null) return
    setPicked(k)
  }
  const goNext = () => {
    const ok = current.options[picked!].correct
    const nextAnswers = [...answers, ok]
    setAnswers(nextAnswers)
    setPicked(null)
    if (nextAnswers.length === items.length) {
      const score = nextAnswers.filter(Boolean).length
      saveQuiz(id, score, items.length)
      onDone?.(score, items.length)
    } else setI(i + 1)
  }
  const restart = () => {
    setSeed((s) => s + 1)
    setI(0)
    setAnswers([])
    setPicked(null)
  }

  if (!items.length) return null

  if (finished) {
    const score = answers.filter(Boolean).length
    const pct = Math.round((score / items.length) * 100)
    const msg = pct === 100 ? 'Parfait, mâ shâ’ Allâh !' : pct >= 70 ? 'Très bien ! Vous avez bien compris l’essentiel.' : pct >= 40 ? 'C’est un bon début. Relisez les explications et réessayez quand vous voulez.' : 'Pas d’inquiétude : on apprend en se trompant. Relisez tranquillement la leçon puis réessayez.'
    return (
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold">
            <Icon name="trophy" size={26} />
          </span>
          <p className="font-display text-3xl font-semibold">
            {score} / {items.length}
          </p>
          <p className="max-w-md text-muted">{msg}</p>
          {best && best.attempts > 1 && <p className="text-xs text-muted">Meilleur score : {best.best}/{best.total} · {best.attempts} tentatives</p>}
        </div>
        <div className="mt-5 space-y-2">
          {items.map((it, k) => (
            <details key={k} className="rounded-xl border border-line bg-surface-2/50 p-3">
              <summary className="flex cursor-pointer items-start gap-2 text-[15px] font-medium">
                <Icon name={answers[k] ? 'checkCircle' : 'x'} size={18} className={answers[k] ? 'text-primary' : 'text-danger'} />
                <span>{it.q.q}</span>
              </summary>
              <p className="mt-2 pl-7 text-sm text-muted">
                <strong className="text-ink">Réponse : {it.q.options[it.q.answer]}.</strong> {it.q.explain}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Button icon="refresh" variant="secondary" onClick={restart}>
            Recommencer
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold">{TYPE_LABEL[current.q.type]}</p>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
        </div>
        <span className="shrink-0 text-sm text-muted">
          {i + 1} / {items.length}
        </span>
      </div>
      <ProgressBar value={(i / items.length) * 100} className="mb-5" label="Progression du quiz" />
      <p className="mb-4 text-[17px] font-semibold leading-snug">{current.q.q}</p>
      {current.q.ar && (
        <p className={cx('mb-4 text-center text-primary', current.q.ar.length > 8 ? 'quran text-3xl' : 'arabic text-6xl leading-tight')} lang="ar">
          {current.q.ar}
        </p>
      )}
      {current.q.speak && (
        <div className="mb-4 flex justify-center">
          <Button variant="gold" icon="volume" onClick={() => !speakArabic(current.q.speak!) && toast('Synthèse vocale arabe indisponible sur cet appareil')}>
            Écouter
          </Button>
        </div>
      )}
      <div className={cx('grid gap-2', current.q.type === 'vf' ? 'grid-cols-2' : arabicOptions ? 'grid-cols-2 sm:grid-cols-4' : 'sm:grid-cols-2')}>
        {current.options.map((o, k) => {
          const state = picked === null ? 'idle' : o.correct ? 'correct' : picked === k ? 'wrong' : 'dim'
          return (
            <button
              key={k}
              onClick={() => pick(k)}
              disabled={picked !== null}
              className={cx(
                'tap-pop flex min-h-12 items-center gap-2 rounded-xl border px-4 py-3 text-left text-[15.5px] font-medium transition-colors',
                arabicOptions && 'justify-center',
                state === 'idle' && 'border-line bg-surface hover:border-primary/50 hover:bg-primary-soft/40',
                state === 'correct' && 'border-primary bg-primary-soft text-primary',
                state === 'wrong' && 'border-danger bg-danger-soft text-danger',
                state === 'dim' && 'border-line bg-surface opacity-50',
              )}
            >
              {state === 'correct' && <Icon name="checkCircle" size={18} />}
              {state === 'wrong' && <Icon name="x" size={18} />}
              <span className={cx(arabicOptions && 'arabic text-3xl leading-tight')}>{o.text}</span>
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="animate-in mt-4">
          <div className={cx('rounded-xl p-4 text-[15px]', current.options[picked].correct ? 'bg-primary-soft/60' : 'bg-gold-soft/60')}>
            <p className="font-semibold">{current.options[picked].correct ? 'Bonne réponse !' : `La bonne réponse : ${current.q.options[current.q.answer]}`}</p>
            <p className="mt-1 text-ink/85">{current.q.explain}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={goNext} icon={i + 1 === items.length ? 'trophy' : 'arrowRight'}>
              {i + 1 === items.length ? 'Voir mon résultat' : 'Question suivante'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
