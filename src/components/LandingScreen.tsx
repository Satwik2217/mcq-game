import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { FaBolt, FaAtom } from 'react-icons/fa'
import { GiElectric, GiSolarPower } from 'react-icons/gi'

export function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950" />

      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">
        <FaAtom />
      </div>
      <div className="absolute top-40 right-20 text-5xl opacity-20" style={{ animation: 'float 4s ease-in-out infinite 1s' }}>
        <GiElectric />
      </div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-20" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}>
        <GiSolarPower />
      </div>
      <div className="absolute bottom-40 right-32 text-4xl opacity-20" style={{ animation: 'float 4.5s ease-in-out infinite 1.5s' }}>
        <FaBolt />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-6"
        >
          ⚡
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold mb-3"
        >
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ENERGY QUEST
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-white/60 mb-2"
        >
          ICSE Class 7 Physics Adventure
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-10"
        >
          Master the Power of Physics
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            size="xl"
            variant="premium"
            onClick={onStart}
            className="text-xl px-12 py-5 rounded-2xl shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40"
          >
            Start Your Quest ⚡
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-8 text-white/30 text-sm"
        >
          30 Questions · 7 Worlds · Infinite Fun
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 text-white/20 text-xs"
      >
        Press Start to begin your energy adventure
      </motion.div>
    </div>
  )
}
