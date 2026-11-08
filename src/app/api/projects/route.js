import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

const GITHUB_USERNAME = 'kuya1loyd'

const FALLBACK_PROJECTS = [
  {
    id: 'skytech',
    title: 'SkyTech',
    subtitle: 'Full-Stack · Cloud & Tech Solutions',
    year: '2026',
    category: 'Web Application',
    status: 'live',
    description:
      'A cutting-edge tech showcase and services management platform built with TypeScript and Tailwind CSS, deployed on Vercel.',
    liveLink: 'https://sky-tech-xi.vercel.app',
    githubLink: 'https://github.com/kuya1loyd/SkyTech',
    image: '/images/projects/skytech.png',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'rentrack',
    title: 'RenTrack',
    subtitle: 'Web application · Property & Rental Management',
    year: '2026',
    category: 'Web Application',
    status: 'live',
    description:
      'A comprehensive property rental management, automated billing, payments, and receivables monitoring system built with Next.js and PostgreSQL. Streamlines lease contracts, tenant payment histories, monthly statements, and occupancy telemetry in an intuitive dashboard designed to replace fragmented spreadsheets.',
    liveLink: 'https://rentrack-beige.vercel.app/',
    githubLink: 'https://github.com/kuya1loyd/RenTrack',
    image: '/images/projects/rentrack.png',
    tags: ['TypeScript', 'React', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'carvex-carparts',
    title: 'CarVex',
    subtitle: 'Web platform · Automotive Procurement & E-Commerce',
    year: '2026',
    category: 'E-Commerce Platform',
    status: 'live',
    description:
      'An automotive components catalog and procurement hub built for frictionless discovery. Combines instant multi-tiered filtering by vehicle year, make, and model with smart inventory caching and lightning-fast checkout workflows for automotive repair specialists and distributors.',
    liveLink: 'https://carvex-carparts-omega.vercel.app/',
    githubLink: 'https://github.com/kuya1loyd/Carvex-Carparts',
    image: '/images/projects/carvex.png',
    tags: ['React', 'Vite', 'E-Commerce', 'Tailwind CSS', 'Vercel'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buildtrack-application',
    title: 'BuildTrack',
    subtitle: 'Mobile app · Construction Management System',
    year: '2026',
    category: 'Mobile Application',
    status: 'building',
    description:
      'A cross-platform mobile application engineered specifically for on-site construction tracking, material warehouse inventory, workforce attendance logs, and milestone scheduling. Features offline-first synchronisation with Neon PostgreSQL to ensure job site engineers never lose vital project updates.',
    liveLink: null,
    githubLink: 'https://github.com/kuya1loyd/BuildTrack-Application',
    image: '/images/projects/buildtrack_phone.png',
    tags: ['Flutter', 'Dart', 'Neon Postgres', 'REST API', 'Cross-Platform'],
    updatedAt: new Date().toISOString()
  }
]

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

function normalizeProject(row) {
  let tags = []
  if (Array.isArray(row.tags)) {
    tags = row.tags
  } else if (typeof row.tags === 'string') {
    try {
      tags = JSON.parse(row.tags)
    } catch {
      tags = [row.tags]
    }
  }

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    year: row.year || '2026',
    status: (row.status || 'live').toLowerCase(),
    description: row.description,
    liveLink: row.live_link,
    githubLink: row.github_link,
    image: row.image || '/images/projects/rentrack.png',
    tags,
    displayOrder: row.display_order ?? 0,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString()
  }
}

function formatRepoTitle(repoName) {
  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/App\b/i, 'App')
}

