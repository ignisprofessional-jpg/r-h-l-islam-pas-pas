import { Link } from 'react-router-dom'
import type { Block } from '../data/types'
import { getVerses, getVerseAudio, translationName } from '../lib/api'
import { useAsync } from '../lib/hooks'
import { useApp } from '../lib/store'
import { useAudio } from '../lib/audio'
import chapters from '../data/chapters.json'
import { ArabicBlock, Note, Rich, cx, IconButton } from './ui'
import { Icon } from './Icon'

export const surahName = (id: number) => chapters.find((c) => c.id === id)?.nameSimple ?? `Sourate ${id}`

/* ---------------- Verset(s) chargé(s) en direct ---------------- */
export function VerseQuote({ verseKey, intro, compact = false }: { verseKey: string; intro?: string; compact?: boolean }) {
  const translation = useApp((s) => s.settings.translation)
  const reciter = useApp((s) => s.settings.reciter)
  const showTr = useApp((s) => s.settings.showTranslit)
  const { data, error, loading, retry } = useAsync(() => getVerses(verseKey, translation), [verseKey, translation])
  const play = useAudio((s) => s.play)
  const [surah, range] = verseKey.split(':')
  const first = Number(range.split('-')[0])
  const label = `${surahName(Number(surah))}, ${range.includes('-') ? 'versets' : 'verset'} ${range}`

  const onPlay = async () => {
    if (!data) return
    try {
      const urls = await Promise.all(data.map((v) => getVerseAudio(v.key, reciter)))
      play(
        data.map((v, i) => ({ key: v.key, url: urls[i] ?? '' })).filter((t) => t.url),
        0,
        label,
      )
    } catch {
      /* l'erreur audio est gérée par le lecteur */
    }
  }

  return (
    <figure className={cx('my-4 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-gold-soft/40 to-transparent sm:my-5', compact && 'my-3')}>
      {intro && <figcaption className="px-4 pt-3 text-[15px] text-muted sm:px-5">{intro}</figcaption>}
      <div className="p-3.5 sm:p-5">
        {loading && <p className="animate-pulse text-sm text-muted">Chargement du verset depuis Quran.com…</p>}
        {error && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-danger">
            <Icon name="alert" size={16} /> Verset indisponible pour le moment ({label}).
            <button className="underline" onClick={retry}>
              Réessayer
            </button>
          </div>
        )}
        {data && (
          <div className="space-y-4">
            {data.map((v) => (
              <div key={v.key}>
                <p className="quran text-right text-[23px] leading-[2.1] text-ink sm:text-[28px]" lang="ar">
                  {v.arabic} <span className="mx-1 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-gold/50 px-1 align-middle font-sans text-xs text-gold">{v.number}</span>
                </p>
                {showTr && v.translit && <p className="mt-1 text-[14.5px] italic text-accent">{v.translit}</p>}
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink/90">{v.translation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gold/20 bg-surface/60 px-4 py-2 text-xs text-muted sm:px-5">
        <span className="flex items-center gap-1.5">
          <Icon name="book" size={14} className="text-gold" />
          <Link to={`/coran/${surah}?v=${first}`} className="font-semibold text-ink hover:text-primary hover:underline">
            {label}
          </Link>
          <span className="hidden sm:inline">· Traduction : {translationName(translation)} (Quran.com)</span>
        </span>
        <IconButton icon="play" label="Écouter la récitation" onClick={onPlay} className="h-8 w-8" size={14} />
      </div>
    </figure>
  )
}

/* ---------------- Rendu des blocs de contenu ---------------- */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-lesson text-[15.5px] leading-[1.65] text-ink/90 sm:text-[16.5px] sm:leading-[1.75]">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return (
              <p key={i}>
                <Rich text={b.text} />
              </p>
            )
          case 'h':
            return (
              <h3 key={i} className="mb-1 mt-6 font-display text-xl font-medium text-ink">
                {b.text}
              </h3>
            )
          case 'list': {
            const L = b.ordered ? 'ol' : 'ul'
            return (
              <L key={i} className={cx('my-3 space-y-2 pl-1', b.ordered ? 'list-none [counter-reset:item]' : '')}>
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    {b.ordered ? (
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">{j + 1}</span>
                    ) : (
                      <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    )}
                    <span>
                      <Rich text={it} />
                    </span>
                  </li>
                ))}
              </L>
            )
          }
          case 'note':
            return (
              <Note key={i} tone={b.tone} title={b.title}>
                <Rich text={b.text} />
              </Note>
            )
          case 'verse':
            return <VerseQuote key={i} verseKey={b.key} intro={b.intro} />
          case 'hadith':
            return (
              <blockquote key={i} className="my-4 rounded-2xl border-l-4 border-primary bg-primary-soft/40 p-3.5 sm:my-5 sm:p-5">
                <p className="mb-1 text-[13.5px] font-semibold text-primary">Hadith — sens rapporté</p>
                <p className="text-[15px] italic text-ink sm:text-[16px]">{b.text}</p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-muted">
                  <Icon name="book" size={14} className="mt-0.5" /> {b.ref}
                </p>
              </blockquote>
            )
          case 'arabic':
            return <ArabicBlock key={i} arabic={b.ar} translit={b.tr} translation={b.fr} source={b.ref} className="my-4" size="text-2xl sm:text-[28px]" />
          case 'terms':
            return (
              <dl key={i} className="my-4 grid gap-2 sm:grid-cols-2">
                {b.items.map((t) => (
                  <div key={t.term} className="rounded-[14px] bg-surface ring-1 ring-ink/[0.06] p-3">
                    <dt className="font-semibold text-primary">{t.term}</dt>
                    <dd className="mt-0.5 text-[15px] text-muted">{t.def}</dd>
                  </div>
                ))}
              </dl>
            )
          case 'table':
            return (
              <div key={i} className="my-4 overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[480px] text-left text-[15px]">
                  <thead className="bg-surface-2">
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} className="px-3 py-2 font-semibold text-ink">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-line align-top">
                        {r.map((c, k) => (
                          <td key={k} className={cx('px-3 py-2', k === 0 ? 'font-medium text-ink' : 'text-ink/85')}>
                            <Rich text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'link':
            return (
              <Link key={i} to={b.to} className="group my-2 flex items-center justify-between gap-3 rounded-[14px] bg-surface ring-1 ring-ink/[0.06] px-4 py-3 transition-colors hover:ring-gold/45">
                <span>
                  <span className="font-semibold text-primary">{b.label}</span>
                  {b.text && <span className="block text-sm text-muted">{b.text}</span>}
                </span>
                <Icon name="arrowRight" size={18} className="text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            )
        }
      })}
    </div>
  )
}
