/**
 * Accès aux données religieuses depuis des sources reconnues.
 * - Texte coranique (écriture uthmanie), traductions, translittération, récitations et tafsir :
 *   API publique de Quran.com (Quran Foundation) — https://api.quran.com/api/v4
 * - Recherche plein texte dans le Coran : API AlQuran.cloud (Islamic Network) — https://alquran.cloud/api
 * - Horaires de prière : API Aladhan (Islamic Network) — https://aladhan.com/prayer-times-api
 *
 * Aucune donnée coranique n'est générée par ce site : tout est récupéré tel quel puis mis en cache.
 */

const QURAN_API = 'https://api.quran.com/api/v4'
const CACHE_NAME = 'mcvi-data-v1'

export class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

const memory = new Map<string, unknown>()

async function fetchJson<T>(url: string, { cache = true }: { cache?: boolean } = {}): Promise<T> {
  if (cache && memory.has(url)) return memory.get(url) as T
  let cacheStore: Cache | null = null
  if (cache && typeof caches !== 'undefined') {
    try {
      cacheStore = await caches.open(CACHE_NAME)
      const hit = await cacheStore.match(url)
      if (hit) {
        const data = (await hit.json()) as T
        memory.set(url, data)
        return data
      }
    } catch {
      cacheStore = null
    }
  }
  let res: Response
  try {
    res = await fetch(url)
  } catch {
    throw new ApiError("Impossible de joindre le serveur. Vérifiez votre connexion Internet puis réessayez.")
  }
  if (!res.ok) throw new ApiError(`Le serveur a répondu avec une erreur (${res.status}).`, res.status)
  const data = (await res.json()) as T
  if (cache) {
    memory.set(url, data)
    try {
      await cacheStore?.put(url, new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }))
    } catch {
      /* quota dépassé : on garde le cache mémoire */
    }
  }
  return data
}

/* ------------------------------------------------------------------ */
/* Ressources                                                          */
/* ------------------------------------------------------------------ */

export const TRANSLATIONS = [
  { id: 779, name: 'Rachid Maach', note: 'Traduction française moderne, claire pour les débutants (via Quran.com)' },
  { id: 31, name: 'Muhammad Hamidullah', note: 'Traduction française classique, révisée (via Quran.com)' },
] as const

export const TRANSLIT_ID = 57 // Translittération phonétique (Quran.com, resource 57)

export const RECITERS = [
  { id: 7, name: 'Mishary Rashid al-Afasy', style: 'Murattal' },
  { id: 12, name: 'Mahmoud Khalil al-Husary', style: 'Mu‘allim — lente, idéale pour apprendre' },
  { id: 6, name: 'Mahmoud Khalil al-Husary', style: 'Murattal' },
  { id: 2, name: 'Abdul Basit Abdus-Samad', style: 'Murattal' },
  { id: 9, name: 'Mohamed Siddiq al-Minshawi', style: 'Murattal' },
  { id: 3, name: 'Abdur-Rahman as-Sudais', style: 'Murattal' },
] as const

export const TAFSIRS = [
  { id: 16, name: 'Tafsir al-Muyassar', lang: 'ar', note: 'Explication arabe très simple, rédigée par un comité de savants (Complexe du roi Fahd)' },
  { id: 169, name: 'Tafsir Ibn Kathir (abrégé)', lang: 'en', note: 'Version anglaise abrégée du tafsir d’Ibn Kathir (m. 774 H)' },
] as const

export const translationName = (id: number) => TRANSLATIONS.find((t) => t.id === id)?.name ?? `Traduction n°${id}`

/* ------------------------------------------------------------------ */
/* Versets                                                             */
/* ------------------------------------------------------------------ */

export interface Verse {
  key: string
  number: number
  surah: number
  arabic: string
  translation: string
  translit: string
  juz: number
  page: number
  sajdah: boolean
}

interface RawVerse {
  verse_key: string
  verse_number: number
  text_uthmani: string
  juz_number: number
  page_number: number
  sajdah_number: number | null
  translations?: { resource_id: number; text: string }[]
}

const cleanHtml = (s: string) =>
  s
    .replace(/<sup[^>]*>.*?<\/sup>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const mapVerse = (v: RawVerse, translation: number): Verse => ({
  key: v.verse_key,
  number: v.verse_number,
  surah: Number(v.verse_key.split(':')[0]),
  arabic: v.text_uthmani.trim(),
  translation: cleanHtml(v.translations?.find((t) => t.resource_id === translation)?.text ?? ''),
  // La translittération de Quran.com note la lettre ‘ayn « AA » : on l'affiche avec le signe usuel ‘
  translit: cleanHtml(v.translations?.find((t) => t.resource_id === TRANSLIT_ID)?.text ?? '').replace(/AA/g, '‘'),
  juz: v.juz_number,
  page: v.page_number,
  sajdah: v.sajdah_number != null,
})

export async function getSurahVerses(surah: number, translation: number): Promise<Verse[]> {
  const per = 50
  const base = `${QURAN_API}/verses/by_chapter/${surah}?language=fr&words=false&fields=text_uthmani&translations=${translation},${TRANSLIT_ID}&per_page=${per}`
  const first = await fetchJson<{ verses: RawVerse[]; pagination: { total_pages: number } }>(`${base}&page=1`)
  const pages = first.pagination.total_pages
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, pages - 1) }, (_, i) => fetchJson<{ verses: RawVerse[] }>(`${base}&page=${i + 2}`)),
  )
  return [first, ...rest].flatMap((r) => r.verses).map((v) => mapVerse(v, translation))
}

