import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import chapters from '../data/chapters.json'
import { learnSurahById } from '../data/learnSurahs'
import { getSurahVerses, getSurahAudio, getTafsir, getChapterInfo, getVerses, TRANSLATIONS, RECITERS, TAFSIRS, translationName, type Verse } from '../lib/api'
import { useApp } from '../lib/store'
import { useAudio } from '../lib/audio'
import { useAsync, useDocumentTitle } from '../lib/hooks'
import { Button, ErrorState, IconButton, Loader, Note, Rich, Sheet, Tabs, Toggle, toast, cx, Badge } from '../components/ui'
import { Icon } from '../components/Icon'
import NotFound from './NotFound'

const stripHtml = (html: string) =>
  html
    .replace(/<\/(p|h\d|div|li)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)

function TafsirSheet({ verse, onClose }: { verse: Verse | null; onClose: () => void }) {
  const [tab, setTab] = useState<'simple' | '16' | '169'>('simple')
  const learn = verse ? learnSurahById(verse.surah) : undefined
  const pedagogic = learn?.verses[verse!.number - 1]
  const activeTab = tab === 'simple' && !pedagogic ? '16' : tab
  const tafsirId = activeTab === 'simple' ? null : Number(activeTab)
  const { data, error, loading, retry } = useAsync(() => (verse && tafsirId ? getTafsir(tafsirId, verse.key) : Promise.resolve('')), [verse?.key, tafsirId])
  if (!verse) return null
  const info = TAFSIRS.find((t) => t.id === tafsirId)
  return (
    <Sheet open={!!verse} onClose={onClose} title={`Explication du verset ${verse.key}`}>
      <p className="quran mb-2 text-right text-2xl">{verse.arabic}</p>
      <p className="mb-4 text-[15px] text-muted">{verse.translation}</p>
      <Tabs
        className="mb-4"
        value={activeTab}
        onChange={setTab}
        tabs={[...(pedagogic ? [{ id: 'simple' as const, label: 'Explication simple (FR)' }] : []), { id: '16' as const, label: 'Al-Muyassar (AR)' }, { id: '169' as const, label: 'Ibn Kathir (EN)' }]}
      />
      {activeTab === 'simple' && pedagogic && (
        <div>
          <p className="text-[16px] leading-relaxed">
            <Rich text={pedagogic} />
          </p>
          <p className="mt-3 text-xs text-muted">Résumé pédagogique rédigé pour ce site, fidèle aux explications classiques (Ibn Kathîr, as-Sa‘dî). Ce n’est ni une traduction ni un tafsir complet : consultez les onglets suivants pour les tafsirs sourcés.</p>
        </div>
      )}
      {tafsirId && (
        <div>
          {loading && <p className="animate-pulse text-sm text-muted">Chargement du tafsir depuis Quran.com…</p>}
          {error && <ErrorState message={error} onRetry={retry} />}
          {data && (
            <div className={cx('space-y-3 text-[15.5px] leading-relaxed', tafsirId === 16 && 'arabic text-right text-xl leading-loose')} lang={tafsirId === 16 ? 'ar' : 'en'}>
              {stripHtml(data).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {info && <p className="mt-4 border-t border-line pt-3 text-xs text-muted">Source : {info.name} — {info.note}. Données : API Quran.com.</p>}
        </div>
      )}
      <Note tone="info" title="Pourquoi pas de tafsir complet en français ?">
        Aucune API vérifiée ne propose aujourd’hui de tafsir complet en français. Plutôt que de générer un texte, nous affichons des tafsirs reconnus dans leur langue d’origine. Pour le français, vous pouvez consulter des éditions imprimées (par exemple le tafsir d’Ibn Kathîr traduit en français).
      </Note>
    </Sheet>
  )
}

function SettingsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const st = useApp((s) => s.settings)
  const set = useApp((s) => s.setSettings)
  return (
    <Sheet open={open} onClose={onClose} title="Réglages de lecture">
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-semibold">Traduction française</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TRANSLATIONS.map((t) => (
              <button key={t.id} onClick={() => set({ translation: t.id })} className={cx('rounded-xl border p-3 text-left text-sm', st.translation === t.id ? 'border-primary bg-primary-soft' : 'border-line')}>
                <span className="font-semibold">{t.name}</span>
                <span className="block text-xs text-muted">{t.note}</span>
              </button>
            ))}
          </div>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-semibold">Récitateur</span>
          <select value={st.reciter} onChange={(e) => set({ reciter: Number(e.target.value) })} className="h-11 w-full rounded-xl border border-line bg-bg px-3">
            {RECITERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.style}
              </option>
            ))}
          </select>
        </label>
        <div>
          <p className="mb-1 text-sm font-semibold">Taille du texte arabe : {st.arabicSize}px</p>
          <input type="range" min={22} max={48} value={st.arabicSize} onChange={(e) => set({ arabicSize: Number(e.target.value) })} className="w-full accent-[var(--primary)]" aria-label="Taille du texte arabe" />
          <p className="quran text-right" style={{ fontSize: st.arabicSize }}>
            اَلْعَرَبِيَّة
          </p>
        </div>
        <div className="divide-y divide-line rounded-xl border border-line px-3">
          <Toggle label="Afficher la translittération" checked={st.showTranslit} onChange={(v) => set({ showTranslit: v })} />
          <Toggle label="Afficher la traduction" checked={st.showTranslation} onChange={(v) => set({ showTranslation: v })} />
        </div>
      </div>
    </Sheet>
  )
}

