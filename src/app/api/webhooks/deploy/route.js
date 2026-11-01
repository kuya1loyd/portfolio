import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

// Maps repo names or deployment aliases to portfolio project IDs
const PROJECT_ALIASES = {
  rentrack: 'rentrack',
  'rentrack-beige': 'rentrack',
  'rentrack-app': 'rentrack',
  buildtrack: 'buildtrack-application',
  'buildtrack-application': 'buildtrack-application',
  'buildtrack-app': 'buildtrack-application',
  carvex: 'carvex-carparts',
  'carvex-carparts': 'carvex-carparts',
  'carvex-carparts-omega': 'carvex-carparts',
  omnipouch: 'omnipouch'
}

function resolveProjectId(identifier) {
  if (!identifier) return null
  const cleaned = String(identifier).toLowerCase().trim()
  if (PROJECT_ALIASES[cleaned]) return PROJECT_ALIASES[cleaned]
  
  for (const [key, val] of Object.entries(PROJECT_ALIASES)) {
    if (cleaned.includes(key)) return val
  }
  return cleaned
}

/**
 * Universal Deployment & Git Push Webhook
 * Supports:
 * 1. Vercel deployment webhooks (deployment.building, deployment.succeeded, etc.)
 * 2. GitHub push webhooks (repository.name, commits)
 * 3. Simple CI/CD or browser ping (/api/webhooks/deploy?project=rentrack&status=building)
 */
export async function POST(req) {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 503 })
  }

  try {
    const urlObj = new URL(req.url)
    const queryProject = urlObj.searchParams.get('project') || urlObj.searchParams.get('id')
    const queryStatus = urlObj.searchParams.get('status')
    const queryLiveUrl = urlObj.searchParams.get('url')

    let body = {}
    try {
      body = await req.json()
    } catch {
      // Body might be empty or query-only
    }

    let targetProjectId = resolveProjectId(
      queryProject ||
      body.projectId ||
      body.project ||
      body.id ||
      body.deployment?.name ||
      body.repository?.name ||
      body.project?.name
    )

    let newStatus = queryStatus || body.status
    let newLiveUrl = queryLiveUrl || body.deployment?.url || body.url || null

    if (newLiveUrl && !newLiveUrl.startsWith('http')) {
      newLiveUrl = `https://${newLiveUrl}`
    }

    // 1. Check for Vercel Deployment Webhook payload
    const vercelType = body.type || body.event
    if (vercelType) {
      if (
        vercelType.includes('building') ||
        vercelType.includes('created') ||
        vercelType.includes('queued')
      ) {
        newStatus = 'building'
      } else if (
        vercelType.includes('succeeded') ||
        vercelType.includes('ready') ||
        vercelType.includes('promoted')
      ) {
        newStatus = 'live'
      } else if (vercelType.includes('error') || vercelType.includes('failed')) {
        newStatus = 'building'
      }
    }

    // 2. Check for GitHub push webhook payload
    if (body.commits && body.repository) {
      targetProjectId = resolveProjectId(body.repository.name)
      // When a new commit is pushed, mark it as 'building' or 'updated'
      newStatus = newStatus || 'building'
    }

    // Default to 'live' if not specified
    newStatus = (newStatus || 'live').toLowerCase()

    if (!targetProjectId) {
      return NextResponse.json(
        {
          error: 'Could not determine project ID. Provide ?project=rentrack or JSON { "project": "rentrack" }',
          aliases: PROJECT_ALIASES
        },
        { status: 400 }
      )
    }

    // Update the database record in Neon
    if (newLiveUrl) {
      await sql`
        UPDATE portfolio_projects
        SET status = ${newStatus}, live_link = ${newLiveUrl}, updated_at = NOW()
        WHERE id = ${targetProjectId};
      `
    } else {
      await sql`
        UPDATE portfolio_projects
        SET status = ${newStatus}, updated_at = NOW()
        WHERE id = ${targetProjectId};
      `
    }

    const [updatedRow] = await sql`
      SELECT id, title, status, live_link, updated_at
      FROM portfolio_projects
      WHERE id = ${targetProjectId};
    `

    return NextResponse.json({
      success: true,
      message: `Project ${targetProjectId} automatically updated to '${newStatus}'!`,
      project: updatedRow
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message || 'Webhook failed' }, { status: 500 })
  }
}

// Support GET requests for easy 1-click test pings in browser or webhook monitors
export async function GET(req) {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 503 })
  }

  const urlObj = new URL(req.url)
  const queryProject = urlObj.searchParams.get('project') || urlObj.searchParams.get('id')
  const queryStatus = urlObj.searchParams.get('status')
  const queryLiveUrl = urlObj.searchParams.get('url')

  if (!queryProject) {
    return NextResponse.json({
      message: 'Deployment Webhook Endpoint is active!',
      usage: 'GET /api/webhooks/deploy?project=rentrack&status=building (or status=live)'
    })
  }

  const targetProjectId = resolveProjectId(queryProject)
  const newStatus = (queryStatus || 'live').toLowerCase()

  try {
    if (queryLiveUrl) {
      await sql`
        UPDATE portfolio_projects
        SET status = ${newStatus}, live_link = ${queryLiveUrl}, updated_at = NOW()
        WHERE id = ${targetProjectId};
      `
    } else {
      await sql`
        UPDATE portfolio_projects
        SET status = ${newStatus}, updated_at = NOW()
        WHERE id = ${targetProjectId};
      `
    }

    const [updatedRow] = await sql`
      SELECT id, title, status, live_link, updated_at
      FROM portfolio_projects
      WHERE id = ${targetProjectId};
    `

    return NextResponse.json({
      success: true,
      message: `Project ${targetProjectId} automatically updated to '${newStatus}'!`,
      project: updatedRow
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

