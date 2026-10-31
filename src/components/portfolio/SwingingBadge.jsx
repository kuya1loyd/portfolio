'use client'

import { useEffect, useId, useRef, useState } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const FACE_STYLE = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  background: 'linear-gradient(160deg, #0a1020 0%, #101a36 55%, #0b1226 100%)',
  border: '2px solid #22d3ee'
}

// Helper to build a smooth Catmull-Rom cubic bezier SVG path string from an array of {x, y} points
function buildSmoothPath(points) {
  if (!points.length) return ''
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

// Samples a fixed-length sub-curve anchored at the bottom tip of the strap so both
// straps' printed names always stay side-by-side and move in 100% unison ("sabay") when stretched.
function sampleSubCurveFromBottom(pts, spanLength, numSamples = 8) {
  const n = pts.length
  if (n < 2) return pts

  const dense = []
  const stepsPerSeg = 4
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(n - 1, i + 2)]

    const b1x = p1.x + (p2.x - p0.x) / 6
    const b1y = p1.y + (p2.y - p0.y) / 6
    const b2x = p2.x - (p3.x - p1.x) / 6
    const b2y = p2.y - (p3.y - p1.y) / 6

    for (let s = 0; s < stepsPerSeg; s++) {
      const t = s / stepsPerSeg
      const u = 1 - t
      const c0 = u * u * u
      const c1 = 3 * u * u * t
      const c2 = 3 * u * t * t
      const c3 = t * t * t
      dense.push({
        x: c0 * p1.x + c1 * b1x + c2 * b2x + c3 * p2.x,
        y: c0 * p1.y + c1 * b1y + c2 * b2y + c3 * p2.y
      })
    }
  }
  dense.push(pts[n - 1])

  const m = dense.length
  const cumDist = new Array(m)
  cumDist[m - 1] = 0
  for (let i = m - 2; i >= 0; i--) {
    cumDist[i] =
      cumDist[i + 1] +
      Math.hypot(dense[i + 1].x - dense[i].x, dense[i + 1].y - dense[i].y)
  }

  const totalLen = cumDist[0]
  const effectiveSpan = Math.min(spanLength, Math.max(60, totalLen - 14))

  const result = []
  for (let k = 0; k < numSamples; k++) {
    const targetDist = effectiveSpan * (1 - k / (numSamples - 1))
    let idx = m - 2
    for (let i = m - 2; i >= 0; i--) {
      if (cumDist[i] >= targetDist) {
        idx = i
        break
      }
    }
    const d0 = cumDist[idx + 1]
    const d1 = cumDist[idx]
    const seg = d1 - d0 || 1
    const frac = clamp((targetDist - d0) / seg, 0, 1)
    result.push({
      x: dense[idx + 1].x + (dense[idx].x - dense[idx + 1].x) * frac,
      y: dense[idx + 1].y + (dense[idx].y - dense[idx + 1].y) * frac
    })
  }
  return result
}

/**
 * Interactive 3D FSUU School Lanyard & ID Badge with real rope/pendulum physics.
 * - Uses unique instance IDs (`useId`) so `<textPath>` and gradients always bind to
 *   the active visible SVG instance and move 1:1 with the bending/stretching straps.
 */
