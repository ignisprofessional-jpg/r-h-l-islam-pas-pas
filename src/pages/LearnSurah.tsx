import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { learnSurahById, LEARN_SURAHS } from '../data/learnSurahs'
import chapters from '../data/chapters.json'
import { getSurahAudio, getSurahVerses, getVerses, translationName, RECITERS, type Verse } from '../lib/api'
import { useApp } from '../lib/store'
import { useAudio } from '../lib/audio'
import { useAsync, useDocumentTitle } from '../lib/hooks'
import { Button, Card, ErrorState, IconButton, Loader, Note, PageHeader, Rich, Tabs, toast, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import NotFound from './NotFound'

const hasLetters = (w: string) => /[ء-يٱ-ۓ]/.test(w)
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)

/* ---------- Exercice 1 : texte masqué ---------- */
function HiddenText({ verses }: { verses: Verse[] }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [hideTranslit, setHideTranslit] = useState(true)
  const all = verses.flatMap((v) => v.arabic.split(' ').map((_w, i) => `${v.number}-${i}`))
  return (
    <div>
      <p className="mb-3 text-sm text-muted">Récitez de mémoire, puis touchez chaque mot pour vérifier. Les mots dévoilés restent visibles.</p>
      <div className="mb-3 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" icon="eye" onClick={() => setRevealed(new Set(all))}>
          Tout afficher
        </Button>
        <Button size="sm" variant="secondary" icon="eyeOff" onClick={() => setRevealed(new Set())}>
          Tout masquer
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setHideTranslit((h) => !h)}>
          {hideTranslit ? 'Afficher la phonétique' : 'Masquer la phonétique'}
        </Button>
      </div>
      <div className="space-y-3">
        {verses.map((v) => (
          <Card key={v.key} className="p-4">
            <p className="quran flex flex-wrap justify-start gap-x-2 gap-y-1 text-[28px]" dir="rtl" lang="ar">
              {v.arabic.split(' ').map((w, i) => {
                const k = `${v.number}-${i}`
                const show = revealed.has(k) || !hasLetters(w)
                return (
                  <button
                    key={k}
                    onClick={() => setRevealed((s) => new Set(s).add(k))}
                    className={cx('rounded-lg px-1 transition-all', show ? '' : 'bg-surface-2 text-transparent blur-[6px] hover:blur-[4px]')}
                    aria-label={show ? w : 'Mot masqué : toucher pour révéler'}
                  >
                    {w}
                  </button>
                )
              })}
              <span className="self-center rounded-full border border-gold/60 px-2 font-sans text-xs text-gold">{v.number}</span>
            </p>
            {!hideTranslit && <p className="mt-2 text-sm italic text-accent">{v.translit}</p>}
          </Card>
        ))}
      </div>
    </div>
  )
}

