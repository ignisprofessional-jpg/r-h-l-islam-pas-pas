import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp, type Level } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { lessonOfTheDay, overallProgress, levelProgress, computedLevel, activityStats } from '../lib/progress'
import { LEVELS, lessonById } from '../data/lessons'
import { CATEGORIES } from '../data/types'
import { LEARN_SURAHS } from '../data/learnSurahs'
import { relativeFr } from '../lib/dates'
import { Badge, Button, Card, LinkButton, ProgressBar, ProgressRing, SectionTitle, Tile, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import { surahName } from '../components/Content'
import { ActivityCalendar, GoalsCard, PrayerTimesCard, TodayDates } from '../components/Widgets'

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

  return (
    <div className="animate-in">
      {!s.profile.onboarded && <Onboarding />}

      {/* En-tête de bienvenue */}
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-primary p-5 text-white sm:p-8 dark:bg-[#0f2d24]">
        <div className="pattern-bg pattern-layer !opacity-[0.12] invert" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#d6ad5c]/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="arabic text-xl leading-none text-[#e8cf98]">السَّلَامُ عَلَيْكُمْ</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Assalâmu ‘alaykum{s.profile.name ? `, ${s.profile.name}` : ''}
            </h1>
            <p className="mt-1 text-white/85">{greeting} ! Chaque pas compte, même le plus petit.</p>
            <div className="mt-2">
              <TodayDates />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Niveau : {levelInfo.label}</span>
              {level !== s.profile.level && (
                <button onClick={() => s.setProfile({ level })} className="rounded-full bg-[#d6ad5c] px-3 py-1 text-sm font-semibold text-[#1b1406]">
                  Passer au niveau {LEVELS.find((l) => l.id === level)!.label} →
                </button>
              )}
              {stats.streak > 1 && <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{stats.streak} jours d’apprentissage d’affilée</span>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing value={overall.pct} size={112} stroke={9}>
              <span className="font-display text-3xl font-semibold">{overall.pct}%</span>
              <span className="text-[11px] text-white/70">progression</span>
            </ProgressRing>
            <div className="text-sm text-white/80">
              <p>
                <strong className="text-white">{overall.done}</strong> / {overall.total} modules
              </p>
              <p>
                <strong className="text-white">{Object.values(s.lessons).filter((l) => l.status === 'done').length}</strong> leçons terminées
              </p>
              <p>
                <strong className="text-white">{LEARN_SURAHS.filter((x) => s.surahs[x.id]?.learned).length}</strong> sourates apprises
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Leçon du jour */}
        <Card className="relative overflow-hidden p-5 lg:col-span-2">
          <div className="pattern-bg pattern-layer" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <Badge tone="gold">
                <Icon name="sparkle" size={13} /> Leçon du jour
              </Badge>
              <span className="text-xs text-muted">
                {CATEGORIES[daily.category].label} · {daily.minutes} min
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{daily.title}</h2>
            {daily.arabic && <p className="arabic text-xl text-gold">{daily.arabic}</p>}
            <p className="mt-1 text-muted">{daily.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <LinkButton to={`/cours/${daily.id}`} icon="book">
                {s.lessons[daily.id] ? 'Revoir la leçon' : 'Commencer la leçon'}
              </LinkButton>
              <LinkButton to="/parcours" variant="secondary" icon="graduation">
                Mon parcours
              </LinkButton>
            </div>
            <div className="mt-5">
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold">Parcours {levelInfo.label.toLowerCase()}</span>
                <span className="text-muted">
                  {lvl.done}/{lvl.total} modules · {lvl.pct}%
                </span>
              </div>
              <ProgressBar value={lvl.pct} label={`Progression du niveau ${levelInfo.label}`} />
            </div>
          </div>
        </Card>

        {/* Accès rapide Coran */}
        <Card className="flex flex-col p-5">
          <p className="flex items-center gap-2 font-display text-xl font-semibold">
            <Icon name="book" size={18} className="text-gold" /> Le Coran
          </p>
          {lastPos ? (
            <>
              <p className="mt-2 text-sm text-muted">{s.bookmark ? 'Votre marque-page' : 'Dernière lecture'}</p>
              <p className="font-semibold">
                {surahName(lastPos.surah)}, verset {lastPos.verse}
              </p>
              <p className="text-xs text-muted">{relativeFr(lastPos.at)}</p>
              <LinkButton to={`/coran/${lastPos.surah}?v=${lastPos.verse}`} className="mt-4" icon="play">
                Reprendre la lecture
              </LinkButton>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted">Les 114 sourates avec le texte arabe, la phonétique, la traduction française et la récitation audio.</p>
              <LinkButton to="/coran/1" className="mt-4" icon="play">
                Commencer par Al-Fâtiha
              </LinkButton>
            </>
          )}
          <Link to="/coran" className="mt-3 text-center text-sm font-semibold text-primary hover:underline">
            Voir toutes les sourates
          </Link>
        </Card>
      </div>

      {/* Horaires et accès rapide prière */}
      <div className="mt-5">
        <PrayerTimesCard compact />
      </div>

      <SectionTitle>Accès rapide</SectionTitle>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile to="/priere/guide" icon="prayer" title="Je découvre la prière" text="Pas à pas, très lentement" />
        <Tile to="/ablutions" icon="drop" title="Les ablutions" text="Guide illustré" />
        <Tile to="/douas" icon="hands" title="Invocations" text="Matin, soir, repas…" />
        <Tile to="/arabe" icon="letters" title="Alphabet arabe" text="Lettres et sons" />
      </div>

      <div className="mt-2 grid gap-5 lg:grid-cols-2">
        {/* Dernières leçons */}
        <div>
          <SectionTitle action={<Link to="/progression" className="text-sm font-semibold text-primary hover:underline">Tout voir</Link>}>Mes dernières leçons</SectionTitle>
          <Card className="divide-y divide-line">
            {recent.length === 0 && <p className="p-5 text-sm text-muted">Vous n’avez pas encore ouvert de leçon. La leçon du jour est un bon point de départ.</p>}
            {recent.map((r) => (
              <Link key={r.id} to={`/cours/${r.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2/60">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name={r.lesson!.icon ?? 'book'} size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{r.lesson!.title}</span>
                  <span className="text-xs text-muted">{relativeFr(r.at)}</span>
                </span>
                {s.lessons[r.id]?.status === 'done' && <Badge tone="green">Terminée</Badge>}
                {s.lessons[r.id]?.status === 'review' && <Badge tone="gold">À revoir</Badge>}
              </Link>
            ))}
          </Card>
        </div>

        {/* Sourates apprises */}
        <div>
          <SectionTitle action={<Link to="/sourates" className="text-sm font-semibold text-primary hover:underline">Parcours</Link>}>Mes sourates</SectionTitle>
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {LEARN_SURAHS.map((ls) => {
                const st = s.surahs[ls.id]
                return (
                  <Link
                    key={ls.id}
                    to={`/sourates/${ls.id}`}
                    className={cx('rounded-xl border p-2 text-center transition-colors', st?.learned ? 'border-primary bg-primary-soft' : st?.learning ? 'border-gold/60 bg-gold-soft/40' : 'border-line hover:border-gold/50')}
                  >
                    <span className="block text-xs font-semibold">{ls.name}</span>
                    <span className="text-[11px] text-muted">{st?.learned ? 'Maîtrisée' : st?.learning ? 'En cours' : 'À apprendre'}</span>
                  </Link>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Objectifs */}
        <div>
          <SectionTitle>Mes objectifs de la semaine</SectionTitle>
          <Card className="p-4 sm:p-5">
            <GoalsCard />
          </Card>
        </div>

        {/* Calendrier */}
        <div>
          <SectionTitle action={<Link to="/progression" className="text-sm font-semibold text-primary hover:underline">Statistiques</Link>}>Mon calendrier de suivi</SectionTitle>
          <Card className="p-4 sm:p-5">
            <ActivityCalendar />
          </Card>
        </div>
      </div>
    </div>
  )
}
