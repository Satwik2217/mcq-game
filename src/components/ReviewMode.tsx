import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { WORLDS } from '@/data/worlds'
import type { Question, GameState } from '@/types'
import { cn } from '@/utils/cn'

interface ReviewModeProps {
  questions: Question[]
  answers: Record<number, number | null>
  state: GameState
  onBack: () => void
}

export function ReviewMode({ questions, answers, state, onBack }: ReviewModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const q = questions[currentIndex]
  const userAnswer = answers[q.id]
  const world = WORLDS.find((w) => w.id === q.worldId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Review Answers</h2>
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <Card className="p-4 md:p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            {world && <span className="text-lg">{world.icon}</span>}
            <Badge variant={
              q.difficulty === 'easy' ? 'success' : q.difficulty === 'medium' ? 'warning' : 'danger'
            }>
              {q.difficulty.toUpperCase()}
            </Badge>
            {userAnswer === q.correctAnswer ? (
              <Badge variant="success">Correct ✓</Badge>
            ) : (
              <Badge variant="danger">Wrong ✗</Badge>
            )}
            <span className="text-xs text-white/40">Q{currentIndex + 1}/{questions.length}</span>
          </div>

          <h3 className="text-lg font-bold mb-4 whitespace-pre-line">{q.question}</h3>

          <div className="space-y-2 mb-4">
            {q.options.map((opt, i) => (
              <div
                key={i}
                className={cn(
                  'px-4 py-3 rounded-xl text-sm border',
                  i === q.correctAnswer
                    ? 'border-green-400 bg-green-500/20 text-green-300'
                    : i === userAnswer && i !== q.correctAnswer
                    ? 'border-red-400 bg-red-500/20 text-red-300'
                    : 'border-white/10 bg-white/5 text-white/50',
                )}
              >
                <div className="flex items-center gap-3">
                  <span>{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{opt}</span>
                  {i === q.correctAnswer && <span>✓</span>}
                  {i === userAnswer && i !== q.correctAnswer && <span>✗</span>}
                </div>
              </div>
            ))}
          </div>

          <Card className="p-4 bg-white/5">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">Explanation: </span>
              {q.explanation}
            </p>
            {q.learningTip && (
              <p className="text-sm text-cyan-300 mt-2">
                💡 {q.learningTip}
              </p>
            )}
          </Card>
        </Card>

        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          >
            ← Previous
          </Button>
          <Button
            variant="default"
            disabled={currentIndex >= questions.length - 1}
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          >
            Next →
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
