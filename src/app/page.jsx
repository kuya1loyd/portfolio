'use client'

import { useState } from 'react'
import Navbar from '../components/portfolio/Navbar'
import Hero from '../components/portfolio/Hero'
import Services from '../components/portfolio/Services'
import Projects from '../components/portfolio/Projects'
import About from '../components/portfolio/About'
import Certificates from '../components/portfolio/Certificates'
import VisitorGuestbook from '../components/portfolio/VisitorGuestbook'
import Contact from '../components/portfolio/Contact'
import Footer from '../components/portfolio/Footer'
import ResumeModal from '../components/portfolio/ResumeModal'
import ClickSparkle from '../components/portfolio/ClickSparkle'
import SoundSystem from '../components/portfolio/SoundSystem'

export default function HomePage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const handleOpenResume = () => {
    setIsResumeOpen(true)
  }

  const handleCloseResume = () => {
    setIsResumeOpen(false)
  }

  return (
    <div className="app-shell relative min-h-screen bg-white dark:bg-[#0b0d12] text-slate-900 dark:text-white font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      {/* Universal Starburst Particle Click Effect */}
      <ClickSparkle />

      {/* Interactive Sound System (Tactile Click SFX & Ambient Cyber Music) */}
      <SoundSystem />

      {/* Compact Floating Sidebar Capsule Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Experience Stream (small left offset so the capsule never covers content) */}
      <div className="md:pl-20 flex flex-col min-h-screen transition-all duration-300">
        <main className="relative z-10 flex-1">
          {/* Hero Section */}
          <Hero onOpenResume={handleOpenResume} />

          {/* What I Do / Services */}
          <Services />

          {/* About / Experience */}
          <About />

          {/* Multi-Device Showcase Projects */}
          <Projects />

          {/* Interactive Certificates Carousel (Opens PDF in New Tab) */}
          <Certificates />

          {/* Interactive Visitor Log & Guestbook (See & Put Who's Visiting) */}
          <VisitorGuestbook />

          {/* Contact / Collaboration */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Curriculum Vitae Modal Lightbox */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </div>
  )
}
