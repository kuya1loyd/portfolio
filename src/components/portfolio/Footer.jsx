'use client'

import { FiMail } from 'react-icons/fi'
import { FaFacebook, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const navLinks = [
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CERTIFICATES', href: '#certificates' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <footer className="relative bg-transparent text-slate-900 dark:text-white py-16 px-6 lg:px-12 border-t border-slate-200 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs tracking-tight shadow-sm">
              JLG
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block">
                JOHN LLOYD GALITO
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tracking-wider block uppercase font-medium">
                AI-Assisted Full-Stack Developer
              </span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-widest text-slate-600 dark:text-slate-300 font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyan-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Connection Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white hover:text-cyan-600 border border-slate-300 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
            title="Send Message"
          >
            <FiMail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </a>

          <a
            href="https://www.linkedin.com/in/john-lloyd-galito-299a80422/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#0077B5] dark:bg-white/10 dark:hover:bg-[#0077B5] text-slate-700 dark:text-white hover:text-white border border-slate-300 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
            title="LinkedIn Profile"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </a>

          <a
            href="https://www.instagram.com/john_lloyd_galito/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#E4405F] dark:bg-white/10 dark:hover:bg-[#E4405F] text-slate-700 dark:text-white hover:text-white border border-slate-300 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
            title="Instagram Profile"
          >
            <FaInstagram className="w-4 h-4" />
          </a>

          <a
            href="https://www.facebook.com/johnlloyd.galito.33"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#1877F2] dark:bg-white/10 dark:hover:bg-[#1877F2] text-slate-700 dark:text-white hover:text-white border border-slate-300 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
            title="Facebook Profile"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
        <p>© {new Date().getFullYear()} John Lloyd Galito. Built with passion &amp; precision.</p>
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Status: Open to Full-Stack, Front-End &amp; Back-End Engineering Roles</span>
        </p>
      </div>
    </footer>
  )
}
