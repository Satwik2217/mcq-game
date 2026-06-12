import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { Timer } from './Timer'
import { QuestionCard } from './QuestionCard'
import { ScorePopup } from './ScorePopup'
import { useTimer } from '@/hooks/useTimer'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { WORLDS } from '@/data/worlds'
import { POSITIVE_MESSAGES, ENCOURAGING_MESSAGES, POWER_UPS } from '@/data/achievements'
import { WRONG_ANSWER_MEMES, type MemeDefinition } from '@/data/memes'
import { MemeDisplay } from './MemeDisplay'
import { SCORE_MAP, XP_MAP, calculateLevel } from '@/utils/scoring'
import { useAudio } from '@/hooks/useAudio'
import type { Question, GameState } from '@/types'
import { FaArrowRight, FaShieldAlt, FaBolt, FaClock, FaFire } from 'react-icons/fa'

interface GameScreenProps {
  state: GameState
  questions: Question[]
  onAnswer: (questionId: number, answerIndex: number, timeLeft: number) => void
  onNext: () => void
  onFinish: () => void
  onViolation: () => void
  onToggleMute: () => void
  muted: boolean
}

export function GameScreen({
  state,
  questions,
  onAnswer,
  onNext,
  onFinish,
  onViolation,
  onToggleMute,
  muted,
}: GameScreenProps) {
  const q = questions[state.currentQuestionIndex]
  const world = WORLDS[state.currentWorldIndex]
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [popup, setPopup] = useState<{ show: boolean; points: number; correct: boolean; message: string }>({ show: false, points: 0, correct: true, message: '' })
  const [powerUp, setPowerUp] = useState<any>(null)
  const [showPowerUp, setShowPowerUp] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const answerTimeRef = useRef<number>(0)
  const [wrongMeme, setWrongMeme] = useState<MemeDefinition | null>(null)
  const { playCorrect, playWrong, playClick } = useAudio()

  const handleTimeUp = useCallback(() => {
    if (!showResult) {
      setSelectedAnswer(-1)
      setShowResult(true)
      onAnswer(q.id, -1, 0)
      playWrong()
      const randomMeme = WRONG_ANSWER_MEMES[Math.floor(Math.random() * WRONG_ANSWER_MEMES.length)]
      setWrongMeme(randomMeme)
    }
  }, [showResult, q.id, onAnswer, playWrong])

  const timer = useTimer(30, handleTimeUp)

  useEffect(() => {
    if (!timer.isRunning && !showResult) {
      timer.reset(30)
    }
  }, [state.currentQuestionIndex])

  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setPopup({ show: false, points: 0, correct: true, message: '' })
    setPowerUp(null)
    setConfetti(false)
    timer.reset(30)
    answerTimeRef.current = Date.now()
    setWrongMeme(null)
  }, [state.currentQuestionIndex])

  useEffect(() => {
    if (state.currentQuestionIndex > 0 && state.currentQuestionIndex % 5 === 0 && !showPowerUp) {
      const randomPowerUp = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)]
      setPowerUp(randomPowerUp)
      setShowPowerUp(true)
      setTimeout(() => setShowPowerUp(false), 3000)
    }
  }, [state.currentQuestionIndex])

  const handleSelect = (index: number) => {
    if (showResult) return
    playClick()
    setSelectedAnswer(index)
    setShowResult(true)
    timer.stop()

    const timeTaken = 30 - timer.timeLeft
    const correct = index === q.correctAnswer
    const basePoints = correct ? SCORE_MAP[q.difficulty] : 0
    const speedBonus = correct && timeTaken <= 5 ? 50 : correct && timeTaken <= 10 ? 25 : 0
    const totalPoints = basePoints + speedBonus

    onAnswer(q.id, index, timer.timeLeft)

    setPopup({
      show: true,
      points: totalPoints,
      correct,
      message: correct
        ? POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
        : ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)],
    })

    if (correct) {
      playCorrect()
      setConfetti(true)
      setWrongMeme(null)
      setTimeout(() => setConfetti(false), 1500)
    } else {
      playWrong()
      const randomMeme = WRONG_ANSWER_MEMES[Math.floor(Math.random() * WRONG_ANSWER_MEMES.length)]
      setWrongMeme(randomMeme)
    }

    setTimeout(() => setPopup((p) => ({ ...p, show: false })), 1500)
  }

  const handleNext = () => {
    if (state.currentQuestionIndex >= questions.length - 1) {
      onFinish()
    } else {
      onNext()
    }
  }

  const totalQuestions = questions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 pt-16">
      <Header
        playerName={state.playerName}
        score={state.score}
        xp={state.xp}
        level={state.level}
        levelName={calculateLevel(state.xp).name}
        levelProgress={calculateLevel(state.xp).progress}
        streak={state.streak}
        violations={state.violations}
        currentWorldIndex={state.currentWorldIndex}
        currentQuestionIndex={state.currentQuestionIndex}
        totalQuestions={totalQuestions}
        muted={muted}
        onToggleMute={onToggleMute}
      />

      {confetti && <ConfettiEffect />}

      <ScorePopup
        show={popup.show}
        points={popup.points}
        correct={popup.correct}
        message={popup.message}
      />

      {showPowerUp && powerUp && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <Card className="px-6 py-3 text-center border-yellow-400/30">
            <p className="text-sm text-yellow-400">Power-Up Unlocked!</p>
            <p className="text-lg font-bold">{powerUp.icon} {powerUp.name}</p>
          </Card>
        </motion.div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{world.icon}</div>
            <div>
              <h2 className="text-lg font-bold">{world.name}</h2>
              <p className="text-xs text-white/50">{world.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Timer timeLeft={timer.timeLeft} progress={timer.progress} />

            <div className="hidden md:flex items-center gap-3">
              <div className="text-center">
                <div className="text-xs text-white/40">Score</div>
                <div className="font-bold text-yellow-400">{state.score}</div>
              </div>
              {state.streak > 1 && (
                <div className="text-center">
                  <div className="text-xs text-white/40">Streak</div>
                  <div className="font-bold text-orange-400">🔥{state.streak}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/40 mb-1">
            <span>Question {state.currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>World {state.currentWorldIndex + 1} of {WORLDS.length}</span>
          </div>
          <Progress
            value={(state.currentQuestionIndex + 1) / totalQuestions * 100}
            barClassName="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="p-4 md:p-8 mb-6">
              <QuestionCard
                question={q}
                selectedAnswer={selectedAnswer}
                onSelect={handleSelect}
                showResult={showResult}
              />
            </Card>
          </motion.div>
        </AnimatePresence>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {wrongMeme && (
              <MemeDisplay meme={wrongMeme} />
            )}

            <Card className="p-4 md:p-6">
              {selectedAnswer === q.correctAnswer ? (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-green-400 mb-1">Correct!</p>
                    <p className="text-white/70 text-sm">{q.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <p className="font-bold text-red-400 mb-1">Not quite!</p>
                    <p className="text-white/70 text-sm mb-2">{q.explanation}</p>
                    {q.learningTip && (
                      <Badge variant="info">💡 {q.learningTip}</Badge>
                    )}
                  </div>
                </div>
              )}
            </Card>

            <div className="flex justify-center">
              <Button
                size="lg"
                variant="premium"
                onClick={handleNext}
                className="px-10"
              >
                {state.currentQuestionIndex >= totalQuestions - 1 ? 'See Results 🏆' : 'Next Question →'}
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

function ConfettiEffect() {
  const colors = ['#6366f1', '#a855f7', '#ec4899', '#facc15', '#22d3ee', '#34d399']
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    duration: Math.random() * 1 + 0.5,
    delay: Math.random() * 0.3,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            rotate: p.rotation,
          }}
          animate={{
            y: [0, 300 + Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 200],
            opacity: [1, 0],
            rotate: [p.rotation, p.rotation + 360],
          }}
          transition={{
            duration: p.duration + 1,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
