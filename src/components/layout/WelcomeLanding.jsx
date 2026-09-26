import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaCheck, FaCode } from 'react-icons/fa'

const initializeSteps = [
  'Developer profile connected',
  'Portfolio modules loaded',
  'Certificate archive ready',
  'Interface systems online',
]

const WelcomeLanding = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(false)
      return undefined
    }
    if (!isVisible) return undefined

    const startedAt = Date.now()
    const progressTimer = window.setInterval(() => {
      setProgress(Math.min(100, Math.round(((Date.now() - startedAt) / 3200) * 100)))
    }, 80)
    const closeTimer = window.setTimeout(() => {
      setProgress(100)
      setIsVisible(false)
    }, 3600)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(closeTimer)
    }
  }, [isVisible, reduceMotion])

  if (reduceMotion) return null

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className="welcome-landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
        >
          <div className="welcome-landing-grid" aria-hidden="true" />
          <header className="welcome-landing-top">
            <span className="welcome-system-brand"><b>JG</b><span>GALITO <i>/</i> PORTFOLIO SYSTEM</span></span>
            <span className="welcome-system-state"><i /> SYSTEM INITIALIZING</span>
          </header>

          <div className="welcome-landing-layout">
            <section className="welcome-landing-content" aria-labelledby="welcome-title">
              <span className="welcome-landing-overline"><i /> BOOT SEQUENCE / FRONT-END TERMINAL</span>
              <p className="welcome-landing-greeting">WELCOME, DEVELOPER</p>
              <h1 id="welcome-title">John Lloyd <span>Galito</span></h1>
              <p className="welcome-landing-subtitle">Front-End Developer <i /> Butuan City, Philippines</p>

              <div className="welcome-terminal" aria-label="Portfolio system initialization steps">
                {initializeSteps.map((step, index) => {
                  const ready = progress >= (index + 1) * 24
                  const current = !ready && progress >= index * 24
                  return (
                    <div className={`welcome-terminal-row${ready ? ' is-ready' : ''}${current ? ' is-current' : ''}`} key={step}>
                      <span className="welcome-terminal-icon" aria-hidden="true">{ready ? <FaCheck /> : current ? <i /> : '>'}</span>
                      <span>{step}</span>
                      <small>{ready ? 'READY' : current ? 'LOAD' : 'WAIT'}</small>
                    </div>
                  )
                })}
              </div>

              <div className="welcome-progress-heading">
                <span>Initializing developer workspace</span>
                <strong aria-hidden="true">{progress}%</strong>
              </div>
              <div className="welcome-progress-track" role="progressbar" aria-label="Portfolio system initialization" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
                <motion.span animate={{ scaleX: progress / 100 }} transition={{ duration: 0.18, ease: 'linear' }} />
              </div>

              <div className="welcome-landing-footer">
                <span>JG-01 <i>/</i> INTERACTIVE DEVELOPER PROFILE</span>
                <button type="button" onClick={() => setIsVisible(false)}>
                  Enter portfolio <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </section>

            <aside className="welcome-system-visual" aria-label="Portfolio system online">
              <div className="welcome-system-orbit welcome-system-orbit-a" />
              <div className="welcome-system-orbit welcome-system-orbit-b" />
              <div className="welcome-system-orbit welcome-system-orbit-c" />
              <span className="welcome-system-node welcome-system-node-a" />
              <span className="welcome-system-node welcome-system-node-b" />
              <div className="welcome-system-core">
                <FaCode aria-hidden="true" />
                <strong>JG</strong>
                <span>SYS / 01</span>
              </div>
              <div className="welcome-system-readout">
                <span>PROFILE STATUS <b>READY</b></span>
                <span>NETWORK <b>CONNECTED</b></span>
                <span>EXPERIENCE <b>INITIALIZING</b></span>
              </div>
            </aside>
          </div>

          <footer className="welcome-landing-bottom">
            <span>PERSONAL PORTFOLIO ENVIRONMENT</span>
            <span>PHILIPPINES <i /> 2026</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeLanding
