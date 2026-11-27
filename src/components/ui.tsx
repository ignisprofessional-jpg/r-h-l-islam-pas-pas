import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { create } from 'zustand'
import { Icon } from './Icon'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/* ---------------- Texte enrichi minimal : **gras**, *italique* ---------------- */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p.startsWith('*') && p.length > 2 ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>,
      )}
    </>
  )
}

/* ---------------- Surfaces & mise en page ---------------- */
export function Card({ children, className = '', as: As = 'div', ...rest }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article'; id?: string }) {
  return (
    <As className={cx('card', className)} {...rest}>
      {children}
    </As>
  )
}

/** Petit losange doré : le motif récurrent de Rûh (filets, séparateurs). */
export function Diamond({ size = 9, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" className={cx('shrink-0', className)} aria-hidden>
      <path d="M5 0.6 9.4 5 5 9.4 0.6 5z" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

/** Filet fin avec un losange au centre. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={cx('rule-ornament', className)} aria-hidden>
      <Diamond />
    </div>
  )
}

export function PageHeader({ title, subtitle, arabic, children, back }: { title: string; subtitle?: string; arabic?: string; icon?: string; children?: ReactNode; back?: { to: string; label: string } }) {
  return (
    <header className="mb-5 sm:mb-8">
      {back && (
        <Link to={back.to} className="-ml-1 mb-2 hidden h-9 items-center gap-1.5 rounded-lg px-1 text-[14px] font-medium text-muted hover:text-ink sm:mb-3 lg:inline-flex">
          <Icon name="arrowLeft" size={16} /> {back.label}
        </Link>
      )}
      <div className="flex items-end justify-between gap-4 sm:gap-8">
        <div className="min-w-0 max-w-3xl">
          <h1 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[44px] sm:leading-[1.05]">{title}</h1>
          {subtitle && <p className="mt-2 line-clamp-2 max-w-[62ch] text-[15px] leading-relaxed text-muted sm:mt-3 sm:line-clamp-none sm:text-[17px]">{subtitle}</p>}
        </div>
        {arabic && (
          <p className="arabic max-w-[40%] shrink-0 text-right text-[24px] leading-[1.35] text-gold sm:text-[30px] lg:text-[38px]" lang="ar">
            {arabic}
          </p>
        )}
      </div>
      {children && <div className="mt-4 sm:mt-6">{children}</div>}
    </header>
  )
}

export function SectionTitle({ children, action, id }: { children: ReactNode; action?: ReactNode; id?: string }) {
  return (
    <div className="mb-2.5 mt-7 flex items-baseline justify-between gap-4 px-1 sm:mb-3 sm:mt-10" id={id}>
      <h2 className="text-[19px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[21px]">{children}</h2>
      {action && <div className="shrink-0 text-[14px]">{action}</div>}
    </div>
  )
}

/** Lien d’action discret, à droite d’un titre de section. */
export function MoreLink({ to, children = 'Tout voir' }: { to: string; children?: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline">
      {children}
      <Icon name="chevronRight" size={15} />
    </Link>
  )
}

/* ---------------- Boutons ---------------- */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger'
const btnBase = 'tap-pop inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none select-none'
const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-primary text-primary-ink hover:bg-[color-mix(in_srgb,var(--primary)_86%,black)]',
  secondary: 'bg-surface text-ink ring-1 ring-line hover:ring-ink/25',
  ghost: 'text-ink hover:bg-ink/[0.05]',
  gold: 'bg-gold text-white hover:brightness-110 dark:text-[#1b1406]',
  danger: 'bg-danger-soft text-danger hover:brightness-95',
}
const btnSizes = { sm: 'h-9 px-3.5 text-[14px]', md: 'h-11 px-5 text-[15px]', lg: 'h-12 px-6 text-[16px]' }

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...rest
}: { children?: ReactNode; variant?: BtnVariant; size?: keyof typeof btnSizes; icon?: string; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cx(btnBase, btnVariants[variant], btnSizes[size], className)} {...rest}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  )
}

