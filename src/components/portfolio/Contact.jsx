'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiMessageSquare, FiGithub, FiCheckCircle } from 'react-icons/fi'
import { FaFacebook, FaFacebookMessenger } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailSubject = formData.subject || `Inquiry from ${formData.name}`
    const emailBody = `Sender: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    const mailto = `mailto:galitojohnlloyd29@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    window.location.href = mailto
    setIsSent(true)
    setTimeout(() => setIsSent(false), 5000)
  }

  const channels = [
    {
      icon: FiMail,
      title: 'Email Address',
      value: 'galitojohnlloyd29@gmail.com',
      link: 'mailto:galitojohnlloyd29@gmail.com',
      action: 'Send an Email'
    },
    {
      icon: FaFacebook,
      title: 'Facebook Profile',
      value: 'John Lloyd Galito',
      link: 'https://www.facebook.com/johnlloyd.galito.33',
      action: 'Visit Facebook Profile'
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Butuan City, Philippines',
      link: '#',
      action: 'GMT+8 Standard Time'
    }
  ]

  return (
    <section id="contact" className="relative py-28 px-6 lg:px-12 bg-transparent overflow-hidden text-white border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">
              COLLABORATION & TRANSMISSION
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
            LET&apos;S <span className="text-white/40">CONNECT.</span>
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-xl font-light leading-relaxed">
            Have a project vision, want to discuss full-stack architecture, or looking to collaborate? Reach out through the terminal form or direct communication channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {channels.map((ch, idx) => {
                const Icon = ch.icon
                return (
                  <a
                    key={idx}
                    href={ch.link}
                    target={ch.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group block p-6 rounded-[2rem] bg-[#121212] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-cyan-500/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-mono tracking-widest uppercase text-white/40">
                          {ch.title}
                        </p>
                        <p className="text-base font-semibold text-white mt-1 group-hover:text-white transition-colors">
                          {ch.value}
                        </p>
                        <span className="inline-block mt-2 text-xs font-mono text-cyan-400/80 group-hover:text-cyan-300">
                          {ch.action} →
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Social Connection Badges */}
            <div className="p-6 rounded-[2rem] bg-[#121212] border border-white/10">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-4">
                COMMUNITY & REPOSITORIES
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/kuya1loyd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href="https://www.facebook.com/johnlloyd.galito.33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-colors"
                >
                  <FaFacebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-[2.5rem] bg-[#121212] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                Send a Direct Transmission
              </h3>
              <p className="text-xs text-white/50 mb-8 font-light">
                Fill out the fields below to initiate contact via direct mail client.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-white/20 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-white/20 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/60 mb-2">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Frontend Engineering"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-white/20 transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/60 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Briefly describe your requirements or ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-white/20 transition-all font-sans resize-none"
                  />
                </div>

                {/* Slide-Fill Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full py-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-300 shadow-xl shadow-white/10"
                >
                  <span className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                    <FiSend className="w-4 h-4" />
                    <span>Send Transmission</span>
                  </span>
                </button>

                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                    <span>Transmitting payload to default mail client...</span>
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
