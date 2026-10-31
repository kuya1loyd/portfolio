'use client'

import { motion } from 'framer-motion'
import { FiCheck, FiMapPin, FiCode, FiDatabase, FiSmartphone, FiShield, FiArrowRight } from 'react-icons/fi'

const HIGHLIGHTS = [
  {
    icon: FiCode,
    title: 'AI-Assisted Engineering',
    description: 'Leveraging AI copilot tooling and intelligent workflows to deliver high-quality, resilient full-stack applications with high velocity.'
  },
  {
    icon: FiDatabase,
    title: 'Database Architecture',
    description: 'Relational schema design, transactions, and real-time syncing using PostgreSQL, Neon, and Supabase.'
  },
  {
    icon: FiSmartphone,
    title: 'Cross-Platform Applications',
    description: 'Crafting responsive mobile experiences with Flutter, maintaining parity between mobile and web workflows.'
  },
  {
    icon: FiShield,
    title: 'Performance & Security',
    description: 'Optimizing for Core Web Vitals, data encryption, defense-in-depth principles, and clean, resilient code.'
  }
]

const CORE_COMPETENCIES = [
  'React 19 & Next.js App Router',
  'AI-Assisted Dev & Workflow Automation',
  'Node.js & Express REST APIs',
  'PostgreSQL, Neon & Supabase',
  'Tailwind CSS & Component Systems',
  'Cross-Platform Flutter & Dart'
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-400 font-mono font-bold">
              ENGINEERING WORKFLOW &amp; CAPABILITIES
            </span>
            <div className="h-px w-12 bg-slate-300 dark:bg-white/15" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
              DEVELOPMENT <span className="text-slate-500 dark:text-slate-400">APPROACH.</span>
            </h2>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-mono font-semibold self-start md:self-auto">
              <FiMapPin className="text-cyan-600 dark:text-cyan-400" />
              <span>Philippines // Available Globally</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Narrative on Left, Competency Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* LEFT: Developer Story & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                Building complex digital systems much faster and in far fewer days with AI assistance.
              </h3>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                I am an AI-Assisted Full-Stack Developer—I am AI-assisted to make the build for systems go much faster. By combining modern AI workflows with strong software engineering fundamentals, I compress development timelines, taking what traditionally takes entire teams weeks or months and building complete, functional, high-performance systems in just a few days.
              </p>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Whether deploying property management systems with automated billing, automotive e-commerce platforms with instant filters, or cross-platform logistics apps, I harness AI assistance to make the system build go significantly faster at every stage—while ensuring rock-solid database integrity, clean maintainable code, and high runtime speed.
              </p>
            </div>

            {/* Core Strengths Checklist */}
            <div className="pt-2">
              <h4 className="text-xs sm:text-sm uppercase tracking-widest font-mono font-bold text-slate-700 dark:text-slate-300 mb-3">
                Core Technical Strengths
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CORE_COMPETENCIES.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono font-medium">
                    <span className="w-5 h-5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                      <FiCheck className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-black !text-white font-bold text-sm tracking-wide transition-all shadow-md group"
              >
                <span className="!text-white dark:!text-black">Get In Touch</span>
                <FiArrowRight className="w-4 h-4 !text-white dark:!text-black group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT: Modern 4-Card Capability Showcase */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#131722] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-700 dark:text-cyan-400 mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
