import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Vishal Raavi, Software Security Engineer'

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
          padding: '80px',
          background: '#0A0E14',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, color: '#38BDF8', letterSpacing: 4, textTransform: 'uppercase' }}>
          Software Security Engineer
        </div>

        <div style={{ display: 'flex', fontSize: 82, fontWeight: 800, color: '#E9EEF5', marginTop: 20 }}>
          Vishal Raavi
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#A3AFC0', marginTop: 24, maxWidth: 900 }}>
          Application security, threat modeling, penetration testing, and cloud security.
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 46 }}>
          {['OSCP Certified', '100+ apps assessed', '50% fewer defects', 'M.Eng. Cybersecurity'].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                fontSize: 20,
                color: '#38BDF8',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                background: 'rgba(56, 189, 248, 0.10)',
                borderRadius: 8,
                padding: '10px 18px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
