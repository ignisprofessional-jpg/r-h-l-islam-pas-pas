import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { GROUPS, SECONDARY, groupOf, itemsOf, type GroupId, type NavGroup } from '../lib/nav'
import { useApp } from '../lib/store'
import { search } from '../lib/search'
import { useMediaQuery } from '../lib/hooks'
import { Icon } from './Icon'
import { AudioBar } from './AudioBar'
import { Toaster, cx } from './ui'
import { useSync } from '../lib/sync'
import { STATUS_DOT } from '../lib/syncLabels'

/* ---------------- Marque ---------------- */
function Mark({ size = 36, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <span
      className={cx('relative flex shrink-0 items-center justify-center rounded-[11px]', onDark ? 'bg-white/[0.08] text-gold-bright' : 'bg-deep text-gold-bright')}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" width={size * 0.66} height={size * 0.66} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 4l4.2 10.2L34.4 18.4 24.2 22.6 20 32.8l-4.2-10.2L5.6 18.4l10.2-4.2z" />
        <circle cx="20" cy="18.4" r="4.2" />
      </svg>
    </span>
  )
}

function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-baseline gap-1.5 leading-none">
      <span className={cx('font-display text-[23px] font-medium', onDark ? 'text-white' : 'text-ink')}>Rûh</span>
      <span className={cx('arabic text-[15px] leading-none', onDark ? 'text-gold-bright' : 'text-gold')}>روح</span>
    </span>
  )
}

/* ---------------- Thème ---------------- */
function useIsDark() {
  const theme = useApp((s) => s.theme)
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)')
  return theme === 'dark' || (theme === 'system' && systemDark)
}

function useApplyTheme() {
  const dark = useIsDark()
  const mobile = useMediaQuery('(max-width: 767px)')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    // Sur téléphone, la barre d'état prend la couleur de l'en-tête vert ; ailleurs, celle du papier.
    const color = mobile ? (dark ? '#0f2a21' : '#0d3b2e') : dark ? '#0c1613' : '#f5f0e6'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  }, [dark, mobile])
}

function ThemeButton({ className = '', onDark = false, withLabel = false }: { className?: string; onDark?: boolean; withLabel?: boolean }) {
  const dark = useIsDark()
  const setTheme = useApp((s) => s.setTheme)
  const label = dark ? 'Mode clair' : 'Mode sombre'
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className={cx('flex items-center justify-center gap-3 rounded-xl transition-colors', onDark ? 'text-white/80 active:bg-white/10' : 'text-muted hover:bg-ink/[0.05] hover:text-ink', className)}
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={label}
    >
      <Icon name={dark ? 'sun' : 'moon'} size={19} />
      {withLabel && <span className="text-[14.5px] font-medium">{label}</span>}
    </button>
  )
}

