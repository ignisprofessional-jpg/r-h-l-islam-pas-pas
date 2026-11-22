/**
 * Comptes et synchronisation de la progression avec Supabase.
 * - La progression reste toujours enregistrée sur l'appareil (fonctionne hors ligne).
 * - Connecté, chaque modification est envoyée au compte (après ~1,5 s de pause).
 * - À l'ouverture et au retour sur l'onglet, la version la plus récente est récupérée.
 * - Première connexion d'un appareil qui a déjà une progression : fusion sans perte.
 */
import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase, cloudEnabled } from './supabase'
import { useApp } from './store'
import { DATA_KEYS, hasProgress, mergeProgress, type ProgressData } from './merge'

export type SyncStatus = 'off' | 'signed-out' | 'syncing' | 'synced' | 'offline' | 'error'

interface SyncState {
  status: SyncStatus
  email: string | null
  userId: string | null
  lastSync: string | null
  error: string | null
  recovery: boolean
}

export const useSync = create<SyncState>(() => ({
  status: cloudEnabled ? 'signed-out' : 'off',
  email: null,
  userId: null,
  lastSync: null,
  error: null,
  recovery: false,
}))

const LAST_CHANGE = 'mcvi-last-change'
const LAST_PUSH = 'mcvi-last-push'
const LINKED = 'mcvi-linked-user'

const ls = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v)
    } catch {
      /* stockage indisponible */
    }
  },
  del: (k: string) => {
    try {
      localStorage.removeItem(k)
    } catch {
      /* stockage indisponible */
    }
  },
}

const snapshot = (): ProgressData => {
  const s = useApp.getState()
  return Object.fromEntries(DATA_KEYS.map((k) => [k, s[k]])) as unknown as ProgressData
}

let applying = false
const apply = (data: Partial<ProgressData>, changedAt: string) => {
  const clean = Object.fromEntries(DATA_KEYS.filter((k) => data[k] !== undefined).map((k) => [k, data[k]]))
  applying = true
  useApp.setState((s) => ({ ...clean, settings: { ...s.settings, ...(data.settings ?? {}) } }))
  applying = false
  ls.set(LAST_CHANGE, changedAt)
}

const offline = () => typeof navigator !== 'undefined' && navigator.onLine === false

function fail(e: unknown) {
  const msg = e instanceof Error ? e.message : typeof e === 'object' && e && 'message' in e ? String((e as { message: unknown }).message) : 'Erreur inconnue'
  useSync.setState({ status: offline() ? 'offline' : 'error', error: offline() ? null : frError(msg) })
}

async function push(data: ProgressData) {
  const { userId } = useSync.getState()
  if (!supabase || !userId) return
  if (offline()) return useSync.setState({ status: 'offline' })
  useSync.setState({ status: 'syncing' })
  const at = new Date().toISOString()
  const { error } = await supabase.from('progress').upsert({ user_id: userId, data, updated_at: at })
  if (error) return fail(error)
  ls.set(LAST_PUSH, at)
  useSync.setState({ status: 'synced', lastSync: at, error: null })
}

let timer: ReturnType<typeof setTimeout> | undefined
const schedulePush = () => {
  if (!useSync.getState().userId) return
  clearTimeout(timer)
  timer = setTimeout(() => push(snapshot()), 1500)
}

let reconciling: Promise<void> | null = null
/** Compare la progression locale et celle du compte, puis met les deux à jour. */
export function reconcile(): Promise<void> {
  reconciling ??= (async () => {
    const { userId } = useSync.getState()
    if (!supabase || !userId) return
    if (offline()) return void useSync.setState({ status: 'offline' })
    useSync.setState({ status: 'syncing' })
    const { data: row, error } = await supabase.from('progress').select('data, updated_at').eq('user_id', userId).maybeSingle()
    if (error) return fail(error)
    const local = snapshot()
    const localChange = ls.get(LAST_CHANGE) ?? ''
    const lastPush = ls.get(LAST_PUSH) ?? ''
    const linked = ls.get(LINKED) === userId

    if (!row) {
      await push(local)
    } else if (!linked) {
      const remote = row.data as Partial<ProgressData>
      if (hasProgress(local)) {
        const merged = mergeProgress(local, remote, localChange > row.updated_at)
        apply(merged, new Date().toISOString())
        await push(snapshot())
      } else {
        apply(remote, row.updated_at)
        useSync.setState({ status: 'synced', lastSync: row.updated_at, error: null })
      }
    } else if (row.updated_at > localChange && row.updated_at > lastPush) {
      apply(row.data as Partial<ProgressData>, row.updated_at)
      useSync.setState({ status: 'synced', lastSync: row.updated_at, error: null })
    } else if (localChange > lastPush) {
      await push(local)
    } else {
      useSync.setState({ status: 'synced', lastSync: lastPush || row.updated_at, error: null })
    }
    ls.set(LINKED, userId)
  })()
    .catch(fail)
    .finally(() => {
      reconciling = null
    })
  return reconciling
}

