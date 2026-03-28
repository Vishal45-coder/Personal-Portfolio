'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // Read from storage / system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('vr-theme') as Theme | null
    const resolved: Theme =
      stored ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(resolved)
    document.documentElement.setAttribute('data-theme', resolved)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'

      // Add transition class for smooth color morph
      document.documentElement.classList.add('theme-switching')
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('vr-theme', next)

      // Remove transition class once animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-switching')
      }, 350)

      return next
    })
  }, [])

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)
