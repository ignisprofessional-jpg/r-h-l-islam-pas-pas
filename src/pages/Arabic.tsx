import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LETTERS, letterForms, VOWEL_LESSONS, READING_RULES, ARABIC_NOTE, type Letter } from '../data/arabic'
import { useApp, NO_STEPS } from '../lib/store'
import { speakArabic, useDocumentTitle } from '../lib/hooks'
import { Badge, Button, Card, Note, PageHeader, ProgressBar, Rich, SectionTitle, Sheet, Tabs, cx, toast } from '../components/ui'
import { Icon } from '../components/Icon'
import { Quiz } from '../components/Quiz'
import { lettersNameQuiz, QUIZZES } from '../lib/quizzes'

type Tab = 'alphabet' | 'voyelles' | 'regles' | 'exercices'

function LetterSheet({ letter, onClose }: { letter: Letter | null; onClose: () => void }) {
  const learned = useApp((s) => s.steps['lettres'] ?? NO_STEPS)
  const toggleStep = useApp((s) => s.toggleStep)
  if (!letter) return null
  const f = letterForms(letter)
  const isLearned = learned.includes(letter.ar)
  const say = (t: string) => !speakArabic(t) && toast('Synthèse vocale arabe indisponible sur cet appareil')
  return (
    <Sheet open={!!letter} onClose={onClose} title={`${letter.name} — ${letter.nameAr}`}>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-6">
        <p className="arabic flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-primary-soft text-7xl text-primary">{letter.ar}</p>
        <div className="flex-1">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="gold">Translittération : {letter.translit}</Badge>
            <Badge>{letter.sun ? 'Lettre solaire' : 'Lettre lunaire'}</Badge>
            {!letter.connects && <Badge tone="danger">Ne se lie pas à la lettre suivante</Badge>}
          </div>
          <p className="mt-3 text-[16px]">{letter.sound}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" icon="volume" onClick={() => say(letter.nameAr)}>
              Nom de la lettre
            </Button>
            {['َ', 'ِ', 'ُ'].map((v, i) => (
              <Button key={v} size="sm" variant="secondary" onClick={() => say(letter.ar + v)}>
                <span className="arabic text-xl">{letter.ar + v}</span> {['a', 'i', 'ou'][i]}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <p className="mb-2 mt-5 font-semibold">Ses formes selon la position</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {(
          [
            ['Isolée', f.isolee],
            ['Début', f.debut],
            ['Milieu', f.milieu],
            ['Fin', f.fin],
          ] as const
        ).map(([l, ch]) => (
          <div key={l} className="rounded-[14px] bg-surface ring-1 ring-ink/[0.06]-2/50 p-2">
            <p className="arabic text-4xl leading-tight">{ch}</p>
            <p className="text-xs text-muted">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-gold-soft/50 p-3">
        <p className="text-[13.5px] font-semibold text-gold">Exemple</p>
        <p className="arabic text-3xl">{letter.example.word}</p>
        <p className="text-sm">
          <em>{letter.example.tr}</em> — {letter.example.fr}
        </p>
      </div>
      <p className="mt-4 text-xs text-muted">{ARABIC_NOTE}</p>
      <Button className="mt-4 w-full" variant={isLearned ? 'primary' : 'secondary'} icon="checkCircle" onClick={() => toggleStep('lettres', letter.ar)}>
        {isLearned ? 'Lettre apprise' : 'Je connais cette lettre'}
      </Button>
    </Sheet>
  )
}

export default function Arabic() {
  useDocumentTitle('Arabe coranique')
  const [tab, setTab] = useState<Tab>('alphabet')
  const [letter, setLetter] = useState<Letter | null>(null)
  const [testKey, setTestKey] = useState(0)
  const testQs = useMemo(() => lettersNameQuiz(8), [testKey])
  const learned = useApp((s) => s.steps['lettres'] ?? NO_STEPS)
  const vowelsRead = useApp((s) => s.steps['voyelles'] ?? NO_STEPS)
  const toggleStep = useApp((s) => s.toggleStep)

  return (
    <div className="animate-in">
      <PageHeader title="Apprendre l'arabe coranique" arabic="العربية" icon="letters" subtitle="L’alphabet, la prononciation, les voyelles et les règles de lecture, pour pouvoir lire le Coran pas à pas. Touchez une lettre pour l’étudier.">
        <div className="flex items-center gap-3">
          <ProgressBar value={(learned.length / LETTERS.length) * 100} className="max-w-sm" label="Lettres apprises" />
          <span className="text-sm font-semibold">
            {learned.length}/{LETTERS.length} lettres
          </span>
        </div>
      </PageHeader>

      <Tabs
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'alphabet', label: 'Alphabet', icon: 'letters' },
          { id: 'voyelles', label: 'Voyelles et signes', icon: 'sparkle' },
          { id: 'regles', label: 'Règles de lecture', icon: 'book' },
          { id: 'exercices', label: 'Exercices et tests', icon: 'trophy' },
        ]}
      />

      {tab === 'alphabet' && (
        <>
          <Note tone="info" title="Pour bien commencer">
            L’arabe s’écrit et se lit <strong>de droite à gauche</strong>. L’alphabet compte 28 lettres, qui changent légèrement de forme selon leur position dans le mot. Six lettres (ا د ذ ر ز و) ne se lient jamais à la lettre qui suit.
          </Note>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7" dir="rtl">
            {LETTERS.map((l) => (
              <button
                key={l.ar}
                onClick={() => setLetter(l)}
                className={cx('tap-pop group relative flex aspect-square flex-col items-center justify-center rounded-2xl border transition-all', learned.includes(l.ar) ? 'border-primary bg-primary-soft' : 'border-line bg-surface hover:ring-gold/45')}
                aria-label={`Lettre ${l.name}`}
              >
                <span className="arabic text-4xl leading-none text-ink sm:text-5xl">{l.ar}</span>
                <span className="mt-1 text-[11px] font-semibold text-muted" dir="ltr">
                  {l.name}
                </span>
                {learned.includes(l.ar) && <Icon name="checkCircle" size={14} className="absolute right-1.5 top-1.5 text-primary" />}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">{ARABIC_NOTE}</p>
        </>
      )}

      {tab === 'voyelles' && (
        <div className="space-y-4">
          {VOWEL_LESSONS.map((v) => (
            <Card key={v.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[22px] font-medium sm:text-2xl">{v.title}</h3>
                {vowelsRead.includes(v.id) && <Badge tone="green">Compris</Badge>}
              </div>
              <p className="mt-1 text-muted">{v.intro}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {v.rows.map((r) => (
                  <button key={r.ar} onClick={() => !speakArabic(r.ar) && toast('Synthèse vocale arabe indisponible')} className="flex items-center gap-4 rounded-[14px] bg-surface ring-1 ring-ink/[0.06]-2/40 p-3 text-left hover:ring-gold/45">
                    <span className="arabic w-24 shrink-0 text-center text-4xl leading-tight text-primary">{r.ar}</span>
                    <span>
                      <span className="block font-semibold">{r.tr}</span>
                      {r.note && <span className="text-sm text-muted">{r.note}</span>}
                    </span>
                    <Icon name="volume" size={16} className="ml-auto text-muted" />
                  </button>
                ))}
              </div>
              {v.tips?.map((t) => (
                <p key={t} className="mt-3 text-sm text-gold">
                  {t}
                </p>
              ))}
              <Button size="sm" className="mt-4" variant={vowelsRead.includes(v.id) ? 'primary' : 'secondary'} icon="checkCircle" onClick={() => toggleStep('voyelles', v.id)}>
                {vowelsRead.includes(v.id) ? 'Compris' : 'J’ai compris'}
              </Button>
            </Card>
          ))}
        </div>
      )}

      {tab === 'regles' && (
        <div className="space-y-3">
          {READING_RULES.map((r) => (
            <Card key={r.title} className="p-5">
              <h3 className="font-display text-xl font-medium">{r.title}</h3>
              <p className="mt-1 text-[15.5px]">
                <Rich text={r.text} />
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.examples.map((e) => (
                  <div key={e.ar} className="rounded-[14px] bg-surface ring-1 ring-ink/[0.06]-2/40 px-4 py-2 text-center">
                    <p className="arabic text-3xl">{e.ar}</p>
                    <p className="text-sm font-semibold text-accent">{e.tr}</p>
                    {e.fr && <p className="text-xs text-muted">{e.fr}</p>}
                  </div>
                ))}
              </div>
            </Card>
          ))}
          <Note tone="tip" title="Et ensuite ?">
            Entraînez-vous avec les sourates courtes : le texte arabe, la phonétique et la récitation lente d’al-Husary vous permettent de vérifier votre lecture. <Link to="/sourates" className="font-semibold text-primary underline">Ouvrir les sourates</Link>
          </Note>
        </div>
      )}

      {tab === 'exercices' && (
        <div>
          <SectionTitle>Petit test rapide</SectionTitle>
          <Quiz key={testKey} id="test-arabe" questions={testQs} title="Reconnaître 8 lettres" shuffleQuestions={false} onDone={() => undefined} />
          <div className="mt-2 flex justify-end">
            <Button size="sm" variant="ghost" icon="shuffle" onClick={() => setTestKey((k) => k + 1)}>
              Nouvelles lettres
            </Button>
          </div>
          <SectionTitle>Tous les exercices d’arabe</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUIZZES.filter((q) => q.group === 'Arabe').map((q) => (
              <Link key={q.id} to={`/quiz/${q.id}`} className="flex items-center gap-3 rounded-[16px] bg-surface ring-1 ring-ink/[0.06] p-4 hover:ring-gold/45">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon name={q.icon} />
                </span>
                <span>
                  <span className="block font-semibold">{q.title}</span>
                  <span className="text-sm text-muted">{q.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <LetterSheet letter={letter} onClose={() => setLetter(null)} />
    </div>
  )
}