/* ---------------- Recherche globale ---------------- */
function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const results = useMemo(() => search(q), [q])

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])
  useEffect(() => setActive(0), [q])

  if (!open) return null
  const go = (to: string) => {
    onClose()
    navigate(to)
  }
  const extra = q.trim().length >= 2 ? { title: `Rechercher « ${q.trim()} » dans le texte du Coran`, to: `/coran?q=${encodeURIComponent(q.trim())}` } : null
  const total = results.length + (extra ? 1 : 0)

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-3 pt-[calc(env(safe-area-inset-top,0px)+12px)] sm:p-6 sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Recherche">
      <div className="fade-in absolute inset-0 bg-[#0b1a14]/45" onClick={onClose} />
      <div className="animate-in relative w-full max-w-2xl overflow-hidden rounded-[20px] bg-surface shadow-[0_24px_60px_-20px_rgba(10,30,22,0.45)] ring-1 ring-ink/[0.06]">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Icon name="search" className="text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(total - 1, a + 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(0, a - 1))
              }
              if (e.key === 'Enter') {
                if (active < results.length && results[active]) go(results[active].to)
                else if (extra) go(extra.to)
              }
            }}
            placeholder="Un cours, une sourate, une invocation…"
            className="h-14 w-full bg-transparent text-[16px] outline-none placeholder:text-muted"
            aria-label="Rechercher"
          />
          <button onClick={onClose} className="shrink-0 rounded-lg px-2 py-1 text-[13px] font-medium text-muted hover:bg-ink/[0.05] sm:hidden">
            Annuler
          </button>
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-xs text-muted sm:block">Échap</kbd>
        </div>
        <div className="scroll-contain max-h-[min(60vh,520px)] overflow-y-auto p-2">
          {!q && (
            <div className="p-3">
              <p className="mb-2.5 text-[13px] font-medium text-muted">Suggestions</p>
              <div className="flex flex-wrap gap-1.5">
                {['Al-Fâtiha', 'ablutions', 'tachahhoud', 'shahada', 'Ramadan', 'patience', 'porc', 'Fajr'].map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="rounded-full bg-surface-2 px-3 py-1.5 text-[14px] text-ink hover:bg-primary-soft">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {q && results.length === 0 && <p className="p-4 text-sm text-muted">Aucun résultat dans les cours. Essayez la recherche dans le Coran ci-dessous.</p>}
          <ul>
            {results.map((r, i) => (
              <li key={r.kind + r.to + r.title}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to)}
                  className={cx('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left', active === i ? 'bg-primary-soft/70' : '')}
                >
                  <Icon name={r.icon} size={18} className="mt-0.5 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.title}</span>
                    {r.text && <span className="block truncate text-sm text-muted">{r.text}</span>}
                  </span>
                  <span className="shrink-0 pt-0.5 text-[12px] text-muted">{r.kind}</span>
                </button>
              </li>
            ))}
            {extra && (
              <li>
                <button
                  onMouseEnter={() => setActive(results.length)}
                  onClick={() => go(extra.to)}
                  className={cx('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left', active === results.length ? 'bg-gold-soft/70' : '')}
                >
                  <Icon name="book" size={18} className="text-gold" />
                  <span className="font-medium">{extra.title}</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Compte (pied de navigation) ---------------- */
function AccountRow({ compact = false }: { compact?: boolean }) {
  const name = useApp((s) => s.profile.name)
  const { status, email } = useSync()
  const d = STATUS_DOT[status]
  const initial = (name || email || '').trim().charAt(0).toUpperCase()
  const line = email ? d.text : status === 'off' ? 'Enregistré sur cet appareil' : 'Se connecter pour synchroniser'
  return (
    <NavLink
      to="/compte"
      title={compact ? `${name || 'Mon compte'} — ${line}` : undefined}
      className={({ isActive }) => cx('flex items-center gap-3 rounded-xl transition-colors', compact ? 'h-12 w-12 justify-center' : 'px-2 py-2', isActive ? 'bg-ink/[0.06]' : 'hover:bg-ink/[0.04]')}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft font-display text-[15px] font-medium text-primary">
        {initial || <Icon name="user" size={16} />}
        <span className={cx('absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-bg', d.dot)} />
      </span>
      {!compact && (
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[14px] font-semibold">{name || 'Mon compte'}</span>
          <span className="block truncate text-[12px] text-muted">{line}</span>
        </span>
      )}
    </NavLink>
  )
}

/* ---------------- Barre latérale complète (ordinateur) ---------------- */
function SideLink({ to, icon, label }: { to: string; icon: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cx('group flex h-9 items-center gap-3 rounded-[10px] px-2.5 text-[14.5px] transition-colors', isActive ? 'bg-primary-soft/80 font-semibold text-primary' : 'font-medium text-ink/75 hover:bg-ink/[0.045] hover:text-ink')
      }
    >
      {({ isActive }) => (
        <>
          <Icon name={icon} size={18} className={isActive ? 'text-primary' : 'text-muted group-hover:text-ink'} />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  )
}

function FullSidebar({ onSearch, onCollapse }: { onSearch: () => void; onCollapse: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-line bg-bg xl:flex" aria-label="Navigation">
      <div className="flex items-center justify-between px-4 pb-3 pt-5">
        <Link to="/" className="flex items-center gap-2.5 rounded-xl" aria-label="Rûh — accueil">
          <Mark size={34} />
          <Wordmark />
        </Link>
        <button onClick={onCollapse} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-ink/[0.05] hover:text-ink" aria-label="Réduire la barre latérale" title="Réduire la barre latérale">
          <Icon name="sidebar" size={18} />
        </button>
      </div>
      <div className="px-3 pb-2">
        <button onClick={onSearch} className="flex h-10 w-full items-center gap-2.5 rounded-[11px] bg-surface px-3 text-[14px] text-muted ring-1 ring-line transition-colors hover:ring-gold/50">
          <Icon name="search" size={17} /> Rechercher
          <kbd className="ml-auto rounded-md bg-surface-2 px-1.5 py-0.5 font-sans text-[11px] text-muted">Ctrl K</kbd>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4 pt-2" aria-label="Navigation principale">
        <SideLink to="/" icon="home" label="Aujourd’hui" />
        {GROUPS.filter((g) => g.id !== 'accueil').map((g) => (
          <div key={g.id} className="mt-5">
            <p className="mb-1 flex items-baseline justify-between px-2.5 font-display text-[15px] italic text-muted">
              {g.label}
              <span className="arabic text-[13px] not-italic text-gold/70">{g.arabic}</span>
            </p>
            <ul className="space-y-px">
              {itemsOf(g.id).map((n) => (
                <li key={n.to}>
                  <SideLink to={n.to} icon={n.icon} label={n.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-1 border-t border-line px-3 py-3">
        <div className="min-w-0 flex-1">
          <AccountRow />
        </div>
        <NavLink to="/reglages" className={({ isActive }) => cx('flex h-9 w-9 items-center justify-center rounded-lg transition-colors', isActive ? 'bg-ink/[0.06] text-ink' : 'text-muted hover:bg-ink/[0.05] hover:text-ink')} aria-label="Réglages" title="Réglages">
          <Icon name="settings" size={18} />
        </NavLink>
        <ThemeButton className="h-9 w-9" />
      </div>
    </aside>
  )
}

/* ---------------- Rail (tablette, ou barre réduite) ---------------- */
function GroupPanel({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    ref.current?.querySelector<HTMLElement>('a')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <>
      <div className="fade-in fixed inset-0 z-30 bg-[#0b1a14]/20" onClick={onClose} />
      <div
        ref={ref}
        className="flyout-in scroll-contain fixed bottom-0 left-[84px] top-0 z-40 w-[300px] overflow-y-auto border-r border-line bg-surface px-4 pb-6 pt-6 shadow-[16px_0_40px_-24px_rgba(10,30,22,0.35)]"
        role="dialog"
        aria-label={group.label}
      >
        <div className="mb-4 flex items-start justify-between gap-3 px-2">
          <div className="min-w-0">
            <h2 className="flex items-baseline gap-2.5 font-display text-[26px] font-medium leading-tight">
              {group.label}
              <span className="arabic text-[17px] leading-none text-gold" lang="ar">
                {group.arabic}
              </span>
            </h2>
            <p className="mt-0.5 text-[13.5px] text-muted">{group.desc}</p>
          </div>
          <button onClick={onClose} className="-mr-1 flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-ink/[0.05]" aria-label="Fermer">
            <Icon name="x" size={18} />
          </button>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {itemsOf(group.id).map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} onClick={onClose} className={({ isActive }) => cx('flex items-center gap-3 px-2 py-3.5 transition-colors', isActive ? 'text-primary' : 'hover:bg-ink/[0.03]')}>
                {({ isActive }) => (
                  <>
                    <span className={cx('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', isActive ? 'bg-primary text-primary-ink' : 'bg-primary-soft text-primary')}>
                      <Icon name={n.icon} size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] font-semibold">{n.label}</span>
                      <span className="block text-[13px] text-muted">{n.desc}</span>
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Rail({ onSearch, onExpand, xlOnly }: { onSearch: () => void; onExpand: () => void; xlOnly: boolean }) {
  const location = useLocation()
  const navigate = useNavigate()
  const current = groupOf(location.pathname)
  const [open, setOpen] = useState<GroupId | null>(null)
  useEffect(() => setOpen(null), [location.pathname])
  const panel = GROUPS.find((g) => g.id === open)

  return (
    <>
      <aside className={cx('fixed inset-y-0 left-0 z-50 hidden w-[84px] flex-col items-center border-r border-line bg-bg py-4', xlOnly ? 'xl:flex' : 'md:flex xl:hidden')} aria-label="Navigation">
        <Link to="/" className="mb-3 rounded-xl" aria-label="Rûh — accueil">
          <Mark size={40} />
        </Link>
        <button onClick={onSearch} className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl text-muted hover:bg-ink/[0.05] hover:text-ink" aria-label="Rechercher" title="Rechercher (Ctrl K)">
          <Icon name="search" size={20} />
        </button>
        <nav className="flex w-full flex-1 flex-col items-center gap-1 px-2" aria-label="Rubriques">
          {GROUPS.map((g) => {
            const isCurrent = current === g.id
            const isOpen = open === g.id
            return (
              <button
                key={g.id}
                onClick={() => (g.id === 'accueil' ? navigate('/') : setOpen(isOpen ? null : g.id))}
                aria-expanded={g.id === 'accueil' ? undefined : isOpen}
                aria-current={isCurrent ? 'page' : undefined}
                className="group flex w-full flex-col items-center gap-1 rounded-xl py-2"
              >
                <span className={cx('flex h-8 w-14 items-center justify-center rounded-full transition-colors', isCurrent || isOpen ? 'bg-primary-soft text-primary' : 'text-muted group-hover:bg-ink/[0.05] group-hover:text-ink')}>
                  <Icon name={g.icon} size={20} />
                </span>
                <span className={cx('text-[11.5px] leading-none', isCurrent || isOpen ? 'font-semibold text-primary' : 'font-medium text-muted')}>{g.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="flex flex-col items-center gap-1">
          <AccountRow compact />
          <NavLink to="/reglages" className={({ isActive }) => cx('flex h-11 w-11 items-center justify-center rounded-xl transition-colors', isActive ? 'bg-ink/[0.06] text-ink' : 'text-muted hover:bg-ink/[0.05] hover:text-ink')} aria-label="Réglages" title="Réglages">
            <Icon name="settings" size={19} />
          </NavLink>
          <ThemeButton className="h-11 w-11" />
          {xlOnly && (
            <button onClick={onExpand} className="flex h-11 w-11 items-center justify-center rounded-xl text-muted hover:bg-ink/[0.05] hover:text-ink" aria-label="Agrandir la barre latérale" title="Agrandir la barre latérale">
              <Icon name="sidebar" size={19} />
            </button>
          )}
        </div>
      </aside>
      {panel && <GroupPanel group={panel} onClose={() => setOpen(null)} />}
    </>
  )
}

/* ---------------- Téléphone : en-tête, barre inférieure, menu « Plus » ---------------- */
function MobileHeader({ onSearch }: { onSearch: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-deep text-white md:hidden" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="flex h-14 items-center justify-between gap-2 pl-4 pr-2">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Rûh — accueil">
          <Mark size={32} onDark />
          <Wordmark onDark />
        </Link>
        <div className="flex items-center">
          <button onClick={onSearch} className="flex h-11 w-11 items-center justify-center rounded-xl text-white/85 active:bg-white/10" aria-label="Rechercher">
            <Icon name="search" size={21} />
          </button>
          <ThemeButton onDark className="h-11 w-11" />
        </div>
      </div>
    </header>
  )
}

const TABS: { id: GroupId | 'plus'; label: string; icon: string; to?: string }[] = [
  { id: 'accueil', label: 'Accueil', icon: 'home', to: '/' },
  { id: 'coran', label: 'Coran', icon: 'book', to: '/coran' },
  { id: 'apprendre', label: 'Apprendre', icon: 'graduation', to: '/parcours' },
  { id: 'pratique', label: 'Pratique', icon: 'prayer', to: '/pratique' },
  { id: 'plus', label: 'Plus', icon: 'grid' },
]

function BottomNav({ onMore, moreOpen }: { onMore: () => void; moreOpen: boolean }) {
  const location = useLocation()
  const current = groupOf(location.pathname)
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} aria-label="Navigation principale">
      <ul className="grid grid-cols-5">
        {TABS.map((t) => {
          const active = t.id === 'plus' ? moreOpen || (current === 'suivi' && !moreOpen) : current === t.id && !moreOpen
          const inner = (
            <>
              <span className={cx('flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200', active ? 'bg-primary-soft text-primary' : 'text-muted')}>
                <Icon name={t.icon} size={21} strokeWidth={active ? 2 : 1.75} />
              </span>
              <span className={cx('text-[11px] leading-none', active ? 'font-semibold text-primary' : 'font-medium text-muted')}>{t.label}</span>
            </>
          )
          const cls = 'flex h-16 w-full flex-col items-center justify-center gap-1'
          return (
            <li key={t.id}>
              {t.to ? (
                <Link to={t.to} className={cls} aria-current={active ? 'page' : undefined}>
                  {inner}
                </Link>
              ) : (
                <button onClick={onMore} className={cls} aria-expanded={moreOpen} aria-label="Plus de rubriques">
                  {inner}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MoreSheet({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])
  return (
    <div className="fixed inset-x-0 top-0 z-30 md:hidden" style={{ bottom: 'var(--bottom-nav)' }} role="dialog" aria-modal="true" aria-label="Toutes les rubriques">
      <div className="fade-in absolute inset-0 bg-[#0b1a14]/40" onClick={onClose} />
      <div className="sheet-in scroll-contain absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto rounded-t-[24px] bg-bg px-4 pb-4 pt-2.5">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink/15" />
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-[26px] font-medium">Toutes les rubriques</h2>
          <button onClick={onClose} className="-mr-1.5 flex h-11 w-11 items-center justify-center rounded-xl text-muted active:bg-ink/[0.06]" aria-label="Fermer">
            <Icon name="x" size={20} />
          </button>
        </div>
        {GROUPS.filter((g) => g.id !== 'accueil').map((g) => (
          <section key={g.id} className="mb-4">
            <p className="mb-1.5 flex items-baseline gap-2 font-display text-[16px] italic text-muted">
              {g.label}
              <span className="arabic text-[13px] not-italic text-gold/80">{g.arabic}</span>
            </p>
            <ul className="grid grid-cols-2 gap-1.5">
              {itemsOf(g.id).map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} onClick={onClose} className={({ isActive }) => cx('flex min-h-[52px] items-center gap-2.5 rounded-[14px] px-3 py-2 text-[14px] font-medium leading-tight', isActive ? 'bg-primary text-primary-ink' : 'bg-surface text-ink active:bg-surface-2')}>
                    {({ isActive }) => (
                      <>
                        <Icon name={n.icon} size={19} className={isActive ? '' : 'text-primary'} />
                        <span className="min-w-0">{n.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="mt-2 overflow-hidden rounded-[16px] bg-surface">
          <div className="border-b border-line px-1 py-1" onClick={onClose}>
            <AccountRow />
          </div>
          <ul className="divide-y divide-line">
            {SECONDARY.filter((s) => s.to !== '/compte').map((s) => (
              <li key={s.to}>
                <Link to={s.to} onClick={onClose} className="flex h-12 items-center gap-3 px-3.5 text-[14.5px] font-medium active:bg-surface-2">
                  <Icon name={s.icon} size={19} className="text-muted" /> {s.label}
                  <Icon name="chevronRight" size={16} className="ml-auto text-muted" />
                </Link>
              </li>
            ))}
            <li>
              <ThemeButton withLabel className="h-12 w-full !justify-start px-3.5 text-ink" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Mise en page ---------------- */
const RAIL_KEY = 'ruh-rail'

export function Layout() {
  useApplyTheme()
  const [moreOpen, setMoreOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [rail, setRail] = useState(() => {
    try {
      return localStorage.getItem(RAIL_KEY) === '1'
    } catch {
      return false
    }
  })
  const location = useLocation()

  const setRailPref = (v: boolean) => {
    setRail(v)
    try {
      localStorage.setItem(RAIL_KEY, v ? '1' : '0')
    } catch {
      /* stockage indisponible : la préférence ne sera simplement pas retenue */
    }
  }

  useEffect(() => {
    setMoreOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={cx('shell min-h-dvh', rail && 'is-rail')}>
      <a href="#contenu" className="sr-only z-[80] rounded-lg bg-primary px-4 py-2 text-primary-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>

      {!rail && <FullSidebar onSearch={() => setSearchOpen(true)} onCollapse={() => setRailPref(true)} />}
      <Rail onSearch={() => setSearchOpen(true)} onExpand={() => setRailPref(false)} xlOnly={false} />
      {rail && <Rail onSearch={() => setSearchOpen(true)} onExpand={() => setRailPref(false)} xlOnly />}

      <MobileHeader onSearch={() => setSearchOpen(true)} />

      <main
        id="contenu"
        className="relative px-4 pb-[calc(var(--bottom-nav)+2rem)] pt-[calc(3.5rem+env(safe-area-inset-top,0px)+1.25rem)] sm:px-6 md:pb-20 md:pl-[calc(var(--shell-left)+2.25rem)] md:pr-9 md:pt-9 xl:pl-[calc(var(--shell-left)+3.5rem)] xl:pr-14 xl:pt-11"
      >
        <div key={location.pathname} className="page-in mx-auto max-w-[1080px]">
          <Outlet />
        </div>
      </main>

      <BottomNav onMore={() => setMoreOpen((o) => !o)} moreOpen={moreOpen} />
      {moreOpen && <MoreSheet onClose={() => setMoreOpen(false)} />}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AudioBar />
      <Toaster />
    </div>
  )
}

