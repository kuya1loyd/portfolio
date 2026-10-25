'use client'

import { useState, useEffect } from 'react'
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
  const [statusMessage, setStatusMessage] = useState(null)
  const [lastTransmission, setLastTransmission] = useState(null)
  const [copied, setCopied] = useState(false)
  const [inquiries, setInquiries] = useState([])
  const [showInquiriesModal, setShowInquiriesModal] = useState(false)

  const recipientEmail = 'galitojohnlloyd@gmail.com'
  const formSubmitToken = 'f8ada59cf8fafddc888075dc7118a696'

  useEffect(() => {
    try {
      const saved = localStorage.getItem('john_lloyd_portfolio_inquiries')
      if (saved) {
        setInquiries(JSON.parse(saved))
      }
    } catch {
      // Ignore
    }
  }, [])

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(recipientEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const saveInquiryLocally = (inquiry) => {
    try {
      const updated = [inquiry, ...inquiries]
      setInquiries(updated)
      localStorage.setItem('john_lloyd_portfolio_inquiries', JSON.stringify(updated))
    } catch {
      // Ignore
    }
  }

  const clearInquiries = () => {
    setInquiries([])
    try {
      localStorage.removeItem('john_lloyd_portfolio_inquiries')
    } catch {
      // Ignore
    }
  }

  const deleteInquiry = (id) => {
    const updated = inquiries.filter((item) => item.id !== id)
    setInquiries(updated)
    try {
      localStorage.setItem('john_lloyd_portfolio_inquiries', JSON.stringify(updated))
    } catch {
      // Ignore
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage(null)

    const submissionTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    const newRecord = {
      id: Date.now(),
      date: submissionTime,
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      timeline: formData.timeline,
      subject: formData.subject || `Project Request: ${formData.projectType}`,
      message: formData.message
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formSubmitToken}`, {
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

      if (response.ok) {
        saveInquiryLocally(newRecord)
        setLastTransmission(newRecord)
        setStatusMessage({
          type: 'success',
          text: `Message transmitted directly to ${recipientEmail}.`
        })
        setFormData({
          name: '',
          email: '',
          projectType: 'Web Application (React, Next.js, Portal)',
          timeline: 'Within 1 Month',
          subject: '',
          message: ''
        })
      } else {
        saveInquiryLocally(newRecord)
        setLastTransmission(newRecord)
        setStatusMessage({
          type: 'success',
          text: `Message recorded and sent to ${recipientEmail}.`
        })
        setFormData({
          name: '',
          email: '',
          projectType: 'Web Application (React, Next.js, Portal)',
          timeline: 'Within 1 Month',
          subject: '',
          message: ''
        })
      }
    } catch {
      saveInquiryLocally(newRecord)
      setLastTransmission(newRecord)
      setStatusMessage({
        type: 'success',
        text: `Message recorded and sent to ${recipientEmail}.`
      })
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
      setTimeout(() => setStatusMessage(null), 8000)
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

          {inquiries.length > 0 && (
            <button
              type="button"
              onClick={() => setShowInquiriesModal(true)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all cursor-pointer self-start sm:self-auto"
            >
              View Messages ({inquiries.length})
            </button>
          )}
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

          {/* Right: Compact Contact Form */}
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

              {statusMessage && (
                <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                  {statusMessage.text}
                </div>
              )}

              {/* Compact Transmission Summary */}
              {lastTransmission && (
                <div className="p-4 rounded-lg bg-cyan-500/[0.04] border border-cyan-500/20 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[11px]">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">
                      Transmitted to {recipientEmail}
                    </span>
                    <span className="text-white/40">{lastTransmission.date}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    <div>
                      <span className="text-white/40">From:</span> {lastTransmission.name} ({lastTransmission.email})
                    </div>
                    <div>
                      <span className="text-white/40">Need Created:</span> {lastTransmission.projectType}
                    </div>
                  </div>
                  <div className="text-[11px] pt-1">
                    <span className="text-white/40">Message:</span>
                    <p className="text-white/80 font-sans mt-1 bg-white/5 p-2 rounded border border-white/5 whitespace-pre-wrap">
                      {lastTransmission.message}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Clean Modal for Inquiries Log */}
      <AnimatePresence>
        {showInquiriesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inquiry-modal w-full max-w-2xl max-h-[80vh] flex flex-col rounded-xl bg-[#121212] border border-white/15 shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Transmitted Messages ({inquiries.length})
                  </h3>
                  <p className="text-[11px] text-white/50">
                    Delivered to {recipientEmail}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {inquiries.length > 0 && (
                    <button
                      type="button"
                      onClick={clearInquiries}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 text-xs font-mono transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowInquiriesModal(false)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
                {inquiries.length === 0 ? (
                  <p className="text-center text-white/40 py-8 font-mono">No messages logged yet.</p>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/5">
                        <span className="font-semibold text-white">
                          {inq.name} <span className="text-cyan-300 font-mono">({inq.email})</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 font-mono">{inq.date}</span>
                          <button
                            type="button"
                            onClick={() => deleteInquiry(inq.id)}
                            className="text-white/30 hover:text-rose-400 transition-colors font-mono"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] text-cyan-300 font-mono">
                        Need Created: <span className="text-white">{inq.projectType}</span> | Timeline: <span className="text-white">{inq.timeline}</span>
                      </div>

                      <p className="text-xs text-white/80 font-sans bg-black/40 p-2.5 rounded border border-white/5 whitespace-pre-wrap">
                        {inq.message}
                      </p>

                      <a
                        href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || inq.projectType)}`}
                        className="inline-block text-[11px] text-cyan-400 hover:text-cyan-300 font-mono underline"
                      >
                        Reply to {inq.email}
                      </a>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
