import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

const title = 'Vishal Raavi | Software Security Engineer'
const description =
  'Software Security Engineer with the OSCP and an M.Eng. in Cybersecurity from the University of Maryland. Application security, threat modeling, penetration testing, and cloud security.'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: title,
    template: '%s',
  },
  description,
  keywords: [
    'Vishal Raavi', 'Software Security Engineer', 'Application Security', 'Product Security',
    'Cybersecurity', 'OSCP', 'Penetration Testing', 'Threat Modeling', 'Burp Suite',
    'Cloud Security', 'AWS', 'React', 'Flask',
  ],
  authors: [{ name: 'Vishal Raavi' }],
  creator: 'Vishal Raavi',
  openGraph: {
    title,
    description,
    siteName: 'Vishal Raavi',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0A0E14' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
}

// Runs synchronously before first paint so the correct theme is applied immediately.
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
    // suppressHydrationWarning: data-theme is set by the inline script before React
    // hydrates, which would otherwise report a mismatch.
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
