import { useCallback, useEffect, useRef, useState } from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{ data: T | null; error: string | null; loading: boolean }>({ data: null, error: null, loading: true })
  const [nonce, setNonce] = useState(0)
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    let alive = true
    setState((s) => ({ data: s.data, error: null, loading: true }))
    fnRef
      .current()
      .then((data) => alive && setState({ data, error: null, loading: false }))
      .catch((e: unknown) => alive && setState({ data: null, error: e instanceof Error ? e.message : 'Une erreur est survenue.', loading: false }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce])

  const retry = useCallback(() => setNonce((n) => n + 1), [])
  return { ...state, retry }
}

export function useMediaQuery(q: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setMatch(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [q])
  return match
}

/** Synthèse vocale arabe du navigateur (utilisée uniquement pour les lettres, clairement signalée). */
export function speakArabic(text: string, rate = 0.7) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ar-SA'
  u.rate = rate
  const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith('ar'))
  if (voice) u.voice = voice
  synth.speak(u)
  return true
}

export const hasArabicVoice = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith('ar'))

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Rûh` : "Rûh — apprendre l'islam pas à pas"
  }, [title])
}
