import type { Achievement, GameState } from '@/types'

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'energy-explorer',
    name: 'Energy Explorer',
    description: 'Complete Energy Valley',
    icon: '⚡',
    condition: (s: GameState) => s.currentWorldIndex > 0 || s.completed,
  },
  {
    id: 'motion-master',
    name: 'Motion Master',
    description: 'Complete Motion Mountain',
    icon: '🏃',
    condition: (s: GameState) => s.currentWorldIndex > 1 || (s.completed && s.correctAnswers >= 5),
  },
  {
    id: 'heat-hero',
    name: 'Heat Hero',
    description: 'Complete Heat Volcano',
    icon: '🌋',
    condition: (s: GameState) => s.currentWorldIndex > 2 || (s.completed && s.correctAnswers >= 10),
  },
  {
    id: 'light-wizard',
    name: 'Light Wizard',
    description: 'Complete Light Kingdom',
    icon: '💡',
    condition: (s: GameState) => s.currentWorldIndex > 3 || (s.completed && s.correctAnswers >= 14),
  },
  {
    id: 'sound-champion',
    name: 'Sound Champion',
    description: 'Complete Sound Forest',
    icon: '🎵',
    condition: (s: GameState) => s.currentWorldIndex > 4 || (s.completed && s.correctAnswers >= 18),
  },
  {
    id: 'electric-genius',
    name: 'Electric Genius',
    description: 'Complete Electric City',
    icon: '🔌',
    condition: (s: GameState) => s.currentWorldIndex > 5 || (s.completed && s.correctAnswers >= 22),
  },
  {
    id: 'conservation-guardian',
    name: 'Conservation Guardian',
    description: 'Complete Conservation Temple',
    icon: '🏛️',
    condition: (s: GameState) => s.completed,
  },
  {
    id: 'physics-ninja',
    name: 'Physics Ninja',
    description: 'Score above 80%',
    icon: '🥷',
    condition: (s: GameState) => s.correctAnswers / s.questions.length >= 0.8,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer 5 questions under 5 seconds',
    icon: '💨',
    condition: (_s: GameState) => false,
  },
  {
    id: 'streak-king',
    name: 'Streak King',
    description: 'Achieve a 10x streak',
    icon: '👑',
    condition: (s: GameState) => s.longestStreak >= 10,
  },
  {
    id: 'quiz-legend',
    name: 'Quiz Legend',
    description: 'Complete all questions',
    icon: '🏆',
    condition: (s: GameState) => s.completed,
  },
]

export const POWER_UPS = [
  {
    id: 'double-xp',
    name: 'Double XP',
    description: 'Double XP for next question',
    icon: '✖️2',
    color: 'from-yellow-400 to-orange-500',
    duration: 1,
  },
  {
    id: 'bonus-points',
    name: 'Bonus Points',
    description: '+100 bonus points',
    icon: '💰',
    color: 'from-green-400 to-emerald-500',
    duration: 1,
  },
  {
    id: 'shield',
    name: 'Shield',
    description: 'Protect from one violation',
    icon: '🛡️',
    color: 'from-blue-400 to-cyan-500',
    duration: 1,
  },
  {
    id: 'extra-time',
    name: 'Extra Time',
    description: '+15 seconds for next question',
    icon: '⏰',
    color: 'from-purple-400 to-pink-500',
    duration: 1,
  },
  {
    id: 'streak-saver',
    name: 'Streak Saver',
    description: 'Keep streak on wrong answer',
    icon: '🔥',
    color: 'from-red-400 to-pink-500',
    duration: 1,
  },
]

export const POSITIVE_MESSAGES = [
  'Brilliant!',
  'Physics Master!',
  'Excellent!',
  'Outstanding!',
  'Amazing!',
  'Superb!',
  'Incredible!',
  'Fantastic!',
  'Magnificent!',
  'Stellar!',
]

export const ENCOURAGING_MESSAGES = [
  'Keep Going!',
  "You'll Get The Next One!",
  'Learning Is Winning!',
  'Never Give Up!',
  'Stay Strong!',
  'Almost There!',
  'Keep Trying!',
  'You Are Learning!',
]
