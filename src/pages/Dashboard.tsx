import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp, type Level } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { lessonOfTheDay, overallProgress, levelProgress, computedLevel, activityStats } from '../lib/progress'
import { LEVELS, lessonById } from '../data/lessons'
import { CATEGORIES } from '../data/types'
import { LEARN_SURAHS } from '../data/learnSurahs'
import { relativeFr } from '../lib/dates'
import { Badge, Button, Card, LinkButton, ProgressBar, ProgressRing, SectionTitle, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import { surahName } from '../components/Content'
import { ActivityCalendar, GoalsCard, PrayerTimesCard, TodayDates } from '../components/Widgets'
import { InstallHint } from '../components/InstallHint'

function Onboarding() {
  const setProfile = useApp((s) => s.setProfile)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<Level>('debutant')
  return (
    <Card className="relative mb-6 overflow-hidden p-5 sm:p-7">
      <div className="pattern-bg pattern-layer" />
      <div className="relative">
        <p className="arabic text-2xl text-gold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <h2 className="mt-1 font-display text-3xl font-semibold">Bienvenue sur Rûh</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Ce site vous accompagne pas à pas, avec des mots simples, pour découvrir l'islam, apprendre la prière, lire le Coran et progresser à votre rythme. Vos progrès sont enregistrés automatiquement sur cet appareil.
        </p>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setProfile({ name: name.trim(), level, onboarded: true })
          }}
        >
          <label className="block max-w-sm text-sm">
            <span className="mb-1 block font-semibold">Comment souhaitez-vous être appelé(e) ? (facultatif)</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre prénom" className="h-11 w-full rounded-xl border border-line bg-bg px-3 outline-none focus:border-primary" />
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
                  className={cx('rounded-2xl border p-4 text-left transition-colors', level === l.id ? 'border-primary bg-primary-soft' : 'border-line bg-surface hover:border-gold/60')}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-semibold">{l.label}</span>
                    <span className="arabic text-gold">{l.arabic}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{l.text}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <Button type="submit" size="lg" icon="arrowRight">
            Commencer mon parcours
          </Button>
        </form>
      </div>
    </Card>
  )
}

