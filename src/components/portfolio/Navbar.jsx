'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion'
import { IoRocketSharp, IoCompassSharp } from 'react-icons/io5'
import { VscCode } from 'react-icons/vsc'
import {
  FiBriefcase,
  FiAward,
  FiMail,
  FiSun,
  FiMoon
} from 'react-icons/fi'
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaGithub
} from 'react-icons/fa'

function DockItem({ mouseX, item, isActive, onClick }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Distance from current mouse X to center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Compact macOS fisheye magnification physics (Base: 30px on mobile, 32px on desktop; Peak: 48px)
  const widthSync = useTransform(distance, [-80, 0, 80], [32, 48, 32])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 280, damping: 16 })

  const handleClick = (e) => {
    if (item.href?.startsWith('http')) return
    e.preventDefault()
    if (onClick) onClick()
  }

  const Tag = item.href?.startsWith('http') ? 'a' : 'button'
  const tagProps = item.href?.startsWith('http')
    ? { href: item.href, target: '_blank', rel: 'noreferrer' }
    : { type: 'button' }

  return (
    <div className="relative flex flex-col items-center">
      {/* macOS Hover Tooltip Pill */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute -top-8 z-30 px-2 py-0.5 rounded-md bg-slate-900/95 dark:bg-black/95 backdrop-blur-md text-white text-[10px] font-sans font-medium whitespace-nowrap shadow-xl border border-white/10 pointer-events-none"
          >
            {item.name}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Magnifying Squircle Icon */}
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.88 }}
        className="flex items-center justify-center select-none"
      >
        <Tag
          {...tagProps}
          onClick={handleClick}
          aria-label={item.name}
          className={`w-full h-full rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer select-none transition-shadow ${item.bgClass} shadow-[0_3px_10px_rgba(0,0,0,0.18)] border border-white/20 hover:brightness-105 active:brightness-95`}
        >
          {item.icon}
        </Tag>
      </motion.div>

      {/* macOS Running App Dot Indicator */}
      <div className="h-1 flex items-center justify-center mt-0.5">
        {isActive && (
          <motion.span
            layoutId="dock-active-dot"
            className="w-1 h-1 rounded-full bg-slate-900 dark:bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)]"
          />
        )}
      </div>
    </div>
  )
}

