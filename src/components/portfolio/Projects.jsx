'use client'

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FiExternalLink,
  FiX,
  FiHome,
  FiTruck,
  FiServer,
  FiShoppingCart,
  FiSmartphone,
  FiCode,
  FiActivity,
  FiCoffee,
  FiCheckSquare,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import {
  SiNextdotjs,
  SiReact,
  SiPostgresql,
  SiTailwindcss,
  SiVercel,
  SiVite,
  SiFlutter,
  SiDart,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3
} from 'react-icons/si'

const INK = '#0c2a43'
const INK_SOFT = 'rgba(12,42,67,0.68)'
const INK_MUTED = 'rgba(12,42,67,0.5)'

// John Lloyd's real projects (from github.com/kuya1loyd)
const REAL_PROJECTS = [
  {
    id: 'skytech',
    num: '01',
    title: 'SkyTech',
    role: 'FULL-STACK · 2026',
    status: 'live',
    description: 'Cutting-edge tech platform with dynamic service catalogs and real-time cloud deployment.',
    fullDescription:
      'A cutting-edge tech showcase and services management platform built with TypeScript and Tailwind CSS. Features dynamic service catalogs, interactive UI components, and real-time responsive architecture deployed on Vercel.',
    liveLink: 'https://sky-tech-xi.vercel.app',
    githubLink: 'https://github.com/kuya1loyd/SkyTech',
    image: '/images/projects/skytech.png',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    tint: { a: 'rgba(186,230,253,0.26)', b: 'rgba(199,210,254,0.18)', accent: '#0284c7' },
    iconBg: 'linear-gradient(145deg, #38bdf8 0%, #0284c7 100%)',
    icon: 'server'
  },
  {
    id: 'rentrack',
    num: '02',
    title: 'RenTrack',
    role: 'SOLO · 2026',
    status: 'live',
    description: 'Property rental management with automated billing, payments, and tenant tracking.',
    fullDescription:
      'A comprehensive property rental management, automated billing, payments, and receivables monitoring system built with Next.js and PostgreSQL. Streamlines lease contracts, tenant payment histories, monthly statements, and occupancy telemetry in an intuitive dashboard designed to replace fragmented spreadsheets.',
    liveLink: 'https://rentrack-beige.vercel.app/',
    githubLink: 'https://github.com/kuya1loyd/RenTrack',
    image: '/images/projects/rentrack.png',
    tags: ['TypeScript', 'React', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    tint: { a: 'rgba(167,243,208,0.22)', b: 'rgba(186,230,253,0.14)', accent: '#047857' },
    iconBg: 'linear-gradient(145deg, #34d399 0%, #047857 100%)',
    icon: 'home'
  },
  {
    id: 'carvex-carparts',
    num: '03',
    title: 'CarVex',
    role: 'SOLO · 2026',
    status: 'live',
    description: 'Auto-parts catalog with instant filtering by vehicle year, make, and model.',
    fullDescription:
      'An automotive components catalog and procurement hub built for frictionless discovery. Combines instant multi-tiered filtering by vehicle year, make, and model with smart inventory caching and lightning-fast checkout workflows for automotive repair specialists and distributors.',
    liveLink: 'https://carvex-carparts-omega.vercel.app/',
    githubLink: 'https://github.com/kuya1loyd/Carvex-Carparts',
    image: '/images/projects/carvex.png',
    tags: ['React', 'Vite', 'Tailwind CSS', 'E-Commerce'],
    tint: { a: 'rgba(186,230,253,0.24)', b: 'rgba(199,210,254,0.14)', accent: '#1d4ed8' },
    iconBg: 'linear-gradient(145deg, #60a5fa 0%, #1d4ed8 100%)',
    icon: 'car'
  },
  {
    id: 'buildtrack-application',
    num: '04',
    title: 'BuildTrack',
    role: 'MOBILE · 2026',
    status: 'building',
    description: 'On-site construction tracking: inventory, attendance, and milestones, offline-first.',
    fullDescription:
      'A cross-platform mobile application engineered specifically for on-site construction tracking, material warehouse inventory, workforce attendance logs, and milestone scheduling. Features offline-first synchronisation with Neon PostgreSQL to ensure job site engineers never lose vital project updates.',
    liveLink: null,
    githubLink: 'https://github.com/kuya1loyd/BuildTrack-Application',
    image: '/images/projects/buildtrack_phone.png',
    isMobileApp: true,
    tags: ['Flutter', 'Dart', 'Neon Postgres', 'REST API'],
    tint: { a: 'rgba(254,240,200,0.24)', b: 'rgba(186,230,253,0.14)', accent: '#b45309' },
    iconBg: '#1f2335',
    iconImage: '/images/projects/buildtrack_logo.png',
    icon: 'tool'
  }
]

const TAG_ICONS = {
  'Next.js': SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  PostgreSQL: SiPostgresql,
  'Neon Postgres': SiPostgresql,
  'Tailwind CSS': SiTailwindcss,
  Vercel: SiVercel,
  Vite: SiVite,
  Flutter: SiFlutter,
  Dart: SiDart,
  'REST API': FiServer,
  'E-Commerce': FiShoppingCart,
  'Cross-Platform': FiSmartphone,
  Healthcare: FiActivity,
  'Food Ordering': FiCoffee,
  Productivity: FiCheckSquare
}

const tagChip = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  fontSize: 11,
  padding: '4px 10px',
  borderRadius: 8,
  color: '#0c2a43',
  background: 'rgba(255, 255, 255, 0.82)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(12, 42, 67, 0.1)',
  boxShadow: '0 2px 6px rgba(12, 42, 67, 0.05)'
}

