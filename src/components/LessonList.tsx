import { Link } from 'react-router-dom'
import type { Lesson } from '../data/types'
import { LEVELS } from '../data/lessons'
import { useApp } from '../lib/store'
import { Badge } from './ui'
import { Icon } from './Icon'

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  const status = useApp((s) => s.lessons)
  const quizzes = useApp((s) => s.quizzes)
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
      {lessons.map((l) => {
        const st = status[l.id]?.status
        const q = quizzes[`lecon-${l.id}`]
        return (
          <Link
            key={l.id}
            to={`/cours/${l.id}`}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-2.5 transition-all sm:items-start sm:p-4 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_30px_-18px_rgba(15,76,58,0.45)]"
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${st === 'done' ? 'bg-primary text-primary-ink' : 'bg-primary-soft text-primary'}`}>
              <Icon name={st === 'done' ? 'check' : (l.icon ?? 'book')} size={20} strokeWidth={st === 'done' ? 3 : 1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-start justify-between gap-2">
                <span className="text-[15px] font-semibold leading-snug sm:text-base">{l.title}</span>
                {l.arabic && <span className="arabic hidden shrink-0 text-base leading-tight text-gold sm:inline">{l.arabic}</span>}
              </span>
              <span className="mt-0.5 hidden text-sm leading-snug text-muted sm:block">{l.summary}</span>
              <span className="mt-1 flex flex-wrap gap-1.5 sm:mt-2">
                <Badge>{LEVELS.find((x) => x.id === l.level)?.label}</Badge>
                <Badge>{l.minutes} min</Badge>
                {st === 'review' && <Badge tone="gold">À revoir</Badge>}
                {q && (
                  <Badge tone="green">
                    Quiz {q.best}/{q.total}
                  </Badge>
                )}
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
