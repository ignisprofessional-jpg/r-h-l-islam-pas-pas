import { useState } from 'react'
import { useApp, type DhikrCounter } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { Button, Card, IconButton, Note, PageHeader, Sheet, cx, toast } from '../components/ui'
import { Icon } from '../components/Icon'

const PRESETS: Omit<DhikrCounter, 'id' | 'count' | 'total'>[] = [
  { label: 'Lâ ilâha illa-llâh', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', target: 100 },
  { label: 'Subhâna-llâhi wa bi-hamdih', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', target: 100 },
  { label: 'Lâ hawla wa lâ quwwata illâ billâh', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', target: 33 },
  { label: 'Prière sur le Prophète ﷺ', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', target: 10 },
]

export default function Dhikr() {
  useDocumentTitle('Compteur de dhikr')
  const list = useApp((s) => s.dhikr)
  const setDhikr = useApp((s) => s.setDhikr)
  const updateDhikr = useApp((s) => s.updateDhikr)
  const touch = useApp((s) => s.touch)
  const [activeId, setActiveId] = useState(list[0]?.id ?? '')
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState('')
  const [arabic, setArabic] = useState('')
  const [target, setTarget] = useState(33)
  const active = list.find((d) => d.id === activeId) ?? list[0]

  const inc = () => {
    if (!active) return
    const count = active.count + 1
    updateDhikr(active.id, { count, total: active.total + 1 })
    if (count === active.target) {
      toast(`Objectif de ${active.target} atteint, mâ shâ’ Allâh !`)
      if ('vibrate' in navigator) navigator.vibrate?.([60, 40, 60])
      touch()
    } else if ('vibrate' in navigator) navigator.vibrate?.(8)
  }

  const pct = active ? Math.min(100, (active.count / Math.max(1, active.target)) * 100) : 0
  const r = 118
  const c = 2 * Math.PI * r

  return (
    <div className="animate-in">
      <PageHeader title="Compteur de dhikr" arabic="الذِّكْر" icon="beads" subtitle="Le dhikr est le rappel d’Allah par des formules simples. Choisissez une formule, fixez un objectif et comptez d’un simple toucher. Tout est enregistré automatiquement." />

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="flex flex-col items-center p-5 sm:p-8">
          {active && (
            <>
              <p className="arabic text-center text-3xl text-primary sm:text-4xl">{active.arabic}</p>
              <p className="mb-4 text-center font-semibold text-muted">{active.label}</p>
              <button onClick={inc} className="tap-pop relative flex h-64 w-64 items-center justify-center rounded-full bg-surface-2/60 sm:h-72 sm:w-72" aria-label={`Compter : ${active.count} sur ${active.target}`}>
                <svg viewBox="0 0 260 260" className="absolute inset-0 -rotate-90">
                  <circle cx="130" cy="130" r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
                  <circle cx="130" cy="130" r={r} fill="none" stroke="var(--gold)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} style={{ transition: 'stroke-dashoffset .3s ease-out' }} />
                </svg>
                <span className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-primary text-primary-ink shadow-[inset_0_-8px_20px_rgba(0,0,0,0.2)] sm:h-56 sm:w-56">
                  <span className="font-display text-7xl font-semibold tabular-nums">{active.count}</span>
                  <span className="text-sm opacity-80">/ {active.target}</span>
                </span>
              </button>
              <p className="mt-3 text-sm text-muted">Touchez le cercle pour compter · Total depuis le début : {active.total}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button variant="secondary" icon="minus" onClick={() => updateDhikr(active.id, { count: Math.max(0, active.count - 1), total: Math.max(0, active.total - 1) })}>
                  Annuler 1
                </Button>
                <Button variant="secondary" icon="refresh" onClick={() => updateDhikr(active.id, { count: 0 })}>
                  Remettre à zéro
                </Button>
              </div>
            </>
          )}
        </Card>

        <div className="space-y-3">
          <Card className="p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="font-semibold">Mes formules</p>
              <Button size="sm" variant="ghost" icon="plus" onClick={() => setEditing(true)}>
                Ajouter
              </Button>
            </div>
            <ul className="space-y-1">
              {list.map((d) => (
                <li key={d.id} className="group flex items-center gap-1">
                  <button onClick={() => setActiveId(d.id)} className={cx('flex flex-1 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left', d.id === active?.id ? 'bg-primary-soft' : 'hover:bg-surface-2')}>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{d.label}</span>
                      <span className="text-xs text-muted">
                        {d.count}/{d.target}
                      </span>
                    </span>
                    {d.count >= d.target && <Icon name="checkCircle" size={16} className="text-primary" />}
                  </button>
                  {list.length > 1 && (
                    <IconButton
                      icon="trash"
                      label={`Supprimer ${d.label}`}
                      size={15}
                      className="opacity-60 hover:opacity-100"
                      onClick={() => {
                        setDhikr(list.filter((x) => x.id !== d.id))
                        if (activeId === d.id) setActiveId(list.find((x) => x.id !== d.id)!.id)
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setDhikr(list.map((d) => ({ ...d, count: 0 })))
                toast('Tous les compteurs remis à zéro')
              }}
              className="mt-2 w-full rounded-xl py-2 text-xs font-semibold text-muted hover:bg-surface-2"
            >
              Remettre tous les compteurs à zéro
            </button>
          </Card>
          <Note tone="info" title="Le tasbîh après la prière">
            33 × Subhâna-llâh, 33 × al-hamdu lillâh, 33 × Allâhu akbar, puis « Lâ ilâha illa-llâhu wahdahu lâ sharîka lah… » (Muslim n°597). Avant de dormir : 33, 33 et 34 (al-Bukhârî n°3705, Muslim n°2727).
          </Note>
        </div>
      </div>

      <Sheet open={editing} onClose={() => setEditing(false)} title="Ajouter une formule">
        <p className="mb-2 text-sm font-semibold">Formules suggérées</p>
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                const id = Math.random().toString(36).slice(2, 9)
                setDhikr([...list, { ...p, id, count: 0, total: 0 }])
                setActiveId(id)
                setEditing(false)
              }}
              className="rounded-xl border border-line p-3 text-left hover:border-gold/60"
            >
              <span className="arabic block text-xl text-primary">{p.arabic}</span>
              <span className="text-sm">{p.label}</span>
              <span className="block text-xs text-muted">Objectif {p.target}</span>
            </button>
          ))}
        </div>
        <form
          className="space-y-3 border-t border-line pt-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!label.trim()) return
            const id = Math.random().toString(36).slice(2, 9)
            setDhikr([...list, { id, label: label.trim(), arabic: arabic.trim() || undefined, target: Math.max(1, target), count: 0, total: 0 }])
            setActiveId(id)
            setLabel('')
            setArabic('')
            setEditing(false)
          }}
        >
          <p className="text-sm font-semibold">Ou créez la vôtre</p>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Nom (ex. Astaghfirullâh)" className="h-11 w-full rounded-xl border border-line bg-bg px-3" aria-label="Nom de la formule" />
          <input value={arabic} onChange={(e) => setArabic(e.target.value)} placeholder="Texte arabe (facultatif)" dir="rtl" className="arabic h-11 w-full rounded-xl border border-line bg-bg px-3 text-lg" aria-label="Texte arabe" />
          <label className="flex items-center gap-3 text-sm">
            Objectif :
            <input type="number" min={1} value={target} onChange={(e) => setTarget(Number(e.target.value))} className="h-11 w-28 rounded-xl border border-line bg-bg px-3" />
          </label>
          <Button type="submit" icon="plus">
            Ajouter
          </Button>
        </form>
      </Sheet>
    </div>
  )
}
