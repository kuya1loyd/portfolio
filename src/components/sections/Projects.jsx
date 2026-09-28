import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../../data/projects'
import { certificates } from '../../data/certificates'
import { skillCategories } from '../../data/skills'
import ITSectionScene from '../layout/ITSectionScene'
import Reveal from '../layout/Reveal'

const tabs = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'tech-stack', label: 'Tech Stack' },
]

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const reduceMotion = useReducedMotion()

  const handleTabKeyDown = (event, index) => {
    let nextIndex
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabs.length - 1
    else return

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    setActiveTab(nextTab.id)
    document.getElementById(`tab-${nextTab.id}`)?.focus()
  }

  return (
    <Reveal className="section-reveal">
      <section className="section-wrap section-it-enabled" id="projects" aria-labelledby="projects-title">
        <ITSectionScene variant="portfolio" />
        <div className="section-heading">
          <div className="section-heading-copy">
            <span className="section-kicker">Selected work</span>
            <h2 className="section-title" id="projects-title">A portfolio in <span>progress.</span></h2>
          </div>
          <p className="section-lede">Explore selected work, certificates, and the tools I work with.</p>
        </div>

        <div className="portfolio-tabs" role="tablist" aria-label="Portfolio categories">
          {tabs.map((tab, index) => (
            <motion.button
              className={`portfolio-tab${activeTab === tab.id ? ' is-active' : ''}`}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="portfolio-panel"
              tabIndex={activeTab === tab.id ? 0 : -1}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="portfolio-panel"
            role="tabpanel"
            id="portfolio-panel"
            aria-labelledby={`tab-${activeTab}`}
            key={activeTab}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            {activeTab === 'projects' && (
              projects.length === 0 ? (
                <div className="surface project-empty">
                  <div className="empty-copy">
                    <h3>Selected projects are unavailable</h3>
                    <p>There are no projects to display right now.</p>
                  </div>
                </div>
              ) : (
                <div className="github-project-grid">
                  {projects.map((project, index) => (
                    <article className="surface github-project-card" key={project.id}>
                      <header className="github-project-meta">
                        <span className="section-kicker">PROJECT / {String(index + 1).padStart(2, '0')}</span>
                        <span className="github-project-status"><span aria-hidden="true" /> LIVE</span>
                      </header>
                      <div className="github-project-brand-panel">
                        <div className="github-project-logo-frame">
                          <img className="github-project-logo" src={project.logo} alt={`${project.title} logo`} />
                        </div>
                      </div>
                      <div className="github-project-copy">
                        <h3>{project.title}</h3>
                      </div>
                      <div className="github-project-footer">
                        <div className="github-project-links">
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live site (opens in a new tab)`}>
                            <span>Live site</span>
                            <span className="github-project-link-icon"><FaExternalLinkAlt aria-hidden="true" /></span>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )
            )}

            {activeTab === 'certificates' && (
              <div className="certificate-tab-content">
                <div className="certificate-tab-grid">
                  {certificates.map((certificate) => (
                    <article className="surface certificate-tab-card" key={certificate.id}>
                      <img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" />
                      <div>
                        <h3>{certificate.title}</h3>
                        <p>{certificate.issuer}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tech-stack' && (
              <div className="surface stack-browser">
                <div className="stack-intro">
                  <span className="section-kicker">Current toolkit</span>
                  <h3 className="panel-title">Technology stack</h3>
                  <p className="stack-copy">The languages, frameworks, and creative tools I use to bring digital ideas to life.</p>
                </div>
                <div className="stack-categories">
                  {skillCategories.map((category, index) => {
                    const CategoryIcon = category.icon
                    return (
                      <article className="stack-category" key={category.title}>
                        <header className="stack-category-heading">
                          <span className="stack-category-icon"><CategoryIcon aria-hidden="true" /></span>
                          <div>
                            <span className="stack-category-index">ID FILE / {String(index + 1).padStart(2, '0')}</span>
                            <h4>{category.title}</h4>
                          </div>
                        </header>
                        <p className="stack-category-description">{category.description}</p>
                        <div className="skill-list" aria-label={`${category.title} technologies`}>
                          {category.skills.map(({ name, icon: Icon, color }) => (
                            <span className="skill-item" key={name}>
                              <span className="stack-skill-logo"><Icon aria-hidden="true" style={{ color }} /></span>
                              <span className="stack-skill-name">{name}</span>
                            </span>
                          ))}
                        </div>
                      </article>
                    )
                  })}
                </div>
                <a className="stack-link" href="#skills">View proficiency levels <FaArrowRight aria-hidden="true" /></a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </Reveal>
  )
}

export default Projects
