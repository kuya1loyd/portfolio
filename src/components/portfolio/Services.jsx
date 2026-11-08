'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VscCode } from 'react-icons/vsc'
import { IoRocketSharp } from 'react-icons/io5'
import { FaRobot, FaWallet, FaBuildingColumns } from 'react-icons/fa6'
import { RiBankCardLine } from 'react-icons/ri'
import { FiServer } from 'react-icons/fi'
import {
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiPhp,
  SiPython,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiSupabase,
  SiMongodb,
  SiSqlite,
  SiFirebase,
  SiOpenai,
  SiGooglegemini,
  SiPaypal,
  SiGit,
  SiGithub,
  SiDocker,
  SiVite,
  SiWebpack,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiRender
} from 'react-icons/si'

function NeonIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M4.5 3.5h3.5v17H4.5v-17zm11.5 0h3.5v17H16v-17zm-8 4.2l8 8.8v4.5l-8-8.8V7.7z" />
    </svg>
  )
}

const MARQUEE_ITEMS = [
  { name: 'REACT.JS', icon: SiReact, color: '#61DAFB' },
  { name: 'NEXT.JS', icon: SiNextdotjs, color: '#0f172a' },
  { name: 'NODE.JS', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'EXPRESS.JS', icon: SiExpress, color: '#0f172a' },
  { name: 'NEON', icon: NeonIcon, color: '#00E599' },
  { name: 'LARAVEL', icon: SiLaravel, color: '#FF2D20' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'CODEX', icon: SiOpenai, color: '#10A37F' },
  { name: 'KILO CODE', icon: FaRobot, color: '#6366F1' },
  { name: 'ANTIGRAVITY', icon: IoRocketSharp, color: '#4285F4' },
  { name: 'REST API', icon: FiServer, color: '#0284c7' },
  { name: 'TAILWIND CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'TYPESCRIPT', icon: SiTypescript, color: '#3178C6' },
  { name: 'POSTGRESQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'SUPABASE', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'DOCKER', icon: SiDocker, color: '#2496ED' },
  { name: 'VERCEL', icon: SiVercel, color: '#0f172a' },
  { name: 'PYTHON', icon: SiPython, color: '#3776AB' },
  { name: 'GCASH API', icon: FaWallet, color: '#007DFE' },
  { name: 'PAYPAL', icon: SiPaypal, color: '#0079C1' }
]

const CATEGORIES = [
  {
    id: '01',
    name: 'FRONTEND',
    tools: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#0f172a' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Dart', icon: SiDart, color: '#0175C2' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' }
    ]
  },
  {
    id: '02',
    name: 'BACKEND',
    tools: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, color: '#0f172a' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Django', icon: SiDjango, color: '#092E20' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'REST API', icon: FiServer, color: '#0284c7' }
    ]
  },
  {
    id: '03',
    name: 'DATABASE',
    tools: [
      { name: 'Neon', icon: NeonIcon, color: '#00E599' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MariaDB', icon: SiMariadb, color: '#003545' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' }
    ]
  },
  {
    id: '04',
    name: 'AI & AUTOMATION',
    tools: [
      { name: 'OpenAI', icon: SiOpenai, color: '#10A37F' },
      { name: 'Google Gemini', icon: SiGooglegemini, color: '#8868F8' },
      { name: 'Claude AI', icon: SiOpenai, color: '#D97706' },
      { name: 'Codex', icon: SiOpenai, color: '#10A37F' },
      { name: 'Kilo Code', icon: FaRobot, color: '#6366F1' }
    ]
  },
  {
    id: '05',
    name: 'PAYMENTS',
    tools: [
      { name: 'GCash API', icon: FaWallet, color: '#007DFE' },
      { name: 'MariBank', icon: FaBuildingColumns, color: '#FF5722' },
      { name: 'GoTymeBank', icon: RiBankCardLine, color: '#00BFA5' },
      { name: 'PayPal', icon: SiPaypal, color: '#0079C1' }
    ]
  },
  {
    id: '06',
    name: 'TOOLS',
    tools: [
      { name: 'VS Code', icon: VscCode, color: '#007ACC' },
      { name: 'Antigravity', icon: IoRocketSharp, color: '#4285F4' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#0f172a' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' }
    ]
  },
  {
    id: '07',
    name: 'HOSTING & NETWORK',
    tools: [
      { name: 'Vercel', icon: SiVercel, color: '#0f172a' },
      { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
      { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
      { name: 'Render', icon: SiRender, color: '#46E3B7' }
    ]
  }
]

export default function Services() {
  const [activeId, setActiveId] = useState('01')

  return (
    <section
      id="services"
      suppressHydrationWarning
      className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-white dark:bg-[#0b0d12] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200/90 dark:border-white/10 select-none transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header with Stroke Ghost Watermark */}
        <div className="relative mb-6 sm:mb-8">
          {/* Subtle Ghost Stroke Text */}
          <span
            aria-hidden="true"
            className="tech-stroke-watermark absolute -top-6 sm:-top-10 md:-top-12 left-0 text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase opacity-35 dark:opacity-20 pointer-events-none"
          >
            TECH STACK
          </span>

          {/* Main Title */}
          <h2 className="relative text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="text-slate-400 dark:text-white/40">/</span>TECH STACK
          </h2>
        </div>

        {/* Top Infinite Scrolling Marquee Belt */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-50/90 dark:bg-[#12141a] border border-slate-200/90 dark:border-white/10 py-3.5 px-2 mb-10 shadow-xs">
          {/* Edge Fade Gradients */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-[#12141a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-[#12141a] to-transparent z-10 pointer-events-none" />

          <div className="animate-tech-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
            {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-700 dark:text-slate-200"
                >
                  <Icon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                  <span>{item.name}</span>
                  <span className="text-slate-400 dark:text-slate-600 font-normal ml-3">/</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* In-Place Sequential File Folder Accordion System (01 to 07 in Order) */}
        <div className="flex items-stretch gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeId

            if (isActive) {
              return (
                <div
                  key={cat.id}
                  className="flex-1 min-w-[280px] sm:min-w-[420px] md:min-w-[520px] lg:min-w-[620px] flex flex-col transition-all duration-300"
                >
                  {/* Protruding Folder Tab */}
                  <div className="flex items-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-t-2xl bg-white dark:bg-[#171a22] border-t border-l border-r border-slate-200/90 dark:border-white/15 text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-xs">
                      <span>{cat.name}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-normal">{cat.id}</span>
                    </div>
                  </div>

                  {/* Folder Interior Body Card */}
                  <div className="relative w-full flex-1 rounded-2xl rounded-tl-none bg-white dark:bg-[#13151c] border border-slate-200/90 dark:border-white/15 p-6 sm:p-8 min-h-[380px] sm:min-h-[420px] flex flex-col justify-start shadow-xl dark:shadow-2xl transition-colors">
                    {/* Folder Subtitle */}
                    <div className="text-xs font-mono font-extrabold tracking-widest text-slate-500 dark:text-slate-400 mb-6 uppercase flex items-center gap-2">
                      <span>{cat.tools.length} TOOLS IN THIS FOLDER</span>
                    </div>

                    {/* Tools Badges Grid with Smooth Motion Transition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="flex flex-wrap gap-2.5 sm:gap-3.5"
                      >
                        {cat.tools.map((tool) => {
                          const ToolIcon = tool.icon
                          return (
                            <div
                              key={tool.name}
                              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100/90 dark:bg-[#1b1f28] dark:hover:bg-[#252b38] border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default select-none shadow-xs"
                            >
                              <ToolIcon
                                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                                style={{ color: tool.color }}
                              />
                              <span className="group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                                {tool.name}
                              </span>
                            </div>
                          )
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )
            }

            {/* Inactive Collapsed Vertical Tab Standing Upright in Order */}
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveId(cat.id)}
                aria-label={`Open folder ${cat.name}`}
                className="w-11 sm:w-13 md:w-14 min-h-[140px] lg:min-h-[465px] rounded-2xl bg-slate-50 hover:bg-white dark:bg-[#13151c] dark:hover:bg-[#1a1d26] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 flex flex-col justify-between items-center py-5 sm:py-6 cursor-pointer transition-all duration-300 group select-none shrink-0 shadow-xs hover:shadow-md"
              >
                {/* Category Number on Top */}
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {cat.id}
                </span>

                {/* Vertical Category Label */}
                <span className="vertical-tab-text font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white uppercase whitespace-nowrap transition-colors my-auto py-2">
                  {cat.name}
                </span>

                {/* Tool Count on Bottom */}
                <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {cat.tools.length}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
