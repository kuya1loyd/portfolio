'use client'

import { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

function applyClasses(lightVal) {
  const root = document.documentElement
  // Permanent High-Contrast mode for optimal readability and crisp visuals
  root.classList.add('high-contrast')

  if (lightVal) {
    root.classList.add('light')
    root.classList.remove('dark')
  } else {
    root.classList.add('dark')
    root.classList.remove('light')
  }
}

export default function ThemeControls({ className = '', iconOnly = false }) {
  const [isLight, setIsLight] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme-mode')
    const initialLight = savedTheme ? savedTheme === 'light' : true

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(initialLight)
    applyClasses(initialLight)

    const syncListener = (e) => {
      if (e.detail && typeof e.detail.isLight === 'boolean') {
        setIsLight(e.detail.isLight)
      }
    }
    window.addEventListener('portfolio-theme-sync', syncListener)
    return () => window.removeEventListener('portfolio-theme-sync', syncListener)
  }, [])

  const toggleLightMode = () => {
    const nextLight = !isLight
    setIsLight(nextLight)
    localStorage.setItem('portfolio-theme-mode', nextLight ? 'light' : 'dark')
    applyClasses(nextLight)
    window.dispatchEvent(
      new CustomEvent('portfolio-theme-sync', {
        detail: { isLight: nextLight }
      })
    )
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleLightMode}
        aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 cursor-pointer ${className}`}
      >
        {isLight ? (
          <FiSun className="w-4 h-4 text-amber-500" />
        ) : (
          <FiMoon className="w-4 h-4 text-cyan-400" />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleLightMode}
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className={`theme-controls-pill inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-200 select-none cursor-pointer ${
        isLight
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 shadow-xs'
          : 'bg-[#181920] hover:bg-[#22242d] text-white border-white/15 shadow-md'
      } ${className}`}
    >
      {isLight ? (
        <FiSun className="w-4 h-4 text-amber-500 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <FiMoon className="w-4 h-4 text-cyan-400 transition-transform duration-300 hover:-rotate-12" />
      )}
      <span className="text-xs font-semibold tracking-wide">
        {isLight ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  )
}
