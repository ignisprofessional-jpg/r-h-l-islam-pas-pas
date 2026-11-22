import { LESSONS, PARCOURS, LEVELS, type Module } from '../data/lessons'
import { LEARN_SURAHS } from '../data/learnSurahs'
import type { AppState, Level } from './store'
import { todayKey, dateKey, addDays } from './dates'

export function moduleProgress(m: Module, s: Pick<AppState, 'lessons' | 'steps' | 'surahs' | 'quizzes'>): number {
  const parts: number[] = []
  if (m.track.lessons) parts.push(m.track.lessons.filter((id) => s.lessons[id]?.status === 'done').length / m.track.lessons.length)
  if (m.track.steps) parts.push(Math.min(1, (s.steps[m.track.steps.group]?.length ?? 0) / m.track.steps.count))
  if (m.track.surahs) parts.push(m.track.surahs.filter((id) => s.surahs[id]?.learned).length / m.track.surahs.length)
  if (m.track.quiz) parts.push(m.track.quiz.filter((id) => s.quizzes[id]).length / m.track.quiz.length)
  return parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 0
}

export function levelProgress(level: Level, s: Pick<AppState, 'lessons' | 'steps' | 'surahs' | 'quizzes'>) {
  const mods = PARCOURS[level].flatMap((g) => g.modules)
  const values = mods.map((m) => moduleProgress(m, s))
  return { pct: Math.round((values.reduce((a, b) => a + b, 0) / mods.length) * 100), done: values.filter((v) => v >= 1).length, total: mods.length }
}

export function overallProgress(s: Pick<AppState, 'lessons' | 'steps' | 'surahs' | 'quizzes'>) {
  const all = LEVELS.map((l) => levelProgress(l.id, s))
  const done = all.reduce((a, b) => a + b.done, 0)
  const total = all.reduce((a, b) => a + b.total, 0)
  return { pct: Math.round(all.reduce((a, b) => a + b.pct, 0) / all.length), done, total }
}

/** Niveau « mérité » : on passe au niveau suivant quand le précédent est majoritairement terminé. */
export function computedLevel(s: Pick<AppState, 'lessons' | 'steps' | 'surahs' | 'quizzes' | 'profile'>) {
  const deb = levelProgress('debutant', s).pct
  const inter = levelProgress('intermediaire', s).pct
  if (inter >= 70) return 'avance' as Level
  if (deb >= 70) return 'intermediaire' as Level
  return s.profile.level
}

/** La leçon du jour : la prochaine leçon non terminée du niveau choisi, sinon une leçon à revoir, sinon une leçon tirée selon la date. */
export function lessonOfTheDay(s: Pick<AppState, 'lessons' | 'profile'>) {
  const order: Level[] = ['debutant', 'intermediaire', 'avance']
  const start = order.indexOf(s.profile.level)
  for (const lvl of order.slice(start).concat(order.slice(0, start))) {
    const next = LESSONS.find((l) => l.level === lvl && !s.lessons[l.id])
    if (next) return next
  }
  const review = LESSONS.find((l) => s.lessons[l.id]?.status === 'review')
  if (review) return review
  const d = new Date()
  const n = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()
  return LESSONS[n % LESSONS.length]
}

export function activityStats(activity: Record<string, number>) {
  const days = Object.keys(activity).filter((k) => activity[k] > 0)
  // série en cours (sans pénalité : on l'affiche seulement si elle existe)
  let streak = 0
  let d = new Date()
  if (!activity[todayKey()]) d = addDays(d, -1)
  while (activity[dateKey(d)]) {
    streak++
    d = addDays(d, -1)
  }
  const last30 = Array.from({ length: 30 }, (_, i) => dateKey(addDays(new Date(), -i))).filter((k) => activity[k]).length
  return { activeDays: days.length, streak, last30 }
}

export const learnSurahStats = (surahs: AppState['surahs']) => {
  const learned = LEARN_SURAHS.filter((s) => surahs[s.id]?.learned).length
  return { learned, total: LEARN_SURAHS.length }
}
