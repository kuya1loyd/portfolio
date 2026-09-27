import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const DOT_SIZE = 10

const CursorRobot = ({ welcomeActive = false, welcomeAnchorRef }) => {
  const dotRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    const dot = dotRef.current
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!dot) return undefined

    let frame = 0
    let targetX = -100
    let targetY = -100
    let currentX = targetX
    let currentY = targetY
    let pointerHasMoved = false

    const moveDot = (x, y) => {
      currentX = x
      currentY = y
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
    }

    const placeAtWelcomeAnchor = () => {
      const anchor = welcomeAnchorRef?.current?.getBoundingClientRect()
      targetX = anchor ? anchor.left + (anchor.width - DOT_SIZE) / 2 : (window.innerWidth - DOT_SIZE) / 2
      targetY = anchor ? anchor.top + (anchor.height - DOT_SIZE) / 2 : window.innerHeight * 0.28
      moveDot(targetX, targetY)
    }

    if (welcomeActive) {
      dot.classList.add('is-visible', 'is-welcome')
      dot.classList.remove('is-hidden', 'is-following')
      if (reduceMotion || !pointerQuery.matches) dot.classList.add('is-static-welcome')
      else dot.classList.remove('is-static-welcome')
      placeAtWelcomeAnchor()
    } else {
      dot.classList.remove('is-visible', 'is-welcome', 'is-following', 'is-static-welcome')
      dot.classList.add('is-hidden')
      moveDot(-100, -100)
    }

    if (reduceMotion || !pointerQuery.matches) return undefined

    const follow = () => {
      currentX += (targetX - currentX) * 0.22
      currentY += (targetY - currentY) * 0.22
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      if (Math.abs(targetX - currentX) > 0.35 || Math.abs(targetY - currentY) > 0.35) {
        frame = window.requestAnimationFrame(follow)
      } else {
        frame = 0
      }
    }

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      pointerHasMoved = true
      targetX = event.clientX - DOT_SIZE / 2
      targetY = event.clientY - DOT_SIZE / 2
      dot.classList.add('is-visible', 'is-following')
      dot.classList.remove('is-hidden')
      if (!frame) frame = window.requestAnimationFrame(follow)
    }

    const onResize = () => {
      if (welcomeActive && !pointerHasMoved) placeAtWelcomeAnchor()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      window.cancelAnimationFrame(frame)
    }
  }, [reduceMotion, welcomeActive, welcomeAnchorRef])

  return (
    <span className={`cursor-dot${welcomeActive ? ' is-welcome is-visible' : ' is-hidden'}`} ref={dotRef} aria-hidden="true" />
  )
}

export default CursorRobot
