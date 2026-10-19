'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FaLaptopCode, FaPaintBrush, FaDatabase, FaServer } from 'react-icons/fa'

const services = [
  {
    icon: FaLaptopCode,
    title: 'High-Performance Web Apps',
    description:
      'Blazing-fast, SEO-optimized web applications built with modern tools like React 19, Next.js, and TypeScript. Designed to load instantly, achieve peak Core Web Vitals, and scale effortlessly.',
    tag: 'FRONT-END DEV',
    skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    icon: FaPaintBrush,
    title: 'UI/UX & Motion Design',
    description:
      'Clean, luxury interfaces that feel natural to navigate. Blending fluid Framer Motion animations with thoughtful typography, design systems, and micro-interactions that captivate users.',
    tag: 'CREATIVE DEV',
    skills: ['Framer Motion', 'Figma', 'UI/UX Systems', 'Micro-Interactions', 'Responsive Design'],
  },
  {
    icon: FaDatabase,
    title: 'Full-Stack & Database Solutions',
    description:
      'Robust server-side integrations and database management with Node.js, Express, Supabase, PostgreSQL, and MySQL. Secure REST APIs and resilient state architecture.',
    tag: 'BACKEND & DATA',
    skills: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'MySQL'],
  },
  {
    icon: FaServer,
    title: 'API & Cloud Architecture',
    description:
      'Designing scalable RESTful APIs, authentication pipelines, microservice integrations, and production cloud deployments with end-to-end full-stack reliability.',
    tag: 'FULL-STACK & CLOUD',
    skills: ['REST APIs', 'Cloud Deployments', 'Vercel', 'JWT Auth', 'Git / CI/CD'],
  },
]

const Services = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="services" className="relative w-full py-20 px-6 md:px-16 lg:px-24 bg-transparent text-white overflow-hidden border-t border-white/5">
      <div className="max-w-[1500px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-mono">
            WHAT I DO // CORE COMPETENCIES
          </span>
          <div className="h-px w-[min(70vw,420px)] bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
          <h2 className="text-[clamp(2.4rem,calc(6vw+.8rem),5rem)] font-bold text-white leading-none tracking-tight select-none">
            Services
          </h2>
        </div>

        {/* Adjusted Sleek Service Cards (Compact & Connected to Skills) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#121212] rounded-[1.75rem] border border-white/10 p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1 overflow-hidden shadow-xl"
              >
                {/* Background Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.03] rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/[0.08] transition-colors duration-500" />

                {/* Top Card Bar */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/30">
                    0{index + 1} // ARCHITECTURE
                  </span>
                </div>

                {/* Card Main Information */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-105 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs md:text-[13px] text-white/60 leading-relaxed font-light mb-4">
                    {service.description}
                  </p>

                  {/* Connected Skills Pill Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70 group-hover:border-cyan-400/30 group-hover:text-cyan-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Link to Skills */}
                <a
                  href="#about"
                  className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs text-white/40 hover:text-cyan-400 group/link transition-colors"
                >
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Connect to Skills
                  </span>
                  <span className="text-sm transition-transform duration-300 group-hover/link:translate-x-1.5 text-white/60 group-hover/link:text-cyan-400">
                    →
                  </span>
                </a>
              </motion.article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Services
