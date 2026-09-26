import { ThemeProvider } from './context/ThemeContext'
import { GameProvider } from './context/GameContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Achievements from './components/gamification/Achievements'
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
  return (
    <ThemeProvider>
      <GameProvider>
        <div className="app-shell">
          <CosmicBackground />
          <CursorRobot />
          <WelcomeLanding />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <Achievements />
        </div>
      </GameProvider>
    </ThemeProvider>
  )
}

export default App
