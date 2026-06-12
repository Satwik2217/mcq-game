import { motion, AnimatePresence } from 'framer-motion'

interface ScorePopupProps {
  show: boolean
  points: number
  correct: boolean
  message: string
}

export function ScorePopup({ show, points, correct, message }: ScorePopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: -50, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 0.4 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none text-center"
        >
          <div className="text-4xl font-black mb-2">
            {correct ? (
              <span className="text-green-400">+{points}</span>
            ) : (
              <span className="text-red-400">+0</span>
            )}
          </div>
          <div className="text-xl font-bold text-white">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
