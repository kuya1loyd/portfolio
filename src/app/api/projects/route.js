import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

const FALLBACK_PROJECTS = [
  {
    id: 'rentrack',
    title: 'RenTrack',
    subtitle: 'Web application · Property & Rental Management',
    year: '2026',
    category: 'Web Application',
    status: 'live',
    description:
      'A comprehensive property rental management, automated billing, payments, and receivables monitoring system built with Next.js. Streamlines lease contracts, tenant payment histories, monthly statements, and occupancy telemetry in an intuitive dashboard designed to replace fragmented spreadsheets.',
    liveLink: 'https://rentrack-beige.vercel.app/',
    githubLink: null,
    image: '/images/projects/rentrack.png',
    tags: ['Next.js 15', 'React 19', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
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
    githubLink: null,
    image: '/images/projects/buildtrack_phone.png',
    tags: ['Flutter', 'Dart', 'Neon Postgres', 'REST API', 'Cross-Platform'],
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
    githubLink: null,
    image: '/images/projects/carvex.png',
    tags: ['React', 'Vite', 'E-Commerce', 'Tailwind CSS', 'Frictionless POS'],
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

export async function GET() {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ projects: FALLBACK_PROJECTS, source: 'fallback' })
  }

  try {
    const rows = await sql`
      SELECT 
        id, title, subtitle, category, year, status, description, 
        live_link, github_link, image, tags, display_order, is_featured, created_at, updated_at
      FROM portfolio_projects
      WHERE is_featured = true
      ORDER BY display_order ASC, updated_at DESC;
    `

    if (!rows || rows.length === 0) {
      return NextResponse.json({ projects: FALLBACK_PROJECTS, source: 'fallback-empty' })
    }

    const projects = rows.map(normalizeProject)
    return NextResponse.json(
      { projects, source: 'neon' },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    )
  } catch (error) {
    console.error('Failed to fetch projects from Neon:', error)
    return NextResponse.json({ projects: FALLBACK_PROJECTS, source: 'fallback-error' })
  }
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

