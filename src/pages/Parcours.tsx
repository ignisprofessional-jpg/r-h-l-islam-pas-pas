import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LEVELS, PARCOURS } from '../data/lessons'
import { useApp, type Level } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { levelProgress, moduleProgress } from '../lib/progress'
import { Card, PageHeader, ProgressBar, Tabs, cx, Note } from '../components/ui'
import { Icon } from '../components/Icon'

export default function Parcours() {
  useDocumentTitle('Mon parcours')
  const s = useApp()
  const [tab, setTab] = useState<Level>(s.profile.level)
  const lp = levelProgress(tab, s)

  return (
    <div className="animate-in">
      <PageHeader title="Mon parcours" subtitle="Trois niveaux pour avancer sereinement, de la découverte jusqu'aux sciences islamiques. Chaque module mène à un vrai contenu : cours, guide interactif ou exercices." icon="graduation" arabic="طريقي" />
      <Tabs tabs={LEVELS.map((l) => ({ id: l.id, label: l.label }))} value={tab} onChange={setTab} className="mb-4" />

      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-semibold">
              Niveau {LEVELS.find((l) => l.id === tab)!.label} <span className="arabic ml-2 text-lg text-gold">{LEVELS.find((l) => l.id === tab)!.arabic}</span>
            </p>
            <p className="text-sm text-muted">{LEVELS.find((l) => l.id === tab)!.text}</p>
          </div>
          {s.profile.level !== tab && (
            <button onClick={() => s.setProfile({ level: tab })} className="rounded-xl border border-line px-3 py-2 text-sm font-semibold hover:border-gold">
              Choisir ce niveau comme niveau actuel
            </button>
          )}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <ProgressBar value={lp.pct} label="Progression du niveau" />
          <span className="shrink-0 text-sm font-semibold">{lp.pct}%</span>
        </div>
      </Card>

      {tab !== 'debutant' && levelProgress('debutant', s).pct < 50 && (
        <Note tone="gentle" title="Aucune obligation d'ordre">
          Vous pouvez explorer ce niveau librement. Pour un débutant, il est conseillé de commencer par les fondements (shahada, prière, ablutions), mais chacun avance à son rythme.
        </Note>
      )}

      <div className="space-y-8">
        {PARCOURS[tab].map((group, gi) => (
          <section key={group.title}>
            <h2 className="mb-3 flex items-center gap-3 font-display text-2xl font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-soft font-sans text-sm text-gold">{gi + 1}</span>
              {group.title}
            </h2>
            <ol className="relative space-y-3 border-l-2 border-dashed border-line pl-5 sm:ml-4">
              {group.modules.map((m) => {
                const p = moduleProgress(m, s)
                const done = p >= 1
                return (
                  <li key={m.id} className="relative">
                    <span className={cx('absolute -left-[31px] top-5 flex h-5 w-5 items-center justify-center rounded-full border-2', done ? 'border-primary bg-primary text-primary-ink' : p > 0 ? 'border-gold bg-surface' : 'border-line bg-surface')}>
                      {done && <Icon name="check" size={11} strokeWidth={3.5} />}
                    </span>
                    <Link to={m.to} className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-all hover:border-gold/50 hover:shadow-[0_12px_30px_-18px_rgba(15,76,58,0.45)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon name={m.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{m.title}</span>
                        <span className="block text-sm text-muted">{m.text}</span>
                        <span className="mt-2 flex items-center gap-2">
                          <ProgressBar value={p * 100} className="max-w-48" label={`Progression : ${m.title}`} />
                          <span className="text-xs text-muted">{done ? 'Terminé' : p > 0 ? `${Math.round(p * 100)}%` : 'À commencer'}</span>
                        </span>
                      </span>
                      <Icon name="chevronRight" className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold" />
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}
