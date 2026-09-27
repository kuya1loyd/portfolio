import { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext(null)

const getInitialTheme = () => {
  try {
    return window.localStorage.getItem('theme') === 'dark'
  } catch {
    return false
  }
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    root.style.colorScheme = isDark ? 'dark' : 'light'

    try {
      window.localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // The selected theme still applies for this session if storage is unavailable.
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((current) => !current)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
