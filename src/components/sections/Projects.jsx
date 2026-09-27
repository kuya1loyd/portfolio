import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaCodeBranch, FaCode, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
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

const GITHUB_REPOSITORIES_URL = 'https://api.github.com/users/kuya1loyd/repos?sort=updated&per_page=100'
const GITHUB_PROFILE_URL = 'https://github.com/kuya1loyd'
const featuredProjectTitles = {
  rentrack: 'RenTrack',
  carvexcarparts: 'Carvex Carparts',
}
const projectKey = (name = '') => name.toLowerCase().replace(/[^a-z0-9]/g, '')
const curatedProjects = projects.filter((project) => projectKey(project.title) in featuredProjectTitles)

const getSafeHomepage = (homepage) => {
  if (!homepage) return ''
  try {
    const url = new URL(homepage.startsWith('http') ? homepage : `https://${homepage}`)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [githubProjects, setGithubProjects] = useState([])
  const [projectLoading, setProjectLoading] = useState(curatedProjects.length === 0)
  const [projectError, setProjectError] = useState('')
  const reduceMotion = useReducedMotion()
  const projectEntries = curatedProjects.length > 0 ? curatedProjects : githubProjects

  useEffect(() => {
    if (curatedProjects.length > 0) {
      setProjectLoading(false)
      return undefined
    }

    const controller = new AbortController()
    const loadRepositories = async () => {
      try {
        const response = await fetch(GITHUB_REPOSITORIES_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`)

        const repositories = await response.json()
        if (!Array.isArray(repositories)) throw new Error('GitHub returned an unexpected response')

        const eligibleRepositories = repositories.filter((repository) => (
          !repository.fork
          && !repository.archived
          && !repository.disabled
          && projectKey(repository.name) in featuredProjectTitles
        ))
        const selectedRepositories = Object.keys(featuredProjectTitles)
          .map((key) => eligibleRepositories.find((repository) => projectKey(repository.name) === key))
          .filter(Boolean)
        const publicRepositories = selectedRepositories
          .map((repository) => ({
            id: repository.id,
            name: featuredProjectTitles[projectKey(repository.name)],
            description: repository.description?.trim() || '',
            codeUrl: repository.html_url,
            homepage: getSafeHomepage(repository.homepage),
          }))

        setGithubProjects(publicRepositories)
      } catch (error) {
        if (error.name !== 'AbortError') setProjectError('GitHub repositories could not be loaded right now.')
      } finally {
        if (!controller.signal.aborted) setProjectLoading(false)
      }
    }

    loadRepositories()
    return () => controller.abort()
  }, [])

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
              projectLoading ? (
                <div className="surface project-load-state" role="status" aria-live="polite">
                  <span className="project-loading-indicator" aria-hidden="true" />
                  <div><h3>Loading public projects</h3><p>Fetching the latest repositories from GitHub.</p></div>
                </div>
              ) : projectError ? (
                <div className="surface project-load-state project-load-error" role="status" aria-live="polite">
                  <div><h3>Projects are temporarily unavailable</h3><p>{projectError} You can still browse the public profile directly.</p></div>
                  <a className="button-secondary empty-link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">Open GitHub <FaArrowRight aria-hidden="true" /></a>
                </div>
              ) : projectEntries.length === 0 ? (
                <div className="surface project-empty">
                  <span className="empty-mark"><FaCodeBranch aria-hidden="true" /></span>
                  <div className="empty-copy">
                    <h3>Selected projects are unavailable</h3>
                    <p>RenTrack and Carvex Carparts will appear here when their public GitHub repositories are available.</p>
                  </div>
                  <a className="button-secondary empty-link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                    Visit GitHub <FaArrowRight aria-hidden="true" />
                  </a>
                </div>
              ) : (
                curatedProjects.length > 0 ? <div className="project-list">
                  {projectEntries.map((project) => (
                    <article className="surface project-card" key={project.id}>
                      <div className="project-card-main">
                        <span className="section-kicker">{project.type}</span>
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="skill-list project-technologies" aria-label="Technologies used">
                          {project.technologies.map((technology) => (
                            <span className="tech-chip" key={technology}>{technology}</span>
                          ))}
                        </div>
                        <div className="project-actions">
                          <a className="project-link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <FaGithub aria-hidden="true" /> View code
                          </a>
                          {project.liveLink && (
                            <a className="project-link" href={project.liveLink} target="_blank" rel="noopener noreferrer">
                              <FaExternalLinkAlt aria-hidden="true" /> Live demo
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="project-card-side" aria-hidden="true">
                        <span className="project-side-mark">&lt;/&gt;</span>
                        <span className="project-side-note">{project.githubLink.replace('https://github.com/', '')}</span>
                      </div>
                    </article>
                  ))}
                </div> : <div className="github-project-grid">
                  {projectEntries.map((project, index) => (
                    <article className="surface github-project-card" key={project.id}>
                      <div className="github-project-meta">
                        <span className="section-kicker">PROJECT / {String(index + 1).padStart(2, '0')}</span>
                        <span className="github-project-emblem" aria-hidden="true"><FaCode /></span>
                      </div>
                      <div className="github-project-copy">
                        <h3>{project.name.replace(/[-_]/g, ' ')}</h3>
                        {project.description && <p>{project.description}</p>}
                      </div>
                      <div className="github-project-footer">
                        <div className="github-project-links">
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /> View project</a>
                          {project.homepage && <a href={project.homepage} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt aria-hidden="true" /> Live site</a>}
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
