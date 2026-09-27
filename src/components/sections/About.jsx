import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCalendarAlt, FaGraduationCap, FaLaptop, FaMapMarkerAlt } from 'react-icons/fa'
import { projectCount } from '../../data/projects'
import ITSectionScene from '../layout/ITSectionScene'
import Reveal from '../layout/Reveal'

const education = {
  degree: 'BS Information Technology',
  school: 'Father Saturnino Urios University',
  location: 'Butuan City, Agusan del Norte, Philippines',
}

const quickDetails = [
  { icon: FaGraduationCap, title: education.degree, subtitle: education.school },
  { icon: FaMapMarkerAlt, title: 'Based in', subtitle: education.location },
  { icon: FaCalendarAlt, title: 'Born', subtitle: 'January 13, 2005' },
]

const specializations = [
  { name: 'Frontend', detail: 'React, JavaScript, HTML5, CSS3, Tailwind' },
  { name: 'Backend', detail: 'Node.js, Express, Laravel, PHP' },
  { name: 'Databases', detail: 'MySQL, PostgreSQL, Supabase' },
  { name: 'Tools', detail: 'Git, GitHub, Docker, VS Code, Responsive Design' },
]

const stats = [
  { value: '2+', label: 'Years experience' },
  { value: String(projectCount), label: 'Projects completed' },
  { value: '100%', label: 'Dedication' },
]

const About = () => {
  const [hasBatmanPortrait, setHasBatmanPortrait] = useState(false)

  return (
    <Reveal className="section-reveal">
    <section className="section-wrap section-it-enabled" id="about" aria-labelledby="about-title">
      <ITSectionScene variant="about" />
      <div className="about-reference-layout">
        <div className="portrait-name-backdrop" aria-hidden="true">
          <motion.div
            className="portrait-name-track"
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ duration: 26, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
          >
            <span>JOHN LLOYD GALITO</span>
            <span>JOHN LLOYD GALITO</span>
          </motion.div>
        </div>
        <div className="about-reference-intro">
          <span className="section-kicker">A little about me</span>
          <h2 className="about-display-title" id="about-title">Hi, I&apos;m <span>John Lloyd</span> Galito</h2>
          <p className="about-intro-role">Front-End Developer <span aria-hidden="true">/</span> BSIT Student</p>
          <a className="button-primary" href="#contact">Let&apos;s connect <FaArrowRight aria-hidden="true" /></a>
        </div>

        <div className="about-portrait-stage">
          <figure
            className={`surface about-portrait${hasBatmanPortrait ? ' has-batman-portrait' : ''}`}
            tabIndex={hasBatmanPortrait ? 0 : undefined}
            aria-label={hasBatmanPortrait ? 'Hover or focus to view the Batman portrait.' : undefined}
          >
            <img src="/images/profile.jpg" alt="John Lloyd Galito in Butuan City" loading="lazy" />
            <img
              className="about-batman-portrait"
              src="/images/Batman.jpg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              onLoad={() => setHasBatmanPortrait(true)}
              onError={() => setHasBatmanPortrait(false)}
            />
            <span className="about-portrait-energy" aria-hidden="true">
              <svg className="about-portrait-lightning" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="portrait-flash-halo" pathLength="1" vectorEffect="non-scaling-stroke" d="M50 66 46 63 49 60 44 57 47 53 45 50 M46 63 42 64 39 62 35 63 32 60 M49 60 53 62 57 60 61 62 M46 63 45 67 41 69 40 73 M53 62 55 66 59 68" />
                <path className="portrait-flash-core" pathLength="1" vectorEffect="non-scaling-stroke" d="M50 66 46 63 49 60 44 57 47 53 45 50 M46 63 42 64 39 62 35 63 32 60 M49 60 53 62 57 60 61 62 M46 63 45 67 41 69 40 73 M53 62 55 66 59 68" />
              </svg>
            </span>
            <figcaption>
              <span className="portrait-mark">JG / PH</span>
              <span className="portrait-caption">Butuan City, Philippines</span>
            </figcaption>
          </figure>
        </div>

        <article className="about-reference-copy">
          <span className="about-label"><span className="eyebrow-dot" /> Developer profile</span>
          <p className="about-copy">
            Hello! I&apos;m John Lloyd, a full-stack developer who enjoys building useful and modern digital experiences. I use AI as a tool to help me build projects faster, solve problems, and explore new ideas, while I handle the development and direction of the projects myself.
          </p>
          <p className="about-copy">
            I&apos;m currently studying BS in Information Technology at Father Saturnino Urios University in Butuan City. I work with both front-end and back-end technologies and continue to improve my skills by building projects, experimenting with new tools, and working with others.
          </p>
          <div className="about-availability"><span className="availability-dot" /> Open to learning and collaboration</div>
          <a className="about-project-link" href="#projects">View Projects <FaArrowRight aria-hidden="true" /></a>
        </article>
      </div>

      <div className="about-supporting-details">
        <aside className="surface about-details" aria-label="Quick details">
          <h3 className="panel-title">Quick details</h3>
          <div className="detail-list">
            {quickDetails.map(({ icon: Icon, title, subtitle }) => (
              <div className="detail-row" key={title}>
                <span className="detail-icon"><Icon aria-hidden="true" /></span>
                <span>
                  <span className="detail-title">{title}</span>
                  <span className="detail-subtitle">{subtitle}</span>
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="stats-grid" aria-label="Portfolio stats">
        {stats.map((stat) => (
          <div className="surface stat-item" key={stat.label}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="surface specialization-panel">
        <h3 className="panel-title"><FaLaptop aria-hidden="true" /> Areas I work in</h3>
        <div className="specialization-grid">
          {specializations.map((item) => (
            <article className="specialization-item" key={item.name}>
              <h4 className="specialization-name">{item.name}</h4>
              <p className="specialization-copy">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  )
}

export default About
