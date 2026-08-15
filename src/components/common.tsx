import { ArrowRight, BarChart3, CalendarDays, Check, CheckCircle2, Clock3, Flame, Inbox, LayoutGrid, Leaf, List, Settings2, Sparkles, Target, TimerReset, type LucideIcon } from 'lucide-react'
import type { PageKey, PlannerBlock, Profile, Task, TaskCategory } from '../types'
import { cn, formatTime, getInitials, priorityLabel } from '../utils'
import { Badge, Card, EmptyState, IconButton } from './ui'

export const categoryLabel: Record<TaskCategory, string> = { work: 'Work', personal: 'Personal', health: 'Health', learning: 'Learning' }
export const categoryTone: Record<TaskCategory, string> = { work: 'bg-moss', personal: 'bg-peach', health: 'bg-fern', learning: 'bg-lavender' }

export const pageMeta: Record<PageKey, { title: string; eyebrow: string; icon: LucideIcon }> = {
  today: { title: 'Today', eyebrow: 'Your space for today', icon: Sparkles },
  tasks: { title: 'Tasks', eyebrow: 'Make the next thing clear', icon: Inbox },
  habits: { title: 'Habits', eyebrow: 'Small actions, lasting change', icon: Flame },
  goals: { title: 'Goals', eyebrow: 'Keep the long view close', icon: Target },
  planner: { title: 'Planner', eyebrow: 'Give your time a shape', icon: CalendarDays },
  focus: { title: 'Focus mode', eyebrow: 'One thing, fully here', icon: TimerReset },
  analytics: { title: 'Analytics', eyebrow: 'Notice your patterns', icon: BarChart3 },
  settings: { title: 'Settings', eyebrow: 'Make EiFlow yours', icon: Settings2 },
}

const navGroups: Array<{ label: string; items: PageKey[] }> = [
  { label: 'Flow', items: ['today', 'tasks', 'habits', 'goals'] },
  { label: 'Plan', items: ['planner', 'focus', 'analytics'] },
]

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-citrus text-ink"><Leaf size={18} strokeWidth={2.5} /></span>{!compact && <span className={cn('font-display text-xl tracking-tight', light ? 'text-paper' : 'text-ink')}>EiFlow</span>}</div>
}

export function Avatar({ name, light = false }: { name: string; light?: boolean }) {
  return <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold', light ? 'bg-citrus text-ink' : 'bg-moss text-paper')}>{getInitials(name)}</span>
}

export function Sidebar({ page, profile, onNavigate }: { page: PageKey; profile: Profile; onNavigate: (page: PageKey) => void }) {
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col bg-ink px-5 py-6 lg:flex"><div className="mb-12 px-2"><Logo light /></div><nav className="flex-1 space-y-8" aria-label="Primary navigation">{navGroups.map((group) => <div key={group.label}><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-paper/40">{group.label}</p><div className="space-y-1.5">{group.items.map((item) => { const Icon = pageMeta[item].icon; const active = page === item; return <button key={item} onClick={() => onNavigate(item)} className={cn('group flex min-h-11 w-full items-center gap-3 rounded-[12px] px-3 text-left text-sm font-semibold transition duration-200', active ? 'bg-citrus text-ink shadow-soft' : 'text-paper/60 hover:bg-white/10 hover:text-paper')}><Icon size={17} className={cn(active ? 'text-ink' : 'text-paper/45 group-hover:text-citrus')} />{pageMeta[item].title}{item === 'focus' && <span className={cn('ml-auto h-1.5 w-1.5 rounded-full', active ? 'bg-ink' : 'bg-citrus')} />}</button> })}</div></div>)}</nav><div className="rounded-[18px] border border-white/12 bg-white/7 p-4"><div className="flex items-center gap-3"><Avatar name={profile.name} light /><div className="min-w-0"><p className="truncate text-sm font-semibold text-paper">{profile.name || 'Your flow'}</p><p className="text-xs text-paper/50">Personal space</p></div></div><button onClick={() => onNavigate('settings')} className="mt-4 flex min-h-9 w-full items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-paper/55 transition hover:text-paper">Preferences <Settings2 size={14} /></button></div></aside>
}

export function MobileNav({ page, onNavigate }: { page: PageKey; onNavigate: (page: PageKey) => void }) {
  const items: PageKey[] = ['today', 'tasks', 'planner', 'focus', 'analytics']
  return <nav className="mobile-nav fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-[18px] border border-ink/12 bg-paper/95 p-2 shadow-lift backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">{items.map((item) => { const Icon = pageMeta[item].icon; return <button key={item} onClick={() => onNavigate(item)} className={cn('flex min-h-11 min-w-14 flex-col items-center justify-center gap-1 rounded-[12px] px-2 py-1.5 text-[10px] font-bold transition', page === item ? 'bg-citrus text-ink' : 'text-muted')}><Icon size={17} /><span>{item === 'analytics' ? 'Stats' : pageMeta[item].title}</span></button> })}</nav>
}

