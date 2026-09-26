import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const CursorRobot = () => {
  const robotRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const robot = robotRef.current
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!robot || reduceMotion || !pointerQuery.matches) return undefined

    let frame = 0
    let targetX = -100
    let targetY = -100
    let currentX = targetX
    let currentY = targetY

    const follow = () => {
      currentX += (targetX - currentX) * 0.22
      currentY += (targetY - currentY) * 0.22
      robot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      if (Math.abs(targetX - currentX) > 0.35 || Math.abs(targetY - currentY) > 0.35) {
        frame = window.requestAnimationFrame(follow)
      } else {
        frame = 0
      }
    }

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      targetX = event.clientX + 16
      targetY = event.clientY + 18
      if (!frame) frame = window.requestAnimationFrame(follow)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  return (
    <div className="cursor-robot" ref={robotRef} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 3v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="2.5" r="2" fill="#52d9e7" />
        <rect x="8" y="10" width="32" height="27" rx="10" fill="#101d33" stroke="#65b5ff" strokeWidth="1.5" />
        <path d="M13 17.5c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v7.1c0 1.1-.9 2-2 2H15c-1.1 0-2-.9-2-2v-7.1Z" fill="#07111f" stroke="#2b6ca8" />
        <circle cx="18" cy="21" r="2.1" fill="#5fe6ef" />
        <circle cx="30" cy="21" r="2.1" fill="#5fe6ef" />
        <path d="M19 31h10" stroke="#75c4ff" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M4.5 20v7M43.5 20v7" stroke="#90bfe9" strokeWidth="2" strokeLinecap="round" />
        <path d="m14 37-2.5 4M34 37l2.5 4" stroke="#5c99d9" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="cursor-robot-glow" />
    </div>
  )
}

export default CursorRobot
