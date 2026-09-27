import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa'

const WELCOME_AUTO_ENTER_MS = 3000
const REDUCED_MOTION_AUTO_ENTER_MS = 1800
const WELCOME_PROGRESS_MS = 2200
const welcomeContentVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.085 } },
}
const welcomeItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.2, 0.72, 0.22, 1] },
  },
}

const WelcomeTechScene = () => {
  const codeSnippets = [
    <span key="react"><i>01</i> CLIENT <b>React · TypeScript</b></span>,
    <span key="api"><i>02</i> API <b>GET /projects</b></span>,
    <span key="node"><i>03</i> SERVER <b>Node.js · Express</b></span>,
    <span key="sql"><i>04</i> DATABASE <b>SQL · Supabase</b></span>,
    <span key="git"><i>05</i> VERSION CONTROL <b>git push</b></span>,
    <span key="deploy"><i>06</i> PIPELINE <b>build → deploy</b></span>,
  ]

  return (
    <div className="welcome-tech-scene" aria-hidden="true">
      <div className="welcome-tech-glow" />
      <svg className="welcome-tech-circuit" viewBox="0 0 1400 800" preserveAspectRatio="none" focusable="false">
        <path className="welcome-tech-trace" d="M-20 174H144V110H286V78H436" />
        <path className="welcome-tech-pulse" d="M-20 174H144V110H286V78H436" />
        <path className="welcome-tech-trace" d="M-20 584H182V648H344V690H516" />
        <path className="welcome-tech-trace" d="M1420 168H1250V102H1108V72H974" />
        <path className="welcome-tech-trace" d="M1420 586H1224V642H1064V690H888" />
        <path className="welcome-tech-pulse welcome-tech-pulse-reverse" d="M1420 168H1250V102H1108V72H974" />
        <circle className="welcome-tech-node" cx="286" cy="110" r="3" />
        <circle className="welcome-tech-node" cx="1108" cy="102" r="3" />
      </svg>
      <div className="welcome-tech-topbar">
        <span><i /> DEV ENVIRONMENT / ONLINE</span>
        <span>FULL-STACK · BUILD PIPELINE</span>
      </div>
      <div className="welcome-tech-stream welcome-tech-stream-top">
        <div className="welcome-tech-track">
          <div className="welcome-tech-tape">{codeSnippets}</div>
          <div className="welcome-tech-tape" aria-hidden="true">{codeSnippets}</div>
        </div>
      </div>
      <div className="welcome-tech-panel welcome-tech-panel-left">
        <span className="welcome-tech-panel-title">01 / APPLICATION</span>
        <b>FRONTEND <i>ACTIVE</i></b>
        <small>React · TypeScript · CSS</small>
      </div>
      <div className="welcome-tech-panel welcome-tech-panel-right">
        <span className="welcome-tech-panel-title">02 / SERVICES</span>
        <b>BACKEND <i>CONNECTED</i></b>
        <small>Node.js · APIs · SQL</small>
      </div>
      <div className="welcome-tech-footerbar">
        <span>GIT <b>→</b> BUILD <b>→</b> DEPLOY</span>
        <span>UI / API / DATA</span>
      </div>
    </div>
  )
}

const WelcomeLanding = ({ onExit, robotAnchorRef }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()
  const dismiss = useCallback(() => {
    setIsVisible(false)
    onExit?.()
  }, [onExit])

  useEffect(() => {
    if (!isVisible) return undefined

    const autoEnterTimer = window.setTimeout(
      dismiss,
      reduceMotion ? REDUCED_MOTION_AUTO_ENTER_MS : WELCOME_AUTO_ENTER_MS,
    )

    if (reduceMotion) {
      setProgress(100)
      return () => window.clearTimeout(autoEnterTimer)
    }

    const startedAt = Date.now()
    const progressTimer = window.setInterval(() => {
      const nextProgress = Math.min(100, Math.round(((Date.now() - startedAt) / WELCOME_PROGRESS_MS) * 100))
      setProgress(nextProgress)
      if (nextProgress >= 100) window.clearInterval(progressTimer)
    }, 80)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(autoEnterTimer)
    }
  }, [dismiss, isVisible, reduceMotion])

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className="welcome-landing"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.32, ease: 'easeOut' }}
        >
          <WelcomeTechScene />
          <div className="welcome-landing-grid" aria-hidden="true" />
          <div className="welcome-landing-layout">
            <motion.section
              className="welcome-landing-content"
              aria-labelledby="welcome-title"
              variants={welcomeContentVariants}
              initial={reduceMotion ? false : 'hidden'}
              animate="visible"
            >
              <div className="welcome-robot-anchor" ref={robotAnchorRef} aria-hidden="true" />
              <motion.span className="welcome-landing-overline" variants={welcomeItemVariants}>PERSONAL PORTFOLIO</motion.span>
              <motion.h1 id="welcome-title" variants={welcomeItemVariants}>JOHN LLOYD GALITO</motion.h1>
              <motion.p className="welcome-landing-subtitle" variants={welcomeItemVariants}>
                <span>Front-End Developer</span>
                <i aria-hidden="true" />
                <span>Butuan City, Philippines</span>
              </motion.p>

              <motion.nav className="welcome-socials" aria-label="Social links" variants={welcomeItemVariants}>
                <a href="https://github.com/kuya1loyd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub aria-hidden="true" />
                </a>
                <a href="https://www.facebook.com/johnlloyd.galito.33" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook aria-hidden="true" />
                </a>
                <a href="mailto:galitojohnlloyd29@gmail.com" aria-label="Email">
                  <FaEnvelope aria-hidden="true" />
                </a>
              </motion.nav>

              <motion.div className="welcome-loader" variants={welcomeItemVariants}>
                <div className="welcome-progress-heading">
                  <span>{reduceMotion || progress >= 100 ? 'Portfolio ready' : 'Preparing your portfolio'}</span>
                  <strong aria-hidden="true">{progress}%</strong>
                </div>
                <div
                  className="welcome-progress-track"
                  role="progressbar"
                  aria-label="Portfolio loading"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={progress}
                  aria-valuetext={`${progress}%`}
                >
                  <motion.span
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'linear' }}
                  />
                </div>
              </motion.div>

              <motion.button className="welcome-enter" type="button" onClick={dismiss} variants={welcomeItemVariants}>
                Enter portfolio <FaArrowRight aria-hidden="true" />
              </motion.button>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeLanding
