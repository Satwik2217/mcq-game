import { useState, useCallback, useRef } from 'react'

interface UseAudioReturn {
  muted: boolean
  volume: number
  toggleMute: () => void
  setVolume: (v: number) => void
  playCorrect: () => void
  playWrong: () => void
  playLevelUp: () => void
  playBadge: () => void
  playComplete: () => void
  playClick: () => void
}

const AudioContext = window.AudioContext || (window as any).webkitAudioContext

function playTone(audioCtx: AudioContext | null, frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
  gain.gain.setValueAtTime(volume, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start()
  osc.stop(audioCtx.currentTime + duration)
}

export function useAudio(): UseAudioReturn {
  const [muted, setMuted] = useState(true)
  const [volume, setVolumeState] = useState(0.5)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new AudioContext()
      } catch {
        return null
      }
    }
    return audioCtxRef.current
  }, [])

  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)))
  }, [])

  const playCorrect = useCallback(() => {
    if (muted) return
    const ctx = getCtx()
    playTone(ctx, 523.25, 0.15, 'sine', volume)
    setTimeout(() => playTone(ctx, 659.25, 0.15, 'sine', volume), 100)
    setTimeout(() => playTone(ctx, 783.99, 0.3, 'sine', volume), 200)
  }, [muted, volume, getCtx])

  const playWrong = useCallback(() => {
    if (muted) return
    const ctx = getCtx()
    playTone(ctx, 200, 0.3, 'sawtooth', volume)
    setTimeout(() => playTone(ctx, 150, 0.4, 'sawtooth', volume), 200)
  }, [muted, volume, getCtx])

  const playLevelUp = useCallback(() => {
    if (muted) return
    const ctx = getCtx()
    const notes = [523.25, 587.33, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(ctx, freq, 0.2, 'sine', volume), i * 100)
    })
  }, [muted, volume, getCtx])

  const playBadge = useCallback(() => {
    if (muted) return
    const ctx = getCtx()
    const notes = [659.25, 783.99, 659.25, 1046.5]
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(ctx, freq, 0.25, 'triangle', volume), i * 150)
    })
  }, [muted, volume, getCtx])

  const playComplete = useCallback(() => {
    if (muted) return
    const ctx = getCtx()
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5]
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(ctx, freq, 0.3, 'sine', volume), i * 120)
    })
  }, [muted, volume, getCtx])

  const playClick = useCallback(() => {
    if (muted) return
    const ctx = getCtx()
    playTone(ctx, 800, 0.05, 'sine', volume * 0.5)
  }, [muted, volume, getCtx])

  return { muted, volume, toggleMute, setVolume, playCorrect, playWrong, playLevelUp, playBadge, playComplete, playClick }
}
