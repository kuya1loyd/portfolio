import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const stars = Array.from({ length: 36 }, (_, index) => ({
  x: (index * 47 + 13) % 100,
  y: (index * 71 + 9) % 100,
  enterDelay: `${Math.floor(index / 2) * 90}ms`,
  twinkleDelay: `${Math.floor(index / 2) * 90 + 1150}ms`,
  size: index % 11 === 0 ? 'large' : 'small',
  twinkle: index % 6 === 0,
}))

const shootingStars = [
  { top: '17%', left: '90%', delay: '1.5s', duration: '8s', travel: '-520px', drop: '310px' },
  { top: '39%', left: '74%', delay: '5.8s', duration: '10s', travel: '-410px', drop: '245px' },
  { top: '67%', left: '98%', delay: '3.4s', duration: '12s', travel: '-620px', drop: '370px' },
]

const CosmicBackground = () => {
  const backgroundRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const background = backgroundRef.current
    if (!background || reduceMotion) return undefined

    let frame = 0
    const followPointer = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 34
        const y = (event.clientY / window.innerHeight - 0.5) * 24
        background.style.setProperty('--near-x', `${x}px`)
        background.style.setProperty('--near-y', `${y}px`)
        background.style.setProperty('--far-x', `${x * 0.42}px`)
        background.style.setProperty('--far-y', `${y * 0.42}px`)
        background.style.setProperty('--scene-x', `${x * -0.18}px`)
        background.style.setProperty('--scene-y', `${y * -0.18}px`)
      })
    }

    window.addEventListener('pointermove', followPointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', followPointer)
      window.cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  return (
    <div ref={backgroundRef} className="cosmic-background" aria-hidden="true">
      <div className="it-atmosphere">
        <div className="it-radial-glow" />
        <div className="it-grid-plane" />
        <div className="it-scan-beam" />
        <svg className="it-circuit-map" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="circuit-trace" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#286ce5" stopOpacity="0.02" />
              <stop offset="0.52" stopColor="#58a8ff" stopOpacity="0.36" />
              <stop offset="1" stopColor="#3be4e4" stopOpacity="0.07" />
            </linearGradient>
          </defs>
          <path className="circuit-trace circuit-trace-a" d="M-40 250h225l45 45h174l68-68h172l36 36h135l46-46h144l35 35h184l54-54h178" />
          <path className="circuit-trace circuit-trace-b" d="M-40 636h110l53-53h119l41 41h158l40-40h126l45 45h164l57-57h143l55 55h139l46-46h225" />
          <path className="circuit-trace circuit-trace-c" d="M102 0v108l43 43v112m1042-263v127l-58 58v87m-578 628V762l54-54V567m842 333V784l-48-48v-80" />
          <path className="circuit-trace circuit-trace-d" d="M398 0v85l38 38v52m649-175v89l-48 48v102M0 432h149l48 48h114m1129-84h-175l-48 48h-98" />
          <g className="circuit-nodes">
            <circle cx="404" cy="272" r="3" /><circle cx="791" cy="263" r="3" />
            <circle cx="1104" cy="251" r="3" /><circle cx="325" cy="624" r="3" />
            <circle cx="692" cy="584" r="3" /><circle cx="1121" cy="621" r="3" />
            <circle cx="145" cy="263" r="3" /><circle cx="1120" cy="315" r="3" />
          </g>
        </svg>
        <div className="it-data-point it-data-point-a" />
        <div className="it-data-point it-data-point-b" />
        <div className="it-data-point it-data-point-c" />
        <div className="it-data-point it-data-point-d" />
      </div>
      <div className="cosmic-stars cosmic-stars-far">
        {stars.slice(0, 18).map((star, index) => (
          <i className={`cosmic-star ${star.size}${star.twinkle ? ' twinkle' : ''}`} key={`far-${index}`} style={{ left: `${star.x}%`, top: `${star.y}%`, '--star-delay': star.enterDelay, '--twinkle-delay': star.twinkleDelay }} />
        ))}
      </div>
      <div className="cosmic-stars cosmic-stars-near">
        {stars.slice(18).map((star, index) => (
          <i className={`cosmic-star ${star.size}${star.twinkle ? ' twinkle' : ''}`} key={`near-${index}`} style={{ left: `${star.x}%`, top: `${star.y}%`, '--star-delay': star.enterDelay, '--twinkle-delay': star.twinkleDelay }} />
        ))}
      </div>
      {shootingStars.map((star, index) => (
        <i
          className="shooting-star"
          key={`shooting-${index}`}
          style={{ top: star.top, left: star.left, '--shoot-delay': star.delay, '--shoot-duration': star.duration, '--shoot-travel': star.travel, '--shoot-drop': star.drop }}
        />
      ))}
    </div>
  )
}

export default CosmicBackground
