import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import chapters from '../data/chapters.json'
import { useApp } from '../lib/store'
import { useAsync, useDocumentTitle } from '../lib/hooks'
import { searchQuran } from '../lib/api'
import { norm } from '../lib/search'
import { Badge, Card, ErrorState, Loader, Note, PageHeader, Tabs, LinkButton, cx } from '../components/ui'
import { Icon } from '../components/Icon'
import { surahName } from '../components/Content'

type Filter = 'toutes' | 'courtes' | 'lues' | 'apprises' | 'favoris'

function TextSearch({ q }: { q: string }) {
  const lang = /[؀-ۿ]/.test(q) ? 'ar' : 'fr'
  const { data, error, loading, retry } = useAsync(() => searchQuran(q, lang), [q, lang])
  if (loading) return <Loader label="Recherche dans le Coran…" />
  if (error) return <ErrorState message={error} onRetry={retry} />
  if (!data) return null
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return (
    <div>
      <p className="mb-3 text-sm text-muted">
        {data.count} verset{data.count > 1 ? 's' : ''} contenant « {q} » {lang === 'fr' ? '(dans la traduction de M. Hamidullah)' : '(dans le texte arabe)'}
        {data.count > data.matches.length && ` — ${data.matches.length} premiers affichés`}. Source : API AlQuran.cloud.
      </p>
      {data.count === 0 && <Note tone="tip">Aucun verset trouvé. Essayez un autre mot, au singulier, ou sans article (par exemple « patience », « miséricorde »).</Note>}
      <ul className="space-y-2">
        {data.matches.map((m) => (
          <li key={`${m.surah}:${m.verse}`}>
            <Link to={`/coran/${m.surah}?v=${m.verse}`} className="block rounded-[14px] bg-surface ring-1 ring-ink/[0.06] p-3 hover:ring-gold/45">
              <p className="mb-1 text-xs font-semibold text-primary">
                {surahName(m.surah)} {m.surah}:{m.verse}
              </p>
              <p className={cx('text-[15px]', lang === 'ar' && 'arabic text-right text-xl')}>
                {m.text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i} className="rounded bg-gold-soft px-0.5 text-ink">{part}</mark> : <span key={i}>{part}</span>))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function QuranIndex() {
  useDocumentTitle('Le Coran')
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [input, setInput] = useState(q)
  const [filter, setFilter] = useState<Filter>('toutes')
  const surahs = useApp((s) => s.surahs)
  const favVerses = useApp((s) => s.favorites.verses)
  const bookmark = useApp((s) => s.bookmark)
  const lastRead = useApp((s) => s.lastRead)

  const list = useMemo(() => {
    const n = norm(input)
    return chapters.filter((c) => {
      if (filter === 'lues' && !surahs[c.id]?.read) return false
      if (filter === 'apprises' && !surahs[c.id]?.learned) return false
      if (filter === 'courtes' && c.id < 78) return false
      if (filter === 'favoris' && !favVerses.some((k) => k.startsWith(`${c.id}:`))) return false
      if (!n || q) return true
      return norm(`${c.id} ${c.nameSimple} ${c.nameFr}`).includes(n) || c.nameArabic.includes(input.trim())
    })
  }, [input, filter, surahs, favVerses, q])

  const readCount = Object.values(surahs).filter((s) => s.read).length

  return (
    <div className="animate-in">
      <PageHeader title="Le Coran" arabic="القرآن الكريم" icon="book" subtitle="Les 114 sourates avec le texte arabe original (écriture uthmanie), la translittération, la traduction française, la récitation audio et le tafsir.">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const v = input.trim()
            if (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 114) return
            setParams(v.length >= 2 ? { q: v } : {})
          }}
        >
          <div className="relative flex-1">
            <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                if (q) setParams({})
              }}
              placeholder="Nom ou numéro de sourate, ou un mot (ex. patience)"
              className="field h-12 w-full pl-10 pr-3 text-[15px]"
              aria-label="Rechercher une sourate ou un mot"
            />
          </div>
          <button type="submit" className="h-12 shrink-0 rounded-full bg-primary px-5 text-[15px] font-semibold text-primary-ink hover:bg-[color-mix(in_srgb,var(--primary)_86%,black)]">
            Chercher un mot
          </button>
        </form>
      </PageHeader>

      {(bookmark || lastRead) && !q && (
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {bookmark && (
            <Card className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gold">
                  <Icon name="bookmark" size={14} /> Marque-page
                </p>
                <p className="font-semibold">
                  {surahName(bookmark.surah)}, verset {bookmark.verse}
                </p>
              </div>
              <LinkButton to={`/coran/${bookmark.surah}?v=${bookmark.verse}`} size="sm" icon="play">
                Reprendre
              </LinkButton>
            </Card>
          )}
          {lastRead && (
            <Card className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-muted">
                  <Icon name="clock" size={14} /> Dernière lecture
                </p>
                <p className="font-semibold">
                  {surahName(lastRead.surah)}, verset {lastRead.verse}
                </p>
              </div>
              <LinkButton to={`/coran/${lastRead.surah}?v=${lastRead.verse}`} size="sm" variant="secondary">
                Continuer
              </LinkButton>
            </Card>
          )}
        </div>
      )}

      {q ? (
        <TextSearch q={q} />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Tabs
              value={filter}
              onChange={setFilter}
              tabs={[
                { id: 'toutes', label: 'Toutes' },
                { id: 'courtes', label: 'Courtes (juz’ 30)' },
                { id: 'lues', label: `Lues (${readCount})` },
                { id: 'apprises', label: 'Apprises' },
                { id: 'favoris', label: 'Avec favoris' },
              ]}
            />
            <p className="text-sm text-muted">{list.length} sourate{list.length > 1 ? 's' : ''}</p>
          </div>
          {list.length === 0 && <p className="py-8 text-center text-muted">Aucune sourate ne correspond.</p>}
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 xl:grid-cols-3">
            {list.map((c) => (
              <li key={c.id}>
                <Link to={`/coran/${c.id}`} className="group flex items-center gap-3 rounded-[14px] bg-surface ring-1 ring-ink/[0.06] px-3 py-2 transition-all sm:rounded-2xl sm:p-3 hover:ring-gold/45 hover:shadow-[0_10px_24px_-18px_rgba(15,76,58,0.5)]">
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-11 sm:w-11">
                    <svg viewBox="0 0 44 44" className="absolute inset-0 text-gold/60 transition-transform group-hover:rotate-45">
                      <path d="M22 2l5.6 8.4L37.6 8l-2.4 10L44 22l-8.8 4 2.4 10-10-2.4L22 42l-5.6-8.4L6.4 36l2.4-10L0 22l8.8-4-2.4-10 10 2.4z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="relative text-[13px] font-bold">{c.id}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{c.nameSimple}</span>
                    <span className="block truncate text-xs text-muted">
                      {c.nameFr} · {c.versesCount} versets · {c.revelationPlace === 'makkah' ? 'mecquoise' : 'médinoise'}
                    </span>
                    <span className="flex gap-1 empty:hidden [&:not(:empty)]:mt-1">
                      {surahs[c.id]?.read && <Badge tone="green">Lue</Badge>}
                      {surahs[c.id]?.learned && <Badge tone="gold">Apprise</Badge>}
                    </span>
                  </span>
                  <span className="arabic shrink-0 text-lg leading-none text-primary sm:text-xl">{c.nameArabic}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted">
            Sources : texte coranique (écriture uthmanie, lecture de Hafs), traductions de Rachid Maach et Muhammad Hamidullah, translittération et récitations : API Quran.com (Quran Foundation). Recherche par mot : API AlQuran.cloud. Une traduction est une explication du sens et ne remplace pas le texte arabe.
          </p>
        </>
      )}
    </div>
  )
}
