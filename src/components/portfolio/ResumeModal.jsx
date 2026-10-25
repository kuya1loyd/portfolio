'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiPrinter, FiCopy, FiCheck, FiMail, FiPhone, FiMapPin, FiExternalLink } from 'react-icons/fi'

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false)

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

  const copyEmail = () => {
    navigator.clipboard.writeText('galitojohnlloyd@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0d1117] border border-cyan-500/25 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col max-h-[94vh]"
          >
            {/* Modal Control Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#161b22] text-white">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase font-mono text-white/90">
                  John Lloyd Galito — Resume
                </h3>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors cursor-pointer border border-white/10"
                  title="Copy email to clipboard"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy className="text-cyan-400" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  title="Print or Save as PDF"
                >
                  <FiPrinter className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Viewport */}
            <div className="p-3 sm:p-6 md:p-8 overflow-y-auto flex justify-center bg-[#090d13]">
              {/* Paper Sheet Layout */}
              <div
                id="printable-resume"
                className="w-full max-w-3xl bg-white text-[#1a1a1a] p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl font-sans text-[13px] leading-relaxed select-text"
                style={{ minHeight: '1000px' }}
              >
                {/* Header */}
                <header className="text-center pb-4 mb-3 border-b border-gray-200">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
                    JOHN LLOYD GALITO
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-gray-700 mt-0.5">
                    Full Stack Developer
                  </p>

                  <div className="mt-2 text-[11px] sm:text-xs text-gray-600 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                    <span>09949904508 / 09395158432</span>
                    <span className="text-gray-400">|</span>
                    <a
                      href="mailto:galitojohnlloyd@gmail.com"
                      className="text-cyan-800 hover:underline font-medium"
                    >
                      galitojohnlloyd29@gmail.com / galitojohnlloyd@gmail.com
                    </a>
                  </div>

                  <div className="text-[11px] sm:text-xs text-gray-600 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-0.5">
                    <span>Butuan City, Agusan del Norte, Mindanao, Philippines</span>
                    <span className="text-gray-400">|</span>
                    <a
                      href="https://facebook.com/johnlloyd.galito.33"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-800 hover:underline font-medium"
                    >
                      facebook.com/johnlloyd.galito.33
                    </a>
                  </div>
                </header>

                {/* Summary Section */}
                <section className="mb-4">
                  <div className="bg-[#e2e8f0] text-gray-900 font-bold px-2.5 py-1 text-xs uppercase tracking-wider rounded-sm mb-2">
                    SUMMARY
                  </div>
                  <p className="text-gray-700 text-justify text-[12.5px] leading-relaxed px-1">
                    Full stack developer who enjoys building websites and applications that are simple, useful, and easy to use. Experienced in developing responsive web projects, improving usability, and debugging practical issues. Uses AI-assisted tools to explore solutions, speed up development, and reduce repetitive tasks.
                  </p>
                </section>

                {/* Work Experience Section */}
                <section className="mb-4">
                  <div className="bg-[#e2e8f0] text-gray-900 font-bold px-2.5 py-1 text-xs uppercase tracking-wider rounded-sm mb-2.5">
                    WORK EXPERIENCE
                  </div>

                  {/* Role 1 */}
                  <div className="mb-3 px-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-[13px]">
                        Full-Stack Web Developer
                      </h4>
                      <span className="text-[11px] font-semibold text-gray-600">
                        2024 – Present
                      </span>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-gray-700 text-[12px]">
                      <li>Designed and developed responsive websites and web applications using HTML, CSS, JavaScript, and modern web technologies.</li>
                      <li>Built projects from initial ideas to functional applications, with a focus on clean design and user experience.</li>
                      <li>Used AI tools to troubleshoot problems, explore solutions, and handle repetitive coding tasks.</li>
                      <li>Improved responsiveness, performance, accessibility, and compatibility across devices.</li>
                    </ul>
                  </div>

                  {/* Role 2 */}
                  <div className="mb-3 px-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-[13px]">
                        Web Developer / Project Developer
                      </h4>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-gray-700 text-[12px]">
                      <li>Developed responsive websites and applications based on different project requirements.</li>
                      <li>Worked with others to plan, design, develop, and test web-based projects.</li>
                      <li>Created user interfaces focused on functionality, responsive design, and usability.</li>
                      <li>Debugged and improved projects by identifying issues and implementing practical solutions.</li>
                    </ul>
                  </div>

                  {/* Role 3 */}
                  <div className="mb-2 px-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-[13px]">
                        Personal Portfolio Developer
                      </h4>
                      <span className="text-[11px] font-semibold text-gray-600">
                        2026 – Present
                      </span>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-gray-700 text-[12px]">
                      <li>Designed and developed a personal portfolio to showcase projects, skills, and experience.</li>
                      <li>Created interactive sections and modern visual effects to make the portfolio more engaging.</li>
                      <li>Focused on responsive layouts, smooth interactions, and a clean user experience.</li>
                      <li>Deployed and maintained the portfolio using Vercel.</li>
                    </ul>
                  </div>
                </section>

                {/* Education Section */}
                <section className="mb-4">
                  <div className="bg-[#e2e8f0] text-gray-900 font-bold px-2.5 py-1 text-xs uppercase tracking-wider rounded-sm mb-2">
                    EDUCATION
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-[13px]">
                        Bachelor of Science in Information Technology
                      </h4>
                      <span className="text-[11px] font-semibold text-gray-600">
                        2023 – 2027
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-700 font-medium mt-0.5">
                      Father Saturnino Urios University
                    </p>
                  </div>
                </section>

                {/* Key Skills Section */}
                <section className="mb-4">
                  <div className="bg-[#e2e8f0] text-gray-900 font-bold px-2.5 py-1 text-xs uppercase tracking-wider rounded-sm mb-2">
                    KEY SKILLS
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-gray-700 text-[12px] px-1">
                    <li><strong className="text-gray-900">Frontend:</strong> HTML, CSS, JavaScript</li>
                    <li><strong className="text-gray-900">Backend:</strong> Node.js, APIs, Databases</li>
                    <li><strong className="text-gray-900">UI/UX:</strong> Responsive Design, User Experience</li>
                    <li><strong className="text-gray-900">Tools:</strong> Git, GitHub, AI-Assisted Development</li>
                    <li><strong className="text-gray-900">Problem Solving:</strong> Debugging, Optimization</li>
                    <li><strong className="text-gray-900">Soft Skills:</strong> Teamwork, Communication</li>
                  </ul>
                </section>

                {/* Languages Section */}
                <section className="mb-2">
                  <div className="bg-[#e2e8f0] text-gray-900 font-bold px-2.5 py-1 text-xs uppercase tracking-wider rounded-sm mb-2">
                    LANGUAGES
                  </div>
                  <p className="text-gray-700 text-[12px] px-1">
                    English, Filipino
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