export async function getVerses(keys: string, translation: number): Promise<Verse[]> {
  // keys: "2:183" ou "2:183-185"
  const [s, range] = keys.split(':')
  const [from, to] = range.split('-').map(Number)
  const end = to || from
  if (end - from > 12) {
    const all = await getSurahVerses(Number(s), translation)
    return all.filter((v) => v.number >= from && v.number <= end)
  }
  const list = await Promise.all(
    Array.from({ length: end - from + 1 }, (_, i) =>
      fetchJson<{ verse: RawVerse }>(
        `${QURAN_API}/verses/by_key/${s}:${from + i}?language=fr&words=false&fields=text_uthmani&translations=${translation},${TRANSLIT_ID}`,
      ),
    ),
  )
  return list.map((r) => mapVerse(r.verse, translation))
}

export async function getVerseAudio(key: string, reciter: number): Promise<string | null> {
  const r = await fetchJson<{ audio_files: { url: string }[] }>(`${QURAN_API}/recitations/${reciter}/by_ayah/${key}`)
  return r.audio_files[0] ? audioUrl(r.audio_files[0].url) : null
}

/* ------------------------------------------------------------------ */
/* Audio                                                               */
/* ------------------------------------------------------------------ */

const audioUrl = (u: string) => (u.startsWith('http') ? u : u.startsWith('//') ? `https:${u}` : `https://verses.quran.com/${u}`)

export async function getSurahAudio(surah: number, reciter: number): Promise<Record<string, string>> {
  const base = `${QURAN_API}/recitations/${reciter}/by_chapter/${surah}?per_page=50`
  const first = await fetchJson<{ audio_files: { verse_key: string; url: string }[]; pagination: { total_pages: number } }>(`${base}&page=1`)
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, first.pagination.total_pages - 1) }, (_, i) =>
      fetchJson<{ audio_files: { verse_key: string; url: string }[] }>(`${base}&page=${i + 2}`),
    ),
  )
  const map: Record<string, string> = {}
  for (const r of [first, ...rest]) for (const a of r.audio_files) map[a.verse_key] = audioUrl(a.url)
  return map
}

/* ------------------------------------------------------------------ */
/* Tafsir                                                              */
/* ------------------------------------------------------------------ */

export async function getTafsir(tafsirId: number, key: string): Promise<string> {
  const r = await fetchJson<{ tafsir: { text: string } }>(`${QURAN_API}/tafsirs/${tafsirId}/by_ayah/${key}`)
  return r.tafsir.text
}

export async function getChapterInfo(surah: number): Promise<{ text: string; source: string }> {
  const r = await fetchJson<{ chapter_info: { text: string; source: string } }>(`${QURAN_API}/chapters/${surah}/info?language=fr`)
  return r.chapter_info
}

/* ------------------------------------------------------------------ */
/* Recherche dans le Coran (AlQuran.cloud)                             */
/* ------------------------------------------------------------------ */

export interface SearchMatch { surah: number; verse: number; text: string; surahName: string }

export async function searchQuran(q: string, lang: 'fr' | 'ar'): Promise<{ count: number; matches: SearchMatch[] }> {
  const edition = lang === 'fr' ? 'fr.hamidullah' : 'quran-simple-clean'
  const url = `https://api.alquran.cloud/v1/search/${encodeURIComponent(q.trim())}/all/${edition}`
  try {
    const r = await fetchJson<{ data: { count: number; matches: { numberInSurah: number; text: string; surah: { number: number; englishName: string } }[] } }>(url)
    return {
      count: r.data.count,
      matches: r.data.matches.slice(0, 200).map((m) => ({ surah: m.surah.number, verse: m.numberInSurah, text: m.text, surahName: m.surah.englishName })),
    }
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return { count: 0, matches: [] }
    throw e
  }
}

/* ------------------------------------------------------------------ */
/* Horaires de prière (Aladhan)                                        */
/* ------------------------------------------------------------------ */

export const CALC_METHODS = [
  { id: 12, name: 'UOIF (France) — angle 12°' },
  { id: 3, name: 'Ligue islamique mondiale (MWL)' },
  { id: 2, name: 'ISNA (Amérique du Nord)' },
  { id: 4, name: 'Umm al-Qura (La Mecque)' },
  { id: 5, name: 'Autorité égyptienne' },
  { id: 21, name: 'Maroc' },
  { id: 19, name: 'Algérie' },
  { id: 18, name: 'Tunisie' },
  { id: 13, name: 'Diyanet (Turquie)' },
] as const

export interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
  hijri?: string
}

export async function getPrayerTimes(opts: { city?: string; country?: string; lat?: number; lon?: number; method: number; school: number }, date = new Date()): Promise<PrayerTimes> {
  const d = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
  const url =
    opts.lat != null && opts.lon != null
      ? `https://api.aladhan.com/v1/timings/${d}?latitude=${opts.lat}&longitude=${opts.lon}&method=${opts.method}&school=${opts.school}`
      : `https://api.aladhan.com/v1/timingsByCity/${d}?city=${encodeURIComponent(opts.city ?? '')}&country=${encodeURIComponent(opts.country ?? '')}&method=${opts.method}&school=${opts.school}`
  const r = await fetchJson<{ data: { timings: Record<string, string> } }>(url)
  const t = r.data.timings
  const clean = (s: string) => s.slice(0, 5)
  return { Fajr: clean(t.Fajr), Sunrise: clean(t.Sunrise), Dhuhr: clean(t.Dhuhr), Asr: clean(t.Asr), Maghrib: clean(t.Maghrib), Isha: clean(t.Isha) }
}

export async function clearDataCache() {
  memory.clear()
  if (typeof caches !== 'undefined') await caches.delete(CACHE_NAME)
}
