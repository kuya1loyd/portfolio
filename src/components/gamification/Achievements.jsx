import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaCheck, FaTrophy } from 'react-icons/fa'
import { useGame } from '../../context/GameContext'

export const AchievementList = ({ compact = false }) => {
  const { score, achievements, progress } = useGame()
  const reduceMotion = useReducedMotion()
  const progressLabels = {
    2: `${progress.skills}/${progress.totalSkills} skills clicked`,
    3: `${Math.min(progress.projects, progress.requiredProjects)}/${progress.requiredProjects} projects published`,
    4: `${progress.socials}/${progress.totalSocials} social links visited`,
    5: `${progress.sections}/${progress.totalSections} sections viewed`,
    6: `${progress.speedSections}/${progress.totalSections} sections in this visit`,
  }

  return (
    <div className={`achievement-list${compact ? ' is-compact' : ''}`}>
      <div className="achievement-list-heading">
        <div>
          <span className="section-kicker">Game progress</span>
          <h3 className="panel-title">Portfolio achievements</h3>
        </div>
        <div className="achievement-score"><FaTrophy aria-hidden="true" /> {score} pts</div>
      </div>
      <p className="achievement-note">These are interactive site badges, separate from certificates and professional awards. Progress is saved on this device.</p>
      <div className="achievement-items">
        {achievements.map((achievement, index) => (
          <motion.article
            className={`achievement-item${achievement.unlocked ? ' is-unlocked' : ''}`}
            key={achievement.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.04 }}
          >
            <span className="achievement-icon" aria-hidden="true">{String(achievement.id).padStart(2, '0')}</span>
            <span className="achievement-copy">
              <strong>{achievement.name}</strong>
              <small>{achievement.description}</small>
              {!achievement.unlocked && progressLabels[achievement.id] && (
                <small className="achievement-progress">{progressLabels[achievement.id]}</small>
              )}
            </span>
            <span className="achievement-state" aria-label={achievement.unlocked ? 'Unlocked' : 'Locked'}>
              {achievement.unlocked ? <FaCheck aria-hidden="true" /> : 'LOCKED'}
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

const Achievements = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { achievements } = useGame()
  const reduceMotion = useReducedMotion()
  const unlocked = achievements.filter((achievement) => achievement.unlocked).length

  return (
    <aside className="achievement-widget" aria-label="Portfolio game achievements">
      <motion.button
        className="achievement-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="achievement-popover"
        onClick={() => setIsOpen((open) => !open)}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      >
        <span className="achievement-toggle-icon"><FaTrophy aria-hidden="true" /></span>
        <span>Game badges</span>
        <span className="achievement-count">{unlocked}/{achievements.length}</span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="achievement-popover"
            id="achievement-popover"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <AchievementList compact />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}

export default Achievements
