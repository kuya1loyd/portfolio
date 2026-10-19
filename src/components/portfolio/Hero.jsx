'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink, FiCompass } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'

export default function Hero({ onOpenResume }) {
  const [isBatman, setIsBatman] = useState(false)
  const heroRef = useRef(null)

  // 3D Parallax & Cursor Panimation physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 140, mass: 0.8 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10])
  const panX = useTransform(smoothX, [-0.5, 0.5], [-20, 20])
  const panY = useTransform(smoothY, [-0.5, 0.5], [-16, 16])

  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    mouseX.set(clientX / width - 0.5)
    mouseY.set(clientY / height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const toggleEasterEgg = () => {
    setIsBatman((prev) => !prev)
  }

  const activeImage = isBatman ? '/images/Batman.jpg' : '/images/profile.jpg'

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-transparent select-none"
    >
      {/* ============================================================== */}
      {/* AMBIENT GRID & TELEMETRY */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Subtle Cyan Cyber Radial Glow */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      {/* ============================================================== */}
      {/* GIANT SLIDING NAME MARQUEE BACKDROP */}
      {/* ============================================================== */}
      <div className="absolute top-[32%] md:top-[34%] left-0 right-0 overflow-hidden pointer-events-none select-none whitespace-nowrap z-0">
        <motion.div
          className="inline-block text-[14vw] font-black tracking-tighter uppercase font-sans text-white/[0.12] leading-none"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          JOHN LLOYD GALITO — FULL-STACK DEVELOPER — JOHN LLOYD GALITO — FULL-STACK DEVELOPER —
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* FULL ATMOSPHERIC HERO PORTRAIT (Right Side with 3D Panimation) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end overflow-hidden pointer-events-none">
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: panX,
            y: panY,
            transformPerspective: 1200
          }}
          className="relative w-full max-w-[1050px] h-[90vh] lg:h-[100vh] flex items-center justify-center lg:justify-end mr-0 lg:mr-8 select-none"
        >
          <div className="relative w-full h-full max-w-[840px]">
            {/* The Full Portrait Image */}
            <img
              src={activeImage}
              alt="John Lloyd Galito"
              className="w-full h-full object-cover object-[center_30%] lg:object-[center_25%] filter contrast-105 brightness-95 select-none"
            />

            {/* Seamless gradient vignettes blending into pure pitch black #000000 */}
            <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/60 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* HERO TYPOGRAPHY & HUD CONTROLS */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-14 lg:px-24 flex flex-col justify-center min-h-[100vh] pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Full-Stack Status Kicker Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-widest uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>FULL-STACK ARCHITECTURE // REACT 19 &amp; NEXT.JS</span>
          </motion.div>

          {/* Subtitle / Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-white/80 font-normal tracking-wide"
          >
            Full-Stack Developer &amp; UI/UX Designer
          </motion.p>

          {/* Huge Signature Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.05] mt-2 select-none"
          >
            John Lloyd
            <br />
            Galito
          </motion.h1>

          {/* Concise Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-300 max-w-[600px] mt-4 text-sm md:text-base font-light leading-relaxed"
          >
            Crafting high-performance, responsive web applications engineered with modern Next.js, React 19, scalable backend architectures, and clean database solutions.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-8 pointer-events-auto"
          >
            {/* Button 1: Show CV */}
            <button
              type="button"
              onClick={onOpenResume}
              className="group relative overflow-hidden px-4 py-3.5 md:px-8 md:py-4 border border-white/50 text-white uppercase tracking-[0.2em] cursor-pointer text-[.65rem] md:text-[.75rem] font-bold transition-colors duration-300 hover:border-cyan-400 rounded-none bg-black/40 backdrop-blur-sm"
            >
              <span className="absolute inset-0 w-full h-full bg-white -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-x-0" />
              <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:text-black">
                Show CV
              </span>
            </button>

            {/* Button 2: Contact Me */}
            <a
              href="#contact"
              className="group relative overflow-hidden px-4 py-3.5 md:px-8 md:py-4 bg-white border border-white cursor-pointer text-black uppercase tracking-[0.2em] text-[.65rem] md:text-[.75rem] font-bold transition-colors duration-300 rounded-none"
            >
              <span className="absolute inset-0 w-full h-full bg-cyan-400 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-x-0" />
              <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:text-black">
                Contact Me
              </span>
            </a>
          </motion.div>

          {/* Social Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex gap-4 md:gap-6 pointer-events-auto"
            aria-label="Social channels"
          >
            <a
              href="https://github.com/kuya1loyd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400 hover:scale-110 transition-all duration-300 shadow-lg"
              title="GitHub Profile"
            >
              <FiGithub className="w-4 h-4 md:w-5 md:h-5" />
            </a>

            <a
              href="https://www.facebook.com/johnlloyd.galito.33"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400 hover:scale-110 transition-all duration-300 shadow-lg"
              title="Facebook Profile"
            >
              <FaFacebook className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD Coordinates & Easter Egg Toggle */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 pointer-events-auto">
        <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-white/40 tracking-widest uppercase">
          <span className="text-cyan-400">&gt;_</span>
          <span>LOC: 0,50</span>
        </div>

        <button
          type="button"
          onClick={toggleEasterEgg}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
          title="Toggle Portrait Variant"
        >
          <FiCompass className="w-3 h-3 text-cyan-400" />
          <span>{isBatman ? 'ORIGINAL' : 'SECRET ⚡'}</span>
        </button>
      </div>
    </section>
  )
}
