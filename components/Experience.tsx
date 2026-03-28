'use client'

import { useEffect, useRef } from 'react'

interface Role {
  num: string
  period: string
  current: boolean
  role: string
  company: string
  location: string
  accent: string
  bullets: string[]
}

const roles: Role[] = [
  {
    num: '01',
    period: 'Jan 2026 – Present',
    current: true,
    role: 'Software Developer — General Assistant',
    company: 'CALCE · University of Maryland',
    location: 'College Park, MD',
    accent: 'var(--c-cyan)',
    bullets: [
      'Sole architect of the MOSTCOOL Reliability Web Platform — enterprise-grade R(t)/A(t) analysis tool packaged as a Docker image with microservice-decoupled React.js + Flask architecture and 8 REST endpoints',
      'Designed and delivered the MOSTCOOL public web application — 10+ page MPA for a federally funded research initiative; built the software distribution platform that has served 850+ downloads across MOSTCOOL modules; integrated Google Analytics 4',
      'Engineered a Flask REST API with GitHub Issues API integration for automated support ticketing + secure gated ZIP download pipeline deployed via GitHub Actions CI/CD',
      'Refactored platform codebase to remediate OWASP Top 10 vulnerabilities (XSS, Insecure Design) — cut production bugs by 50% through input validation and CORS whitelisting',
    ],
  },
  {
    num: '02',
    period: 'Aug 2024 – Dec 2025',
    current: false,
    role: 'Software Developer — Graduate Research Assistant',
    company: 'CALCE · University of Maryland',
    location: 'College Park, MD',
    accent: 'var(--c-violet)',
    bullets: [
      'Designed 5 physics-based degradation model UIs with bidirectional parameter binding to a 200+ component thermal-hydraulic JSON model',
      'Implemented brute-force state enumeration (Python, NetworkX) — evaluates all 2ᴺ system states via DFS; capped at N=22 (4.2M evaluations) with minimal cut-set approximation',
      'Engineered multi-sheet Excel round-trip serialization (SheetJS, 5 worksheets) with full backward compatibility and orphaned-node cleanup',
      'Reduced API latency by 30% through optimized serialization and request validation to prevent injection attacks',
      'Architected cross-platform Bash/Shell automation suite for Docker orchestration across ARM64 and x86_64',
    ],
  },
  {
    num: '03',
    period: 'Apr 2024 – Aug 2024',
    current: false,
    role: 'Software Developer',
    company: 'CALCE · University of Maryland',
    location: 'College Park, MD',
    accent: 'var(--c-green)',
    bullets: [
      'Built a cross-platform reliability modeling desktop tool (Python Tkinter, NumPy) — improved user modeling efficiency by 60% and optimized performance for large datasets across Windows and macOS',
      'Developed a responsive website (HTML, CSS, JavaScript) — reduced load times by 40%; integrated Google Sheets API as a lightweight serverless backend for research data',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) =>
              el.classList.add('in-view')
            )
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--ink-1)' }}
    >
      {/* Watermark */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(10rem, 22vw, 22rem)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.018)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        04
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14 space-y-4">
          <div className="reveal">
            <span className="label" style={{ color: 'var(--c-cyan)' }}>// 04. EXPERIENCE</span>
          </div>
          <h2
            className="reveal delay-100 font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Where I&apos;ve Worked
          </h2>
          <p className="reveal delay-200 font-mono text-[11px] tracking-[0.12em] uppercase text-c-muted">
            Center for Advanced Life Cycle Engineering (CALCE) · University of Maryland
          </p>
        </div>

        {/* Entries */}
        <div>
          {roles.map((r, i) => (
            <div key={r.num}>
              <hr className="h-rule" />
              <div
                className={`reveal delay-${(i + 1) * 100} py-10 flex flex-col sm:flex-row gap-6 sm:gap-10`}
              >
                {/* Left: number */}
                <div className="flex-shrink-0 sm:w-16">
                  <span
                    className="font-display font-bold leading-none"
                    style={{
                      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                      color: r.accent,
                      opacity: 0.3,
                    }}
                  >
                    {r.num}
                  </span>
                </div>

                {/* Right: content */}
                <div className="flex-1">
                  {/* Period + current */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="font-mono text-[11px] tracking-[0.12em] uppercase"
                      style={{ color: r.accent }}
                    >
                      {r.period}
                    </span>
                    {r.current && (
                      <span
                        className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                        style={{
                          color: 'var(--c-green)',
                          background: 'rgba(16,185,129,0.1)',
                          border: '1px solid rgba(16,185,129,0.2)',
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>

                  {/* Role */}
                  <h3
                    className="font-display font-bold text-c-text leading-tight mb-1"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
                  >
                    {r.role}
                  </h3>

                  {/* Company + location */}
                  <p
                    className="font-mono text-[11px] tracking-[0.1em] uppercase mb-5"
                    style={{ color: r.accent, opacity: 0.75 }}
                  >
                    {r.company} · {r.location}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {r.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm text-c-sub leading-relaxed">
                        <span
                          className="flex-shrink-0 font-mono font-semibold mt-0.5"
                          style={{ color: r.accent }}
                        >
                          →
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <hr className="h-rule" />
        </div>
      </div>
    </section>
  )
}
