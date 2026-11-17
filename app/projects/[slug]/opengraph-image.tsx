import { ImageResponse } from 'next/og'
import { getProject, projects } from '@/content/projects'
import { siteConfig } from '@/content/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Project case study'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  const title = project?.title ?? siteConfig.name
  const subtitle = project?.subtitle ?? siteConfig.role
  const stack = project?.stack.slice(0, 5).join(' · ') ?? ''
  // Satori requires a single text child per node, so the eyebrow is composed here.
  const eyebrow = project?.status ? `Case study · ${project.status}` : 'Case study'

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
            bottom: -200,
            right: -80,
            width: 640,
            height: 520,
            background: 'radial-gradient(circle, rgba(229,72,77,0.26), rgba(9,9,9,0))',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#E5484D', display: 'flex' }} />
          <div style={{ color: '#929292', fontSize: 24, letterSpacing: 4, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ color: '#F2F0EB', fontSize: 78, lineHeight: 1.06, letterSpacing: -2, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ color: '#929292', fontSize: 30, maxWidth: 900 }}>{subtitle}</div>
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
          <div style={{ color: '#F2F0EB', fontSize: 30 }}>{siteConfig.name}</div>
          <div style={{ color: '#929292', fontSize: 24 }}>{stack}</div>
        </div>
      </div>
    ),
    size,
  )
}