function TagIcon({ tag, size = 12 }) {
  const Icon = TAG_ICONS[tag] || FiCode
  return <Icon style={{ width: size, height: size, flexShrink: 0 }} />
}

function ProjectGlyph({ project, size }) {
  if (project.iconImage) {
    return (
      <img
        src={project.iconImage}
        alt=""
        draggable={false}
        style={{ width: '82%', height: '82%', objectFit: 'contain', pointerEvents: 'none' }}
      />
    )
  }
  let Icon = FiCode
  if (project.icon === 'home') Icon = FiHome
  else if (project.icon === 'car') Icon = FiTruck
  else if (project.icon === 'clinic') Icon = FiActivity
  else if (project.icon === 'food') Icon = FiCoffee
  else if (project.icon === 'todo') Icon = FiCheckSquare
  return <Icon style={{ width: size * 0.5, height: size * 0.5, color: '#fff' }} />
}

function StatusPill({ status }) {
  const live = status === 'live'
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        color: live ? '#047857' : '#b45309',
        background: live ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.14)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: live ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: live ? '#10b981' : '#f59e0b',
          boxShadow: live ? '0 0 8px #10b981' : '0 0 8px #f59e0b'
        }}
      />
      {live ? 'Live' : 'Building'}
    </span>
  )
}

/* Modern Outline + Solid "PROJECTS" Title in light theme */
function ProjectsTitle() {
  return (
    <div style={{ textAlign: 'center', userSelect: 'none', marginBottom: 20, position: 'relative' }}>
      {/* Category Kicker */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#0284c7',
          marginBottom: 10
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 10px #10b981',
            display: 'inline-block'
          }}
        />
        <span>/ SELECTED WORKS</span>
      </div>

      {/* Main Headline: PRO (Hollow Cyan Outline) + JECTS (Deep Navy Bold) */}
      <h2
        className="font-black tracking-tight uppercase leading-none text-center select-none flex items-center justify-center"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 5.6rem)',
          margin: 0,
          padding: 0
        }}
      >
        <span
          className="title-outline-text"
          style={{
            WebkitTextStroke: '2px #0284c7',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.03em',
            fontFamily: "'Arial Black', 'Helvetica Neue', system-ui, sans-serif"
          }}
        >
          PRO
        </span>
        <span
          className="title-solid-text"
          style={{
            color: '#0c2a43',
            WebkitTextFillColor: '#0c2a43',
            fontWeight: 900,
            letterSpacing: '0.03em',
            fontFamily: "'Arial Black', 'Helvetica Neue', system-ui, sans-serif"
          }}
        >
          JECTS
        </span>
      </h2>

      <p
        style={{
          marginTop: 14,
          fontSize: 14,
          color: 'rgba(12, 42, 67, 0.65)',
          textAlign: 'center'
        }}
      >
        Drag or use the arrow keys · Select a card for details
      </p>
    </div>
  )
}

