'use client'

import { useEffect, useCallback } from 'react'

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

export default function GoogleOneTap() {
  const handleCredentialResponse = useCallback(async (response) => {
    try {
      if (!response.credential) return

      // Decode Google JWT payload safely without extra dependencies
      const base64Url = response.credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      const payload = JSON.parse(jsonPayload)

      if (!payload.name) return

      localStorage.setItem('jl-portfolio-visitor-name', payload.name)
      if (payload.picture) {
        localStorage.setItem('jl-portfolio-visitor-avatar', payload.picture)
      }

      // Automatically register real Google name and profile icon to database
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sign',
          visitorId: getVisitorId(),
          name: payload.name,
          avatar: payload.picture || '👤',
          role: 'Google Visitor',
          device: describeDevice(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
        })
      })

      if (res.ok) {
        window.dispatchEvent(new Event('visitor-updated'))
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    // Don't reprompt if already identified in this browser
    const alreadyIdentified = localStorage.getItem('jl-portfolio-visitor-name')
    if (alreadyIdentified) return

    const resolveAndInit = async () => {
      let clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      if (!clientId) {
        try {
          const res = await fetch('/api/visitors', { cache: 'no-store' })
          if (res.ok) {
            const data = await res.json()
            if (data?.googleClientId) clientId = data.googleClientId
          }
        } catch {
          // ignore
        }
      }

      if (!clientId || cancelled) return

      const loadScript = () => {
        if (document.getElementById('google-gsi-script')) {
          initOneTap(clientId)
          return
        }
        const script = document.createElement('script')
        script.id = 'google-gsi-script'
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = () => initOneTap(clientId)
        document.body.appendChild(script)
      }

      const initOneTap = (activeId) => {
        if (typeof window === 'undefined' || !window.google?.accounts?.id) return

        try {
          window.google.accounts.id.initialize({
            client_id: activeId,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: false
          })

          // Render official Google button if container is present on the page
          const btnContainer = document.getElementById('google-signin-btn-container')
          if (btnContainer && btnContainer.childNodes.length === 0) {
            window.google.accounts.id.renderButton(btnContainer, {
              theme: 'outline',
              size: 'medium',
              text: 'continue_with',
              shape: 'pill'
            })
          }

          // Chrome FedCM requires a secure HTTPS context. On HTTP (localhost),
          // Chrome rejects silent FedCM with NetworkError, so we only invoke One Tap prompt on HTTPS.
          if (window.location.protocol === 'https:') {
            window.google.accounts.id.prompt()
          }
        } catch {
          // ignore
        }
      }

      loadScript()
    }

    resolveAndInit()

    return () => {
      cancelled = true
    }
  }, [handleCredentialResponse])

  return null
}

