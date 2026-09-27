import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FaArrowRight, FaDownload, FaEnvelope, FaExternalLinkAlt, FaFacebook, FaFacebookMessenger, FaFileAlt, FaGithub, FaTimes } from 'react-icons/fa'
import OpmPlayer from '../music/OpmPlayer'

const RESUME_IMAGE = '/images/Resume.jpg'

const HeroTechScene = () => (
  <div className="hero-tech-scene" aria-hidden="true">
    <svg className="hero-tech-map" viewBox="0 0 1920 900" preserveAspectRatio="none">
      <g className="hero-tech-routes">
        <path d="M0 134h116v54h86v46h72" />
        <path d="M0 736h132v-64h90v-46h104" />
        <path d="M0 414h72l42 42h96l50-50h118" />
        <path d="M408 0v72h78v40h66" />
        <path d="M1514 0v72h-80v43h-72" />
        <path d="M1100 0v84l-48 48v66h-122" />
        <path d="M1920 158h-108v56h-88v40h-62" />
        <path d="M1920 735h-126v-68h-92v-42h-88" />
        <path d="M1920 432h-92l-42 42h-114l-54-54h-94" />
        <path d="M742 900v-52h76v-42h68" />
        <path d="M1180 900v-54h-72v-42h-68" />
      </g>
      <g className="hero-tech-data">
        <path className="hero-tech-data-one" d="M0 134h116v54h86v46h72" />
        <path className="hero-tech-data-two" d="M0 736h132v-64h90v-46h104" />
        <path className="hero-tech-data-four" d="M0 414h72l42 42h96l50-50h118" />
        <path className="hero-tech-data-three" d="M1920 158h-108v56h-88v40h-62" />
        <path className="hero-tech-data-five" d="M1100 0v84l-48 48v66h-122" />
        <path className="hero-tech-data-six" d="M1920 432h-92l-42 42h-114l-54-54h-94" />
      </g>
      <g className="hero-tech-nodes">
        <circle cx="116" cy="134" r="3" /><circle cx="202" cy="188" r="3" />
        <circle cx="132" cy="736" r="3" /><circle cx="222" cy="672" r="3" />
        <circle cx="72" cy="414" r="3" /><circle cx="210" cy="456" r="3" />
        <circle cx="408" cy="72" r="3" /><circle cx="1514" cy="72" r="3" />
        <circle cx="1100" cy="84" r="3" /><circle cx="1052" cy="132" r="3" />
        <circle cx="1812" cy="158" r="3" /><circle cx="1724" cy="214" r="3" />
        <circle cx="1794" cy="735" r="3" /><circle cx="1702" cy="667" r="3" />
        <circle cx="1828" cy="432" r="3" /><circle cx="1686" cy="474" r="3" />
        <circle cx="818" cy="848" r="3" /><circle cx="1108" cy="846" r="3" />
      </g>
      <g className="hero-tech-readouts">
        <text x="38" y="286">CLIENT / READY</text>
        <text x="1746" y="822">API STATUS <tspan>200 OK</tspan></text>
      </g>
    </svg>
  </div>
)

const Hero = () => {
  const reduceMotion = useReducedMotion()
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const resumeDialogRef = useRef(null)
  const resumeCloseRef = useRef(null)
  const resumeTriggerRef = useRef(null)

  useEffect(() => {
    if (!isResumeOpen) return undefined

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => resumeCloseRef.current?.focus())

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsResumeOpen(false)
        return
      }

      if (event.key !== 'Tab') return
      const focusableElements = resumeDialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleDialogKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousBodyOverflow
      document.removeEventListener('keydown', handleDialogKeyDown)
      resumeTriggerRef.current?.focus()
    }
  }, [isResumeOpen])

  const openResume = (event) => {
    resumeTriggerRef.current = event.currentTarget
    setIsResumeOpen(true)
  }

  const enter = reduceMotion ? {} : {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.2, 0.72, 0.22, 1] },
  }

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <HeroTechScene />
      <div className="hero-grid">
        <motion.div className="hero-copy" {...enter}>
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-index">01</span>
            <span>PERSONAL PORTFOLIO</span>
            <i aria-hidden="true" />
            <span>BUTUAN CITY, PH</span>
          </p>
          <h1 className="hero-title" id="hero-title" aria-label="Digital experiences built with intention.">
            <span className="hero-title-accent hero-title-line" aria-hidden="true">Digital experiences</span>
            <span className="hero-title-line" aria-hidden="true">built with intention.</span>
          </h1>
          <p className="hero-role">
            Front-End Developer<span className="typing-caret" aria-hidden="true" />
          </p>
          <p className="hero-description">
            I design and build responsive web interfaces with React and modern front-end tools, bringing clear ideas to life through thoughtful details and dependable code.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#projects">Projects <FaArrowRight aria-hidden="true" /></a>
            <a className="button-secondary" href="#contact">Contact Me <FaArrowRight aria-hidden="true" /></a>
            <motion.button
              className="button-secondary resume-download"
              type="button"
              aria-label="View my resume"
              aria-haspopup="dialog"
              aria-expanded={isResumeOpen}
              aria-controls="resume-preview"
              onClick={openResume}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            >
              View Resume <FaFileAlt aria-hidden="true" />
            </motion.button>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <span className="hero-social-label">Find me</span>
            <a className="social-icon" href="https://github.com/kuya1loyd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub aria-hidden="true" />
            </a>
            <a className="social-icon" href="https://www.facebook.com/johnlloyd.galito.33" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook aria-hidden="true" />
            </a>
            <a className="social-icon" href="https://m.me/johnlloyd.galito.33" target="_blank" rel="noopener noreferrer" aria-label="Facebook Messenger">
              <FaFacebookMessenger aria-hidden="true" />
            </a>
            <a className="social-icon" href="mailto:galitojohnlloyd29@gmail.com" aria-label="Email">
              <FaEnvelope aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-playlist-wrap"
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.14, ease: [0.2, 0.72, 0.22, 1] }}
        >
          <OpmPlayer />
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isResumeOpen && (
            <motion.div
              className="resume-lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-dialog-title"
              id="resume-preview"
              ref={resumeDialogRef}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsResumeOpen(false)
              }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
            >
              <motion.section
                className="resume-viewer"
                initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.2, 0.72, 0.22, 1] }}
              >
                <header className="resume-viewer-header">
                  <div>
                    <span className="resume-viewer-kicker">CAREER PROFILE / 2026</span>
                    <h2 id="resume-dialog-title">John Lloyd Galito <span>Resume</span></h2>
                  </div>
                  <div className="resume-viewer-actions">
                    <a className="resume-viewer-action" href={RESUME_IMAGE} download="John-Lloyd-Galito-Resume.jpg">
                      <FaDownload aria-hidden="true" /> <span>Download</span>
                    </a>
                    <a className="resume-viewer-action" href={RESUME_IMAGE} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt aria-hidden="true" /> <span>Open image</span>
                    </a>
                    <button className="resume-viewer-close" type="button" ref={resumeCloseRef} onClick={() => setIsResumeOpen(false)} aria-label="Close resume preview">
                      <FaTimes aria-hidden="true" />
                    </button>
                  </div>
                </header>
                <div className="resume-preview-frame">
                  <img src={RESUME_IMAGE} alt="Resume for John Lloyd Galito" />
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}

export default Hero