async function fetchLiveGithubRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`, {
      headers: {
        'User-Agent': 'NextJS-Portfolio',
        Accept: 'application/vnd.github.v3+json'
      },
      next: { revalidate: 60 }
    })
    if (!res.ok) return []
    const repos = await res.json()
    if (!Array.isArray(repos)) return []

    // Exclude portfolio repos, template forks, romnick, schoolsystem and other non-portfolio repos
    return repos
      .filter((r) => {
        const n = r.name.toLowerCase()
        return (
          !r.fork &&
          n !== 'portfolio' &&
          n !== 'portfolio-galito' &&
          n !== 'webpage' &&
          !n.includes('romnick') &&
          !n.includes('schoolsystem')
        )
      })
      .map((r) => {
        const title = formatRepoTitle(r.name)
        const year = r.updated_at ? String(new Date(r.updated_at).getFullYear()) : '2026'
        const tags = [r.language, r.homepage ? 'Vercel' : null, 'Git'].filter(Boolean)

        let image = '/images/projects/rentrack.png'
        const low = r.name.toLowerCase()
        if (low.includes('skytech')) image = '/images/projects/skytech.png'
        else if (low.includes('carvex')) image = '/images/projects/carvex.png'
        else if (low.includes('buildtrack')) image = '/images/projects/buildtrack_phone.png'
        else if (low.includes('rentrack')) image = '/images/projects/rentrack.png'

        return {
          id: r.name.toLowerCase(),
          title,
          subtitle: `${r.language || 'Full-Stack'} · ${year}`,
          category: r.language ? `${r.language} Application` : 'Web Application',
          year,
          status: r.homepage ? 'live' : 'building',
          description:
            r.description ||
            `Modern ${r.language || 'software'} project developed by John Lloyd, featuring clean architecture, responsive workflows, and continuous deployment.`,
          liveLink: r.homepage || null,
          githubLink: r.html_url,
          image,
          tags,
          displayOrder: 99,
          updatedAt: r.updated_at
        }
      })
  } catch (err) {
    console.warn('GitHub live repos fetch skipped:', err?.message || err)
    return []
  }
}

export async function GET() {
  const sql = getSql()
  let dbProjects = []

  if (sql) {
    try {
      const rows = await sql`
        SELECT 
          id, title, subtitle, category, year, status, description, 
          live_link, github_link, image, tags, display_order, is_featured, created_at, updated_at
        FROM portfolio_projects
        WHERE is_featured = true
        ORDER BY display_order ASC, updated_at DESC;
      `
      if (rows && rows.length > 0) {
        dbProjects = rows.map(normalizeProject)
      }
    } catch (err) {
      console.warn('Neon connection delay on local network:', err?.message || err)
    }
  }

  // Base list starts with database records or fallback projects
  const baseList = dbProjects.length > 0 ? dbProjects : FALLBACK_PROJECTS

  // Fetch live repositories from GitHub
  const githubRepos = await fetchLiveGithubRepos()

  // Merge: if a GitHub repo is not yet in baseList, automatically append it!
  const knownIds = new Set(
    baseList.map((p) => p.id.toLowerCase().replace(/[-_]/g, ''))
  )
  const knownLinks = new Set(
    baseList
      .flatMap((p) => [p.githubLink, p.liveLink])
      .filter(Boolean)
      .map((l) => l.toLowerCase().replace(/\/$/, ''))
  )

  const autoAddedFromGithub = []
  for (const repo of githubRepos) {
    const normId = repo.id.replace(/[-_]/g, '')
    const normGit = repo.githubLink?.toLowerCase().replace(/\/$/, '')
    const normLive = repo.liveLink?.toLowerCase().replace(/\/$/, '')

    const alreadyExists =
      knownIds.has(normId) ||
      (normGit && knownLinks.has(normGit)) ||
      (normLive && knownLinks.has(normLive))

    if (!alreadyExists) {
      autoAddedFromGithub.push(repo)
    }
  }

  const combined = [...baseList, ...autoAddedFromGithub]

  return NextResponse.json(
    { projects: combined, source: 'synced-github' },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  )
}

export async function POST(req) {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const body = await req.json()
    const { action = 'upsert', id, status } = body

    if (action === 'status' && id && status) {
      await sql`
        UPDATE portfolio_projects
        SET status = ${status}, updated_at = NOW()
        WHERE id = ${id};
      `
    } else if (action === 'upsert' && id && body.title) {
      const tagsJson = JSON.stringify(body.tags || [])
      await sql`
        INSERT INTO portfolio_projects (
          id, title, subtitle, category, year, status, description, 
          live_link, github_link, image, tags, display_order, is_featured, updated_at
        ) VALUES (
          ${id},
          ${body.title},
          ${body.subtitle || null},
          ${body.category || 'Web Application'},
          ${body.year || '2026'},
          ${body.status || 'live'},
          ${body.description || null},
          ${body.liveLink || null},
          ${body.githubLink || null},
          ${body.image || null},
          ${tagsJson}::jsonb,
          ${body.displayOrder ?? 0},
          ${body.isFeatured ?? true},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          category = EXCLUDED.category,
          year = EXCLUDED.year,
          status = EXCLUDED.status,
          description = EXCLUDED.description,
          live_link = EXCLUDED.live_link,
          github_link = EXCLUDED.github_link,
          image = EXCLUDED.image,
          tags = EXCLUDED.tags,
          display_order = EXCLUDED.display_order,
          is_featured = EXCLUDED.is_featured,
          updated_at = NOW();
      `
    } else if (action === 'delete' && id) {
      await sql`DELETE FROM portfolio_projects WHERE id = ${id};`
    }

    const rows = await sql`
      SELECT 
        id, title, subtitle, category, year, status, description, 
        live_link, github_link, image, tags, display_order, is_featured, created_at, updated_at
      FROM portfolio_projects
      WHERE is_featured = true
      ORDER BY display_order ASC, updated_at DESC;
    `
    return NextResponse.json({ projects: rows.map(normalizeProject), success: true })
  } catch (error) {
    console.error('Failed to update projects:', error)
    return NextResponse.json({ error: 'Failed to update projects' }, { status: 500 })
  }
}
