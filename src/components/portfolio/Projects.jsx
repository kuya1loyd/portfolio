'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiLayers, FiCode, FiStar, FiGitBranch, FiCheckCircle } from 'react-icons/fi'

// Real curated fallback based on kuya1loyd's actual GitHub repos
const REAL_GITHUB_PROJECTS = [
  {
    id: 'rentrack',
    name: 'RenTrack',
    title: 'RenTrack Fleet & Lease Manager',
    category: 'TypeScript',
    description: 'Vehicle and heavy equipment lease tracking platform equipped with telemetry dashboards, real-time asset scheduling, and analytical reporting controls.',
    repoUrl: 'https://github.com/kuya1loyd/RenTrack',
    liveLink: 'https://rentrack-beige.vercel.app/',
    language: 'TypeScript',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vercel Analytics'],
    stars: 1,
    forks: 0,
    accent: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'carvex-carparts',
    name: 'Carvex-Carparts',
    title: 'Carvex Automotive Parts Catalog',
    category: 'JavaScript',
    description: 'Automotive components catalog and procurement hub with dynamic search filtration, local inventory caching, and friction-free shopping cart flows.',
    repoUrl: 'https://github.com/kuya1loyd/Carvex-Carparts',
    liveLink: 'https://carvex-carparts-omega.vercel.app/',
    language: 'JavaScript',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'State Management'],
    stars: 1,
    forks: 0,
    accent: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'buildtrack-application',
    name: 'BuildTrack-Application',
    title: 'BuildTrack Application',
    category: 'Dart',
    description: 'Cross-platform mobile and desktop asset management and equipment tracking application built with Dart and Flutter.',
    repoUrl: 'https://github.com/kuya1loyd/BuildTrack-Application',
    liveLink: null,
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Cross-Platform', 'Mobile App'],
    stars: 0,
    forks: 0,
    accent: 'from-purple-500/20 via-indigo-500/10 to-transparent'
  }
]

export default function Projects() {
  const [projects, setProjects] = useState(REAL_GITHUB_PROJECTS)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://api.github.com/users/kuya1loyd/repos?sort=pushed&per_page=30')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API request failed')
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Strictly exclude 'portfolio' repository
          const realRepos = data
            .filter((repo) => repo.name.toLowerCase() !== 'portfolio')
            .map((repo) => {
              // Match with existing metadata if available
              const existing = REAL_GITHUB_PROJECTS.find(
                (p) => p.name.toLowerCase() === repo.name.toLowerCase()
              )

              return {
                id: repo.name.toLowerCase(),
                name: repo.name,
                title: existing?.title || repo.name.replace(/[-_]/g, ' '),
                category: repo.language || 'Web',
                description:
                  repo.description ||
                  existing?.description ||
                  'Open-source project engineered with modern standards and hosted on GitHub.',
                repoUrl: repo.html_url,
                liveLink: repo.homepage || existing?.liveLink || null,
                language: repo.language || 'Code',
                tags: existing?.tags || [repo.language || 'JavaScript', 'GitHub', 'Open Source'],
                stars: repo.stargazers_count,
                forks: repo.forks_count,
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
        // Fallback to verified REAL_GITHUB_PROJECTS
        setProjects(REAL_GITHUB_PROJECTS)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const categories = ['ALL', 'TYPESCRIPT', 'JAVASCRIPT', 'DART']

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true
    return (project.language || '').toUpperCase() === activeFilter
  })

  return (
    <section id="projects" className="relative py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-white border-t border-white/5">
      {/* Cyberpunk grid ambient light */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header connected to GitHub */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                LIVE GITHUB FEED // @KUYA1LOYD
              </span>
              <div className="h-px w-12 bg-white/20" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              FEATURED <span className="text-white/40">PROJECTS.</span>
            </h2>
            <p className="mt-3 text-sm text-white/50 max-w-xl font-light leading-relaxed">
              Real open-source repositories and production applications synchronized directly from my GitHub account.
            </p>
          </div>

          {/* GitHub Profile Button & Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-end">
            <a
              href="https://github.com/kuya1loyd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors"
            >
              <FiGithub className="w-4 h-4 text-cyan-400" />
              <span>github.com/kuya1loyd</span>
              <FiExternalLink className="w-3 h-3 text-white/40" />
            </a>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-[2rem] bg-[#0d0d0d] border border-white/10 hover:border-cyan-500/40 transition-all duration-500 p-8 flex flex-col justify-between shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
            >
              {/* Ambient Card Glow */}
              <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${project.accent} opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity`} />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-cyan-400">
                  {project.language}
                </span>
                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3 h-3 text-yellow-400" />
                      {project.stars}
                    </span>
                  )}
                  <span className="text-white/20">0{idx + 1}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/80 group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-all">
                  <FiLayers className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-white/40 font-mono mb-4">
                  repo: kuya1loyd/{project.name}
                </p>
                <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-white/60 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-cyan-400 hover:text-black transition-all shadow-md"
                  >
                    <span>Launch</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                    Source App
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
