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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#141414] border border-white/20 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161616]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <FiFileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Curriculum Vitae // Resume
                  </h4>
                  <p className="text-xs text-white/40 font-mono">
                    John Lloyd Galito — Full-Stack Developer (Front-End & Back-End)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/images/Resume.jpg"
                  download="John_Lloyd_Galito_Resume.jpg"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors shadow-md"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="p-4 md:p-6 overflow-y-auto flex items-center justify-center bg-black/40">
              <img
                src="/images/Resume.jpg"
                alt="John Lloyd Galito Resume"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Bottom Mobile Bar */}
            <div className="p-4 border-t border-white/10 bg-[#161616] flex sm:hidden items-center justify-center">
              <a
                href="/images/Resume.jpg"
                download="John_Lloyd_Galito_Resume.jpg"
                className="w-full text-center py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-white/90 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <FiDownload className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
