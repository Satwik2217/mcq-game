import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerReturn {
  timeLeft: number
  totalTime: number
  progress: number
  isRunning: boolean
  start: () => void
  stop: () => void
  reset: (newTime?: number) => void
}

export function useTimer(initialTime: number = 30, onTimeUp?: () => void): UseTimerReturn {
  const [totalTime, setTotalTime] = useState(initialTime)
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const onTimeUpRef = useRef(onTimeUp)
  onTimeUpRef.current = onTimeUp

  useEffect(() => {
    if (!isRunning) return
    if (timeLeft <= 0) {
      setIsRunning(false)
      onTimeUpRef.current?.()
      return
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          onTimeUpRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const start = useCallback(() => setIsRunning(true), [])
  const stop = useCallback(() => setIsRunning(false), [])

  const reset = useCallback((newTime?: number) => {
    const t = newTime ?? totalTime
    setTotalTime(t)
    setTimeLeft(t)
    setIsRunning(true)
  }, [totalTime])

  const progress = totalTime > 0 ? timeLeft / totalTime : 0

  return { timeLeft, totalTime, progress, isRunning, start, stop, reset }
}
