'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus,
  FiChevronUp,
  FiExternalLink,
  FiLayers
} from 'react-icons/fi'

const REAL_PROJECTS = [
  {
    id: 'rentrack',
    name: 'RenTrack',
    title: 'RenTrack',
    subtitle: 'Web application · Property & Rental Management',
    year: '2026',
    category: 'Web Application',
    description:
      'A comprehensive property rental management, automated billing, payments, and receivables monitoring system built with Next.js. Streamlines lease contracts, tenant payment histories, monthly statements, and occupancy telemetry in an intuitive dashboard designed to replace fragmented spreadsheets.',
    liveLink: 'https://rentrack-beige.vercel.app/',
    image: '/images/projects/rentrack.png',
    tags: ['Next.js 15', 'React 19', 'PostgreSQL', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 'buildtrack-application',
    name: 'BuildTrack',
    title: 'BuildTrack',
    subtitle: 'Mobile app · Construction Management System',
    year: '2026',
    category: 'Mobile Application',
    description:
      'A cross-platform mobile application engineered specifically for on-site construction tracking, material warehouse inventory, workforce attendance logs, and milestone scheduling. Features offline-first synchronisation with Neon PostgreSQL to ensure job site engineers never lose vital project updates.',
    liveLink: null,
    image: '/images/projects/buildtrack_phone.png',
    tags: ['Flutter', 'Dart', 'Neon Postgres', 'REST API', 'Cross-Platform']
  },
  {
    id: 'carvex-carparts',
    name: 'CarVex',
    title: 'CarVex',
    subtitle: 'Web platform · Automotive Procurement & E-Commerce',
    year: '2026',
    category: 'E-Commerce Platform',
    description:
      'An automotive components catalog and procurement hub built for frictionless discovery. Combines instant multi-tiered filtering by vehicle year, make, and model with smart inventory caching and lightning-fast checkout workflows for automotive repair specialists and distributors.',
    liveLink: 'https://carvex-carparts-omega.vercel.app/',
    image: '/images/projects/carvex.png',
    tags: ['React', 'Vite', 'E-Commerce', 'Tailwind CSS', 'Frictionless POS']
  }
]

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleProject = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-cyan-500/[0.02] dark:bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-cyan-600 dark:text-cyan-400 font-mono font-bold">
              <FiLayers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              PORTFOLIO SHOWCASE
            </span>
            <div className="h-px w-12 bg-slate-300 dark:bg-white/15" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
            FEATURED <span className="text-slate-400 dark:text-slate-500">PROJECTS.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
            Click any project to expand its architecture, features, and deployment telemetry. Click the header again to collapse it back up.
          </p>
        </div>

        {/* Expandable Project List */}
        <div className="space-y-4">
          {REAL_PROJECTS.map((project) => {
            const isExpanded = expandedId === project.id
            const isMobile = project.category === 'Mobile Application'

            return (
              <div
                key={project.id}
                className="overflow-hidden transition-all duration-300"
              >
                <AnimatePresence initial={false} mode="wait">
                  {!isExpanded ? (
                    /* ============================================================ */
                    /* COLLAPSED PROJECT ROW (Deni-Style Pill)                      */
                    /* ============================================================ */
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleProject(project.id)}
                      className="project-collapsed-card group flex items-center justify-between p-4 sm:p-5 rounded-[1.75rem] bg-[#f1f3f6] hover:bg-[#e9ecf0] dark:bg-[#131722] dark:hover:bg-[#181d2a] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      {/* Left: Thumbnail & Titles */}
                      <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                        {/* Thumbnail Badge */}
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white dark:bg-black/80 border border-slate-200/80 dark:border-white/15 shadow-sm shrink-0 flex items-center justify-center p-0.5">
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`w-full h-full ${
                              isMobile
                                ? 'object-contain p-1'
                                : 'object-cover object-top'
                            } group-hover:scale-105 transition-transform duration-300`}
                          />
                        </div>

                        {/* Title & Subtitle */}
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal truncate mt-0.5">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right: Year & Plus Button */}
                      <div className="flex items-center gap-4 shrink-0 pl-3">
                        <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-medium">
                          {project.year}
                        </span>

                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-white text-slate-800 border border-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/15 flex items-center justify-center transition-colors shadow-xs">
                          <FiPlus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* ============================================================ */
                    /* EXPANDED CARD (Click header bar to drop back up / collapse)  */
                    /* ============================================================ */
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="rounded-3xl bg-white dark:bg-[#131722] border border-slate-200/90 dark:border-white/10 shadow-xl p-6 sm:p-8 transition-all"
                    >
                      {/* Entire Top Header Row is Clickable to Drop-Up / Collapse */}
                      <div
                        onClick={() => toggleProject(project.id)}
                        className="group/hdr flex items-center justify-between pb-6 border-b border-slate-100 dark:border-white/10 cursor-pointer select-none transition-colors"
                        title="Click to collapse / drop up"
                      >
                        {/* Left: Thumbnail & Titles */}
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 dark:bg-black/80 border border-slate-200 dark:border-white/15 shadow-xs shrink-0 flex items-center justify-center">
                            <img
                              src={project.image}
                              alt={project.title}
                              className={`w-full h-full ${
                                isMobile
                                  ? 'object-contain p-1'
                                  : 'object-cover object-top'
                              }`}
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover/hdr:text-cyan-600 dark:group-hover/hdr:text-cyan-400 transition-colors truncate">
                                {project.title}
                              </h3>
                              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-medium opacity-0 group-hover/hdr:opacity-100 transition-opacity">
                                (click to collapse ↑)
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal truncate">
                              {project.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Right: Year & Drop-Up Chevron Toggle */}
                        <div className="flex items-center gap-3 shrink-0 pl-3">
                          <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-medium">
                            {project.year}
                          </span>

                          <div
                            className="w-9 h-9 rounded-full bg-slate-100 group-hover/hdr:bg-[#111622] group-hover/hdr:text-white dark:bg-white/10 dark:group-hover/hdr:bg-cyan-500 dark:group-hover/hdr:text-black text-slate-700 dark:text-white flex items-center justify-center transition-all shadow-xs"
                            title="Drop up / Collapse"
                          >
                            <FiChevronUp className="w-5 h-5 group-hover/hdr:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Body Content Grid (Two Columns on Desktop) */}
                      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Clean Project Image Showcase */}
                        <div className="lg:col-span-5">
                          {isMobile ? (
                            /* Clean Mobile Phone Showcase */
                            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#131722] to-slate-950 p-4 border border-slate-200/60 dark:border-white/10 shadow-inner flex items-center justify-center">
                              <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                  src={project.image}
                                  alt={`${project.title} mobile showcase`}
                                  className="w-full h-full object-contain filter contrast-105"
                                />
                              </div>
                            </div>
                          ) : (
                            /* Clean Desktop Web Platform Showcase */
                            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#131722] to-slate-950 border border-slate-200/60 dark:border-white/10 shadow-inner flex items-center justify-center group/media">
                              {project.liveLink ? (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative w-full h-full block cursor-pointer"
                                  title={`Open ${project.title} live deployment`}
                                >
                                  <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    className="w-full h-full object-cover object-top filter brightness-95 group-hover/media:scale-103 group-hover/media:brightness-100 transition-all duration-500"
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-4 py-2 rounded-full bg-cyan-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                                      <span>Launch Site</span>
                                      <FiExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                  </div>
                                </a>
                              ) : (
                                <img
                                  src={project.image}
                                  alt={`${project.title} preview`}
                                  className="w-full h-full object-cover object-top"
                                />
                              )}
                            </div>
                          )}
                        </div>

                        {/* RIGHT COLUMN: Rich Description, Tech Stack & Primary Action */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                          {/* Rich Narrative Description */}
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {project.description}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="flex flex-wrap items-center gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-sans font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Bottom Primary Action Button */}
                          <div className="pt-2">
                            {project.liveLink ? (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#14b8a6] hover:bg-[#0d9488] !text-white text-xs font-bold font-sans tracking-wide transition-all shadow-md hover:shadow-teal-500/20 cursor-pointer"
                              >
                                <span className="!text-white">Visit Live Site</span>
                                <FiExternalLink className="w-3.5 h-3.5 !text-white" />
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-cyan-500 dark:text-black !text-white text-xs font-bold font-sans tracking-wide shadow-sm">
                                <span className="!text-white dark:!text-black">Mobile Application</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
