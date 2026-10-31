import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

const VISIT_DEDUPE_MINUTES = 30
const SIGN_COOLDOWN_SECONDS = 15

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return neon(url)
}

function flagFromCode(code) {
  if (!code || code.length !== 2) return '🌐'
  const base = 127397
  return String.fromCodePoint(...code.toUpperCase().split('').map((c) => base + c.charCodeAt(0)))
}

function countryName(code) {
  if (!code) return null
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase()) || null
  } catch {
    return null
  }
}

const TZ_COUNTRY_MAP = {
  'Asia/Manila': { code: 'PH', city: null },
  'Asia/Tokyo': { code: 'JP', city: 'Tokyo' },
  'Asia/Singapore': { code: 'SG', city: 'Singapore' },
  'Asia/Seoul': { code: 'KR', city: 'Seoul' },
  'Asia/Hong_Kong': { code: 'HK', city: 'Hong Kong' },
  'Asia/Taipei': { code: 'TW', city: 'Taipei' },
  'Asia/Bangkok': { code: 'TH', city: 'Bangkok' },
  'Asia/Jakarta': { code: 'ID', city: 'Jakarta' },
  'Asia/Kuala_Lumpur': { code: 'MY', city: 'Kuala Lumpur' },
  'Asia/Ho_Chi_Minh': { code: 'VN', city: 'Ho Chi Minh' },
  'Asia/Kolkata': { code: 'IN', city: null },
  'Asia/Dubai': { code: 'AE', city: 'Dubai' },
  'Europe/London': { code: 'GB', city: 'London' },
  'Europe/Berlin': { code: 'DE', city: 'Berlin' },
  'Europe/Paris': { code: 'FR', city: 'Paris' },
  'Australia/Sydney': { code: 'AU', city: 'Sydney' },
  'America/New_York': { code: 'US', city: 'New York' },
  'America/Chicago': { code: 'US', city: 'Chicago' },
  'America/Denver': { code: 'US', city: 'Denver' },
  'America/Los_Angeles': { code: 'US', city: 'Los Angeles' },
  'America/Toronto': { code: 'CA', city: 'Toronto' },
  'America/Vancouver': { code: 'CA', city: 'Vancouver' }
}

function readGeo(req, tz) {
  const h = req.headers
  const code = (h.get('x-vercel-ip-country') || h.get('cf-ipcountry') || '').toUpperCase()
  let city = h.get('x-vercel-ip-city') || ''
  try {
    city = decodeURIComponent(city)
  } catch {
    // keep raw value
  }
  const validCode = /^[A-Z]{2}$/.test(code) && code !== 'XX' ? code : null
  if (validCode) {
    return {
      city: city.slice(0, 80) || null,
      countryCode: validCode,
      country: countryName(validCode)
    }
  }

  const tzEntry = tz && TZ_COUNTRY_MAP[tz]
  if (tzEntry) {
    return {
      city: tzEntry.city,
      countryCode: tzEntry.code,
      country: countryName(tzEntry.code)
    }
  }

  if (tz && tz.includes('/')) {
    const tzCity = tz.split('/').pop().replace(/_/g, ' ').slice(0, 80)
    return {
      city: tzCity || null,
      countryCode: null,
      country: null
    }
  }

  return {
    city: null,
    countryCode: null,
    country: null
  }
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function shapeRow(r) {
  return {
    id: String(r.id),
    visitorId: r.visitor_id,
    kind: r.kind,
    name: r.name,
    role: r.role,
    company: r.company,
    message: r.message,
    avatar: r.avatar,
    city: r.city,
    country: r.country,
    flag: flagFromCode(r.country_code),
    device: r.device,
    createdAt: new Date(r.created_at).toISOString()
  }
}

async function loadSnapshot(sql) {
  const [stats] = await sql`
    SELECT
      COUNT(DISTINCT visitor_id)::int AS unique_visitors,
      COUNT(*)::int AS total_visits,
      COUNT(*) FILTER (WHERE kind = 'guest')::int AS guest_entries
    FROM visitors`

  const guests = await sql`
    SELECT * FROM visitors
    WHERE kind = 'guest' AND name IS NOT NULL AND name <> ''
    ORDER BY created_at DESC
    LIMIT 24`

  return {
    configured: true,
    stats: {
      uniqueVisitors: stats?.unique_visitors ?? 0,
      totalVisits: stats?.total_visits ?? 0,
      guestEntries: stats?.guest_entries ?? 0
    },
    guests: guests.map(shapeRow),
    visits: []
  }
}

export async function GET() {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({
      configured: false,
      stats: { uniqueVisitors: 0, totalVisits: 0, guestEntries: 0 },
      guests: [],
      visits: []
    })
  }

  try {
    return NextResponse.json(await loadSnapshot(sql))
  } catch {
    return NextResponse.json({ error: 'Failed to load visitors' }, { status: 500 })
  }
}

export async function POST(req) {
  const sql = getSql()
  if (!sql) {
    return NextResponse.json({ error: 'Visitor database is not configured' }, { status: 503 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (body.action === 'delete' && body.id) {
    try {
      const targetId = Number(body.id)
      if (Number.isFinite(targetId)) {
        await sql`DELETE FROM visitors WHERE id = ${targetId}`
      }
      return NextResponse.json(await loadSnapshot(sql))
    } catch {
      return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 })
    }
  }

  const visitorId = clean(body.visitorId, 64)
  if (!visitorId) {
    return NextResponse.json({ error: 'Missing visitor id' }, { status: 400 })
  }

  const tz = clean(body.timezone, 64)
  const geo = readGeo(req, tz)
  const device = clean(body.device, 80) || null

  try {
    if (body.action === 'visit') {
      const recent = await sql`
        SELECT 1 FROM visitors
        WHERE visitor_id = ${visitorId} AND kind = 'visit'
          AND created_at > now() - make_interval(mins => ${VISIT_DEDUPE_MINUTES})
        LIMIT 1`

      if (recent.length === 0) {
        const knownName = clean(body.name, 50) || null
        await sql`
          INSERT INTO visitors (visitor_id, kind, name, city, country, country_code, device)
          VALUES (${visitorId}, 'visit', ${knownName}, ${geo.city}, ${geo.country}, ${geo.countryCode}, ${device})`
      }
      return NextResponse.json(await loadSnapshot(sql))
    }

    if (body.action === 'sign') {
      const name = clean(body.name, 50)
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 })
      }

      const cooldown = await sql`
        SELECT 1 FROM visitors
        WHERE visitor_id = ${visitorId} AND kind = 'guest'
          AND created_at > now() - make_interval(secs => ${SIGN_COOLDOWN_SECONDS})
        LIMIT 1`
      if (cooldown.length > 0) {
        return NextResponse.json(
          { error: 'Please wait a moment before signing again' },
          { status: 429 }
        )
      }

      const typedLocation = clean(body.location, 80)
      const role = clean(body.role, 60) || null
      const company = clean(body.company, 60) || null
      const message = clean(body.message, 240) || null
      const avatar = clean(body.avatar, 8) || '👋'

      await sql`
        INSERT INTO visitors
          (visitor_id, kind, name, role, company, message, avatar, city, country, country_code, device)
        VALUES
          (${visitorId}, 'guest', ${name}, ${role}, ${company}, ${message}, ${avatar},
           ${typedLocation || geo.city}, ${geo.country}, ${geo.countryCode}, ${device})`

      return NextResponse.json(await loadSnapshot(sql))
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Failed to save visitor' }, { status: 500 })
  }
}
