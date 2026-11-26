import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ASMA } from '../data/asma'
import { useApp, NO_STEPS } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { norm } from '../lib/search'
import { LinkButton, Note, PageHeader, ProgressBar, cx } from '../components/ui'
import { VerseQuote } from '../components/Content'
import { Icon } from '../components/Icon'

export default function Names() {
  useDocumentTitle("Les 99 noms d'Allah")
  const { hash } = useLocation()
  const [q, setQ] = useState('')
  const known = useApp((s) => s.steps['noms'] ?? NO_STEPS)
  const toggleStep = useApp((s) => s.toggleStep)
  const list = useMemo(() => {
    const n = norm(q)
    return ASMA.filter((a) => !n || norm(`${a.tr} ${a.fr} ${a.n}`).includes(n) || a.ar.includes(q))
  }, [q])

  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200)
  }, [hash])

  return (
    <div className="animate-in">
      <PageHeader title="Les 99 noms d'Allah" arabic="الأسماء الحسنى" icon="star" subtitle="« Les plus beaux noms » : connaître Allah par Ses noms aide à L’aimer, à Le craindre et à L’invoquer. Touchez un nom pour le marquer comme appris." back={{ to: '/bases', label: "Bases de l'islam" }}>
        <div className="flex items-center gap-3">
          <ProgressBar value={(known.length / ASMA.length) * 100} className="max-w-sm" label="Noms appris" />
          <span className="text-sm font-semibold">{known.length}/99 appris</span>
        </div>
      </PageHeader>

      <VerseQuote verseKey="7:180" />
      <Note tone="scholar" title="À propos de cette liste">
        Le Prophète ﷺ a dit : « Allah a quatre-vingt-dix-neuf noms ; celui qui les dénombre entrera au Paradis » (al-Bukhârî n°2736, Muslim n°2677). Le hadith authentique ne donne pas la liste ; celle présentée ici est la plus répandue (rapportée par at-Tirmidhî n°3507), dont l’énumération est discutée par les savants. Allah possède d’autres noms en dehors de cette liste. Texte arabe : API Aladhan ; sens en français : formulation pédagogique.
      </Note>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un nom ou un sens (ex. pardon, lumière)" className="h-11 w-full rounded-[14px] bg-surface ring-1 ring-ink/[0.06] pl-10 pr-3 outline-none focus:border-primary" aria-label="Rechercher un nom" />
        </div>
        <LinkButton to="/quiz/quiz-noms" icon="trophy" variant="secondary">
          Quiz
        </LinkButton>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4">
        {list.map((a) => {
          const k = known.includes(String(a.n))
          return (
            <button
              key={a.n}
              id={`n${a.n}`}
              onClick={() => toggleStep('noms', String(a.n))}
              className={cx('tap-pop relative flex scroll-mt-24 flex-col items-center rounded-xl border px-1.5 py-2 text-center transition-colors sm:rounded-2xl sm:p-3', k ? 'border-primary bg-primary-soft' : 'border-line bg-surface hover:ring-gold/45')}
              aria-pressed={k}
            >
              <span className="absolute left-1.5 top-1 text-[10px] font-bold text-muted sm:left-2 sm:top-2 sm:text-[11px]">{a.n}</span>
              {k && <Icon name="checkCircle" size={14} className="absolute right-2 top-2 text-primary" />}
              <span className="arabic mt-1.5 text-[22px] leading-tight text-primary sm:mt-2 sm:text-3xl">{a.ar}</span>
              <span className="mt-0.5 text-[12px] font-semibold leading-tight sm:mt-1 sm:text-sm">{a.tr}</span>
              <span className="line-clamp-2 text-[10.5px] leading-tight text-muted sm:line-clamp-none sm:text-xs sm:leading-snug">{a.fr}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
