import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp, type Level } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { useUI } from '../lib/ui'
import { lessonOfTheDay, levelProgress, computedLevel, activityStats } from '../lib/progress'
import { LEVELS, lessonById } from '../data/lessons'
import { CATEGORIES } from '../data/types'
import { LEARN_SURAHS } from '../data/learnSurahs'
import chapters from '../data/chapters.json'
import { relativeFr } from '../lib/dates'
import { Button, MoreLink, SectionTitle, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import { RoundButton } from '../components/Layout'
import { PrayerSection } from '../components/PrayerPanel'
import { ActivityCalendar, GoalsCard } from '../components/Widgets'
import { InstallHint } from '../components/InstallHint'

/* ---------------- Premier lancement ---------------- */
function Onboarding() {
  const setProfile = useApp((s) => s.setProfile)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<Level>('debutant')
  return (
    <section className="card mb-5 p-5 sm:p-7">
      <p className="quran text-right text-[24px] leading-[1.9] text-gold sm:text-[28px]" lang="ar">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <h2 className="mt-1 text-[26px] font-semibold leading-tight sm:text-[32px]">Bienvenue sur Rûh</h2>
      <p className="mt-2 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">
        Rûh vous accompagne pas à pas, avec des mots simples, pour découvrir l'islam, apprendre la prière, lire le Coran et progresser à votre rythme. Vos progrès sont enregistrés automatiquement sur cet appareil.
      </p>
      <form
        className="mt-5 space-y-5"
        onSubmit={(e) => {
          e.preventDefault()
          setProfile({ name: name.trim(), level, onboarded: true })
        }}
      >
        <label className="block max-w-sm text-sm">
          <span className="mb-1.5 block font-semibold">Comment souhaitez-vous être appelé(e) ? (facultatif)</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre prénom" className="field h-12 w-full" />
        </label>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Où en êtes-vous ?</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {LEVELS.map((l) => (
              <button
                type="button"
                key={l.id}
                onClick={() => setLevel(l.id)}
                aria-pressed={level === l.id}
                className={cx('rounded-[18px] p-4 text-left transition-colors', level === l.id ? 'bg-primary-soft ring-[1.5px] ring-primary' : 'bg-surface-2 hover:ring-1 hover:ring-line')}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold">{l.label}</span>
                  <span className="arabic text-gold">{l.arabic}</span>
                </span>
                <span className="mt-1 block text-[13.5px] leading-snug text-muted">{l.text}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <Button type="submit" size="lg" icon="arrowRight">
          Commencer mon parcours
        </Button>
      </form>
    </section>
  )
}

/* ---------------- Cartes de l'accueil ---------------- */
const QUICK = [
  { to: '/priere/guide', icon: 'prayer', label: 'Prière' },
  { to: '/ablutions', icon: 'drop', label: 'Ablutions' },
  { to: '/douas', icon: 'hands', label: 'Douas' },
  { to: '/dhikr', icon: 'beads', label: 'Dhikr' },
]

function QuranCard() {
  const bookmark = useApp((s) => s.bookmark)
  const lastRead = useApp((s) => s.lastRead)
  const pos = bookmark ?? lastRead
  const ch = chapters.find((c) => c.id === (pos?.surah ?? 1))!
  const pct = pos ? Math.round((pos.verse / ch.versesCount) * 100) : 0
  return (
    <Link to={pos ? `/coran/${pos.surah}?v=${pos.verse}` : '/coran/1'} className="card group flex flex-col p-5 active:scale-[0.99]">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13.5px] font-semibold text-muted">
          <Icon name={bookmark ? 'bookmark' : 'book'} size={17} className="text-primary" />
          {pos ? (bookmark ? 'Marque-page' : 'Reprendre la lecture') : 'Commencer le Coran'}
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-ink">
          <Icon name="play" size={13} />
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[22px] font-semibold leading-tight">{ch.nameSimple}</p>
          <p className="text-[13.5px] text-muted">{pos ? `Verset ${pos.verse} sur ${ch.versesCount} · ${relativeFr(pos.at)}` : `${ch.nameFr} · ${ch.versesCount} versets`}</p>
        </div>
        <p className="quran shrink-0 text-[34px] leading-[1.4] text-gold" lang="ar">
          {ch.nameArabic}
        </p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
        <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
      </div>
    </Link>
  )
}

function LessonCard() {
  const s = useApp()
  const daily = lessonOfTheDay(s)
  const started = !!s.lessons[daily.id]
  return (
    <Link to={`/cours/${daily.id}`} className="card group block p-5 active:scale-[0.99]">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13.5px] font-semibold text-muted">
          <Icon name="sparkle" size={17} className="text-gold" /> Leçon du jour
        </p>
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-muted">{daily.minutes} min</span>
      </div>
      <p className="mt-3 text-[21px] font-semibold leading-snug tracking-[-0.01em]">{daily.title}</p>
      <p className="mt-1 line-clamp-2 text-[14.5px] leading-relaxed text-muted">{daily.summary}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[13px] text-muted">{CATEGORIES[daily.category].label}</span>
        <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-semibold text-bg">
          {started ? 'Revoir' : 'Commencer'} <Icon name="arrowRight" size={16} />
        </span>
      </div>
    </Link>
  )
}

function ProgressCard() {
  const s = useApp()
  const current = s.profile.level
  const earned = computedLevel(s)
  const stats = activityStats(s.activity)
  const lessonsDone = Object.values(s.lessons).filter((l) => l.status === 'done').length
  const surahsLearned = LEARN_SURAHS.filter((x) => s.surahs[x.id]?.learned).length
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13.5px] font-semibold text-muted">
          <Icon name="chart" size={17} className="text-primary" /> Votre chemin
        </p>
        <MoreLink to="/progression">Détails</MoreLink>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { v: lessonsDone, l: 'leçons' },
          { v: surahsLearned, l: 'sourates' },
          { v: stats.streak, l: 'jours de suite' },
        ].map((x) => (
          <div key={x.l} className="rounded-[16px] bg-surface-2 px-3 py-3">
            <p className="tabular text-[26px] font-semibold leading-none">{x.v}</p>
            <p className="mt-1 text-[12.5px] text-muted">{x.l}</p>
          </div>
        ))}
      </div>
      <ol className="mt-4 space-y-2.5">
        {LEVELS.map((l) => {
          const p = levelProgress(l.id, s)
          const isCurrent = l.id === current
          return (
            <li key={l.id} className="flex items-center gap-3">
              <span className={cx('w-[92px] shrink-0 text-[13.5px]', isCurrent ? 'font-semibold' : 'text-muted')}>{l.label}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
                <span className={cx('block h-full rounded-full', isCurrent ? 'bg-primary' : 'bg-ink/25')} style={{ width: `${p.pct}%` }} />
              </span>
              <span className="tabular w-9 text-right text-[13px] text-muted">{p.pct}%</span>
            </li>
          )
        })}
      </ol>
      {earned !== current && (
        <button onClick={() => s.setProfile({ level: earned })} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold-soft px-4 text-[14px] font-semibold text-gold">
          Passer au niveau {LEVELS.find((l) => l.id === earned)!.label} <Icon name="arrowRight" size={16} />
        </button>
      )}
    </div>
  )
}

