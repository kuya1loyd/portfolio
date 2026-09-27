import { FaArrowUp, FaEnvelope, FaFacebook, FaGithub } from 'react-icons/fa'
import Reveal from './Reveal'

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'OPM', href: '#music' },
  { name: 'Contact', href: '#contact' },
]

const Footer = () => {
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <Reveal className="section-reveal">
      <footer className="site-footer">
        <div className="section-wrap footer-wrap">
          <div className="footer-inner">
          <div className="footer-about">
            <a className="brand-mark" href="#home">
              <span className="brand-monogram" aria-hidden="true">JG</span>
              <span>John Lloyd</span>
            </a>
            <p className="footer-note">Front-End Developer | React and Laravel specialist | Butuan City, Philippines</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="footer-heading">Explore</h2>
            <div className="footer-links">
              {footerLinks.map((link) => <a href={link.href} key={link.name}>{link.name}</a>)}
            </div>
          </nav>

          <div>
            <h2 className="footer-heading">Find me online</h2>
            <div className="footer-socials">
              <a className="social-icon" href="https://github.com/kuya1loyd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub aria-hidden="true" />
              </a>
              <a className="social-icon" href="https://www.facebook.com/johnlloyd.galito.33" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook aria-hidden="true" />
              </a>
              <a className="social-icon" href="mailto:galitojohnlloyd29@gmail.com" aria-label="Email">
                <FaEnvelope aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright {new Date().getFullYear()} John Lloyd Galito. Built with React and Tailwind CSS.</span>
          <button className="back-top" type="button" onClick={scrollToTop}>
            Back to top <FaArrowUp aria-hidden="true" />
          </button>
          </div>
        </div>
      </footer>
    </Reveal>
  )
}

export default Footer
