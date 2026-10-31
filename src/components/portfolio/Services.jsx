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
    <section
      id="services"
      className="relative w-full py-24 px-6 md:px-16 lg:px-24 bg-transparent text-slate-900 dark:text-white overflow-hidden border-t border-slate-200/80 dark:border-white/10"
    >
      <div className="max-w-[1500px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-400 font-mono font-bold">
            WHAT I DO // CORE COMPETENCIES
          </span>
          <div className="h-px w-[min(70vw,420px)] bg-gradient-to-r from-slate-400 via-slate-200 to-transparent dark:from-white/60 dark:via-white/20 dark:to-transparent" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight select-none">
            Services
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white dark:bg-[#131722] rounded-[1.75rem] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/60 dark:hover:border-cyan-400/50 hover:-translate-y-1 overflow-hidden shadow-md hover:shadow-xl"
              >
                {/* Background Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.04] rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/[0.1] transition-colors duration-500" />

                {/* Top Card Bar */}
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-400/30 px-3.5 py-1 rounded-full">
                    {service.tag}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                    0{index + 1} // ARCHITECTURE
                  </span>
                </div>

                {/* Card Main Information */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-white/10 border border-cyan-200 dark:border-white/15 flex items-center justify-center text-cyan-700 dark:text-cyan-300 group-hover:scale-105 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-5">
                    {service.description}
                  </p>

                  {/* Connected Skills Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 group-hover:border-cyan-500/40 dark:group-hover:border-cyan-400/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Link to Skills */}
                <a
                  href="#about"
                  className="relative z-10 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 group/link transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    Connect to Skills
                  </span>
                  <span className="text-base font-bold transition-transform duration-300 group-hover/link:translate-x-1.5 text-slate-700 dark:text-slate-300 group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-400">
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