/* ---------------- Page ---------------- */
export default function Dashboard() {
  useDocumentTitle('')
  const s = useApp()
  const setSearchOpen = useUI((x) => x.setSearchOpen)
  const recent = s.recent.map((r) => ({ ...r, lesson: lessonById(r.id) })).filter((r) => r.lesson).slice(0, 3)
  const hour = new Date().getHours()
  const hello = hour < 5 ? 'Bonne nuit' : hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'
  const [suivi, setSuivi] = useState<'objectifs' | 'calendrier'>('objectifs')
  const rank = (id: number) => (s.surahs[id]?.learning && !s.surahs[id]?.learned ? 0 : s.surahs[id]?.learned ? 2 : 1)
  const surahs = [...LEARN_SURAHS].sort((a, b) => rank(a.id) - rank(b.id) || a.order - b.order)
  const initial = (s.profile.name || '').trim().charAt(0).toUpperCase()

  return (
    <div className="animate-in">
      {/* En-tête */}
      <header className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
        <Link to="/compte" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep text-[17px] font-semibold text-gold-bright">{initial || <Icon name="user" size={19} />}</span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[13.5px] text-muted">{hello}, assalâmu ‘alaykum</span>
            <span className="block truncate text-[18px] font-semibold">{s.profile.name || 'Bienvenue sur Rûh'}</span>
          </span>
        </Link>
        <div className="flex shrink-0 gap-2 lg:hidden">
          <RoundButton icon="search" label="Rechercher" onClick={() => setSearchOpen(true)} />
          <Link to="/reglages" aria-label="Réglages" className="card flex h-11 w-11 items-center justify-center !rounded-full text-ink active:scale-95">
            <Icon name="settings" size={20} />
          </Link>
        </div>
      </header>

      <InstallHint />
      {!s.profile.onboarded && <Onboarding />}

      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-6">
        {/* Colonne prière */}
        <div className="min-w-0 lg:col-span-5">
          <PrayerSection />
        </div>

        {/* Colonne apprentissage */}
        <div className="min-w-0 space-y-3 lg:col-span-7">
          <nav aria-label="Accès rapides" className="mt-4 md:mt-0">
            <ul className="grid grid-cols-4 gap-2.5">
              {QUICK.map((q) => (
                <li key={q.to}>
                  <Link to={q.to} className="card flex flex-col items-center gap-2 px-1 pb-3 pt-3.5 active:scale-[0.97]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <Icon name={q.icon} size={22} />
                    </span>
                    <span className="text-[12.5px] font-semibold">{q.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LessonCard />
          <div className="grid gap-3 sm:max-md:grid-cols-2 2xl:grid-cols-2">
            <QuranCard />
            <ProgressCard />
          </div>
        </div>
      </div>

      {/* Sourates à apprendre */}
      <SectionTitle action={<MoreLink to="/sourates" />}>Sourates à apprendre</SectionTitle>
      <div className="no-scrollbar -mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {surahs.map((ls) => {
          const st = s.surahs[ls.id]
          const ch = chapters.find((c) => c.id === ls.id)!
          return (
            <Link key={ls.id} to={`/sourates/${ls.id}`} className="card flex w-[148px] shrink-0 snap-start flex-col p-4 active:scale-[0.98] lg:w-auto lg:[&:nth-child(n+6)]:hidden">
              <span className="flex items-center justify-between">
                <span className="tabular text-[12.5px] font-semibold text-muted">{ls.order}</span>
                {st?.learned ? <Icon name="checkCircle" size={17} filled className="text-primary" /> : st?.learning ? <span className="h-2 w-2 rounded-full bg-gold" /> : null}
              </span>
              <span className="quran mt-1 text-right text-[26px] leading-[1.6] text-ink" lang="ar">
                {ch.nameArabic}
              </span>
              <span className="mt-auto block truncate text-[15px] font-semibold">{ls.name}</span>
              <span className="block truncate text-[12.5px] text-muted">{st?.learned ? 'Maîtrisée' : st?.learning ? 'En cours' : `${ch.versesCount} versets`}</span>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
        {/* Dernières leçons */}
        <section className="min-w-0">
          <SectionTitle action={recent.length ? <MoreLink to="/progression" /> : undefined}>Dernières leçons</SectionTitle>
          {recent.length === 0 ? (
            <Link to="/parcours" className="card flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon name="graduation" size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">Découvrir le parcours</span>
                <span className="block text-[13px] text-muted">Vos leçons ouvertes apparaîtront ici.</span>
              </span>
              <Icon name="chevronRight" size={16} className="text-muted" />
            </Link>
          ) : (
            <ul className="card divide-y divide-line overflow-hidden">
              {recent.map((r) => (
                <li key={r.id}>
                  <Link to={`/cours/${r.id}`} className="flex min-h-[64px] items-center gap-3 px-4 py-2.5 active:bg-surface-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-primary">
                      <Icon name={r.lesson!.icon ?? 'book'} size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{r.lesson!.title}</span>
                      <span className="block text-[13px] text-muted">{relativeFr(r.at)}</span>
                    </span>
                    {s.lessons[r.id]?.status === 'done' ? (
                      <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[12px] font-semibold text-primary">Terminée</span>
                    ) : s.lessons[r.id]?.status === 'review' ? (
                      <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[12px] font-semibold text-gold">À revoir</span>
                    ) : (
                      <Icon name="chevronRight" size={16} className="text-muted" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Suivi */}
        <section className="min-w-0">
          <SectionTitle action={<MoreLink to="/progression">Statistiques</MoreLink>}>Mon suivi</SectionTitle>
          <div className="card p-4 sm:p-5">
            <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-ink/[0.06] p-1" role="tablist">
              {(
                [
                  ['objectifs', 'Objectifs'],
                  ['calendrier', 'Calendrier'],
                ] as const
              ).map(([k, label]) => (
                <button key={k} role="tab" aria-selected={suivi === k} onClick={() => setSuivi(k)} className={cx('h-9 rounded-full text-[14px] transition-colors', suivi === k ? 'bg-ink font-semibold text-bg' : 'font-medium text-muted')}>
                  {label}
                </button>
              ))}
            </div>
            {suivi === 'objectifs' ? <GoalsCard /> : <ActivityCalendar />}
          </div>
        </section>
      </div>
    </div>
  )
}