/* Crystal Clear Fiberglass Project Card on White Background (Matching Reference Design Layout) */
function ProjectGlassCard({ project, dims, isCenter, onActivate, onDetails }) {
  const isMobileApp = project.isMobileApp || project.id.includes('buildtrack')

  return (
    <motion.div
      suppressHydrationWarning
      role="button"
      tabIndex={0}
      aria-label={isCenter ? `Open ${project.title} details` : `Show ${project.title}`}
      whileHover={{
        y: isCenter ? -6 : -3,
        scale: isCenter ? 1.018 : 0.96,
        transition: { type: 'spring', stiffness: 240, damping: 20 }
      }}
      whileTap={{
        scale: 0.982,
        transition: { type: 'spring', stiffness: 350, damping: 25 }
      }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onActivate()
      }}
      className="project-glass-card group/card"
      style={{
        position: 'relative',
        height: dims.h,
        width: dims.w,
        padding: dims.pad,
        borderRadius: 24,
        cursor: 'pointer',
        boxSizing: 'border-box',
        overflow: 'hidden',
        /* Crystal Clear Fiberglass Glassmorphism on White */
        background: isCenter
          ? 'linear-gradient(155deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 249, 255, 0.88) 100%)'
          : 'linear-gradient(155deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 250, 255, 0.72) 100%)',
        backdropFilter: 'blur(24px) saturate(190%)',
        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
        border: isCenter
          ? `2px solid ${project.tint.accent}`
          : '1.5px solid rgba(255, 255, 255, 0.95)',
        boxShadow: isCenter
          ? `0 24px 60px -15px rgba(12, 42, 67, 0.16), 0 0 32px -8px ${project.tint.accent}40, inset 0 1.5px 2px #fff`
          : '0 16px 36px -12px rgba(12, 42, 67, 0.08), inset 0 1px 2px #fff'
      }}
    >
      {/* Radiant Color Halo Glow Behind Center Card */}
      {isCenter && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -25,
            borderRadius: 45,
            background: project.tint.accent,
            filter: 'blur(50px)',
            opacity: 0.22,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Glass Top Edge Specular Light Highlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1.5,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Card Internal Grid matching screenshot */}
      <div
        suppressHydrationWarning
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* ROW 1: Number on left, Status Pill on right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 13,
                fontWeight: 800,
                color: project.tint.accent,
                letterSpacing: '0.04em'
              }}
            >
              {project.num}
            </span>
            <span style={{ color: 'rgba(12, 42, 67, 0.3)', fontSize: 10 }}>·</span>
            <span
              style={{
                fontSize: 9.5,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.1em',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'rgba(12, 42, 67, 0.55)'
              }}
            >
              {project.role}
            </span>
          </div>
          <StatusPill status={project.status} />
        </div>

        {/* ROW 2: Landing Page / Front Page Preview Showcase */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: dims.previewH || 155,
            marginTop: 10,
            marginBottom: 12,
            borderRadius: 14,
            overflow: 'hidden',
            background: isMobileApp ? 'rgba(12, 42, 67, 0.04)' : '#ffffff',
            border: '1.5px solid rgba(12, 42, 67, 0.1)',
            boxShadow: '0 8px 20px -6px rgba(12, 42, 67, 0.09)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}
        >
          {isMobileApp ? (
            /* Mobile App Mockup for BuildTrack */
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(241,245,249,0.95) 100%)'
              }}
            >
              <div
                style={{
                  height: '92%',
                  aspectRatio: '780 / 1688',
                  borderRadius: 16,
                  background: '#090d16',
                  border: '2px solid rgba(12, 42, 67, 0.2)',
                  boxShadow: '0 6px 16px -4px rgba(12, 42, 67, 0.2)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 24,
                    height: 5,
                    borderRadius: 999,
                    background: '#000',
                    zIndex: 10
                  }}
                />
                <img
                  src={project.image}
                  alt={`${project.title} front page`}
                  draggable={false}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top'
                  }}
                />
              </div>
            </div>
          ) : (
            /* Desktop Landing Page Browser Mockup Frame */
            <>
              {/* Mini Browser Bar with 3 macOS dots & URL indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4.5,
                  padding: '5px 9px',
                  background: 'rgba(12, 42, 67, 0.04)',
                  borderBottom: '1px solid rgba(12, 42, 67, 0.08)',
                  flexShrink: 0
                }}
              >
                <span style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: '#ef4444', opacity: 0.85 }} />
                <span style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: '#f59e0b', opacity: 0.85 }} />
                <span style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: '#10b981', opacity: 0.85 }} />
                <div
                  style={{
                    marginLeft: 6,
                    fontSize: 9,
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: 'rgba(12, 42, 67, 0.55)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '1px 7px',
                    borderRadius: 5,
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '75%'
                  }}
                >
                  {project.liveLink ? project.liveLink.replace('https://', '').replace('/', '') : `${project.id}.vercel.app`}
                </div>
              </div>

              {/* Landing Page Screenshot */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={`${project.title} landing page`}
                  draggable={false}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top'
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* ROW 3: Project Glyph Icon, Title, and "View details →" */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
            {/* Compact App Icon */}
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: project.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isCenter
                  ? `1.5px solid ${project.tint.accent}`
                  : '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow: `0 4px 12px -2px ${project.tint.accent}33`,
                flexShrink: 0
              }}
            >
              <ProjectGlyph project={project} size={34} />
            </div>

            {/* Crisp Bold Navy Title */}
            <h3
              style={{
                fontSize: dims.title || 22,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: '#0c2a43',
                margin: 0,
                lineHeight: 1.15,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* View Details Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDetails()
            }}
            style={{
              padding: '5px 12px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(12, 42, 67, 0.14)',
              color: '#0c2a43',
              boxShadow: '0 2px 8px rgba(12, 42, 67, 0.05)',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            View details →
          </button>
        </div>

        {/* ROW 4: 2-line Description */}
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.45,
            color: 'rgba(12, 42, 67, 0.72)',
            margin: '8px 0 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.description}
        </p>

        {/* ROW 5: Tech Stack Tags at bottom */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 10,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5
          }}
        >
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} style={tagChip}>
              <TagIcon tag={tag} size={10.5} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Authentic crystal glass tap / chime synthesizer (Web Audio API)
