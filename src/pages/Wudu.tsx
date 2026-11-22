import { useState } from 'react'
import { WUDU_STEPS, WUDU_SECTIONS, WUDU_DUA_AFTER, WUDU_DUA_AFTER_2 } from '../data/wudu'
import { useApp, NO_STEPS } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { ArabicBlock, Badge, Button, Card, LinkButton, PageHeader, ProgressBar, Rich, SectionTitle, Tabs, cx, toast } from '../components/ui'
import { Blocks } from '../components/Content'
import { Icon } from '../components/Icon'
import { WuduFigure } from '../components/Illustrations'

export default function Wudu() {
  useDocumentTitle('Les ablutions')
  const done = useApp((s) => s.steps['wudu'] ?? NO_STEPS)
  const toggleStep = useApp((s) => s.toggleStep)
  const resetSteps = useApp((s) => s.resetSteps)
  const [i, setI] = useState(() => {
    const f = WUDU_STEPS.findIndex((s) => !done.includes(s.id))
    return f === -1 ? 0 : f
  })
  const [section, setSection] = useState(WUDU_SECTIONS[0].id)
  const step = WUDU_STEPS[i]
  const isDone = done.includes(step.id)
  const allDone = WUDU_STEPS.every((s) => done.includes(s.id))
  const sec = WUDU_SECTIONS.find((s) => s.id === section)!

  return (
    <div className="animate-in">
      <PageHeader title="Les ablutions (woudou)" arabic="الوضوء" icon="drop" subtitle="Le guide illustré et interactif pour se purifier avant la prière : chaque étape dans l’ordre, ce qui annule les ablutions, les erreurs fréquentes et le ghusl.">
        <div className="flex items-center gap-3">
          <ProgressBar value={(done.length / WUDU_STEPS.length) * 100} className="max-w-sm bg-white/20" label="Étapes terminées" />
          <span className="text-sm font-semibold">
            {done.length}/{WUDU_STEPS.length} étapes
          </span>
        </div>
      </PageHeader>

      {/* Guide interactif */}
      <Card className="overflow-hidden">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-b border-line p-3">
          {WUDU_STEPS.map((s, k) => (
            <button
              key={s.id}
              onClick={() => setI(k)}
              className={cx('flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-bold', k === i ? 'bg-primary text-primary-ink' : done.includes(s.id) ? 'bg-primary-soft text-primary' : 'bg-surface-2 text-muted')}
              aria-current={k === i ? 'step' : undefined}
            >
              {done.includes(s.id) ? <Icon name="check" size={13} strokeWidth={3} /> : k + 1}
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-[220px_1fr] sm:p-6">
          <div className="mx-auto w-full max-w-[220px]">
            <WuduFigure key={step.id} part={step.id} className="animate-in aspect-[8/7] w-full" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Étape {i + 1}</span>
              <Badge tone={step.status === 'obligatoire' ? 'green' : step.status === 'recommandé' ? 'gold' : 'neutral'}>
                {step.status === 'obligatoire' ? 'Obligatoire' : step.status === 'recommandé' ? 'Recommandé' : 'Avis divergents'}
              </Badge>
              <Badge>{step.times}</Badge>
            </div>
            <h2 className="mt-1 font-display text-3xl font-semibold">{step.title}</h2>
            <ul className="mt-3 space-y-2">
              {step.how.map((h) => (
                <li key={h} className="flex gap-3 text-[16px]">
                  <Icon name="drop" size={16} className="mt-1 text-[#5aa9d6]" />
                  <span>
                    <Rich text={h} />
                  </span>
                </li>
              ))}
            </ul>
            {step.ref && (
              <p className="mt-3 flex items-start gap-1.5 text-xs text-muted">
                <Icon name="book" size={14} className="mt-0.5" /> {step.ref}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="secondary" icon="arrowLeft" disabled={i === 0} onClick={() => setI(i - 1)}>
                Précédente
              </Button>
              <Button
                icon={isDone ? 'arrowRight' : 'checkCircle'}
                onClick={() => {
                  if (!isDone) toggleStep('wudu', step.id, true)
                  if (i < WUDU_STEPS.length - 1) setI(i + 1)
                  else toast('Ablutions terminées !')
                }}
              >
                {isDone ? (i < WUDU_STEPS.length - 1 ? 'Étape suivante' : 'Terminé') : 'J’ai terminé cette étape'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {allDone && (
        <Card className="animate-in mt-4 p-5">
          <p className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Icon name="checkCircle" className="text-primary" /> Vos ablutions sont terminées
          </p>
          <p className="mb-3 text-muted">Il est recommandé de dire ensuite :</p>
          <ArabicBlock arabic={WUDU_DUA_AFTER.ar} translit={WUDU_DUA_AFTER.tr} translation={WUDU_DUA_AFTER.fr} source={WUDU_DUA_AFTER.ref} size="text-2xl" />
          <ArabicBlock className="mt-3" arabic={WUDU_DUA_AFTER_2.ar} translit={WUDU_DUA_AFTER_2.tr} translation={WUDU_DUA_AFTER_2.fr} source={WUDU_DUA_AFTER_2.ref} size="text-2xl" />
          <div className="mt-4 flex flex-wrap gap-2">
            <LinkButton to="/priere/guide?lent=1" icon="prayer">
              Passer à la prière
            </LinkButton>
            <Button
              variant="ghost"
              icon="refresh"
              onClick={() => {
                resetSteps('wudu')
                setI(0)
              }}
            >
              Refaire le guide
            </Button>
          </div>
        </Card>
      )}

      <SectionTitle>Tout comprendre sur la purification</SectionTitle>
      <Tabs className="mb-3" value={section} onChange={setSection} tabs={WUDU_SECTIONS.map((s) => ({ id: s.id, label: s.title.replace(' (grandes ablutions)', ''), icon: s.icon }))} />
      <Card className="p-5 sm:p-6">
        <h3 className="mb-2 font-display text-2xl font-semibold">{sec.title}</h3>
        <Blocks blocks={sec.blocks} />
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        <LinkButton to="/quiz/quiz-ablutions" icon="trophy">
          Quiz sur les ablutions
        </LinkButton>
      </div>
    </div>
  )
}
