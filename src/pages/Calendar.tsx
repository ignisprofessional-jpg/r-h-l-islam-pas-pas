import { useMemo, useState } from 'react'
import { EVENTS, RECURRING_FASTS, type IslamicEvent } from '../data/calendar'
import { useDocumentTitle } from '../lib/hooks'
import { addDays, dateKey, frDate, toHijri, HIJRI_MONTHS, HIJRI_MONTHS_AR, type HijriDate } from '../lib/dates'
import { Badge, Card, Note, PageHeader, SectionTitle, cx } from '../components/ui'
import { Icon } from '../components/Icon'

interface Occurrence { ev: IslamicEvent; start: Date; end: Date }

const KIND = {
  fete: { label: 'Fête', tone: 'gold' as const, dot: 'bg-gold' },
  jeune: { label: 'Jeûne', tone: 'green' as const, dot: 'bg-primary' },
  periode: { label: 'Période bénie', tone: 'neutral' as const, dot: 'bg-accent' },
  memoire: { label: 'Repère', tone: 'neutral' as const, dot: 'bg-muted' },
}

function useOccurrences(from: Date, days: number) {
  return useMemo(() => {
    const out: Occurrence[] = []
    const hijri: { d: Date; h: HijriDate | null }[] = Array.from({ length: days }, (_, i) => {
      const d = addDays(from, i)
      return { d, h: toHijri(d) }
    })
    for (const { d, h } of hijri) {
      if (!h) continue
      for (const ev of EVENTS) {
        if (h.month === ev.month && h.day === ev.day) {
          let end = addDays(d, (ev.length ?? 1) - 1)
          if (ev.month === 9) {
            // fin du Ramadan (29 ou 30 jours) : veille du 1er Chawwal
            const shawwal = hijri.find((x) => x.d > d && x.h?.month === 10 && x.h.day === 1)
            if (shawwal) end = ev.id === 'ramadan' ? addDays(shawwal.d, -1) : new Date(Math.min(end.getTime(), addDays(shawwal.d, -1).getTime()))
          }
          out.push({ ev, start: d, end })
        }
      }
    }
    return out
  }, [from, days])
}

