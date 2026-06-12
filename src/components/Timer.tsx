import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TimerProps {
  timeLeft: number
  progress: number
}

export function Timer({ timeLeft, progress }: TimerProps) {
  const isLow = timeLeft <= 10
  const isCritical = timeLeft <= 5

  return (
    <div className="flex items-center gap-3">
      <motion.div
        key={timeLeft}
        initial={isCritical ? { scale: 1.3 } : undefined}
        animate={{ scale: 1 }}
        className={cn(
          'text-lg font-bold min-w-[2.5rem] text-center',
          isCritical ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-white',
        )}
      >
        {timeLeft}s
      </motion.div>

      <div className="w-24 md:w-32 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full',
            isCritical ? 'bg-red-500' : isLow ? 'bg-yellow-500' : 'bg-cyan-400',
          )}
          initial={{ width: '100%' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
