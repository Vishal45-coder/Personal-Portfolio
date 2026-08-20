import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Vishal Raavi — Software Security Engineer'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#070B12',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 700, color: '#E8EDF5' }}>Vishal Raavi</div>
        <div style={{ fontSize: 32, color: '#22D3EE', marginTop: 18 }}>Software Security Engineer</div>
        <div style={{ fontSize: 24, color: '#94A3B8', marginTop: 28 }}>
          OSCP &middot; M.Eng. Cybersecurity, University of Maryland &middot; Application &amp; Cloud Security
        </div>
      </div>
    ),
    { ...size }
  )
}
