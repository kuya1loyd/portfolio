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
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 mb-6 self-start shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-700">
              AVAILABLE FOR HIRE // AI-ASSISTED FULL-STACK
            </span>
          </motion.div>

          {/* Main Hero Header */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] font-sans"
          >
            JOHN LLOYD <br />
            <span className="text-slate-400">GALITO.</span>
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-xl font-normal leading-relaxed"
          >
            AI-Assisted Full-Stack Developer leveraging artificial intelligence to build complete, production-ready systems significantly faster—delivering what others build in weeks or months in just a few days.
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
              className="px-7 py-3.5 rounded-full bg-slate-900 !text-white font-bold text-sm tracking-wide hover:bg-cyan-600 transition-all shadow-md flex items-center gap-2"
            >
              <span className="!text-white">Explore Works</span>
              <FiExternalLink className="w-4 h-4 !text-white" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-7 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-sm tracking-wide transition-all shadow-sm cursor-pointer flex items-center gap-2"
              title="Show Curriculum Vitae / Resume"
            >
              <FiFileText className="w-4 h-4 text-cyan-600" />
              <span>Show CV</span>
            </button>

            <a
              href="#contact"
              className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-400 hover:scale-105 transition-all shadow-sm"
              title="Send Message"
            >
              <FiMail className="w-5 h-5 text-cyan-600" />
            </a>

            <a
              href="https://www.facebook.com/johnlloyd.galito.33"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-400 hover:scale-105 transition-all shadow-sm"
              title="Facebook Profile"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Crisp, Framed Cyber Portrait (Real Photo) */}
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
            className="hero-portrait-card relative w-full max-w-[320px] sm:max-w-[350px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl p-2 bg-white backdrop-blur-xl group"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />

            {/* Crisp Portrait Container */}
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-slate-900">
              <img
                src="/images/profile.jpg?v=real"
                alt="John Lloyd Galito"
                className="w-full h-full object-cover object-[center_20%] filter contrast-105 brightness-100 group-hover:scale-105 transition-transform duration-700"
              />
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
