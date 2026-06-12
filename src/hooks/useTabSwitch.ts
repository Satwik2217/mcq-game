import { useEffect, useRef, useCallback, useState } from 'react'

interface UseTabSwitchReturn {
  violations: number
  incrementViolation: () => void
  shieldActive: boolean
  setShieldActive: (v: boolean) => void
}

export function useTabSwitch(onViolation?: (count: number) => void): UseTabSwitchReturn {
  const [violations, setViolations] = useState(0)
  const [shieldActive, setShieldActive] = useState(false)
  const violationsRef = useRef(0)

  const incrementViolation = useCallback(() => {
    if (shieldActive) {
      setShieldActive(false)
      return
    }
    violationsRef.current += 1
    setViolations(violationsRef.current)
    onViolation?.(violationsRef.current)
  }, [shieldActive, onViolation])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) incrementViolation()
    }
    const handleBlur = () => incrementViolation()

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('blur', handleBlur)
    }
  }, [incrementViolation])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) incrementViolation()
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [incrementViolation])

  return { violations, incrementViolation, shieldActive, setShieldActive }
}
