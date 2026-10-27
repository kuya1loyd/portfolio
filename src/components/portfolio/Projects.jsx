'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Real curated projects based on Lloyd's actual deployments and codebase
const REAL_GITHUB_PROJECTS = [
  {
    id: 'rentrack',
    name: 'RenTrack',
    title: 'HedgeHomes Realty & RentTrack',
    category: 'Web Application',
    description: 'Comprehensive property rental management, payments, and receivables monitoring system built with Next.js.',
    liveLink: 'https://rentrack-beige.vercel.app/',
    image: '/images/projects/rentrack.png',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    stars: 1,
    accent: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'buildtrack-application',
    name: 'BuildTrack-Application',
    title: 'BuildTrack Construction Management',
    category: 'Mobile Application',
    description: 'Cross-platform mobile application for construction project tracking, material management, worker logs, task schedules, and Neon PostgreSQL sync.',
    liveLink: null,
    image: '/images/projects/buildtrack_phone.png',
    tags: ['Flutter', 'Neon Postgres', 'Mobile App'],
    stars: 0,
    accent: 'from-purple-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'carvex-carparts',
    name: 'Carvex-Carparts',
    title: 'CarVex Automotive Parts Catalog',
    category: 'E-Commerce Platform',
    description: 'Automotive components catalog and procurement hub with dynamic search filtration, local inventory caching, and friction-free checkout flows.',
    liveLink: 'https://carvex-carparts-omega.vercel.app/',
    image: '/images/projects/carvex.png',
    tags: ['React', 'Tailwind CSS', 'E-Commerce'],
    stars: 1,
    accent: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  }
]

// Language accent colors
const LANGUAGE_ACCENTS = {
  TypeScript: 'from-cyan-500/20 via-blue-500/10 to-transparent',
  JavaScript: 'from-amber-500/20 via-yellow-500/10 to-transparent',
  Dart: 'from-purple-500/20 via-indigo-500/10 to-transparent',
  Python: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  HTML: 'from-orange-500/20 via-red-500/10 to-transparent',
  CSS: 'from-blue-500/20 via-indigo-500/10 to-transparent'
}

// Reliable resolver for ultra-sharp Retina landing page screenshots
function getProjectImage(project) {
  if (!project) return null
  const key = (project.name || project.id || '').toLowerCase()
  if (key.includes('rentrack')) return '/images/projects/rentrack.png'
  if (key.includes('carvex')) return '/images/projects/carvex.png'
  if (key.includes('buildtrack')) return '/images/projects/buildtrack_phone.png'
  return project.image || null
}

// Fallback preview for dynamically discovered repos without custom screenshots
function DynamicRepoPreview({ project }) {
  return (
    <div className="relative w-full h-full bg-[#0d1117] text-white overflow-hidden flex flex-col justify-between p-4 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-bold text-white truncate">{project.title}</span>
        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
          {project.category || 'Production'}
        </span>
      </div>
      <div className="my-auto py-2">
        <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-light">
          {project.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] text-white/50 font-mono">
        <span>Production Build</span>
        <span className="text-cyan-400">★ {project.stars || 1}</span>
      </div>
    </div>
  )
}

