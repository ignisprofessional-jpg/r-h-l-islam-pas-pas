import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPrayerTimes, CALC_METHODS, type PrayerTimes } from '../lib/api'
import { useAsync } from '../lib/hooks'
import { useApp } from '../lib/store'
import { addDays, dateKey, frDate, startOfWeek, todayKey, weekKey, toHijri, HIJRI_MONTHS } from '../lib/dates'
import { Button, Card, cx, toast } from './ui'
import { Icon } from './Icon'

/* ---------------- Horaires de prière ---------------- */
export const PRAYER_NAMES: { key: keyof PrayerTimes; label: string; ar: string }[] = [
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

export const durationFr = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`
}

/** Horaires du jour, prière suivante et temps restant (mis à jour toutes les 30 s). */
export function usePrayerTimes() {
  const loc = useApp((s) => s.settings.location)
  const method = useApp((s) => s.settings.method)
  const school = useApp((s) => s.settings.school)
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
  const nextIdx = data ? PRAYER_NAMES.findIndex((n) => n.key !== 'Sunrise' && toMin(data[n.key] as string) > cur) : -1
  const next = nextIdx >= 0 ? PRAYER_NAMES[nextIdx] : null
  const remaining = data && next ? toMin(data[next.key] as string) - cur : 0
  const isPast = (key: keyof PrayerTimes) => !!data && toMin(data[key] as string) <= cur
  return { loc, method, data, error, loading, retry, now, next, nextIdx, remaining, isPast }
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block font-semibold">Ville</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex. Lyon" className="field h-11 w-full" />
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block font-semibold">Pays</span>
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ex. France" className="field h-11 w-full" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block font-semibold">Méthode de calcul</span>
          <select value={method} onChange={(e) => setSettings({ method: Number(e.target.value) })} className="field h-11 w-full">
            {CALC_METHODS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block font-semibold">Calcul du ‘Asr</span>
          <select value={school} onChange={(e) => setSettings({ school: Number(e.target.value) as 0 | 1 })} className="field h-11 w-full">
            <option value={0}>Majorité (malikite, chaféite, hanbalite)</option>
            <option value={1}>Hanafite</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
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

/** Les six horaires sur une ligne ; la prochaine prière est mise en avant. */
export function PrayerStrip({ data, nextIdx, isPast, onDark = false }: { data: PrayerTimes; nextIdx: number; isPast: (k: keyof PrayerTimes) => boolean; onDark?: boolean }) {
  return (
    <ol className="grid grid-cols-6 gap-1">
      {PRAYER_NAMES.map((n, i) => {
        const isNext = i === nextIdx
        const past = !isNext && isPast(n.key)
        return (
          <li
            key={n.key}
            aria-current={isNext ? 'time' : undefined}
            className={cx(
              'flex flex-col items-center rounded-[12px] py-2 text-center',
              isNext && (onDark ? 'bg-white/[0.1]' : 'bg-deep text-white'),
              !isNext && past && 'opacity-55',
              n.key === 'Sunrise' && !isNext && 'opacity-60',
            )}
          >
            <span className={cx('text-[11.5px] font-medium leading-none sm:text-[12.5px]', isNext ? 'text-gold-bright' : onDark ? 'text-white/70' : 'text-muted')}>{n.label}</span>
            <span className={cx('tabular mt-1.5 font-display text-[16px] font-medium leading-none sm:text-[19px]', onDark && !isNext && 'text-white/90')}>{data[n.key]}</span>
          </li>
        )
      })}
    </ol>
  )
}

export function PrayerTimesCard({ compact = false }: { compact?: boolean }) {
  const { loc, method, data, error, loading, retry, now, next, nextIdx, remaining, isPast } = usePrayerTimes()
  const [editing, setEditing] = useState(false)

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-[20px] font-medium leading-tight sm:text-[22px]">Horaires de prière</h2>
          {loc && (
            <p className="truncate text-[13px] text-muted sm:text-[14px]">
              {loc.city}
              {loc.country ? `, ${loc.country}` : ''} · {frDate(now, { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          )}
        </div>
        {loc && (
          <button onClick={() => setEditing((e) => !e)} className="-mr-2 h-9 shrink-0 rounded-full px-3 text-[14px] font-semibold text-primary hover:bg-primary-soft/60">
            {editing ? 'Fermer' : 'Modifier'}
          </button>
        )}
      </div>
      {!loc && !editing && (
        <button onClick={() => setEditing(true)} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-[14px] bg-primary-soft/60 px-4 py-3 text-left text-[14.5px] font-semibold text-primary">
          <span className="flex items-center gap-2.5">
            <Icon name="pin" size={18} /> Choisir ma ville pour voir les horaires
          </span>
          <Icon name="chevronRight" size={16} />
        </button>
      )}
      {editing && (
        <div className="mb-1">
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
                <p className="mb-3 text-[14.5px]">
                  Prochaine prière : <strong className="font-semibold">{next.label}</strong> à <strong className="tabular font-semibold">{data[next.key]}</strong> <span className="text-muted">· dans {durationFr(remaining)}</span>
                </p>
              )}
              <PrayerStrip data={data} nextIdx={nextIdx} isPast={isPast} />
              <p className={cx('mt-3 text-[12px] leading-snug text-muted', compact && 'hidden sm:block')}>
                Source : API Aladhan · {CALC_METHODS.find((m) => m.id === method)?.name}. Le lever du soleil n’est pas une prière : il marque la fin du temps du Fajr. Suivez de préférence le calendrier de votre mosquée.
              </p>
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
        <button onClick={() => setOffset((o) => o + 1)} className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-ink/[0.05] hover:text-ink" aria-label="Mois précédent">
          <Icon name="chevronLeft" size={18} />
        </button>
        <p className="font-display text-[18px] font-medium capitalize">{frDate(first, { month: 'long', year: 'numeric' })}</p>
        <button onClick={() => setOffset((o) => Math.max(0, o - 1))} disabled={offset === 0} className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-ink/[0.05] hover:text-ink disabled:opacity-30" aria-label="Mois suivant">
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11.5px] font-medium text-muted">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-7 gap-1">
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
                'tabular mx-auto flex aspect-square w-full max-w-11 items-center justify-center rounded-[9px] text-[12.5px]',
                level === 0 && 'bg-ink/[0.04] text-muted',
                level === 1 && 'bg-primary/20 text-ink',
                level === 2 && 'bg-primary/55 text-white',
                level >= 3 && 'bg-primary text-primary-ink',
                k === today && 'font-semibold ring-1 ring-gold ring-offset-1 ring-offset-surface',
              )}
            >
              {d.getDate()}
            </span>
          )
        })}
      </div>
      <p className="mt-3 text-[12.5px] leading-snug text-muted">Chaque case colorée est un jour où vous avez appris quelque chose. Les jours de repos font partie du chemin : revenez simplement quand vous le pouvez.</p>
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
      <p className="mb-2 text-[13.5px] text-muted">
        Semaine du {frDate(ws, { day: 'numeric', month: 'long' })} au {frDate(addDays(ws, 6), { day: 'numeric', month: 'long' })}
      </p>
      {current.length > 0 && (
        <ul className="divide-y divide-line">
          {current.map((g) => (
            <li key={g.id} className="group flex min-h-12 items-center gap-3 py-1.5">
              <button
                onClick={() => toggleGoal(g.id)}
                className={cx('flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors', g.done ? 'bg-primary text-primary-ink' : 'ring-[1.5px] ring-inset ring-ink/25 hover:ring-primary')}
                aria-label={g.done ? 'Marquer comme non fait' : 'Marquer comme fait'}
              >
                {g.done && <Icon name="check" size={14} strokeWidth={3} />}
              </button>
              <span className={cx('flex-1 text-[15px]', g.done && 'text-muted line-through decoration-ink/30')}>{g.text}</span>
              <button onClick={() => removeGoal(g.id)} className="flex h-9 w-9 items-center justify-center rounded-full text-muted opacity-60 hover:bg-danger-soft hover:text-danger hover:opacity-100" aria-label="Supprimer l’objectif">
                <Icon name="trash" size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {current.length === 0 && <p className="text-[14.5px] text-muted">Aucun objectif cette semaine. Choisissez-en un petit et atteignable.</p>}
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          addGoal(text.trim())
          setText('')
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nouvel objectif…" className="field h-11 min-w-0 flex-1" aria-label="Nouvel objectif" />
        <Button type="submit" icon="plus" aria-label="Ajouter" className="w-11 !px-0 sm:w-auto sm:!px-5">
          <span className="hidden sm:inline">Ajouter</span>
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {suggestions
          .filter((s) => !current.some((g) => g.text === s))
          .slice(0, 4)
          .map((s) => (
            <button key={s} onClick={() => addGoal(s)} className="rounded-full px-3 py-1.5 text-[13px] font-medium text-muted ring-1 ring-line hover:bg-primary-soft hover:text-primary hover:ring-transparent">
              + {s}
            </button>
          ))}
      </div>
    </div>
  )
}

/* ---------------- Date hégirienne du jour ---------------- */
export function TodayDates({ className = '' }: { className?: string }) {
  const h = useMemo(() => toHijri(new Date()), [])
  return (
    <p className={cx('text-[14px] text-muted', className)}>
      <span className="capitalize">{frDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' })}</span>
      {h && (
        <>
          <span className="mx-1.5 text-gold" aria-hidden>
            ·
          </span>
          <Link to="/calendrier" className="hover:text-ink hover:underline">
            {h.day} {HIJRI_MONTHS[h.month - 1]} {h.year}
          </Link>
        </>
      )}
    </p>
  )
}
