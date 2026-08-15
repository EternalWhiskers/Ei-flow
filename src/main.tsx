import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const STORAGE_KEY = 'eiflow-state-v1'

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The recovery action below is intentionally user-controlled; no data is cleared automatically.
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return <main className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12 text-center"><div className="max-w-md rounded-[24px] border border-ink/10 bg-paper p-8 shadow-lift"><p className="text-xs font-bold uppercase tracking-[0.16em] text-moss">EiFlow needs a reset</p><h1 className="mt-3 font-display text-3xl text-ink">This workspace could not be opened.</h1><p className="mt-3 text-sm leading-6 text-muted">The saved data may be incomplete. Clear this browser’s EiFlow data and start again with the seeded workspace.</p><button className="mt-6 min-h-11 rounded-[12px] bg-moss px-4 text-sm font-semibold text-white" onClick={() => { window.localStorage.removeItem(STORAGE_KEY); window.location.reload() }}>Clear saved data and reload</button></div></main>
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
