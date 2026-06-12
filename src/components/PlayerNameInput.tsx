import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

export function PlayerNameInput({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-md mx-4"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl text-center mb-6"
        >
          ⚡
        </motion.div>

        <h2 className="text-2xl font-bold text-center mb-2">Welcome, Explorer!</h2>
        <p className="text-white/50 text-center mb-8 text-sm">
          Enter your name to begin the Energy Quest
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && name.trim()) onSubmit(name.trim())
          }}
          placeholder="Enter Your Name"
          className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-lg outline-none focus:border-indigo-400 focus:bg-white/15 transition-all mb-6"
          autoFocus
        />

        <Button
          size="lg"
          className="w-full text-lg"
          disabled={!name.trim()}
          onClick={() => onSubmit(name.trim())}
        >
          Begin Adventure 🚀
        </Button>
      </motion.div>
    </div>
  )
}
