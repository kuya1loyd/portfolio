'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiFileText } from 'react-icons/fi'

const RESUME_PDF_PATH = '/images/projects/John_Galito_Resume_.pdf'
const RESUME_FILENAME = 'John_Galito_Resume.pdf'

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
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="resume-modal-shell relative max-w-5xl w-full h-[90vh] max-h-[94vh] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Control Header — Clean White Aesthetic */}
            <div className="resume-modal-header flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-200 bg-white text-slate-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0 shadow-xs">
                  <FiFileText className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase font-mono text-slate-900">
                    John Lloyd Galito — Curriculum Vitae (PDF)
                  </h3>
                  <p className="hidden sm:block text-[11px] font-mono text-slate-500">
                    Official Resume // Ready for Review &amp; Download
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2.5">
                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
                  title="Download Resume PDF"
                >
                  <FiDownload className="w-3.5 h-3.5 text-white" />
                  <span className="text-white">Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume PDF Viewport — Seamless Light Canvas */}
            <div className="resume-viewport flex-1 min-h-0 overflow-hidden p-3 sm:p-5 bg-slate-100/70 flex flex-col">
              <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col">
                <iframe
                  src={`${RESUME_PDF_PATH}#view=FitH`}
                  className="w-full h-full flex-1 min-h-0 border-0 bg-white"
                  title="John Lloyd Galito Resume PDF Preview"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



