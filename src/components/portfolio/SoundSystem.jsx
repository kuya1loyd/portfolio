'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function SoundSystem() {
  const audioCtxRef = useRef(null)
  const lastHoverTimeRef = useRef(0)

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }, [])

  /* ============================================================ */
  /* SYNTHETIC TACTILE HOVER & CLICK SFX (Web Audio API)          */
  /* ============================================================ */
  const playHoverSound = useCallback(() => {
    const now = Date.now()
    if (now - lastHoverTimeRef.current < 45) return
    lastHoverTimeRef.current = now

    try {
      const ctx = getAudioContext()
      if (!ctx || ctx.state !== 'running') return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1400, ctx.currentTime)
      filter.Q.setValueAtTime(2.5, ctx.currentTime)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1600, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.035)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.038)
    } catch {
      // AudioContext not ready
    }
  }, [getAudioContext])

  const playClickSound = useCallback(() => {
    try {
      const ctx = getAudioContext()
      if (!ctx || ctx.state !== 'running') return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.045)

      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.05)
    } catch {
      // AudioContext not ready
    }
  }, [getAudioContext])

  // Auto-unlock AudioContext on first user interaction so hover sounds play automatically
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = getAudioContext()
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
    }

    const events = [
      'pointerdown',
      'pointerup',
      'click',
      'touchstart',
      'touchend',
      'keydown',
      'wheel',
      'scroll',
      'mousemove'
    ]
    events.forEach((evt) =>
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true })
    )

    return () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, unlockAudio, { capture: true })
      )
    }
  }, [getAudioContext])

  // Global hover & click detection on all cards, buttons, links, and boxes
  useEffect(() => {
    const handleGlobalMouseOver = (e) => {
      const target = e.target.closest(
        'button, a, input, select, textarea, .project-collapsed-card, .hero-portrait-card, [role="button"], .group, article, .starburst-ray'
      )
      if (target) {
        playHoverSound()
      }
    }

    const handleGlobalClick = () => {
      playClickSound()
    }

    window.addEventListener('mouseover', handleGlobalMouseOver, { passive: true })
    window.addEventListener('pointerdown', handleGlobalClick, { passive: true })

    return () => {
      window.removeEventListener('mouseover', handleGlobalMouseOver)
      window.removeEventListener('pointerdown', handleGlobalClick)
    }
  }, [playHoverSound, playClickSound])

  return null
}