export default function SurahReader() {
  const { id: idParam = '' } = useParams()
  const id = Number(idParam)
  const ch = chapters.find((c) => c.id === id)
  const [params] = useSearchParams()
  const targetVerse = Number(params.get('v') ?? 0)
  useDocumentTitle(ch ? `${ch.nameSimple} — sourate ${id}` : 'Sourate introuvable')

  const st = useApp((s) => s.settings)
  const status = useApp((s) => s.surahs[id])
  const favs = useApp((s) => s.favorites.verses)
  const bookmark = useApp((s) => s.bookmark)
  const { setSurah, toggleFavorite, setBookmark, setLastRead } = useApp.getState()
  const audio = useAudio()
  const currentKey = audio.queue[audio.index]?.key
  const [tafsirVerse, setTafsirVerse] = useState<Verse | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [reading, setReading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: verses, error, loading, retry } = useAsync(() => (ch ? getSurahVerses(id, st.translation) : Promise.resolve([])), [id, st.translation])
  const showBasmala = ch?.bismillahPre && id !== 1 && id !== 9
  const basmala = useAsync(() => (showBasmala ? getVerses('1:1', st.translation) : Promise.resolve([])), [showBasmala, st.translation])
  const info = useAsync(() => (infoOpen && ch ? getChapterInfo(id) : Promise.resolve(null)), [infoOpen, id])

  // Aller au verset demandé
  useEffect(() => {
    if (!verses || !targetVerse) return
    const t = setTimeout(() => document.getElementById(`v${targetVerse}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
    return () => clearTimeout(t)
  }, [verses, targetVerse])

  // Suivre le verset en cours de lecture audio
  useEffect(() => {
    if (!currentKey || !currentKey.startsWith(`${id}:`)) return
    document.getElementById(`v${currentKey.split(':')[1]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [currentKey, id])

  // Sauvegarde automatique de la position de lecture
  const visible = useRef<number>(0)
  useEffect(() => {
    if (!verses?.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) visible.current = Number((e.target as HTMLElement).dataset.verse)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-verse]').forEach((el) => obs.observe(el))
    const save = () => visible.current && setLastRead({ surah: id, verse: visible.current })
    const t = setInterval(save, 4000)
    return () => {
      obs.disconnect()
      clearInterval(t)
      save()
    }
  }, [verses, id, setLastRead])

  // Mode lecture plein écran
  const toggleReading = useCallback(async () => {
    const next = !reading
    setReading(next)
    try {
      if (next && containerRef.current?.requestFullscreen) await containerRef.current.requestFullscreen()
      else if (!next && document.fullscreenElement) await document.exitFullscreen()
    } catch {
      /* le plein écran peut être refusé : le mode lecture reste actif */
    }
  }, [reading])
  useEffect(() => {
    const on = () => !document.fullscreenElement && setReading(false)
    document.addEventListener('fullscreenchange', on)
    return () => document.removeEventListener('fullscreenchange', on)
  }, [])

  const playFrom = async (verseNumber: number, opts?: { only?: boolean; repeat?: number }) => {
    if (!verses) return
    try {
      const map = await getSurahAudio(id, st.reciter)
      const list = (opts?.only ? verses.filter((v) => v.number === verseNumber) : verses).map((v) => ({ key: v.key, url: map[v.key] })).filter((t) => t.url)
      if (opts?.repeat !== undefined) audio.setRepeat(opts.repeat)
      const start = opts?.only ? 0 : Math.max(0, list.findIndex((t) => t.key === `${id}:${verseNumber}`))
      audio.play(list, start, `${ch!.nameSimple} — ${RECITERS.find((r) => r.id === st.reciter)?.name}`)
    } catch {
      toast("L'audio n'a pas pu être chargé")
    }
  }

  if (!ch) return <NotFound />
  const prev = chapters.find((c) => c.id === id - 1)
  const next = chapters.find((c) => c.id === id + 1)

  return (
    <div ref={containerRef} className={cx(reading && 'fixed inset-0 z-[60] overflow-y-auto bg-bg px-4 py-6 sm:px-10')}>
      {/* En-tête */}
      {!reading && (
        <div className="mb-2 flex items-center justify-between gap-2 text-sm">
          <Link to="/coran" className="inline-flex items-center gap-1 text-muted hover:text-ink">
            <Icon name="arrowLeft" size={16} /> Toutes les sourates
          </Link>
          <span className="text-muted">
            Juz’ {verses?.[0]?.juz ?? '…'}
          </span>
        </div>
      )}
      <header className={cx('relative mb-5 overflow-hidden rounded-3xl border border-gold/30 bg-surface p-5 text-center sm:p-8', reading && 'mx-auto max-w-3xl')}>
        <div className="pattern-bg pattern-layer" />
        <div className="relative">
          <p className="quran text-4xl text-primary sm:text-5xl">سُورَةُ {ch.nameArabic}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">
            {ch.id}. {ch.nameSimple}
          </h1>
          <p className="text-muted">
            {ch.nameFr} · {ch.versesCount} versets · {ch.revelationPlace === 'makkah' ? 'révélée à La Mecque' : 'révélée à Médine'}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button icon="play" onClick={() => playFrom(1)}>
              Écouter la sourate
            </Button>
            <Button
              variant={status?.read ? 'primary' : 'secondary'}
              icon="checkCircle"
              onClick={() => {
                setSurah(id, { read: !status?.read })
                toast(status?.read ? 'Marque « lue » retirée' : 'Sourate marquée comme lue')
              }}
            >
              {status?.read ? 'Lue' : 'Marquer comme lue'}
            </Button>
            <Button
              variant={status?.learned ? 'gold' : 'secondary'}
              icon="star"
              onClick={() => {
                setSurah(id, { learned: !status?.learned, learning: false })
                toast(status?.learned ? 'Marque « apprise » retirée' : 'Sourate apprise, bravo !')
              }}
            >
              {status?.learned ? 'Apprise' : 'Je la connais par cœur'}
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <IconButton icon="settings" label="Réglages de lecture" onClick={() => setSettingsOpen(true)} />
            <IconButton icon="info" label="Présentation de la sourate" onClick={() => setInfoOpen(true)} />
            <IconButton icon="expand" label={reading ? 'Quitter le mode lecture' : 'Mode lecture plein écran'} onClick={toggleReading} active={reading} />
            {learnSurahById(id) && (
              <Link to={`/sourates/${id}`} className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-gold hover:bg-gold-soft">
                <Icon name="sparkle" size={16} /> Apprendre cette sourate
              </Link>
            )}
          </div>
        </div>
      </header>

      {reading && (
        <div className="fixed right-4 top-4 z-[61] flex gap-2">
          {audio.queue.length > 0 && (
            <button onClick={audio.toggle} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-ink shadow-lg" aria-label={audio.playing ? 'Pause' : 'Lecture'}>
              <Icon name={audio.playing ? 'pause' : 'play'} size={16} />
            </button>
          )}
          <button onClick={toggleReading} className="flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-bg shadow-lg">
            <Icon name="x" size={16} /> Quitter
          </button>
        </div>
      )}

      {loading && <Loader label="Chargement des versets depuis Quran.com…" />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {verses && (
        <div className={cx('mx-auto space-y-3', reading ? 'max-w-3xl' : '')}>
          {showBasmala && basmala.data?.[0] && (
            <p className="quran py-2 text-center text-primary" style={{ fontSize: st.arabicSize + 2 }}>
              {basmala.data[0].arabic}
            </p>
          )}
          {verses.map((v) => {
            const active = currentKey === v.key
            const fav = favs.includes(v.key)
            const isBm = bookmark?.surah === id && bookmark.verse === v.number
            return (
              <article
                key={v.key}
                id={`v${v.number}`}
                data-verse={v.number}
                className={cx(
                  'scroll-mt-28 rounded-2xl border p-4 transition-colors sm:p-5',
                  active ? 'border-gold bg-gold-soft/40' : targetVerse === v.number ? 'border-primary/40 bg-primary-soft/30' : 'border-line bg-surface',
                )}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-gold/60 px-2 text-xs font-bold text-gold">{v.number}</span>
                    {v.sajdah && <Badge tone="gold">Prosternation</Badge>}
                    {isBm && (
                      <Badge tone="green">
                        <Icon name="bookmark" size={12} /> Marque-page
                      </Badge>
                    )}
                  </span>
                  <span className="flex items-center">
                    <IconButton icon={active && audio.playing ? 'pause' : 'play'} label={active && audio.playing ? 'Pause' : `Écouter à partir du verset ${v.number}`} onClick={() => (active ? audio.toggle() : playFrom(v.number))} size={16} />
                    <IconButton icon="repeat" label="Répéter ce verset en boucle" onClick={() => playFrom(v.number, { only: true, repeat: 0 })} size={16} />
                    <IconButton icon="book" label="Explication (tafsir)" onClick={() => setTafsirVerse(v)} size={16} />
                    <IconButton
                      icon="heart"
                      label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      active={fav}
                      onClick={() => {
                        toggleFavorite('verses', v.key)
                        toast(fav ? 'Retiré des favoris' : 'Verset ajouté aux favoris')
                      }}
                      size={16}
                    />
                    <IconButton
                      icon="bookmark"
                      label={isBm ? 'Retirer le marque-page' : 'Placer le marque-page ici'}
                      active={isBm}
                      onClick={() => {
                        setBookmark(isBm ? null : { surah: id, verse: v.number })
                        toast(isBm ? 'Marque-page retiré' : 'Marque-page enregistré')
                      }}
                      size={16}
                    />
                  </span>
                </div>
                <p className="quran text-right text-ink" style={{ fontSize: reading ? st.arabicSize + 6 : st.arabicSize }} lang="ar">
                  {v.arabic}
                </p>
                {st.showTranslit && v.translit && <p className="mt-2 text-[15px] italic text-accent">{v.translit}</p>}
                {st.showTranslation && <p className="mt-2 text-[16px] leading-relaxed text-ink/90">{v.translation}</p>}
              </article>
            )
          })}

          <p className="pt-2 text-center text-xs text-muted">
            Texte arabe : écriture uthmanie (Hafs ‘an ‘Âsim) · Traduction : {translationName(st.translation)} · Translittération et données : API Quran.com. La traduction est une explication humaine du sens.
          </p>

          {!reading && (
            <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:justify-between">
              {prev ? (
                <Link to={`/coran/${prev.id}`} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 hover:border-gold/60">
                  <Icon name="arrowLeft" size={16} className="text-gold" /> {prev.id}. {prev.nameSimple}
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/coran/${next.id}`} className="flex items-center justify-end gap-2 rounded-xl border border-line bg-surface px-4 py-3 hover:border-gold/60">
                  {next.id}. {next.nameSimple} <Icon name="arrowRight" size={16} className="text-gold" />
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      <TafsirSheet verse={tafsirVerse} onClose={() => setTafsirVerse(null)} />
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Sheet open={infoOpen} onClose={() => setInfoOpen(false)} title={`Présentation : ${ch.nameSimple}`}>
        {learnSurahById(id) && (
          <div className="mb-4 rounded-xl bg-primary-soft/60 p-4">
            <p className="font-semibold">En bref</p>
            <p className="text-[15px]">{learnSurahById(id)!.theme}</p>
          </div>
        )}
        {info.loading && <Loader />}
        {info.error && <ErrorState message={info.error} onRetry={info.retry} />}
        {info.data && (
          <div className="space-y-3 text-[15px] leading-relaxed" lang="en">
            {stripHtml(info.data.text).slice(0, 12).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="border-t border-line pt-3 text-xs text-muted">Texte en anglais fourni par l’API Quran.com (source : {info.data.source}). Aucune présentation en français n’est disponible via cette API.</p>
          </div>
        )}
      </Sheet>
    </div>
  )
}
