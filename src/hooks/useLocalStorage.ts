import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T, isValid?: (value: unknown) => value is T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (!stored) return initialValue
      const parsed: unknown = JSON.parse(stored)
      if (!isValid || isValid(parsed)) return parsed as T
      window.localStorage.removeItem(key)
    } catch {
      // Invalid or unavailable storage should never prevent the app from booting.
    }
    return initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be unavailable in privacy-restricted contexts; the in-memory state still works.
    }
  }, [key, value])

  return [value, setValue]
}
