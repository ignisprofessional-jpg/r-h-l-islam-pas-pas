import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { todayKey, weekKey } from './dates'

export type Level = 'debutant' | 'intermediaire' | 'avance'
export type Theme = 'light' | 'dark' | 'system'
export type LessonStatus = 'done' | 'review'
export type SurahStatus = { read?: boolean; learned?: boolean; learning?: boolean; updatedAt?: string }

export interface QuizResult { best: number; last: number; total: number; attempts: number; updatedAt: string }
export interface Goal { id: string; text: string; done: boolean; week: string; createdAt: string }
export interface DhikrCounter { id: string; label: string; arabic?: string; target: number; count: number; total: number }
export interface Position { surah: number; verse: number; at: string }
export interface Location { city: string; country: string; lat?: number; lon?: number }

export interface Settings {
  translation: number
  reciter: number
  showTranslit: boolean
  showTranslation: boolean
  arabicSize: number
  location: Location | null
  method: number
  school: 0 | 1
  slowMode: boolean
}

export interface AppState {
  profile: { name: string; level: Level; onboarded: boolean; createdAt: string }
  theme: Theme
  lessons: Record<string, { status: LessonStatus; updatedAt: string }>
  quizzes: Record<string, QuizResult>
  surahs: Record<string, SurahStatus>
  duas: Record<string, boolean>
  favorites: { verses: string[]; duas: string[]; lessons: string[] }
  bookmark: Position | null
  lastRead: Position | null
  recent: { id: string; at: string }[]
  goals: Goal[]
  activity: Record<string, number>
  steps: Record<string, string[]>
  dhikr: DhikrCounter[]
  settings: Settings

  setProfile: (p: Partial<AppState['profile']>) => void
  setTheme: (t: Theme) => void
  setLesson: (id: string, status: LessonStatus | null) => void
  visitLesson: (id: string) => void
  saveQuiz: (id: string, score: number, total: number) => void
  setSurah: (id: number, patch: Partial<SurahStatus>) => void
  toggleDua: (id: string) => void
  toggleFavorite: (kind: keyof AppState['favorites'], id: string) => void
  setBookmark: (p: Omit<Position, 'at'> | null) => void
  setLastRead: (p: Omit<Position, 'at'>) => void
  addGoal: (text: string) => void
  toggleGoal: (id: string) => void
  removeGoal: (id: string) => void
  toggleStep: (group: string, step: string, value?: boolean) => void
  resetSteps: (group: string) => void
  touch: () => void
  setDhikr: (list: DhikrCounter[]) => void
  updateDhikr: (id: string, patch: Partial<DhikrCounter>) => void
  setSettings: (s: Partial<Settings>) => void
  importData: (data: Partial<AppState>) => void
  resetAll: () => void
}

const now = () => new Date().toISOString()

const defaultDhikr: DhikrCounter[] = [
  { id: 'subhanallah', label: 'Subhân Allâh', arabic: 'سُبْحَانَ اللَّهِ', target: 33, count: 0, total: 0 },
  { id: 'alhamdulillah', label: 'Al-hamdu lillâh', arabic: 'الْحَمْدُ لِلَّهِ', target: 33, count: 0, total: 0 },
  { id: 'allahuakbar', label: 'Allâhu akbar', arabic: 'اللَّهُ أَكْبَرُ', target: 34, count: 0, total: 0 },
  { id: 'istighfar', label: 'Astaghfirullâh', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100, count: 0, total: 0 },
]

const initial = () => ({
  profile: { name: '', level: 'debutant' as Level, onboarded: false, createdAt: now() },
  theme: 'system' as Theme,
  lessons: {},
  quizzes: {},
  surahs: {},
  duas: {},
  favorites: { verses: [], duas: [], lessons: [] },
  bookmark: null,
  lastRead: null,
  recent: [],
  goals: [],
  activity: {},
  steps: {},
  dhikr: defaultDhikr,
  settings: {
    translation: 779,
    reciter: 7,
    showTranslit: true,
    showTranslation: true,
    arabicSize: 30,
    location: null,
    method: 12,
    school: 0 as 0 | 1,
    slowMode: false,
  },
})

