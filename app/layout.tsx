import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

const title = 'Vishal Raavi | Software Security Engineer'
const description =
  'M.Eng. Cybersecurity at UMD (GPA 3.88), OSCP-certified. Software Security Engineer specializing in secure SDLC, application security testing, and cloud security.'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  title,
  description,
  keywords: [
    'Vishal Raavi', 'Software Security Engineer', 'Application Security',
    'Cybersecurity', 'OSCP', 'Penetration Testing', 'Cloud Security', 'AWS', 'React', 'Flask',
  ],
  authors: [{ name: 'Vishal Raavi' }],
  openGraph: {
    title,
    description,
    siteName: 'Vishal Raavi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#070B12' },
    { media: '(prefers-color-scheme: light)', color: '#EFF3F8' },
  ],
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
