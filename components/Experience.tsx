'use client'

import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

interface ExperienceEntry {
  period: string
  role: string
  company: string
  location: string
  dotColor: string
  isCurrent: boolean
  bullets: string[]
  delay: string
}

const experiences: ExperienceEntry[] = [
  {
    period: 'Jan 2026 – Present',
    role: 'Software Developer (General Assistant)',
    company: 'CALCE | University of Maryland',
    location: 'College Park, MD',
    dotColor: '#38bdf8',
    isCurrent: true,
    delay: 'delay-100',
    bullets: [
      'Sole architect of the MOSTCOOL Reliability Web Platform — enterprise-grade R(t)/A(t) analysis tool packaged as a locally-run Docker image with microservice-decoupled React.js + Flask architecture and 8 REST endpoints',
      'Designed and delivered the MOSTCOOL public web application — 10+ page MPA serving 850+ software downloads for a federally funded research initiative; integrated Google Analytics 4',
      'Engineered a Flask REST API with GitHub Issues API integration for automated support ticketing + secure gated ZIP download pipeline — deployed via GitHub Actions CI/CD',
      'Refactored platform codebase to remediate OWASP Top 10 vulnerabilities (XSS, Insecure Design) — cut production bugs by 50% through input validation and CORS whitelisting',
    ],
  },
  {
    period: 'Aug 2024 – Dec 2025',
    role: 'Software Developer (Graduate Research Assistant)',
    company: 'CALCE | University of Maryland',
    location: 'College Park, MD',
    dotColor: '#818cf8',
    isCurrent: false,
    delay: 'delay-200',
    bullets: [
      'Designed 5 physics-based degradation model UIs (particle erosion, pipe wall thinning, crystalline fouling, valve MTBF, pump sub-component failure) with bidirectional parameter binding to a 200+ component thermal-hydraulic JSON model',
      'Implemented brute-force state enumeration algorithm (Python, NetworkX) — evaluates all 2ᴺ system states via DFS; capped at N=22 (4.2M evaluations) with minimal cut-set approximation for larger topologies',
      'Engineered multi-sheet Excel round-trip serialization (SheetJS, 5 worksheets) with full backward compatibility and orphaned-node cleanup',
      'Reduced API latency by 30% through optimized serialization and request validation to prevent injection attacks',
      'Architected cross-platform Bash/Shell automation suite for Docker orchestration across ARM64 and x86_64 architectures',
    ],
  },
  {
    period: 'Apr 2024 – Aug 2024',
    role: 'Software Developer',
    company: 'CALCE | University of Maryland',
    location: 'College Park, MD',
    dotColor: '#34d399',
    isCurrent: false,
    delay: 'delay-300',
    bullets: [
      'Built a cross-platform reliability modeling desktop tool (Python Tkinter, NumPy) — improved user modeling efficiency by 60% and optimized performance for large datasets across Windows and macOS',
      'Developed a responsive website (HTML, CSS, JavaScript) — reduced load times by 40%; integrated Google Sheets API as a lightweight serverless backend for research data',
    ],
  },
]

function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className={`reveal-up ${entry.delay} relative flex gap-5 sm:gap-8`}>
      {/* Dot + vertical line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="relative w-4 h-4 rounded-full flex-shrink-0 z-10" style={{ backgroundColor: entry.dotColor }}>
          {entry.isCurrent && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-60"
              style={{ backgroundColor: entry.dotColor }}
            />
          )}
        </div>
        <div className="w-px flex-1 mt-2 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="pb-10 sm:pb-14 flex-1 min-w-0">
        {/* Period + current badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full border"
            style={{
              color: entry.dotColor,
              borderColor: `${entry.dotColor}30`,
              background: `${entry.dotColor}10`,
            }}
          >
            {entry.period}
          </span>
          {entry.isCurrent && (
            <span className="text-xs font-mono text-c-accent bg-c-accent/10 border border-c-accent/20 px-2 py-0.5 rounded-full">
              Current
            </span>
          )}
        </div>

        {/* Card */}
        <div className="glass glass-hover rounded-xl p-4 sm:p-5 md:p-6">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-1.5 leading-snug">
              {entry.role}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-semibold" style={{ color: entry.dotColor }}>
                {entry.company}
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="flex items-center gap-1 text-c-muted text-xs sm:text-sm">
                <MapPin size={12} className="flex-shrink-0" />
                {entry.location}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                  style={{ background: entry.dotColor }}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-up')
              .forEach((el) => el.classList.add('in-view'))
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
      className="relative py-24 md:py-32 bg-bg-surface/20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="reveal-up">
            <span className="section-label">// 04. EXPERIENCE</span>
          </div>
          <h2 className="reveal-up delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100">
            Where I&apos;ve Worked
          </h2>
          <p className="reveal-up delay-200 text-c-muted text-sm sm:text-base">
            Center for Advanced Life Cycle Engineering (CALCE) · University of Maryland
          </p>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((entry) => (
            <TimelineEntry key={`${entry.period}-${entry.role}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
