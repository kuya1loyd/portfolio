'use client'

import { useState } from 'react'
import Navbar from '../components/portfolio/Navbar'
import Hero from '../components/portfolio/Hero'
import Services from '../components/portfolio/Services'
import Projects from '../components/portfolio/Projects'
import About from '../components/portfolio/About'
import Certificates from '../components/portfolio/Certificates'
import Contact from '../components/portfolio/Contact'
import Footer from '../components/portfolio/Footer'
import ResumeModal from '../components/portfolio/ResumeModal'
import CyberBackground from '../components/portfolio/CyberBackground'

export default function HomePage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const handleOpenResume = () => {
    setIsResumeOpen(true)
  }

  const handleCloseResume = () => {
    setIsResumeOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Animated Cybersecurity Matrix, Telemetry & Scanline Background */}
      <CyberBackground />

      {/* Top Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        {/* Hero Section with Cinematic Eye-Slash Intro & Atmospheric Portrait */}
        <Hero onOpenResume={handleOpenResume} />

        {/* What I Do / Services */}
        <Services />

        {/* About / Experience & 3D Cursor Panimation */}
        <About onOpenResume={handleOpenResume} />

        {/* Selected Works / 3D Flip Projects (6 High-Impact Projects) */}
        <Projects />

        {/* Verified Certificates & Skills with Visible Pictures & Lightbox */}
        <Certificates />

        {/* Contact / Collaboration */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Curriculum Vitae Modal Lightbox */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </div>
  )
}
