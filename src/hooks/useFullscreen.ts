import { useEffect, useCallback, useState } from 'react'

interface UseFullscreenReturn {
  isFullscreen: boolean
  requestFullscreen: () => Promise<void>
  exitFullscreen: () => Promise<void>
}

export function useFullscreen(onExit?: () => void): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleChange = () => {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)
      if (!fs) onExit?.()
    }
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [onExit])

  const requestFullscreen = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen()
    } catch {
      // Fullscreen not supported or blocked
    }
  }, [])

  const exitFullscreen = useCallback(async () => {
    try {
      await document.exitFullscreen()
    } catch {
      // ignore
    }
  }, [])

  return { isFullscreen, requestFullscreen, exitFullscreen }
}