export function AppHeader({ page, profile, onNavigate }: { page: PageKey; profile: Profile; onNavigate: (page: PageKey) => void }) {
  return <header className="native-header sticky top-0 z-20 border-b border-ink/10 bg-canvas/90 px-4 py-3 backdrop-blur-xl sm:px-8 lg:px-10"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="lg:hidden"><Logo compact /></div><div className="hidden lg:block"><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-moss">{pageMeta[page].eyebrow}</p><h1 className="font-display text-2xl tracking-tight text-ink">{pageMeta[page].title}</h1></div></div><div className="flex items-center gap-2 sm:gap-4"><p className="hidden text-xs font-semibold text-muted sm:block">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p><button onClick={() => onNavigate('settings')} className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2"><Avatar name={profile.name} /></button></div></div></header>
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null
  return <div role="status" aria-live="polite" className="fixed bottom-20 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-[12px] bg-ink px-4 py-3 text-sm font-semibold text-paper shadow-lift lg:bottom-6"><CheckCircle2 size={16} className="text-citrus" />{message}<IconButton label="Dismiss notification" className="-mr-2 h-7 w-7 text-paper/60 hover:bg-white/10 hover:text-paper" onClick={onClose}><span className="text-base leading-none">×</span></IconButton></div>
}

export function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 46
  return <div className="relative h-32 w-32 shrink-0"><svg className="progress-ring h-full w-full" viewBox="0 0 112 112" fill="none"><circle cx="56" cy="56" r="46" stroke="rgba(243,247,245,0.18)" strokeWidth="8" /><circle cx="56" cy="56" r="46" stroke="#f4b36b" strokeLinecap="round" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={circumference - (circumference * score) / 100} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="font-display text-3xl text-paper">{score}</span><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-paper/60">today</span></div></div>
}

export function TaskRow({ task, onToggle, onOpen, onDelete }: { task: Task; onToggle: (task: Task) => void; onOpen: (task: Task) => void; onDelete?: (id: string) => void }) {
  return <div className="group flex min-h-16 items-center gap-3 border-b border-ink/10 py-3 last:border-0"><button aria-label={`${task.status === 'done' ? 'Reopen' : 'Complete'} ${task.title}`} onClick={() => onToggle(task)} className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss', task.status === 'done' ? 'border-moss bg-moss text-white' : 'border-ink/20 hover:border-moss')}>{task.status === 'done' && <Check size={12} strokeWidth={3} />}</button><button onClick={() => onOpen(task)} className="min-w-0 flex-1 text-left"><p className={cn('truncate text-sm font-semibold text-ink transition group-hover:text-moss', task.status === 'done' && 'text-muted line-through')}>{task.title}</p><div className="mt-1 flex items-center gap-2 text-xs text-muted"><span className={cn('h-1.5 w-1.5 rounded-full', categoryTone[task.category])} />{categoryLabel[task.category]}{task.dueTime && <><span className="text-ink/25">·</span>{formatTime(task.dueTime)}</>}</div></button><Badge tone={task.priority === 'high' ? 'warning' : task.priority === 'medium' ? 'neutral' : 'success'}>{priorityLabel[task.priority]}</Badge>{onDelete && <IconButton label={`Delete ${task.title}`} onClick={() => onDelete(task.id)} className="h-8 w-8 sm:opacity-0 sm:group-hover:opacity-100"><span className="text-sm">×</span></IconButton>}</div>
}

export function ScheduleTimeline({ blocks }: { blocks: PlannerBlock[] }) {
  if (!blocks.length) return <EmptyState icon={<CalendarDays size={20} />} title="A little room to shape" description="Add a time block in Planner and it will appear here." />
  return <div className="relative space-y-3 before:absolute before:bottom-3 before:left-[4.25rem] before:top-3 before:w-px before:bg-ink/10">{blocks.slice().sort((a, b) => a.startTime.localeCompare(b.startTime)).map((block) => <div key={block.id} className="relative flex gap-4"><div className="w-12 shrink-0 pt-2 text-right text-[11px] font-semibold text-muted">{formatTime(block.startTime)}</div><div className="relative min-w-0 flex-1 rounded-[12px] border border-ink/10 bg-paper px-3.5 py-3"><span className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full border-2 border-paper" style={{ backgroundColor: block.color }} /><p className="truncate text-sm font-semibold text-ink">{block.title}</p><p className="mt-1 text-xs text-muted">{formatTime(block.startTime)} – {formatTime(block.endTime)}</p></div></div>)}</div>
}

export function StatCard({ label, value, detail, icon, accent = 'bg-citrus/45' }: { label: string; value: string; detail?: string; icon: React.ReactNode; accent?: string }) {
  return <Card className="relative min-h-[132px] overflow-hidden p-4 sm:p-5"><div className={cn('absolute -right-5 -top-6 h-20 w-20 rounded-full opacity-70 blur-2xl', accent)} /><div className="relative"><div className="mb-4 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{label}</p><span className="text-moss">{icon}</span></div><p className="font-display text-3xl tracking-tight text-ink">{value}</p>{detail && <p className="mt-1 truncate text-xs text-muted">{detail}</p>}</div></Card>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <div className="page-enter native-page-frame mx-auto max-w-[1500px] space-y-6 px-4 py-6 pb-28 sm:px-8 sm:py-8 lg:px-10 lg:pb-10">{children}</div> }

export const statusDot = (status: string) => status === 'done' ? 'bg-fern' : status === 'in-progress' ? 'bg-lavender' : status === 'today' ? 'bg-citrus' : 'bg-ink/25'

export { ArrowRight, Clock3, LayoutGrid, List, TimerReset }
