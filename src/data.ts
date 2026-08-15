import type { AppState, Goal, Habit, PlannerBlock, Task } from './types'
import { dateKeyFromTimestamp, isDateKey, isHexColor, isTimeValue, isTimestamp, shiftDate, timeToMinutes, toDateKey, uid } from './utils'

const at = (date: string, time = '09:00') => `${date}T${time}:00`

export const createDemoState = (now = new Date()): AppState => {
  const today = toDateKey(now)
  const yesterday = shiftDate(today, -1)
  const twoDaysAgo = shiftDate(today, -2)
  const tomorrow = shiftDate(today, 1)
  const inTwoDays = shiftDate(today, 2)
  const nextWeek = shiftDate(today, 7)

  const goals: Goal[] = [
    {
      id: 'goal-sustainable-rhythm',
      title: 'Build a sustainable rhythm',
      description: 'Create a week that leaves space for meaningful work, health, and unhurried evenings.',
      category: 'Wellbeing',
      targetDate: shiftDate(today, 42),
      status: 'active',
      color: '#7AD9BC',
      createdAt: at(twoDaysAgo),
      milestones: [
        { id: 'm-1', title: 'Design an ideal week template', completed: true, dueDate: yesterday },
        { id: 'm-2', title: 'Complete 3 focused mornings', completed: true, dueDate: today },
        { id: 'm-3', title: 'Keep a 14-day evening shutdown streak', completed: false, dueDate: shiftDate(today, 10) },
        { id: 'm-4', title: 'Review and refine the rhythm', completed: false, dueDate: shiftDate(today, 28) },
      ],
    },
    {
      id: 'goal-portfolio',
      title: 'Ship the personal portfolio',
      description: 'Turn the scattered case studies into a small, thoughtful home on the web.',
      category: 'Creative work',
      targetDate: shiftDate(today, 25),
      status: 'active',
      color: '#E98272',
      createdAt: at(yesterday),
      milestones: [
        { id: 'm-5', title: 'Choose the visual direction', completed: true, dueDate: twoDaysAgo },
        { id: 'm-6', title: 'Write the case study outline', completed: false, dueDate: tomorrow },
        { id: 'm-7', title: 'Publish the first draft', completed: false, dueDate: shiftDate(today, 14) },
      ],
    },
    {
      id: 'goal-language',
      title: 'Make space for Spanish',
      description: 'Keep a playful, low-pressure learning loop alive across the week.',
      category: 'Learning',
      targetDate: shiftDate(today, 72),
      status: 'paused',
      color: '#A7B6F5',
      createdAt: at(twoDaysAgo),
      milestones: [
        { id: 'm-8', title: 'Pick a weekly conversation slot', completed: false },
        { id: 'm-9', title: 'Finish the first listening series', completed: false },
      ],
    },
  ]

  const tasks: Task[] = [
    {
      id: 'task-weekly-note',
      title: 'Send the weekly note',
      description: 'Share the small wins, the open loops, and what needs a decision next week.',
      status: 'done',
      priority: 'medium',
      category: 'work',
      dueDate: yesterday,
      dueTime: '16:00',
      createdAt: at(twoDaysAgo, '10:20'),
      completedAt: at(yesterday, '15:42'),
    },
    {
      id: 'task-portfolio-outline',
      title: 'Outline the portfolio case study',
      description: 'Give the first case study a clear arc: tension, choices, result, reflection.',
      status: 'today',
      priority: 'high',
      category: 'work',
      dueDate: today,
      dueTime: '11:30',
      createdAt: at(yesterday, '09:10'),
      goalId: 'goal-portfolio',
    },
    {
      id: 'task-morning-walk',
      title: 'Take a screen-free walk',
      description: 'A short reset before the afternoon block.',
      status: 'today',
      priority: 'low',
      category: 'health',
      dueDate: today,
      dueTime: '13:15',
      createdAt: at(twoDaysAgo, '17:40'),
      goalId: 'goal-sustainable-rhythm',
    },
    {
      id: 'task-review-brief',
      title: 'Review the launch brief',
      description: 'Mark the three decisions that need a response before tomorrow.',
      status: 'in-progress',
      priority: 'high',
      category: 'work',
      dueDate: today,
      dueTime: '15:00',
      createdAt: at(today, '08:05'),
    },
    {
      id: 'task-refill-tea',
      title: 'Refill the tea shelf',
      description: 'Add this to the next grocery run.',
      status: 'backlog',
      priority: 'low',
      category: 'personal',
      dueDate: tomorrow,
      createdAt: at(today, '08:35'),
    },
    {
      id: 'task-spanish-listening',
      title: 'Spanish listening practice',
      description: 'Twenty minutes with a familiar episode, no note-taking required.',
      status: 'backlog',
      priority: 'medium',
      category: 'learning',
      dueDate: inTwoDays,
      dueTime: '18:30',
      createdAt: at(today, '09:05'),
      goalId: 'goal-language',
    },
    {
      id: 'task-friday-retro',
      title: 'Weekly reflection',
      description: 'Close the week by noticing what gave energy and what quietly took it.',
      status: 'done',
      priority: 'medium',
      category: 'personal',
      dueDate: twoDaysAgo,
      dueTime: '17:15',
      createdAt: at(twoDaysAgo, '09:00'),
      completedAt: at(twoDaysAgo, '17:02'),
      goalId: 'goal-sustainable-rhythm',
    },
  ]

  const habits: Habit[] = [
    {
      id: 'habit-shutdown',
      name: 'Evening shutdown',
      frequency: 'daily',
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      icon: 'moon',
      color: '#7AD9BC',
      completedDates: [yesterday, twoDaysAgo, shiftDate(today, -3), shiftDate(today, -4), shiftDate(today, -5)],
      createdAt: at(twoDaysAgo),
    },
    {
      id: 'habit-focus',
      name: 'One focused morning',
      frequency: 'weekly',
      targetDays: [1, 2, 3, 4, 5],
      icon: 'sun',
      color: '#F4B36B',
      completedDates: [today, yesterday, twoDaysAgo, shiftDate(today, -4)],
      createdAt: at(twoDaysAgo),
    },
    {
      id: 'habit-move',
      name: 'Move for 20 minutes',
      frequency: 'custom',
      targetDays: [1, 3, 5],
      icon: 'footprints',
      color: '#E98272',
      completedDates: [yesterday, shiftDate(today, -3), shiftDate(today, -5)],
      createdAt: at(yesterday),
    },
    {
      id: 'habit-read',
      name: 'Read before bed',
      frequency: 'daily',
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      icon: 'book-open',
      color: '#A7B6F5',
      completedDates: [today, twoDaysAgo, shiftDate(today, -3), shiftDate(today, -6)],
      createdAt: at(twoDaysAgo),
    },
  ]

  const plannerBlocks: PlannerBlock[] = [
    { id: 'block-deep-work', title: 'Deep work · portfolio', date: today, startTime: '09:00', endTime: '11:00', category: 'deep-work', notes: 'Draft the case study narrative.', color: '#315247' },
    { id: 'block-lunch', title: 'Lunch away from desk', date: today, startTime: '12:30', endTime: '13:15', category: 'personal', notes: 'No screens if possible.', color: '#F2C5A4' },
    { id: 'block-review', title: 'Brief review', date: today, startTime: '14:30', endTime: '15:15', category: 'meeting', notes: 'Clarify owners and next decisions.', color: '#A7B6F5' },
    { id: 'block-yoga', title: 'Gentle movement', date: tomorrow, startTime: '07:30', endTime: '08:00', category: 'exercise', notes: '', color: '#E98272' },
    { id: 'block-study', title: 'Spanish listening', date: tomorrow, startTime: '18:30', endTime: '19:00', category: 'study', notes: 'Keep it light.', color: '#A7B6F5' },
    { id: 'block-planning', title: 'Weekly planning', date: nextWeek, startTime: '09:00', endTime: '09:45', category: 'personal', notes: '', color: '#F2C5A4' },
  ]

  return {
    version: 1,
    profile: {
      name: 'Maya',
      primaryGoal: 'Build a calmer, more intentional week',
      workingHours: { start: '09:00', end: '17:30' },
      energyPattern: 'steady-mornings',
      habitsToBuild: ['protect focus time', 'close the day gently'],
      onboardingComplete: true,
    },
    settings: { theme: 'light', weekStartsOn: 1 },
    tasks,
    habits,
    goals,
    plannerBlocks,
    focusSessions: [
      { id: 'focus-1', date: today, duration: 45, taskId: 'task-portfolio-outline', completedAt: at(today, '10:02') },
      { id: 'focus-2', date: yesterday, duration: 25, taskId: 'task-weekly-note', completedAt: at(yesterday, '11:16') },
      { id: 'focus-3', date: twoDaysAgo, duration: 45, goalId: 'goal-sustainable-rhythm', completedAt: at(twoDaysAgo, '14:22') },
      { id: 'focus-4', date: shiftDate(today, -3), duration: 25, completedAt: at(shiftDate(today, -3), '09:48') },
      { id: 'focus-5', date: shiftDate(today, -5), duration: 60, goalId: 'goal-portfolio', completedAt: at(shiftDate(today, -5), '12:04') },
    ],
  }
}

