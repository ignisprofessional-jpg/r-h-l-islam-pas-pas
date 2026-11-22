import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { NAV } from '../lib/nav'
import { useApp } from '../lib/store'
import { search } from '../lib/search'
import { useMediaQuery } from '../lib/hooks'
import { Icon } from './Icon'
import { AudioBar } from './AudioBar'
import { Toaster, cx } from './ui'
import { useSync } from '../lib/sync'
import { STATUS_DOT } from '../lib/syncLabels'

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Rûh — accueil">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-[#e8cf98] shadow-inner dark:bg-[#0f2d24]">
        <svg viewBox="0 0 40 40" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 4l4.2 10.2L34.4 18.4 24.2 22.6 20 32.8l-4.2-10.2L5.6 18.4l10.2-4.2z" />
          <circle cx="20" cy="18.4" r="4.2" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="flex items-baseline gap-2 font-display text-[22px] font-semibold text-ink">Rûh<span className="arabic text-base font-normal text-gold">روح</span></span>
          <span className="block text-[12.5px] text-muted">l'islam pas à pas</span>
        </span>
      )}
    </Link>
  )
}

function ThemeToggle() {
  const theme = useApp((s) => s.theme)
  const setTheme = useApp((s) => s.setTheme)
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)')
  const dark = theme === 'dark' || (theme === 'system' && systemDark)
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="tap-pop flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-ink"
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={dark ? 'Mode clair' : 'Mode sombre'}
    >
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  )
}

function useApplyTheme() {
  const theme = useApp((s) => s.theme)
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    const dark = theme === 'dark' || (theme === 'system' && systemDark)
    document.documentElement.classList.toggle('dark', dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b1512' : '#0F4C3A')
  }, [theme, systemDark])
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const groups = useMemo(() => [...new Set(NAV.map((n) => n.group))], [])
  return (
    <nav aria-label="Navigation principale" className="space-y-5">
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted/80">{g}</p>
          <ul className="space-y-0.5">
            {NAV.filter((n) => n.group === g).map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cx(
                      'group flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium transition-colors',
                      isActive ? 'bg-primary text-primary-ink shadow-sm' : 'text-ink/80 hover:bg-surface-2 hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon name={n.icon} size={18} className={isActive ? '' : 'text-primary/80 group-hover:text-primary'} />
                      {n.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
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
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-3 pt-[8vh] sm:p-6 sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Recherche">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="animate-in relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
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
            placeholder="Rechercher un cours, une sourate, une invocation, une question…"
            className="h-14 w-full bg-transparent text-[16px] outline-none placeholder:text-muted"
            aria-label="Rechercher"
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-xs text-muted sm:block">Échap</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!q && (
            <div className="p-3 text-sm text-muted">
              <p className="mb-2 font-semibold text-ink">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {['Al-Fâtiha', 'ablutions', 'tachahhoud', 'shahada', 'Ramadan', 'patience', 'porc', 'Fajr'].map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="rounded-full bg-surface-2 px-3 py-1 text-ink hover:bg-primary-soft">
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
                  className={cx('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left', active === i ? 'bg-primary-soft' : '')}
                >
                  <Icon name={r.icon} size={18} className="mt-0.5 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.title}</span>
                    {r.text && <span className="block truncate text-sm text-muted">{r.text}</span>}
                  </span>
                  <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-muted">{r.kind}</span>
                </button>
              </li>
            ))}
            {extra && (
              <li>
                <button
                  onMouseEnter={() => setActive(results.length)}
                  onClick={() => go(extra.to)}
                  className={cx('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left', active === results.length ? 'bg-gold-soft' : '')}
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

function SyncFooter({ name }: { name: string }) {
  const { status, email } = useSync()
  const d = STATUS_DOT[status]
  return (
    <Link to="/compte" className="flex items-center gap-2 border-t border-line px-5 py-3 text-xs text-muted hover:bg-surface-2">
      <span className={cx('h-2 w-2 shrink-0 rounded-full', d.dot)} />
      <span className="min-w-0 truncate">
        {name && <strong className="text-ink">{name} · </strong>}
        {email ? d.text : status === 'off' ? 'Progression enregistrée sur cet appareil' : 'Se connecter pour synchroniser'}
      </span>
    </Link>
  )
}

/* ---------------- Mise en page ---------------- */
export function Layout() {
  useApplyTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const name = useApp((s) => s.profile.name)

  useEffect(() => {
    setMenuOpen(false)
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const bottom = [
    { to: '/', label: 'Accueil', icon: 'home' },
    { to: '/coran', label: 'Coran', icon: 'book' },
    { to: '/priere', label: 'Prière', icon: 'prayer' },
    { to: '/parcours', label: 'Apprendre', icon: 'graduation' },
  ]

  return (
    <div className="min-h-dvh">
      <a href="#contenu" className="sr-only z-[80] rounded-lg bg-primary px-4 py-2 text-primary-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>

      {/* Barre latérale ordinateur */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-line bg-surface/80 backdrop-blur lg:flex">
        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="px-4 pb-3">
          <button onClick={() => setSearchOpen(true)} className="flex h-11 w-full items-center gap-2 rounded-xl border border-line bg-bg px-3 text-sm text-muted hover:border-gold/50">
            <Icon name="search" size={18} /> Rechercher…
            <kbd className="ml-auto rounded border border-line px-1.5 text-[11px]">Ctrl K</kbd>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <NavList />
        </div>
        <SyncFooter name={name} />
      </aside>

      {/* En-tête mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line bg-bg/85 px-4 py-2.5 backdrop-blur lg:hidden" style={{ paddingTop: 'max(0.625rem, env(safe-area-inset-top))' }}>
        <Logo />
        <div className="flex items-center">
          <button onClick={() => setSearchOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-2" aria-label="Rechercher">
            <Icon name="search" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main id="contenu" className="relative px-4 pb-36 pt-4 sm:px-6 lg:ml-72 lg:px-10 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>

      {/* Navigation basse mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} aria-label="Navigation mobile">
        <ul className="grid grid-cols-5">
          {bottom.map((b) => (
            <li key={b.to}>
              <NavLink to={b.to} end={b.to === '/'} className={({ isActive }) => cx('flex h-[64px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold', isActive ? 'text-primary' : 'text-muted')}>
                {({ isActive }) => (
                  <>
                    <span className={cx('flex h-8 w-12 items-center justify-center rounded-full transition-colors', isActive && 'bg-primary-soft')}>
                      <Icon name={b.icon} size={20} />
                    </span>
                    {b.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button onClick={() => setMenuOpen(true)} className="flex h-[64px] w-full flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-muted" aria-label="Ouvrir le menu complet" aria-expanded={menuOpen}>
              <span className="flex h-8 w-12 items-center justify-center rounded-full">
                <Icon name="menu" size={20} />
              </span>
              Menu
            </button>
          </li>
        </ul>
      </nav>

      {/* Tiroir mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="animate-in absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-line bg-surface px-4 pb-8 pt-3" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
            <div className="mb-3 flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-2" aria-label="Fermer le menu">
                <Icon name="x" />
              </button>
            </div>
            <NavList onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AudioBar />
      <Toaster />
    </div>
  )
}