/* ---------- Exercice 2 : remettre les versets dans l'ordre ---------- */
function OrderVerses({ verses, onSuccess }: { verses: Verse[]; onSuccess: () => void }) {
  const [seed, setSeed] = useState(0)
  const pool = useMemo(() => shuffle(verses), [verses, seed]) // eslint-disable-line react-hooks/exhaustive-deps
  const [picked, setPicked] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)
  const done = picked.length === verses.length
  const pick = (n: number) => {
    if (picked.includes(n)) return
    if (n === picked.length + 1) {
      const next = [...picked, n]
      setPicked(next)
      setWrong(null)
      if (next.length === verses.length) onSuccess()
    } else {
      setWrong(n)
      setTimeout(() => setWrong(null), 700)
    }
  }
  return (
    <div>
      <p className="mb-3 text-sm text-muted">Touchez les versets dans le bon ordre, du premier au dernier.</p>
      {done && (
        <div className="animate-in mb-3 flex items-center justify-between gap-3 rounded-xl bg-primary-soft p-3">
          <span className="font-semibold">Bravo, l’ordre est parfait !</span>
          <Button
            size="sm"
            variant="secondary"
            icon="refresh"
            onClick={() => {
              setPicked([])
              setSeed((s) => s + 1)
            }}
          >
            Rejouer
          </Button>
        </div>
      )}
      <div className="space-y-2">
        {pool.map((v) => {
          const pos = picked.indexOf(v.number)
          return (
            <button
              key={v.key}
              onClick={() => pick(v.number)}
              className={cx(
                'tap-pop flex w-full items-center gap-3 rounded-2xl border p-3 text-right transition-colors',
                pos >= 0 ? 'border-primary bg-primary-soft' : wrong === v.number ? 'border-danger bg-danger-soft' : 'border-line bg-surface hover:border-gold/60',
              )}
            >
              <span className={cx('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold', pos >= 0 ? 'bg-primary text-primary-ink' : 'bg-surface-2 text-muted')}>{pos >= 0 ? pos + 1 : '?'}</span>
              <span className="quran flex-1 text-2xl" dir="rtl" lang="ar">
                {v.arabic}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Exercice 3 : mot manquant ---------- */
function MissingWord({ verses, onFinish }: { verses: Verse[]; onFinish: (score: number, total: number) => void }) {
  const rounds = Math.min(6, Math.max(3, verses.length))
  const [seed, setSeed] = useState(0)
  const questions = useMemo(() => {
    const words = [...new Set(verses.flatMap((v) => v.arabic.split(' ').filter(hasLetters)))]
    return Array.from({ length: rounds }, (_, i) => {
      const v = verses[(i + seed) % verses.length]
      const tokens = v.arabic.split(' ')
      const candidates = tokens.map((t, idx) => ({ t, idx })).filter((x) => hasLetters(x.t))
      const target = candidates[Math.floor(Math.random() * candidates.length)]
      const distractors = shuffle(words.filter((w) => w !== target.t)).slice(0, 3)
      return { v, tokens, hide: target.idx, answer: target.t, options: shuffle([target.t, ...distractors]) }
    })
  }, [verses, seed, rounds])
  const [i, setI] = useState(0)
  const [choice, setChoice] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const q = questions[i]

  if (finished)
    return (
      <Card className="p-6 text-center">
        <Icon name="trophy" size={32} className="mx-auto text-gold" />
        <p className="mt-2 font-display text-3xl font-semibold">
          {score} / {rounds}
        </p>
        <p className="text-muted">{score === rounds ? 'Parfait, vous connaissez très bien cette sourate !' : 'Continuez à écouter et répéter, vous progressez.'}</p>
        <Button
          className="mt-4"
          variant="secondary"
          icon="refresh"
          onClick={() => {
            setSeed((s) => s + 1)
            setI(0)
            setScore(0)
            setChoice(null)
            setFinished(false)
          }}
        >
          Recommencer
        </Button>
      </Card>
    )

  return (
    <Card className="p-5">
      <div className="mb-3 flex justify-between text-sm text-muted">
        <span>Trouvez le mot manquant · verset {q.v.number}</span>
        <span>
          {i + 1}/{rounds}
        </span>
      </div>
      <p className="quran mb-4 text-right text-[28px]" dir="rtl" lang="ar">
        {q.tokens.map((t, k) => (k === q.hide ? <span key={k} className={cx('mx-1 inline-block min-w-16 rounded-lg border-b-2 px-2 text-center', choice ? (choice === q.answer ? 'border-primary text-primary' : 'border-danger text-danger') : 'border-gold text-transparent')}>{choice ? q.answer : '…'}</span> : <span key={k}>{t} </span>))}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {q.options.map((o) => (
          <button
            key={o}
            disabled={!!choice}
            onClick={() => {
              setChoice(o)
              if (o === q.answer) setScore((s) => s + 1)
            }}
            className={cx(
              'quran tap-pop rounded-xl border px-3 py-2 text-2xl',
              !choice && 'border-line bg-surface hover:border-primary/50',
              choice && o === q.answer && 'border-primary bg-primary-soft',
              choice && o === choice && o !== q.answer && 'border-danger bg-danger-soft',
              choice && o !== choice && o !== q.answer && 'border-line opacity-50',
            )}
          >
            {o}
          </button>
        ))}
      </div>
      {choice && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">{q.v.translit}</p>
          <Button
            icon="arrowRight"
            onClick={() => {
              setChoice(null)
              if (i + 1 === rounds) {
                setFinished(true)
                onFinish(score, rounds)
              } else setI(i + 1)
            }}
          >
            {i + 1 === rounds ? 'Résultat' : 'Suivant'}
          </Button>
        </div>
      )}
    </Card>
  )
}

type Tab = 'versets' | 'ecouter' | 'masque' | 'ordre' | 'mot'

export default function LearnSurah() {
  const { id: idp = '' } = useParams()
  const id = Number(idp)
  const ls = learnSurahById(id)
  const ch = chapters.find((c) => c.id === id)
  useDocumentTitle(ls ? `Apprendre ${ls.name}` : 'Sourate')
  const st = useApp((s) => s.settings)
  const status = useApp((s) => s.surahs[id])
  const { setSurah, saveQuiz } = useApp.getState()
  const audio = useAudio()
  const [tab, setTab] = useState<Tab>('versets')
  const [repeat, setRepeat] = useState(5)
  const { data: verses, error, loading, retry } = useAsync(() => (ls ? getSurahVerses(id, st.translation) : Promise.resolve([])), [id, st.translation])
  const showBasmala = id !== 1
  const basmala = useAsync(() => (showBasmala ? getVerses('1:1', st.translation) : Promise.resolve([])), [showBasmala, st.translation])

  if (!ls || !ch) return <NotFound />
  const idx = LEARN_SURAHS.findIndex((s) => s.id === id)
  const nextS = LEARN_SURAHS[idx + 1]

  const play = async (from: number, only = false, rep = 1) => {
    if (!verses) return
    try {
      const map = await getSurahAudio(id, st.reciter)
      const list = (only ? verses.filter((v) => v.number === from) : verses).map((v) => ({ key: v.key, url: map[v.key] })).filter((t) => t.url)
      audio.setRepeat(rep)
      audio.play(list, only ? 0 : from - 1, `${ls.name} — ${RECITERS.find((r) => r.id === st.reciter)?.name}`)
      if (!status?.learning && !status?.learned) setSurah(id, { learning: true })
    } catch {
      toast("L'audio n'a pas pu être chargé")
    }
  }

  return (
    <div className="animate-in">
      <PageHeader title={`${ls.order}. ${ls.name}`} arabic={ch.nameArabic} icon="sparkle" subtitle={`${ls.meaning} — ${ls.theme}`} back={{ to: '/sourates', label: 'Sourates à apprendre' }}>
        <div className="flex flex-wrap gap-2">
          {(['apprendre', 'cours', 'maitrisee'] as const).map((k) => {
            const active = k === 'maitrisee' ? status?.learned : k === 'cours' ? status?.learning && !status?.learned : !status?.learning && !status?.learned
            const label = { apprendre: 'À apprendre', cours: 'En cours', maitrisee: 'Maîtrisée' }[k]
            return (
              <button
                key={k}
                onClick={() => {
                  setSurah(id, { learned: k === 'maitrisee', learning: k === 'cours' })
                  if (k === 'maitrisee') toast(`${ls.name} maîtrisée, mâ shâ’ Allâh !`)
                }}
                className={cx('rounded-full px-3 py-1.5 text-sm font-semibold transition-colors', active ? 'bg-[#d6ad5c] text-[#1b1406]' : 'bg-white/15 hover:bg-white/25')}
                aria-pressed={!!active}
              >
                {label}
              </button>
            )
          })}
        </div>
      </PageHeader>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">Pourquoi l’apprendre</p>
          <p className="mt-1 text-[15px]">{ls.why}</p>
        </Card>
        {ls.virtue && (
          <Card className="p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Son mérite</p>
            <p className="mt-1 text-[15px] italic">{ls.virtue.text}</p>
            <p className="mt-1 text-xs text-muted">{ls.virtue.ref}</p>
          </Card>
        )}
      </div>

      <Tabs
        className="mb-4"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'versets', label: 'Verset par verset', icon: 'list' },
          { id: 'ecouter', label: 'Écouter et répéter', icon: 'volume' },
          { id: 'masque', label: 'Texte masqué', icon: 'eyeOff' },
          { id: 'ordre', label: 'Remettre en ordre', icon: 'shuffle' },
          { id: 'mot', label: 'Mot manquant', icon: 'target' },
        ]}
      />

      {loading && <Loader label="Chargement du texte depuis Quran.com…" />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {verses && tab === 'versets' && (
        <div className="space-y-3">
          {showBasmala && basmala.data?.[0] && (
            <Card className="p-4 text-center">
              <p className="quran text-3xl text-primary">{basmala.data[0].arabic}</p>
              <p className="mt-1 text-sm italic text-accent">{basmala.data[0].translit}</p>
              <p className="text-xs text-muted">On commence la récitation par la basmala (elle n’est pas comptée comme verset de cette sourate).</p>
            </Card>
          )}
          {verses.map((v) => (
            <Card key={v.key} className={cx('p-4 sm:p-5', audio.queue[audio.index]?.key === v.key && 'border-gold bg-gold-soft/30')}>
              <div className="mb-2 flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-xs font-bold text-gold">{v.number}</span>
                <span className="flex">
                  <IconButton icon="play" label={`Écouter le verset ${v.number}`} onClick={() => play(v.number, true, 1)} size={16} />
                  <IconButton icon="repeat" label={`Répéter le verset ${v.number} ${repeat} fois`} onClick={() => play(v.number, true, repeat)} size={16} />
                </span>
              </div>
              <p className="quran text-right text-[30px] text-ink" lang="ar">
                {v.arabic}
              </p>
              <p className="mt-2 text-[16px] font-medium italic text-accent">{v.translit}</p>
              <p className="mt-1 text-[15.5px] text-ink/90">{v.translation}</p>
              {ls.verses[v.number - 1] && (
                <div className="mt-3 rounded-xl bg-primary-soft/50 p-3 text-[15px]">
                  <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-primary">Le sens expliqué simplement</p>
                  <Rich text={ls.verses[v.number - 1]} />
                </div>
              )}
            </Card>
          ))}
          <p className="text-xs text-muted">
            Texte arabe, translittération et traduction ({translationName(st.translation)}) : API Quran.com. Les explications « le sens expliqué simplement » sont des résumés pédagogiques rédigés pour ce site, fidèles aux tafsirs d’Ibn Kathîr et d’as-Sa‘dî ; le tafsir sourcé est disponible dans le{' '}
            <Link to={`/coran/${id}`} className="font-semibold text-primary hover:underline">
              lecteur du Coran
            </Link>
            .
          </p>
        </div>
      )}

      {verses && tab === 'ecouter' && (
        <Card className="p-5">
          <p className="font-semibold">Écouter et répéter</p>
          <p className="text-sm text-muted">Choisissez combien de fois chaque verset est répété, puis répétez après le récitateur. Conseil : choisissez la récitation lente d’al-Husary (Mu‘allim) dans les réglages du lecteur.</p>
          <div className="my-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">Répéter chaque verset :</span>
            {[1, 3, 5, 10].map((n) => (
              <button key={n} onClick={() => setRepeat(n)} className={cx('h-9 rounded-lg px-3 text-sm font-bold', repeat === n ? 'bg-primary text-primary-ink' : 'bg-surface-2')}>
                ×{n}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon="play" onClick={() => play(1, false, repeat)}>
              Toute la sourate
            </Button>
            <Button
              variant="secondary"
              icon="volume"
              onClick={() => {
                useApp.getState().setSettings({ reciter: 12 })
                toast('Récitation lente d’al-Husary sélectionnée')
              }}
            >
              Récitation lente (al-Husary)
            </Button>
          </div>
          <div className="mt-5 grid gap-2">
            {verses.map((v) => (
              <button key={v.key} onClick={() => play(v.number, true, repeat)} className={cx('flex items-center gap-3 rounded-xl border p-3 text-left', audio.queue[audio.index]?.key === v.key ? 'border-gold bg-gold-soft/40' : 'border-line hover:border-gold/50')}>
                <Icon name="play" size={14} className="text-primary" />
                <span className="flex-1 text-sm italic text-accent">{v.translit}</span>
                <span className="text-xs text-muted">v. {v.number}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {verses && tab === 'masque' && <HiddenText verses={verses} />}
      {verses && tab === 'ordre' && (
        <OrderVerses
          verses={verses}
          onSuccess={() => {
            saveQuiz(`sourate-ordre-${id}`, verses.length, verses.length)
            toast('Ordre parfait !')
          }}
        />
      )}
      {verses && tab === 'mot' && (
        <MissingWord
          verses={verses}
          onFinish={(score, total) => {
            saveQuiz(`sourate-mot-${id}`, score, total)
            if (score === total && !status?.learned) toast('Score parfait ! Vous pouvez marquer la sourate comme maîtrisée.')
          }}
        />
      )}

      <Note tone="gentle" title="Prenez votre temps">
        Il n’y a pas de course. Lorsque vous pouvez réciter la sourate sans regarder, marquez-la comme « Maîtrisée » en haut de la page.
      </Note>

      {nextS && (
        <Link to={`/sourates/${nextS.id}`} className="mt-2 flex items-center justify-between rounded-2xl border border-line bg-surface p-4 hover:border-gold/60">
          <span>
            <span className="block text-xs text-muted">Sourate suivante du parcours</span>
            <span className="font-semibold">
              {nextS.order}. {nextS.name}
            </span>
          </span>
          <Icon name="arrowRight" className="text-gold" />
        </Link>
      )}
    </div>
  )
}
