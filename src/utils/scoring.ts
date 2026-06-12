import type { Difficulty } from '@/types'

export const SCORE_MAP: Record<Difficulty, number> = {
  easy: 100,
  medium: 200,
  hard: 300,
}

export const XP_MAP: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
}

export const LEVELS = [
  { level: 1, name: 'Energy Novice', xpRequired: 0 },
  { level: 2, name: 'Energy Apprentice', xpRequired: 100 },
  { level: 3, name: 'Energy Adept', xpRequired: 250 },
  { level: 4, name: 'Energy Master', xpRequired: 500 },
  { level: 5, name: 'Energy Grandmaster', xpRequired: 1000 },
]

export function calculateLevel(xp: number): { level: number; name: string; progress: number } {
  let level = 1
  let name = LEVELS[0].name
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      level = LEVELS[i].level
      name = LEVELS[i].name
      break
    }
  }
  const currentLevelXp = LEVELS[level - 1]?.xpRequired ?? 0
  const nextLevelXp = LEVELS[level]?.xpRequired ?? currentLevelXp + 1000
  const progress = Math.min((xp - currentLevelXp) / (nextLevelXp - currentLevelXp), 1)
  return { level, name, progress }
}

export function calculateGrade(accuracy: number): { title: string; color: string } {
  if (accuracy >= 90) return { title: 'Physics Grandmaster', color: 'from-yellow-400 to-orange-500' }
  if (accuracy >= 80) return { title: 'Physics Expert', color: 'from-green-400 to-emerald-500' }
  if (accuracy >= 70) return { title: 'Physics Champion', color: 'from-blue-400 to-cyan-500' }
  if (accuracy >= 60) return { title: 'Physics Explorer', color: 'from-purple-400 to-pink-500' }
  return { title: 'Keep Practicing Hero', color: 'from-gray-400 to-slate-500' }
}
