import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vishal Raavi | Software Engineer & Security Engineer',
  description:
    'M.Eng. Cybersecurity at UMD (GPA 3.88). 2+ years building full-stack production systems (React.js, Flask, Docker, AWS) with hands-on penetration testing experience. Targeting roles at the intersection of secure software engineering and information security.',
  keywords: [
    'Vishal Raavi',
    'Software Engineer',
    'Security Engineer',
    'Cybersecurity',
    'Full Stack Developer',
    'React',
    'Flask',
    'AWS',
    'Penetration Testing',
  ],
  authors: [{ name: 'Vishal Raavi' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#070B12' }}>{children}</body>
    </html>
  )
}
