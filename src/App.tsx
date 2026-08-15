import { Capacitor, SystemBarType, SystemBars, SystemBarsStyle } from '@capacitor/core'
import { StatusBar } from '@capacitor/status-bar'
import { useEffect, useRef, useState } from 'react'
import { createDemoState, isAppState } from './data'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { AppSettings, AppState, Goal, Habit, PageKey, PlannerBlock, Profile, Task } from './types'
import { todayKey, uid } from './utils'
import { AppHeader, MobileNav, Sidebar, Toast } from './components/common'
import { Onboarding } from './components/onboarding'
import { PullToRefresh } from './components/pull-to-refresh'
import { Dashboard } from './components/dashboard'
import { TasksView } from './components/tasks'
import { AnalyticsView, FocusView, GoalsView, HabitsView, PlannerView, SettingsView } from './components/flow-views'

const STORAGE_KEY = 'eiflow-state-v1'

export default function App() {
  const [state, setState] = useLocalStorage<AppState>(STORAGE_KEY, createDemoState(), isAppState)
  const [page, setPage] = useState<PageKey>('today')
  const [showOnboarding, setShowOnboarding] = useState(() => !state.profile.onboardingComplete)
  const [toast, setToast] = useState('')
  const toastTimer = useRef<number | null>(null)
  const appContentRef = useRef<HTMLDivElement>(null)
  const onboardingReturnFocusRef = useRef<HTMLElement | null>(null)
  const commitState = (updater: (current: AppState) => AppState) => {
    setState((current) => {
      const next = updater(current)
      return isAppState(next) ? next : current
    })
  }

  useEffect(() => {
    const root = document.documentElement
    const syncNativeStatusBar = (isDark: boolean) => {
      if (!Capacitor.isNativePlatform()) return
      const color = isDark ? '#10191D' : '#EEF2F5'
      void Promise.all([
        SystemBars.setStyle({ style: isDark ? SystemBarsStyle.Dark : SystemBarsStyle.Light, bar: SystemBarType.StatusBar }),
        SystemBars.setStyle({ style: isDark ? SystemBarsStyle.Dark : SystemBarsStyle.Light, bar: SystemBarType.NavigationBar }),
        // Keep the legacy background call for Android versions where edge-to-edge is not enforced.
        StatusBar.setBackgroundColor({ color }),
      ]).catch(() => undefined)
    }
    const applyTheme = () => {
      const isDark = state.settings.theme === 'dark' || (state.settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      const themeColor = isDark ? '#10191d' : '#eef2f5'
      root.classList.toggle('dark', isDark)
      root.style.colorScheme = isDark ? 'dark' : 'light'
      document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', themeColor)
      syncNativeStatusBar(isDark)
    }
    applyTheme()
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener?.('change', applyTheme)
    return () => media.removeEventListener?.('change', applyTheme)
  }, [state.settings.theme])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [page])

  useEffect(() => {
    const appContent = appContentRef.current
    if (!appContent) return
    ;(appContent as HTMLDivElement & { inert: boolean }).inert = showOnboarding
    if (showOnboarding) {
      appContent.setAttribute('aria-hidden', 'true')
      return
    }
    appContent.removeAttribute('aria-hidden')
    const returnFocus = onboardingReturnFocusRef.current
    onboardingReturnFocusRef.current = null
    const focusTarget = returnFocus?.isConnected ? returnFocus : appContent
    const focusFrame = window.requestAnimationFrame(() => focusTarget.focus())
    return () => window.cancelAnimationFrame(focusFrame)
  }, [showOnboarding])

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
  }, [])

  const notify = (message: string) => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => {
      setToast('')
      toastTimer.current = null
    }, 2600)
  }

  const updateProfile = (profile: Profile) => commitState((current) => ({ ...current, profile }))
  const updateSettings = (settings: AppSettings) => commitState((current) => ({ ...current, settings }))
  const completionHistory = (task: Task): string[] => {
    if (task.completionHistory) return task.completionHistory
    return task.completedAt ? [task.completedAt] : []
  }

  const toggleTask = (task: Task) => {
    commitState((current) => ({
      ...current,
      tasks: current.tasks.map((item) => {
        if (item.id !== task.id) return item
        if (item.status === 'done') return { ...item, status: item.previousStatus ?? 'today', previousStatus: undefined }
        const completedAt = new Date().toISOString()
        return { ...item, status: 'done', previousStatus: item.status, completedAt, completionHistory: [...completionHistory(item), completedAt] }
      }),
    }))
    notify(task.status === 'done' ? 'Task reopened' : 'Task complete')
  }

  const saveTask = (task: Task) => {
    commitState((current) => {
      const existing = current.tasks.find((item) => item.id === task.id)
      const history = task.completionHistory ?? (existing ? completionHistory(existing) : completionHistory(task))
      const normalized: Task = task.status === 'done'
        ? (() => {
            const completedAt = task.completedAt ?? new Date().toISOString()
            return { ...task, completedAt, previousStatus: task.previousStatus ?? (existing?.status !== 'done' ? existing?.status ?? 'today' : 'today'), completionHistory: history.includes(completedAt) ? history : [...history, completedAt] }
          })()
        : { ...task, completedAt: task.completedAt, previousStatus: undefined, completionHistory: history }
      return { ...current, tasks: existing ? current.tasks.map((item) => item.id === task.id ? normalized : item) : [normalized, ...current.tasks] }
    })
    notify(task.title ? 'Task saved' : 'Task updated')
  }

  const deleteTask = (id: string) => {
    commitState((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
      focusSessions: current.focusSessions.map((session) => session.taskId === id ? { ...session, taskId: undefined } : session),
    }))
    notify('Task deleted')
  }

  const toggleHabit = (habit: Habit) => {
    const date = todayKey()
    commitState((current) => ({ ...current, habits: current.habits.map((item) => item.id === habit.id ? { ...item, completedDates: item.completedDates.includes(date) ? item.completedDates.filter((value) => value !== date) : [...item.completedDates, date] } : item) }))
    notify(habit.completedDates.includes(date) ? 'Habit check-in removed' : 'Habit checked in')
  }

  const saveHabit = (habit: Habit) => { commitState((current) => ({ ...current, habits: current.habits.some((item) => item.id === habit.id) ? current.habits.map((item) => item.id === habit.id ? habit : item) : [...current.habits, habit] })); notify('Habit saved') }
  const deleteHabit = (id: string) => { commitState((current) => ({ ...current, habits: current.habits.filter((habit) => habit.id !== id) })); notify('Habit deleted') }

  const saveGoal = (goal: Goal) => { commitState((current) => ({ ...current, goals: current.goals.some((item) => item.id === goal.id) ? current.goals.map((item) => item.id === goal.id ? goal : item) : [...current.goals, goal] })); notify('Goal saved') }
  const deleteGoal = (id: string) => {
    commitState((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== id),
      tasks: current.tasks.map((task) => task.goalId === id ? { ...task, goalId: undefined } : task),
      focusSessions: current.focusSessions.map((session) => session.goalId === id ? { ...session, goalId: undefined } : session),
    }))
    notify('Goal deleted')
  }
  const toggleMilestone = (goalId: string, milestoneId: string) => { commitState((current) => ({ ...current, goals: current.goals.map((goal) => goal.id === goalId ? { ...goal, milestones: goal.milestones.map((milestone) => milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone) } : goal) })); notify('Milestone updated') }

  const saveBlock = (block: PlannerBlock) => { commitState((current) => ({ ...current, plannerBlocks: current.plannerBlocks.some((item) => item.id === block.id) ? current.plannerBlocks.map((item) => item.id === block.id ? block : item) : [...current.plannerBlocks, block] })); notify('Time block saved') }
  const deleteBlock = (id: string) => { commitState((current) => ({ ...current, plannerBlocks: current.plannerBlocks.filter((block) => block.id !== id) })); notify('Time block deleted') }
  const moveBlock = (id: string, date: string) => { commitState((current) => ({ ...current, plannerBlocks: current.plannerBlocks.map((block) => block.id === id ? { ...block, date } : block) })); notify('Time block moved') }

  const recordFocus = (duration: number, taskId?: string, goalId?: string) => {
    commitState((current) => {
      const linkedTaskId = taskId && current.tasks.some((task) => task.id === taskId) ? taskId : undefined
      const linkedGoalId = linkedTaskId ? undefined : goalId && current.goals.some((goal) => goal.id === goalId) ? goalId : undefined
      return { ...current, focusSessions: [...current.focusSessions, { id: uid('focus'), date: todayKey(), duration, taskId: linkedTaskId, goalId: linkedGoalId, completedAt: new Date().toISOString() }] }
    })
    notify(`${duration}-minute focus session recorded`)
  }

  const completeOnboarding = (profile: Profile) => {
    commitState((current) => ({ ...current, profile }))
    setShowOnboarding(false)
    notify('Welcome to your flow')
  }
  const skipOnboarding = () => {
    commitState((current) => ({ ...current, profile: { ...current.profile, onboardingComplete: true } }))
    setShowOnboarding(false)
  }
  const restartOnboarding = () => {
    onboardingReturnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setShowOnboarding(true)
    setPage('today')
  }
  const reset = () => {
    commitState(() => createDemoState())
    setShowOnboarding(false)
    setPage('today')
    notify('Demo data reset')
  }
  const importState = (incoming: AppState) => {
    if (!isAppState(incoming)) return false
    commitState(() => ({ ...incoming, version: 1 }))
    setShowOnboarding(!incoming.profile.onboardingComplete)
    notify('Backup imported')
    return true
  }

  const focusView = <FocusView state={state} onRecordFocus={recordFocus} />
  const view = page === 'today' ? <Dashboard state={state} onNavigate={setPage} onToggleTask={toggleTask} /> : page === 'tasks' ? <TasksView tasks={state.tasks} onSaveTask={saveTask} onDeleteTask={deleteTask} onToggleTask={toggleTask} /> : page === 'habits' ? <HabitsView habits={state.habits} onToggleHabit={toggleHabit} onSaveHabit={saveHabit} onDeleteHabit={deleteHabit} /> : page === 'goals' ? <GoalsView goals={state.goals} onSaveGoal={saveGoal} onDeleteGoal={deleteGoal} onToggleMilestone={toggleMilestone} /> : page === 'planner' ? <PlannerView state={state} onSaveBlock={saveBlock} onDeleteBlock={deleteBlock} onMoveBlock={moveBlock} /> : page === 'analytics' ? <AnalyticsView state={state} /> : <SettingsView state={state} onUpdateProfile={updateProfile} onUpdateSettings={updateSettings} onReset={reset} onRestartOnboarding={restartOnboarding} onImport={importState} />

  return <PullToRefresh onRefresh={() => window.location.reload()}><div className="app-shell app-grid min-h-screen bg-canvas"><div ref={appContentRef} tabIndex={-1} aria-hidden={showOnboarding || undefined} className={showOnboarding ? 'pointer-events-none' : undefined}><Sidebar page={page} profile={state.profile} onNavigate={setPage} /><div className="min-h-screen lg:pl-[250px]"><AppHeader page={page} profile={state.profile} onNavigate={setPage} /><main className="page-stage"><div className={page === 'focus' ? '' : 'hidden'} aria-hidden={page === 'focus' ? undefined : true}>{focusView}</div>{page !== 'focus' && view}</main></div><MobileNav page={page} onNavigate={setPage} /><Toast message={toast} onClose={() => setToast('')} /></div>{showOnboarding && <div className="fixed inset-0 z-[70] overflow-y-auto bg-canvas"><Onboarding profile={state.profile} onComplete={completeOnboarding} onSkip={skipOnboarding} /></div>}</div></PullToRefresh>
}
