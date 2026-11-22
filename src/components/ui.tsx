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

/* ---------------- Cartes & mise en page ---------------- */
export function Card({ children, className = '', as: As = 'div', ...rest }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article'; id?: string }) {
  return (
    <As className={cx('rounded-2xl border border-line bg-surface shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-16px_rgba(15,76,58,0.25)]', className)} {...rest}>
      {children}
    </As>
  )
}

export function PageHeader({ title, subtitle, arabic, icon, children, back }: { title: string; subtitle?: string; arabic?: string; icon?: string; children?: ReactNode; back?: { to: string; label: string } }) {
  return (
    <header className="relative mb-6 overflow-hidden rounded-3xl bg-primary px-5 py-7 text-white sm:px-8 sm:py-9 dark:bg-[#0f2d24]">
      <div className="pattern-bg pattern-layer !opacity-[0.12] invert" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#d6ad5c]/20 blur-3xl" />
      <div className="relative">
        {back && (
          <Link to={back.to} className="mb-3 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <Icon name="arrowLeft" size={16} /> {back.label}
          </Link>
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[#e8cf98]">
              {icon && <Icon name={icon} size={18} />}
              {arabic && <span className="arabic text-xl leading-none">{arabic}</span>}
            </div>
            <h1 className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-2 max-w-2xl text-[15px] text-white/80 sm:text-base">{subtitle}</p>}
          </div>
        </div>
        {children && <div className="mt-5">{children}</div>}
      </div>
    </header>
  )
}

export function SectionTitle({ children, action, id }: { children: ReactNode; action?: ReactNode; id?: string }) {
  return (
    <div className="mb-3 mt-8 flex items-end justify-between gap-3 first:mt-0" id={id}>
      <h2 className="font-display text-2xl font-semibold text-ink">{children}</h2>
      {action}
    </div>
  )
}

/* ---------------- Boutons ---------------- */
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger'
const btnBase = 'tap-pop inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none select-none'
const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-primary text-primary-ink hover:brightness-110',
  secondary: 'border border-line bg-surface text-ink hover:bg-surface-2',
  ghost: 'text-ink hover:bg-surface-2',
  gold: 'bg-gold text-white hover:brightness-110 dark:text-[#1b1406]',
  danger: 'border border-danger/30 bg-danger-soft text-danger hover:brightness-95',
}
const btnSizes = { sm: 'h-9 px-3 text-sm', md: 'h-11 px-4 text-[15px]', lg: 'h-12 px-5 text-base' }

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
      {icon && <Icon name={icon} size={18} />}
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
      className={cx('tap-pop inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors', active ? 'bg-gold-soft text-gold' : 'text-muted hover:bg-surface-2 hover:text-ink', className)}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}

/* ---------------- Badges & progression ---------------- */
export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'gold' | 'danger'; className?: string }) {
  const tones = {
    neutral: 'bg-surface-2 text-muted',
    green: 'bg-primary-soft text-primary',
    gold: 'bg-gold-soft text-gold',
    danger: 'bg-danger-soft text-danger',
  }
  return <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[tone], className)}>{children}</span>
}

export function ProgressBar({ value, className = '', label }: { value: number; className?: string; label?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className={cx('h-2 w-full overflow-hidden rounded-full bg-surface-2', className)} role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-[width] duration-700 ease-out" style={{ width: `${v}%` }} />
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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-white/15" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#d6ad5c"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (v / 100) * c}
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(.2,.7,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

/* ---------------- États ---------------- */
export function Loader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted" role="status" aria-live="polite">
      <svg width="40" height="40" viewBox="0 0 40 40" className="animate-spin [animation-duration:2.4s]">
        <path d="M20 3l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold" />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
        <Icon name="alert" />
      </span>
      <p className="max-w-md text-muted">{message}</p>
      {onRetry && (
        <Button variant="secondary" icon="refresh" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </Card>
  )
}

export function EmptyState({ icon = 'sparkle', title, text, action }: { icon?: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line px-6 py-10 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold">
        <Icon name={icon} />
      </span>
      <p className="font-semibold">{title}</p>
      {text && <p className="max-w-sm text-sm text-muted">{text}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

/* ---------------- Encadrés ---------------- */
export function Note({ tone = 'info', title, children }: { tone?: 'info' | 'tip' | 'warning' | 'scholar' | 'gentle'; title?: string; children: ReactNode }) {
  const map = {
    info: { icon: 'info', cls: 'border-primary/20 bg-primary-soft/60', ic: 'text-primary', t: 'Bon à savoir' },
    tip: { icon: 'sparkle', cls: 'border-gold/30 bg-gold-soft/60', ic: 'text-gold', t: 'Conseil' },
    warning: { icon: 'alert', cls: 'border-danger/25 bg-danger-soft/60', ic: 'text-danger', t: 'Attention' },
    scholar: { icon: 'graduation', cls: 'border-line bg-surface-2', ic: 'text-ink', t: 'Avis des savants' },
    gentle: { icon: 'heart', cls: 'border-gold/30 bg-gold-soft/40', ic: 'text-gold', t: 'Avec douceur' },
  }[tone]
  return (
    <div className={cx('my-4 flex gap-3 rounded-2xl border p-4', map.cls)}>
      <Icon name={map.icon} className={cx('mt-0.5', map.ic)} />
      <div className="min-w-0 text-[15.5px] leading-relaxed">
        <p className="mb-1 font-semibold">{title ?? map.t}</p>
        <div className="text-ink/90">{children}</div>
      </div>
    </div>
  )
}

/* ---------------- Texte arabe + translittération + traduction ---------------- */
export function ArabicBlock({ arabic, translit, translation, source, size = 'text-3xl', className = '' }: { arabic: string; translit?: string; translation?: string; source?: string; size?: string; className?: string }) {
  return (
    <div className={cx('rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5', className)}>
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
    <div className={cx('no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1', className)} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            'tap-pop inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors',
            value === t.id ? 'bg-primary text-primary-ink shadow-sm' : 'bg-surface text-muted ring-1 ring-line hover:text-ink',
          )}
        >
          {t.icon && <Icon name={t.icon} size={16} />}
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-2">
      <span className="text-[15px]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cx('relative h-7 w-12 shrink-0 rounded-full transition-colors', checked ? 'bg-primary' : 'bg-line')}
      >
        <span className={cx('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-6' : 'translate-x-1')} />
      </button>
    </label>
  )
}

/* ---------------- Modale / feuille ---------------- */
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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="animate-in relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-surface p-5 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
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
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-6" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="animate-in pointer-events-auto flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-bg shadow-lg">
          <Icon name="checkCircle" size={16} className="text-gold" /> {t.text}
        </div>
      ))}
    </div>
  )
}

/* ---------------- Tuile de navigation ---------------- */
export function Tile({ to, icon, title, text, badge, arabic }: { to: string; icon: string; title: string; text?: string; badge?: ReactNode; arabic?: string }) {
  return (
    <Link
      to={to}
      className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_30px_-18px_rgba(15,76,58,0.45)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-ink">
          <Icon name={icon} />
        </span>
        {arabic && <span className="arabic text-lg text-gold">{arabic}</span>}
        {badge}
      </div>
      <p className="font-semibold leading-snug">{title}</p>
      {text && <p className="text-sm leading-snug text-muted">{text}</p>}
      <Icon name="arrowRight" size={16} className="mt-auto self-end text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold" />
    </Link>
  )
}
