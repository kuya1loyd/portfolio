'use client'

import { FiArrowUp, FiGithub } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CERTIFICATES', href: '#certificates' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <footer className="relative bg-transparent text-white py-16 px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs tracking-tight">
              JLG
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block">
                JOHN LLOYD GALITO
              </span>
              <span className="text-[10px] font-mono text-white/40 tracking-widest block uppercase">
                Full-Stack Developer (Front-End &amp; Back-End)
              </span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono tracking-[0.2em] text-white/50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social & Scroll Top Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kuya1loyd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-white/60 hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300"
            title="GitHub Profile"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/johnlloyd.galito.33"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300"
            title="Facebook Profile"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-white/60 hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 shadow-md group"
            title="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono">
        <p>© {new Date().getFullYear()} John Lloyd Galito. Built with passion &amp; precision.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Status: Open to Full-Stack, Front-End &amp; Back-End Engineering Roles
        </p>
      </div>
    </footer>
  )
}
