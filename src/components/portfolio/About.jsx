'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiCheck, FiDownload, FiExternalLink, FiMapPin, FiMail, FiCompass, FiFileText } from 'react-icons/fi'

export default function About({ onOpenResume }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  // Cursor-driven 3D Panimation physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for fluid, physics-based pan tracking
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Perspective 3D rotation based on mouse coordinates
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12])
  const panX = useTransform(smoothX, [-0.5, 0.5], [-18, 18])
  const panY = useTransform(smoothY, [-0.5, 0.5], [-18, 18])
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    // Normalize coordinates between -0.5 and 0.5
    mouseX.set(clientX / width - 0.5)
    mouseY.set(clientY / height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <section id="about" className="relative py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-white border-t border-white/5">
      {/* Infinite Horizontal Sliding Marquee Backdrop */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden pointer-events-none select-none whitespace-nowrap z-0">
        <motion.div
          className="inline-block text-[11vw] font-black tracking-tighter uppercase font-sans text-white/[0.14]"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          JOHN LLOYD GALITO — FULL-STACK DEVELOPER (FRONT-END &amp; BACK-END) — JOHN LLOYD GALITO — FULL-STACK DEVELOPER (FRONT-END &amp; BACK-END) —
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">
              BIOGRAPHY & IDENTITY
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
            ABOUT <span className="text-white/40">ME.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: 3D Interactive Panimation Portrait Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-sm aspect-[4/5] [perspective:1000px] cursor-pointer select-none"
            >
              {/* Outer Glow Halo */}
              <motion.div
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/20 via-white/10 to-transparent blur-2xl -z-10"
                animate={{
                  opacity: isHovered ? 0.8 : 0.3,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* 3D Tilting Card */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#121212] border border-white/15 shadow-2xl p-2.5 transition-shadow duration-500 hover:shadow-cyan-500/10"
              >
                {/* Inner Image Wrapper with cursor pan tracking */}
                <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-black">
                  {/* Portrait with Panimation */}
                  <motion.div
                    style={{
                      x: panX,
                      y: panY,
                      scale: isHovered ? 1.08 : 1.02,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full h-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/profile.jpg"
                      alt="John Lloyd Galito"
                      className="w-full h-full object-cover object-center filter contrast-105 brightness-95 transition-all duration-700"
                    />

                    {/* Gradient overlay for depth */}
                    <div className="about-portrait-overlay absolute inset-0" />
                  </motion.div>

                  {/* Dynamic Glare Reflection */}
                  <motion.div
                    style={{
                      background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 60%)`,
                    }}
                    className="absolute inset-0 pointer-events-none"
                  />

                  {/* Floating Identity Badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">
                        John Lloyd Galito
                      </p>
                      <p className="text-[10px] text-white/50 font-mono tracking-wider">
                        Full-Stack Developer
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md text-[9px] font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hint below picture */}
            <p className="mt-4 text-[11px] font-mono tracking-widest text-white/30 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Pan cursor to track 3D perspective
            </p>
          </div>

          {/* RIGHT: Biography & Professional Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono">
                <FiMapPin className="text-cyan-400" />
                <span>Based in Philippines // Available Globally</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Crafting robust, end-to-end web applications with modern full-stack architectures.
              </h3>

              <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
                I am a passionate <span className="text-white font-medium">Full-Stack Developer (Front-End &amp; Back-End)</span> dedicated to building scalable web applications. From crafting intuitive, responsive user interfaces in React 19 and Next.js to architecting resilient server-side APIs, database schemas, and microservice workflows, I deliver comprehensive digital solutions.
              </p>

              <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
                Every project I engineer focuses on sub-second render performance, robust API contract design, relational data integrity, and seamless user experiences across all devices.
              </p>

              {/* Core Strengths Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'React 19 & Next.js App Router',
                  'Node.js, Express & REST APIs',
                  'PostgreSQL, Supabase & MySQL',
                  'Tailwind CSS & Design Systems',
                  'TypeScript & State Management',
                  'Full-Stack Cloud Deployments'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80 font-mono">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <FiCheck className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Call to Actions matching Abdallah Hijazi button style */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="group relative px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 shadow-xl shadow-white/10"
                >
                  <span className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors">
                    <FiFileText className="w-4 h-4" />
                    <span>Show CV</span>
                  </span>
                </button>

                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
