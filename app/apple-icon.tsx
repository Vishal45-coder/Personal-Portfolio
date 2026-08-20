import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0E14',
          color: '#38BDF8',
          fontSize: 84,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: -2,
        }}
      >
        VR
      </div>
    ),
    { ...size }
  )
}
