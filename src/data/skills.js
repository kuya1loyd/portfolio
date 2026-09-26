import {
  FaCode,
  FaGears,
  FaLightbulb,
  FaRobot,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import {
  VscCodeReview,
  VscVscode,
} from 'react-icons/vsc'
import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

export const skillCategories = [
  {
    title: 'Frontend',
    description: 'HTML5, CSS3, JavaScript, React - Building responsive and interactive user interfaces',
    icon: FaCode,
    skills: [
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572b6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    ],
  },
  {
    title: 'Backend',
    description: 'PHP, MySQL, Supabase - Server-side development and database management',
    icon: SiNodedotjs,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e' },
      { name: 'Express', icon: SiExpress, color: '#dedede' },
      { name: 'Laravel', icon: SiLaravel, color: '#ff2d20' },
      { name: 'PHP', icon: SiPhp, color: '#777bb4' },
      { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
    ],
  },
  {
    title: 'AI Development',
    description: 'AI-assisted workflows for prompt design, automation, and code review',
    icon: FaRobot,
    skills: [
      { name: 'OpenAI', icon: SiOpenai, color: '#e7e9ec' },
      { name: 'AI Dev', icon: FaRobot, color: '#67d5e7' },
      { name: 'Copilot', icon: SiGithubcopilot, color: '#a5b4fc' },
      { name: 'Prompt Eng', icon: FaLightbulb, color: '#f5cb63' },
      { name: 'Automation', icon: FaWandMagicSparkles, color: '#69d2df' },
      { name: 'Code Review', icon: VscCodeReview, color: '#7bb4ff' },
    ],
  },
  {
    title: 'Tools',
    description: 'Git, GitHub, Figma, VS Code - Development tools and version control systems',
    icon: FaGears,
    skills: [
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#f5f7fa' },
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'VS Code', icon: VscVscode, color: '#38a8f2' },
      { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
    ],
  },
]

export const proficiencyLevels = [
  { skill: 'React & JavaScript', level: 90 },
  { skill: 'Node.js & Express', level: 85 },
  { skill: 'Laravel & PHP', level: 82 },
  { skill: 'MySQL & PostgreSQL', level: 88 },
  { skill: 'Tailwind CSS', level: 92 },
  { skill: 'Git & Version Control', level: 90 },
]
