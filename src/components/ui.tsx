import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark'

export function Button({ className, variant = 'primary', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={cn('inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', variant === 'primary' && 'bg-moss text-white shadow-soft hover:-translate-y-0.5 hover:bg-ink', variant === 'secondary' && 'border border-ink/12 bg-paper text-ink hover:border-ink/25 hover:bg-white', variant === 'ghost' && 'text-muted hover:bg-ink/7 hover:text-ink', variant === 'danger' && 'bg-terracotta/10 text-terracotta hover:bg-terracotta/15', variant === 'dark' && 'bg-ink text-paper hover:bg-moss', className)} {...props}>{children}</button>
}

export function IconButton({ label, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className={cn('inline-flex h-11 w-11 items-center justify-center rounded-[12px] text-muted transition hover:bg-ink/7 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2', className)} {...props}>{children}</button>
}

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'lavender'; className?: string }) {
  return <span className={cn('inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]', tone === 'neutral' && 'bg-ink/7 text-muted', tone === 'accent' && 'bg-citrus text-ink', tone === 'success' && 'bg-fern/20 text-moss', tone === 'warning' && 'bg-peach/35 text-terracotta', tone === 'lavender' && 'bg-lavender/25 text-moss', className)}>{children}</span>
}

export function Card({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-[18px] border border-ink/10 bg-paper shadow-soft', className)} {...props}>{children}</div>
}

export function FieldLabel({ children, htmlFor, hint }: { children: ReactNode; htmlFor?: string; hint?: string }) {
  return <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold tracking-[0.04em] text-muted">{children}{hint && <span className="ml-2 font-normal text-muted/75">{hint}</span>}</label>
}

export function TextField({ label, hint, error, id, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string }) {
  const generatedId = useId()
  const fieldId = id ?? props.name ?? generatedId
  return <div>{label && <FieldLabel htmlFor={fieldId} hint={hint}>{label}</FieldLabel>}<input id={fieldId} className={cn('h-11 w-full rounded-[10px] border border-ink/12 bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-moss focus:ring-2 focus:ring-moss/15', error && 'border-terracotta focus:border-terracotta focus:ring-terracotta/15', className)} {...props} />{error && <p className="mt-1.5 text-xs font-medium text-terracotta" role="alert">{error}</p>}</div>
}

export function SelectField({ label, id, className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  const generatedId = useId()
  const fieldId = id ?? props.name ?? generatedId
  return <div>{label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}<select id={fieldId} className={cn('h-11 w-full appearance-none rounded-[10px] border border-ink/12 bg-white px-3.5 text-sm text-ink outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/15', className)} {...props}>{children}</select></div>
}

export function TextAreaField({ label, id, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  const generatedId = useId()
  const fieldId = id ?? props.name ?? generatedId
  return <div>{label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}<textarea id={fieldId} className={cn('min-h-24 w-full resize-y rounded-[10px] border border-ink/12 bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-moss focus:ring-2 focus:ring-moss/15', className)} {...props} /></div>
}

export function Modal({ open, onClose, title, eyebrow, children, size = 'md' }: { open: boolean; onClose: () => void; title: string; eyebrow?: string; children: ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()
  useEffect(() => { onCloseRef.current = onClose }, [onClose])
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus()
    })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)) : []
      if (!focusable.length) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [open])
  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" role="presentation" data-modal-surface onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><div ref={dialogRef} role="dialog" tabIndex={-1} aria-modal="true" aria-labelledby={titleId} className={cn('native-modal max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] border border-white/40 bg-paper p-5 shadow-lift sm:rounded-[24px] sm:p-7', size === 'sm' && 'sm:max-w-md', size === 'md' && 'sm:max-w-xl', size === 'lg' && 'sm:max-w-3xl')}><div className="mb-6 flex items-start justify-between gap-4"><div>{eyebrow && <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-moss">{eyebrow}</p>}<h2 id={titleId} className="font-display text-2xl tracking-tight text-ink">{title}</h2></div><IconButton label="Close dialog" onClick={onClose}><X size={18} /></IconButton></div>{children}</div></div>
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action?: ReactNode }) {
  return <div className="flex min-h-48 flex-col items-center justify-center rounded-[18px] border border-dashed border-ink/15 bg-paper px-6 py-10 text-center"><div className="signal-line mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-citrus/45 text-moss">{icon}</div><h3 className="font-display text-xl tracking-tight text-ink">{title}</h3><p className="mt-1 max-w-sm text-sm leading-6 text-muted">{description}</p>{action && <div className="mt-5">{action}</div>}</div>
}

export function ProgressBar({ value, color = 'bg-moss', className }: { value: number; color?: string; className?: string }) {
  return <div className={cn('h-2 overflow-hidden rounded-full bg-ink/10', className)}><div className={cn('h-full rounded-full transition-all duration-[420ms] ease-out', color)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>
}

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div>{eyebrow && <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-moss">{eyebrow}</p>}<h2 className="font-display text-2xl tracking-tight text-ink sm:text-[1.7rem]">{title}</h2>{description && <p className="mt-1 text-sm leading-6 text-muted">{description}</p>}</div>{action}</div>
}

export function StatCard({ label, value, detail, icon, accent = 'bg-citrus/45' }: { label: string; value: string; detail?: string; icon: ReactNode; accent?: string }) {
  return <Card className="relative min-h-[132px] overflow-hidden p-4 sm:p-5"><div className={cn('absolute -right-5 -top-6 h-20 w-20 rounded-full opacity-70 blur-2xl', accent)} /><div className="relative"><div className="mb-4 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{label}</p><span className="text-moss">{icon}</span></div><p className="font-display text-3xl tracking-tight text-ink">{value}</p>{detail && <p className="mt-1 truncate text-xs text-muted">{detail}</p>}</div></Card>
}
