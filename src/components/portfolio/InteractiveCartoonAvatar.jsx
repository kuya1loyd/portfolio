'use client'

import { useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function InteractiveCartoonAvatar() {
  const containerRef = useRef(null)
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)

  // Fluid physics-based springs for smooth pupil tracking
  const springConfig = { damping: 22, stiffness: 200, mass: 0.25 }
  const leftPupilX = useSpring(0, springConfig)
  const leftPupilY = useSpring(0, springConfig)
  const rightPupilX = useSpring(0, springConfig)
  const rightPupilY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Calculate for Left Eye (viewer's left)
      if (leftEyeRef.current) {
        const rect = leftEyeRef.current.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2
        const deltaX = mouseX - eyeCenterX
        const deltaY = mouseY - eyeCenterY
        const angle = Math.atan2(deltaY, deltaX)
        const dist = Math.min(3.8, Math.hypot(deltaX, deltaY) / 50)
        leftPupilX.set(Math.cos(angle) * dist)
        leftPupilY.set(Math.sin(angle) * dist)
      }

      // Calculate for Right Eye (viewer's right)
      if (rightEyeRef.current) {
        const rect = rightEyeRef.current.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2
        const deltaX = mouseX - eyeCenterX
        const deltaY = mouseY - eyeCenterY
        const angle = Math.atan2(deltaY, deltaX)
        const dist = Math.min(3.8, Math.hypot(deltaX, deltaY) / 50)
        rightPupilX.set(Math.cos(angle) * dist)
        rightPupilY.set(Math.sin(angle) * dist)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [leftPupilX, leftPupilY, rightPupilX, rightPupilY])

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden bg-slate-100">
      {/* Cartoon Base Artwork in user's exact photo pose */}
      <img
        src="/images/cartoon-avatar.jpg?v=3"
        alt="John Lloyd Galito - Cartoon Developer Avatar"
        className="w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Interactive Left Eye Tracking Socket */}
      <div
        ref={leftEyeRef}
        style={{
          left: '45.1%',
          top: '45.4%',
          width: '4.6%',
          height: '2.8%',
        }}
        className="absolute overflow-hidden flex items-center justify-center pointer-events-none rounded-[50%_50%_45%_45%]"
      >
        <div className="relative w-full h-full bg-[#fdfbf7] rounded-[50%_50%_45%_45%] overflow-hidden flex items-center justify-center shadow-inner">
          <motion.div
            style={{ x: leftPupilX, y: leftPupilY }}
            className="w-3 h-3 rounded-full bg-[#201511] border border-[#3d2319] flex items-center justify-center relative shrink-0"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-white opacity-95" />
          </motion.div>
        </div>
      </div>

      {/* Interactive Right Eye Tracking Socket */}
      <div
        ref={rightEyeRef}
        style={{
          left: '54.5%',
          top: '45.4%',
          width: '4.6%',
          height: '2.8%',
        }}
        className="absolute overflow-hidden flex items-center justify-center pointer-events-none rounded-[50%_50%_45%_45%]"
      >
        <div className="relative w-full h-full bg-[#fdfbf7] rounded-[50%_50%_45%_45%] overflow-hidden flex items-center justify-center shadow-inner">
          <motion.div
            style={{ x: rightPupilX, y: rightPupilY }}
            className="w-3 h-3 rounded-full bg-[#201511] border border-[#3d2319] flex items-center justify-center relative shrink-0"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-white opacity-95" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
