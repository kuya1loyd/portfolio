'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4'
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

        {/* Desktop Navigation Links (matching Picture 1 & 2) */}
        <nav className="hidden md:flex items-center gap-10 pointer-events-auto">
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

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors pointer-events-auto"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
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
              className="w-full py-3.5 bg-white text-black uppercase tracking-[0.2em] text-xs font-bold text-center mt-2"
            >
              Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