export const cloneState = (state: AppState): AppState => JSON.parse(JSON.stringify(state)) as AppState

const MAX_COLLECTION_ITEMS = 10_000
const MAX_TEXT_LENGTH = 20_000

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const isBoundedString = (value: unknown, max = MAX_TEXT_LENGTH): value is string => typeof value === 'string' && value.length <= max
const isNonEmptyString = (value: unknown, max = MAX_TEXT_LENGTH): value is string => isBoundedString(value, max) && value.trim().length > 0
const isIdentifier = (value: unknown, max = 200): value is string => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const isOptionalIdentifier = (value: unknown) => value === undefined || isIdentifier(value)
const hasUniqueIds = (items: Array<{ id: string }>) => new Set(items.map((item) => item.id)).size === items.length
const isStringArray = (value: unknown) => Array.isArray(value) && value.length <= MAX_COLLECTION_ITEMS && value.every((item) => isBoundedString(item))
const isDateArray = (value: unknown) => Array.isArray(value) && value.length <= MAX_COLLECTION_ITEMS && value.every((item) => isDateKey(item))
const isTimestampArray = (value: unknown) => Array.isArray(value) && value.length <= MAX_COLLECTION_ITEMS && value.every((item) => isTimestamp(item))
const isOneOf = <T extends string>(value: unknown, options: readonly T[]): value is T => typeof value === 'string' && options.includes(value as T)

