import { ImageResponse } from 'next/og'
import { siteConfig } from '@/content/site'

export const alt = `${siteConfig.name} - ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Open Graph card generated at build/request time rather than shipped as a
 * static PNG, so it always reflects the copy in `siteConfig`.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#090909',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            left: 420,
            width: 700,
            height: 500,
            background: 'radial-gradient(circle, rgba(229,72,77,0.30), rgba(9,9,9,0))',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#E5484D', display: 'flex' }} />
          <div style={{ color: '#929292', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase' }}>
            {siteConfig.role}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#F2F0EB', fontSize: 92, lineHeight: 1.05, letterSpacing: -3, maxWidth: 1000 }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(242,240,235,0.14)',
            paddingTop: 28,
          }}
        >
          <div style={{ color: '#F2F0EB', fontSize: 34 }}>{siteConfig.name}</div>
          <div style={{ color: '#929292', fontSize: 26 }}>AWS · Terraform · Iceberg · Next.js</div>
        </div>
      </div>
    ),
    size,
  )
}
