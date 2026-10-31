'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF
} from 'react-icons/fa'

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    handle: '@kuya1loyd',
    href: 'https://github.com/kuya1loyd',
    icon: FaGithub,
    color: '#00f0ff',
    iconColor: 'text-[#181717] dark:text-white',
    hoverBg: 'hover:bg-slate-200/80 dark:hover:bg-white/15',
    hoverGlow: 'hover:shadow-[0_0_16px_rgba(0,240,255,0.35)]',
    dividerAfter: true
  },
  {
    name: 'LinkedIn',
    handle: 'John Lloyd Galito',
    href: 'https://www.linkedin.com/in/john-lloyd-galito-299a80422/',
    icon: FaLinkedinIn,
    color: '#0077b5',
    iconColor: 'text-[#0077b5] dark:text-[#38bdf8]',
    hoverBg: 'hover:bg-[#0077b5]/15',
    hoverGlow: 'hover:shadow-[0_0_16px_rgba(0,119,181,0.35)]'
  },
  {
    name: 'Instagram',
    handle: '@john_lloyd_galito',
    href: 'https://www.instagram.com/john_lloyd_galito/',
    icon: FaInstagram,
    color: '#e4405f',
    iconColor: 'text-[#e4405f] dark:text-[#fb7185]',
    hoverBg: 'hover:bg-[#e4405f]/15',
    hoverGlow: 'hover:shadow-[0_0_16px_rgba(228,64,95,0.35)]'
  },
  {
    name: 'Facebook',
    handle: 'John Lloyd Galito',
    href: 'https://www.facebook.com/johnlloyd.galito.33',
    icon: FaFacebookF,
    color: '#1877f2',
    iconColor: 'text-[#1877f2] dark:text-[#60a5fa]',
    hoverBg: 'hover:bg-[#1877f2]/15',
    hoverGlow: 'hover:shadow-[0_0_16px_rgba(24,119,242,0.35)]'
  }
]

export default function SocialSidebar() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <motion.aside
      aria-label="Social Media Links"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.2 }}
      className="social-sidebar fixed left-3 sm:left-5 top-[38%] -translate-y-1/2 z-40 hidden md:flex flex-col items-center py-4 px-2 rounded-2xl border transition-all duration-300 group"
    >
      {/* Top subtle energy pulse dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mb-2.5 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.6)]" />

      {SOCIAL_LINKS.map((item, idx) => {
        const Icon = item.icon
        const isHovered = hoveredIdx === idx

        return (
          <div
            key={item.name}
            className="relative flex flex-col items-center w-full"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <motion.a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              whileHover={{ scale: 1.18, x: 2 }}
              whileTap={{ scale: 0.92 }}
              className={`social-sidebar-link relative w-10 h-10 rounded-xl flex items-center justify-center ${item.hoverBg} ${item.hoverGlow} transition-all duration-200 cursor-pointer`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-200 ${item.iconColor}`} />
            </motion.a>

            {/* Floating Slide-out Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-[#131722]/95 text-white border border-slate-700/80 dark:border-cyan-500/30 shadow-xl backdrop-blur-xl flex items-center gap-2 pointer-events-none whitespace-nowrap z-50"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold tracking-tight text-white">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-medium">
                    {item.handle}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {item.dividerAfter && (
              <div className="social-divider w-5 h-px my-2 transition-colors" />
            )}
          </div>
        )
      })}

      {/* Bottom subtle energy pulse dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
    </motion.aside>
  )
}
