'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Download } from 'lucide-react'

const roles = [
  'SOFTWARE ENGINEER',
  'SECURITY ENGINEER',
  'PENETRATION TESTER',
  'FULL-STACK DEVELOPER',
]

const stats = [
  { value: '3.88', label: 'GPA · M.Eng.' },
  { value: '2+',   label: 'Years in Production' },
  { value: '5',    label: 'Security Labs' },
  { value: '17.4M+', label: 'Log Entries Indexed' },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length)
        setFading(false)
      }, 280)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-ink grid-bg">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/3 w-[700px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(139,92,246,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-12">
        {/* TOP STRIP */}
        <div
          className="flex items-center justify-between mb-5"
          style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-c-muted uppercase">
            Vishal Raavi
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  backgroundColor: 'var(--c-green)',
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />
              <span
                className="relative rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: 'var(--c-green)' }}
              />
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--c-green)' }}>
              Available for Hire
            </span>
          </div>
        </div>

        {/* Thin rule */}
        <hr
          className="h-rule mb-10 sm:mb-14"
          style={{ animation: 'fadeIn 0.5s ease-out 0.1s both' }}
        />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Cycling role label */}
          <div
            className="mb-5 h-5 overflow-hidden"
            style={{ animation: 'fadeUp 0.6s ease-out 0.15s both' }}
          >
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{
                color: 'var(--c-cyan)',
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.28s ease',
              }}
            >
              {roles[roleIdx]}
            </span>
          </div>

          {/* Hero headline */}
          <div style={{ animation: 'fadeUp 0.7s ease-out 0.25s both' }}>
            <h1 className="font-display font-extrabold leading-[0.92] tracking-tight">
              <span
                className="block text-c-text"
                style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)' }}
              >
                BUILDING SYSTEMS
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)',
                  color: 'var(--c-cyan)',
                }}
              >
                THAT HOLD.
              </span>
            </h1>
          </div>

          {/* Tagline + CTAs */}
          <div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            style={{ animation: 'fadeUp 0.7s ease-out 0.4s both' }}
          >
            <p className="text-c-sub text-sm sm:text-base leading-relaxed max-w-xs">
              M.Eng. Cybersecurity · UMD. Building production systems for 2+ years.
              Breaking them on purpose.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] tracking-[0.12em] uppercase font-bold transition-opacity duration-200 hover:opacity-80"
                style={{ background: 'var(--c-cyan)', color: 'var(--ink)' }}
              >
                View Work
                <ArrowRight size={12} />
              </button>
              <a
                href="/Vishal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:bg-white/5"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--c-sub)',
                }}
              >
                <Download size={12} />
                Resume
              </a>
            </div>
          </div>
        </div>

        {/* Thin rule */}
        <hr
          className="h-rule mt-10 sm:mt-14 mb-7"
          style={{ animation: 'fadeIn 0.6s ease-out 0.6s both' }}
        />

        {/* BOTTOM STATS STRIP */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0"
          style={{ animation: 'fadeUp 0.6s ease-out 0.7s both' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="sm:px-6 sm:border-r last:border-0"
              style={{ borderColor: 'var(--c-line)' }}
            >
              <div
                className="font-display text-3xl sm:text-4xl font-bold leading-none mb-1"
                style={{ color: 'var(--c-cyan)' }}
              >
                {s.value}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-c-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
