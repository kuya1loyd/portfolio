'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FiSun, FiMoon, FiFileText } from 'react-icons/fi'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Experience', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ onOpenResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLight, setIsLight] = useState(false)

  // Initialize theme from storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light') {
      setIsLight(true)
      document.documentElement.classList.add('light')
    } else {
      setIsLight(false)
      document.documentElement.classList.remove('light')
    }
  }, [])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('portfolio-theme', 'dark')
      setIsLight(false)
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('portfolio-theme', 'light')
      setIsLight(true)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${
        scrolled
          ? 'bg-black/90 dark:bg-black/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-5 md:py-7'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-14 flex items-center justify-between">
        {/* Top-Left Clean Brand Monogram */}
        <a
          href="#home"
          className="group cursor-pointer pointer-events-auto flex items-center gap-2 text-white"
          aria-label="John Lloyd Galito"
        >
          <span className="text-xl md:text-2xl font-black font-sans tracking-tight group-hover:text-cyan-400 transition-colors">
            JLG
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop Navigation Links + Dark Mode Toggle */}
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-white uppercase tracking-[0.2em] text-xs font-medium transition-colors duration-200 cursor-pointer"
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 text-white/80 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm"
          >
            {isLight ? (
              <FiMoon className="w-4 h-4 text-cyan-500 transition-transform rotate-0 hover:-rotate-12" />
            ) : (
              <FiSun className="w-4 h-4 text-yellow-400 transition-transform rotate-0 hover:rotate-45" />
            )}
          </button>
        </div>

        {/* Mobile Buttons: Theme Toggle & Menu Toggle */}
        <div className="md:hidden flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-cyan-400 transition-colors"
          >
            {isLight ? (
              <FiMoon className="w-4 h-4 text-cyan-500" />
            ) : (
              <FiSun className="w-4 h-4 text-yellow-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-[70px] bg-black/95 border-b border-white/10 px-6 py-8 backdrop-blur-xl pointer-events-auto flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-sm uppercase tracking-[0.2em] font-semibold py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenResume()
              }}
              className="w-full py-3.5 bg-white text-black uppercase tracking-[0.2em] text-xs font-bold text-center mt-2 flex items-center justify-center gap-2"
            >
              <FiFileText className="w-4 h-4" />
              <span>Show CV</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
