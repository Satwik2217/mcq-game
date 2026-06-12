import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { WORLDS } from '@/data/worlds'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

interface HeaderProps {
  playerName: string
  score: number
  xp: number
  level: number
  levelName: string
  levelProgress: number
  streak: number
  violations: number
  currentWorldIndex: number
  currentQuestionIndex: number
  totalQuestions: number
  muted: boolean
  onToggleMute: () => void
}

export function Header({
  playerName,
  score,
  xp,
  level,
  levelName,
  levelProgress,
  streak,
  violations,
  currentWorldIndex,
  currentQuestionIndex,
  totalQuestions,
  muted,
  onToggleMute,
}: HeaderProps) {
  const world = WORLDS[currentWorldIndex]

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{world.icon}</span>
            <span className="font-semibold text-white/80 truncate">{playerName}</span>
            <Badge variant="gold">Lvl {level}</Badge>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="font-bold text-yellow-400">{score}</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <span className="text-purple-400">✦</span>
              <span className="text-purple-300">{xp} XP</span>
            </div>

            {streak > 1 && (
              <Badge variant="warning">
                🔥 {streak}
              </Badge>
            )}

            <Badge variant={violations >= 3 ? 'danger' : violations > 0 ? 'warning' : 'default'}>
              ⚠️ {violations}/5
            </Badge>

            <div className="flex items-center gap-1 text-white/50">
              <span className="text-xs">{currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>

            <button
              onClick={onToggleMute}
              className="text-white/50 hover:text-white/80 transition-colors text-sm"
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <Progress value={levelProgress * 100} className="h-1 flex-1" barClassName="bg-gradient-to-r from-indigo-400 to-purple-400" />
        </div>
      </div>
    </motion.header>
  )
}
