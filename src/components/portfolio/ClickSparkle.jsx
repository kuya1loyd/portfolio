'use client'

import { useState, useEffect, useCallback } from 'react'

export default function ClickSparkle() {
  const [sparks, setSparks] = useState([])

  const createSpark = useCallback((x, y, color = null) => {
    const id = `${Date.now()}-${Math.random()}`
    const newSpark = {
      id,
      x,
      y,
      color: color || '#00f0ff'
    }

    setSparks((prev) => [...prev.slice(-15), newSpark])

    // Auto cleanup spark after animation completes (600ms)
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id))
    }, 600)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger if clicked on certain native controls if desired,
      // but universal starburst click creates a delightful tactile feel.
      createSpark(e.clientX, e.clientY)
    }

    window.addEventListener('pointerdown', handleClick)
    return () => window.removeEventListener('pointerdown', handleClick)
  }, [createSpark])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
    >
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: spark.x, top: spark.y }}
        >
          {/* 6 Radiating rounded dash sparks as requested in screenshot */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <span
              key={i}
              className="starburst-ray"
              style={{
                '--angle': `${angle}deg`,
                '--color': spark.color
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

