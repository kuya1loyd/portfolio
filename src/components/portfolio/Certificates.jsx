'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiMaximize2, FiX, FiAward, FiCheckCircle, FiShield } from 'react-icons/fi'

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
    skills: ['Threat Vectors', 'OWASP Top 10', 'Data Encryption', 'Defense in Depth']
  },
  {
    id: 'css-fundamentals',
    title: 'Introduction to CSS & Styling',
    issuer: 'SoloLearn',
    issued: 'March 8, 2025',
    image: '/images/css.jpg',
    verifyUrl: 'https://www.sololearn.com/',
    skills: ['Flexbox & Grid', 'Responsive Design', 'CSS Variables', 'Animation Physics']
  }
]

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="relative py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-white border-t border-white/5">
      {/* Background cyber grid accent */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-cyan-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-mono">
              <FiShield className="w-3.5 h-3.5 text-cyan-400" />
              VERIFIED ACCREDITATIONS & LICENSES
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              CERTIFICATES &amp; <span className="text-white/40">CREDENTIALS.</span>
            </h2>
            <span className="text-xs text-white/40 font-mono tracking-wider">
              6 VERIFIED LICENSES // CLICK IMAGE TO ENLARGE
            </span>
          </div>
          <p className="mt-3 text-sm text-white/50 max-w-xl font-light leading-relaxed">
            Verified credentials in full-stack web architecture, system design fundamentals, and web performance engineering.
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
              className="group relative rounded-[2rem] bg-[#0d0d0d] border border-white/10 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-cyan-500/10"
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
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-cyan-400">
                  <FiCheckCircle className="w-3 h-3 text-cyan-400" />
                  <span>VERIFIED</span>
                </div>

                {/* Magnify Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase shadow-xl">
                    <FiMaximize2 className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-2">
                    <span>{cert.issuer}</span>
                    <span>{cert.issued}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/60 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <FiMaximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Image</span>
                  </button>

                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>Verify</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
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

              {/* Certificate Image Body */}
              <div className="p-6 overflow-y-auto flex items-center justify-center bg-black/60">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[62vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
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

                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-[0.15em] hover:bg-cyan-400 transition-all shadow-md"
                >
                  <span>Official Verification Portal</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
