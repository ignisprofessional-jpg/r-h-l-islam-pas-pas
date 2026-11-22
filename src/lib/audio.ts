import { create } from 'zustand'

export interface Track { key: string; url: string; label?: string }

interface AudioState {
  queue: Track[]
  index: number
  playing: boolean
  loading: boolean
  /** nombre de répétitions de chaque verset (0 = infini) */
  repeat: number
  repeatDone: number
  loopAll: boolean
  rate: number
  error: string | null
  title: string
  play: (queue: Track[], start?: number, title?: string) => void
  toggle: () => void
  stop: () => void
  next: () => void
  prev: () => void
  setRepeat: (n: number) => void
  setRate: (r: number) => void
  setLoopAll: (v: boolean) => void
}

let el: HTMLAudioElement | null = null

const getEl = () => {
  if (el) return el
  el = new Audio()
  el.preload = 'auto'
  el.addEventListener('ended', () => onEnded())
  el.addEventListener('playing', () => useAudio.setState({ playing: true, loading: false, error: null }))
  el.addEventListener('pause', () => useAudio.setState({ playing: false }))
  el.addEventListener('waiting', () => useAudio.setState({ loading: true }))
  el.addEventListener('error', () => useAudio.setState({ playing: false, loading: false, error: "Impossible de lire l'audio. Vérifiez votre connexion." }))
  return el
}

const load = (i: number) => {
  const s = useAudio.getState()
  const t = s.queue[i]
  if (!t) return
  const a = getEl()
  a.src = t.url
  a.playbackRate = s.rate
  useAudio.setState({ index: i, repeatDone: 0, loading: true, error: null })
  a.play().catch(() => useAudio.setState({ playing: false, loading: false }))
}

function onEnded() {
  const s = useAudio.getState()
  const a = getEl()
  const done = s.repeatDone + 1
  if (s.repeat === 0 || done < s.repeat) {
    useAudio.setState({ repeatDone: done })
    a.currentTime = 0
    a.play().catch(() => undefined)
    return
  }
  if (s.index + 1 < s.queue.length) load(s.index + 1)
  else if (s.loopAll && s.queue.length) load(0)
  else useAudio.setState({ playing: false })
}

export const useAudio = create<AudioState>((set, get) => ({
  queue: [],
  index: 0,
  playing: false,
  loading: false,
  repeat: 1,
  repeatDone: 0,
  loopAll: false,
  rate: 1,
  error: null,
  title: '',
  play: (queue, start = 0, title = '') => {
    set({ queue, title })
    load(start)
  },
  toggle: () => {
    const a = getEl()
    if (!get().queue.length) return
    if (a.paused) a.play().catch(() => undefined)
    else a.pause()
  },
  stop: () => {
    const a = getEl()
    a.pause()
    a.removeAttribute('src')
    set({ queue: [], playing: false, index: 0, title: '' })
  },
  next: () => {
    const s = get()
    if (s.index + 1 < s.queue.length) load(s.index + 1)
  },
  prev: () => {
    const s = get()
    load(Math.max(0, s.index - 1))
  },
  setRepeat: (repeat) => set({ repeat, repeatDone: 0 }),
  setRate: (rate) => {
    getEl().playbackRate = rate
    set({ rate })
  },
  setLoopAll: (loopAll) => set({ loopAll }),
}))

export const currentKey = () => {
  const s = useAudio.getState()
  return s.queue[s.index]?.key ?? null
}
