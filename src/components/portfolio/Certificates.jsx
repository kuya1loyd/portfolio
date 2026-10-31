'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import {
  FiExternalLink,
  FiAward,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiEye
} from 'react-icons/fi'

const CERTIFICATES = [
  {
    id: 'mos-access-2019-expert',
    title: 'Microsoft Office Specialist: Access 2019 Expert',
    issuer: 'Microsoft / Certiport',
    issued: 'October 29, 2026',
    image: '/images/Microsoft_Office_Specialist_Access_2019_Expert.jpg',
    pdfUrl: '/certificates/mos-access-2019-expert.pdf'
  },
  {
    id: 'cisco-networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    issued: 'May 8, 2025',
    image: '/images/Networking_Basics_Cisco.jpg',
    pdfUrl: '/certificates/cisco-networking-basics.pdf'
  },
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    issued: 'July 10, 2026',
    image: '/images/certificate.jpg',
    pdfUrl: '/certificates/google-cybersecurity.pdf'
  },
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentals',
    issuer: 'CodeCred Dev',
    issued: 'September 26, 2026',
    image: '/images/Html%20fundamentals.png',
    pdfUrl: '/certificates/html-fundamentals.pdf'
  },
  {
    id: 'ui-ux-principles',
    title: 'UI/UX Principles',
    issuer: 'CodeCred Dev',
    issued: 'October 4, 2026',
    image: '/images/UIUX%20principles.png',
    pdfUrl: '/certificates/ui-ux-principles.pdf'
  },
  {
    id: 'web-performance',
    title: 'Web Performance & Optimization',
    issuer: 'CodeCred Dev',
    issued: 'October 4, 2026',
    image: '/images/Web%20Performance.png',
    pdfUrl: '/certificates/web-performance.pdf'
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    issuer: 'CodeCred Dev',
    issued: 'October 4, 2026',
    image: '/images/CyberSecurity%20Fundamentals.png',
    pdfUrl: '/certificates/cybersecurity-fundamentals.pdf'
  }
]

