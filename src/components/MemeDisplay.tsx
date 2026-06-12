import { motion } from 'framer-motion'
import type { MemeDefinition } from '@/data/memes'

interface MemeDisplayProps {
  meme: MemeDefinition
}

const MEME_FACES: Record<string, { emoji: string; bgShape: string }> = {
  'yeh-jawab-hai': {
    emoji: '😱',
    bgShape: 'bg-red-500/30',
  },
  'bhai-kya-kar-diya': {
    emoji: '🤦',
    bgShape: 'bg-purple-500/30',
  },
  'arey-beta': {
    emoji: '😤',
    bgShape: 'bg-blue-500/30',
  },
  'popat': {
    emoji: '😂',
    bgShape: 'bg-green-500/30',
  },
  'sharam': {
    emoji: '🙈',
    bgShape: 'bg-rose-500/30',
  },
  'maa-kasam': {
    emoji: '😬',
    bgShape: 'bg-amber-500/30',
  },
  'seriously': {
    emoji: '🙄',
    bgShape: 'bg-cyan-500/30',
  },
  'kuch-bhi': {
    emoji: '🤨',
    bgShape: 'bg-violet-500/30',
  },
  'oye': {
    emoji: '😠',
    bgShape: 'bg-stone-500/30',
  },
  'tujhse-na-ho-payega': {
    emoji: '😏',
    bgShape: 'bg-orange-500/30',
  },
}

export function MemeDisplay({ meme }: MemeDisplayProps) {
  const face = MEME_FACES[meme.id] ?? { emoji: '😅', bgShape: 'bg-gray-500/30' }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className={`
        relative overflow-hidden rounded-2xl border-4 border-white/90
        bg-gradient-to-br ${meme.bgGradient}
        shadow-[0_0_40px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.3)]
      `}>
        {/* Top text */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-white font-black text-center text-lg uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
            {meme.topText}
          </p>
        </div>

        {/* Emoji face */}
        <div className="flex justify-center py-4 px-4">
          <div className={`
            w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center
            ${face.bgShape} backdrop-blur-sm
            ring-2 ring-white/20
          `}>
            <span className="text-6xl md:text-7xl leading-none select-none">
              {face.emoji}
            </span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="px-4 pb-4 pt-1">
          <p className="text-white font-black text-center text-lg uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
            {meme.bottomText}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