export function LinkButton({ to, children, variant = 'primary', size = 'md', icon, className = '' }: { to: string; children: ReactNode; variant?: BtnVariant; size?: keyof typeof btnSizes; icon?: string; className?: string }) {
  return (
    <Link to={to} className={cx(btnBase, btnVariants[variant], btnSizes[size], className)}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
    </Link>
  )
}

export function IconButton({ icon, label, onClick, active, className = '', size = 18 }: { icon: string; label: string; onClick?: () => void; active?: boolean; className?: string; size?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cx('tap-pop inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors', active ? 'bg-gold-soft text-gold' : 'text-muted hover:bg-ink/[0.05] hover:text-ink', className)}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}

/* ---------------- Badges & progression ---------------- */
export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'gold' | 'danger'; className?: string }) {
  const tones = {
    neutral: 'bg-ink/[0.06] text-muted',
    green: 'bg-primary-soft text-primary',
    gold: 'bg-gold-soft text-gold',
    danger: 'bg-danger-soft text-danger',
  }
  return <span className={cx('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold', tones[tone], className)}>{children}</span>
}

export function ProgressBar({ value, className = '', label }: { value: number; className?: string; label?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={cx('h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.08]', className)} role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out" style={{ width: `${v}%` }} />
    </div>
  )
}

