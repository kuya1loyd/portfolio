'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUser,
  FiBriefcase,
  FiFolder,
  FiMail,
  FiMenu,
  FiX,
  FiFileText
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { FaTrophy, FaGithub, FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa'
import ThemeControls from './ThemeControls'

const PRIMARY_NAV = [
  { name: 'About Me', href: '#hero', icon: FiUser },
  { name: 'Experience', href: '#about', icon: FiBriefcase },
  { name: 'Projects', href: '#projects', icon: FiFolder },
  { name: 'Skills', href: '#services', icon: HiSparkles },
  { name: 'Certificates', href: '#certificates', icon: FaTrophy },
  { name: 'Contact', href: '#contact', icon: FiMail },
]

if (typeof globalThis !== 'undefined') {
  globalThis.SECONDARY_NAV = []
}

export default function Navbar({ onOpenResume }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredKey, setHoveredKey] = useState(null)

  // Scrollspy to detect active section in view
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'services', 'certificates', 'contact']
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderNavContent = () => (
    <div className="flex flex-col h-full justify-between p-5 sm:p-6 text-slate-800 dark:text-slate-200">
      {/* Top Header / Profile Brand */}
      <div>
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-200/80 dark:border-white/10">
          <a
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-black font-sans text-base shadow-sm group-hover:scale-105 transition-transform">
              JL
            </div>
            <div>
              <h2 className="text-sm font-extrabold font-sans text-slate-900 dark:text-white leading-tight">
                John Lloyd Galito
              </h2>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for hire
              </span>
            </div>
          </a>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Navigation (About Me, Experience, Projects, Skills, Certificates, Contact) */}
        <nav aria-label="Main Navigation" className="space-y-1">
          {PRIMARY_NAV.map((item) => {
            const Icon = item.icon
            const targetId = item.href.replace('#', '')
            const isActive = activeSection === targetId

            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className={`relative group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                  }`}
                />
                <span className="tracking-wide">{item.name}</span>

                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute right-2.5 w-1.5 h-1.5 rounded-full bg-cyan-500"
                  />
                )}
              </motion.a>
            )
          })}
        </nav>
      </div>

      {/* Bottom Footer: Resume, Socials & Theme Controls */}
      <div className="pt-5 border-t border-slate-200/80 dark:border-white/10 space-y-3.5">
        {/* Resume CV Button */}
        {onOpenResume && (
          <button
            type="button"
            onClick={() => {
              onOpenResume()
              setMobileOpen(false)
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <FiFileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Curriculum Vitae</span>
          </button>
        )}

        {/* Compact Social Links */}
        <div className="flex items-center justify-between px-1">
          {[
            { icon: FaGithub, href: 'https://github.com/kuya1loyd', title: 'GitHub' },
            { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/john-lloyd-galito-299a80422/', title: 'LinkedIn' },
            { icon: FaInstagram, href: 'https://www.instagram.com/john_lloyd_galito/', title: 'Instagram' },
            { icon: FaFacebookF, href: 'https://www.facebook.com/johnlloyd.galito.33', title: 'Facebook' },
          ].map((item, idx) => {
            const SIcon = item.icon
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-cyan-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
              >
                <SIcon className="w-3.5 h-3.5" />
              </a>
            )
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="flex justify-center pt-1">
          <ThemeControls className="w-full justify-center" />
        </div>
      </div>
    </div>
  )

  /* Compact capsule item: icon-only with a slide-out label tooltip */
  const renderCapsuleItem = (item) => {
    const Icon = item.icon
    const targetId = item.href.replace('#', '')
    const isActive = activeSection === targetId
    const isHovered = hoveredKey === item.name

    const baseClass = `relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 cursor-pointer ${
      isActive
        ? 'text-cyan-600 dark:text-cyan-300'
        : 'text-slate-700 dark:text-white/80 hover:text-cyan-600 dark:hover:text-cyan-300'
    }`

    return (
      <div
        key={item.name}
        className="relative"
        onMouseEnter={() => setHoveredKey(item.name)}
        onMouseLeave={() => setHoveredKey(null)}
      >
        <motion.a
          href={item.href}
          aria-label={item.name}
          whileHover={{ scale: 1.15, x: 2 }}
          whileTap={{ scale: 0.92 }}
          className={baseClass}
        >
          <Icon className="w-4 h-4" />
        </motion.a>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-[#131722]/95 border border-slate-700/80 dark:border-cyan-500/30 shadow-xl backdrop-blur-xl flex items-center gap-2 pointer-events-none whitespace-nowrap z-50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-bold tracking-tight" style={{ color: '#ffffff' }}>
                {item.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Floating Menu Button (Top Left) */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-3 rounded-2xl bg-white/90 dark:bg-[#121620]/90 border border-slate-300 dark:border-white/15 shadow-xl backdrop-blur-xl text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          aria-label="Open sidebar menu"
        >
          <FiMenu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-bold tracking-wider font-mono">MENU</span>
        </button>
      </div>

      {/* Desktop: compact floating glass capsule (same style as the social dock) */}
      <div className="hidden md:block fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-40">
        <motion.aside
          aria-label="Sidebar Navigation"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.2 }}
          className="social-sidebar flex flex-col items-center py-3 px-2 rounded-2xl border transition-all duration-300"
        >
          <a
            href="#hero"
            aria-label="John Lloyd Galito - Home"
            className="mb-2 w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-black font-sans text-[11px] shadow-sm hover:scale-110 transition-transform"
            style={{ color: '#ffffff' }}
          >
            JL
          </a>

          <div className="flex flex-col items-center gap-0.5">
            {PRIMARY_NAV.map(renderCapsuleItem)}
          </div>

          <div className="social-divider w-5 h-px my-2" />

          <div
            className="relative"
            onMouseEnter={() => setHoveredKey('theme')}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <ThemeControls iconOnly />
            <AnimatePresence>
              {hoveredKey === 'theme' && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-[#131722]/95 border border-slate-700/80 dark:border-cyan-500/30 shadow-xl backdrop-blur-xl pointer-events-none whitespace-nowrap z-50"
                >
                  <span className="text-xs font-bold tracking-tight" style={{ color: '#ffffff' }}>
                    Light / Dark mode
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      </div>

      {/* Mobile Drawer Backdrop & Slide-out Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Slide-out Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-[#0e1117] border-r border-slate-200 dark:border-white/15 shadow-2xl flex flex-col overflow-y-auto z-10"
            >
              {renderNavContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
