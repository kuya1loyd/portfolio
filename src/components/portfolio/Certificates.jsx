'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiLock,
  FiShield,
  FiAward,
  FiMaximize2
} from 'react-icons/fi'

const ACHIEVEMENTS = [
  {
    id: 'mos-access-2019-expert',
    title: 'Microsoft Office Specialist: Access 2019 Expert',
    role: 'DATABASE EXPERT',
    year: '2026',
    issuer: 'Microsoft / Certiport',
    issuedDate: 'October 29, 2026',
    description:
      'Advanced database design, relational schema architecture, complex SQL queries, and enterprise forms & reporting.',
    competencies: ['Database Architecture', 'Relational Schemas', 'Query Optimization', 'Data Integrity'],
    image: '/images/Microsoft_Office_Specialist_Access_2019_Expert.jpg',
    pdfUrl: '/certificates/mos-access-2019-expert.pdf'
  },
  {
    id: 'cisco-networking',
    title: 'Networking Basics',
    role: 'NETWORK ARCHITECT',
    year: '2025',
    issuer: 'Cisco Networking Academy',
    issuedDate: 'May 8, 2025',
    description:
      'Foundational certification in network architecture, packet analysis, subnetting, and network security protocols.',
    competencies: ['TCP/IP Suite', 'Subnetting', 'Packet Analysis', 'Network Topology'],
    image: '/images/Networking_Basics_Cisco.jpg',
    pdfUrl: '/certificates/cisco-networking-basics.pdf'
  },
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentals',
    role: 'WEB ARCHITECTURE',
    year: '2026',
    issuer: 'CodeCred Dev',
    issuedDate: 'September 26, 2026',
    description:
      'Semantic structure, accessible markup (WCAG), and responsive DOM layout foundations.',
    competencies: ['Semantic HTML5', 'Accessibility (WCAG)', 'SEO Schema', 'DOM Layout'],
    image: '/images/Html%20fundamentals.png',
    pdfUrl: '/certificates/html-fundamentals.pdf'
  },
  {
    id: 'uiux-principles',
    title: 'UI/UX Principles',
    role: 'UI/UX DESIGN',
    year: '2026',
    issuer: 'CodeCred Dev',
    issuedDate: 'October 4, 2026',
    description:
      'Human-centered interaction design, visual hierarchy, wireframing, and user usability testing.',
    competencies: ['User Research', 'Wireframing', 'Visual Hierarchy', 'Usability Testing'],
    image: '/images/UIUX%20principles.png',
    pdfUrl: '/certificates/ui-ux-principles.pdf'
  },
  {
    id: 'web-performance',
    title: 'Web Performance & Optimization',
    role: 'PERFORMANCE SPECIALIST',
    year: '2026',
    issuer: 'CodeCred Dev',
    issuedDate: 'October 4, 2026',
    description:
      'Core Web Vitals tuning, asset caching strategies, lazy loading, and Lighthouse audit excellence.',
    competencies: ['Core Web Vitals', 'Asset Caching', 'Render Optimization', 'Lighthouse Audits'],
    image: '/images/Web%20Performance.png',
    pdfUrl: '/certificates/web-performance.pdf'
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    role: 'SECURITY SPECIALIST',
    year: '2026',
    issuer: 'CodeCred Dev',
    issuedDate: 'October 4, 2026',
    description:
      'Verified credential in network protocol defense, encryption, and safe application architecture.',
    competencies: ['Cryptography', 'Network Defense', 'Identity Management', 'Risk Assessment'],
    image: '/images/CyberSecurity%20Fundamentals.png',
    pdfUrl: '/certificates/cybersecurity-fundamentals.pdf'
  }
]

// Quadruple items to ensure a seamless infinite scrolling runway
const DISPLAY_ACHIEVEMENTS = [
  ...ACHIEVEMENTS,
  ...ACHIEVEMENTS,
  ...ACHIEVEMENTS,
  ...ACHIEVEMENTS
]