const bump = (activity: Record<string, number>) => {
  const k = todayKey()
  return { ...activity, [k]: (activity[k] ?? 0) + 1 }
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      ...initial(),
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      setTheme: (theme) => set({ theme }),
      setLesson: (id, status) =>
        set((s) => {
          const lessons = { ...s.lessons }
          if (status) lessons[id] = { status, updatedAt: now() }
          else delete lessons[id]
          return { lessons, activity: bump(s.activity) }
        }),
      visitLesson: (id) =>
        set((s) => ({ recent: [{ id, at: now() }, ...s.recent.filter((r) => r.id !== id)].slice(0, 12) })),
      saveQuiz: (id, score, total) =>
        set((s) => {
          const prev = s.quizzes[id]
          return {
            quizzes: {
              ...s.quizzes,
              [id]: {
                best: Math.max(prev?.best ?? 0, score),
                last: score,
                total,
                attempts: (prev?.attempts ?? 0) + 1,
                updatedAt: now(),
              },
            },
            activity: bump(s.activity),
          }
        }),
      setSurah: (id, patch) =>
        set((s) => ({
          surahs: { ...s.surahs, [id]: { ...s.surahs[id], ...patch, updatedAt: now() } },
          activity: bump(s.activity),
        })),
      toggleDua: (id) => set((s) => ({ duas: { ...s.duas, [id]: !s.duas[id] }, activity: bump(s.activity) })),
      toggleFavorite: (kind, id) =>
        set((s) => {
          const list = s.favorites[kind]
          return {
            favorites: { ...s.favorites, [kind]: list.includes(id) ? list.filter((x) => x !== id) : [id, ...list] },
          }
        }),
      setBookmark: (p) => set({ bookmark: p ? { ...p, at: now() } : null }),
      setLastRead: (p) => set((s) => ({ lastRead: { ...p, at: now() }, activity: s.activity[todayKey()] ? s.activity : bump(s.activity) })),
      addGoal: (text) =>
        set((s) => ({
          goals: [...s.goals, { id: Math.random().toString(36).slice(2, 10), text, done: false, week: weekKey(), createdAt: now() }],
        })),
      toggleGoal: (id) =>
        set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)), activity: bump(s.activity) })),
      removeGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      toggleStep: (group, step, value) =>
        set((s) => {
          const cur = s.steps[group] ?? []
          const has = cur.includes(step)
          const want = value ?? !has
          const next = want ? (has ? cur : [...cur, step]) : cur.filter((x) => x !== step)
          return { steps: { ...s.steps, [group]: next }, activity: bump(s.activity) }
        }),
      resetSteps: (group) => set((s) => ({ steps: { ...s.steps, [group]: [] } })),
      touch: () => set((s) => ({ activity: bump(s.activity) })),
      setDhikr: (dhikr) => set({ dhikr }),
      updateDhikr: (id, patch) => set((s) => ({ dhikr: s.dhikr.map((d) => (d.id === id ? { ...d, ...patch } : d)) })),
      setSettings: (p) => set((s) => ({ settings: { ...s.settings, ...p } })),
      importData: (data) => set((s) => ({ ...s, ...data, settings: { ...s.settings, ...(data.settings ?? {}) } })),
      resetAll: () => set(initial()),
    }),
    {
      name: 'mcvi-store',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => {
        // Only persist data, not functions
        const { profile, theme, lessons, quizzes, surahs, duas, favorites, bookmark, lastRead, recent, goals, activity, steps, dhikr, settings } = s
        return { profile, theme, lessons, quizzes, surahs, duas, favorites, bookmark, lastRead, recent, goals, activity, steps, dhikr, settings }
      },
    },
  ),
)

export const NO_STEPS: string[] = []

export const exportData = () => {
  const s = useApp.getState()
  const { profile, theme, lessons, quizzes, surahs, duas, favorites, bookmark, lastRead, recent, goals, activity, steps, dhikr, settings } = s
  return { app: 'ruh', version: 1, exportedAt: now(), data: { profile, theme, lessons, quizzes, surahs, duas, favorites, bookmark, lastRead, recent, goals, activity, steps, dhikr, settings } }
}