export function ProgressRing({ value, size = 96, stroke = 8, children }: { value: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="opacity-15" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--gold)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (v / 100) * c} style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(.2,.7,.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

/* ---------------- États ---------------- */
export function Loader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted" role="status" aria-live="polite">
      <svg width="36" height="36" viewBox="0 0 40 40" className="animate-spin [animation-duration:2.4s]">
        <path d="M20 3l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[20px] bg-danger-soft/50 px-6 py-8 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full text-danger ring-1 ring-danger/30">
        <Icon name="alert" size={19} />
      </span>
      <p className="max-w-md text-ink/80">{message}</p>
      {onRetry && (
        <Button variant="secondary" icon="refresh" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  )
}

export function EmptyState({ icon = 'sparkle', title, text, action }: { icon?: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-5 py-7 text-center sm:px-8 sm:py-10">
      <span className="flex h-11 w-11 items-center justify-center rounded-full text-gold ring-1 ring-gold/40">
        <Icon name={icon} size={19} />
      </span>
      <p className="mt-1 font-display text-[19px] font-medium">{title}</p>
      {text && <p className="max-w-sm text-[14.5px] text-muted">{text}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

/* ---------------- Encadrés ---------------- */
export function Note({ tone = 'info', title, children }: { tone?: 'info' | 'tip' | 'warning' | 'scholar' | 'gentle'; title?: string; children: ReactNode }) {
  const map = {
    info: { icon: 'info', cls: 'bg-primary-soft/55', ic: 'text-primary', t: 'Bon à savoir' },
    tip: { icon: 'sparkle', cls: 'bg-gold-soft/55', ic: 'text-gold', t: 'Conseil' },
    warning: { icon: 'alert', cls: 'bg-danger-soft/70', ic: 'text-danger', t: 'Attention' },
    scholar: { icon: 'graduation', cls: 'bg-surface-2/80', ic: 'text-ink', t: 'Avis des savants' },
    gentle: { icon: 'heart', cls: 'bg-gold-soft/40', ic: 'text-gold', t: 'Avec douceur' },
  }[tone]
  return (
    <div className={cx('my-4 flex gap-3 rounded-[16px] px-4 py-3.5 sm:my-5 sm:px-5 sm:py-4', map.cls)}>
      <Icon name={map.icon} size={19} className={cx('mt-[3px]', map.ic)} />
      <div className="min-w-0 text-[15px] leading-relaxed sm:text-[15.5px]">
        <p className="mb-0.5 font-semibold">{title ?? map.t}</p>
        <div className="text-ink/85">{children}</div>
      </div>
    </div>
  )
}

/* ---------------- Texte arabe + translittération + traduction ---------------- */
export function ArabicBlock({ arabic, translit, translation, source, size = 'text-3xl', className = '' }: { arabic: string; translit?: string; translation?: string; source?: string; size?: string; className?: string }) {
  return (
    <div className={cx('rounded-[18px] bg-surface-2 px-4 py-4 sm:px-6 sm:py-5', className)}>
      <p className={cx('arabic text-right text-ink', size)} lang="ar">
        {arabic}
      </p>
      {translit && <p className="mt-3 text-[15px] italic text-accent">{translit}</p>}
      {translation && <p className="mt-2 text-[15.5px] text-ink/90">« {translation} »</p>}
      {source && (
        <p className="mt-3 flex items-start gap-1.5 text-xs text-muted">
          <Icon name="book" size={14} className="mt-0.5" /> <span>{source}</span>
        </p>
      )}
    </div>
  )
}

/* ---------------- Onglets ---------------- */
export function Tabs<T extends string>({ tabs, value, onChange, className = '' }: { tabs: { id: T; label: string; icon?: string }[]; value: T; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={cx('no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0', className)}>
      <div className="inline-flex gap-1 rounded-full bg-ink/[0.06] p-1" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={value === t.id}
            onClick={() => onChange(t.id)}
            className={cx(
              'tap-pop inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[14px] transition-colors',
              value === t.id ? 'bg-ink font-semibold text-bg' : 'font-medium text-muted hover:text-ink',
            )}
          >
            {t.icon && <Icon name={t.icon} size={16} />}
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3 py-2">
      <span className="text-[15px]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cx('relative h-7 w-12 shrink-0 rounded-full transition-colors', checked ? 'bg-primary' : 'bg-ink/15')}
      >
        <span className={cx('absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform', checked ? 'translate-x-6' : 'translate-x-1')} />
      </button>
    </label>
  )
}

/* ---------------- Feuille / modale ---------------- */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fade-in absolute inset-0 bg-[#0b1a14]/45" onClick={onClose} />
      <div className="sheet-in scroll-contain relative max-h-[88dvh] w-full overflow-y-auto rounded-t-[24px] bg-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-[0_24px_60px_-20px_rgba(10,30,22,0.45)] sm:max-w-2xl sm:rounded-[24px] sm:p-7">
        <div className="mx-auto -mt-2 mb-3 h-1 w-10 rounded-full bg-ink/15 sm:hidden" />
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-[26px] font-medium leading-tight">{title}</h2>
          <IconButton icon="x" label="Fermer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

/* ---------------- Notifications ---------------- */
interface ToastState { items: { id: number; text: string }[]; push: (text: string) => void }
export const useToast = create<ToastState>((set) => ({
  items: [],
  push: (text) => {
    const id = Date.now() + Math.random()
    set((s) => ({ items: [...s.items, { id, text }] }))
    setTimeout(() => set((s) => ({ items: s.items.filter((i) => i.id !== id) })), 2600)
  },
}))
export const toast = (text: string) => useToast.getState().push(text)

export function Toaster() {
  const items = useToast((s) => s.items)
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--bottom-nav)+1rem)] z-[60] flex flex-col items-center gap-2 px-4 md:bottom-6 md:left-[var(--shell-left)]" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="animate-in pointer-events-auto flex items-center gap-2 rounded-full bg-deep px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_12px_30px_-12px_rgba(10,30,22,0.5)]">
          <Icon name="checkCircle" size={16} className="text-gold-bright" /> {t.text}
        </div>
      ))}
    </div>
  )
}

/* ---------------- Tuile de navigation (ligne horizontale) ---------------- */
export function Tile({ to, icon, title, text, badge, arabic }: { to: string; icon: string; title: string; text?: string; badge?: ReactNode; arabic?: string }) {
  return (
    <Link to={to} className="card group flex h-full items-start gap-3.5 p-4 transition-transform active:scale-[0.99] sm:p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon name={icon} size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="font-semibold leading-snug">{title}</span>
          {arabic && <span className="arabic shrink-0 text-[17px] leading-none text-gold">{arabic}</span>}
        </span>
        {text && <span className="mt-1 block text-[14px] leading-snug text-muted">{text}</span>}
        {badge && <span className="mt-2 block">{badge}</span>}
      </span>
      <Icon name="chevronRight" size={17} className="mt-0.5 hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gold sm:block" />
    </Link>
  )
}

/* ---------------- Listes éditoriales ---------------- */
/** Liste séparée par des filets, sans boîte. */
export function List({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <ul className={cx('card divide-y divide-line overflow-hidden', className)}>{children}</ul>
}
