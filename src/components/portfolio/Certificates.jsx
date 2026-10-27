'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMaximize2, FiX, FiAward, FiShield } from 'react-icons/fi'

const CERTIFICATES = [
  {
    id: 'google-cybersecurity',
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    issued: 'July 10, 2026',
    image: '/images/certificate.jpg',
    verifyUrl: 'https://www.coursera.org/',
    skills: ['Network Security', 'Python Automation', 'SIEM Telemetry', 'Incident Response']
  },
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentals',
    issuer: 'CodeCred Dev',
    issued: 'September 26, 2026',
    image: '/images/Html%20fundamentals.png',
    verifyUrl: 'https://www.codecred.dev/verify/fb7d9215-8cda-4c65-9758-6b2e79aef382',
    skills: ['Semantic HTML5', 'DOM Architecture', 'Accessibility WCAG', 'SEO Optimization']
  },
  {
    id: 'ui-ux-principles',
    title: 'UI/UX Principles',
    issuer: 'CodeCred Dev',
    issued: 'October 4, 2026',
    image: '/images/UIUX%20principles.png',
    verifyUrl: 'https://www.codecred.dev/verify/be35e876-f36c-4ff9-aab1-f71d75ea38df',
    skills: ['Design Hierarchy', 'Wireframing', 'Color Theory', 'User Centered Design']
  },
  {
    id: 'web-performance',
    title: 'Web Performance & Optimization',
    issuer: 'CodeCred Dev',
    issued: 'October 4, 2026',
    image: '/images/Web%20Performance.png',
    verifyUrl: 'https://www.codecred.dev/verify/b4ef18f7-5ee2-4676-a4c8-f0762dcbae78',
    skills: ['Core Web Vitals', 'Asset Compression', 'Lighthouse 100', 'Caching Strategies']
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    issuer: 'CodeCred Dev',
    issued: 'October 4, 2026',
    image: '/images/CyberSecurity%20Fundamentals.png',
    verifyUrl: 'https://www.codecred.dev/verify/dfd7b1aa-1570-42b8-bddd-60a3aceca282',
    skills: []
  }
]

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="relative py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-slate-900 border-t border-slate-200/80">
      {/* Background cyber grid accent */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-cyan-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-cyan-600 font-mono font-bold">
              <FiShield className="w-4 h-4 text-cyan-600" />
              ACCREDITATIONS &amp; LICENSES
            </span>
            <div className="h-px w-12 bg-slate-300" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900">
              CERTIFICATES &amp; <span className="text-slate-400">CREDENTIALS.</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono tracking-wider font-semibold">
              {CERTIFICATES.length} CREDENTIALS // CLICK TO VIEW
            </span>
          </div>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
            Professional credentials in full-stack web architecture, system design fundamentals, and web performance engineering.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-[2rem] bg-[#0d0d0d]/90 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Picture Preview Frame */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative w-full aspect-[16/10] bg-[#050505] overflow-hidden cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top filter blur-[5px] brightness-95 contrast-105 group-hover:scale-102 transition-all duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Certificate Details */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>{cert.issuer}</span>
                    <span>{cert.issued}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-4 group-hover:text-cyan-600 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Row - Clean & Prominent */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-sm font-bold text-slate-800 hover:text-cyan-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiMaximize2 className="w-4 h-4 text-cyan-600" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141414] border border-cyan-500/30 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161616]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-white/40 font-mono">
                      {selectedCert.issuer} // Issued {selectedCert.issued}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Body - Medium Blurred */}
              <div className="relative p-6 overflow-y-auto flex items-center justify-center bg-black/60">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[62vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10 filter blur-[6px] select-none pointer-events-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 bg-[#161616] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-[0.15em] hover:bg-cyan-400 transition-all shadow-md cursor-pointer"
                >
                  <span>Close</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
