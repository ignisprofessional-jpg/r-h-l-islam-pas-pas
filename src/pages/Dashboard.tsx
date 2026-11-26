import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp, type Level } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { lessonOfTheDay, levelProgress, computedLevel, activityStats } from '../lib/progress'
import { LEVELS, lessonById } from '../data/lessons'
import { CATEGORIES } from '../data/types'
import { LEARN_SURAHS } from '../data/learnSurahs'
import chapters from '../data/chapters.json'
import { relativeFr } from '../lib/dates'
import { Button, Card, Diamond, LinkButton, MoreLink, Ornament, SectionTitle, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import { ActivityCalendar, GoalsCard, PrayerStrip, TodayDates, durationFr, usePrayerTimes } from '../components/Widgets'
import { InstallHint } from '../components/InstallHint'

/* ---------------- Premier lancement ---------------- */
function Onboarding() {
  const setProfile = useApp((s) => s.setProfile)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<Level>('debutant')
  return (
    <section className="mb-10 rounded-[24px] bg-surface p-5 ring-1 ring-ink/[0.06] sm:p-8">
      <p className="quran text-right text-[24px] leading-[1.9] text-gold sm:text-[28px]" lang="ar">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <h2 className="mt-2 font-display text-[30px] font-medium leading-tight sm:text-[38px]">Bienvenue sur Rûh</h2>
      <p className="mt-2 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">
        Rûh vous accompagne pas à pas, avec des mots simples, pour découvrir l'islam, apprendre la prière, lire le Coran et progresser à votre rythme. Vos progrès sont enregistrés automatiquement sur cet appareil.
      </p>
      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault()
          setProfile({ name: name.trim(), level, onboarded: true })
        }}
      >
        <label className="block max-w-sm text-sm">
          <span className="mb-1.5 block font-semibold">Comment souhaitez-vous être appelé(e) ? (facultatif)</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre prénom" className="field h-11 w-full" />
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
                className={cx('rounded-[16px] p-4 text-left transition-colors', level === l.id ? 'bg-primary-soft ring-[1.5px] ring-primary' : 'bg-bg ring-1 ring-line hover:ring-gold/50')}
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

/* ---------------- Prochaine prière (dans l'en-tête) ---------------- */
function NextPrayer() {
  const { loc, data, loading, error, next, nextIdx, remaining, isPast } = usePrayerTimes()
  if (!loc)
    return (
      <Link to="/pratique" className="flex min-h-14 items-center justify-between gap-3 rounded-[16px] bg-surface px-4 py-3 ring-1 ring-ink/[0.06] hover:ring-gold/45">
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon name="clock" size={18} />
          </span>
          <span>
            <span className="block text-[15px] font-semibold">Horaires de prière</span>
            <span className="block text-[13px] text-muted">Choisissez votre ville pour les afficher</span>
          </span>
        </span>
        <Icon name="chevronRight" size={17} className="text-muted" />
      </Link>
    )
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <p className="min-w-0 text-[14.5px]">
          {data && next ? (
            <>
              <span className="text-muted">Prochaine prière · </span>
              <strong className="font-semibold">{next.label}</strong>
              <span className="text-muted"> dans {durationFr(remaining)}</span>
            </>
          ) : data ? (
            <span className="text-muted">Les prières du jour sont passées · à demain</span>
          ) : loading ? (
            <span className="text-muted">Calcul des horaires…</span>
          ) : (
            <span className="text-danger">Horaires indisponibles{error ? ` : ${error}` : ''}</span>
          )}
        </p>
        <Link to="/pratique" className="shrink-0 truncate text-[13px] text-muted hover:text-ink hover:underline">
          {loc.city}
        </Link>
      </div>
      {data && <PrayerStrip data={data} nextIdx={nextIdx} isPast={isPast} />}
    </div>
  )
}

