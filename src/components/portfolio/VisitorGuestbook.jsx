'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FiUsers,
  FiMapPin,
  FiTrash2
} from 'react-icons/fi'

const EMPTY_SNAPSHOT = {
  configured: true,
  stats: { uniqueVisitors: 0, totalVisits: 0, guestEntries: 0 },
  guests: [],
  visits: []
}

function getVisitorId() {
  let id = localStorage.getItem('jl-portfolio-visitor-id')
  if (!id) {
    id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem('jl-portfolio-visitor-id', id)
  }
  return id
}

function describeDevice() {
  const ua = navigator.userAgent
  let browser = 'Browser'
  if (/Edg\//.test(ua)) browser = 'Edge'
  else if (/OPR\//.test(ua)) browser = 'Opera'
  else if (/Chrome\//.test(ua)) browser = 'Chrome'
  else if (/Firefox\//.test(ua)) browser = 'Firefox'
  else if (/Safari\//.test(ua)) browser = 'Safari'

  let os = 'Device'
  if (/Windows/.test(ua)) os = 'Windows'
  else if (/Android/.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS'
  else if (/Mac OS X/.test(ua)) os = 'macOS'
  else if (/Linux/.test(ua)) os = 'Linux'

  return `${browser} · ${os}`
}

function timeAgo(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime())
  const sec = Math.floor(diff / 1000)
  if (sec < 45) return 'Just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} min ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} hr ago`
  const day = Math.floor(hr / 24)
  if (day < 30) return `${day} day${day > 1 ? 's' : ''} ago`
  return new Date(iso).toLocaleDateString()
}

function placeLabel(item) {
  const rawParts = [item.city, item.country].filter(Boolean)
  // Deduplicate identical city/country labels (e.g., "Philippines, Philippines")
  const uniqueParts = rawParts.filter(
    (part, index) =>
      rawParts.findIndex((p) => p.toLowerCase() === part.toLowerCase()) === index
  )
  return uniqueParts.length ? uniqueParts.join(', ') : 'Philippines'
}

export default function VisitorGuestbook() {
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/visitors', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      if (data && data.stats) setSnapshot(data)
    } catch {
      // keep what we have
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      try {
        const savedName = localStorage.getItem('jl-portfolio-visitor-name') || ''
        const res = await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'visit',
            visitorId: getVisitorId(),
            name: savedName,
            device: describeDevice(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
          })
        })
        if (res.ok && !cancelled) {
          const data = await res.json()
          if (data && data.stats) setSnapshot(data)
        } else if (!cancelled) {
          await refresh()
        }
      } catch {
        // offline - leave empty state
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()

    const poll = setInterval(refresh, 30000)
    return () => {
      cancelled = true
      clearInterval(poll)
    }
  }, [refresh])

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.stats) setSnapshot(data)
      }
    } catch {
      // ignore
    }
  }

  const { stats, guests, configured } = snapshot

  return (
    <section
      id="visitors"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-transparent text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10 overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/[0.03] dark:bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 font-mono font-bold mb-3">
            <FiUsers className="w-4 h-4" />
            <span>VISITORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
            WHO&apos;S <span className="text-slate-400 dark:text-slate-500">VISITING.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
            Live visitor analytics and activity for John Lloyd&apos;s portfolio.
          </p>
        </div>

        {/* Real stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-xl">
          {[
            { label: 'Unique visitors', value: stats.uniqueVisitors },
            { label: 'Total visits', value: stats.totalVisits },
            { label: 'Named visitors', value: stats.guestEntries }
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl bg-[#f8fafc] dark:bg-[#131722] border border-slate-200 dark:border-white/10 shadow-xs flex sm:block items-center justify-between"
            >
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 sm:hidden">
                {s.label}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900 dark:text-white">
                {loading ? '–' : s.value}
              </div>
              <div className="hidden sm:block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {!configured && (
          <div className="mb-8 p-4 rounded-2xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 text-xs font-mono text-amber-800 dark:text-amber-300">
            Visitor database is not connected yet. Add <b>DATABASE_URL</b> to the environment to start collecting real visitors.
          </div>
        )}

        {/* Named Visitors Wall */}
        {guests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {guests.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(idx, 6) * 0.05 }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[#f8fafc] hover:bg-white dark:bg-[#131722] dark:hover:bg-[#181d2a] border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl p-2 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-xs shrink-0">
                        {item.avatar || '👋'}
                      </span>
                      <div className="min-w-0">
                        <div className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                          {item.name}
                        </div>
                        {(item.role || item.company) && (
                          <div className="text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-400 truncate mt-0.5">
                            {[item.role, item.company].filter(Boolean).join(' @ ')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-base" title={placeLabel(item)}>
                        {item.flag}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        title="Remove entry"
                        aria-label={`Remove ${item.name}`}
                        className="opacity-60 sm:opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-all cursor-pointer"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {item.message && (
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal bg-white dark:bg-white/[0.04] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 break-words">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 truncate max-w-[65%]">
                    <FiMapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="truncate">{placeLabel(item)}</span>
                  </span>
                  <span>{timeAgo(item.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
