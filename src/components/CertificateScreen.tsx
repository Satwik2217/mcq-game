import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { calculateGrade, calculateLevel } from '@/utils/scoring'
import type { GameState } from '@/types'

interface CertificateScreenProps {
  state: GameState
  onBack: () => void
}

export function CertificateScreen({ state, onBack }: CertificateScreenProps) {
  const certRef = useRef<HTMLDivElement>(null)
  const accuracy = state.questions.length > 0
    ? Math.round((state.correctAnswers / state.questions.length) * 100)
    : 0
  const grade = calculateGrade(accuracy)
  const levelInfo = calculateLevel(state.xp)

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Energy Quest - Certificate</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #0a0a1a;
            padding: 20px;
          }
          .certificate {
            width: 800px;
            background: linear-gradient(135deg, #1e1b4b, #312e81, #1e1b4b);
            border: 4px solid #6366f1;
            border-radius: 20px;
            padding: 50px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
            pointer-events: none;
          }
          .seal {
            font-size: 80px;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 36px;
            font-weight: 900;
            background: linear-gradient(to right, #facc15, #fb923c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
          }
          .subtitle {
            color: rgba(255,255,255,0.6);
            font-size: 16px;
            margin-bottom: 30px;
            letter-spacing: 2px;
          }
          .presented {
            color: rgba(255,255,255,0.7);
            font-size: 14px;
            margin-bottom: 10px;
          }
          .name {
            font-size: 42px;
            font-weight: 800;
            color: #facc15;
            margin-bottom: 10px;
          }
          .for-text {
            color: rgba(255,255,255,0.7);
            font-size: 14px;
            margin-bottom: 5px;
          }
          .course {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 30px;
          }
          .details {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 30px;
          }
          .detail-item {
            text-align: center;
          }
          .detail-label {
            color: rgba(255,255,255,0.5);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .detail-value {
            font-size: 20px;
            font-weight: 700;
            color: #a5b4fc;
          }
          .grade {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 30px;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: end;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          .signature {
            text-align: center;
          }
          .signature-line {
            width: 200px;
            height: 2px;
            background: rgba(255,255,255,0.3);
            margin-bottom: 5px;
          }
          .signature-label {
            color: rgba(255,255,255,0.4);
            font-size: 11px;
          }
          .date {
            font-size: 14px;
            color: rgba(255,255,255,0.5);
          }
          .badge-row {
            font-size: 40px;
            margin: 20px 0;
            letter-spacing: 10px;
          }
          @media print {
            body { background: white; }
            .certificate { border: 4px solid #6366f1 !important; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="seal">⚡</div>
          <h1>ENERGY QUEST</h1>
          <div class="subtitle">ICSE Class 7 Physics - Certificate of Completion</div>
          <div class="presented">This certificate is proudly presented to</div>
          <div class="name">${state.playerName}</div>
          <div class="for-text">for successfully completing the Energy Quest adventure</div>
          <div class="course">Chapter: Energy | ICSE Class 7 Physics</div>
          <div class="badge-row">🏆 ⚡ 🏅</div>
          <div class="details">
            <div class="detail-item">
              <div class="detail-label">Score</div>
              <div class="detail-value">${state.score.toLocaleString()}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Accuracy</div>
              <div class="detail-value">${accuracy}%</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Grade</div>
              <div class="detail-value" style="background: linear-gradient(to right, #facc15, #fb923c); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${grade.title}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Level</div>
              <div class="detail-value">${levelInfo.level} - ${levelInfo.name}</div>
            </div>
          </div>
          <div class="footer">
            <div class="signature">
              <div class="signature-line"></div>
              <div class="signature-label">Teacher's Signature</div>
            </div>
            <div class="date">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `
    printWindow.document.write(html)
    printWindow.document.close()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto"
      >
        <div
          ref={certRef}
          className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 border-4 border-indigo-500/50 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-indigo-500/20 mb-6"
        >
          <div className="text-7xl mb-4">⚡</div>

          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            ENERGY QUEST
          </h1>

          <p className="text-white/50 text-sm mb-6 tracking-widest uppercase">
            ICSE Class 7 Physics · Certificate of Completion
          </p>

          <p className="text-white/60 text-sm mb-2">This certificate is proudly presented to</p>

          <div className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-4">
            {state.playerName}
          </div>

          <p className="text-white/50 text-sm mb-1">for successfully completing the Energy Quest adventure</p>
          <p className="text-white/70 font-semibold mb-6">Chapter: Energy | ICSE Class 7 Physics</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-xs text-white/40 uppercase tracking-wide">Score</div>
              <div className="text-xl font-bold text-indigo-300">{state.score.toLocaleString()}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-xs text-white/40 uppercase tracking-wide">Accuracy</div>
              <div className="text-xl font-bold text-indigo-300">{accuracy}%</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-xs text-white/40 uppercase tracking-wide">Grade</div>
              <div className={`text-lg font-bold bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
                {grade.title}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <div className="text-xs text-white/40 uppercase tracking-wide">Level</div>
              <div className="text-sm font-bold text-indigo-300">{levelInfo.level} - {levelInfo.name}</div>
            </div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="w-40 h-0.5 bg-white/20 mb-1"></div>
              <div className="text-xs text-white/30">Teacher's Signature</div>
            </div>
            <div className="text-xs text-white/40">
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <div className="text-3xl mt-4 tracking-widest">
            🏆 ⚡ 🏅
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="premium" size="lg" onClick={handlePrint}>
            Download PDF 🖨️
          </Button>
          <Button variant="outline" size="lg" onClick={onBack}>
            ← Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
