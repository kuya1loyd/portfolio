'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiMonitor,
  FiCpu,
  FiTerminal,
  FiRefreshCw,
  FiAward
} from 'react-icons/fi'
import { FaGamepad } from 'react-icons/fa'

/* ============================================================ */
/* 1. GEAR & DEV SETUP MODAL                                    */
/* ============================================================ */
export function GearModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const GEAR_CATEGORIES = [
    {
      category: 'Workstation & Hardware',
      items: [
        { name: 'Custom Dev Rig', detail: 'High-speed Multi-Core Processor, 32GB High-Speed RAM, Ultra-Fast NVMe SSD' },
        { name: 'Dual Display Setup', detail: 'Primary 27" 4K IPS High-Resolution Monitor + Secondary Vertical Pivot Display for code & terminal telemetry' },
        { name: 'Keychron Mechanical Keyboard', detail: 'Custom tactile switches for optimal typing ergonomics and high-velocity coding' },
        { name: 'Ergonomic Vertical Mouse', detail: 'Precision optical sensor for long architecture & design sessions' }
      ]
    },
    {
      category: 'Software & Developer Stack',
      items: [
        { name: 'VS Code // Custom Cyber Theme', detail: 'JetBrains Mono with Ligatures, GitHub Copilot, ESLint, Prettier, Tailwind IntelliSense' },
        { name: 'Next.js 15 & React 19', detail: 'App Router, Turbopack, Server Actions, Client Hydration Optimization' },
        { name: 'Databases & Cloud', detail: 'Neon Serverless PostgreSQL, Supabase, Vercel Edge Hosting, Git & GitHub' },
        { name: 'Mobile Tooling', detail: 'Flutter SDK, Dart, Android Studio, Cross-Platform Hybrid Runtime' }
      ]
    }
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121620] border border-slate-300 dark:border-white/20 shadow-2xl p-6 sm:p-8 z-10 text-slate-900 dark:text-white"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <span className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400">
              <FiMonitor className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold font-sans">Engineering Gear & Stack</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Hardware, developer ergonomics, and system tools
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {GEAR_CATEGORIES.map((cat, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
                  <FiCpu className="w-3.5 h-3.5" />
                  <span>{cat.category}</span>
                </h4>
                <div className="space-y-2.5">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/40 transition-colors"
                    >
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                        {item.name}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

/* ============================================================ */
/* 2. TYPING TEST MINI-GAME MODAL                               */
/* ============================================================ */
const CODE_SNIPPETS = [
  "const app = nextjs.create({ turbo: true });",
  "import { useState, useEffect } from 'react';",
  "export default async function Page() { return <Hero />; }",
  "SELECT * FROM projects WHERE status = 'production';",
  "git commit -m 'feat: ship high velocity AI features';"
]

export function TypingTestModal({ isOpen, onClose }) {
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isFinished, setIsFinished] = useState(false)
  const inputRef = useRef(null)

  const currentSnippet = CODE_SNIPPETS[snippetIndex]

  const resetTest = useCallback(() => {
    setInput('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsFinished(false)
    setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetTest()
    }
  }, [isOpen, resetTest])

  const handleInputChange = (e) => {
    if (isFinished) return
    const val = e.target.value
    setInput(val)

    if (!startTime) {
      setStartTime(Date.now())
    }

    // Calculate accuracy
    let correctChars = 0
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentSnippet[i]) correctChars++
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100
    setAccuracy(acc)

    // Check completion
    if (val === currentSnippet) {
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000 || 0.05
      const wordsTyped = currentSnippet.length / 5
      const calculatedWpm = Math.round(wordsTyped / elapsedMinutes)
      setWpm(calculatedWpm)
      setIsFinished(true)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#121620] border border-slate-300 dark:border-white/20 shadow-2xl p-6 sm:p-8 z-10 text-slate-900 dark:text-white"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400">
              <FiTerminal className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold font-sans">Cyber Speed Typing Test</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Test your typing velocity on real developer code
              </p>
            </div>
          </div>

          {/* Snippet Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-cyan-400 font-mono text-sm leading-relaxed mb-4 border border-cyan-500/30 shadow-inner select-none">
            {currentSnippet.split('').map((char, idx) => {
              let color = 'text-slate-500'
              if (idx < input.length) {
                color = input[idx] === char ? 'text-emerald-400 font-bold' : 'text-rose-400 bg-rose-950/60'
              }
              return (
                <span key={idx} className={color}>
                  {char}
                </span>
              )
            })}
          </div>

          {/* Type Input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder="Type snippet here to start clock..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0c0e14] border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-all mb-4"
          />

          {/* Stats & Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 font-bold">
                WPM: <span className="text-cyan-600 dark:text-cyan-400">{isFinished ? wpm : '...'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 font-bold">
                Accuracy: <span className="text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
              </span>
            </div>

            <button
              type="button"
              onClick={resetTest}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black !text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <FiRefreshCw className="w-3.5 h-3.5 !text-white dark:!text-black" />
              <span>Next Snippet</span>
            </button>
          </div>

          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center"
            >
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                🎉 Challenge Complete! High-Velocity Speed: {wpm} WPM with {accuracy}% accuracy!
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

/* ============================================================ */
/* 3. GAMES MINI-GAME MODAL (Cyber Dodger Arcade)               */
/* ============================================================ */
export function GamesModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const gameStateRef = useRef({
    playerX: 180,
    bullets: [],
    targets: [],
    keys: {}
  })

  const startGame = useCallback(() => {
    setIsPlaying(true)
    setScore(0)
    setGameOver(false)
    gameStateRef.current = {
      playerX: 180,
      bullets: [],
      targets: [],
      keys: {}
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !isPlaying) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = 360
    const height = 240
    canvas.width = width
    canvas.height = height

    const handleKeyDown = (e) => {
      gameStateRef.current.keys[e.key] = true
    }
    const handleKeyUp = (e) => {
      gameStateRef.current.keys[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let lastSpawn = Date.now()
    let currentScore = 0

    const loop = () => {
      ctx.clearRect(0, 0, width, height)

      // Move player
      const state = gameStateRef.current
      if (state.keys['ArrowLeft'] || state.keys['a']) {
        state.playerX = Math.max(16, state.playerX - 6)
      }
      if (state.keys['ArrowRight'] || state.keys['d']) {
        state.playerX = Math.min(width - 16, state.playerX + 6)
      }

      // Spawn target glitches
      if (Date.now() - lastSpawn > 450) {
        state.targets.push({
          x: Math.random() * (width - 30) + 15,
          y: -10,
          speed: Math.random() * 2 + 2.5
        })
        lastSpawn = Date.now()
      }

      // Draw & Update targets
      for (let i = state.targets.length - 1; i >= 0; i--) {
        const t = state.targets[i]
        t.y += t.speed

        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.arc(t.x, t.y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Collision with player (at y=210)
        const dist = Math.hypot(t.x - state.playerX, t.y - 210)
        if (dist < 18) {
          setGameOver(true)
          setIsPlaying(false)
          cancelAnimationFrame(animRef.current)
          return
        }

        if (t.y > height) {
          state.targets.splice(i, 1)
          currentScore += 10
          setScore(currentScore)
        }
      }

      // Draw Player Ship
      ctx.fillStyle = '#06b6d4'
      ctx.beginPath()
      ctx.moveTo(state.playerX, 195)
      ctx.lineTo(state.playerX - 14, 220)
      ctx.lineTo(state.playerX + 14, 220)
      ctx.closePath()
      ctx.fill()

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(animRef.current)
    }
  }, [isOpen, isPlaying])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#121620] border border-slate-300 dark:border-white/20 shadow-2xl p-6 z-10 text-slate-900 dark:text-white"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400">
              <FaGamepad className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold font-sans">Cyber Dodger Arcade</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Dodge firewall glitches with Arrow Keys / A & D
              </p>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 flex items-center justify-center min-h-[240px]">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center p-4 text-center">
                {gameOver ? (
                  <>
                    <span className="text-rose-400 text-lg font-bold font-mono mb-1">
                      SYSTEM BREACH!
                    </span>
                    <span className="text-xs text-slate-400 font-mono mb-4">
                      Final Score: {score} pts
                    </span>
                    <button
                      type="button"
                      onClick={startGame}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      Play Again
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-cyan-400 text-sm font-bold font-mono mb-2">
                      Ready to Dodge?
                    </span>
                    <button
                      type="button"
                      onClick={startGame}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      Start Game
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 text-xs font-mono">
            <span className="font-bold">
              Score: <span className="text-cyan-600 dark:text-cyan-400">{score}</span>
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Controls: ◄ Left / Right ►
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
