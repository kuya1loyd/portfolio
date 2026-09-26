import Reveal from '../layout/Reveal'
import { proficiencyLevels, skillCategories } from '../../data/skills'
import { useGame } from '../../context/GameContext'

const Skills = () => {
  const { markSkillClicked, progress } = useGame()

  return (
    <Reveal className="section-reveal">
    <section className="section-wrap" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <div className="section-heading-copy">
          <span className="section-kicker">Tools of the trade</span>
          <h2 className="section-title" id="skills-title">My skills &amp; <span>technologies.</span></h2>
        </div>
        <p className="section-lede">The tools I reach for to build accessible interfaces and reliable web experiences.</p>
      </div>

      <div className="skills-layout">
        <div className="skill-categories">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon
            return (
              <Reveal key={category.title} delay={index * 0.07}>
                <article className="surface skill-category">
                  <div className="category-heading">
                    <span className="category-icon"><CategoryIcon aria-hidden="true" /></span>
                    <div className="category-copy">
                      <h3>{category.title}</h3>
                      <p className="category-description">{category.description}</p>
                    </div>
                    <span className="category-index">ID FILE / {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="skill-list" aria-label={`${category.title} technologies`}>
                    {category.skills.map(({ name, icon: Icon }) => (
                      <button className={`skill-item skill-button${progress.clickedSkills.includes(name) ? ' is-explored' : ''}`} type="button" key={name} title={`Click to explore ${name}`} aria-pressed={progress.clickedSkills.includes(name)} onClick={() => markSkillClicked(name)}>
                        <Icon aria-hidden="true" /> {name}
                      </button>
                    ))}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.12}>
          <aside className="surface proficiency">
            <span className="section-kicker">At a glance</span>
            <h3 className="panel-title" style={{ marginTop: 7 }}>Proficiency levels</h3>
            <div className="proficiency-list">
              {proficiencyLevels.map((item) => (
                <div key={item.skill}>
                  <div className="proficiency-label">
                    <span>{item.skill}</span><span>{item.level}%</span>
                  </div>
                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-label={item.skill}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={item.level}
                  >
                    <div className="progress-fill" style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
    </Reveal>
  )
}

export default Skills