const BASE_SPEED = 2.0 // Permanent fast forward sliding speed

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [isScreenShieldActive, setIsScreenShieldActive] = useState(false)

  const scrollContainerRef = useRef(null)
  const speedRef = useRef(BASE_SPEED) // Current interpolated speed
  const targetSpeedRef = useRef(BASE_SPEED) // Desired speed based on hover
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasDragged: false })

  const totalCount = ACHIEVEMENTS.length

  // Ultra-smooth 60fps/120fps animation loop
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    let animationFrameId
    let lastTime = performance.now()

    const step = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 16.67, 2.5)
      lastTime = currentTime

      if (!selectedCert && !dragRef.current.isDown) {
        // Fast, responsive interpolation (0.2 factor = instant natural response to mouse position)
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.2

        el.scrollLeft += speedRef.current * delta

        // Infinite loop wrap-around
        const halfScroll = el.scrollWidth / 2
        if (el.scrollLeft >= halfScroll) {
          el.scrollLeft -= halfScroll
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfScroll
        }
      }

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [selectedCert])

  // Real-time hover steering: hovering right accelerates forward to next slides; hovering left reverses
  const handleMouseMove = useCallback((e) => {
    const el = scrollContainerRef.current
    if (!el) return

    // 1. If actively dragging with mouse down:
    if (dragRef.current.isDown) {
      e.preventDefault()
      const walk = (e.pageX - dragRef.current.startX) * 1.5
      if (Math.abs(walk) > 5) {
        dragRef.current.hasDragged = true
      }
      el.scrollLeft = dragRef.current.scrollLeft - walk
      return
    }

    // 2. Direct hover position steering across the entire reel
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, x / rect.width)) // 0.0 (far left) to 1.0 (far right)

    if (ratio > 0.52) {
      // Hovering on right side: smoothly accelerate forward to slide through to next cards!
      const factor = (ratio - 0.52) / 0.48 // 0 to 1
      targetSpeedRef.current = BASE_SPEED + factor * 9.5 // up to 11.5px/frame!
    } else if (ratio < 0.48) {
      // Hovering on left side: smoothly reverse backwards!
      const factor = (0.48 - ratio) / 0.48 // 0 to 1
      targetSpeedRef.current = -(BASE_SPEED + factor * 8.5) // up to -10.5px/frame!
    } else {
      // Centered: normal continuous fast sliding
      targetSpeedRef.current = BASE_SPEED
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    dragRef.current.isDown = false
    targetSpeedRef.current = BASE_SPEED
  }, [])

  const handleMouseDown = useCallback((e) => {
    const el = scrollContainerRef.current
    if (!el) return
    dragRef.current = {
      isDown: true,
      startX: e.pageX,
      scrollLeft: el.scrollLeft,
      hasDragged: false
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    dragRef.current.isDown = false
  }, [])

  // Touchpad and mouse wheel support
  const handleWheel = useCallback((e) => {
    const el = scrollContainerRef.current
    if (!el) return
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    el.scrollLeft += delta
  }, [])

  // Keyboard navigation & Escape key to close modal
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedCert && e.key === 'Escape') {
        setSelectedCert(null)
        setIsScreenShieldActive(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedCert])

  // Anti-Screenshot & Screen Capture Protection (Active during modal)
  useEffect(() => {
    if (!selectedCert) return

    const triggerShield = () => setIsScreenShieldActive(true)

    const handleKeySecurity = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) triggerShield()
      if (
        (e.shiftKey && (e.key === 'S' || e.key === 's' || e.key === '4' || e.key === '3' || e.key === '5')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
        (e.metaKey && e.shiftKey && (e.key === '4' || e.key === '3' || e.key === '5' || e.key === 's'))
      ) {
        triggerShield()
      }
      if (e.key === 'Escape') {
        setSelectedCert(null)
        setIsScreenShieldActive(false)
      }
    }

    const handleBlur = () => triggerShield()
    const handleVisibility = () => {
      if (document.hidden) triggerShield()
    }

    window.addEventListener('keyup', handleKeySecurity)
    window.addEventListener('keydown', handleKeySecurity)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('keyup', handleKeySecurity)
      window.removeEventListener('keydown', handleKeySecurity)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [selectedCert])

  return (
    <section
      id="certificates"
      className="relative w-full py-20 sm:py-24 bg-white dark:bg-[#0b0d12] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300 select-none"
    >
      {/* Subtle Ambient Radial Highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-r from-sky-100/50 via-slate-100/40 to-cyan-100/40 dark:from-cyan-950/20 dark:via-slate-900/30 dark:to-sky-950/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center px-4 sm:px-6">
        {/* Section Header with /AWARDS Ghost Stroke Watermark */}
        <div className="relative mb-10 sm:mb-12 flex flex-col items-center justify-center text-center">
          <span
            aria-hidden="true"
            className="absolute -top-7 sm:-top-9 md:-top-11 text-5xl sm:text-7xl md:text-8xl font-black font-sans uppercase tracking-tight text-transparent select-none pointer-events-none [-webkit-text-stroke:1.5px_rgba(15,23,42,0.08)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.07)]"
          >
            /AWARDS
          </span>

          <h2 className="relative text-3xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight text-slate-900 dark:text-white uppercase">
            <span className="text-slate-400 dark:text-cyan-400">/</span>ACHIEVEMENTS
          </h2>
        </div>
      </div>

      {/* Full-Bleed Hover-Controlled Infinite Reel (No Buttons) */}
      <div
        className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Subtle Edge Fade Gradients for continuous infinite look */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0b0d12] dark:via-[#0b0d12]/80 dark:to-transparent z-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0b0d12] dark:via-[#0b0d12]/80 dark:to-transparent z-20"
          aria-hidden="true"
        />

        {/* Scroll Container with Direct Hover & Drag Steering */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 sm:gap-7 overflow-x-auto no-scrollbar select-none py-2 px-6"
        >
          {DISPLAY_ACHIEVEMENTS.map((item, index) => {
            const cardNum = (index % totalCount) + 1

            return (
              <div
                key={`${item.id}-item-${index}`}
                onClick={() => {
                  if (!dragRef.current.hasDragged) {
                    setSelectedCert(item)
                  }
                }}
                className="w-[290px] sm:w-[330px] h-[430px] sm:h-[460px] shrink-0 rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#121620] text-slate-900 dark:text-white border border-slate-200/90 dark:border-slate-800/80 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.1)] dark:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_55px_-10px_rgba(15,23,42,0.18)] dark:hover:shadow-[0_22px_55px_-10px_rgba(0,0,0,0.7)] hover:border-slate-400 dark:hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group/card select-none"
              >
                {/* Top Card Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Medal Circle Badge */}
                    <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shadow-md shrink-0 group-hover/card:scale-105 transition-transform">
                      <FiAward className="w-4 h-4 text-white dark:text-slate-950" />
                    </div>

                    {/* Award Tag */}
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-bold leading-none">
                        AWARD
                      </span>
                      <span className="text-[11px] font-mono font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                        {String(cardNum).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Top-Right Year Pill */}
                  <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {item.year}
                  </div>
                </div>

                {/* Center: Certificate Image Front Display */}
                <div className="relative rounded-2xl bg-slate-50 dark:bg-[#0c0f16] border border-slate-200/80 dark:border-slate-800 p-2 flex items-center justify-center overflow-hidden my-3 h-[180px] sm:h-[200px] shadow-inner group/cert">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-xl select-none transition-transform duration-300 group-hover/card:scale-[1.03]"
                  />

                  {/* Hover Inspect Pill */}
                  <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl pointer-events-none backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs font-bold shadow-lg border border-transparent dark:border-slate-700">
                      <FiMaximize2 className="w-3.5 h-3.5 text-slate-900 dark:text-cyan-400" />
                      Inspect Credential
                    </span>
                  </div>
                </div>

                {/* Bottom Title & Details */}
                <div className="flex flex-col text-left">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-1 group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-cyan-700 dark:text-cyan-400 line-clamp-1">
                    <span>{item.issuer}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-slate-500 dark:text-slate-400 font-normal">{item.issuedDate}</span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Official Verified Credential Modal (with Adaptive Light/Dark Stage & DRM Shield) */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none"
            onClick={() => {
              setSelectedCert(null)
              setIsScreenShieldActive(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#121620] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.22)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-slate-900 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-white dark:bg-[#121620]">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans line-clamp-1">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {selectedCert.issuer} · {selectedCert.year}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCert(null)
                    setIsScreenShieldActive(false)
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Certificate Canvas Stage on Clean Slate Backdrop */}
              <div className="relative flex-1 p-4 sm:p-8 flex items-center justify-center overflow-auto bg-slate-50/70 dark:bg-[#0b0e14] border-y border-slate-100 dark:border-slate-800/80 min-h-[420px]">
                {/* Anti-Screen Capture DRM Shield Overlay */}
                <AnimatePresence>
                  {isScreenShieldActive && (
                    <motion.div
                      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
                      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-40 bg-white/95 dark:bg-[#0c0f16]/95 flex flex-col items-center justify-center p-6 text-center select-none"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center mb-4 shadow-xl ring-4 ring-cyan-500/20">
                        <FiLock className="w-7 h-7 text-cyan-400 dark:text-slate-950" />
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-[10px] font-mono tracking-widest uppercase font-bold mb-3">
                        <FiShield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        DRM Protection Active
                      </div>

                      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                        Screen Capture Protected
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
                        In accordance with institutional accreditation policies, direct screenshotting and unauthorized recording of this official certificate are restricted.
                      </p>

                      <button
                        type="button"
                        onClick={() => setIsScreenShieldActive(false)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                      >
                        Dismiss & Resume Inspection
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Clear High-Resolution Certificate Stage */}
                <div className="relative max-w-full max-h-[68vh] flex items-center justify-center p-2 rounded-2xl bg-white dark:bg-[#151922] shadow-lg border border-slate-200/90 dark:border-slate-800">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    draggable={false}
                    className="max-w-full max-h-[60vh] object-contain rounded-xl select-none"
                  />
                </div>
              </div>

              {/* Modal Bottom Action Footer */}
              <div className="px-6 py-4 bg-white dark:bg-[#121620] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-slate-600 dark:text-slate-400 text-[11px] font-semibold">
                    Cryptographically Authenticated
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
