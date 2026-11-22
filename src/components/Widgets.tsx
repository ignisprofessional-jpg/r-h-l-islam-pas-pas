import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPrayerTimes, CALC_METHODS, type PrayerTimes } from '../lib/api'
import { useAsync } from '../lib/hooks'
import { useApp } from '../lib/store'
import { addDays, dateKey, frDate, startOfWeek, todayKey, weekKey, toHijri, HIJRI_MONTHS } from '../lib/dates'
import { Button, Card, cx, toast } from './ui'
import { Icon } from './Icon'

/* ---------------- Horaires de prière ---------------- */
const NAMES: { key: keyof PrayerTimes; label: string; ar: string }[] = [
  { key: 'Fajr', label: 'Fajr', ar: 'الفجر' },
  { key: 'Sunrise', label: 'Lever', ar: 'الشروق' },
  { key: 'Dhuhr', label: 'Dhohr', ar: 'الظهر' },
  { key: 'Asr', label: '‘Asr', ar: 'العصر' },
  { key: 'Maghrib', label: 'Maghrib', ar: 'المغرب' },
  { key: 'Isha', label: '‘Ishâ', ar: 'العشاء' },
]

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function LocationForm({ onDone }: { onDone?: () => void }) {
  const loc = useApp((s) => s.settings.location)
  const method = useApp((s) => s.settings.method)
  const school = useApp((s) => s.settings.school)
  const setSettings = useApp((s) => s.setSettings)
  const [city, setCity] = useState(loc?.city ?? '')
  const [country, setCountry] = useState(loc?.country ?? 'France')
  const [geoMsg, setGeoMsg] = useState('')

  const useGeo = () => {
    if (!navigator.geolocation) return setGeoMsg('La géolocalisation n’est pas disponible sur cet appareil.')
    setGeoMsg('Localisation en cours…')
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setSettings({ location: { city: 'Ma position', country: '', lat: +p.coords.latitude.toFixed(4), lon: +p.coords.longitude.toFixed(4) } })
        toast('Position enregistrée')
        onDone?.()
      },
      () => setGeoMsg('Position refusée ou indisponible. Saisissez votre ville.'),
      { timeout: 10000 },
    )
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        if (!city.trim()) return
        setSettings({ location: { city: city.trim(), country: country.trim() } })
        toast('Ville enregistrée')
        onDone?.()
      }}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-semibold">Ville</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex. Lyon" className="h-11 w-full rounded-xl border border-line bg-bg px-3 outline-none focus:border-primary" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold">Pays</span>
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ex. France" className="h-11 w-full rounded-xl border border-line bg-bg px-3 outline-none focus:border-primary" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-semibold">Méthode de calcul</span>
          <select value={method} onChange={(e) => setSettings({ method: Number(e.target.value) })} className="h-11 w-full rounded-xl border border-line bg-bg px-3">
            {CALC_METHODS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold">Calcul du ‘Asr</span>
          <select value={school} onChange={(e) => setSettings({ school: Number(e.target.value) as 0 | 1 })} className="h-11 w-full rounded-xl border border-line bg-bg px-3">
            <option value={0}>Majorité (malikite, chaféite, hanbalite)</option>
            <option value={1}>Hanafite</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" icon="check">
          Enregistrer
        </Button>
        <Button variant="secondary" icon="pin" onClick={useGeo}>
          Utiliser ma position
        </Button>
      </div>
      {geoMsg && <p className="text-sm text-muted">{geoMsg}</p>}
    </form>
  )
}

