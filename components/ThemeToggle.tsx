'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [mounted, setMounted]   = useState(false)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => setMounted(true), [])

  // Reserve space during SSR to prevent layout shift
  if (!mounted) {
    return (
      <div
        style={{ width: 34, height: 34, flexShrink: 0 }}
        aria-hidden="true"
      />
    )
  }

  const handleClick = () => {
    setSpinning(true)
    toggle()
    setTimeout(() => setSpinning(false), 420)
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        borderRadius: 6,
        border: '1px solid var(--toggle-border)',
        background: 'var(--toggle-bg)',
        color: 'var(--c-sub)',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--toggle-hover)'
        e.currentTarget.style.color = 'var(--c-cyan)'
        e.currentTarget.style.borderColor = 'var(--c-cyan-border)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--toggle-bg)'
        e.currentTarget.style.color = 'var(--c-sub)'
        e.currentTarget.style.borderColor = 'var(--toggle-border)'
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: spinning ? 'toggleSpin 0.42s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        }}
      >
        {isDark ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
      </span>
    </button>
  )
}
