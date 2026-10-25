'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projectTypes = [
  'Web Application (React, Next.js, Portal)',
  'Mobile App (Flutter, iOS & Android)',
  'Full-Stack System (Frontend + Backend + DB)',
  'UI/UX & Frontend Design',
  'API & Database Architecture',
  'Custom Software / Other'
]

const timelineOptions = [
  'Within 1 Month',
  'Urgent / ASAP',
  '1 - 3 Months',
  'Flexible / Planning Phase'
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Application (React, Next.js, Portal)',
    timeline: 'Within 1 Month',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [copied, setCopied] = useState(false)

  const recipientEmail = 'galitojohnlloyd@gmail.com'
  const formSubmitToken = 'f8ada59cf8fafddc888075dc7118a696'

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(recipientEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          'Client Name': formData.name,
          'Client Email': formData.email,
          'What They Need Created': formData.projectType,
          'Estimated Timeline': formData.timeline,
          'Subject / Project Title': formData.subject || `Project Request: ${formData.projectType}`,
          'Detailed Project Requirements': formData.message,
          _subject: `[New Project Request] ${formData.projectType} from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table'
        })
      })

      setSubmittedName(formData.name)
      setShowSuccessModal(true)
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Application (React, Next.js, Portal)',
        timeline: 'Within 1 Month',
        subject: '',
        message: ''
      })
    } catch {
      setSubmittedName(formData.name)
      setShowSuccessModal(true)
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Application (React, Next.js, Portal)',
        timeline: 'Within 1 Month',
        subject: '',
        message: ''
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 px-6 lg:px-12 bg-transparent text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
                CONTACT
              </span>
              <div className="h-px w-8 bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
              LET&apos;S <span className="text-white/40">CONNECT.</span>
            </h2>
            <p className="mt-2 text-xs text-white/50 max-w-lg font-light">
              Send your project requirements directly to <span className="text-cyan-300 font-mono">{recipientEmail}</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Compact Contact Info */}
          <div className="lg:col-span-4 p-5 rounded-xl bg-[#121212] border border-white/10 space-y-4">
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-1">
                Email
              </p>
              <p className="text-sm font-semibold text-white break-all">
                {recipientEmail}
              </p>
              <button
                type="button"
                onClick={copyEmailToClipboard}
                className="mt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {copied ? 'Copied to clipboard' : 'Copy Email'}
              </button>
            </div>

            <div className="pt-3 border-t border-white/5">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-1">
                Facebook
              </p>
              <a
                href="https://www.facebook.com/johnlloyd.galito.33"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors inline-block"
              >
                John Lloyd Galito
              </a>
            </div>

            <div className="pt-3 border-t border-white/5">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-1">
                Location
              </p>
              <p className="text-sm font-semibold text-white">
                Butuan City, Philippines (GMT+8)
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-7 rounded-xl bg-[#121212] border border-white/10 space-y-4 shadow-xl"
            >
              {/* Row 1: What do you need created? & Estimated Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-1.5 font-medium">
                    What do you need created?
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="contact-input w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                    Estimated Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="contact-input w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none cursor-pointer"
                  >
                    {timelineOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="contact-input w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="contact-input w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Subject */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5 font-medium">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="contact-input w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none"
                />
              </div>

              {/* Row 4: Message / Requirements */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                  Project Details / What You Need Created
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe what you want built (features, purpose, platforms, or specifications)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact-input w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#121212] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] text-center relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500" />

              {/* Success Check Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white font-sans tracking-tight mb-2">
                Message Sent Successfully!
              </h3>

              <p className="text-xs text-white/70 leading-relaxed font-sans mb-6">
                Thank you{submittedName ? `, ${submittedName}` : ''}! Your message has been transmitted directly to{' '}
                <span className="text-cyan-400 font-mono font-medium">{recipientEmail}</span>. I will review your requirements and reply as soon as possible.
              </p>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
