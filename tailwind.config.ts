import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind utilities to CSS variables so every color is theme-aware.
        'ink':     'var(--ink)',
        'ink-1':   'var(--ink-1)',
        'ink-2':   'var(--ink-2)',
        'c-text':  'var(--c-text)',
        'c-sub':   'var(--c-sub)',
        'c-muted': 'var(--c-muted)',
        'c-cyan':  'var(--c-cyan)',
        'c-green': 'var(--c-green)',
        'c-amber': 'var(--c-amber)',
      },
      borderColor: {
        DEFAULT: 'var(--c-line)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      maxWidth: {
        content: '56rem',
      },
    },
  },
  plugins: [],
}

export default config
