import { ArrowRight, Check, Clock3, Leaf, Sparkles, Target, UserRound, Zap } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import type { Profile } from '../types'
import { isTimeValue } from '../utils'
import { Badge, Button, Card, TextField } from './ui'

const habitOptions = ['Protect focus time', 'Close the day gently', 'Move more often', 'Read before bed', 'Practice a language']
const energyOptions = [
  { value: 'steady-mornings', label: 'Steady mornings', description: 'I like to use my first hours for meaningful work.' },
  { value: 'afternoon-peak', label: 'Afternoon peak', description: 'My best ideas tend to arrive after lunch.' },
  { value: 'flexible', label: 'Flexible flow', description: 'My energy changes, so I need a responsive plan.' },
]

interface OnboardingProps { profile: Profile; onComplete: (profile: Profile) => void; onSkip: () => void }

export function Onboarding({ profile, onComplete, onSkip }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Profile>(profile)
  const [error, setError] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const onSkipRef = useRef(onSkip)
  const headingId = useId()
  useEffect(() => { onSkipRef.current = onSkip }, [onSkip])
  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus()
    })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onSkipRef.current()
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
  }, [])
  const next = () => {
    if (step === 0 && !answers.name.trim()) { setError('Add your name so the day can feel like yours.'); return }
    if (step === 2 && (!isTimeValue(answers.workingHours.start) || !isTimeValue(answers.workingHours.end))) { setError('Choose a valid start and finish time.'); return }
    setError('')
    if (step === 4) { onComplete({ ...answers, name: answers.name.trim(), onboardingComplete: true }); return }
    setStep((current) => current + 1)
  }
  const toggleHabit = (habit: string) => setAnswers((current) => ({ ...current, habitsToBuild: current.habitsToBuild.includes(habit) ? current.habitsToBuild.filter((item) => item !== habit) : [...current.habitsToBuild, habit] }))

  return <div ref={dialogRef} role="dialog" tabIndex={-1} aria-modal="true" aria-labelledby={headingId}><main className="app-grid native-fullscreen flex min-h-screen items-center justify-center bg-canvas px-4 py-6 sm:px-8 sm:py-10"><div className="grid w-full max-w-6xl overflow-hidden rounded-[24px] border border-ink/12 bg-paper shadow-lift lg:grid-cols-[0.72fr_1.28fr]">
    <aside className="relative hidden overflow-hidden bg-ink p-8 text-paper lg:flex lg:flex-col lg:justify-between xl:p-10"><div className="absolute bottom-20 right-0 h-px w-3/4 bg-citrus/60" /><div className="absolute bottom-[76px] right-1/4 h-2 w-2 rounded-full bg-citrus" /><div className="relative"><LogoMark /><p className="mt-16 text-[10px] font-bold uppercase tracking-[0.2em] text-citrus">A clear place to begin</p><h1 className="mt-4 max-w-xs font-display text-5xl leading-[1.02] tracking-tight">Build a day that can hold you.</h1><p className="mt-6 max-w-sm text-sm leading-7 text-paper/65">EiFlow turns your answers into a softer starting point for work, recovery, and the space between.</p></div><div className="relative rounded-[18px] border border-white/12 bg-white/7 p-4"><div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/50">Your setup signal</span><span className="h-2 w-2 rounded-full bg-citrus" /></div><div className="h-1 rounded-full bg-white/10"><div className="h-full w-1/5 rounded-full bg-citrus transition-all duration-500" style={{ width: `${(step + 1) * 20}%` }} /></div><p className="mt-3 text-xs leading-5 text-paper/60">A few thoughtful answers. No perfect system required.</p></div></aside>

    <section className="flex min-h-[650px] flex-col p-6 sm:p-10"><div className="mb-8 flex items-center justify-between"><div className="lg:hidden"><LogoMark /></div><button onClick={onSkip} className="min-h-11 rounded-[12px] px-3 text-xs font-semibold text-muted transition hover:bg-ink/7 hover:text-ink">Skip for now</button></div><div className="mb-8 flex gap-1.5" aria-label={`Step ${step + 1} of 5`}>{Array.from({ length: 5 }, (_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full transition duration-300 ${index <= step ? 'bg-moss' : 'bg-ink/10'}`} />)}</div>
      <div className="flex flex-1 flex-col justify-center">{step === 0 && <div className="animate-fade-up"><StepIcon icon={<UserRound size={22} />} tone="bg-citrus/40" /><StepLabel>First, a little hello</StepLabel><h2 id={headingId} className="font-display text-4xl leading-tight tracking-tight text-ink">What should we call you?</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted">EiFlow is personal by design. Start with the name you want to see when you open your day.</p><div className="mt-8 max-w-md"><TextField autoFocus label="Your name" placeholder="e.g. Maya" value={answers.name} onChange={(event) => setAnswers({ ...answers, name: event.target.value })} error={error} /></div></div>}
        {step === 1 && <div className="animate-fade-up"><StepIcon icon={<Target size={22} />} tone="bg-peach/40" /><StepLabel>Your north star</StepLabel><h2 id={headingId} className="font-display text-4xl leading-tight tracking-tight text-ink">What are you making space for?</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted">A sentence is enough. This will sit quietly at the center of your dashboard.</p><div className="mt-8 max-w-md"><TextField autoFocus label="My primary goal is" placeholder="e.g. Build a calmer week" value={answers.primaryGoal} onChange={(event) => setAnswers({ ...answers, primaryGoal: event.target.value })} /></div></div>}
        {step === 2 && <div className="animate-fade-up"><StepIcon icon={<Clock3 size={22} />} tone="bg-lavender/30" /><StepLabel>Your container</StepLabel><h2 id={headingId} className="font-display text-4xl leading-tight tracking-tight text-ink">When do you usually work?</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted">We’ll use this to shape your planner and protect the edges of your day.</p><div className="mt-8 grid max-w-md grid-cols-2 gap-3"><TextField label="Start" type="time" value={answers.workingHours.start} onChange={(event) => setAnswers({ ...answers, workingHours: { ...answers.workingHours, start: event.target.value } })} /><TextField label="Finish" type="time" value={answers.workingHours.end} onChange={(event) => setAnswers({ ...answers, workingHours: { ...answers.workingHours, end: event.target.value } })} /></div></div>}
        {step === 3 && <div className="animate-fade-up"><StepIcon icon={<Zap size={22} />} tone="bg-citrus/40" /><StepLabel>Read your energy</StepLabel><h2 id={headingId} className="font-display text-4xl leading-tight tracking-tight text-ink">When do you feel most like yourself?</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted">There’s no perfect pattern. Pick the one that feels closest right now.</p><div className="mt-8 grid max-w-lg gap-3">{energyOptions.map((option) => <button type="button" key={option.value} aria-pressed={answers.energyPattern === option.value} onClick={() => setAnswers({ ...answers, energyPattern: option.value })} className={`rounded-[12px] border p-4 text-left transition ${answers.energyPattern === option.value ? 'border-moss bg-moss/5 ring-2 ring-moss/10' : 'border-ink/12 bg-white hover:border-ink/25'}`}><div className="flex items-center justify-between gap-4"><span className="text-sm font-bold text-ink">{option.label}</span><span className={`flex h-5 w-5 items-center justify-center rounded-full border ${answers.energyPattern === option.value ? 'border-moss bg-moss text-white' : 'border-ink/20'}`}>{answers.energyPattern === option.value && <Check size={12} />}</span></div><p className="mt-1 text-xs leading-5 text-muted">{option.description}</p></button>)}</div></div>}
        {step === 4 && <div className="animate-fade-up"><StepIcon icon={<Sparkles size={22} />} tone="bg-fern/20" /><StepLabel>A gentle nudge</StepLabel><h2 id={headingId} className="font-display text-4xl leading-tight tracking-tight text-ink">Which habits would feel good to build?</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted">Choose a few, or leave this for later. EiFlow won’t turn your life into a streak competition.</p><div className="mt-8 flex max-w-lg flex-wrap gap-2.5">{habitOptions.map((habit) => { const selected = answers.habitsToBuild.includes(habit); return <button type="button" key={habit} aria-pressed={selected} onClick={() => toggleHabit(habit)} className={`min-h-11 rounded-[12px] border px-4 py-2.5 text-sm font-semibold transition ${selected ? 'border-moss bg-moss text-paper' : 'border-ink/12 bg-white text-muted hover:border-ink/25 hover:text-ink'}`}>{selected && <Check size={14} className="mr-1.5 inline" />}{habit}</button> })}</div></div>}
      </div>
      <div className="mt-8 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-[1fr_auto] sm:items-end"><Card className="hidden bg-canvas p-3 sm:block"><div className="flex flex-wrap items-center gap-2"><Badge tone="accent">{answers.name || 'Your name'}</Badge><span className="text-xs text-muted">{answers.primaryGoal || 'Your next season'} · {answers.workingHours.start}–{answers.workingHours.end}</span></div></Card><div className="flex items-center justify-between gap-3 sm:justify-end"><p className="text-xs text-muted">Step {step + 1} of 5</p><Button onClick={next}>{step === 4 ? 'Start my flow' : 'Continue'}<ArrowRight size={16} /></Button></div></div>
    </section>
  </div></main></div>
}

function LogoMark() { return <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-citrus text-ink"><Leaf size={18} strokeWidth={2.5} /></span><span className="font-display text-xl tracking-tight text-paper">EiFlow</span></div> }
function StepIcon({ icon, tone }: { icon: React.ReactNode; tone: string }) { return <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] text-moss ${tone}`}>{icon}</div> }
function StepLabel({ children }: { children: React.ReactNode }) { return <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-moss">{children}</p> }
