import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaEnvelope, FaFacebook, FaFileDownload, FaGithub } from 'react-icons/fa'
import OpmPlayer from '../music/OpmPlayer'
import { useGame } from '../../context/GameContext'

const Hero = () => {
  const reduceMotion = useReducedMotion()
  const { trackSocialVisit } = useGame()

  const enter = reduceMotion ? {} : {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.2, 0.72, 0.22, 1] },
  }

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-grid">
        <motion.div className="hero-copy" {...enter}>
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-index">01</span>
            <span>PERSONAL PORTFOLIO</span>
            <i aria-hidden="true" />
            <span>BUTUAN CITY, PH</span>
          </p>
          <h1 className="hero-title" id="hero-title">
            <span className="hero-title-accent">Building digital</span>
            <span>experiences.</span>
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
            <a className="button-secondary resume-download" href="/resume.pdf" download="John-Lloyd-Galito-Resume.pdf" aria-label="Download my resume PDF">
              Download Resume <FaFileDownload aria-hidden="true" />
            </a>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <span className="hero-social-label">Find me</span>
            <a className="social-icon" href="https://github.com/kuya1loyd" target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackSocialVisit('github')}>
              <FaGithub aria-hidden="true" />
            </a>
            <a className="social-icon" href="https://www.facebook.com/johnlloyd.galito.33" target="_blank" rel="noopener noreferrer" aria-label="Facebook" onClick={() => trackSocialVisit('facebook')}>
              <FaFacebook aria-hidden="true" />
            </a>
            <a className="social-icon" href="mailto:galitojohnlloyd29@gmail.com" aria-label="Email" onClick={() => trackSocialVisit('email')}>
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
    </section>
  )
}

export default Hero
