import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Vishal Raavi | Software Engineer & Security Engineer',
  description:
    'M.Eng. Cybersecurity at UMD (GPA 3.88). 2+ years building full-stack production systems (React.js, Flask, Docker, AWS) with hands-on penetration testing experience.',
  keywords: [
    'Vishal Raavi', 'Software Engineer', 'Security Engineer',
    'Cybersecurity', 'Full Stack Developer', 'React', 'Flask', 'AWS', 'Penetration Testing',
  ],
  authors: [{ name: 'Vishal Raavi' }],
}

// Runs synchronously before first paint — prevents flash of wrong theme.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('vr-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: data-theme is set by the inline script before
    // React hydrates, which would normally cause a mismatch warning.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
