import { motion } from 'framer-motion'
import { WORLDS } from '@/data/worlds'
import { cn } from '@/utils/cn'

interface ProgressMapProps {
  unlockedWorlds: number
  currentWorld: number
  onSelectWorld?: (index: number) => void
}

export function ProgressMap({ unlockedWorlds, currentWorld }: ProgressMapProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-12"
      >
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Quest Progress
        </span>
      </motion.h2>

      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-30" />

        <div className="space-y-8">
          {WORLDS.map((world, index) => {
            const unlocked = index <= unlockedWorlds
            const isCurrent = index === currentWorld
            const isCompleted = index < currentWorld

            return (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative flex items-center gap-6 p-4 md:p-6 rounded-2xl transition-all duration-300',
                  isCurrent ? 'bg-white/10 border border-white/20 shadow-lg shadow-indigo-500/10' : '',
                  unlocked ? 'cursor-pointer hover:bg-white/5' : 'opacity-40',
                )}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl relative z-10',
                    isCompleted ? 'bg-green-500/20 border-2 border-green-400' :
                    isCurrent ? 'animate-pulse-glow bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-indigo-400' :
                    unlocked ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10',
                  )}
                >
                  {isCompleted ? '✅' : world.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={cn(
                      'font-bold text-lg',
                      isCompleted ? 'text-green-400' : isCurrent ? 'text-white' : 'text-white/60',
                    )}>
                      {world.name}
                    </h3>
                    {isCompleted && <span className="text-green-400 text-sm">✓ Completed</span>}
                    {isCurrent && (
                      <span className="text-xs bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    'text-sm',
                    unlocked ? 'text-white/50' : 'text-white/30',
                  )}>
                    {world.subtitle}
                  </p>
                </div>

                {!unlocked && (
                  <div className="text-white/30 text-xl">🔒</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
