import { useEffect, useMemo, useState } from 'react'
import { toHijri, HIJRI_MONTHS } from '../lib/dates'
import type { PrayerTimes } from '../lib/api'
import { cx } from './ui'
import { Icon } from './Icon'
import { PrayerArch } from './PrayerArt'
import { LocationForm, PRAYER_NAMES, usePrayerTimes } from './Widgets'

/* ---------------- Horaires : compte à rebours ---------------- */
const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const two = (n: number) => String(n).padStart(2, '0')

function useNow(ms = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

/** Prochaine prière (y compris le Fajr du lendemain) et secondes restantes. */
function nextPrayer(data: PrayerTimes, now: Date) {
  const sec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
  const list = PRAYER_NAMES.filter((n) => n.key !== 'Sunrise')
  const n = list.find((p) => toMin(data[p.key] as string) * 60 > sec)
  if (n) return { prayer: n, left: toMin(data[n.key] as string) * 60 - sec, tomorrow: false }
  const fajr = list[0]
  return { prayer: fajr, left: toMin(data.Fajr) * 60 + 86400 - sec, tomorrow: true }
}

function Countdown({ seconds }: { seconds: number }) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const Colon = () => <span className="mx-[0.06em] -translate-y-[0.06em] text-white/35">:</span>
  return (
    <p className="tabular flex items-baseline justify-center text-[52px] font-semibold leading-none tracking-[-0.03em] sm:text-[60px]" aria-label={`${h} heures ${m} minutes ${s} secondes`}>
      {two(h)}
      <Colon />
      {two(m)}
      <Colon />
      {two(s)}
    </p>
  )
}

export function PrayerSection() {
  const { loc, data, loading, error, retry, isPast } = usePrayerTimes()
  const now = useNow(1000)
  const [editing, setEditing] = useState(false)
  const hijri = useMemo(() => toHijri(new Date()), [])
  const next = data ? nextPrayer(data, now) : null

  return (
    <section aria-label="Horaires de prière" className="space-y-3">
      {/* Carte principale : la prochaine prière */}
      <div className="relative overflow-hidden rounded-[28px] bg-deep px-5 pb-6 pt-5 text-white shadow-[0_18px_40px_-22px_rgba(6,40,28,0.7)]">
        <svg className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-[118%] w-auto opacity-[0.09]" viewBox="0 0 200 230" aria-hidden>
          <path d="M20 230V100a80 80 0 0 1 160 0v130" fill="none" stroke="#e2c487" strokeWidth="1.5" />
          <path d="M42 230V104a58 58 0 0 1 116 0v126" fill="none" stroke="#e2c487" strokeWidth="1.2" />
        </svg>
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold">{loc ? loc.city : 'Horaires de prière'}</p>
            <p className="text-[13.5px] text-white/65">{hijri ? `${hijri.day} ${HIJRI_MONTHS[hijri.month - 1]} ${hijri.year}` : ''}</p>
          </div>
          <button onClick={() => setEditing((e) => !e)} className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-[13.5px] font-semibold text-white/90 active:bg-white/20" aria-expanded={editing}>
            <Icon name={editing ? 'x' : 'pin'} size={16} /> {editing ? 'Fermer' : loc ? 'Lieu' : 'Choisir'}
          </button>
        </div>

        {!editing && (
          <div className="relative mt-6 text-center sm:mt-8">
            {next ? (
              <>
                <p className="text-[15px] text-white/70">
                  {next.tomorrow ? 'Demain · ' : 'Prochaine · '}
                  <span className="font-semibold text-gold-bright">{next.prayer.label}</span> à <span className="tabular">{data![next.prayer.key]}</span>
                </p>
                <div className="mt-2">
                  <Countdown seconds={next.left} />
                </div>
              </>
            ) : loc && loading ? (
              <p className="py-6 text-white/70">Calcul des horaires…</p>
            ) : loc && error ? (
              <p className="py-4 text-[14.5px] text-white/80">
                Horaires indisponibles.{' '}
                <button onClick={retry} className="font-semibold underline">
                  Réessayer
                </button>
              </p>
            ) : (
              <div className="py-2">
                <p className="text-[17px] font-semibold">Vos horaires, chaque jour</p>
                <p className="mx-auto mt-1 max-w-xs text-[14px] text-white/70">Indiquez votre ville pour voir la prochaine prière et le temps restant.</p>
                <button onClick={() => setEditing(true)} className="mt-4 h-11 rounded-full bg-gold-bright px-5 text-[15px] font-semibold text-[#1d1607]">
                  Choisir ma ville
                </button>
              </div>
            )}
          </div>
        )}
        {editing && (
          <div className="relative mt-4 rounded-[20px] bg-surface p-4 text-ink">
            <LocationForm onDone={() => setEditing(false)} />
          </div>
        )}
      </div>

      {/* Les six horaires */}
      {data && !editing && (
        <ul className="card divide-y divide-line overflow-hidden">
          {PRAYER_NAMES.map((n) => {
            const isNext = next?.prayer.key === n.key && !next.tomorrow
            const past = !isNext && isPast(n.key)
            return (
              <li key={n.key} className={cx('flex items-center gap-3.5 px-4 py-2.5', isNext && 'bg-primary-soft/70')}>
                <PrayerArch prayer={n.key as 'Fajr'} size={34} />
                <div className={cx('min-w-0 flex-1', past && 'opacity-55')}>
                  <p className="tabular text-[19px] font-semibold leading-tight">{data[n.key]}</p>
                  <p className="text-[13.5px] text-muted">
                    {n.label}
                    {n.key === 'Sunrise' && ' · fin du Fajr'}
                  </p>
                </div>
                <span className="arabic text-[17px] leading-none text-muted" lang="ar">
                  {n.ar}
                </span>
                {isNext ? (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[12px] font-semibold text-primary-ink">Prochaine</span>
                ) : past ? (
                  <Icon name="check" size={18} className="text-primary/70" />
                ) : (
                  <span className="w-[18px]" />
                )}
              </li>
            )
          })}
        </ul>
      )}
      {data && (
        <p className="px-2 text-[12px] leading-snug text-muted">Calcul : API Aladhan. Suivez de préférence le calendrier de votre mosquée.</p>
      )}
    </section>
  )
}