function handleSession(session: Session | null) {
  if (!session) {
    useSync.setState({ status: cloudEnabled ? 'signed-out' : 'off', email: null, userId: null })
    return
  }
  const same = useSync.getState().userId === session.user.id
  useSync.setState({ userId: session.user.id, email: session.user.email ?? null })
  if (!same) reconcile()
}

let started = false
export function initSync() {
  if (!supabase || started) return
  started = true

  useApp.subscribe((s, prev) => {
    if (applying) return
    if (DATA_KEYS.some((k) => s[k] !== prev[k])) {
      ls.set(LAST_CHANGE, new Date().toISOString())
      schedulePush()
    }
  })

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') useSync.setState({ recovery: true })
    // différer pour ne pas appeler Supabase à l'intérieur du rappel d'authentification
    setTimeout(() => handleSession(session), 0)
  })

  window.addEventListener('online', () => reconcile())
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') reconcile()
    else if (timer) {
      clearTimeout(timer)
      push(snapshot())
    }
  })
}

/* ---------------- Actions de compte ---------------- */

const FR_ERRORS: [RegExp, string][] = [
  [/invalid login credentials/i, 'E-mail ou mot de passe incorrect.'],
  [/email not confirmed/i, 'Votre adresse e-mail n’est pas encore confirmée : ouvrez le lien reçu par e-mail.'],
  [/user already registered|already been registered/i, 'Un compte existe déjà avec cette adresse. Connectez-vous plutôt.'],
  [/password should be at least|password.*characters/i, 'Le mot de passe doit contenir au moins 6 caractères.'],
  [/unable to validate email|invalid.*email/i, 'Cette adresse e-mail n’est pas valide.'],
  [/rate limit|too many/i, 'Trop de tentatives. Patientez quelques minutes avant de réessayer.'],
  [/failed to fetch|network/i, 'Impossible de joindre le serveur. Vérifiez votre connexion Internet.'],
]
export const frError = (e: unknown) => {
  const m = e instanceof Error ? e.message : String((e as { message?: string })?.message ?? e)
  return FR_ERRORS.find(([re]) => re.test(m))?.[1] ?? `Une erreur est survenue : ${m}`
}

const redirectTo = () => `${window.location.origin}/compte`

async function run<T extends { error: unknown }>(p: PromiseLike<T>) {
  try {
    const r = await p
    if (r.error) throw r.error
    return r
  } catch (e) {
    throw new Error(frError(e))
  }
}

export const auth = {
  signIn: (email: string, password: string) => run(supabase!.auth.signInWithPassword({ email, password })),
  signUp: (email: string, password: string) => run(supabase!.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo() } })),
  magicLink: (email: string) => run(supabase!.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } })),
  resetPassword: (email: string) => run(supabase!.auth.resetPasswordForEmail(email, { redirectTo: redirectTo() })),
  async updatePassword(password: string) {
    await run(supabase!.auth.updateUser({ password }))
    useSync.setState({ recovery: false })
  },
  async signOut(clearDevice: boolean, skipPush = false) {
    clearTimeout(timer)
    if (useSync.getState().userId && !skipPush) await push(snapshot()).catch(() => undefined)
    await supabase!.auth.signOut()
    ls.del(LINKED)
    ls.del(LAST_PUSH)
    if (clearDevice) {
      applying = true
      useApp.getState().resetAll()
      applying = false
      ls.del(LAST_CHANGE)
    }
    useSync.setState({ status: 'signed-out', email: null, userId: null, lastSync: null, error: null })
  },
  /** Supprime la progression enregistrée en ligne puis déconnecte (la copie de l'appareil est conservée). */
  async deleteCloudDataAndSignOut() {
    const { userId } = useSync.getState()
    if (!userId) return
    clearTimeout(timer)
    await run(supabase!.from('progress').delete().eq('user_id', userId))
    await auth.signOut(false, true)
  },
  syncNow: () => {
    clearTimeout(timer)
    return push(snapshot())
  },
}
