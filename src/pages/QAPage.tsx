import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { QAS } from '../data/qa'
import { useDocumentTitle } from '../lib/hooks'
import { norm } from '../lib/search'
import { Card, Note, PageHeader, cx } from '../components/ui'
import { Blocks } from '../components/Content'
import { Icon } from '../components/Icon'

export default function QAPage() {
  useDocumentTitle('Questions-réponses')
  const { hash } = useLocation()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(hash ? hash.slice(1) : null)
  const [tag, setTag] = useState<string | null>(null)
  const tags = useMemo(() => [...new Set(QAS.flatMap((x) => x.tags))].sort(), [])

  useEffect(() => {
    if (hash) {
      setOpen(hash.slice(1))
      setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)
    }
  }, [hash])

  const list = useMemo(() => {
    const n = norm(q)
    return QAS.filter((x) => (!tag || x.tags.includes(tag)) && (!n || norm(x.q + ' ' + x.tags.join(' ') + ' ' + x.answer.map((b) => ('text' in b ? b.text : 'items' in b && Array.isArray(b.items) ? b.items.join(' ') : '')).join(' ')).includes(n)))
  }, [q, tag])

  return (
    <div className="animate-in">
      <PageHeader title="Questions et réponses" arabic="سؤال وجواب" icon="help" subtitle="Des réponses pédagogiques, prudentes et sourcées aux questions que se posent souvent les débutants. Quand une situation dépend de votre cas personnel, nous vous invitons à demander l’avis d’un imam." />

      <div className="relative mb-3">
        <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une question (ex. prière, famille, Fâtiha…)" className="h-12 w-full rounded-xl border border-line bg-surface pl-10 pr-3 outline-none focus:border-primary" aria-label="Rechercher une question" />
      </div>
      <div className="no-scrollbar -mx-1 mb-5 flex gap-1.5 overflow-x-auto px-1 pb-1">
        <button onClick={() => setTag(null)} className={cx('h-8 shrink-0 rounded-full px-3 text-sm font-semibold', !tag ? 'bg-primary text-primary-ink' : 'bg-surface text-muted ring-1 ring-line')}>
          Toutes
        </button>
        {tags.map((t) => (
          <button key={t} onClick={() => setTag(t === tag ? null : t)} className={cx('h-8 shrink-0 rounded-full px-3 text-sm font-semibold capitalize', tag === t ? 'bg-primary text-primary-ink' : 'bg-surface text-muted ring-1 ring-line')}>
            {t}
          </button>
        ))}
      </div>

      {list.length === 0 && (
        <Note tone="info" title="Pas encore de réponse à cette question">
          Essayez d’autres mots-clés, ou utilisez la recherche générale (en haut). Pour une question personnelle, rapprochez-vous de l’imam de votre mosquée ou d’une personne qualifiée.
        </Note>
      )}

      <div className="space-y-2">
        {list.map((x) => {
          const isOpen = open === x.id
          return (
            <Card key={x.id} id={x.id} className="scroll-mt-24 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : x.id)} className="flex w-full items-center gap-3 p-4 text-left" aria-expanded={isOpen}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold">
                  <Icon name="help" size={18} />
                </span>
                <span className="flex-1 font-semibold">{x.q}</span>
                <Icon name="chevronDown" className={cx('text-muted transition-transform', isOpen && 'rotate-180')} />
              </button>
              {isOpen && (
                <div className="animate-in border-t border-line px-4 pb-5 pt-2 sm:px-6">
                  <Blocks blocks={x.answer} />
                  {x.askImam && (
                    <Note tone="scholar" title="Demandez l’avis d’une personne qualifiée">
                      La réponse peut dépendre de votre situation précise. N’hésitez pas à poser la question à l’imam de votre mosquée ou à un savant de confiance.
                    </Note>
                  )}
                  <p className="mt-3 flex items-start gap-1.5 text-xs text-muted">
                    <Icon name="book" size={14} className="mt-0.5" /> Sources : {x.sources.join(' ; ')}
                  </p>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <Note tone="info" title="Notre engagement">
        Aucun verset ni hadith n’est inventé : les versets sont chargés depuis Quran.com et chaque hadith est cité avec sa référence. Lorsque les écoles juridiques divergent, les principaux avis sont présentés.
      </Note>
    </div>
  )
}
