'use client'

import { useEffect, useRef } from 'react'

export default function CyberBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initDrops()
    }

    window.addEventListener('resize', handleResize)

    // Interactive mouse tracking
    const mouse = { x: -1000, y: -1000, radius: 100 }
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Elegant, fine-grained hacker & cipher glyphs
    const glyphs = [
      '0', '1', '0', '1', '1', '0', '0', '1',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'A', 'B', 'C', 'D', 'E', 'F',
      'x', '>', '_', '/', '\\', ':', ';', '{', '}', '[', ']',
      'λ', 'π', '∑', '∆', 'Ω', '§', 'µ',
      'ｦ', 'ｱ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾂ', 'ﾃ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾊ', 'ﾋ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ'
    ]

    const fontSize = 12
    const columnSpacing = 22
    let drops = []

    const initDrops = () => {
      const columns = Math.ceil(width / columnSpacing)
      drops = []
      for (let i = 0; i < columns; i++) {
        const length = Math.floor(Math.random() * 16) + 12
        const chars = []
        for (let j = 0; j < length; j++) {
          chars.push(glyphs[Math.floor(Math.random() * glyphs.length)])
        }

        // Randomize initial vertical position across the whole canvas
        drops.push({
          x: i * columnSpacing + 6,
          y: Math.random() * height,
          speed: Math.random() * 1.8 + 1.2,
          length,
          chars,
          changeTimer: 0,
          opacityMultiplier: Math.random() * 0.4 + 0.6,
        })
      }
    }

    initDrops()

    let lastTime = 0
    const fps = 40
    const frameInterval = 1000 / fps

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render)

      const delta = currentTime - lastTime
      if (delta < frameInterval) return
      lastTime = currentTime - (delta % frameInterval)

      // Fully clear canvas every frame to ensure 100% transparency
      ctx.clearRect(0, 0, width, height)

      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        const dx = mouse.x - drop.x
        const dy = mouse.y - drop.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isNearMouse = dist < mouse.radius

        // Character mutation timer (random digital flicker)
        drop.changeTimer++
        if (drop.changeTimer > (isNearMouse ? 2 : 8)) {
          const randIdx = Math.floor(Math.random() * drop.chars.length)
          drop.chars[randIdx] = glyphs[Math.floor(Math.random() * glyphs.length)]
          drop.changeTimer = 0
        }

        // Render drop trail
        for (let j = 0; j < drop.chars.length; j++) {
          const charY = drop.y - j * (fontSize + 3)
          if (charY < -15 || charY > height + 15) continue

          const char = drop.chars[j]

          if (j === 0) {
            // Stream head spark: crisp glowing white/cyan
            ctx.fillStyle = isNearMouse ? '#ffffff' : '#e6ffff'
            ctx.shadowColor = '#00f0ff'
            ctx.shadowBlur = isNearMouse ? 10 : 6
            ctx.fillText(char, drop.x, charY)
            ctx.shadowBlur = 0
          } else {
            // Trailing body characters: elegant fading cyan and emerald matrix
            const progress = (drop.length - j) / drop.length
            const baseAlpha = progress * drop.opacityMultiplier * (isNearMouse ? 0.85 : 0.45)

            if (j % 5 === 0) {
              // Accent hacker emerald
              ctx.fillStyle = `rgba(16, 185, 129, ${baseAlpha})`
            } else {
              // Primary cyber cyan
              ctx.fillStyle = `rgba(0, 240, 255, ${baseAlpha})`
            }

            ctx.fillText(char, drop.x, charY)
          }
        }

        // Advance drop position
        drop.y += drop.speed * (isNearMouse ? 2.0 : 1)

        // Reset drop when past bottom
        if (drop.y - drop.length * (fontSize + 3) > height) {
          drop.y = Math.random() * -80 - 10
          drop.speed = Math.random() * 1.8 + 1.2
          drop.length = Math.floor(Math.random() * 16) + 12
        }
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-black">
      {/* 1. Refined Matrix Code Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Sleek Cyber Coordinate Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.04]" />

      {/* 3. Subtle Cyber Scanline Beam */}
      <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-scanline pointer-events-none" />

      {/* 4. Subtle Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[160px] pointer-events-none" />
    </div>
  )
}
