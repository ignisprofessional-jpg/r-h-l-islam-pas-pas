import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

/** Les comptes en ligne ne sont actifs que si le projet Supabase est configuré (.env.local). */
export const cloudEnabled = !!(url && key)

export const supabase: SupabaseClient | null = cloudEnabled
  ? createClient(url!, key!, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'mcvi-auth' } })
  : null
