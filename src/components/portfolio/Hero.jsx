'use client'

import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

export default function Hero({ onOpenResume }) {
  const scrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[680px] max-h-[1100px] bg-[#07080b] text-white overflow-hidden select-none"
    >
      {/* ============================================================== */}
      {/* 1. STUDIO LIGHTING & BACKLIGHT GLOW                            */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Soft Radial Backlight Spotlight Behind Head & Shoulders */}
        <div
          className="absolute left-1/2 top-[40%] md:top-[38%] -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[650px] md:w-[860px] h-[400px] sm:h-[580px] md:h-[720px] rounded-full blur-[80px] sm:blur-[110px] md:blur-[140px] opacity-75 md:opacity-85 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 235, 220, 0.32) 0%, rgba(180, 165, 150, 0.14) 34%, rgba(7, 8, 11, 0) 70%)'
          }}
        />

        {/* Ambient Dark Studio Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,8,0.92)_100%)] pointer-events-none" />

        {/* Bottom Smooth Dissolve to Canvas Base */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#07080b] via-[#07080b]/90 to-transparent pointer-events-none z-10" />
      </div>

      {/* ============================================================== */}
      {/* 2. CENTER PORTRAIT (Rises from bottom, head between top text)  */}
      {/* ============================================================== */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-end justify-center h-[68vh] sm:h-[76vh] md:h-[84vh] max-h-[820px] w-full"
        >
          <img
            src="/images/hero_portrait.png"
            alt="John Lloyd Galito"
            draggable={false}
            className="h-full w-auto max-w-[90vw] sm:max-w-[75vw] md:max-w-none object-contain object-bottom select-none filter contrast-[1.05] brightness-[0.98]"
          />
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 3. DESKTOP PAIRED TOP TYPOGRAPHY (Left Headline / Right Bio)   */}
      {/* ============================================================== */}
      <div className="hidden md:block">
        {/* Top-Left Statement (Pinned to Top-Left, Left of Head) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-10 lg:top-14 left-8 sm:left-12 lg:left-16 z-20 max-w-[340px] lg:max-w-[380px] text-left pointer-events-auto"
        >
          <h2 className="text-xl lg:text-2xl font-extrabold uppercase tracking-tight text-white leading-[1.16] font-sans">
            DEVELOPMENT FOR
            <br />
            WEB APPLICATIONS
            <br />
            BUILT AROUND REAL
            <br />
            REQUIREMENTS.
          </h2>
        </motion.div>

        {/* Top-Right Bio & Action Pills (Pinned to Top-Right, Right of Head) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-10 lg:top-14 right-8 sm:right-12 lg:right-16 z-20 max-w-[360px] lg:max-w-[400px] text-right flex flex-col items-end gap-4 pointer-events-auto"
        >
          <p className="text-xs lg:text-sm text-slate-300 font-normal leading-relaxed font-sans">
            Hi, I'm Lloyd — a full-stack developer working across frontend interfaces and backend systems to turn product requirements into fast, maintainable applications.
          </p>

          <div className="flex items-center gap-3 pt-0.5">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-900 border border-white/20 hover:border-white/50 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 backdrop-blur-md active:scale-95 cursor-pointer"
            >
              RESUME
            </button>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 4. MOBILE TOP HEADER (Fluid responsive stack for phones)       */}
      {/* ============================================================== */}
      <div className="md:hidden relative z-20 w-full px-5 pt-7 flex flex-col gap-3 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-white leading-tight font-sans">
            DEVELOPMENT FOR WEB APPLICATIONS
            <br />
            BUILT AROUND REAL REQUIREMENTS.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-left flex flex-col gap-2.5"
        >
          <p className="text-[11px] sm:text-xs text-slate-300 font-normal leading-relaxed font-sans max-w-sm">
            Hi, I'm Lloyd — a full-stack developer turning product requirements into fast, maintainable applications.
          </p>

          <div className="flex items-center gap-2 pt-0.5">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-3.5 py-1.5 rounded-full bg-black border border-white/20 text-white font-semibold text-[10px] tracking-wider uppercase inline-flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <FiArrowUpRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white font-semibold text-[10px] tracking-wider uppercase backdrop-blur-md active:scale-95 cursor-pointer"
            >
              RESUME
            </button>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 5. GIGANTIC LUXURY EDITORIAL SERIF NAME (OVERLAPPING CHEST)     */}
      {/* ============================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-14 sm:bottom-16 md:bottom-18 inset-x-0 z-20 pointer-events-none text-center px-2 sm:px-4"
      >
        <h1
          className="font-editorial text-white text-[clamp(2.5rem,9.6vw,11.5rem)] leading-[0.84] tracking-[-0.015em] select-none whitespace-nowrap"
          style={{
            textShadow:
              '0 12px 36px rgba(0, 0, 0, 0.95), 0 4px 14px rgba(0, 0, 0, 0.8)'
          }}
        >
          John Lloyd Galito
        </h1>
      </motion.div>
    </section>
  )
}
