import type { ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { usePullToRefresh } from '../hooks/usePullToRefresh'

export function PullToRefresh({ children, onRefresh }: { children: ReactNode; onRefresh: () => void | Promise<void> }) {
  const { distance, isRefreshing, threshold } = usePullToRefresh({ onRefresh })
  const visible = distance > 0 || isRefreshing
  const progress = Math.min(1, distance / threshold)
  const ready = distance >= threshold

  return <div className="pull-refresh-root">
    <div
      className={`pull-refresh-indicator ${visible ? 'is-visible' : ''} ${ready ? 'is-ready' : ''}`}
      style={{ transform: `translate(-50%, ${Math.max(8, distance - 36)}px)` }}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <span className="pull-refresh-icon" style={{ transform: `rotate(${progress * 180}deg)` }}>
        <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : undefined} />
      </span>
      <span>{isRefreshing ? 'Refreshing…' : ready ? 'Release to refresh' : 'Pull to refresh'}</span>
    </div>
    {children}
  </div>
}
