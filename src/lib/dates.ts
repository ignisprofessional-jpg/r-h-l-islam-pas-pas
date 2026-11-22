export const pad = (n: number) => String(n).padStart(2, '0')

export const dateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayKey = () => dateKey(new Date())

export const parseKey = (k: string) => {
  const [y, m, d] = k.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** ISO week key, e.g. 2026-W47 */
export const weekKey = (date = new Date()) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${pad(week)}`
}

export const startOfWeek = (date = new Date()) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - day)
  return d
}

export const addDays = (d: Date, n: number) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export const frDate = (d: Date, opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Intl.DateTimeFormat('fr-FR', opts).format(d)

export const relativeFr = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.round(diff / 60000)
  if (min < 1) return "à l'instant"
  if (min < 60) return `il y a ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `il y a ${h} h`
  const d = Math.round(h / 24)
  if (d === 1) return 'hier'
  if (d < 30) return `il y a ${d} jours`
  return frDate(new Date(iso), { day: 'numeric', month: 'long' })
}

/* ---------- Calendrier hégirien (Umm al-Qura, via l'API Intl du navigateur) ---------- */

export const HIJRI_MONTHS = [
  'Mouharram',
  'Safar',
  "Rabi' al-awwal",
  "Rabi' ath-thani",
  'Joumada al-oula',
  'Joumada ath-thaniya',
  'Rajab',
  "Cha'bane",
  'Ramadan',
  'Chawwal',
  "Dhou al-Qi'da",
  'Dhou al-Hijja',
]

export const HIJRI_MONTHS_AR = [
  'مُحَرَّم', 'صَفَر', 'رَبِيع الأَوَّل', 'رَبِيع الآخِر', 'جُمَادَى الأُولَى', 'جُمَادَى الآخِرَة',
  'رَجَب', 'شَعْبَان', 'رَمَضَان', 'شَوَّال', 'ذُو القَعْدَة', 'ذُو الحِجَّة',
]

export interface HijriDate { day: number; month: number; year: number }

let hijriFmt: Intl.DateTimeFormat | null = null
export const toHijri = (d: Date): HijriDate | null => {
  try {
    hijriFmt ??= new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' })
    const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12))
    const parts = hijriFmt.formatToParts(utc)
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value.replace(/\D/g, ''))
    const day = get('day')
    const month = get('month')
    const year = get('year') || get('relatedYear')
    if (!day || !month || !year) return null
    return { day, month, year }
  } catch {
    return null
  }
}

export const hijriLabel = (h: HijriDate | null) => (h ? `${h.day} ${HIJRI_MONTHS[h.month - 1]} ${h.year}` : '')
