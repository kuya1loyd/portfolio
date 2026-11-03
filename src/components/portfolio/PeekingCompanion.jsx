'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PeekingCompanion() {
  const containerRef = useRef(null)
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)

  const [isBlinking, setIsBlinking] = useState(false)
  const [isHappy, setIsHappy] = useState(false)
  const [speechBubble, setSpeechBubble] = useState(null)
  const [isHovered, setIsHovered] = useState(false)

  // Target and current pupil offsets for silky-smooth pointer tracking
  const targetPupilRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 })
  const currentPupilRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 })

  // Natural blinking interval (every 3.5 - 6 seconds)
  useEffect(() => {
    let blinkTimeout
    const scheduleBlink = () => {
      const delay = Math.random() * 2500 + 3500
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => {
          setIsBlinking(false)
          scheduleBlink()
        }, 150)
      }, delay)
    }

    scheduleBlink()
    return () => clearTimeout(blinkTimeout)
  }, [])

  // Pointer & touch tracking loop
  useEffect(() => {
    const handlePointerMove = (e) => {
      let clientX = e.clientX
      let clientY = e.clientY

      // Handle touch coordinates
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      }

      if (!leftEyeRef.current || !rightEyeRef.current) return

      // Left Eye
      const lRect = leftEyeRef.current.getBoundingClientRect()
      const lCenterX = lRect.left + lRect.width / 2
      const lCenterY = lRect.top + lRect.height / 2
      const ldx = clientX - lCenterX
      const ldy = clientY - lCenterY
      const lAngle = Math.atan2(ldy, ldx)
      const lDist = Math.hypot(ldx, ldy)
      const lTravel = Math.min(4.8, lDist * 0.032)

      // Right Eye
      const rRect = rightEyeRef.current.getBoundingClientRect()
      const rCenterX = rRect.left + rRect.width / 2
      const rCenterY = rRect.top + rRect.height / 2
      const rdx = clientX - rCenterX
      const rdy = clientY - rCenterY
      const rAngle = Math.atan2(rdy, rdx)
      const rDist = Math.hypot(rdx, rdy)
      const rTravel = Math.min(4.8, rDist * 0.032)

      targetPupilRef.current = {
        lx: Math.cos(lAngle) * lTravel,
        ly: Math.sin(lAngle) * lTravel,
        rx: Math.cos(rAngle) * rTravel,
        ry: Math.sin(rAngle) * rTravel
      }
    }

    // High performance animation loop
    let rafId
    const animatePupils = () => {
      const cur = currentPupilRef.current
      const tar = targetPupilRef.current

      cur.lx += (tar.lx - cur.lx) * 0.22
      cur.ly += (tar.ly - cur.ly) * 0.22
      cur.rx += (tar.rx - cur.rx) * 0.22
      cur.ry += (tar.ry - cur.ry) * 0.22

      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform = `translate(${cur.lx.toFixed(2)}px, ${cur.ly.toFixed(2)}px)`
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform = `translate(${cur.rx.toFixed(2)}px, ${cur.ry.toFixed(2)}px)`
      }

      rafId = requestAnimationFrame(animatePupils)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchstart', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    rafId = requestAnimationFrame(animatePupils)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchstart', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Tap/click reaction
  const handlePetCat = () => {
    setIsHappy(true)
    const messages = [
      'Purr... 🐾',
      'Meow! ✨',
      'Hello there! 🖤',
      'Watching you build! 👀',
      'Glad you are here! 🚀',
      '*Happy nuzzles* 🐾'
    ]
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    setSpeechBubble(randomMsg)

    setTimeout(() => {
      setIsHappy(false)
    }, 1800)

    setTimeout(() => {
      setSpeechBubble(null)
    }, 2800)
  }

  return (
    <aside
      aria-label="Interactive portfolio mascot companion"
      ref={containerRef}
      className="fixed bottom-0 right-4 sm:right-8 z-40 select-none flex flex-col items-center pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Crisp White Speech Bubble with Tail */}
      <AnimatePresence>
        {(speechBubble || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="relative mb-2 px-3.5 py-1.5 rounded-full bg-white text-slate-900 border border-slate-200/90 shadow-xl shadow-slate-900/15 font-sans text-xs font-bold whitespace-nowrap cursor-pointer flex items-center gap-1.5 select-none hover:scale-105 transition-transform"
            onClick={handlePetCat}
          >
            <span>{speechBubble || 'Pet me! 🐾'}</span>
            {/* Speech bubble pointer notch */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-200/90 rotate-45 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realistic Peeking Black / Charcoal Cat */}
      <motion.div
        animate={{
          y: isHovered || isHappy ? -16 : 0,
          scale: isHappy ? 1.05 : 1
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        onClick={handlePetCat}
        className="cursor-pointer transition-transform drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
        title="Hi! Click to pet me!"
      >
        <svg
          width="136"
          height="86"
          viewBox="0 0 136 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Realistic Dark Charcoal / Obsidian Coat Gradient */}
            <radialGradient
              id="darkFurGrad"
              cx="50%"
              cy="62%"
              r="62%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#2e3138" />
              <stop offset="45%" stopColor="#1e2025" />
              <stop offset="82%" stopColor="#141518" />
              <stop offset="100%" stopColor="#0b0c0e" />
            </radialGradient>

            {/* Dark Fur Ear Gradient */}
            <linearGradient id="darkEarOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a2c33" />
              <stop offset="100%" stopColor="#121316" />
            </linearGradient>

            {/* Natural Dark Inner Ear Cavity */}
            <linearGradient id="innerEarGrad" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#3d2d38" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#2a222c" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#1a1c22" stopOpacity="0.3" />
            </linearGradient>

            {/* Luminous Amber-Gold Feline Cat Iris */}
            <radialGradient
              id="catIrisGrad"
              cx="50%"
              cy="48%"
              r="52%"
              fx="46%"
              fy="42%"
            >
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="68%" stopColor="#ca8a04" />
              <stop offset="90%" stopColor="#854d0e" />
              <stop offset="100%" stopColor="#291605" />
            </radialGradient>

            {/* Soft Leather Dark Nose Gradient */}
            <linearGradient id="catNoseGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>

            {/* Clip Path for Left Almond Feline Eye */}
            <clipPath id="leftCatEyeClip">
              <path d="M 38 48 C 41 38, 55 38, 59 48 C 56 58, 42 58, 38 48 Z" />
            </clipPath>

            {/* Clip Path for Right Almond Feline Eye */}
            <clipPath id="rightCatEyeClip">
              <path d="M 77 48 C 81 38, 95 38, 98 48 C 95 58, 81 58, 77 48 Z" />
            </clipPath>

            {/* Whisker Shadow Filter for High Visibility */}
            <filter id="whiskerShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* ========================================================== */}
          {/* 1. REALISTIC CAT EARS (DARK FUR WITH NATURAL INTERIOR)     */}
          {/* ========================================================== */}
          {/* Left Ear Outer */}
          <path
            d="M 23 58 C 16 42, 14 18, 24 6 C 34 12, 48 26, 55 36 Z"
            fill="url(#darkEarOuter)"
            stroke="#3f3f46"
            strokeWidth="0.7"
          />
          {/* Left Ear Inner Cavity */}
          <path
            d="M 27 50 C 22 38, 21 22, 27 12 C 34 18, 44 28, 48 36 Z"
            fill="url(#innerEarGrad)"
          />
          {/* Left Ear Fur Fringe (Natural wisps inside ear) */}
          <path
            d="M 27 34 Q 34 30 40 33 M 25 40 Q 33 37 42 39 M 27 45 Q 36 43 44 44"
            stroke="#71717a"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Right Ear Outer */}
          <path
            d="M 113 58 C 120 42, 122 18, 112 6 C 102 12, 88 26, 81 36 Z"
            fill="url(#darkEarOuter)"
            stroke="#3f3f46"
            strokeWidth="0.7"
          />
          {/* Right Ear Inner Cavity */}
          <path
            d="M 109 50 C 114 38, 115 22, 109 12 C 102 18, 92 28, 88 36 Z"
            fill="url(#innerEarGrad)"
          />
          {/* Right Ear Fur Fringe */}
          <path
            d="M 109 34 Q 102 30 96 33 M 111 40 Q 103 37 94 39 M 109 45 Q 100 43 92 44"
            stroke="#71717a"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Side Fur Tuft Accents */}
          <path
            d="M 18 56 C 12 58, 8 63, 11 67 C 14 66, 17 63, 19 60 Z"
            fill="#18181b"
            stroke="#27272a"
            strokeWidth="0.6"
          />
          <path
            d="M 118 56 C 124 58, 128 63, 125 67 C 122 66, 119 63, 117 60 Z"
            fill="#18181b"
            stroke="#27272a"
            strokeWidth="0.6"
          />

          {/* ========================================================== */}
          {/* 2. REALISTIC CHARCOAL CAT HEAD DOME & CONTOUR             */}
          {/* ========================================================== */}
          {/* Main Head Base */}
          <path
            d="M 18 86 C 14 54, 28 26, 68 26 C 108 26, 122 54, 118 86 Z"
            fill="url(#darkFurGrad)"
            stroke="#27272a"
            strokeWidth="0.8"
          />

          {/* Forehead Soft Sheen Highlight */}
          <path
            d="M 50 30 Q 68 27 86 30 Q 68 34 50 30 Z"
            fill="#52525b"
            opacity="0.3"
          />

          {/* Whisker Pads (Muzzle Pillow Bulges) */}
          <ellipse cx="60" cy="69" rx="8.5" ry="6" fill="#1f2127" />
          <ellipse cx="76" cy="69" rx="8.5" ry="6" fill="#1f2127" />

          {/* ========================================================== */}
          {/* 3. REALISTIC FELINE EYES WITH AMBER IRIS & SLIT PUPILS    */}
          {/* ========================================================== */}
          {isBlinking || isHappy ? (
            /* Gentle realistic feline closed-eye squint */
            <g stroke="#a1a1aa" strokeWidth="2.2" strokeLinecap="round" fill="none">
              <path d="M 39 49 Q 49 42 58 49" />
              <path d="M 78 49 Q 87 42 97 49" />
            </g>
          ) : (
            <>
              {/* --- LEFT FELINE EYE --- */}
              <g>
                {/* Sclera & Dark Limbal Foundation */}
                <path
                  d="M 38 48 C 41 38, 55 38, 59 48 C 56 58, 42 58, 38 48 Z"
                  fill="#fef9c3"
                  stroke="#18181b"
                  strokeWidth="1.4"
                />

                {/* Movable Iris & Vertical Feline Pupil */}
                <g clipPath="url(#leftCatEyeClip)">
                  <g ref={leftEyeRef} className="will-change-transform">
                    {/* Glowing Amber-Gold Cat Iris */}
                    <circle cx="48.5" cy="48" r="9.2" fill="url(#catIrisGrad)" />
                    {/* Dark Limbal Ring Outer Rim */}
                    <circle cx="48.5" cy="48" r="9" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8" />
                    {/* Vertical Feline Pupil Slit (Realistic Room Light Shape) */}
                    <ellipse cx="48.5" cy="48" rx="2.3" ry="6.4" fill="#09090b" />
                    {/* Gloss Light Reflection / Specular Highlight */}
                    <ellipse cx="50.2" cy="45.5" rx="2.2" ry="1.6" fill="#ffffff" opacity="0.95" />
                    <circle cx="46.8" cy="51.2" r="0.9" fill="#ffffff" opacity="0.75" />
                  </g>
                  {/* Upper Eyelid Cast Shadow */}
                  <path
                    d="M 38 46 C 42 40, 55 40, 59 46 C 55 43, 42 43, 38 46 Z"
                    fill="#09090b"
                    opacity="0.35"
                  />
                </g>
              </g>

              {/* --- RIGHT FELINE EYE --- */}
              <g>
                {/* Sclera & Dark Limbal Foundation */}
                <path
                  d="M 77 48 C 81 38, 95 38, 98 48 C 95 58, 81 58, 77 48 Z"
                  fill="#fef9c3"
                  stroke="#18181b"
                  strokeWidth="1.4"
                />

                {/* Movable Iris & Vertical Feline Pupil */}
                <g clipPath="url(#rightCatEyeClip)">
                  <g ref={rightEyeRef} className="will-change-transform">
                    {/* Glowing Amber-Gold Cat Iris */}
                    <circle cx="87.5" cy="48" r="9.2" fill="url(#catIrisGrad)" />
                    {/* Dark Limbal Ring Outer Rim */}
                    <circle cx="87.5" cy="48" r="9" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8" />
                    {/* Vertical Feline Pupil Slit */}
                    <ellipse cx="87.5" cy="48" rx="2.3" ry="6.4" fill="#09090b" />
                    {/* Gloss Light Reflection / Specular Highlight */}
                    <ellipse cx="89.2" cy="45.5" rx="2.2" ry="1.6" fill="#ffffff" opacity="0.95" />
                    <circle cx="85.8" cy="51.2" r="0.9" fill="#ffffff" opacity="0.75" />
                  </g>
                  {/* Upper Eyelid Cast Shadow */}
                  <path
                    d="M 77 46 C 81 40, 94 40, 98 46 C 94 43, 81 43, 77 46 Z"
                    fill="#09090b"
                    opacity="0.35"
                  />
                </g>
              </g>
            </>
          )}

          {/* ========================================================== */}
          {/* 4. REALISTIC CAT NOSE & SWEET FELINE MOUTH                */}
          {/* ========================================================== */}
          {/* Natural Inverted Rounded Triangle Dark Leather Nose */}
          <path
            d="M 64.5 61.5 C 66 61, 70 61, 71.5 61.5 C 72 63.5, 68.8 66, 68 66.5 C 67.2 66, 64 63.5, 64.5 61.5 Z"
            fill="url(#catNoseGrad)"
            stroke="#27272a"
            strokeWidth="0.6"
          />
          {/* Nose Specular Highlight */}
          <ellipse cx="68" cy="62.5" rx="1.6" ry="0.7" fill="#71717a" opacity="0.7" />

          {/* Philtrum & Mouth Line */}
          <path
            d="M 68 66.5 L 68 69.2 M 63 69.5 Q 68 72.5 73 69.5"
            stroke="#52525b"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Whisker Pores (Tiny Natural Dots on Whisker Pads) */}
          <circle cx="58" cy="67" r="0.7" fill="#3f3f46" />
          <circle cx="55.5" cy="69.5" r="0.7" fill="#3f3f46" />
          <circle cx="59" cy="71" r="0.7" fill="#3f3f46" />

          <circle cx="78" cy="67" r="0.7" fill="#3f3f46" />
          <circle cx="80.5" cy="69.5" r="0.7" fill="#3f3f46" />
          <circle cx="77" cy="71" r="0.7" fill="#3f3f46" />

          {/* ========================================================== */}
          {/* 5. DELICATE REALISTIC CAT WHISKERS                         */}
          {/* ========================================================== */}
          <g
            stroke="#e4e4e7"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            filter="url(#whiskerShadow)"
            opacity="0.9"
          >
            {/* Left Whiskers */}
            <path d="M 55 68 Q 32 64 8 70" />
            <path d="M 54 70 Q 29 71 6 77" />
            <path d="M 55 72 Q 33 77 10 84" />

            {/* Right Whiskers */}
            <path d="M 81 68 Q 104 64 128 70" />
            <path d="M 82 70 Q 107 71 130 77" />
            <path d="M 81 72 Q 103 77 126 84" />
          </g>

          {/* ========================================================== */}
          {/* 6. REALISTIC DARK PAWS PEEKING OVER THE BOTTOM EDGE        */}
          {/* ========================================================== */}
          {/* Left Paw */}
          <ellipse cx="32" cy="85" rx="10.5" ry="5" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
          <path d="M 28 85 L 28 87 M 35 85 L 35 87" stroke="#52525b" strokeWidth="1" strokeLinecap="round" />

          {/* Right Paw */}
          <ellipse cx="104" cy="85" rx="10.5" ry="5" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
          <path d="M 100 85 L 100 87 M 107 85 L 107 87" stroke="#52525b" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </motion.div>
    </aside>
  )
}
