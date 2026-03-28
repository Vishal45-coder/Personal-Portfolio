import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // These map Tailwind classes → CSS variables, making ALL
        // Tailwind color utilities (text-c-sub, bg-ink, etc.) theme-aware.
        'ink':      'var(--ink)',
        'ink-1':    'var(--ink-1)',
        'ink-2':    'var(--ink-2)',
        'c-text':   'var(--c-text)',
        'c-sub':    'var(--c-sub)',
        'c-muted':  'var(--c-muted)',
        'c-cyan':   'var(--c-cyan)',
        'c-violet': 'var(--c-violet)',
        'c-green':  'var(--c-green)',
        'c-amber':  'var(--c-amber)',
        'c-rose':   'var(--c-rose)',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.5s ease-out forwards',
        'blink':     'blink 1.2s step-end infinite',
        'toggle-spin': 'toggleSpin 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        toggleSpin: {
          '0%':   { transform: 'rotate(0deg) scale(1)' },
          '50%':  { transform: 'rotate(180deg) scale(0.75)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
