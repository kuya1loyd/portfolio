'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FiFileText, FiArrowDown } from 'react-icons/fi'
import { FaFacebook, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import SwingingBadge from './SwingingBadge'

export default function Hero({ onOpenResume }) {
  const heroRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35
  })

  // Badge scroll animation: starts centered in front of "HI, I'M JOHN LLOYD",
  // then glides up-left & tilts as you scroll to reveal "FULL-STACK DEVELOPER"
  const badgeX = useTransform(
    smoothProgress,
    [0, 0.55],
    [0, isMobile ? -58 : -195]
  )
  const badgeY = useTransform(
    smoothProgress,
    [0, 0.55],
    [0, isMobile ? -55 : -92]
  )
  const badgeRotate = useTransform(smoothProgress, [0, 0.55], [0, -7])

  // "FULL-STACK DEVELOPER" scroll reveal animation
  const roleOpacity = useTransform(smoothProgress, [0.1, 0.48], [0, 1])
  const roleY = useTransform(smoothProgress, [0.1, 0.48], [44, 0])
  const roleScale = useTransform(smoothProgress, [0.1, 0.48], [0.94, 1])

  // Subtle shift of "HI, I'M JOHN LLOYD" as role text reveals underneath
  const titleY = useTransform(smoothProgress, [0, 0.55], [0, isMobile ? -12 : -22])

  // Bottom-left bio & bottom-center scroll indicator fade out smoothly on scroll
  const bioOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0])
  const bioY = useTransform(smoothProgress, [0, 0.35], [0, 18])
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-[195vh] select-none bg-transparent"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Ambient Starfield & Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.14] dark:opacity-[0.22] bg-[radial-gradient(#64748b_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.14] bg-[radial-gradient(#06b6d4_1.2px,transparent_1.2px)] [background-size:110px_110px] [background-position:24px_36px]" />

        {/* Top Center Ambient Lanyard Spotlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[160px] bg-blue-500/15 dark:bg-indigo-500/25 rounded-full blur-[70px] pointer-events-none z-0" />

        {/* Ambient Center Glow for Role Reveal */}
        <motion.div
          style={{ opacity: roleOpacity }}
          className="absolute top-[38%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[260px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none z-0"
        />

        {/* ============================================================== */}
        {/* CENTER TYPOGRAPHY STAGE ("HI, I'M JOHN LLOYD" + SCROLL REVEAL) */}
        {/* ============================================================== */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col items-center justify-center -mt-20 sm:-mt-16 lg:-mt-20 pointer-events-none">
          {/* Giant Metallic Headline */}
          <motion.h1
            style={{ y: titleY }}
            className="text-[clamp(2.15rem,7.6vw,7.4rem)] font-black tracking-tight uppercase leading-none text-center whitespace-nowrap bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-500 bg-clip-text text-transparent drop-shadow-xs"
          >
            HI, I&apos;M JOHN LLOYD
          </motion.h1>

          {/* Scroll-Revealed "FULL-STACK DEVELOPER" Underneath Right/Center */}
          <motion.div
            style={{
              opacity: roleOpacity,
              y: roleY,
              scale: roleScale
            }}
            className="mt-2 sm:mt-3 md:mt-4 self-center md:self-end md:mr-[6%] lg:mr-[10%] text-center md:text-left"
          >
            <div
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(236, 72, 153, 0.85) 0%, rgba(168, 85, 247, 0.88) 50%, rgba(56, 189, 248, 0.9) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
              className="text-[clamp(1.85rem,6.2vw,5.8rem)] font-black tracking-tight uppercase leading-[0.96] font-sans select-none"
            >
              <div>FULL-STACK</div>
              <div>DEVELOPER</div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* HANGING INTERACTIVE FSUU ID BADGE (CENTER -> SWINGS UP-LEFT)   */}
        {/* ============================================================== */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-20 pointer-events-none">
          <motion.div
            style={{
              x: badgeX,
              y: badgeY,
              rotate: badgeRotate
            }}
            className="origin-top scale-[0.78] sm:scale-90 lg:scale-95 xl:scale-100 pointer-events-none"
          >
            <SwingingBadge lanyardHeight={215} />
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM-LEFT BIO & QUICK PORTFOLIO LINKS                        */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: bioOpacity, y: bioY }}
          className="absolute bottom-16 sm:bottom-9 left-5 sm:left-10 lg:left-14 z-30 max-w-[290px] sm:max-w-xs"
        >
          <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
            An AI-assisted full-stack developer passionate about building fast,
            reliable, and memorable web apps.
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-cyan-600 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-800 dark:border-white/15 text-white font-bold text-xs tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              title="Show Curriculum Vitae / Resume"
            >
              <FiFileText className="w-3.5 h-3.5 text-cyan-400" />
              <span className="!text-white">Show CV</span>
            </button>

            <a
              href="https://www.linkedin.com/in/john-lloyd-galito-299a80422/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-[#0077B5] dark:bg-white/10 dark:hover:bg-[#0077B5] border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white hover:text-white transition-all"
              title="LinkedIn Profile"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.instagram.com/john_lloyd_galito/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-[#E4405F] dark:bg-white/10 dark:hover:bg-[#E4405F] border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white hover:text-white transition-all"
              title="Instagram Profile"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.facebook.com/johnlloyd.galito.33"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-[#1877F2] dark:bg-white/10 dark:hover:bg-[#1877F2] border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white hover:text-white transition-all"
              title="Facebook Profile"
            >
              <FaFacebook className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BOTTOM-CENTER "SCROLL ↓" INDICATOR                             */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 pointer-events-none"
        >
          <span>SCROLL</span>
          <FiArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
