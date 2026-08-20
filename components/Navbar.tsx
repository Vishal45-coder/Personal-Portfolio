'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Linkedin, Github, FileText } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { profile } from '@/lib/content'

const navLinks = [
  { id: 'about',    label: 'About',    href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'blog',     label: 'Blog',     href: '/blog' },
  { id: 'skills',   label: 'Skills',   href: '/#skills' },
  { id: 'contact',  label: 'Contact',  href: '/#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)

    if (pathname !== '/') {
      const match = navLinks.find(
        (l) => !l.href.startsWith('/#') && pathname.startsWith(l.href)
      )
      setActive(match?.id ?? '')
      return
    }

    // On the home page, track which anchored section is in view.
    const anchorIds = navLinks.filter((l) => l.href.startsWith('/#')).map((l) => l.href.slice(2))
    const onScroll = () => {
      let current = ''
      for (const id of anchorIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const handleClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ background: 'var(--navbar-bg)' }}
    >
      <div className="max-w-content mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          <Link href="/" className="flex flex-col leading-tight flex-shrink-0">
            <span className="font-bold tracking-tight text-c-text">{profile.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-c-muted">
              {profile.role}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium rounded transition-colors duration-150 hover:text-c-cyan"
                  style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-sub)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-colors duration-150"
              style={{
                border: '1px solid var(--c-cyan-border)',
                color: 'var(--c-cyan)',
                background: 'var(--c-cyan-tint)',
              }}
            >
              <FileText size={14} /> Resume
            </a>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-c-sub"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t">
          <div className="max-w-content mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="py-2 text-sm font-medium"
                  style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-sub)' }}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="flex items-center gap-4 pt-3 mt-2 border-t">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-c-cyan"
              >
                Resume
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-c-muted">
                <Linkedin size={16} />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-c-muted">
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