export default function Calendar() {
  useDocumentTitle('Calendrier islamique')
  const today = useMemo(() => new Date(), [])
  const h = toHijri(today)
  const [offset, setOffset] = useState(0)
  const monthStart = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate()
  const lead = (monthStart.getDay() + 6) % 7
  const upcomingFrom = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() - 40), [today])
  const occ = useOccurrences(upcomingFrom, 440)
  const upcoming = occ.filter((o) => o.end >= new Date(today.getFullYear(), today.getMonth(), today.getDate())).slice(0, 12)

  const eventsOn = (d: Date) => occ.filter((o) => d >= o.start && d <= o.end)
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(monthStart.getFullYear(), monthStart.getMonth(), i + 1))]
  const hStart = toHijri(monthStart)
  const hEnd = toHijri(new Date(monthStart.getFullYear(), monthStart.getMonth(), daysInMonth))
  const todayKey = dateKey(today)

  return (
    <div className="animate-in">
      <PageHeader title="Calendrier islamique" arabic="التقويم الهجري" icon="calendar" subtitle="Le calendrier hégirien est lunaire : chaque mois commence avec le nouveau croissant, et l’année compte environ 354 jours. Les fêtes avancent donc d’environ 11 jours chaque année par rapport au calendrier grégorien.">
        {h && (
          <div className="inline-flex flex-wrap items-baseline gap-x-3 rounded-2xl bg-white/10 px-4 py-3">
            <span className="font-display text-3xl font-semibold">
              {h.day} {HIJRI_MONTHS[h.month - 1]} {h.year}
            </span>
            <span className="arabic text-xl text-[#e8cf98]">{HIJRI_MONTHS_AR[h.month - 1]}</span>
            <span className="text-sm text-white/80 first-letter:uppercase">{frDate(today)}</span>
          </div>
        )}
      </PageHeader>

      <div className="grid gap-3 sm:gap-5 lg:grid-cols-[1fr_340px]">
        <Card className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <button onClick={() => setOffset((o) => o - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-surface-2" aria-label="Mois précédent">
              <Icon name="chevronLeft" />
            </button>
            <div className="text-center">
              <p className="font-display text-xl font-semibold capitalize">{frDate(monthStart, { month: 'long', year: 'numeric' })}</p>
              {hStart && hEnd && (
                <p className="text-xs text-muted">
                  {HIJRI_MONTHS[hStart.month - 1]}
                  {hStart.month !== hEnd.month && ` – ${HIJRI_MONTHS[hEnd.month - 1]}`} {hEnd.year}
                </p>
              )}
            </div>
            <button onClick={() => setOffset((o) => o + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-surface-2" aria-label="Mois suivant">
              <Icon name="chevronRight" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <span key={i} />
              const hd = toHijri(d)
              const evs = eventsOn(d)
              const white = hd && hd.day >= 13 && hd.day <= 15
              const monThu = d.getDay() === 1 || d.getDay() === 4
              const isToday = dateKey(d) === todayKey
              return (
                <div
                  key={i}
                  title={evs.map((e) => e.ev.title).join(', ') || undefined}
                  className={cx(
                    'relative flex min-h-11 flex-col rounded-lg border p-1 text-left sm:min-h-20 sm:rounded-xl sm:p-1.5',
                    evs.some((e) => e.ev.kind === 'fete') ? 'border-gold bg-gold-soft/60' : evs.length ? 'border-primary/30 bg-primary-soft/50' : 'border-line',
                    isToday && 'ring-2 ring-gold',
                  )}
                >
                  <span className="text-sm font-semibold tabular-nums">{d.getDate()}</span>
                  {hd && <span className="text-[11px] text-muted tabular-nums">{hd.day === 1 ? `1 ${HIJRI_MONTHS[hd.month - 1].split(' ')[0]}` : hd.day}</span>}
                  <span className="mt-auto flex flex-wrap gap-0.5">
                    {evs.map((e) => (
                      <span key={e.ev.id} className={cx('h-1.5 w-1.5 rounded-full', KIND[e.ev.kind].dot)} />
                    ))}
                    {white && <span className="h-1.5 w-1.5 rounded-full border border-primary" title="Jour blanc" />}
                    {monThu && !evs.length && <span className="h-1.5 w-1.5 rounded-full bg-line" title="Lundi / jeudi" />}
                  </span>
                  {evs[0] && <span className="mt-0.5 hidden truncate text-[10px] font-semibold text-ink/80 sm:block">{evs[0].ev.title}</span>}
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-gold" /> Fête
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary" /> Jeûne recommandé ou obligatoire
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full border border-primary" /> Jours blancs (13-15)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-line" /> Lundi et jeudi
            </span>
          </div>
        </Card>

        <div>
          <p className="mb-2 font-display text-xl font-semibold">Prochaines dates</p>
          <div className="space-y-1.5 sm:space-y-2">
            {upcoming.slice(0, 6).map((o) => {
              const ongoing = o.start <= today
              const days = Math.ceil((o.start.getTime() - today.getTime()) / 86400000)
              return (
                <Card key={o.ev.id + o.start.toISOString()} className="px-3 py-2.5 sm:p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold">{o.ev.title}</p>
                    <Badge tone={KIND[o.ev.kind].tone}>{KIND[o.ev.kind].label}</Badge>
                  </div>
                  <p className="text-[13px] text-muted sm:text-sm">
                    {frDate(o.start, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                    {o.end > o.start && ` → ${frDate(o.end, { day: 'numeric', month: 'long' })}`}
                  </p>
                  <p className="text-xs font-semibold text-primary">{ongoing ? 'En cours' : days <= 1 ? 'Demain' : `Dans ${days} jours`}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <Note tone="warning" title="Dates indicatives">
        Les dates sont calculées avec le calendrier Umm al-Qura (fourni par votre navigateur). Le début réel des mois, notamment du Ramadan et des Aïds, dépend de l’observation du croissant et peut varier d’un jour selon les pays : référez-vous à l’annonce de votre mosquée ou des instances musulmanes locales.
      </Note>

      <SectionTitle>Les dates importantes de l’année</SectionTitle>
      <div className="grid gap-1.5 md:grid-cols-2 md:gap-3">
        {EVENTS.map((e) => (
          <details key={e.id} className="group rounded-2xl border border-line bg-surface px-3.5 py-3 sm:p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
              <p className="font-semibold">{e.title}</p>
              <Badge tone={KIND[e.kind].tone}>
                {e.day}
                {e.length && e.length > 1 ? `-${e.day + e.length - 1}` : ''} {HIJRI_MONTHS[e.month - 1]}
              </Badge>
            </summary>
            <p className="mt-2 text-[14.5px] text-ink/85 sm:text-[15px]">{e.text}</p>
            {e.ref && (
              <p className="mt-2 flex items-start gap-1.5 text-xs text-muted">
                <Icon name="book" size={13} className="mt-0.5" /> {e.ref}
              </p>
            )}
          </details>
        ))}
      </div>

      <SectionTitle>Les jours de jeûne recommandés</SectionTitle>
      <div className="grid gap-1.5 md:grid-cols-2 md:gap-3">
        {RECURRING_FASTS.map((f) => (
          <details key={f.title} className="group rounded-2xl border border-line bg-surface px-3.5 py-3 sm:p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-semibold">
              {f.title} <Icon name="chevronDown" size={16} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-[14.5px] text-ink/85 sm:text-[15px]">{f.text}</p>
            <p className="mt-2 text-xs text-muted">{f.ref}</p>
          </details>
        ))}
      </div>
      <Note tone="info" title="Jours où l’on ne jeûne pas">
        Il n’est pas permis de jeûner le jour de l’Aïd al-Fitr, le jour de l’Aïd al-Adha et les trois jours de Tachrîq (al-Bukhârî n°1990, Muslim n°1137 et n°1141). Le jeûne volontaire est facultatif : il n’y a aucune faute à ne pas le faire.
      </Note>
    </div>
  )
}
