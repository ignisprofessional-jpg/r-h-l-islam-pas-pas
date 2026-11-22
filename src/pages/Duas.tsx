import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { DUAS, DUA_CATS, type Dua, type DuaCat } from '../data/duas'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { norm } from '../lib/search'
import { ArabicBlock, Badge, Card, IconButton, LinkButton, Note, PageHeader, cx, toast } from '../components/ui'
import { VerseQuote } from '../components/Content'
import { Icon } from '../components/Icon'

export function DuaCard({ d }: { d: Dua }) {
  const memorized = useApp((s) => !!s.duas[d.id])
  const fav = useApp((s) => s.favorites.duas.includes(d.id))
  const toggleDua = useApp((s) => s.toggleDua)
  const toggleFavorite = useApp((s) => s.toggleFavorite)
  return (
    <Card as="article" id={d.id} className="scroll-mt-24 p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold leading-snug">{d.title}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {d.when && <Badge>{d.when}</Badge>}
            {d.count && <Badge tone="gold">{d.count}</Badge>}
            {d.quran && <Badge tone="green">Coran · audio disponible</Badge>}
            {memorized && (
              <Badge tone="green">
                <Icon name="check" size={12} strokeWidth={3} /> Mémorisée
              </Badge>
            )}
          </div>
        </div>
        <IconButton
          icon="heart"
          label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          active={fav}
          onClick={() => {
            toggleFavorite('duas', d.id)
            toast(fav ? 'Retirée des favoris' : 'Ajoutée aux favoris')
          }}
        />
      </div>
      {d.quran ? <VerseQuote verseKey={d.quran} compact /> : <ArabicBlock arabic={d.ar!} translit={d.tr} translation={d.fr} size="text-2xl sm:text-[28px]" />}
      <p className="mt-3 flex items-start gap-1.5 text-xs text-muted">
        <Icon name="book" size={14} className="mt-0.5 shrink-0" /> <span>{d.ref}</span>
      </p>
      {!d.quran && <p className="mt-1 text-[11px] text-muted">Audio : pas d’enregistrement vérifié disponible pour cette invocation ; aidez-vous de la phonétique.</p>}
      <button
        onClick={() => {
          toggleDua(d.id)
          if (!memorized) toast('Invocation mémorisée, bravo !')
        }}
        className={cx('mt-3 inline-flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-semibold', memorized ? 'bg-primary text-primary-ink' : 'border border-line hover:border-primary')}
      >
        <Icon name="checkCircle" size={16} /> {memorized ? 'Je la connais' : 'Je la connais par cœur'}
      </button>
    </Card>
  )
}

export default function Duas() {
  useDocumentTitle('Invocations')
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  const cat = (params.get('cat') as DuaCat | null) ?? null
  const [q, setQ] = useState('')
  const memorized = useApp((s) => s.duas)
  const count = Object.values(memorized).filter(Boolean).length

  const list = useMemo(() => {
    const n = norm(q)
    return DUAS.filter((d) => (!cat || d.cat === cat) && (!n || norm(`${d.title} ${d.tr ?? ''} ${d.fr ?? ''} ${d.ref}`).includes(n)))
  }, [cat, q])

  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200)
  }, [hash])

  return (
    <div className="animate-in">
      <PageHeader title="Les invocations (douas)" arabic="الأدعية" icon="hands" subtitle="Une bibliothèque d’invocations authentiques classées par situation, avec le texte arabe, la phonétique, le sens et la référence précise.">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{count} mémorisée{count > 1 ? 's' : ''}</span>
          <LinkButton to="/dhikr" variant="gold" size="sm" icon="beads">
            Compteur de dhikr
          </LinkButton>
        </div>
      </PageHeader>

      <div className="relative mb-3">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une invocation…" className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-3 outline-none focus:border-primary" aria-label="Rechercher une invocation" />
      </div>
      <div className="no-scrollbar -mx-1 mb-5 flex gap-1.5 overflow-x-auto px-1 pb-1">
        <button onClick={() => setParams({})} className={cx('h-9 shrink-0 rounded-full px-3 text-sm font-semibold', !cat ? 'bg-primary text-primary-ink' : 'bg-surface text-muted ring-1 ring-line')}>
          Toutes
        </button>
        {DUA_CATS.map((c) => (
          <button key={c.id} onClick={() => setParams({ cat: c.id })} className={cx('flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-semibold', cat === c.id ? 'bg-primary text-primary-ink' : 'bg-surface text-muted ring-1 ring-line')}>
            <Icon name={c.icon} size={14} /> {c.label}
          </button>
        ))}
      </div>

      {list.length === 0 && <p className="py-8 text-center text-muted">Aucune invocation ne correspond à votre recherche.</p>}

      {(cat ? DUA_CATS.filter((c) => c.id === cat) : DUA_CATS).map((c) => {
        const items = list.filter((d) => d.cat === c.id)
        if (!items.length) return null
        return (
          <section key={c.id} className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold">
              <Icon name={c.icon} className="text-gold" /> {c.label}
            </h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {items.map((d) => (
                <DuaCard key={d.id} d={d} />
              ))}
            </div>
          </section>
        )
      })}

      <Note tone="info" title="À propos des sources">
        Les invocations sont tirées des recueils de hadiths reconnus (al-Bukhârî, Muslim, Abû Dâwûd, at-Tirmidhî…) ou du Coran, telles que rassemblées notamment dans « La citadelle du musulman » (Hisn al-Muslim). Les invocations coraniques sont chargées depuis Quran.com avec leur récitation. On peut aussi invoquer Allah librement, dans sa propre langue, en dehors de la prière.
      </Note>
    </div>
  )
}
