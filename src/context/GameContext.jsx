import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { skillCategories } from '../data/skills'
import { projects } from '../data/projects'

const GameContext = createContext(null)
const STORAGE_KEY = 'galito-portfolio-achievements-v1'
const REQUIRED_SOCIALS = ['github', 'facebook', 'email']
const REQUIRED_SECTIONS = ['home', 'about', 'skills', 'projects', 'contact']
const REQUIRED_SKILLS = skillCategories.flatMap((category) => category.skills.map(({ name }) => name))
const SESSION_TIME_LIMIT = 60_000

const defaultAchievements = [
  { id: 1, name: 'Welcome Developer', description: 'Visit the portfolio', unlocked: true },
  { id: 2, name: 'Skill Master', description: 'Click all skills', unlocked: false },
  { id: 3, name: 'Project Hunter', description: 'Publish 3 projects on the portfolio', unlocked: false },
  { id: 4, name: 'Social Butterfly', description: 'Visit all social links', unlocked: false },
  { id: 5, name: 'Full Stack Pro', description: 'View all sections', unlocked: false },
  { id: 6, name: 'Speed Runner', description: 'Complete portfolio in under 1 minute', unlocked: false },
]

const restoreGameState = () => {
  const initialState = {
    score: 0,
    achievements: defaultAchievements,
    clickedSkills: [],
    visitedSocials: [],
    visitedSections: [],
  }

  if (typeof window === 'undefined') return initialState

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    if (!saved) return initialState

    const unlockedIds = new Set((saved.achievements || []).filter((item) => item.unlocked).map((item) => item.id))
    return {
      score: Number.isFinite(saved.score) ? saved.score : 0,
      achievements: defaultAchievements.map((item) => ({ ...item, unlocked: item.id === 1 || unlockedIds.has(item.id) })),
      clickedSkills: Array.isArray(saved.clickedSkills) ? saved.clickedSkills : [],
      visitedSocials: Array.isArray(saved.visitedSocials) ? saved.visitedSocials : [],
      visitedSections: Array.isArray(saved.visitedSections) ? saved.visitedSections : [],
    }
  } catch {
    return initialState
  }
}

const unlockInState = (state, achievementId) => {
  const achievement = state.achievements.find((item) => item.id === achievementId)
  if (!achievement || achievement.unlocked) return state

  return {
    ...state,
    score: state.score + 100,
    achievements: state.achievements.map((item) => (
      item.id === achievementId ? { ...item, unlocked: true } : item
    )),
  }
}

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(restoreGameState)
  const [publicProjectCount, setPublicProjectCount] = useState(projects.length)
  const startedAt = useRef(Date.now())
  const speedRunSections = useRef(new Set())

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        score: gameState.score,
        achievements: gameState.achievements.map(({ id, unlocked }) => ({ id, unlocked })),
        clickedSkills: gameState.clickedSkills,
        visitedSocials: gameState.visitedSocials,
        visitedSections: gameState.visitedSections,
      }))
    } catch {
      // The badges still work for this visit when browser storage is unavailable.
    }
  }, [gameState])

  useEffect(() => {
    if (projects.length >= 3) {
      setGameState((previous) => unlockInState(previous, 3))
    }
  }, [])

  const addScore = useCallback((points) => {
    setGameState((previous) => ({ ...previous, score: previous.score + points }))
  }, [])

  const unlockAchievement = useCallback((achievementId) => {
    setGameState((previous) => unlockInState(previous, achievementId))
  }, [])

  const setProjectCount = useCallback((count) => {
    setPublicProjectCount(Math.max(0, Math.floor(Number(count) || 0)))
  }, [])

  const markSkillClicked = useCallback((skillName) => {
    setGameState((previous) => {
      if (previous.clickedSkills.includes(skillName)) return previous
      const clickedSkills = [...previous.clickedSkills, skillName]
      const next = { ...previous, clickedSkills }
      return REQUIRED_SKILLS.every((name) => clickedSkills.includes(name))
        ? unlockInState(next, 2)
        : next
    })
  }, [])

  const trackSocialVisit = useCallback((socialName) => {
    setGameState((previous) => {
      if (!REQUIRED_SOCIALS.includes(socialName) || previous.visitedSocials.includes(socialName)) return previous
      const visitedSocials = [...previous.visitedSocials, socialName]
      const next = { ...previous, visitedSocials }
      return REQUIRED_SOCIALS.every((name) => visitedSocials.includes(name))
        ? unlockInState(next, 4)
        : next
    })
  }, [])

  const markSectionVisited = useCallback((sectionId) => {
    if (!REQUIRED_SECTIONS.includes(sectionId)) return
    speedRunSections.current.add(sectionId)

    setGameState((previous) => {
      const visitedSections = previous.visitedSections.includes(sectionId)
        ? previous.visitedSections
        : [...previous.visitedSections, sectionId]
      let next = { ...previous, visitedSections }

      if (REQUIRED_SECTIONS.every((id) => visitedSections.includes(id))) {
        next = unlockInState(next, 5)
      }
      if (
        speedRunSections.current.size === REQUIRED_SECTIONS.length
        && Date.now() - startedAt.current < SESSION_TIME_LIMIT
      ) {
        next = unlockInState(next, 6)
      }

      return next
    })
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) markSectionVisited(entry.target.id)
      })
    }, { threshold: 0.12 })

    REQUIRED_SECTIONS.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [markSectionVisited])

  const progress = useMemo(() => ({
    clickedSkills: gameState.clickedSkills,
    skills: gameState.clickedSkills.length,
    totalSkills: REQUIRED_SKILLS.length,
    projects: publicProjectCount,
    requiredProjects: 3,
    socials: gameState.visitedSocials.length,
    totalSocials: REQUIRED_SOCIALS.length,
    sections: gameState.visitedSections.length,
    totalSections: REQUIRED_SECTIONS.length,
    speedSections: speedRunSections.current.size,
  }), [gameState, publicProjectCount])

  return (
    <GameContext.Provider value={{
      score: gameState.score,
      achievements: gameState.achievements,
      progress,
      addScore,
      unlockAchievement,
      setProjectCount,
      markSkillClicked,
      trackSocialVisit,
      markSectionVisited,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used within GameProvider')
  return context
}