export default function SwingingBadge({ className = '', lanyardHeight = 250 }) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

  const [flipped, setFlipped] = useState(false)
  const flippedRef = useRef(false)

  const stageRef = useRef(null)
  const cardWrapperRef = useRef(null)
  const cardInnerRef = useRef(null)
  const clipGroupRef = useRef(null)

  // Left strap SVG refs
  const leftShadowRef = useRef(null)
  const leftEdgeRef = useRef(null)
  const leftMainRef = useRef(null)
  const leftRibRef = useRef(null)
  const leftMainTextCurveRef = useRef(null)
  const leftUpperSubCurveRef = useRef(null)
  const leftLowerSubCurveRef = useRef(null)

  // Right strap SVG refs
  const rightShadowRef = useRef(null)
  const rightEdgeRef = useRef(null)
  const rightMainRef = useRef(null)
  const rightRibRef = useRef(null)
  const rightTextCurveRef = useRef(null)

  const physicsRef = useRef(null)
  const dragStateRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    targetX: 0,
    targetY: 0,
    moved: false
  })

  useEffect(() => {
    const N = 8
    const segLen = lanyardHeight / (N - 1)

    // Initialize vertical rope nodes completely at rest (x = 0)
    const nodes = Array.from({ length: N }, (_, i) => ({
      x: 0,
      y: i * segLen,
      ox: 0,
      oy: i * segLen,
      mass: i === 0 ? 0 : i === N - 1 ? 6.5 : 0.85
    }))

    const state = {
      nodes,
      segLen,
      theta: 0,
      omega: 0,
      flipAngle: 0,
      flipVel: 0
    }
    physicsRef.current = state

    let rafId = null
    let lastTime = performance.now()

    const step = (now) => {
      const dt = Math.min(0.025, Math.max(0.004, (now - lastTime) / 1000))
      lastTime = now

      const { nodes: pts, segLen: L } = state
      const prevTipVx = pts[N - 1].x - pts[N - 1].ox
      const isDragging = dragStateRef.current.active

      const targetFlip = flippedRef.current ? 180 : 0
      const tipNode = pts[N - 1]
      const isAtRest =
        !isDragging &&
        Math.abs(tipNode.x) < 0.15 &&
        Math.abs(tipNode.x - tipNode.ox) < 0.02 &&
        Math.abs(tipNode.y - lanyardHeight) < 0.25 &&
        Math.abs(tipNode.y - tipNode.oy) < 0.02 &&
        Math.abs(state.theta) < 0.002 &&
        Math.abs(state.omega) < 0.01 &&
        Math.abs(state.flipAngle - targetFlip) < 0.1 &&
        Math.abs(state.flipVel) < 0.1

      if (!isAtRest) {
        const gravity = 1550
        const damping = isDragging ? 0.86 : 0.94

        for (let i = 1; i < N; i++) {
          const p = pts[i]
          const vx = (p.x - p.ox) * damping
          const vy = (p.y - p.oy) * damping
          p.ox = p.x
          p.oy = p.y
          p.x += vx
          p.y += vy + gravity * dt * dt
        }

        if (isDragging) {
          const tip = pts[N - 1]
          tip.x += (dragStateRef.current.targetX - tip.x) * 0.82
          tip.y += (dragStateRef.current.targetY - tip.y) * 0.82
        }

        const iterations = isDragging ? 10 : 12
        const springStiffness = isDragging ? 0.45 : 0.88

        for (let iter = 0; iter < iterations; iter++) {
          pts[0].x = 0
          pts[0].y = 0

          for (let i = 0; i < N - 1; i++) {
            const a = pts[i]
            const b = pts[i + 1]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.hypot(dx, dy) || 0.0001
            const diff = ((dist - L) / dist) * springStiffness

            const invA = a.mass === 0 ? 0 : 1 / a.mass
            const invB = isDragging && i === N - 2 ? 0 : b.mass === 0 ? 0 : 1 / b.mass
            const totalInv = invA + invB || 1

            const wA = invA / totalInv
            const wB = invB / totalInv

            a.x += dx * diff * wA
            a.y += dy * diff * wA
            b.x -= dx * diff * wB
            b.y -= dy * diff * wB
          }

          for (let i = 1; i < N - 1; i++) {
            const prev = pts[i - 1]
            const curr = pts[i]
            const next = pts[i + 1]
            const midX = (prev.x + next.x) * 0.5
            const midY = (prev.y + next.y) * 0.5
            curr.x += (midX - curr.x) * (isDragging ? 0.35 : 0.1)
            if (isDragging) {
              curr.y += (midY - curr.y) * 0.35
            }
          }
        }

        const tip = pts[N - 1]
        const prevNode = pts[N - 2]
        const tipVxStep = tip.x - tip.ox
        const tipDeltaVx = tipVxStep - prevTipVx
        const ropeAngle = Math.atan2(tip.x - prevNode.x, tip.y - prevNode.y)

        const angularAcc =
          -26 * Math.sin(state.theta - ropeAngle * 0.6) -
          clamp(tipDeltaVx * 1.8, -14, 14) -
          state.omega * 4.5
        state.omega += angularAcc * dt
        state.theta = clamp(state.theta + state.omega * dt, -0.75, 0.75)

        if (
          !isDragging &&
          Math.abs(state.theta) < 0.003 &&
          Math.abs(state.omega) < 0.015 &&
          Math.abs(tip.x) < 0.3
        ) {
          for (let i = 0; i < N; i++) {
            pts[i].x = 0
            pts[i].ox = 0
            pts[i].y = i * L
            pts[i].oy = i * L
          }
          state.theta = 0
          state.omega = 0
        }

        const flipForce = (targetFlip - state.flipAngle) * 75 - state.flipVel * 11
        state.flipVel += flipForce * dt
        state.flipAngle += state.flipVel * dt
      }

      // Compute two-strap V-loop geometry from spine points
      const tip = pts[N - 1]
      const prevNode = pts[N - 2]
      const tipVxStep = tip.x - tip.ox
      const ropeAngle = Math.atan2(tip.x - prevNode.x, tip.y - prevNode.y)
      const cx = 180
      const ptsSvg = pts.map((p) => ({ x: cx + p.x, y: p.y }))

      const totalDist = Math.hypot(tip.x, tip.y)
      const stretchRatio = clamp(totalDist / lanyardHeight, 1, 2.5)
      const tensionScale = 1 / Math.pow(stretchRatio, 0.18)

      const leftPts = []
      const leftMainTextPts = []
      const leftUpperSubPts = []
      const leftLowerSubPts = []
      const rightPts = []
      const rightTextPts = []

      for (let i = 0; i < N; i++) {
        const t = i / (N - 1)
        const pPrev = ptsSvg[Math.max(0, i - 1)]
        const pNext = ptsSvg[Math.min(N - 1, i + 1)]
        const dx = pNext.x - pPrev.x
        const dy = pNext.y - pPrev.y
        const len = Math.hypot(dx, dy) || 1
        // Normal vector pointing right (+x when vertical)
        const nx = dy / len
        const ny = -dx / len

        // Keep both 22px straps clearly separated (spread = 16.5px -> 14.5px, leaving a clear gap
        // between the two straps just like the photo) through the text region, then converge into the rivet
        let spread
        if (t < 0.14) {
          spread = 7.5 + (t / 0.14) * 9.0
        } else if (t <= 0.78) {
          spread = 16.5 - ((t - 0.14) / 0.64) * 2.0
        } else {
          const u = (t - 0.78) / 0.22
          spread = 14.5 * (1 - u * u * (3 - 2 * u))
        }
        spread *= tensionScale

        // Left strap visual center
        const lx = ptsSvg[i].x - nx * spread
        const ly = ptsSvg[i].y - ny * spread
        leftPts.push({ x: lx, y: ly })

        // Optical cap-height centering for top-to-bottom uppercase text on Left Strap
        const leftMainShift = -2.4 * tensionScale
        leftMainTextPts.push({
          x: lx + nx * leftMainShift,
          y: ly + ny * leftMainShift
        })

        // Two parallel stacked lines inside the left strap ("FATHER SATURNINO" / "URIOS UNIVERSITY")
        const upperShift = 2.1 * tensionScale
        const lowerShift = -5.4 * tensionScale
        leftUpperSubPts.push({
          x: lx + nx * upperShift,
          y: ly + ny * upperShift
        })
        leftLowerSubPts.push({
          x: lx + nx * lowerShift,
          y: ly + ny * lowerShift
        })

        // Right strap visual center
        const rx = ptsSvg[i].x + nx * spread
        const ry = ptsSvg[i].y + ny * spread
        rightPts.push({ x: rx, y: ry })

        // Optical cap-height centering for bottom-to-top uppercase text on Right Strap
        const rightTextShift = 2.2 * tensionScale
        rightTextPts.push({
          x: rx + nx * rightTextShift,
          y: ry + ny * rightTextShift
        })
      }

      const leftD = buildSmoothPath(leftPts)
      const rightD = buildSmoothPath(rightPts)

      // Anchor BOTH straps' text sub-curves to the exact same 195px segment from the bottom
      // tip so "FSUU 1901 | FATHER SATURNINO URIOS UNIVERSITY" and "LUCEAT LUX VESTRA"
      // always stay side-by-side and move in 100% unison ("sabay") when stretched.
      const TEXT_SPAN_FROM_BOTTOM = 195
      const leftMainTextD = buildSmoothPath(
        sampleSubCurveFromBottom(leftMainTextPts, TEXT_SPAN_FROM_BOTTOM, 8)
      )
      const leftUpperSubD = buildSmoothPath(
        sampleSubCurveFromBottom(leftUpperSubPts, TEXT_SPAN_FROM_BOTTOM, 8)
      )
      const leftLowerSubD = buildSmoothPath(
        sampleSubCurveFromBottom(leftLowerSubPts, TEXT_SPAN_FROM_BOTTOM, 8)
      )
      // Reversed right-strap sub-curve so "LUCEAT LUX VESTRA" reads bottom-to-top facing inward
      const rightRevD = buildSmoothPath(
        [...sampleSubCurveFromBottom(rightTextPts, TEXT_SPAN_FROM_BOTTOM, 8)].reverse()
      )

      const strapW = (22 * tensionScale).toFixed(2)
      const edgeW = (23.6 * tensionScale).toFixed(2)
      const shadowW = (25 * tensionScale).toFixed(2)
      const ribW = (19.5 * tensionScale).toFixed(2)

      if (leftShadowRef.current) {
        leftShadowRef.current.setAttribute('d', leftD)
        leftShadowRef.current.setAttribute('stroke-width', shadowW)
      }
      if (leftEdgeRef.current) {
        leftEdgeRef.current.setAttribute('d', leftD)
        leftEdgeRef.current.setAttribute('stroke-width', edgeW)
      }
      if (leftMainRef.current) {
        leftMainRef.current.setAttribute('d', leftD)
        leftMainRef.current.setAttribute('stroke-width', strapW)
      }
      if (leftRibRef.current) {
        leftRibRef.current.setAttribute('d', leftD)
        leftRibRef.current.setAttribute('stroke-width', ribW)
      }
      if (leftMainTextCurveRef.current) {
        leftMainTextCurveRef.current.setAttribute('d', leftMainTextD)
      }
      if (leftUpperSubCurveRef.current) {
        leftUpperSubCurveRef.current.setAttribute('d', leftUpperSubD)
      }
      if (leftLowerSubCurveRef.current) {
        leftLowerSubCurveRef.current.setAttribute('d', leftLowerSubD)
      }

      if (rightShadowRef.current) {
        rightShadowRef.current.setAttribute('d', rightD)
        rightShadowRef.current.setAttribute('stroke-width', shadowW)
      }
      if (rightEdgeRef.current) {
        rightEdgeRef.current.setAttribute('d', rightD)
        rightEdgeRef.current.setAttribute('stroke-width', edgeW)
      }
      if (rightMainRef.current) {
        rightMainRef.current.setAttribute('d', rightD)
        rightMainRef.current.setAttribute('stroke-width', strapW)
      }
      if (rightRibRef.current) {
        rightRibRef.current.setAttribute('d', rightD)
        rightRibRef.current.setAttribute('stroke-width', ribW)
      }
      if (rightTextCurveRef.current) {
        rightTextCurveRef.current.setAttribute('d', rightRevD)
      }

      // Position & orient the bottom rivet + black side-release buckle + lower blue loop
      const clipDeg = (-ropeAngle * 180) / Math.PI
      if (clipGroupRef.current) {
        clipGroupRef.current.setAttribute(
          'transform',
          `translate(${ptsSvg[N - 1].x.toFixed(2)}, ${ptsSvg[N - 1].y.toFixed(2)}) rotate(${(clipDeg * 0.72).toFixed(2)})`
        )
      }

      // Position & orient the 3D ID card attached below the lower blue strap loop & clasp
      if (cardWrapperRef.current && cardInnerRef.current) {
        const cardDeg = (-state.theta * 180) / Math.PI - 4.5
        const tipVxPerSec = tipVxStep / dt
        const tiltY = clamp(tipVxPerSec * 0.04, -18, 18)
        const tiltX = clamp((tip.y - lanyardHeight) * -0.1, -14, 14)

        cardWrapperRef.current.style.transform = `translate3d(${tip.x.toFixed(2)}px, ${(tip.y + 42).toFixed(2)}px, 0) rotateZ(${cardDeg.toFixed(2)}deg)`
        cardInnerRef.current.style.transform = `perspective(950px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${(state.flipAngle + tiltY).toFixed(2)}deg)`
      }

      rafId = requestAnimationFrame(step)
    }

    let lastScrollY = window.scrollY
    const handleScrollSwing = () => {
      const currY = window.scrollY
      const dy = currY - lastScrollY
      lastScrollY = currY
      if (!dragStateRef.current.active && Math.abs(dy) > 0.5) {
        const tip = state.nodes[N - 1]
        tip.ox += clamp(dy * 0.06, -2.8, 2.8)
        state.omega += clamp(dy * 0.0035, -0.22, 0.22)
      }
    }
    window.addEventListener('scroll', handleScrollSwing, { passive: true })

    rafId = requestAnimationFrame(step)
    return () => {
      window.removeEventListener('scroll', handleScrollSwing)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [lanyardHeight])

  const handlePointerDown = (e) => {
    const state = physicsRef.current
    if (!state || !stageRef.current) return

    e.currentTarget.setPointerCapture?.(e.pointerId)
    const rect = stageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const topY = rect.top
    const tip = state.nodes[state.nodes.length - 1]

    const pointerRelX = e.clientX - centerX
    const pointerRelY = e.clientY - topY

    dragStateRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: pointerRelX - tip.x,
      offsetY: pointerRelY - tip.y,
      targetX: tip.x,
      targetY: tip.y,
      moved: false
    }
  }

  const handlePointerMoveDrag = (e) => {
    if (!dragStateRef.current.active || !stageRef.current) return

    const dx = e.clientX - dragStateRef.current.startX
    const dy = e.clientY - dragStateRef.current.startY
    if (Math.hypot(dx, dy) > 6) {
      dragStateRef.current.moved = true
    }

    const rect = stageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const topY = rect.top

    const desiredX = e.clientX - centerX - dragStateRef.current.offsetX
    const desiredY = e.clientY - topY - dragStateRef.current.offsetY

    dragStateRef.current.targetX = clamp(desiredX, -520, 520)
    dragStateRef.current.targetY = clamp(desiredY, 20, lanyardHeight + 650)
  }

  const handlePointerUp = (e) => {
    if (!dragStateRef.current.active) return
    const wasClick = !dragStateRef.current.moved
    dragStateRef.current.active = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)

    if (wasClick) {
      const next = !flippedRef.current
      flippedRef.current = next
      setFlipped(next)

      const state = physicsRef.current
      if (state) {
        const tip = state.nodes[state.nodes.length - 1]
        tip.ox -= next ? 6 : -6
        state.omega += next ? -0.9 : 0.9
      }
    }
  }

  const svgHeight = lanyardHeight + 125

  // Per-instance unique SVG element IDs so mobile & desktop instances never collide
  const leftStrapGradId = `fsuuLeftStrapGrad-${uid}`
  const rightStrapGradId = `fsuuRightStrapGrad-${uid}`
  const blackBuckleGradId = `blackBuckleGrad-${uid}`
  const silverRivetGradId = `silverRivetGrad-${uid}`
  const leftMainCurveId = `fsuuLeftMainCurve-${uid}`
  const leftUpperSubCurveId = `fsuuLeftUpperSubCurve-${uid}`
  const leftLowerSubCurveId = `fsuuLeftLowerSubCurve-${uid}`
  const rightTextCurveId = `fsuuRightTextCurve-${uid}`

  return (
    <div
      ref={stageRef}
      aria-label="Interactive swinging FSUU ID badge of John Lloyd Galito"
      className={`relative select-none pointer-events-none flex flex-col items-center max-w-full ${className}`}
      style={{ width: 340, minHeight: lanyardHeight + 390 }}
    >
      {/* ===== Authentic Two-Strap FSUU 1901 School Lanyard SVG ===== */}
      <svg
        width="360"
        height={svgHeight}
        viewBox={`0 0 360 ${svgHeight}`}
        className="overflow-visible pointer-events-none z-20"
        shapeRendering="geometricPrecision"
      >
        <defs>
          {/* Left Royal Blue Woven Strap Gradient */}
          <linearGradient id={leftStrapGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0b46b5" />
            <stop offset="25%" stopColor="#125ce0" />
            <stop offset="55%" stopColor="#1b6ef3" />
            <stop offset="85%" stopColor="#125ce0" />
            <stop offset="100%" stopColor="#093b9c" />
          </linearGradient>

          {/* Right Royal Blue Woven Strap Gradient */}
          <linearGradient id={rightStrapGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a3ea3" />
            <stop offset="20%" stopColor="#1563ea" />
            <stop offset="50%" stopColor="#2176ff" />
            <stop offset="80%" stopColor="#1563ea" />
            <stop offset="100%" stopColor="#0b46b5" />
          </linearGradient>

          {/* Matte-Black Contoured Plastic Buckle Gradient */}
          <linearGradient id={blackBuckleGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#181b20" />
            <stop offset="28%" stopColor="#2b3038" />
            <stop offset="50%" stopColor="#1f242b" />
            <stop offset="78%" stopColor="#12151a" />
            <stop offset="100%" stopColor="#090b0e" />
          </linearGradient>

          {/* Shiny Silver Rivet Gradient */}
          <radialGradient id={silverRivetGradId} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="80%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          {/* Dynamic Text Curves for Left & Right Straps */}
          <path
            id={leftMainCurveId}
            ref={leftMainTextCurveRef}
            d={`M 165 0 L 180 ${lanyardHeight}`}
          />
          <path
            id={leftUpperSubCurveId}
            ref={leftUpperSubCurveRef}
            d={`M 169 0 L 180 ${lanyardHeight}`}
          />
          <path
            id={leftLowerSubCurveId}
            ref={leftLowerSubCurveRef}
            d={`M 161 0 L 180 ${lanyardHeight}`}
          />
          <path
            id={rightTextCurveId}
            ref={rightTextCurveRef}
            d={`M 180 ${lanyardHeight} L 195 0`}
          />
        </defs>

        {/* Top Black Breakaway Neck Loop Connector */}
        <g transform="translate(180, 4)">
          <path
            d="M -15 6 C -15 -6, 15 -6, 15 6 L 10 14 C 10 4, -10 4, -10 14 Z"
            fill="#14171d"
            stroke="#090b0e"
            strokeWidth="1.2"
          />
        </g>

        {/* ============================================================ */}
        {/* 1. LEFT STRAP ("FSUU 1901 | FATHER SATURNINO / URIOS UNIV.") */}
        {/* ============================================================ */}
        <path
          ref={leftShadowRef}
          d={`M 165 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke="rgba(2, 6, 23, 0.42)"
          strokeWidth="25"
          strokeLinecap="round"
          style={{ filter: 'blur(4px)' }}
        />
        <path
          ref={leftEdgeRef}
          d={`M 165 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke="#083080"
          strokeWidth="23.6"
          strokeLinecap="butt"
        />
        <path
          ref={leftMainRef}
          d={`M 165 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke={`url(#${leftStrapGradId})`}
          strokeWidth="22"
          strokeLinecap="butt"
          pointerEvents="stroke"
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMoveDrag}
          onPointerUp={handlePointerUp}
        />
        {/* Subtle woven nylon ribbing texture on left strap */}
        <path
          ref={leftRibRef}
          d={`M 165 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="19.5"
          strokeDasharray="1.2 1.8"
          strokeLinecap="butt"
        />

        {/* Left Strap Main Header: "FSUU" (white) + "1901" (yellow) */}
        <text
          fill="#ffffff"
          fontSize="14"
          fontWeight="900"
          fontFamily="'Arial Narrow', 'Roboto Condensed', 'Inter', sans-serif"
          dominantBaseline="central"
          style={{ textShadow: '0 1px 2px rgba(5, 20, 65, 0.65)' }}
        >
          <textPath
            href={`#${leftMainCurveId}`}
            startOffset="0"
            textLength="64"
            lengthAdjust="spacingAndGlyphs"
          >
            FSUU{' '}
            <tspan fill="#facc15" fontSize="13.5" fontWeight="900">
              1901
            </tspan>
            <tspan fill="#facc15" fontSize="12.5" fontWeight="900">
              |
            </tspan>
          </textPath>
        </text>

        {/* Left Strap Stacked Line 1: "FATHER SATURNINO" */}
        <text
          fill="#ffffff"
          fontSize="6.4"
          fontWeight="800"
          fontFamily="'Arial Narrow', 'Inter', sans-serif"
          dominantBaseline="central"
        >
          <textPath
            href={`#${leftUpperSubCurveId}`}
            startOffset="69"
            textLength="78"
            lengthAdjust="spacingAndGlyphs"
          >
            FATHER SATURNINO
          </textPath>
        </text>

        {/* Left Strap Stacked Line 2: "URIOS UNIVERSITY" */}
        <text
          fill="#ffffff"
          fontSize="6.4"
          fontWeight="800"
          fontFamily="'Arial Narrow', 'Inter', sans-serif"
          dominantBaseline="central"
        >
          <textPath
            href={`#${leftLowerSubCurveId}`}
            startOffset="69"
            textLength="78"
            lengthAdjust="spacingAndGlyphs"
          >
            URIOS UNIVERSITY
          </textPath>
        </text>

        {/* ============================================================ */}
        {/* 2. RIGHT STRAP ("LUCEAT LUX VESTRA" reading bottom-to-top)   */}
        {/* ============================================================ */}
        <path
          ref={rightShadowRef}
          d={`M 195 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke="rgba(2, 6, 23, 0.45)"
          strokeWidth="25"
          strokeLinecap="round"
          style={{ filter: 'blur(3.5px)' }}
        />
        <path
          ref={rightEdgeRef}
          d={`M 195 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke="#083080"
          strokeWidth="23.6"
          strokeLinecap="butt"
        />
        <path
          ref={rightMainRef}
          d={`M 195 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke={`url(#${rightStrapGradId})`}
          strokeWidth="22"
          strokeLinecap="butt"
          pointerEvents="stroke"
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMoveDrag}
          onPointerUp={handlePointerUp}
        />
        {/* Subtle woven nylon ribbing texture on right strap */}
        <path
          ref={rightRibRef}
          d={`M 195 0 L 180 ${lanyardHeight}`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="19.5"
          strokeDasharray="1.2 1.8"
          strokeLinecap="butt"
        />

        {/* Right Strap Motto: "LUCEAT LUX VESTRA" reading upward */}
        <text
          fill="#ffffff"
          fontSize="12.5"
          fontWeight="900"
          fontFamily="'Arial Narrow', 'Roboto Condensed', 'Inter', sans-serif"
          dominantBaseline="central"
          style={{ textShadow: '0 1px 2px rgba(5, 20, 65, 0.65)' }}
        >
          <textPath
            href={`#${rightTextCurveId}`}
            startOffset="48"
            textLength="147"
            lengthAdjust="spacingAndGlyphs"
          >
            LUCEAT LUX VESTRA
          </textPath>
        </text>

        {/* ============================================================ */}
        {/* 3. BOTTOM HARDWARE: SILVER RIVETS, BLACK BUCKLE & BLUE TAB   */}
        {/* ============================================================ */}
        <g
          ref={clipGroupRef}
          transform={`translate(180, ${lanyardHeight})`}
          className="pointer-events-auto cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMoveDrag}
          onPointerUp={handlePointerUp}
        >
          {/* Upper Silver Rivet pinning the overlapping blue straps above the buckle */}
          <circle
            cx="0"
            cy="-16"
            r="3.8"
            fill={`url(#${silverRivetGradId})`}
            stroke="#1e293b"
            strokeWidth="0.6"
          />

          {/* Matte-Black Contoured Side-Release Buckle (exact match to photo) */}
          {/* Buckle Top Slot & Ribbed Grip Bar */}
          <rect
            x="-13.5"
            y="-6"
            width="27"
            height="10"
            rx="2.5"
            fill={`url(#${blackBuckleGradId})`}
            stroke="#090b0e"
            strokeWidth="0.9"
          />
          {/* Tiny vertical grip ribs on top of buckle */}
          <line
            x1="-9"
            y1="-2.5"
            x2="9"
            y2="-2.5"
            stroke="#475569"
            strokeWidth="2.8"
            strokeDasharray="1.3 1.5"
          />

          {/* Contoured Side-Release Squeeze Prongs (dark charcoal) */}
          <path
            d="M -13.5 3 C -15.5 7, -15.5 13, -12.5 17 L -12.5 23 L 12.5 23 L 12.5 17 C 15.5 13, 15.5 7, 13.5 3 Z"
            fill="#14171c"
            stroke="#090b0e"
            strokeWidth="0.8"
          />

          {/* Contoured Buckle Center Body with curved side cutouts */}
          <path
            d="M -13.5 2 L 13.5 2 L 13.5 6 C 10.5 9, 10.5 15, 13.5 19 L 13.5 26 C 13.5 27.5, 12 28.5, 10 28.5 L -10 28.5 C -12 28.5, -13.5 27.5, -13.5 26 L -13.5 19 C -10.5 15, -10.5 9, -13.5 6 Z"
            fill={`url(#${blackBuckleGradId})`}
            stroke="#090b0e"
            strokeWidth="0.9"
          />

          {/* Lower Royal-Blue Woven Strap Loop below the black buckle */}
          <rect
            x="-10.5"
            y="27"
            width="21"
            height="19"
            rx="2.5"
            fill={`url(#${rightStrapGradId})`}
            stroke="#083080"
            strokeWidth="1"
          />
          {/* Horizontal stitch line across lower blue loop */}
          <line
            x1="-9"
            y1="30"
            x2="9"
            y2="30"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.9"
            strokeDasharray="1.5 1.5"
          />

          {/* Second Silver Rivet on the lower blue strap tab */}
          <circle
            cx="0"
            cy="37"
            r="3.6"
            fill={`url(#${silverRivetGradId})`}
            stroke="#1e293b"
            strokeWidth="0.6"
          />

          {/* Dark metallic D-ring & clasp hooking into the ID card slot */}
          <path
            d="M -11 43 C -13 46, -11 50, -6 50 L 6 50 C 11 50, 13 46, 11 43"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle
            cx="0"
            cy="51"
            r="5.5"
            fill="none"
            stroke="#64748b"
            strokeWidth="2.4"
          />
        </g>
      </svg>

      {/* ===== 3D Swinging & Flippable ID Card ===== */}
      <div
        ref={cardWrapperRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: -125,
          width: 250,
          transformOrigin: 'top center',
          willChange: 'transform'
        }}
        className="z-10 pointer-events-none"
      >
        <div
          ref={cardInnerRef}
          role="button"
          tabIndex={0}
          aria-label={
            flipped
              ? 'ID back side. Click to flip to the front'
              : 'ID front side. Click to flip to the back'
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMoveDrag}
          onPointerUp={handlePointerUp}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              const next = !flippedRef.current
              flippedRef.current = next
              setFlipped(next)
            }
          }}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            boxShadow:
              '0 25px 50px -12px rgba(2,132,199,0.45), 0 0 28px rgba(34,211,238,0.28)',
            borderRadius: '1.6rem',
            touchAction: 'none',
            willChange: 'transform'
          }}
          className="relative w-[225px] sm:w-[250px] mx-auto outline-none pointer-events-auto cursor-grab active:cursor-grabbing"
        >
          {/* ---------------- FRONT ---------------- */}
          <div
            className="relative w-full rounded-[1.6rem] p-3.5 sm:p-4 overflow-hidden"
            style={FACE_STYLE}
          >
            {/* Card Lanyard Slot */}
            <div
              className="mx-auto mb-2.5 h-2 w-12 rounded-full"
              style={{
                background: '#050811',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.16)'
              }}
            />

            {/* Header tag */}
            <div
              className="mb-2.5 flex items-center justify-between font-mono font-bold uppercase"
              style={{ fontSize: 10, letterSpacing: '0.18em', color: '#67e8f9' }}
            >
              <span style={{ color: '#67e8f9' }}>Full-Stack Dev</span>
              <span className="inline-flex items-center gap-1" style={{ color: '#4ade80' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                ACTIVE
              </span>
            </div>

            {/* Photo */}
            <div
              className="relative aspect-[4/4.4] w-full overflow-hidden rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)' }}
            >
              <img
                src="/images/profile.jpg?v=real"
                alt="John Lloyd Galito"
                draggable={false}
                className="h-full w-full object-cover object-[center_20%] pointer-events-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
            </div>

            {/* Name block */}
            <div className="mt-3 pb-1">
              <div
                className="font-sans font-black uppercase leading-[0.95]"
                style={{ fontSize: 27, letterSpacing: '-0.01em', color: '#ffffff' }}
              >
                John Lloyd
              </div>
              <div
                className="font-sans font-black uppercase leading-[0.95]"
                style={{ fontSize: 27, letterSpacing: '-0.01em', color: '#22d3ee' }}
              >
                Galito
              </div>
              <div
                className="mt-1.5 font-mono font-semibold"
                style={{ fontSize: 11.5, letterSpacing: '0.05em', color: '#f1f5f9' }}
              >
                AI-Assisted Full-Stack Developer
              </div>
            </div>

            {/* Glossy sheen */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)'
              }}
            />
          </div>

          {/* ---------------- BACK ---------------- */}
          <div
            className="absolute inset-0 rounded-[1.6rem] overflow-hidden flex flex-col"
            style={{ ...FACE_STYLE, transform: 'rotateY(180deg)' }}
          >
            {/* Slot */}
            <div
              className="mx-auto mt-3.5 h-2 w-12 rounded-full"
              style={{
                background: '#050811',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.16)'
              }}
            />

            {/* Magnetic stripe */}
            <div
              className="mt-3 w-full"
              style={{
                height: 28,
                background: 'linear-gradient(180deg, #02040a 0%, #0b1020 100%)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            />

            <div className="flex flex-1 flex-col justify-between px-4 pb-3.5 pt-3">
              {/* Return notice */}
              <div>
                <div
                  className="font-mono font-bold uppercase"
                  style={{ fontSize: 9.5, letterSpacing: '0.16em', color: '#67e8f9' }}
                >
                  If found, please return to
                </div>
                <div
                  className="mt-1 font-sans font-extrabold uppercase"
                  style={{ fontSize: 16, lineHeight: 1.15, color: '#ffffff' }}
                >
                  John Lloyd Galito
                </div>
                <div
                  className="mt-1 font-mono font-medium"
                  style={{ fontSize: 10.5, lineHeight: 1.45, color: '#f1f5f9' }}
                >
                  Butuan City, Philippines
                  <br />
                  galitojohnlloyd@gmail.com
                </div>
              </div>

              {/* Stack chips */}
              <div>
                <div
                  className="mb-1.5 font-mono font-bold uppercase"
                  style={{ fontSize: 9.5, letterSpacing: '0.16em', color: '#67e8f9' }}
                >
                  Tech stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Next.js', 'Node.js', 'Flutter', 'PostgreSQL', 'Tailwind'].map(
                    (t) => (
                      <span
                        key={t}
                        className="font-mono font-semibold"
                        style={{
                          fontSize: 10,
                          padding: '2.5px 7px',
                          borderRadius: 6,
                          color: '#ffffff',
                          background: 'rgba(34,211,238,0.16)',
                          border: '1px solid rgba(34,211,238,0.45)'
                        }}
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Find me */}
              <div>
                <div
                  className="mb-1 font-mono font-bold uppercase"
                  style={{ fontSize: 9.5, letterSpacing: '0.16em', color: '#67e8f9' }}
                >
                  Find me
                </div>
                <div
                  className="font-mono font-medium"
                  style={{ fontSize: 10, lineHeight: 1.5, color: '#f1f5f9' }}
                >
                  github.com/kuya1loyd
                  <br />
                  instagram.com/john_lloyd_galito
                  <br />
                  facebook.com/johnlloyd.galito.33
                </div>
              </div>

              {/* Signature */}
              <div>
                <div
                  className="flex items-center justify-center rounded-md"
                  style={{
                    height: 34,
                    background: '#f8fafc',
                    backgroundImage:
                      'repeating-linear-gradient(135deg, rgba(148,163,184,0.18) 0 6px, transparent 6px 12px)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                      fontStyle: 'italic',
                      fontSize: 21,
                      color: '#0f172a',
                      fontWeight: 700
                    }}
                  >
                    John Lloyd Galito
                  </span>
                </div>
                <div
                  className="mt-1 text-center font-mono uppercase font-semibold"
                  style={{ fontSize: 8.5, letterSpacing: '0.12em', color: '#cbd5e1' }}
                >
                  Cardholder&apos;s signature · Valid 2026
                </div>
              </div>
            </div>

            {/* Glossy sheen */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 35%)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
