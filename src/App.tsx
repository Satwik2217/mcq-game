import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ParticleBackground } from './components/ParticleBackground'
import { LandingScreen } from './components/LandingScreen'
import { PlayerNameInput } from './components/PlayerNameInput'
import { FullscreenPrompt } from './components/FullscreenPrompt'
import { GameScreen } from './components/GameScreen'
import { ProgressMap } from './components/ProgressMap'
import { ResultsScreen } from './components/ResultsScreen'
import { ReviewMode } from './components/ReviewMode'
import { CertificateScreen } from './components/CertificateScreen'
import { useFullscreen } from './hooks/useFullscreen'
import { useTabSwitch } from './hooks/useTabSwitch'
import { useAudio } from './hooks/useAudio'
import { ALL_QUESTIONS } from './data/questions'
import { WORLDS } from './data/worlds'
import { shuffle } from './utils/shuffle'
import { SCORE_MAP, XP_MAP, calculateLevel } from './utils/scoring'
import type { GameScreen as GameScreenType, GameState, PowerUp } from './types'

function getWorldIndex(questionIndex: number): number {
  let count = 0
  for (let w = 0; w < WORLDS.length; w++) {
    const worldQCount = WORLDS[w].questionCount
    if (questionIndex < count + worldQCount) return w
    count += worldQCount
  }
  return WORLDS.length - 1
}

export default function App() {
  const [screen, setScreen] = useState<GameScreenType>('landing')
  const [state, setState] = useState<GameState>({
    screen: 'landing',
    playerName: '',
    currentWorldIndex: 0,
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    xp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    answers: {},
    violations: 0,
    timeTaken: 0,
    startTime: 0,
    badges: [],
    activePowerUp: null,
    muted: true,
    volume: 0.5,
    completed: false,
  })

  const violationCountRef = useRef(0)
  const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen()
  const { muted, toggleMute, playComplete, playLevelUp, playBadge } = useAudio()

  const handleViolation = useCallback((count: number) => {
    violationCountRef.current = count
    setState((prev) => {
      const newViolations = count
      if (newViolations === 5) {
        return { ...prev, violations: newViolations, completed: true }
      }
      return { ...prev, violations: newViolations }
    })
    if (count >= 5) {
      setScreen('results')
    }
  }, [])

  const {
    violations: tabViolations,
    incrementViolation,
    shieldActive,
    setShieldActive,
  } = useTabSwitch(handleViolation)

  const initGame = useCallback((playerName: string) => {
    const shuffled = shuffle(ALL_QUESTIONS).map((q) => ({ ...q, options: shuffle(q.options) }))
    const ordered: typeof shuffled = []
    for (const world of WORLDS) {
      const worldQs = shuffled.filter((q) => q.worldId === world.id)
      ordered.push(...worldQs)
    }
    setState({
      screen: 'game',
      playerName,
      currentWorldIndex: 0,
      currentQuestionIndex: 0,
      questions: ordered,
      score: 0,
      xp: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      answers: {},
      violations: 0,
      timeTaken: 0,
      startTime: Date.now(),
      badges: [],
      activePowerUp: null,
      muted: true,
      volume: 0.5,
      completed: false,
    })
    violationCountRef.current = 0
  }, [])

  const handleAnswer = useCallback((questionId: number, answerIndex: number, timeLeft: number) => {
    setState((prev) => {
      const q = prev.questions.find((qs) => qs.id === questionId)
      if (!q) return prev

      const correct = answerIndex === q.correctAnswer
      const speedBonus = correct && timeLeft >= 25 ? 50 : correct && timeLeft >= 20 ? 25 : 0
      const basePoints = correct ? SCORE_MAP[q.difficulty] : 0
      const totalPoints = basePoints + speedBonus
      const xpGain = correct ? XP_MAP[q.difficulty] : 0

      const newStreak = correct ? prev.streak + 1 : 0
      const streakBonus = newStreak === 2 ? 25 : newStreak === 5 ? 100 : newStreak === 10 ? 250 : 0
      const finalPoints = totalPoints + streakBonus
      const finalXp = prev.xp + xpGain

      return {
        ...prev,
        score: prev.score + finalPoints,
        xp: finalXp,
        level: calculateLevel(finalXp).level,
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
        wrongAnswers: prev.wrongAnswers + (correct ? 0 : 1),
        answers: { ...prev.answers, [questionId]: answerIndex },
        timeTaken: prev.timeTaken + (30 - timeLeft),
      }
    })
  }, [])

  const handleNext = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1
      const nextWorld = getWorldIndex(nextIndex)
      const levelInfo = calculateLevel(prev.xp)
      if (levelInfo.level > prev.level) {
        playLevelUp()
      }
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        currentWorldIndex: nextWorld,
        level: levelInfo.level,
      }
    })
  }, [playLevelUp])

  const handleFinish = useCallback(() => {
    playComplete()
    setState((prev) => ({ ...prev, completed: true }))
    setScreen('results')
  }, [playComplete])

  return (
    <>
      {screen !== 'game' && <ParticleBackground />}
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onStart={() => setScreen('name-input')} />
        )}
        {screen === 'name-input' && (
          <PlayerNameInput
            key="name"
            onSubmit={(name) => {
              setState((prev) => ({ ...prev, playerName: name }))
              setScreen('fullscreen-prompt')
            }}
          />
        )}
        {screen === 'fullscreen-prompt' && (
          <FullscreenPrompt
            key="fullscreen"
            onEnterFullscreen={() => {
              requestFullscreen()
              setScreen('game')
              initGame(state.playerName || 'Explorer')
            }}
            onSkip={() => {
              setScreen('game')
              initGame(state.playerName || 'Explorer')
            }}
          />
        )}
        {screen === 'game' && (
          <GameScreen
            key="game"
            state={state}
            questions={state.questions}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onFinish={handleFinish}
            onViolation={incrementViolation}
            onToggleMute={toggleMute}
            muted={muted}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen
            key="results"
            state={state}
            onReview={() => setScreen('review')}
            onCertificate={() => setScreen('certificate')}
            onRestart={() => {
              setState((prev) => ({ ...prev, screen: 'landing' }))
              setScreen('landing')
            }}
          />
        )}
        {screen === 'review' && (
          <ReviewMode
            key="review"
            questions={state.questions}
            answers={state.answers}
            state={state}
            onBack={() => setScreen('results')}
          />
        )}
        {screen === 'certificate' && (
          <CertificateScreen
            key="certificate"
            state={state}
            onBack={() => setScreen('results')}
          />
        )}
      </AnimatePresence>
    </>
  )
}