export default function Navbar({ onOpenResume }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isLight, setIsLight] = useState(true)
  const mouseX = useMotionValue(Infinity)

  // Scrollspy to detect active section
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'about', 'projects', 'certificates', 'contact']

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250
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

  // Sync theme
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsLight(!isDark)
    }
    checkTheme()

    const syncListener = (e) => {
      if (e.detail && typeof e.detail.isLight === 'boolean') {
        setIsLight(e.detail.isLight)
      }
    }
    window.addEventListener('portfolio-theme-sync', syncListener)
    return () => window.removeEventListener('portfolio-theme-sync', syncListener)
  }, [])

  const toggleTheme = () => {
    const nextLight = !isLight
    setIsLight(nextLight)
    localStorage.setItem('portfolio-theme-mode', nextLight ? 'light' : 'dark')
    const root = document.documentElement
    if (nextLight) {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
    window.dispatchEvent(
      new CustomEvent('portfolio-theme-sync', {
        detail: { isLight: nextLight }
      })
    )
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Left Side of Dock: Main Portfolio Sections
  const NAV_APPS = [
    {
      id: 'hero',
      name: 'Home',
      bgClass: 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800',
      icon: <IoRocketSharp className="w-[50%] h-[50%] text-slate-800 dark:text-slate-100" />,
      onClick: () => scrollTo('hero')
    },
    {
      id: 'services',
      name: 'Tech Stack',
      bgClass: 'bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600',
      icon: <IoCompassSharp className="w-[52%] h-[52%] text-white" />,
      onClick: () => scrollTo('services')
    },
    {
      id: 'about',
      name: 'Experience',
      bgClass: 'bg-gradient-to-b from-rose-500 to-red-600',
      icon: <FiBriefcase className="w-[48%] h-[48%] text-white" />,
      onClick: () => scrollTo('about')
    },
    {
      id: 'resume',
      name: 'Resume (CV)',
      bgClass: 'bg-gradient-to-b from-white to-slate-100 border border-slate-300/80',
      icon: (
        <div className="relative flex flex-col items-center justify-center">
          <span className="font-serif font-black text-slate-900 text-xs sm:text-sm leading-none">
            T
          </span>
          <div className="w-2.5 h-0.5 bg-slate-400/80 rounded-full mt-0.5" />
        </div>
      ),
      onClick: () => onOpenResume?.()
    },
    {
      id: 'projects',
      name: 'Projects',
      bgClass: 'bg-gradient-to-b from-sky-500 via-blue-600 to-blue-700',
      icon: <VscCode className="w-[54%] h-[54%] text-white" />,
      onClick: () => scrollTo('projects')
    },
    {
      id: 'certificates',
      name: 'Certificates',
      bgClass: 'bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600',
      icon: <FiAward className="w-[50%] h-[50%] text-white" />,
      onClick: () => scrollTo('certificates')
    },
    {
      id: 'contact',
      name: 'Contact',
      bgClass: 'bg-gradient-to-b from-emerald-400 to-green-600',
      icon: <FiMail className="w-[50%] h-[50%] text-white" />,
      onClick: () => scrollTo('contact')
    }
  ]

  // Right Side of Dock: Utilities, Socials & Theme Toggle
  const UTILITY_APPS = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/john-lloyd-galito-299a80422/',
      bgClass: 'bg-gradient-to-b from-[#0077b5] to-[#005582]',
      icon: <FaLinkedinIn className="w-[48%] h-[48%] text-white" />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      href: 'https://www.facebook.com/johnlloyd.galito.33',
      bgClass: 'bg-gradient-to-b from-[#1877f2] to-[#0d5ac4]',
      icon: <FaFacebookF className="w-[48%] h-[48%] text-white" />
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://www.instagram.com/john_lloyd_galito/',
      bgClass: 'bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]',
      icon: <FaInstagram className="w-[48%] h-[48%] text-white" />
    },
    {
      id: 'github',
      name: 'GitHub',
      href: 'https://github.com/kuya1loyd',
      bgClass: 'bg-gradient-to-b from-purple-600 via-indigo-600 to-purple-800',
      icon: <FaGithub className="w-[50%] h-[50%] text-white" />
    },
    {
      id: 'theme',
      name: isLight ? 'Dark Mode' : 'Light Mode',
      bgClass: 'bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border border-white/25',
      icon: isLight ? (
        <FiMoon className="w-[48%] h-[48%] text-slate-800" />
      ) : (
        <FiSun className="w-[48%] h-[48%] text-amber-400" />
      ),
      onClick: toggleTheme
    }
  ]

  return (
    <nav
      aria-label="macOS Bottom Dock Navigation"
      suppressHydrationWarning
      className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none max-w-[98vw]"
    >
      {/* Floating macOS Frosted Glass Dock */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="pointer-events-auto flex items-end gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[18px] sm:rounded-[22px] bg-white/65 dark:bg-slate-900/65 backdrop-blur-2xl border border-white/50 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Navigation Section Apps */}
        {NAV_APPS.map((item) => (
          <DockItem
            key={item.id}
            mouseX={mouseX}
            item={item}
            isActive={activeSection === item.id}
            onClick={item.onClick}
          />
        ))}

        {/* macOS Dock Separator Divider */}
        <div className="w-px h-5 sm:h-6 bg-slate-400/40 dark:bg-white/20 mx-0.5 sm:mx-1 self-center shrink-0 mb-1.5" />

        {/* Social, Utility & Theme Apps */}
        {UTILITY_APPS.map((item) => (
          <DockItem
            key={item.id}
            mouseX={mouseX}
            item={item}
            isActive={false}
            onClick={item.onClick}
          />
        ))}
      </motion.div>
    </nav>
  )
}
