import { useEffect, useRef, useState } from 'react'

type RefreshHandler = () => void | Promise<void>

interface PullToRefreshOptions {
  onRefresh: RefreshHandler
  threshold?: number
  maxDistance?: number
}

export function usePullToRefresh({ onRefresh, threshold = 72, maxDistance = 112 }: PullToRefreshOptions) {
  const [distance, setDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef<number | null>(null)
  const startX = useRef<number | null>(null)
  const distanceRef = useRef(0)
  const refreshingRef = useRef(false)
  const refreshRef = useRef(onRefresh)

  useEffect(() => {
    refreshRef.current = onRefresh
  }, [onRefresh])

  useEffect(() => {
    const resetGesture = () => {
      startY.current = null
      startX.current = null
      distanceRef.current = 0
      setDistance(0)
    }

    const isScrollableAncestor = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      let element: Element | null = target
      while (element && element !== document.body) {
        if (element.matches('[role="dialog"], [data-scroll-container]')) return true
        if (element instanceof HTMLElement) {
          const { overflowY } = window.getComputedStyle(element)
          if ((overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight) return true
        }
        element = element.parentElement
      }
      return false
    }

    const isGestureBlocked = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      if (target.closest('button, a, input, textarea, select, [contenteditable="true"], [role="button"], [data-modal-surface]')) return true
      return isScrollableAncestor(target)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (refreshingRef.current || event.touches.length !== 1 || window.scrollY > 0 || isGestureBlocked(event.target)) return
      startY.current = event.touches[0].clientY
      startX.current = event.touches[0].clientX
    }

    const onTouchMove = (event: TouchEvent) => {
      if (startY.current === null || event.touches.length !== 1 || window.scrollY > 0) {
        if (startY.current !== null) resetGesture()
        return
      }

      const deltaX = event.touches[0].clientX - (startX.current ?? event.touches[0].clientX)
      const deltaY = event.touches[0].clientY - startY.current
      if (deltaY <= 0 || Math.abs(deltaX) > Math.abs(deltaY)) {
        resetGesture()
        return
      }

      const nextDistance = Math.min(maxDistance, deltaY * 0.55)
      distanceRef.current = nextDistance
      setDistance(nextDistance)
      if (event.cancelable) event.preventDefault()
    }

    const onTouchEnd = () => {
      if (startY.current === null) return
      const shouldRefresh = distanceRef.current >= threshold
      resetGesture()
      if (!shouldRefresh || refreshingRef.current) return

      refreshingRef.current = true
      setIsRefreshing(true)
      setDistance(threshold)
      Promise.resolve(refreshRef.current()).catch(() => undefined).finally(() => {
        refreshingRef.current = false
        setIsRefreshing(false)
        setDistance(0)
      })
    }

    const onTouchCancel = () => {
      if (startY.current !== null) resetGesture()
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchCancel, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [maxDistance, threshold])

  return { distance, isRefreshing, threshold }
}
