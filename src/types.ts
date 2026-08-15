export type Theme = 'light' | 'dark' | 'system'
export type PageKey = 'today' | 'tasks' | 'habits' | 'goals' | 'planner' | 'focus' | 'analytics' | 'settings'
export type TaskStatus = 'backlog' | 'today' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskCategory = 'work' | 'personal' | 'health' | 'learning'
export type HabitFrequency = 'daily' | 'weekly' | 'custom'
export type GoalStatus = 'active' | 'completed' | 'paused'
export type PlannerCategory = 'deep-work' | 'meeting' | 'exercise' | 'personal' | 'study'

export interface Profile {
  name: string
  primaryGoal: string
  workingHours: { start: string; end: string }
  energyPattern: string
  habitsToBuild: string[]
  onboardingComplete: boolean
}

export interface AppSettings {
  theme: Theme
  weekStartsOn: 0 | 1
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate: string
  dueTime?: string
  createdAt: string
  completedAt?: string
  completionHistory?: string[]
  previousStatus?: Exclude<TaskStatus, 'done'>
  goalId?: string
}

export interface Habit {
  id: string
  name: string
  frequency: HabitFrequency
  targetDays: number[]
  icon: string
  color: string
  completedDates: string[]
  createdAt: string
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

export interface Goal {
  id: string
  title: string
  description: string
  category: string
  targetDate: string
  status: GoalStatus
  color: string
  milestones: Milestone[]
  createdAt: string
}

export interface PlannerBlock {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  category: PlannerCategory
  notes: string
  color: string
}

export interface FocusSession {
  id: string
  date: string
  duration: number
  taskId?: string
  goalId?: string
  completedAt: string
}

export interface AppState {
  version: number
  profile: Profile
  settings: AppSettings
  tasks: Task[]
  habits: Habit[]
  goals: Goal[]
  plannerBlocks: PlannerBlock[]
  focusSessions: FocusSession[]
}