// Duplicate list so the track loops infinitely without any hard snap-back
const LOOP_CERTIFICATES = [...CERTIFICATES, ...CERTIFICATES]

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [hoverZone, setHoverZone] = useState(null) // 'prev' | 'next' | 'center' | null
  const [selectedCert, setSelectedCert] = useState(null)

  const containerRef = useRef(null)
  const x = useMotionValue(0)

  // Smooth physics state refs for requestAnimationFrame loop
  const offsetRef = useRef(0)
  const velocityRef = useRef(-0.65)
  const targetVelocityRef = useRef(-0.65)
  const snapTargetRef = useRef(null)
  const cardWidthRef = useRef(380)
  const isDraggingRef = useRef(false)
  const isTouchPausedRef = useRef(false)
  const touchResumeTimerRef = useRef(null)
  const dragStartXRef = useRef(0)
  const dragLastXRef = useRef(0)
  const didDragMoveRef = useRef(false)
  const activeIdxRef = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      let perView = 3
      if (window.innerWidth < 768) {
        perView = 1
      } else if (window.innerWidth < 1100) {
        perView = 2
      }
      setCardsPerView(perView)

      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        cardWidthRef.current = containerWidth / perView
      }
    }

    const initId = requestAnimationFrame(handleResize)
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(initId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Wrap offset seamlessly within [-singleSetWidth, 0)
  const normalizeOffset = useCallback((val) => {
    const singleSetWidth = CERTIFICATES.length * cardWidthRef.current
    if (singleSetWidth <= 0) return val
    let wrapped = val % singleSetWidth
    if (wrapped > 0) wrapped -= singleSetWidth
    return wrapped
  }, [])

  // Silky 60fps+ animation loop with inertia & smooth easing
  useEffect(() => {
    let rafId
    const tick = () => {
      const singleSetWidth = CERTIFICATES.length * cardWidthRef.current

      if (!isDraggingRef.current && !isTouchPausedRef.current && !selectedCert && singleSetWidth > 0) {
        if (snapTargetRef.current !== null) {
          const diff = snapTargetRef.current - offsetRef.current
          if (Math.abs(diff) < 0.8) {
            offsetRef.current = snapTargetRef.current
            snapTargetRef.current = null
          } else {
            offsetRef.current += diff * 0.075
          }
        } else {
          velocityRef.current +=
            (targetVelocityRef.current - velocityRef.current) * 0.055
          offsetRef.current += velocityRef.current
        }

        offsetRef.current = normalizeOffset(offsetRef.current)
        x.set(offsetRef.current)

        if (cardWidthRef.current > 0) {
          const rawIdx =
            Math.round(Math.abs(offsetRef.current) / cardWidthRef.current) %
            CERTIFICATES.length
          if (rawIdx !== activeIdxRef.current) {
            activeIdxRef.current = rawIdx
            setActiveIndex(rawIdx)
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [normalizeOffset, selectedCert, x])

  // Smooth hover-edge detection on desktop
  const handleMouseMove = (e) => {
    if (isDraggingRef.current || isTouchPausedRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / Math.max(1, rect.width)

    if (relX > 0.72) {
      const intensity = Math.min(1, (relX - 0.72) / 0.25)
      snapTargetRef.current = null
      targetVelocityRef.current = -(1.2 + intensity * 3.4)
      if (hoverZone !== 'next') setHoverZone('next')
    } else if (relX < 0.28) {
      const intensity = Math.min(1, (0.28 - relX) / 0.25)
      snapTargetRef.current = null
      targetVelocityRef.current = 1.2 + intensity * 3.4
      if (hoverZone !== 'prev') setHoverZone('prev')
    } else {
      targetVelocityRef.current = 0
      if (hoverZone !== 'center') setHoverZone('center')
    }
  }

  const handleMouseLeave = () => {
    setHoverZone(null)
    targetVelocityRef.current = -0.65
  }

  const glideByCards = (deltaCards) => {
    const stepPx = cardWidthRef.current
    const currentCard = Math.round(offsetRef.current / stepPx)
    snapTargetRef.current = (currentCard - deltaCards) * stepPx
  }

  const glideToIndex = (targetIdx) => {
    const singleSetWidth = CERTIFICATES.length * cardWidthRef.current
    const current = normalizeOffset(offsetRef.current)
    const desired = -targetIdx * cardWidthRef.current

    let diff = desired - current
    if (diff > singleSetWidth / 2) diff -= singleSetWidth
    if (diff < -singleSetWidth / 2) diff += singleSetWidth

    snapTargetRef.current = current + diff
  }

  // Pause immediately on touch so mobile taps on "View Certificate" never miss!
  const handleTouchStart = () => {
    if (touchResumeTimerRef.current) clearTimeout(touchResumeTimerRef.current)
    isTouchPausedRef.current = true
    velocityRef.current = 0
  }

  const handleTouchEnd = () => {
    if (touchResumeTimerRef.current) clearTimeout(touchResumeTimerRef.current)
    touchResumeTimerRef.current = setTimeout(() => {
      isTouchPausedRef.current = false
    }, 1800)
  }

  const handlePointerDown = (e) => {
    if (e.target.closest('button, a')) {
      // Freeze motion when pressing a button/link so mobile Safari/Chrome registers the tap 100% of the time
      isTouchPausedRef.current = true
      velocityRef.current = 0
      return
    }
    isDraggingRef.current = true
    didDragMoveRef.current = false
    snapTargetRef.current = null
    dragStartXRef.current = e.clientX
    dragLastXRef.current = e.clientX
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - dragLastXRef.current
    if (Math.abs(e.clientX - dragStartXRef.current) > 10) {
      didDragMoveRef.current = true
    }
    dragLastXRef.current = e.clientX
    offsetRef.current = normalizeOffset(offsetRef.current + dx)
    velocityRef.current = dx * 0.85
    x.set(offsetRef.current)
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    targetVelocityRef.current = hoverZone === 'center' ? 0 : -0.65
  }

  const openCertificateViewer = (cert) => {
    if (didDragMoveRef.current) {
      didDragMoveRef.current = false
      return
    }
    setSelectedCert(cert)
  }

  return (
    <section
      id="certificates"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-transparent overflow-hidden text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10 select-none"
    >
      {/* Subtle Ambient Background Accent */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400 font-mono font-bold">
              <FiAward className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              VERIFIED ACHIEVEMENTS
            </span>
            <div className="h-px w-12 bg-slate-300 dark:bg-white/15" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
            CERTIFICATES.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
            Hover near the edges or swipe to smoothly glide through all verified credentials. Tap any certificate to view it in full resolution or open the official PDF.
          </p>
        </div>

        {/* Interactive Smooth-Gliding Carousel Viewport */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
          className="relative overflow-hidden py-6 -my-6 cursor-grab active:cursor-grabbing"
        >
          {/* Soft Left Hover-Glide Indicator Pill */}
          <button
            type="button"
            onClick={() => glideByCards(-1)}
            className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/85 dark:bg-[#131722]/90 border border-white/15 text-white shadow-xl backdrop-blur-md absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 transition-all duration-500 ease-out cursor-pointer ${
              hoverZone === 'prev'
                ? 'opacity-100 translate-x-0 scale-105'
                : 'md:opacity-0 md:-translate-x-3 md:scale-95 md:pointer-events-none opacity-85'
            }`}
            title="Smooth glide previous"
            aria-label="Previous certificate"
          >
            <FiChevronLeft className="w-5 h-5 !text-white" />
          </button>

          {/* Soft Right Hover-Glide Indicator Pill */}
          <button
            type="button"
            onClick={() => glideByCards(1)}
            className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/85 dark:bg-[#131722]/90 border border-white/15 text-white shadow-xl backdrop-blur-md absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 transition-all duration-500 ease-out cursor-pointer ${
              hoverZone === 'next'
                ? 'opacity-100 translate-x-0 scale-105'
                : 'md:opacity-0 md:translate-x-3 md:scale-95 md:pointer-events-none opacity-85'
            }`}
            title="Smooth glide next"
            aria-label="Next certificate"
          >
            <FiChevronRight className="w-5 h-5 !text-white" />
          </button>

          <motion.div
            style={{ x }}
            className="flex will-change-transform"
          >
            {LOOP_CERTIFICATES.map((cert, idx) => {
              const realIdx = idx % CERTIFICATES.length
              return (
                <div
                  key={`${cert.id}-${idx}`}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="shrink-0 px-2.5 sm:px-4"
                >
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 22,
                      mass: 0.8
                    }}
                    className="group h-full rounded-[1.75rem] bg-white dark:bg-[#131722] border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/60 dark:hover:border-cyan-400/60 shadow-[0_12px_35px_-10px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_35px_-10px_rgba(0,0,0,0.5)] transition-colors duration-500 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Certificate Framed Preview */}
                    <div>
                      <button
                        type="button"
                        onClick={() => openCertificateViewer(cert)}
                        className="relative block w-full aspect-[16/11] bg-slate-100 dark:bg-[#0c0f17] p-3 sm:p-4 overflow-hidden cursor-pointer border-b border-slate-100 dark:border-white/5 text-left"
                        title={`View ${cert.title}`}
                      >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white dark:bg-[#080b11] shadow-sm border border-slate-200/80 dark:border-white/10 flex items-center justify-center">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            draggable={false}
                            loading="lazy"
                            className="w-full h-full object-contain p-1 filter blur-[3px] sm:blur-[4px] contrast-105 group-hover:blur-0 group-hover:scale-[1.02] transition-all duration-700 ease-out select-none"
                          />
                        </div>

                        {/* Top-Right Index Pill */}
                        <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-slate-900/85 dark:bg-black/80 backdrop-blur-md !text-white text-xs font-mono font-bold tracking-wider border border-white/10">
                          #{String(realIdx + 1).padStart(2, '0')}
                        </span>
                      </button>

                      {/* Certificate Metadata */}
                      <div className="p-5 sm:p-6 pb-4">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                          <span className="truncate">{cert.issuer}</span>
                          <span className="text-slate-500 dark:text-slate-400 shrink-0">
                            {cert.issued}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 min-h-[3rem] sm:min-h-[3.25rem]">
                          {cert.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action Footer — Opens Mobile-Friendly Fullscreen Viewer + PDF Option */}
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                      <button
                        type="button"
                        onClick={() => openCertificateViewer(cert)}
                        style={{
                          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                          color: '#ffffff'
                        }}
                        className="w-full py-3.5 px-4 rounded-xl hover:opacity-95 !text-white text-xs uppercase tracking-wider font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98]"
                      >
                        <FiEye className="w-4 h-4" style={{ color: '#ffffff' }} />
                        <span style={{ color: '#ffffff' }}>View Certificate</span>
                      </button>
                    </div>
                  </motion.article>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Centered Carousel Indicator Dots */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2.5">
          {CERTIFICATES.map((cert, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => glideToIndex(idx)}
                aria-label={`Glide to ${cert.title}`}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                  isActive
                    ? 'w-9 bg-cyan-600 dark:bg-cyan-400 shadow-sm'
                    : 'w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* ===== MOBILE & DESKTOP CERTIFICATE LIGHTBOX VIEWER ===== */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0f1420] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Top Header */}
              <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                      color: '#ffffff'
                    }}
                  >
                    <FiAward className="w-5 h-5" style={{ color: '#ffffff' }} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400 truncate">
                      {selectedCert.issuer} · {selectedCert.issued}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close certificate viewer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* High-Resolution Certificate Image Preview (works on all cellphones & desktop) */}
              <div className="p-3 sm:p-6 overflow-y-auto bg-slate-100 dark:bg-[#080b11] flex items-center justify-center flex-1">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-slate-200 dark:border-white/10"
                />
              </div>

              {/* Modal Bottom Action Bar */}
              <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1420] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  Verified Credential · Official Copy
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                      color: '#ffffff'
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    <FiFileText className="w-4 h-4" style={{ color: '#ffffff' }} />
                    <span style={{ color: '#ffffff' }}>Open Official PDF</span>
                    <FiExternalLink className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