function playGlassSound() {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!playGlassSound.ctx) {
      playGlassSound.ctx = new AudioCtx()
    }
    const ctx = playGlassSound.ctx
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    const now = ctx.currentTime

    // 1. Primary crystal glass resonance carrier (~2850 Hz)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(2850, now)
    osc1.frequency.exponentialRampToValueAtTime(2800, now + 0.35)
    gain1.gain.setValueAtTime(0.0001, now)
    gain1.gain.linearRampToValueAtTime(0.24, now + 0.003)
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)

    // 2. High harmonic crystal shimmer overtone (~5620 Hz)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(5620, now)
    gain2.gain.setValueAtTime(0.0001, now)
    gain2.gain.linearRampToValueAtTime(0.12, now + 0.002)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    // 3. Crisp physical tap impact transient
    const osc3 = ctx.createOscillator()
    const gain3 = ctx.createGain()
    osc3.type = 'triangle'
    osc3.frequency.setValueAtTime(1420, now)
    gain3.gain.setValueAtTime(0.16, now)
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)
    osc3.connect(gain3)
    gain3.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc3.start(now)

    osc1.stop(now + 0.36)
    osc2.stop(now + 0.18)
    osc3.stop(now + 0.04)
  } catch {
    // Graceful fallback if audio is not permitted by browser policy
  }
}

const subscribeResize = (callback) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}
const getIsMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false)
const getServerIsMobile = () => false

