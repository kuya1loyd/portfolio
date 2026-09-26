import { useState } from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa'
import Reveal from '../layout/Reveal'
import { useGame } from '../../context/GameContext'

const Contact = () => {
  const { trackSocialVisit } = useGame()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const emailSubject = `New Message from ${formData.name}`
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:galitojohnlloyd29@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    window.location.href = mailtoLink
    setSubmitStatus('success')
    setTimeout(() => {
      setSubmitStatus(null)
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 3000)
  }

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'galitojohnlloyd29@gmail.com', link: 'mailto:galitojohnlloyd29@gmail.com' },
    { icon: FaFacebook, label: 'Facebook', value: 'John Lloyd Galito', link: 'https://www.facebook.com/johnlloyd.galito.33' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Butuan City, Agusan del Norte, Philippines', link: '#' },
  ]

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com/kuya1loyd' },
    { icon: FaFacebook, label: 'Facebook', url: 'https://www.facebook.com/johnlloyd.galito.33' },
  ]

  return (
    <Reveal className="section-reveal">
      <section className="section-wrap" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <div className="section-heading-copy">
          <span className="section-kicker">Have an idea in mind?</span>
          <h2 className="section-title" id="contact-title">Let&apos;s make something <span>useful.</span></h2>
        </div>
        <p className="section-lede">Have a project, a question, or just want to say hello? I&apos;d be glad to hear from you.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-details">
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <a
                className="surface contact-card"
                href={info.link}
                key={info.label}
                target={info.label === 'Facebook' ? '_blank' : undefined}
                rel={info.label === 'Facebook' ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  if (info.label === 'Facebook') trackSocialVisit('facebook')
                  if (info.label === 'Email') trackSocialVisit('email')
                }}
              >
                <span className="detail-icon"><Icon aria-hidden="true" /></span>
                <span>
                  <span className="detail-title">{info.label}</span>
                  <span className="detail-subtitle" style={{ display: 'block' }}>{info.value}</span>
                </span>
              </a>
            )
          })}
          <div className="contact-socials" aria-label="Social profiles">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a className="social-icon" href={social.url} target="_blank" rel="noopener noreferrer" title={social.label} aria-label={social.label} key={social.label} onClick={() => trackSocialVisit(social.label.toLowerCase())}>
                  <Icon aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <form className="surface contact-form" onSubmit={handleSubmit}>
          <h3 className="panel-title">Send me a message</h3>
          <p className="contact-form-intro">Your email app will open with your message ready to send.</p>
          {submitStatus === 'success' && (
            <div className="form-success" role="status">
              Email client opened. Please send the message from your email app.
            </div>
          )}

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-field form-field-full">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                placeholder="Tell me a little about what you have in mind..."
                rows="5"
              />
            </div>
          </div>
          <button className="button-primary form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Opening email...' : 'Send message'} <FaPaperPlane aria-hidden="true" />
          </button>
        </form>
      </div>
      </section>
    </Reveal>
  )
}

export default Contact