/* ---------------- Reprise du Coran (l'aplat vert de la page) ---------------- */
function QuranResume() {
  const bookmark = useApp((s) => s.bookmark)
  const lastRead = useApp((s) => s.lastRead)
  const pos = bookmark ?? lastRead
  const ch = chapters.find((c) => c.id === (pos?.surah ?? 1))!
  const to = pos ? `/coran/${pos.surah}?v=${pos.verse}` : '/coran/1'
  return (
    <Link to={to} className="group relative flex min-h-[220px] flex-col lg:min-h-[320px] overflow-hidden rounded-[24px] bg-deep p-5 text-white sm:p-7">
      <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.07] invert" aria-hidden />
      <div className="relative flex items-start justify-between gap-4">
        <p className="text-[14px] text-white/70">{pos ? (bookmark ? 'Votre marque-page' : 'Reprendre la lecture') : 'Commencer la lecture'}</p>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-bright transition-colors group-hover:bg-white/15">
          <Icon name="play" size={16} />
        </span>
      </div>
      <p className="quran relative mt-auto pt-6 text-right text-[44px] leading-[1.5] text-gold-bright sm:text-[52px]" lang="ar">
        {ch.nameArabic}
      </p>
      <div className="relative mt-2 flex items-end justify-between gap-3 border-t border-white/15 pt-3">
        <div className="min-w-0">
          <p className="font-display text-[22px] font-medium leading-tight">{ch.nameSimple}</p>
          <p className="text-[13.5px] text-white/70">{pos ? `Verset ${pos.verse} sur ${ch.versesCount} · ${relativeFr(pos.at)}` : `${ch.nameFr} · ${ch.versesCount} versets`}</p>
        </div>
        <span className="shrink-0 text-[14px] font-semibold text-gold-bright group-hover:underline">{pos ? 'Continuer' : 'Ouvrir'}</span>
      </div>
    </Link>
  )
}

/* ---------------- Le chemin : trois niveaux ---------------- */
function LevelPath() {
  const s = useApp()
  const current = s.profile.level
  const earned = computedLevel(s)
  const stats = activityStats(s.activity)
  const lessonsDone = Object.values(s.lessons).filter((l) => l.status === 'done').length
  const surahsLearned = LEARN_SURAHS.filter((x) => s.surahs[x.id]?.learned).length
  return (
    <div>
      <ol className="grid grid-cols-3 gap-2 sm:gap-4">
        {LEVELS.map((l) => {
          const p = levelProgress(l.id, s)
          const isCurrent = l.id === current
          return (
            <li key={l.id} className="min-w-0">
              <div className="mb-2 flex items-baseline justify-between gap-1">
                <span className={cx('truncate text-[13.5px] sm:text-[15px]', isCurrent ? 'font-semibold text-ink' : 'font-medium text-muted')}>{l.label}</span>
                <span className={cx('tabular text-[12.5px] sm:text-[13.5px]', isCurrent ? 'text-gold' : 'text-muted')}>{p.pct}%</span>
              </div>
              <div className={cx('h-1.5 overflow-hidden rounded-full', isCurrent ? 'bg-primary/15' : 'bg-ink/[0.07]')}>
                <div className={cx('h-full rounded-full transition-[width] duration-700', isCurrent ? 'bg-primary' : 'bg-ink/30')} style={{ width: `${p.pct}%` }} />
              </div>
              <p className="mt-1.5 hidden text-[12.5px] text-muted sm:block">
                {p.done} module{p.done > 1 ? 's' : ''} sur {p.total}
              </p>
            </li>
          )
        })}
      </ol>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted">
        <span>
          <strong className="tabular font-semibold text-ink">{lessonsDone}</strong> leçon{lessonsDone > 1 ? 's' : ''} terminée{lessonsDone > 1 ? 's' : ''}
        </span>
        <Diamond size={7} className="text-gold" />
        <span>
          <strong className="tabular font-semibold text-ink">{surahsLearned}</strong> sourate{surahsLearned > 1 ? 's' : ''} maîtrisée{surahsLearned > 1 ? 's' : ''}
        </span>
        {stats.streak > 1 && (
          <>
            <Diamond size={7} className="text-gold" />
            <span>
              <strong className="tabular font-semibold text-ink">{stats.streak}</strong> jours d’affilée
            </span>
          </>
        )}
      </p>
      {earned !== current && (
        <button onClick={() => s.setProfile({ level: earned })} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-soft px-4 text-[14px] font-semibold text-gold ring-1 ring-gold/30 hover:ring-gold/60">
          Vous êtes prêt(e) : passer au niveau {LEVELS.find((l) => l.id === earned)!.label}
          <Icon name="arrowRight" size={16} />
        </button>
      )}
    </div>
  )
}

/* ---------------- Page ---------------- */
const QUICK = [
  { to: '/priere/guide', icon: 'prayer', label: 'Guide de la prière', short: 'Prière' },
  { to: '/ablutions', icon: 'drop', label: 'Ablutions', short: 'Ablutions' },
  { to: '/douas', icon: 'hands', label: 'Invocations', short: 'Douas' },
  { to: '/dhikr', icon: 'beads', label: 'Dhikr', short: 'Dhikr' },
  { to: '/arabe', icon: 'letters', label: 'Arabe coranique', short: 'Arabe' },
  { to: '/quiz', icon: 'trophy', label: 'Quiz', short: 'Quiz' },
]

