import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelect: (index: number) => void
  showResult: boolean
}

const typeLabels: Record<string, string> = {
  'mcq': 'Multiple Choice',
  'true-false': 'True or False',
  'fill-blank': 'Fill in the Blank',
  'assertion-reason': 'Assertion & Reason',
  'scenario': 'Scenario Based',
  'visual': 'Visual Thinking',
  'hot': 'Higher Order Thinking',
  'application': 'Application Based',
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  hard: 'bg-red-500/20 text-red-400',
}

export function QuestionCard({ question, selectedAnswer, onSelect, showResult }: QuestionCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return cn(
        'w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl border transition-all duration-200 text-sm md:text-base',
        selectedAnswer === index
          ? 'border-indigo-400 bg-indigo-500/20 text-white'
          : 'border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10',
      )
    }

    if (index === question.correctAnswer) {
      return 'w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl border border-green-400 bg-green-500/20 text-green-300 text-sm md:text-base'
    }

    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl border border-red-400 bg-red-500/20 text-red-300 text-sm md:text-base'
    }

    return 'w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl border border-white/10 bg-white/5 text-white/40 text-sm md:text-base'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[question.difficulty]}`}>
          {question.difficulty.toUpperCase()}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white/70">
          {typeLabels[question.type] || 'MCQ'}
        </span>
      </div>

      <h3 className="text-lg md:text-xl font-bold mb-6 leading-relaxed whitespace-pre-line">
        {question.question}
      </h3>

      <div className="space-y-2 md:space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={!showResult ? { scale: 1.01 } : undefined}
            whileTap={!showResult ? { scale: 0.99 } : undefined}
            onClick={() => !showResult && onSelect(index)}
            disabled={showResult}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={getOptionStyle(index)}
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                'flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs font-bold',
                !showResult && selectedAnswer === index
                  ? 'bg-indigo-500 text-white'
                  : !showResult && hoveredIndex === index
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/50',
                showResult && index === question.correctAnswer && 'bg-green-500 text-white',
                showResult && index === selectedAnswer && index !== question.correctAnswer && 'bg-red-500 text-white',
              )}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {showResult && index === question.correctAnswer && <span className="text-green-400">✓</span>}
              {showResult && index === selectedAnswer && index !== question.correctAnswer && <span className="text-red-400">✗</span>}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
