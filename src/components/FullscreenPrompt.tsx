import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { FaExpand } from 'react-icons/fa'

export function FullscreenPrompt({
  onEnterFullscreen,
  onSkip,
}: {
  onEnterFullscreen: () => void
  onSkip: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4 max-w-lg"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          <FaExpand className="inline-block text-indigo-400" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-4">Enter Fullscreen Mode</h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          For the best experience, stay in fullscreen throughout the challenge.
          <br />
          Leaving fullscreen or switching tabs will count as a violation.
        </p>

        <div className="space-y-4">
          <Button
            size="lg"
            variant="premium"
            className="w-full text-lg"
            onClick={onEnterFullscreen}
          >
            Enter Fullscreen 🖥️
          </Button>

          <button
            onClick={onSkip}
            className="text-white/40 hover:text-white/60 text-sm transition-colors underline"
          >
            Skip (not recommended)
          </button>
        </div>
      </motion.div>
    </div>
  )
}
