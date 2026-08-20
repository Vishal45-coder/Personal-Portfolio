'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Linkedin } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { id: 'about',   label: 'About',   href: '/about' },
  { id: 'skills',  label: 'Skills',  href: '/#skills' },
  { id: 'blog',    label: 'Blog',    href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActive]  = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname.startsWith('/blog') ? 'blog' : pathname.startsWith('/about') ? 'about' : '')
      return
    }
    const onScroll = () => {
      const ids = navLinks
        .filter((l) => l.href.startsWith('/#'))
        .map((l) => l.href.slice(2))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id)
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--navbar-bg)', borderColor: 'var(--c-line)' }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-semibold text-c-text transition-colors duration-150 hover:text-c-cyan">
            Vishal Raavi
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm transition-colors duration-150 hover:text-c-cyan"
                  style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-muted)' }}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href="/Vishal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-2 text-c-muted transition-colors duration-150 hover:text-c-cyan"
            >
              Resume
            </a>
            <a
              href="https://linkedin.com/in/vishalraavi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-c-muted transition-colors duration-150 hover:text-c-cyan"
            >
              <Linkedin size={16} />
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1 text-c-muted"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-3 flex flex-col gap-3"
          style={{ borderColor: 'var(--c-line)' }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm"
                style={{ color: isActive ? 'var(--c-text)' : 'var(--c-muted)' }}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="/Vishal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-2 text-c-muted"
          >
            Resume
          </a>
          <a
            href="https://linkedin.com/in/vishalraavi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-c-muted transition-colors duration-150 hover:text-c-cyan"
          >
            LinkedIn
          </a>
        </div>
      )}
    </nav>
  )
}
