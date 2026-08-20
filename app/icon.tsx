import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070B12',
          color: '#22D3EE',
          fontSize: 17,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: -0.5,
        }}
      >
        VR
      </div>
    ),
    { ...size }
  )
}