export default function Dashboard() {
  useDocumentTitle('')
  const s = useApp()
  const daily = lessonOfTheDay(s)
  const recent = s.recent.map((r) => ({ ...r, lesson: lessonById(r.id) })).filter((r) => r.lesson).slice(0, 4)
  const hour = new Date().getHours()
  const greeting = hour < 5 ? 'Une nuit paisible à vous.' : hour < 12 ? 'Belle matinée à vous.' : hour < 18 ? 'Bel après-midi à vous.' : 'Belle soirée à vous.'
  const [suivi, setSuivi] = useState<'objectifs' | 'calendrier'>('objectifs')

  // Sourates : d'abord celles en cours, puis les suivantes à apprendre, puis les maîtrisées.
  const rank = (id: number) => (s.surahs[id]?.learning && !s.surahs[id]?.learned ? 0 : s.surahs[id]?.learned ? 2 : 1)
  const surahs = [...LEARN_SURAHS].sort((a, b) => rank(a.id) - rank(b.id) || a.order - b.order).slice(0, 5)
  const learnedCount = LEARN_SURAHS.filter((x) => s.surahs[x.id]?.learned).length

  return (
    <div className="animate-in">
      <InstallHint />
      {!s.profile.onboarded && <Onboarding />}

      {/* En-tête : salutation et prière suivante */}
      <header className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
        <div className="min-w-0">
          <TodayDates />
          <h1 className="mt-2 font-display text-[34px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[48px] xl:text-[54px]">
            <span className="whitespace-nowrap">Assalâmu ‘alaykum{s.profile.name ? ',' : ''}</span>
            {s.profile.name && (
              <>
                <br /> <span className="italic text-primary">{s.profile.name}</span>
              </>
            )}
          </h1>
          <p className="mt-2 text-[15.5px] text-muted sm:text-[17px]">{greeting} Chaque pas compte, même le plus petit.</p>
        </div>
        <NextPrayer />
      </header>

      {/* Accès rapides */}
      <nav aria-label="Accès rapides" className="mt-6 sm:mt-8">
        <ul className="grid grid-cols-4 gap-1 sm:grid-cols-6 sm:gap-2">
          {QUICK.map((q, i) => (
            <li key={q.to} className={cx(i >= 4 && 'hidden sm:block')}>
              <Link to={q.to} className="group flex flex-col items-center gap-2 rounded-[16px] px-1 py-2.5 text-center hover:bg-ink/[0.035]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-primary ring-1 ring-ink/[0.07] transition-colors group-hover:bg-primary group-hover:text-primary-ink sm:h-14 sm:w-14">
                  <Icon name={q.icon} size={21} />
                </span>
                <span className="text-[12.5px] font-medium leading-tight sm:text-[13.5px]">
                  <span className="sm:hidden">{q.short}</span>
                  <span className="hidden sm:inline">{q.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Ornament className="my-6 sm:my-9" />

      {/* Leçon du jour + Coran */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <section className="min-w-0 lg:col-span-7" aria-labelledby="lecon-du-jour">
          <h2 id="lecon-du-jour" className="font-display text-[22px] font-medium leading-tight sm:text-[26px]">
            Leçon du jour
          </h2>
          <Link to={`/cours/${daily.id}`} className="group mt-3 block">
            <p className="text-[13.5px] text-muted">
              {CATEGORIES[daily.category].label} · {daily.minutes} min de lecture
              {s.lessons[daily.id]?.status === 'review' && <span className="text-gold"> · à revoir</span>}
            </p>
            <p className="mt-1.5 font-display text-[27px] font-medium leading-[1.15] tracking-[-0.015em] group-hover:text-primary sm:text-[34px]">{daily.title}</p>
            <p className="mt-2 line-clamp-3 max-w-[58ch] text-[15.5px] leading-relaxed text-muted sm:text-[16.5px]">{daily.summary}</p>
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <LinkButton to={`/cours/${daily.id}`} icon="book">
              {s.lessons[daily.id] ? 'Revoir la leçon' : 'Commencer la leçon'}
            </LinkButton>
            <LinkButton to="/parcours" variant="ghost">
              Mon parcours
            </LinkButton>
          </div>

          <div className="mt-8 border-t border-line pt-5 sm:mt-10">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="font-display text-[20px] font-medium sm:text-[22px]">Votre chemin</h2>
              <MoreLink to="/progression">Ma progression</MoreLink>
            </div>
            <LevelPath />
          </div>
        </section>

        <div className="min-w-0 lg:col-span-5">
          <QuranResume />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/coran" className="flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-surface text-[14px] font-semibold ring-1 ring-ink/[0.06] hover:ring-gold/45">
              <Icon name="list" size={17} className="text-primary" /> Les 114 sourates
            </Link>
            <Link to="/sourates" className="flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-surface text-[14px] font-semibold ring-1 ring-ink/[0.06] hover:ring-gold/45">
              <Icon name="sparkle" size={17} className="text-primary" /> Mémoriser
            </Link>
          </div>
        </div>
      </div>

      {/* Sourates et dernières leçons */}
      <div className="mt-10 grid grid-cols-1 gap-x-10 sm:mt-14 lg:grid-cols-2">
        <section className="min-w-0">
          <SectionTitle action={<MoreLink to="/sourates" />}>
            Mes sourates <span className="tabular ml-1 font-sans text-[14px] font-normal text-muted">{learnedCount}/{LEARN_SURAHS.length}</span>
          </SectionTitle>
          <ul className="divide-y divide-line border-y border-line">
            {surahs.map((ls) => {
              const st = s.surahs[ls.id]
              const ch = chapters.find((c) => c.id === ls.id)!
              return (
                <li key={ls.id}>
                  <Link to={`/sourates/${ls.id}`} className="group flex min-h-[60px] items-center gap-3.5 py-2.5 hover:bg-ink/[0.025]">
                    <span className={cx('tabular w-6 shrink-0 text-center font-display text-[18px]', st?.learned ? 'text-primary' : 'text-gold')}>{st?.learned ? <Icon name="check" size={17} strokeWidth={2.4} className="mx-auto" /> : ls.order}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15.5px] font-semibold group-hover:text-primary">{ls.name}</span>
                      <span className="block truncate text-[13px] text-muted">
                        {st?.learned ? 'Maîtrisée' : st?.learning ? 'En cours' : ls.meaning} · {ch.versesCount} versets
                      </span>
                    </span>
                    <span className="arabic shrink-0 text-[21px] leading-none text-ink/80" lang="ar">
                      {ch.nameArabic}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="mt-9 min-w-0 lg:mt-0">
          <SectionTitle action={recent.length > 0 ? <MoreLink to="/progression" /> : undefined}>Dernières leçons</SectionTitle>
          {recent.length === 0 ? (
            <div className="border-y border-line py-6">
              <p className="text-[15px] text-muted">Les leçons que vous ouvrez apparaîtront ici, pour les reprendre en un geste.</p>
              <Link to="/parcours" className="mt-2 inline-flex items-center gap-1 text-[14.5px] font-semibold text-primary hover:underline">
                Découvrir le parcours <Icon name="chevronRight" size={15} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {recent.map((r) => (
                <li key={r.id}>
                  <Link to={`/cours/${r.id}`} className="group flex min-h-[60px] items-center gap-3.5 py-2.5 hover:bg-ink/[0.025]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <Icon name={r.lesson!.icon ?? 'book'} size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15.5px] font-semibold group-hover:text-primary">{r.lesson!.title}</span>
                      <span className="block text-[13px] text-muted">
                        {relativeFr(r.at)}
                        {s.lessons[r.id]?.status === 'done' && ' · terminée'}
                        {s.lessons[r.id]?.status === 'review' && <span className="text-gold"> · à revoir</span>}
                      </span>
                    </span>
                    <Icon name="chevronRight" size={16} className="shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Suivi : objectifs et calendrier */}
      <SectionTitle action={<MoreLink to="/progression">Statistiques</MoreLink>}>Mon suivi</SectionTitle>
      <div className="lg:hidden">
        <Card className="p-4">
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-ink/[0.055] p-1" role="tablist">
            {(
              [
                ['objectifs', 'Objectifs'],
                ['calendrier', 'Calendrier'],
              ] as const
            ).map(([k, label]) => (
              <button key={k} role="tab" aria-selected={suivi === k} onClick={() => setSuivi(k)} className={cx('h-9 rounded-full text-[14px] transition-colors', suivi === k ? 'bg-surface font-semibold text-ink shadow-[0_1px_2px_rgba(15,40,30,0.14)]' : 'font-medium text-muted')}>
                {label}
              </button>
            ))}
          </div>
          {suivi === 'objectifs' ? <GoalsCard /> : <ActivityCalendar />}
        </Card>
      </div>
      <div className="hidden items-start gap-5 lg:grid lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-1 font-display text-[19px] font-medium">Objectifs de la semaine</h3>
          <GoalsCard />
        </Card>
        <Card className="p-6">
          <h3 className="sr-only">Calendrier d’apprentissage</h3>
          <ActivityCalendar />
        </Card>
      </div>
    </div>
  )
}
