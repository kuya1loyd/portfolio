'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageSquare,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiCheckCircle,
  FiX,
  FiSend
} from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

function getAvatarUrl(name, avatar) {
  if (avatar && avatar.trim()) return avatar
  const cleanName = encodeURIComponent((name || 'Guest').trim())
  return `https://ui-avatars.com/api/?name=${cleanName}&background=06b6d4&color=fff&bold=true&rounded=true`
}

const CATEGORIES = ['All', 'Clients & Projects', 'Academic & Capstone', 'Peers & Teammates']

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Feedback form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    category: 'Peers & Teammates',
    rating: 5,
    quote: '',
    project: ''
  })

  // Load real server-side or locally saved testimonials
  useEffect(() => {
    let localItems = []
    try {
      const stored = localStorage.getItem('galito_testimonials')
      if (stored) {
        localItems = JSON.parse(stored)
      }
    } catch {
      // ignore
    }

    fetch('/api/testimonials')
      .then((res) => (res.ok ? res.json() : { testimonials: [] }))
      .then((data) => {
        const serverItems = Array.isArray(data?.testimonials) ? data.testimonials : []
        const mergedMap = new Map()

        // 1. Add server items
        serverItems.forEach((item) => mergedMap.set(String(item.id), item))
        // 2. Add local items
        localItems.forEach((item) => {
          if (!mergedMap.has(String(item.id))) {
            mergedMap.set(String(item.id), item)
          }
        })

        setTestimonials(Array.from(mergedMap.values()))
      })
      .catch(() => {
        if (localItems.length > 0) {
          setTestimonials(localItems)
        }
      })
  }, [])

  // Filtered testimonials
  const filteredList = useMemo(() => {
    if (activeCategory === 'All') return testimonials
    return testimonials.filter((t) => t.category === activeCategory)
  }, [testimonials, activeCategory])

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  // Carousel navigation handlers
  const handleNext = useCallback(() => {
    if (filteredList.length <= 1) return
    setCurrentIndex((prev) => (prev + 1) % filteredList.length)
  }, [filteredList.length])

  const handlePrev = useCallback(() => {
    if (filteredList.length <= 1) return
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length)
  }, [filteredList.length])

  // Form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle new feedback submission
  const handleSubmitFeedback = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.quote.trim()) return

    setIsSubmitting(true)

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim() || 'Collaborator',
      company: formData.company.trim() || 'Partner / Peer',
      category: formData.category,
      rating: Number(formData.rating) || 5,
      tag: 'Verified Feedback',
      avatar: getAvatarUrl(formData.name),
      quote: formData.quote.trim(),
      project: formData.project.trim() || 'Collaborative Work'
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      const newEntry = data?.testimonial || {
        ...payload,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString()
      }

      // Prepend to active list
      setTestimonials((prev) => [newEntry, ...prev.filter((t) => t.id !== newEntry.id)])

      // Save locally
      try {
        const stored = localStorage.getItem('galito_testimonials')
        const existing = stored ? JSON.parse(stored) : []
        localStorage.setItem('galito_testimonials', JSON.stringify([newEntry, ...existing]))
      } catch {
        // ignore
      }

      setSubmitSuccess(true)
      setActiveCategory('All')
      setCurrentIndex(0)

      setTimeout(() => {
        setIsModalOpen(false)
        setSubmitSuccess(false)
        setFormData({
          name: '',
          role: '',
          company: '',
          category: 'Peers & Teammates',
          rating: 5,
          quote: '',
          project: ''
        })
      }, 1400)
    } catch (err) {
      console.error('Failed to submit feedback:', err)
      const fallbackEntry = {
        ...payload,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString()
      }
      setTestimonials((prev) => [fallbackEntry, ...prev])
      setSubmitSuccess(true)
      setActiveCategory('All')
      setCurrentIndex(0)

      setTimeout(() => {
        setIsModalOpen(false)
        setSubmitSuccess(false)
      }, 1400)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Active item in carousel
  const activeItem = filteredList[currentIndex] || filteredList[0]

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-12 bg-transparent text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] dark:bg-cyan-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 font-mono font-bold mb-3">
              <FiMessageSquare className="w-4 h-4" />
              <span>TESTIMONIALS &amp; RECOMMENDATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
              WHAT PEOPLE <span className="text-slate-400 dark:text-slate-500">SAY.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Real endorsements, peer reviews, and collaborative feedback from mentors, teammates, and clients.
            </p>
          </div>
        </div>

        {/* Filter Pills & Carousel Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? testimonials.length
                  : testimonials.filter((t) => t.category === cat).length
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs shadow-cyan-500/20'
                      : 'bg-[#f8fafc] dark:bg-[#131722] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-cyan-500/30'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      active
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-200/60 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Carousel Next / Prev Buttons */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-1">
              {filteredList.length > 0 ? `${currentIndex + 1} / ${filteredList.length}` : '0 / 0'}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredList.length <= 1}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#131722] border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={filteredList.length <= 1}
              aria-label="Next testimonial"
              className="p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#131722] border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-xs"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase Card */}
        {filteredList.length > 0 && activeItem && (
          <div className="relative min-h-[320px] sm:min-h-[290px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="group relative p-7 sm:p-9 md:p-11 rounded-3xl bg-[#f8fafc] dark:bg-[#131722] border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Stars, Tag, and Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                      {[...Array(activeItem.rating || 5)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25">
                        <FiCheckCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{activeItem.tag || 'Verified Endorsement'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Main Recommendation Quote */}
                  <div className="relative mb-8">
                    <FaQuoteLeft className="w-6 h-6 text-cyan-600/25 dark:text-cyan-400/25 mb-3" />
                    <p className="text-base sm:text-lg md:text-xl text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                      &ldquo;{activeItem.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Author Info Footer */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Real Profile Photo */}
                    <div className="relative shrink-0">
                      <img
                        src={getAvatarUrl(activeItem.name, activeItem.avatar)}
                        alt={activeItem.name}
                        className="w-13 h-13 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-md"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = getAvatarUrl(activeItem.name)
                        }}
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#131722]" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate">
                        {activeItem.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {activeItem.role} &bull;{' '}
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                          {activeItem.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {activeItem.project && (
                    <div className="sm:text-right shrink-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                        Scope / Focus
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-medium text-slate-700 dark:text-slate-300 truncate max-w-[220px] block">
                        {activeItem.project}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Empty State when no reviews yet */}
        {filteredList.length === 0 && (
          <div className="p-10 sm:p-14 rounded-3xl border border-dashed border-slate-300 dark:border-white/15 text-center flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <FiMessageSquare className="w-7 h-7" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              No Endorsements Yet
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md leading-relaxed">
              Have you collaborated with John Lloyd on a project, academic research, or software build? Be the first to share your recommendation!
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              <span>Write First Endorsement</span>
            </button>
          </div>
        )}

        {/* Carousel Progress Dots */}
        {filteredList.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {filteredList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 bg-cyan-500'
                    : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* LEAVE FEEDBACK MODAL                                           */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121622] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <FiMessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      Leave an Endorsement
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Share your feedback or experience working with John Lloyd
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Thank You for Your Feedback!
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                    Your endorsement has been added and is now live in the testimonials carousel.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  {/* Name and Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. Senior Frontend Dev / Mentor"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Company and Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Company / Institution
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. FSUU / Tech Agency"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Relationship Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#181d2c] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-cyan-500"
                      >
                        <option value="Peers & Teammates">Peers &amp; Teammates</option>
                        <option value="Clients & Projects">Clients &amp; Projects</option>
                        <option value="Academic & Capstone">Academic &amp; Capstone</option>
                      </select>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                          className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <FiStar
                            className={`w-5 h-5 ${
                              formData.rating >= star
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-slate-300 dark:text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">
                        {formData.rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Project Scope */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Project or Scope (Optional)
                    </label>
                    <input
                      type="text"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      placeholder="e.g. Capstone Research / Next.js Web App"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-cyan-500"
                    />
                  </div>

                  {/* Feedback Message */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Your Recommendation / Feedback *
                    </label>
                    <textarea
                      name="quote"
                      required
                      rows={4}
                      value={formData.quote}
                      onChange={handleChange}
                      placeholder="Write your constructive review, recommendation, or impressions on collaborating with John Lloyd..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:border-cyan-500 leading-relaxed resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <FiSend className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Post Endorsement'}</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