export default function Projects() {
  const [projects, setProjects] = useState(REAL_PROJECTS)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const isMobile = useSyncExternalStore(subscribeResize, getIsMobile, getServerIsMobile)
  const reduceMotion = useReducedMotion()

  const dragRef = useRef({ active: false, startX: 0, moved: false })
  const wheelLockRef = useRef(false)

  // Auto-sync status / links from the Neon database & GitHub
  useEffect(() => {
    let cancelled = false
    const sync = () =>
      fetch('/api/projects', { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled || !Array.isArray(data?.projects) || data.projects.length === 0) return
          const remote = new Map(data.projects.map((p) => [p.id, p]))
          const baseIds = new Set(REAL_PROJECTS.map((b) => b.id))

          const updatedBase = REAL_PROJECTS.map((base) => {
            const r = remote.get(base.id)
            if (!r) return base
            return {
              ...base,
              status: r.status || base.status,
              liveLink: r.liveLink || base.liveLink,
              githubLink: r.githubLink || base.githubLink,
              image: base.image || r.image,
              fullDescription: r.description || base.fullDescription
            }
          })

          const newRemote = data.projects
            .filter((p) => {
              const id = (p.id || '').toLowerCase()
              const title = (p.title || '').toLowerCase()
              return (
                !baseIds.has(p.id) &&
                !id.includes('romnick') &&
                !title.includes('romnick') &&
                !id.includes('schoolsystem') &&
                !title.includes('schoolsystem') &&
                !id.includes('portfolio')
              )
            })
            .map((p, idx) => ({
              id: p.id,
              num: String(REAL_PROJECTS.length + idx + 1).padStart(2, '0'),
              title: p.title,
              role: p.subtitle || p.category || 'PROJECT · 2026',
              status: p.status || 'live',
              description: p.description?.slice(0, 110) || '',
              fullDescription: p.description || '',
              liveLink: p.liveLink || null,
              githubLink: p.githubLink || null,
              image: p.image || '/images/projects/rentrack.png',
              tags: Array.isArray(p.tags) ? p.tags : ['Full-Stack', 'Next.js'],
              tint: { a: 'rgba(186,230,253,0.24)', b: 'rgba(199,210,254,0.14)', accent: '#0284c7' },
              iconBg: 'linear-gradient(145deg, #38bdf8 0%, #0284c7 100%)',
              icon: 'code'
            }))

          setProjects([...updatedBase, ...newRemote])
        })
        .catch(() => {})
    sync()
    const id = setInterval(sync, 60000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const count = projects.length
  const handleNext = useCallback(() => {
    playGlassSound()
    setActiveIndex((i) => (i + 1) % count)
  }, [count])
  const handlePrev = useCallback(() => {
    playGlassSound()
    setActiveIndex((i) => (i - 1 + count) % count)
  }, [count])

  useEffect(() => {
    const onKey = (e) => {
      if (selectedProject) return
      if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject, handleNext, handlePrev])

  // Horizontal trackpad swipe while hovering the carousel (vertical scroll still scrolls the page)
  const handleWheel = (e) => {
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey
    if (!horizontal || wheelLockRef.current) return
    const delta = Math.abs(e.deltaX) > 0 ? e.deltaX : e.deltaY
    if (Math.abs(delta) < 18) return
    wheelLockRef.current = true
    if (delta > 0) handleNext()
    else handlePrev()
    setTimeout(() => {
      wheelLockRef.current = false
    }, 380)
  }

  // Mouse / touch drag
  const onPointerDown = (e) => {
    dragRef.current = { active: true, startX: e.clientX, moved: false }
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.active) return
    const diff = e.clientX - d.startX
    if (Math.abs(diff) > 8) d.moved = true
    if (Math.abs(diff) > 55) {
      d.startX = e.clientX
      if (diff < 0) handleNext()
      else handlePrev()
    }
  }
  const endDrag = () => {
    dragRef.current.active = false
    setTimeout(() => {
      dragRef.current.moved = false
    }, 0)
  }

  const activate = (idx, isCenter, project) => {
    if (dragRef.current.moved) return
    playGlassSound()
    if (isCenter) setSelectedProject(project)
    else setActiveIndex(idx)
  }

  const dims = isMobile
    ? { w: 295, h: 440, gap: 305, title: 20, pad: '16px 16px 14px', previewH: 145 }
    : { w: 340, h: 475, gap: 390, title: 22, pad: '18px 18px 16px', previewH: 165 }

  return (
    <section
      id="projects"
      suppressHydrationWarning
      onWheel={handleWheel}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '76px 16px 115px',
        color: '#0c2a43',
        userSelect: 'none',
        background:
          'radial-gradient(75% 45% at 50% 60%, rgba(186, 230, 253, 0.28) 0%, rgba(255, 255, 255, 0) 70%), #ffffff'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProjectsTitle />

        {/* Carousel stage */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1200,
            height: dims.h + 20,
            marginTop: 24,
            perspective: 1400,
            touchAction: 'pan-y',
            cursor: 'grab'
          }}
        >
          {projects.map((project, idx) => {
            let o = idx - activeIndex
            if (o > count / 2) o -= count
            if (o < -count / 2) o += count
            const isCenter = o === 0
            const abs = Math.abs(o)
            const isVisible = abs <= 1.2

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{
                  x: o * dims.gap,
                  y: isCenter ? 0 : 14,
                  z: -abs * 80,
                  rotateZ: o * 5,
                  rotateY: -o * 8,
                  scale: isCenter ? 1 : 0.88,
                  opacity: isCenter ? 1 : isVisible ? 0.65 : 0
                }}
                transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 1.05 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: dims.w,
                  marginLeft: -dims.w / 2,
                  zIndex: isCenter ? 30 : isVisible ? 15 : 0,
                  pointerEvents: isCenter ? 'auto' : isVisible ? 'auto' : 'none',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Smooth fluid buoyancy floating motion */}
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -10, -2, 7, 0],
                          rotateZ: [0, 0.8, -0.3, -0.7, 0],
                          rotateX: [0, 1.2, -0.4, -0.9, 0]
                        }
                  }
                  transition={{
                    duration: 6.8 + idx * 0.85,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <ProjectGlassCard
                    project={project}
                    dims={dims}
                    isCenter={isCenter}
                    onActivate={() => activate(idx, isCenter, project)}
                    onDetails={() => {
                      playGlassSound()
                      setSelectedProject(project)
                    }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Crystal Glass Navigation Controls on White: Arrow buttons + Pill indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 26,
            position: 'relative',
            zIndex: 40
          }}
        >
          {/* Prev Glass Arrow Button */}
          <motion.button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              color: '#0c2a43',
              boxShadow: '0 4px 16px rgba(12, 42, 67, 0.1)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <FiChevronLeft style={{ width: 18, height: 18 }} />
          </motion.button>

          {/* Indicator Capsule */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 24px -4px rgba(12, 42, 67, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {projects.map((p, idx) => {
                const active = idx === activeIndex
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      playGlassSound()
                      setActiveIndex(idx)
                    }}
                    aria-label={`Go to ${p.title}`}
                    style={{
                      height: 7,
                      width: active ? 26 : 7,
                      borderRadius: 999,
                      background: active ? '#0284c7' : 'rgba(12, 42, 67, 0.22)',
                      boxShadow: active ? '0 0 10px rgba(2, 132, 199, 0.4)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  />
                )
              })}
            </div>
            <span
              style={{
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontWeight: 700,
                color: '#0c2a43',
                letterSpacing: '0.04em'
              }}
            >
              0{activeIndex + 1} / 0{count} · {projects[activeIndex]?.title}
            </span>
          </div>

          {/* Next Glass Arrow Button */}
          <motion.button
            type="button"
            onClick={handleNext}
            aria-label="Next Project"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              color: '#0c2a43',
              boxShadow: '0 4px 16px rgba(12, 42, 67, 0.1)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <FiChevronRight style={{ width: 18, height: 18 }} />
          </motion.button>
        </div>
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              background: 'rgba(12, 42, 67, 0.42)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: 640,
                borderRadius: 28,
                color: '#0c2a43',
                background:
                  'linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 249, 255, 0.92) 100%)',
                backdropFilter: 'blur(26px) saturate(180%)',
                WebkitBackdropFilter: 'blur(26px) saturate(180%)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow:
                  '0 30px 80px -20px rgba(12, 42, 67, 0.25), inset 0 1.5px 2px #fff'
              }}
            >
              {/* Glass Specular Light Sheen */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
                  pointerEvents: 'none',
                  borderRadius: 'inherit'
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, padding: 28 }}>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    padding: 8,
                    borderRadius: 10,
                    color: '#0c2a43',
                    background: 'rgba(12, 42, 67, 0.06)',
                    border: '1px solid rgba(12, 42, 67, 0.08)',
                    cursor: 'pointer'
                  }}
                >
                  <FiX style={{ width: 20, height: 20 }} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: selectedProject.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px -4px rgba(12, 42, 67, 0.2)'
                    }}
                  >
                    <ProjectGlyph project={selectedProject} size={56} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#0c2a43', margin: 0 }}>
                      {selectedProject.title}
                    </h3>
                  </div>
                  <div style={{ marginLeft: 'auto', marginRight: 42 }}>
                    <StatusPill status={selectedProject.status} />
                  </div>
                </div>

                {/* Preview Banner: Smartphone for Mobile Apps, Browser for Web Apps */}
                {selectedProject.image && (
                  selectedProject.isMobileApp || selectedProject.id.includes('buildtrack') ? (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 240,
                        margin: '14px 0 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(12, 42, 67, 0.04)',
                        borderRadius: 20,
                        border: '1px solid rgba(12, 42, 67, 0.1)'
                      }}
                    >
                      <div
                        style={{
                          height: '92%',
                          aspectRatio: '780 / 1688',
                          borderRadius: 22,
                          background: '#090d16',
                          border: '2.5px solid rgba(12, 42, 67, 0.25)',
                          boxShadow: '0 12px 28px -6px rgba(12, 42, 67, 0.25)',
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 32,
                            height: 7,
                            borderRadius: 999,
                            background: '#000',
                            zIndex: 10
                          }}
                        />
                        <img
                          src="/images/projects/buildtrack_phone.png"
                          alt={`${selectedProject.title} mobile interface`}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 220,
                        borderRadius: 16,
                        overflow: 'hidden',
                        margin: '14px 0 18px',
                        background: '#ffffff',
                        border: '1.5px solid rgba(12, 42, 67, 0.1)',
                        boxShadow: '0 12px 28px -8px rgba(12, 42, 67, 0.12)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div
                        style={{
                          height: 26,
                          padding: '0 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'rgba(248, 250, 252, 0.95)',
                          borderBottom: '1px solid rgba(12, 42, 67, 0.08)'
                        }}
                      >
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f56' }} />
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffbd2e' }} />
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#27c93f' }} />
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: 10,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            color: 'rgba(12, 42, 67, 0.55)'
                          }}
                        >
                          {selectedProject.liveLink ? selectedProject.liveLink : `${selectedProject.title.toLowerCase()}.dev`}
                        </span>
                      </div>
                      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                        <img
                          src={selectedProject.image}
                          alt={`${selectedProject.title} front landing page`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                        />
                      </div>
                    </div>
                  )
                )}

                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(12, 42, 67, 0.72)', marginBottom: 20 }}>
                  {selectedProject.fullDescription}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} style={tagChip}>
                      <TagIcon tag={tag} size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                    paddingTop: 18,
                    borderTop: '1px solid rgba(12, 42, 67, 0.1)'
                  }}
                >
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 22px',
                        borderRadius: 999,
                        background: selectedProject.tint.accent || '#0284c7',
                        color: '#ffffff',
                        fontSize: 13.5,
                        fontWeight: 700,
                        boxShadow: `0 8px 20px -4px ${selectedProject.tint.accent}66`
                      }}
                    >
                      <span style={{ color: '#ffffff' }}>Open Live Demo</span>
                      <FiExternalLink style={{ width: 16, height: 16 }} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
