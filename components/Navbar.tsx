'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Security',   href: '#security' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActive]  = useState('')
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const ids = navLinks.map((l) => l.href.slice(1))
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = (href: string) => {
    setMobileOpen(false)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'border-b' : ''}`}
      style={{
        background: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderColor: 'var(--c-line)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-display text-xl font-black text-c-text tracking-tight leading-none">
              VR
            </span>
            <span className="block font-mono text-[9px] tracking-[0.18em] text-c-muted uppercase leading-none mt-0.5">
              Security Engineer
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <motion.button
                  key={link.href}
                  onClick={() => nav(link.href)}
                  className="relative px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-200"
                  style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-muted)' }}
                  whileHover={reduced ? {} : { color: isActive ? 'var(--c-cyan)' : 'var(--c-sub)' }}
                  whileTap={reduced ? {} : { scale: 0.95 }}
                >
                  {link.label}
                  {/* Active underline indicator with layoutId for smooth transition */}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{ background: 'var(--c-cyan)' }}
                      layoutId="nav-indicator"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right cluster: Resume + Toggle */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <motion.a
              href="/Vishal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded font-mono text-[11px] tracking-[0.12em] uppercase"
              style={{
                border: '1px solid var(--c-cyan-border)',
                color: 'var(--c-cyan)',
              }}
              whileHover={reduced ? {} : { backgroundColor: 'var(--c-cyan-tint)', transition: { duration: 0.15 } }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              Resume
            </motion.a>
            <ThemeToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-c-muted"
              aria-label="Toggle menu"
              whileHover={reduced ? {} : { color: 'var(--c-sub)' }}
              whileTap={reduced ? {} : { scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={reduced ? {} : { opacity: 0, rotate: -90 }}
                  animate={reduced ? {} : { opacity: 1, rotate: 0 }}
                  exit={reduced ? {} : { opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu — animated with AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={reduced ? {} : { height: 0, opacity: 0 }}
            animate={reduced ? {} : { height: 'auto', opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: ease.inOut }}
          >
            <div
              className="px-6 py-4 flex flex-col gap-0.5 border-b"
              style={{
                background: 'var(--mobile-menu-bg)',
                backdropFilter: 'blur(20px)',
                borderColor: 'var(--c-line)',
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => nav(link.href)}
                    className="w-full text-left px-3 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase"
                    style={{ color: isActive ? 'var(--c-cyan)' : 'var(--c-muted)' }}
                    initial={reduced ? {} : { opacity: 0, x: -12 }}
                    animate={reduced ? {} : { opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
              <motion.a
                href="/Vishal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded font-mono text-[11px] tracking-[0.12em] uppercase"
                style={{
                  border: '1px solid var(--c-cyan-border)',
                  color: 'var(--c-cyan)',
                }}
                initial={reduced ? {} : { opacity: 0, y: 8 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.25 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
