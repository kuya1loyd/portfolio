import { useCallback, useRef, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CosmicBackground from './components/layout/CosmicBackground'
import CursorRobot from './components/layout/CursorRobot'
import WelcomeLanding from './components/layout/WelcomeLanding'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import './styles/App.css'

function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true)
  const welcomeRobotAnchorRef = useRef(null)
  const exitWelcome = useCallback(() => setIsWelcomeVisible(false), [])

  return (
    <ThemeProvider>
      <div className="app-shell">
        <CosmicBackground />
        <CursorRobot welcomeActive={isWelcomeVisible} welcomeAnchorRef={welcomeRobotAnchorRef} />
        <WelcomeLanding onExit={exitWelcome} robotAnchorRef={welcomeRobotAnchorRef} />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