export default function Dashboard() {
  useDocumentTitle('')
  const s = useApp()
  const overall = overallProgress(s)
  const level = computedLevel(s)
  const levelInfo = LEVELS.find((l) => l.id === s.profile.level)!
  const lvl = levelProgress(s.profile.level, s)
  const daily = lessonOfTheDay(s)
  const stats = activityStats(s.activity)
  const lastPos = s.bookmark ?? s.lastRead
  const recent = s.recent.map((r) => ({ ...r, lesson: lessonById(r.id) })).filter((r) => r.lesson).slice(0, 4)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Belle matinée' : hour < 18 ? 'Bel après-midi' : 'Belle soirée'

  const [suivi, setSuivi] = useState<'objectifs' | 'calendrier'>('objectifs')
  const quick = [
    { to: '/priere/guide', icon: 'prayer', label: 'Prière' },
    { to: '/ablutions', icon: 'drop', label: 'Ablutions' },
    { to: '/douas', icon: 'hands', label: 'Douas' },
    { to: '/arabe', icon: 'letters', label: 'Arabe' },
  ]

  return (
    <div className="animate-in">
      <InstallHint />
      {!s.profile.onboarded && <Onboarding />}

      {/* En-tête de bienvenue */}
      <section className="relative mb-3 overflow-hidden rounded-2xl bg-primary p-4 text-white sm:mb-6 sm:rounded-3xl sm:p-8 dark:bg-[#0f2d24]">
        <div className="pattern-bg pattern-layer !opacity-[0.12] invert" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#d6ad5c]/20 blur-3xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="arabic text-lg leading-none text-[#e8cf98] sm:text-xl">السَّلَامُ عَلَيْكُمْ</p>
            <h1 className="mt-1.5 font-display text-[23px] font-semibold leading-tight sm:mt-2 sm:text-4xl">
              Assalâmu ‘alaykum{s.profile.name ? `, ${s.profile.name}` : ''}
            </h1>
            <p className="mt-1 hidden text-white/85 sm:block">{greeting} ! Chaque pas compte, même le plus petit.</p>
            <div className="mt-1 text-[13px] sm:mt-2 sm:text-sm">
              <TodayDates />
            </div>
          </div>
          <ProgressRing value={overall.pct} size={72} stroke={7}>
            <span className="font-display text-xl font-semibold">{overall.pct}%</span>
          </ProgressRing>
        </div>
        <div className="relative mt-3 flex flex-wrap items-center gap-1.5 text-[12.5px] sm:mt-4 sm:gap-2 sm:text-sm">
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-semibold">{levelInfo.label}</span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5">{Object.values(s.lessons).filter((l) => l.status === 'done').length} leçons</span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5">{LEARN_SURAHS.filter((x) => s.surahs[x.id]?.learned).length} sourates</span>
          {stats.streak > 1 && <span className="rounded-full bg-white/10 px-2.5 py-0.5">{stats.streak} jours d’affilée</span>}
          {level !== s.profile.level && (
            <button onClick={() => s.setProfile({ level })} className="rounded-full bg-[#d6ad5c] px-2.5 py-0.5 font-semibold text-[#1b1406]">
              Passer au niveau {LEVELS.find((l) => l.id === level)!.label} →
            </button>
          )}
        </div>
      </section>

      {/* Accès rapide */}
      <nav className="mb-3 grid grid-cols-4 gap-2 sm:mb-5 sm:gap-3" aria-label="Accès rapide">
        {quick.map((q) => (
          <Link key={q.to} to={q.to} className="flex flex-col items-center gap-1 rounded-2xl border border-line bg-surface py-2.5 text-[12px] font-semibold active:bg-surface-2 sm:py-4 sm:text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary sm:h-11 sm:w-11">
              <Icon name={q.icon} size={19} />
            </span>
            {q.label}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-3">
        {/* Leçon du jour */}
        <Card className="relative overflow-hidden p-4 sm:p-5 lg:col-span-2">
          <div className="pattern-bg pattern-layer" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <Badge tone="gold">
                <Icon name="sparkle" size={13} /> Leçon du jour
              </Badge>
              <span className="text-xs text-muted">{daily.minutes} min</span>
            </div>
            <h2 className="mt-2 font-display text-[21px] font-semibold leading-snug sm:mt-3 sm:text-3xl">{daily.title}</h2>
            <p className="mt-0.5 line-clamp-2 text-[14px] text-muted sm:mt-1 sm:text-base">{daily.summary}</p>
            <div className="mt-3 flex items-center gap-3">
              <LinkButton to={`/cours/${daily.id}`} icon="book" size="sm" className="shrink-0">
                {s.lessons[daily.id] ? 'Revoir' : 'Commencer'}
              </LinkButton>
              <Link to="/parcours" className="min-w-0 flex-1">
                <span className="mb-1 flex justify-between text-[12px] text-muted">
                  <span className="truncate">{CATEGORIES[daily.category].label}</span>
                  <span>{lvl.pct}%</span>
                </span>
                <ProgressBar value={lvl.pct} label={`Progression du niveau ${levelInfo.label}`} />
              </Link>
            </div>
          </div>
        </Card>

        {/* Accès rapide Coran */}
        <Link to={lastPos ? `/coran/${lastPos.surah}?v=${lastPos.verse}` : '/coran/1'} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 active:bg-surface-2 sm:p-5 lg:flex-col lg:items-start">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
            <Icon name="book" size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-semibold uppercase tracking-wide text-muted">{lastPos ? (s.bookmark ? 'Marque-page' : 'Reprendre le Coran') : 'Le Coran'}</span>
            <span className="block truncate font-semibold">{lastPos ? `${surahName(lastPos.surah)}, verset ${lastPos.verse}` : 'Commencer par Al-Fâtiha'}</span>
            {lastPos && <span className="block text-xs text-muted">{relativeFr(lastPos.at)}</span>}
          </span>
          <Icon name="play" size={16} className="shrink-0 text-primary lg:hidden" />
        </Link>
      </div>

      {/* Horaires de prière */}
      <div className="mt-3 sm:mt-5">
        <PrayerTimesCard compact />
      </div>

      <div className="mt-1 grid grid-cols-1 gap-x-5 lg:grid-cols-2">
        {/* Sourates */}
        <div className="min-w-0">
          <SectionTitle action={<Link to="/sourates" className="text-sm font-semibold text-primary hover:underline">Tout voir</Link>}>Mes sourates</SectionTitle>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
            {LEARN_SURAHS.map((ls) => {
              const st = s.surahs[ls.id]
              return (
                <Link
                  key={ls.id}
                  to={`/sourates/${ls.id}`}
                  className={cx('shrink-0 rounded-xl border px-3 py-2 text-center transition-colors', st?.learned ? 'border-primary bg-primary-soft' : st?.learning ? 'border-gold/60 bg-gold-soft/40' : 'border-line bg-surface')}
                >
                  <span className="block whitespace-nowrap text-[13px] font-semibold">{ls.name}</span>
                  <span className="text-[11px] text-muted">{st?.learned ? 'Maîtrisée' : st?.learning ? 'En cours' : 'À apprendre'}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Dernières leçons */}
        {recent.length > 0 && (
          <div className="min-w-0">
            <SectionTitle action={<Link to="/progression" className="text-sm font-semibold text-primary hover:underline">Tout voir</Link>}>Dernières leçons</SectionTitle>
            <Card className="divide-y divide-line">
              {recent.slice(0, 3).map((r) => (
                <Link key={r.id} to={`/cours/${r.id}`} className="flex items-center gap-3 px-3.5 py-2.5 active:bg-surface-2/60">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon name={r.lesson!.icon ?? 'book'} size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium">{r.lesson!.title}</span>
                    <span className="text-xs text-muted">{relativeFr(r.at)}</span>
                  </span>
                  {s.lessons[r.id]?.status === 'done' && <Icon name="checkCircle" size={16} className="text-primary" />}
                  {s.lessons[r.id]?.status === 'review' && <Badge tone="gold">À revoir</Badge>}
                </Link>
              ))}
            </Card>
          </div>
        )}
      </div>

      {/* Objectifs et calendrier, regroupés */}
      <SectionTitle action={<Link to="/progression" className="text-sm font-semibold text-primary hover:underline">Statistiques</Link>}>Mon suivi</SectionTitle>
      <Card className="p-3.5 sm:p-5">
        <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-surface-2 p-1" role="tablist">
          {(
            [
              ['objectifs', 'Objectifs de la semaine'],
              ['calendrier', 'Calendrier'],
            ] as const
          ).map(([k, label]) => (
            <button key={k} role="tab" aria-selected={suivi === k} onClick={() => setSuivi(k)} className={cx('h-9 rounded-lg text-[13px] font-semibold transition-colors', suivi === k ? 'bg-surface text-ink shadow-sm' : 'text-muted')}>
              {label}
            </button>
          ))}
        </div>
        {suivi === 'objectifs' ? <GoalsCard /> : <ActivityCalendar />}
      </Card>
    </div>
  )
}
