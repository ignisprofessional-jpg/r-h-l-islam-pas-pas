import { Link } from 'react-router-dom'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { itemsOf } from '../lib/nav'
import { GUIDE } from '../data/prayer'
import { WUDU_STEPS } from '../data/wudu'
import { DUAS } from '../data/duas'
import { PageHeader, SectionTitle } from '../components/ui'
import { Icon } from '../components/Icon'
import { PrayerSection } from '../components/PrayerPanel'

/** Rubrique « Pratique » : horaires du jour et accès aux guides d'adoration. */
export default function Practice() {
  useDocumentTitle('Pratique')
  const steps = useApp((s) => s.steps)
  const duas = useApp((s) => s.duas)
  const memorized = DUAS.filter((d) => duas[d.id]).length
  const status: Record<string, string> = {
    '/priere': `${(steps['guide-priere'] ?? []).length}/${GUIDE.length} étapes du guide`,
    '/ablutions': `${(steps['wudu'] ?? []).length}/${WUDU_STEPS.length} étapes`,
    '/douas': `${memorized} mémorisée${memorized > 1 ? 's' : ''} sur ${DUAS.length}`,
    '/dhikr': 'Tasbîh, compteur et rappels',
  }
  return (
    <div className="animate-in">
      <PageHeader title="Pratique" arabic="العبادة" subtitle="La prière, les ablutions, les invocations et le dhikr : ce qui accompagne chaque journée." />

      <div className="max-w-xl">
        <PrayerSection />
      </div>

      <SectionTitle>Guides et outils</SectionTitle>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {itemsOf('pratique').map((n) => (
          <li key={n.to}>
            <Link to={n.to} className="card group flex min-h-[76px] items-center gap-4 px-4 py-3 active:scale-[0.99]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-ink">
                <Icon name={n.icon} size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold group-hover:text-primary">{n.label}</span>
                <span className="block text-[13.5px] text-muted">{n.desc}</span>
                <span className="mt-0.5 block text-[12.5px] text-gold">{status[n.to]}</span>
              </span>
              <Icon name="chevronRight" size={17} className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/priere/guide" className="group mt-3 flex items-center justify-between gap-4 rounded-[24px] bg-ink px-5 py-5 text-bg sm:px-7">
        <span>
          <span className="block text-[20px] font-semibold leading-tight sm:text-[22px]">Je découvre la prière</span>
          <span className="mt-1 block text-[14px] opacity-70">Le guide pas à pas, lentement, avec chaque parole et chaque geste.</span>
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg/15">
          <Icon name="arrowRight" size={18} />
        </span>
      </Link>
    </div>
  )
}
