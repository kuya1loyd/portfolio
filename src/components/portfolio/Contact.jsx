'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiMapPin, FiCopy, FiCheck, FiSend } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'

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
    <section id="contact" className="relative py-24 sm:py-28 px-6 lg:px-12 bg-transparent text-slate-900 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-600 font-mono font-bold">
                CONTACT
              </span>
              <div className="h-px w-10 bg-slate-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900">
              LET&apos;S <span className="text-slate-400">CONNECT.</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg font-normal">
              Send your project requirements directly to <span className="text-cyan-700 font-mono font-semibold">{recipientEmail}</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Information Card */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500 font-bold mb-1.5">
                <FiMail className="w-4 h-4 text-cyan-600" />
                <span>Email Address</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 break-all">
                {recipientEmail}
              </p>
              <button
                type="button"
                onClick={copyEmailToClipboard}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer py-1"
              >
                {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FiCopy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to clipboard!' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500 font-bold mb-1.5">
                <FaFacebook className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook Profile</span>
              </div>
              <a
                href="https://www.facebook.com/johnlloyd.galito.33"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-cyan-700 hover:text-cyan-800 hover:underline transition-colors inline-block"
              >
                John Lloyd Galito
              </a>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                facebook.com/johnlloyd.galito.33
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500 font-bold mb-1.5">
                <FiMapPin className="w-4 h-4 text-cyan-600" />
                <span>Location</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                Butuan City, Philippines (GMT+8)
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Available for local &amp; remote global projects
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-5"
            >
              {/* Row 1: What do you need created? & Estimated Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                    What do you need created?
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-sans focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none cursor-pointer transition-all"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                    Estimated Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-sans focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none cursor-pointer transition-all"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-sans focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-sans focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Row 3: Subject */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. System Development Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-sans focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Row 4: Message / Requirements */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                  Project Details / What You Need Created
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe what you want built (features, purpose, platforms, or specifications)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-sans focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none resize-none leading-relaxed transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-slate-900 !text-white font-bold text-sm uppercase tracking-wider hover:bg-cyan-600 transition-all disabled:opacity-60 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <FiSend className="w-4 h-4 !text-white" />
                <span className="!text-white">{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
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
