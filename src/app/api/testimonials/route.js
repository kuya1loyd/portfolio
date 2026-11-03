import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function GET() {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ testimonials: [] })
  }

  try {
    const rows = await sql`
      SELECT
        id,
        name,
        role,
        company,
        category,
        rating,
        tag,
        avatar,
        quote,
        project,
        created_at as "createdAt"
      FROM testimonials
      ORDER BY created_at DESC
      LIMIT 50
    `
    return NextResponse.json({ testimonials: rows || [] })
  } catch (err) {
    console.warn('Database delay reading testimonials:', err?.message || err)
    return NextResponse.json({ testimonials: [] })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const name = clean(body.name, 100)
    const quote = clean(body.quote, 600)
    const role = clean(body.role, 100) || 'Collaborator'
    const company = clean(body.company, 100) || 'Partner / Peer'
    const category = clean(body.category, 60) || 'Peers & Teammates'
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5))
    const tag = clean(body.tag, 60) || 'Verified Feedback'
    const avatar = clean(body.avatar, 500) || ''
    const project = clean(body.project, 150) || 'Collaborative Work'

    if (!name || !quote) {
      return NextResponse.json({ error: 'Name and feedback message are required' }, { status: 400 })
    }

    const sql = getSql()
    let savedRow = null

    if (sql) {
      try {
        const [inserted] = await sql`
          INSERT INTO testimonials (
            name, role, company, category, rating, tag, avatar, quote, project
          ) VALUES (
            ${name}, ${role}, ${company}, ${category}, ${rating}, ${tag}, ${avatar}, ${quote}, ${project}
          )
          RETURNING
            id,
            name,
            role,
            company,
            category,
            rating,
            tag,
            avatar,
            quote,
            project,
            created_at as "createdAt"
        `
        savedRow = inserted
      } catch (dbErr) {
        console.warn('Could not insert testimonial into Neon DB:', dbErr?.message || dbErr)
      }
    }

    const result = savedRow || {
      id: `local-${Date.now()}`,
      name,
      role,
      company,
      category,
      rating,
      tag,
      avatar,
      quote,
      project,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({ success: true, testimonial: result })
  } catch (err) {
    console.error('Error handling testimonial submission:', err)
    return NextResponse.json({ error: 'Failed to process feedback submission' }, { status: 500 })
  }
}

