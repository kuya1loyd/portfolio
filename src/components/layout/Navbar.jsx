import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-38% 0px -52% 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      className="site-nav"
      aria-label="Main navigation"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
    >
      <ul className="nav-links">
        {navItems.map((item) => {
          const active = activeSection === item.href.slice(1)
          return (
            <li className="nav-item" key={item.name}>
              <a className={`nav-link${active ? ' is-active' : ''}`} href={item.href} aria-current={active ? 'location' : undefined}>
                {active && (
                  <>
                    <motion.span className="nav-active-marker" layoutId="nav-active-marker" transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }} />
                    <motion.span className="nav-jg-marker" layoutId="nav-jg-marker" transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }} aria-hidden="true">JG</motion.span>
                  </>
                )}
                <span className="nav-link-label">{item.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}

export default Navbar
