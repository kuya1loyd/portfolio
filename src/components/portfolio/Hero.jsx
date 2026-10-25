'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiExternalLink, FiMail, FiFileText } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'

export default function Hero({ onOpenResume }) {
  const heroRef = useRef(null)

  // 3D Parallax & Cursor Pan physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 140, mass: 0.8 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])
  const panX = useTransform(smoothX, [-0.5, 0.5], [-15, 15])
  const panY = useTransform(smoothY, [-0.5, 0.5], [-12, 12])

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

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-transparent select-none pt-28 pb-16"
    >
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Ambient Cyber Glow */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* ============================================================== */}
      {/* TRANSPARENT OUTLINE SLIDING MARQUEE WATERMARK */}
      {/* ============================================================== */}
      <div className="absolute top-[28%] left-0 right-0 overflow-hidden pointer-events-none select-none whitespace-nowrap z-0">
        <motion.div
          className="hero-marquee inline-block text-[14vw] font-black tracking-tighter uppercase font-sans leading-none pointer-events-none"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          JOHN LLOYD GALITO — FULL-STACK DEVELOPER — JOHN LLOYD GALITO — FULL-STACK DEVELOPER —
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* HERO MAIN CONTENT GRID (Two-Column Balanced Layout) */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-14 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
        
        {/* Left Column: Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status Kicker Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md self-start"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-300">
              AVAILABLE FOR HIRE // FULL-STACK
            </span>
          </motion.div>

          {/* Main Hero Header */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] font-sans"
          >
            JOHN LLOYD <br />
            <span className="text-white/40">GALITO.</span>
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-white/70 max-w-xl font-light leading-relaxed"
          >
            Full-Stack Software Developer specializing in responsive React 19 web apps, scalable backend systems, database architecture, and cross-platform solutions.
          </motion.p>

          {/* Actions & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Explore Works</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 hover:border-cyan-400 transition-colors cursor-pointer flex items-center gap-2"
              title="Show Curriculum Vitae / Resume"
            >
              <FiFileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Show CV</span>
            </button>

            <a
              href="#contact"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400 hover:scale-110 transition-all duration-300 shadow-lg"
              title="Send Message"
            >
              <FiMail className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
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

        {/* Right Column: Crisp, Framed Cyber Portrait (No Foggy Washes!) */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: panX,
              y: panY,
              transformPerspective: 1000
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-portrait-card relative w-full max-w-[440px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl p-2 bg-[#0d0d0d]/80 backdrop-blur-xl group"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />

            {/* Crisp Portrait Container */}
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-[#07080b]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.jpg"
                alt="John Lloyd Galito"
                className="w-full h-full object-cover object-[center_20%] filter contrast-105 brightness-100 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Subtle Identity Tag */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 dark:bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white tracking-wide">
                    John Lloyd Galito
                  </p>
                  <p className="text-[10px] text-cyan-300 font-mono tracking-wider">
                    Full-Stack Software Developer
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom HUD Coordinates */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-white/40 tracking-widest uppercase pointer-events-none">
        <span className="text-cyan-400">&gt;_</span>
        <span>SYS_STATUS: ONLINE</span>
      </div>
    </section>
  )
}
