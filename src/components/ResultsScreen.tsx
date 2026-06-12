import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { calculateLevel, calculateGrade } from '@/utils/scoring'
import { ACHIEVEMENTS } from '@/data/achievements'
import type { GameState } from '@/types'

interface ResultsScreenProps {
  state: GameState
  onReview: () => void
  onCertificate: () => void
  onRestart: () => void
}

export function ResultsScreen({ state, onReview, onCertificate, onRestart }: ResultsScreenProps) {
  const accuracy = state.questions.length > 0
    ? Math.round((state.correctAnswers / state.questions.length) * 100)
    : 0
  const grade = calculateGrade(accuracy)
  const levelInfo = calculateLevel(state.xp)
  const unlockedBadges = ACHIEVEMENTS.filter((a) => a.condition(state))
  const timeTaken = Math.round((Date.now() - state.startTime) / 1000)
  const minutes = Math.floor(timeTaken / 60)
  const seconds = timeTaken % 60

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-7xl mb-4"
          >
            🏆
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Quest Complete!
            </span>
          </h1>

          <p className="text-white/60 text-lg">Great work, {state.playerName}!</p>
        </div>

        <Card className="p-6 md:p-8 mb-6">
          <div className={`bg-gradient-to-r ${grade.color} bg-clip-text text-transparent text-2xl font-black text-center mb-6`}>
            {grade.title}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Score" value={state.score.toLocaleString()} icon="⭐" />
            <StatCard label="XP Earned" value={`${state.xp}`} icon="✦" />
            <StatCard label="Level" value={`${levelInfo.level} - ${levelInfo.name}`} icon="📊" />
            <StatCard label="Accuracy" value={`${accuracy}%`} icon="🎯" />
          </div>

          <div className="space-y-3 mb-6">
            <DetailRow label="Correct Answers" value={`${state.correctAnswers}`} color="text-green-400" />
            <DetailRow label="Wrong Answers" value={`${state.wrongAnswers}`} color="text-red-400" />
            <DetailRow label="Longest Streak" value={`🔥 ${state.longestStreak}`} color="text-orange-400" />
            <DetailRow label="Time Taken" value={`${minutes}m ${seconds}s`} color="text-cyan-400" />
            <DetailRow label="Violations" value={`${state.violations}`} color={state.violations > 0 ? 'text-red-400' : 'text-green-400'} />
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/50 mb-1">
              <span>Level Progress</span>
              <span>{Math.round(levelInfo.progress * 100)}%</span>
            </div>
            <Progress value={levelInfo.progress * 100} barClassName="bg-gradient-to-r from-indigo-400 to-purple-400" />
          </div>
        </Card>

        {unlockedBadges.length > 0 && (
          <Card className="p-6 md:p-8 mb-6">
            <h3 className="text-lg font-bold mb-4">🏅 Badges Earned</h3>
            <div className="flex flex-wrap gap-3">
              {unlockedBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border border-yellow-400/20 rounded-xl px-4 py-2 text-center"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-semibold text-yellow-300">{badge.name}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Button variant="premium" size="lg" onClick={onReview}>
            Review Answers 📝
          </Button>
          <Button variant="default" size="lg" onClick={onCertificate}>
            Get Certificate 📜
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart}>
            Play Again 🔄
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 text-center">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-xs text-white/50 mb-0.5">{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  )
}

function DetailRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
      <span className="text-white/60 text-sm">{label}</span>
      <span className={`font-semibold text-sm ${color}`}>{value}</span>
    </div>
  )
}
