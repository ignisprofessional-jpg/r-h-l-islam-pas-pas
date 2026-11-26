import { useAudio } from '../lib/audio'
import { Icon } from './Icon'
import { cx } from './ui'
import { surahName } from './Content'

const REPEATS = [1, 3, 5, 10, 0]

export function AudioBar() {
  const { queue, index, playing, loading, repeat, repeatDone, rate, error, title, toggle, stop, next, prev, setRepeat, setRate, loopAll, setLoopAll } = useAudio()
  if (!queue.length) return null
  const t = queue[index]
  const [s, v] = t.key.split(':')
  return (
    <div className="fixed inset-x-0 bottom-[calc(var(--bottom-nav)+8px)] z-[65] px-3 md:bottom-4 md:left-[var(--shell-left)] md:px-6" role="region" aria-label="Lecteur audio">
      <div className="animate-in mx-auto flex max-w-3xl flex-wrap items-center gap-2 rounded-[18px] bg-surface p-2 pl-3.5 shadow-[0_16px_36px_-18px_rgba(10,30,22,0.45)] ring-1 ring-ink/[0.07] sm:flex-nowrap">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title || surahName(Number(s))}</p>
          <p className="truncate text-xs text-muted">
            {error ? <span className="text-danger">{error}</span> : <>Verset {v} · {index + 1}/{queue.length}{repeat !== 1 && ` · répétition ${repeatDone + 1}/${repeat === 0 ? '∞' : repeat}`}</>}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="tap-pop flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink" aria-label="Verset précédent">
            <Icon name="prev" size={16} />
          </button>
          <button onClick={toggle} className="tap-pop flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-ink" aria-label={playing ? 'Pause' : 'Lecture'}>
            {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icon name={playing ? 'pause' : 'play'} size={18} />}
          </button>
          <button onClick={next} className="tap-pop flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink" aria-label="Verset suivant">
            <Icon name="next" size={16} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setRepeat(REPEATS[(REPEATS.indexOf(repeat) + 1) % REPEATS.length])}
            className={cx('tap-pop flex h-9 items-center gap-1 rounded-lg px-2 text-xs font-bold', repeat !== 1 ? 'bg-gold-soft text-gold' : 'text-muted hover:bg-surface-2')}
            aria-label="Nombre de répétitions par verset"
            title="Répéter chaque verset"
          >
            <Icon name="repeat" size={15} /> {repeat === 0 ? '∞' : `×${repeat}`}
          </button>
          <button
            onClick={() => setLoopAll(!loopAll)}
            className={cx('tap-pop hidden h-9 rounded-lg px-2 text-xs font-bold sm:block', loopAll ? 'bg-gold-soft text-gold' : 'text-muted hover:bg-surface-2')}
            title="Recommencer au début à la fin"
            aria-pressed={loopAll}
          >
            Boucle
          </button>
          <button onClick={() => setRate(rate === 1 ? 0.75 : rate === 0.75 ? 0.5 : 1)} className="tap-pop h-9 rounded-lg px-2 text-xs font-bold text-muted hover:bg-surface-2" title="Vitesse de lecture" aria-label="Vitesse de lecture">
            {rate}×
          </button>
          <button onClick={stop} className="tap-pop flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-2" aria-label="Fermer le lecteur">
            <Icon name="x" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
