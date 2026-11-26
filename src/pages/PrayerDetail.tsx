import { Link, useParams } from 'react-router-dom'
import { PRAYERS, type Pose } from '../data/prayer'
import { useDocumentTitle } from '../lib/hooks'
import { Card, LinkButton, Note, PageHeader, SectionTitle, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import { PrayerFigure } from '../components/Illustrations'
import { PrayerTimesCard } from '../components/Widgets'
import NotFound from './NotFound'

interface Row { pose: Pose; text: string; strong?: boolean }

function rakaPlan(n: number, loudFirstTwo: boolean, allSilent: boolean, isFajr: boolean): { title: string; rows: Row[] }[] {
  return Array.from({ length: n }, (_, k) => {
    const r = k + 1
    const loud = allSilent ? false : isFajr || (loudFirstTwo && r <= 2)
    const rows: Row[] = []
    if (r === 1) rows.push({ pose: 'takbir', text: 'Takbir d’ouverture : « Allâhu akbar », mains levées.' }, { pose: 'qiyam', text: 'Invocation d’ouverture (recommandée).' })
    else rows.push({ pose: 'qiyam', text: 'Se relever en disant « Allâhu akbar ».' })
    rows.push({ pose: 'qiyam', text: r <= 2 ? `Al-Fâtiha puis une courte sourate — ${loud ? 'à voix haute' : 'à voix basse'}.` : 'Al-Fâtiha seulement — à voix basse.', strong: true })
    rows.push({ pose: 'ruku', text: 'Inclinaison : « Subhâna Rabbiya-l-‘Adhîm » ×3.' })
    rows.push({ pose: 'itidal', text: '« Sami‘a-llâhu li-man hamidah », puis « Rabbanâ wa laka-l-hamd ».' })
    rows.push({ pose: 'sujud', text: 'Prosternation : « Subhâna Rabbiya-l-A‘lâ » ×3.' })
    rows.push({ pose: 'jalsa', text: 'Assise : « Rabbi-ghfir lî ».' })
    rows.push({ pose: 'sujud', text: 'Seconde prosternation.' })
    if (r === 2 && n > 2) rows.push({ pose: 'tashahhud', text: 'Premier tachahhoud (assis), puis on se relève pour la rak‘a suivante.', strong: true })
    if (r === n) rows.push({ pose: 'tashahhud', text: 'Dernier tachahhoud, prière sur le Prophète ﷺ, invocation.', strong: true }, { pose: 'salam', text: 'Salam à droite puis à gauche : la prière est terminée.', strong: true })
    return { title: `${r}${r === 1 ? 're' : 'e'} rak‘a`, rows }
  })
}

export default function PrayerDetail() {
  const { id = '' } = useParams()
  const p = PRAYERS.find((x) => x.id === id)
  useDocumentTitle(p ? `Prière du ${p.name}` : 'Prière')
  if (!p) return <NotFound />
  const plan = rakaPlan(p.rakaat, p.id === 'maghrib' || p.id === 'isha', p.id === 'dhohr' || p.id === 'asr', p.id === 'fajr')
  const idx = PRAYERS.indexOf(p)

  return (
    <div className="animate-in">
      <PageHeader title={p.name} arabic={p.arabic} icon="prayer" subtitle={`${p.rakaat} rak‘ats obligatoires · ${p.loud}`} back={{ to: '/priere', label: 'La prière' }} />

      <div className="mb-3 grid grid-cols-2 gap-2 sm:mb-5 sm:grid-cols-3 sm:gap-3">
        <Card className="col-span-2 p-3.5 sm:col-span-1 sm:p-4">
          <p className="text-[13.5px] font-semibold text-gold">Son horaire</p>
          <p className="mt-1 text-[14px] sm:text-[15px]">{p.window}</p>
        </Card>
        <Card className="p-3.5 sm:p-4">
          <p className="text-[13.5px] font-semibold text-primary">Obligatoire</p>
          <p className="mt-1 font-display text-[22px] font-medium sm:text-2xl sm:text-3xl">{p.rakaat} rak‘ats</p>
        </Card>
        <Card className="p-3.5 sm:p-4">
          <p className="text-[13.5px] font-semibold text-muted">Sunna</p>
          <p className="mt-1 text-[13px] leading-snug sm:text-[15px]">
            {p.sunnaBefore && (
              <>
                <strong>Avant :</strong> {p.sunnaBefore}
                <br />
              </>
            )}
            {p.sunnaAfter && (
              <>
                <strong>Après :</strong> {p.sunnaAfter}
              </>
            )}
          </p>
        </Card>
      </div>

      <PrayerTimesCard compact />

      <SectionTitle>Le déroulé, rak‘a par rak‘a</SectionTitle>
      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        {plan.map((rk, ri) => (
          <details key={rk.title} open={ri === 0} className="group rounded-[16px] bg-surface ring-1 ring-ink/[0.06] p-3 sm:p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
              <span className="font-display text-[19px] font-medium sm:text-xl">{rk.title}</span>
              <Icon name="chevronDown" size={18} className="text-muted transition-transform group-open:rotate-180" />
            </summary>
            <ol className="mt-2 space-y-1">
              {rk.rows.map((row, k) => (
                <li key={k} className={cx('flex items-center gap-2.5 rounded-xl p-1', row.strong && 'bg-gold-soft/40')}>
                  <PrayerFigure pose={row.pose} className="h-10 w-11 shrink-0 sm:h-12 sm:w-14" />
                  <span className={cx('text-[13.5px] leading-snug sm:text-[14.5px]', row.strong && 'font-semibold')}>{row.text}</span>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>

      <SectionTitle>À savoir</SectionTitle>
      <Card className="p-5">
        <ul className="space-y-2">
          {p.notes.map((n) => (
            <li key={n} className="flex gap-3 text-[15.5px]">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
              {n}
            </li>
          ))}
        </ul>
      </Card>

      <Note tone="info" title="Les paroles et les gestes">
        Toutes les paroles (avec phonétique et sens) et l’illustration de chaque position se trouvent dans le guide pas à pas.
      </Note>
      <div className="flex flex-wrap gap-2">
        <LinkButton to="/priere/guide?lent=1" icon="play">
          Ouvrir le guide pas à pas
        </LinkButton>
      </div>

      <div className="mt-6 flex justify-between gap-2">
        {idx > 0 ? (
          <Link to={`/priere/${PRAYERS[idx - 1].id}`} className="flex items-center gap-2 rounded-[14px] bg-surface ring-1 ring-ink/[0.06] px-4 py-3 text-sm hover:ring-gold/45">
            <Icon name="arrowLeft" size={16} className="text-gold" /> {PRAYERS[idx - 1].name.split(' (')[0]}
          </Link>
        ) : (
          <span />
        )}
        {idx < PRAYERS.length - 1 && (
          <Link to={`/priere/${PRAYERS[idx + 1].id}`} className="flex items-center gap-2 rounded-[14px] bg-surface ring-1 ring-ink/[0.06] px-4 py-3 text-sm hover:ring-gold/45">
            {PRAYERS[idx + 1].name.split(' (')[0]} <Icon name="arrowRight" size={16} className="text-gold" />
          </Link>
        )}
      </div>
    </div>
  )
}