// Realistic Standalone Laptop Mockup (For Web Applications)
function StandaloneLaptop({ project, hasLive }) {
  const projectImage = getProjectImage(project)

  return (
    <div className="relative w-full max-w-[285px] select-none">
      {/* Laptop Lid / Screen Display */}
      <div className="relative rounded-t-xl bg-[#161a22] border-2 border-[#2b3342] p-1.5 shadow-xl transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/15">
        {/* Top Camera Bezel */}
        <div className="flex items-center justify-center pb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#07090e] border border-white/25 shadow-inner" />
        </div>

        {/* 16:10 Display Screen */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-sm bg-black border border-white/5">
          {hasLive ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live deployment in new tab`}
              className="block w-full h-full cursor-pointer"
            >
              <img
                src={projectImage}
                alt={`${project.title} live landing preview`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
              />
            </a>
          ) : (
            <img
              src={projectImage}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              loading="eager"
            />
          )}

          {/* Subtle Screen Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Laptop Base / Keyboard Deck & Hinge */}
      <div className="relative w-[105%] -ml-[2.5%]">
        <div className="h-3 bg-gradient-to-b from-[#2e3747] via-[#202733] to-[#121620] rounded-b-lg border-x border-b border-[#3b4557] shadow-xl flex items-start justify-center relative">
          <div className="w-16 h-1 bg-[#090c12] rounded-b-md shadow-inner" />
        </div>
        <div className="w-[88%] h-3 mx-auto bg-black/50 blur-md rounded-full -mt-0.5" />
      </div>
    </div>
  )
}

// Realistic Standalone Cellphone Mockup (For BuildTrack Mobile Application)
function StandaloneCellphone({ project }) {
  const projectImage = getProjectImage(project)

  return (
    <div className="relative select-none flex flex-col items-center">
      {/* Smartphone Outer Titanium Frame */}
      <div className="relative w-[102px] h-[208px] rounded-[1.6rem] p-1.5 bg-[#161a22] border-2 border-[#2b3342] shadow-2xl transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/15">
        {/* Left Side Volume Buttons */}
        <div className="absolute -left-[2.5px] top-12 w-[2.5px] h-4 bg-[#2b3342] rounded-l-sm" />
        <div className="absolute -left-[2.5px] top-18 w-[2.5px] h-6 bg-[#2b3342] rounded-l-sm" />
        <div className="absolute -left-[2.5px] top-26 w-[2.5px] h-6 bg-[#2b3342] rounded-l-sm" />
        {/* Right Side Power Button */}
        <div className="absolute -right-[2.5px] top-16 w-[2.5px] h-8 bg-[#2b3342] rounded-r-sm" />

        {/* Phone Display Screen (9:19.5 aspect ratio) */}
        <div className="relative w-full h-full overflow-hidden rounded-[1.4rem] bg-black border border-white/10">
          {/* Dynamic Island Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-9 h-2.5 bg-black rounded-full z-20 flex items-center justify-end pr-1 shadow-md">
            <div className="w-1 h-1 rounded-full bg-[#0a0d14] border border-white/20" />
          </div>

          {/* Screen Content */}
          {projectImage ? (
            <img
              src={projectImage}
              alt={`${project.title} mobile application screen`}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              loading="eager"
            />
          ) : (
            <DynamicRepoPreview project={project} />
          )}

          {/* Subtle Screen Reflection Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Realistic Phone Desk Shadow */}
      <div className="w-[96px] h-3 mx-auto bg-black/60 blur-md rounded-full mt-1.5" />
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState(REAL_GITHUB_PROJECTS)

  // Fetch repositories from GitHub automatically
  useEffect(() => {
    fetch('https://api.github.com/users/kuya1loyd/repos?sort=pushed&per_page=30')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API request failed')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const excludedLangs = ['typescript', 'javascript', 'dart', 'python', 'html', 'css', 'code']
          const realRepos = data
            .filter((repo) => repo.name.toLowerCase() !== 'portfolio')
            .map((repo) => {
              const existing = REAL_GITHUB_PROJECTS.find(
                (p) => p.name.toLowerCase() === repo.name.toLowerCase()
              )

              const live = repo.homepage || existing?.liveLink || null
              const image = existing?.image || getProjectImage(repo)
              const rawTags = existing?.tags || repo.topics || ['Next.js', 'React']
              const cleanTags = rawTags.filter(t => !excludedLangs.includes(t.toLowerCase())).slice(0, 4)

              return {
                id: repo.name.toLowerCase(),
                name: repo.name,
                title: existing?.title || repo.name.replace(/[-_]/g, ' '),
                category: existing?.category || 'Production Web App',
                description:
                  existing?.description ||
                  repo.description ||
                  'Open-source project engineered with modern standards.',
                liveLink: live,
                image: image,
                tags: cleanTags.length > 0 ? cleanTags : ['Full-Stack', 'Production'],
                stars: repo.stargazers_count,
                accent:
                  existing?.accent ||
                  'from-cyan-500/20 via-blue-500/10 to-transparent'
              }
            })

          if (realRepos.length > 0) {
            setProjects(realRepos)
          }
        }
      })
      .catch(() => {
        setProjects(REAL_GITHUB_PROJECTS)
      })
  }, [])

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden text-white border-t border-white/5">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              PRODUCTION BUILDS &amp; ARCHITECTURES
            </span>
            <div className="h-px w-8 bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
            PROJECTS.
          </h2>
          <p className="mt-2 text-xs md:text-sm text-white/50 max-w-lg font-light leading-relaxed">
            Explore live production web apps, desktop solutions, and mobile applications.
          </p>
        </div>

        {/* Unboxed Showcase Grid: Perfectly Aligned Laptops & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 items-stretch">
          {projects.map((project, idx) => {
            const hasLive = Boolean(project.liveLink)
            const isMobile = project.id.includes('buildtrack') || project.category === 'Mobile Application'

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="project-box group relative rounded-2xl bg-[#0c1017]/80 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between h-full shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
              >
                {/* Subtle Ambient Card Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-36 bg-gradient-to-b ${project.accent} opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`} />

                <div className="flex flex-col relative z-10">
                  {/* Row 1: Top Meta Status Badge (Right-aligned with clear clearance) */}
                  <div className="h-8 flex items-center justify-end mb-4 px-1">
                    <span className="text-xs font-mono font-bold flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                      {hasLive ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          LIVE
                        </span>
                      ) : (
                        <span className="text-cyan-600 font-bold">MOBILE APP</span>
                      )}
                    </span>
                  </div>

                  {/* Row 2: Device Mockup Stage (Perfect spacing, zero overlap) */}
                  <div className="h-[215px] w-full flex items-center justify-center mb-5">
                    {isMobile ? (
                      <StandaloneCellphone project={project} />
                    ) : (
                      <StandaloneLaptop project={project} hasLive={hasLive} />
                    )}
                  </div>

                  {/* Row 3: Project Title */}
                  <div className="px-1">
                    <div className="min-h-[3rem] flex items-start">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                    </div>

                    {/* Row 4: Description (Legible and clear) */}
                    <p className="mt-1 h-12 text-sm text-slate-600 leading-relaxed font-normal line-clamp-2">
                      {project.description}
                    </p>

                    {/* Row 5: Tech Stack Tags (Legible badges) */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 6: Bottom Action Link (Large and clickable) */}
                <div className="pt-4 mt-5 px-1 flex items-center justify-between border-t border-slate-100 relative z-10">
                  {hasLive ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900 !text-white hover:bg-cyan-600 transition-all shadow-md group-hover:shadow-cyan-500/20"
                    >
                      <span className="!text-white">Launch Site</span>
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-cyan-600 font-bold py-1">
                      Flutter Mobile App
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
