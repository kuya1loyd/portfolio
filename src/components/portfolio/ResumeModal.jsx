'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiExternalLink, FiFileText } from 'react-icons/fi'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#11141c] border border-white/20 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#161a24]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <FiFileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Curriculum Vitae // Resume
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/50 font-mono">
                    John Lloyd Galito — Full-Stack Developer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="/images/Resume.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                  title="Open full image in new tab"
                >
                  <FiExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Open Full Size</span>
                </a>

                <a
                  href="/images/Resume.jpg"
                  download="John_Lloyd_Galito_Resume.jpg"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors shadow-md"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Preview - High Contrast Display */}
            <div className="p-3 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/60">
              <a
                href="/images/Resume.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-zoom-in block"
                title="Click to view original high-resolution Resume"
              >
                <img
                  src="/images/Resume.jpg"
                  alt="John Lloyd Galito Resume"
                  className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border border-white/15 hover:border-cyan-400/50 transition-colors"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
