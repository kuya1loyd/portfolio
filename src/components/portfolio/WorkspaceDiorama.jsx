'use client'

import { useRef, useEffect } from 'react'

export default function WorkspaceDiorama() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Guarantee the video never stops playing
    const ensurePlay = () => {
      if (video.paused) {
        video.play().catch(() => {})
      }
    }

    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    // Seamless rewind loop before hitting the freeze frame
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.08) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('pause', ensurePlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    document.addEventListener('visibilitychange', ensurePlay)
    window.addEventListener('focus', ensurePlay)

    ensurePlay()

    // 300ms watchdog interval
    const interval = setInterval(ensurePlay, 300)

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('pause', ensurePlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      document.removeEventListener('visibilitychange', ensurePlay)
      window.removeEventListener('focus', ensurePlay)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative w-full max-w-lg mx-auto select-none flex items-center justify-center bg-transparent">
      {/* 
        Zero-Box Seamless Floating Diorama:
        - 4-way elliptical radial feather dissolves all 4 edges (left, right, top, bottom) into 100% transparent white
        - Zero box borders, zero off-white lines, zero rectangular outlines
      */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-video flex items-center justify-center bg-transparent overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 72% at 50% 50%, black 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 72% at 50% 50%, black 50%, transparent 85%)'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          className="w-full h-full object-contain object-center scale-105"
        >
          <source src="/images/video%20workspace.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