const isProfile = (value: unknown): value is AppState['profile'] => {
  if (!isRecord(value) || !isBoundedString(value.name) || !isBoundedString(value.primaryGoal) || !isRecord(value.workingHours)) return false
  return isTimeValue(value.workingHours.start) && isTimeValue(value.workingHours.end) && isBoundedString(value.energyPattern) && isStringArray(value.habitsToBuild) && typeof value.onboardingComplete === 'boolean'
}

const isSettings = (value: unknown): value is AppState['settings'] => isRecord(value) && isOneOf(value.theme, ['light', 'dark', 'system'] as const) && (value.weekStartsOn === 0 || value.weekStartsOn === 1)

const isMilestone = (value: unknown): value is AppState['goals'][number]['milestones'][number] => isRecord(value) && isIdentifier(value.id) && isNonEmptyString(value.title) && typeof value.completed === 'boolean' && (value.dueDate === undefined || isDateKey(value.dueDate))

const isTask = (value: unknown): value is Task => {
  if (!isRecord(value)) return false
  const hasCompletionEvidence = value.completedAt !== undefined || (Array.isArray(value.completionHistory) && value.completionHistory.length > 0)
  return isIdentifier(value.id) && isNonEmptyString(value.title) && isBoundedString(value.description) && isOneOf(value.status, ['backlog', 'today', 'in-progress', 'done'] as const) && isOneOf(value.priority, ['low', 'medium', 'high'] as const) && isOneOf(value.category, ['work', 'personal', 'health', 'learning'] as const) && isDateKey(value.dueDate) && isTimestamp(value.createdAt) && (value.dueTime === undefined || isTimeValue(value.dueTime)) && (value.completedAt === undefined || isTimestamp(value.completedAt)) && (value.completionHistory === undefined || isTimestampArray(value.completionHistory)) && (value.previousStatus === undefined || isOneOf(value.previousStatus, ['backlog', 'today', 'in-progress'] as const)) && isOptionalIdentifier(value.goalId) && (value.status !== 'done' || hasCompletionEvidence)
}

