import type { TaskPriority, TaskStatus } from './types'

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

export const isDateKey = (value: unknown): value is string => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export const isTimeValue = (value: unknown): value is string => typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)

export const isTimestamp = (value: unknown): value is string => typeof value === 'string' && value.length <= 100 && !Number.isNaN(new Date(value).getTime())

export const isHexColor = (value: unknown): value is string => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)

export const uid = (prefix = 'item') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const fromDateKey = (key: string) => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const shiftDate = (date: Date | string, amount: number) => {
  const next = typeof date === 'string' ? fromDateKey(date) : new Date(date)
  next.setDate(next.getDate() + amount)
  return toDateKey(next)
}

export const todayKey = () => toDateKey(new Date())

export const dateKeyFromTimestamp = (value?: string) => {
  if (!isTimestamp(value)) return undefined
  return toDateKey(new Date(value))
}

export const formatDate = (key: string, options?: Intl.DateTimeFormatOptions) =>
  fromDateKey(key).toLocaleDateString('en-US', options ?? { month: 'short', day: 'numeric' })

export const formatLongDate = (date = new Date()) =>
  date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

export const formatWeekday = (key: string, style: 'short' | 'long' = 'short') =>
  fromDateKey(key).toLocaleDateString('en-US', { weekday: style })

export const formatTime = (value?: string) => {
  if (!value) return ''
  const [hours, minutes] = value.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export const timeToMinutes = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

export const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60) % 24
  const remainder = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

export const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`
}

export const getWeekDays = (anchor = new Date(), weekStartsOn: 0 | 1 = 1) => {
  const date = new Date(anchor)
  const day = date.getDay()
  const offset = weekStartsOn === 1 ? (day + 6) % 7 : day
  date.setDate(date.getDate() - offset)
  return Array.from({ length: 7 }, (_, index) => shiftDate(date, index))
}

export const getLastDays = (count: number, anchor = new Date()) =>
  Array.from({ length: count }, (_, index) => shiftDate(anchor, index - (count - 1)))

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'EF'

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export const statusLabel: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  today: 'Today',
  'in-progress': 'In progress',
  done: 'Done',
}

export const priorityLabel: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const isSameDay = (a: string, b: string) => a === b

export const percent = (value: number, total: number) => (total ? Math.round((value / total) * 100) : 0)

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