export function PrayerTimesCard({ compact = false }: { compact?: boolean }) {
  const loc = useApp((s) => s.settings.location)
  const method = useApp((s) => s.settings.method)
  const school = useApp((s) => s.settings.school)
  const [editing, setEditing] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  const day = todayKey()
  const { data, error, loading, retry } = useAsync(
    () => (loc ? getPrayerTimes({ ...loc, method, school }) : Promise.resolve(null)),
    [loc?.city, loc?.country, loc?.lat, loc?.lon, method, school, day],
  )

  const cur = now.getHours() * 60 + now.getMinutes()
  const nextIdx = data ? NAMES.findIndex((n) => n.key !== 'Sunrise' && toMin(data[n.key] as string) > cur) : -1
  const next = nextIdx >= 0 ? NAMES[nextIdx] : null
  const remaining = data && next ? toMin(data[next.key] as string) - cur : 0

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-semibold">
            <Icon name="clock" size={18} className="text-gold" /> Horaires de prière
          </p>
          {loc && (
            <p className="text-sm text-muted">
              {loc.city}
              {loc.country ? `, ${loc.country}` : ''} · {frDate(now, { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          )}
        </div>
        {loc && (
          <button onClick={() => setEditing((e) => !e)} className="text-sm font-semibold text-primary hover:underline">
            {editing ? 'Fermer' : 'Modifier'}
          </button>
        )}
      </div>
      {(!loc || editing) && (
        <div className="mb-2">
          {!loc && <p className="mb-3 text-sm text-muted">Indiquez votre ville pour afficher les horaires du jour (calculés par l’API Aladhan).</p>}
          <LocationForm onDone={() => setEditing(false)} />
        </div>
      )}
      {loc && !editing && (
        <>
          {loading && <p className="animate-pulse py-4 text-sm text-muted">Calcul des horaires…</p>}
          {error && (
            <p className="py-2 text-sm text-danger">
              Horaires indisponibles : {error}{' '}
              <button className="underline" onClick={retry}>
                Réessayer
              </button>
            </p>
          )}
          {data && (
            <>
              {next && (
                <p className="mb-3 rounded-xl bg-primary-soft px-3 py-2 text-sm">
                  Prochaine prière : <strong>{next.label}</strong> à <strong>{data[next.key]}</strong>{' '}
                  <span className="text-muted">(dans {Math.floor(remaining / 60) ? `${Math.floor(remaining / 60)} h ` : ''}{remaining % 60} min)</span>
                </p>
              )}
              <ul className={cx('grid gap-2', compact ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6')}>
                {NAMES.map((n, i) => (
                  <li key={n.key} className={cx('rounded-xl border px-2 py-2 text-center', i === nextIdx ? 'border-gold bg-gold-soft/60' : 'border-line bg-surface-2/40', n.key === 'Sunrise' && 'opacity-70')}>
                    <p className="arabic text-sm leading-none text-gold">{n.ar}</p>
                    <p className="text-xs font-semibold text-muted">{n.label}</p>
                    <p className="font-display text-lg font-semibold tabular-nums">{data[n.key]}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-muted">Source : API Aladhan · {CALC_METHODS.find((m) => m.id === method)?.name}. Le lever du soleil n’est pas une prière : il marque la fin du temps du Fajr. Suivez de préférence le calendrier de votre mosquée.</p>
            </>
          )}
        </>
      )}
    </Card>
  )
}

/* ---------------- Calendrier d'activité ---------------- */
export function ActivityCalendar({ months = 1 }: { months?: number }) {
  const activity = useApp((s) => s.activity)
  const [offset, setOffset] = useState(0)
  const base = new Date()
  const first = new Date(base.getFullYear(), base.getMonth() - offset, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const lead = (first.getDay() + 6) % 7
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i + 1))]
  const max = Math.max(1, ...Object.values(activity))
  const today = todayKey()
  void months
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button onClick={() => setOffset((o) => o + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-2" aria-label="Mois précédent">
          <Icon name="chevronLeft" size={18} />
        </button>
        <p className="font-semibold capitalize">{frDate(first, { month: 'long', year: 'numeric' })}</p>
        <button onClick={() => setOffset((o) => Math.max(0, o - 1))} disabled={offset === 0} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-2 disabled:opacity-30" aria-label="Mois suivant">
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />
          const k = dateKey(d)
          const v = activity[k] ?? 0
          const level = v === 0 ? 0 : Math.ceil((v / max) * 3)
          return (
            <span
              key={i}
              title={`${frDate(d, { day: 'numeric', month: 'long' })} : ${v ? `${v} activité${v > 1 ? 's' : ''}` : 'repos'}`}
              className={cx(
                'flex aspect-square items-center justify-center rounded-lg text-xs tabular-nums',
                level === 0 && 'bg-surface-2/60 text-muted',
                level === 1 && 'bg-primary/25 text-ink',
                level === 2 && 'bg-primary/55 text-white',
                level >= 3 && 'bg-primary text-primary-ink',
                k === today && 'ring-2 ring-gold',
              )}
            >
              {d.getDate()}
            </span>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-muted">Chaque case colorée est un jour où vous avez appris quelque chose. Les jours de repos font partie du chemin : revenez simplement quand vous le pouvez.</p>
    </div>
  )
}

/* ---------------- Objectifs de la semaine ---------------- */
export function GoalsCard() {
  const goals = useApp((s) => s.goals)
  const addGoal = useApp((s) => s.addGoal)
  const toggleGoal = useApp((s) => s.toggleGoal)
  const removeGoal = useApp((s) => s.removeGoal)
  const [text, setText] = useState('')
  const wk = weekKey()
  const current = goals.filter((g) => g.week === wk)
  const suggestions = ['Apprendre Al-Fâtiha', 'Faire mes ablutions correctement', 'Lire une leçon par jour', 'Prier une prière complète', 'Apprendre 5 lettres arabes', 'Réciter les invocations du matin']
  const ws = startOfWeek()
  return (
    <div>
      <p className="mb-3 text-sm text-muted">
        Semaine du {frDate(ws, { day: 'numeric', month: 'long' })} au {frDate(addDays(ws, 6), { day: 'numeric', month: 'long' })}
      </p>
      <ul className="space-y-2">
        {current.map((g) => (
          <li key={g.id} className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2">
            <button onClick={() => toggleGoal(g.id)} className={cx('flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors', g.done ? 'border-primary bg-primary text-primary-ink' : 'border-line')} aria-label={g.done ? 'Marquer comme non fait' : 'Marquer comme fait'}>
              {g.done && <Icon name="check" size={14} strokeWidth={3} />}
            </button>
            <span className={cx('flex-1 text-[15px]', g.done && 'text-muted line-through')}>{g.text}</span>
            <button onClick={() => removeGoal(g.id)} className="text-muted opacity-60 hover:text-danger hover:opacity-100" aria-label="Supprimer l’objectif">
              <Icon name="trash" size={16} />
            </button>
          </li>
        ))}
      </ul>
      {current.length === 0 && <p className="text-sm text-muted">Aucun objectif cette semaine. Choisissez-en un petit et atteignable.</p>}
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          addGoal(text.trim())
          setText('')
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nouvel objectif…" className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 outline-none focus:border-primary" aria-label="Nouvel objectif" />
        <Button type="submit" icon="plus" aria-label="Ajouter">
          <span className="hidden sm:inline">Ajouter</span>
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {suggestions
          .filter((s) => !current.some((g) => g.text === s))
          .slice(0, 4)
          .map((s) => (
            <button key={s} onClick={() => addGoal(s)} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted hover:bg-primary-soft hover:text-primary">
              + {s}
            </button>
          ))}
      </div>
    </div>
  )
}

/* ---------------- Date hégirienne du jour ---------------- */
export function TodayDates() {
  const h = useMemo(() => toHijri(new Date()), [])
  return (
    <p className="text-sm text-white/80">
      <span className="capitalize">{frDate(new Date())}</span>
      {h && (
        <>
          {' · '}
          <Link to="/calendrier" className="underline decoration-white/30 underline-offset-2 hover:decoration-white">
            {h.day} {HIJRI_MONTHS[h.month - 1]} {h.year} H
          </Link>
        </>
      )}
    </p>
  )
}