const isHabit = (value: unknown): value is Habit => isRecord(value) && isIdentifier(value.id) && isNonEmptyString(value.name) && isOneOf(value.frequency, ['daily', 'weekly', 'custom'] as const) && Array.isArray(value.targetDays) && value.targetDays.length <= 7 && value.targetDays.every((day) => Number.isInteger(day) && day >= 0 && day <= 6) && isBoundedString(value.icon, 100) && isHexColor(value.color) && isDateArray(value.completedDates) && isTimestamp(value.createdAt)

const isGoal = (value: unknown): value is Goal => isRecord(value) && isIdentifier(value.id) && isNonEmptyString(value.title) && isBoundedString(value.description) && isBoundedString(value.category, 200) && isDateKey(value.targetDate) && isOneOf(value.status, ['active', 'completed', 'paused'] as const) && isHexColor(value.color) && Array.isArray(value.milestones) && value.milestones.length <= MAX_COLLECTION_ITEMS && value.milestones.every(isMilestone) && hasUniqueIds(value.milestones) && isTimestamp(value.createdAt)

const isPlannerBlock = (value: unknown): value is PlannerBlock => isRecord(value) && isIdentifier(value.id) && isNonEmptyString(value.title) && isDateKey(value.date) && isTimeValue(value.startTime) && isTimeValue(value.endTime) && timeToMinutes(value.endTime) > timeToMinutes(value.startTime) && isOneOf(value.category, ['deep-work', 'meeting', 'exercise', 'personal', 'study'] as const) && isBoundedString(value.notes) && isHexColor(value.color)

const isFocusSession = (value: unknown): value is AppState['focusSessions'][number] => {
  if (!isRecord(value) || !isIdentifier(value.id) || !isDateKey(value.date) || typeof value.duration !== 'number' || !Number.isFinite(value.duration) || value.duration <= 0 || value.duration > 24 * 60 || !isOptionalIdentifier(value.taskId) || !isOptionalIdentifier(value.goalId) || (value.taskId !== undefined && value.goalId !== undefined) || !isTimestamp(value.completedAt)) return false
  return dateKeyFromTimestamp(value.completedAt) === value.date
}

export const isAppState = (value: unknown): value is AppState => {
  if (!isRecord(value) || value.version !== 1 || !isProfile(value.profile) || !isSettings(value.settings)) return false
  if (!Array.isArray(value.tasks) || value.tasks.length > MAX_COLLECTION_ITEMS || !value.tasks.every(isTask) || !hasUniqueIds(value.tasks)) return false
  if (!Array.isArray(value.habits) || value.habits.length > MAX_COLLECTION_ITEMS || !value.habits.every(isHabit) || !hasUniqueIds(value.habits)) return false
  if (!Array.isArray(value.goals) || value.goals.length > MAX_COLLECTION_ITEMS || !value.goals.every(isGoal) || !hasUniqueIds(value.goals)) return false
  if (!Array.isArray(value.plannerBlocks) || value.plannerBlocks.length > MAX_COLLECTION_ITEMS || !value.plannerBlocks.every(isPlannerBlock) || !hasUniqueIds(value.plannerBlocks)) return false
  if (!Array.isArray(value.focusSessions) || value.focusSessions.length > MAX_COLLECTION_ITEMS || !value.focusSessions.every(isFocusSession) || !hasUniqueIds(value.focusSessions)) return false

  const goalIds = new Set(value.goals.map((goal) => goal.id))
  const taskIds = new Set(value.tasks.map((task) => task.id))
  const milestoneIds = value.goals.flatMap((goal) => goal.milestones)
  if (!hasUniqueIds(milestoneIds)) return false
  if (value.tasks.some((task) => task.goalId !== undefined && !goalIds.has(task.goalId))) return false
  if (value.focusSessions.some((session) => (session.taskId !== undefined && !taskIds.has(session.taskId)) || (session.goalId !== undefined && !goalIds.has(session.goalId)))) return false
  return true
}

export const blankTask = (today: string): Task => ({
  id: uid('task'),
  title: '',
  description: '',
  status: 'today',
  priority: 'medium',
  category: 'work',
  dueDate: today,
  dueTime: '',
  createdAt: new Date().toISOString(),
})
