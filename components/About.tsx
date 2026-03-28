'use client'

import { useEffect, useRef } from 'react'

const stats = [
  {
    value: '3.88 / 4.0',
    label: 'M.Eng. Cybersecurity + GCEN · UMD',
    color: 'var(--c-cyan)',
  },
  {
    value: '2+ Years',
    label: 'Production engineering at CALCE',
    color: 'var(--c-violet)',
  },
  {
    value: '17.4M+',
    label: 'Log entries indexed · EK Stack lab',
    color: 'var(--c-green)',
  },
]

const credentials = [
  { label: 'M.Eng. Cybersecurity', meta: 'UMD · 2025', dot: 'var(--c-cyan)' },
  { label: 'Grad. Cert. Cloud Engineering', meta: 'UMD · 2025', dot: 'var(--c-cyan)' },
  { label: 'B.Tech Computer Science', meta: 'GITAM · 2023', dot: 'var(--c-violet)' },
  { label: 'BSCP', meta: 'In Progress', dot: 'var(--c-amber)', amber: true },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) =>
              el.classList.add('in-view')
            )
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-ink overflow-hidden"
    >
      {/* Watermark number */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none"
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
        01
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left — story */}
          <div className="lg:col-span-3 space-y-7">
            <div className="reveal">
              <span className="label" style={{ color: 'var(--c-cyan)' }}>// 01. ABOUT</span>
            </div>

            <h2
              className="reveal delay-100 font-display font-bold leading-tight text-c-text"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Engineering at the intersection of{' '}
              <span style={{ color: 'var(--c-cyan)' }}>System Design</span>{' '}
              &amp;{' '}
              <span style={{ color: 'var(--c-violet)' }}>Security</span>
            </h2>

            <div className="space-y-4 text-c-sub leading-relaxed text-sm sm:text-base">
              <p className="reveal delay-200">
                I&apos;m a Master&apos;s student in Cybersecurity at the University of Maryland (GPA: 3.88),
                with a background in Computer Science from GITAM University. For the past 2+ years, I&apos;ve
                been building production systems at the Center for Advanced Life Cycle Engineering (CALCE) —
                full-stack web platforms, containerized microservices, REST APIs, and data visualization tools
                used by researchers daily.
              </p>
              <p className="reveal delay-300">
                What sets me apart is the combination: I don&apos;t just build systems — I attack them too.
                I&apos;ve executed full offensive kill chains in isolated CTF environments: black-box
                reconnaissance, SQL injection exploitation, webshell deployment, privilege escalation, and
                data exfiltration. That attacker&apos;s perspective directly informs how I write and review code.
              </p>
              <p className="reveal delay-400">
                I&apos;m actively pursuing the Burp Suite Certified Practitioner (BSCP) certification and
                targeting roles at the intersection of secure software engineering and information security —
                where building and breaking converge.
              </p>
            </div>

            {/* Credentials */}
            <div className="reveal delay-500 flex flex-wrap gap-2 pt-1">
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: c.dot }}
                  />
                  <span className="text-c-sub text-xs font-medium">{c.label}</span>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: c.amber ? 'var(--c-amber)' : 'var(--c-muted)' }}
                  >
                    {c.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — data lines */}
          <div className="lg:col-span-2 reveal-right delay-200">
            <div className="space-y-0">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="py-6">
                    <div
                      className="font-display font-bold leading-none mb-2"
                      style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                        color: s.color,
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="font-mono text-[11px] tracking-wider uppercase text-c-muted">
                      {s.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && <hr className="h-rule" />}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
