/**
 * Fusion de deux sauvegardes de progression (cet appareil + compte en ligne).
 * Utilisée la première fois qu'un appareil se connecte à un compte qui contient déjà des données :
 * rien n'est perdu, on garde le meilleur des deux côtés.
 * Ensuite, la synchronisation fonctionne en « dernière modification gagnante ».
 */
import type { AppState } from './store'

export type ProgressData = Pick<
  AppState,
  'profile' | 'theme' | 'lessons' | 'quizzes' | 'surahs' | 'duas' | 'favorites' | 'bookmark' | 'lastRead' | 'recent' | 'goals' | 'activity' | 'steps' | 'dhikr' | 'settings'
>

export const DATA_KEYS = ['profile', 'theme', 'lessons', 'quizzes', 'surahs', 'duas', 'favorites', 'bookmark', 'lastRead', 'recent', 'goals', 'activity', 'steps', 'dhikr', 'settings'] as const

const later = (a?: string, b?: string) => (a ?? '') >= (b ?? '')
const union = <T,>(a: T[] = [], b: T[] = []) => [...new Set([...a, ...b])]

function byLatest<T extends { updatedAt?: string }>(a: Record<string, T> = {}, b: Record<string, T> = {}) {
  const out: Record<string, T> = { ...b }
  for (const [k, v] of Object.entries(a)) if (!out[k] || later(v.updatedAt, out[k].updatedAt)) out[k] = v
  return out
}

/** `local` et `remote` : les deux sauvegardes. `localIsNewer` décide des réglages simples (thème, niveau…). */
export function mergeProgress(local: Partial<ProgressData>, remote: Partial<ProgressData>, localIsNewer: boolean): Partial<ProgressData> {
  const pref = localIsNewer ? local : remote
  const other = localIsNewer ? remote : local

  const quizzes: ProgressData['quizzes'] = { ...(remote.quizzes ?? {}) }
  for (const [k, v] of Object.entries(local.quizzes ?? {})) {
    const r = quizzes[k]
    if (!r) quizzes[k] = v
    else {
      const newest = later(v.updatedAt, r.updatedAt) ? v : r
      quizzes[k] = { ...newest, best: Math.max(v.best, r.best), attempts: Math.max(v.attempts, r.attempts) }
    }
  }

  const activity: Record<string, number> = { ...(remote.activity ?? {}) }
  for (const [k, v] of Object.entries(local.activity ?? {})) activity[k] = Math.max(v, activity[k] ?? 0)

  const steps: Record<string, string[]> = { ...(remote.steps ?? {}) }
  for (const [k, v] of Object.entries(local.steps ?? {})) steps[k] = union(v, steps[k])

  const duas: Record<string, boolean> = { ...(remote.duas ?? {}) }
  for (const [k, v] of Object.entries(local.duas ?? {})) duas[k] = v || !!duas[k]

  const goals = [...(remote.goals ?? [])]
  for (const g of local.goals ?? []) {
    const i = goals.findIndex((x) => x.id === g.id)
    if (i === -1) goals.push(g)
    else goals[i] = { ...goals[i], done: goals[i].done || g.done }
  }

  const recent = [...(local.recent ?? []), ...(remote.recent ?? [])]
    .sort((a, b) => b.at.localeCompare(a.at))
    .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
    .slice(0, 12)

  const pickPos = (a: ProgressData['bookmark'] | undefined, b: ProgressData['bookmark'] | undefined) => (!a ? b ?? null : !b ? a : later(a.at, b.at) ? a : b)

  const dhikr = [...(pref.dhikr ?? other.dhikr ?? [])].map((d) => {
    const o = (other.dhikr ?? []).find((x) => x.id === d.id)
    return o ? { ...d, total: Math.max(d.total, o.total) } : d
  })
  for (const d of other.dhikr ?? []) if (!dhikr.some((x) => x.id === d.id)) dhikr.push(d)

  const prefProfile = pref.profile ?? other.profile
  const profile = prefProfile
    ? {
        ...prefProfile,
        name: prefProfile.name || other.profile?.name || '',
        onboarded: !!(local.profile?.onboarded || remote.profile?.onboarded),
        createdAt: [local.profile?.createdAt, remote.profile?.createdAt].filter(Boolean).sort()[0] ?? prefProfile.createdAt,
      }
    : undefined

  return {
    profile,
    theme: pref.theme ?? other.theme,
    settings: pref.settings ?? other.settings,
    lessons: byLatest(local.lessons, remote.lessons),
    surahs: byLatest(local.surahs, remote.surahs),
    quizzes,
    duas,
    favorites: {
      verses: union(local.favorites?.verses, remote.favorites?.verses),
      duas: union(local.favorites?.duas, remote.favorites?.duas),
      lessons: union(local.favorites?.lessons, remote.favorites?.lessons),
    },
    bookmark: pickPos(local.bookmark, remote.bookmark),
    lastRead: pickPos(local.lastRead, remote.lastRead),
    recent,
    goals,
    activity,
    steps,
    dhikr,
  }
}

/** Une sauvegarde contient-elle une vraie progression ? (pour éviter de fusionner un appareil vierge) */
export function hasProgress(d: Partial<ProgressData> | null | undefined) {
  if (!d) return false
  return !!(
    Object.keys(d.lessons ?? {}).length ||
    Object.keys(d.quizzes ?? {}).length ||
    Object.keys(d.surahs ?? {}).length ||
    Object.keys(d.activity ?? {}).length ||
    (d.goals ?? []).length ||
    (d.favorites?.verses ?? []).length ||
    d.profile?.onboarded
  )
}
