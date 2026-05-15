'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeLeft, staggerContainer, viewport, ease } from '@/lib/motion'

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
    num: '01', period: 'Jan 2026 – Present', current: true,
    role: 'Full Stack Engineer',
    company: 'CALCE · University of Maryland', location: 'College Park, MD',
    accent: 'var(--c-cyan)',
    bullets: [
      'Implementing a cross-module data integration layer using REST APIs to directly connect the reliability platform with other research modules, enabling real-time data sharing across tools and eliminating manual data entry between systems for a unified end-to-end analysis workflow',
      'Built and launched the MOSTCOOL public-facing website (HTML5, Tailwind CSS, Vanilla JS) serving as the central hub for researchers and stakeholders to access software downloads, documentation, and team information — integrated Google Analytics 4 to track visitor engagement and optimize content delivery',
      'Developed an automated support and distribution system using a token-authenticated Flask API and GitHub Issues integration, enabling users to submit issues directly from the website and securely download research software — replacing a manual process with a fully automated, access-controlled workflow',
      'Conducted a full security audit of the platform codebase, identifying and remediating OWASP Top 10 vulnerabilities (XSS, Insecure Design) through input validation, CORS hardening, and DOM-safe content handling — reduced software defects by 50% and aligned the platform with industry security standards',
    ],
  },
  {
    num: '02', period: 'Aug 2024 – Dec 2025', current: false,
    role: 'Software Engineer',
    company: 'CALCE · University of Maryland', location: 'College Park, MD',
    accent: 'var(--c-violet)',
    bullets: [
      'Designed and built the MOSTCOOL Reliability Web Platform from the ground up (React.js + Flask) — modernized a legacy desktop application into a full-stack containerized web platform for analyzing the reliability and availability of data center cooling systems, accessible from any device with a single command; improved system response time by 50% through optimized serialization and backend request validation',
      'Built an interactive visual modeling tool using React Flow — researchers construct and analyze complex system reliability diagrams through a drag-and-drop interface, eliminating manual calculations and reducing modeling time by 60%',
      'Developed the underlying reliability calculation engine in Python capable of evaluating every possible failure state across large systems to compute exact reliability and availability metrics',
      'Engineered a data export and import system using SheetJS — researchers save their complete work to Excel across 5 worksheets, share it across teams, and reload it with full fidelity including all diagrams, parameters, and configurations with no data loss',
      'Built cross-platform Bash/Shell deployment scripts enabling the platform to be installed and launched consistently across ARM64 and x86_64 — removing manual setup steps and standardizing the researcher onboarding experience',
    ],
  },
  {
    num: '03', period: 'Apr 2024 – Aug 2024', current: false,
    role: 'Junior Software Engineer',
    company: 'CALCE · University of Maryland', location: 'College Park, MD',
    accent: 'var(--c-green)',
    bullets: [
      'Built a cross-platform reliability modeling desktop tool (Python Tkinter, NumPy) — improved modeling efficiency by 60%',
      'Developed a responsive website (HTML, CSS, JavaScript) with Google Sheets API as a lightweight serverless backend for research data',
    ],
  },
]

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden bg-ink-1">
      {/* Watermark */}
      <div className="absolute top-0 left-0 watermark" aria-hidden="true">04</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          className="mb-14 space-y-4"
          variants={reduced ? {} : staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={reduced ? {} : fadeUp}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium text-c-muted">04</span>
              <div className="w-6 h-px" style={{ background: 'var(--c-line)' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-muted">Experience</span>
            </div>
          </motion.div>
          <motion.h2
            className="font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            variants={reduced ? {} : fadeUp}
          >
            Where I&apos;ve Worked
          </motion.h2>
          <motion.p
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-c-muted"
            variants={reduced ? {} : fadeUp}
          >
            Center for Advanced Life Cycle Engineering (CALCE) · University of Maryland
          </motion.p>
        </motion.div>

        <div>
          {roles.map((r, i) => (
            <div key={r.num}>
              <hr className="h-rule" />
              <motion.div
                className="py-10 flex flex-col sm:flex-row gap-6 sm:gap-10"
                variants={reduced ? {} : fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: i * 0.05 }}
              >
                {/* Number */}
                <div className="flex-shrink-0 sm:w-16">
                  <span
                    className="font-display font-bold leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: r.accent, opacity: 0.28 }}
                  >
                    {r.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
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
                          background: 'var(--c-green-tint)',
                          border: '1px solid var(--c-green-border)',
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-display font-bold text-c-text leading-tight mb-1"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
                  >
                    {r.role}
                  </h3>

                  <p
                    className="font-mono text-[11px] tracking-[0.1em] uppercase mb-5"
                    style={{ color: r.accent, opacity: 0.7 }}
                  >
                    {r.company} · {r.location}
                  </p>

                  {/* Bullets — staggered */}
                  <motion.ul
                    className="space-y-2.5"
                    variants={reduced ? {} : staggerContainer(0.07, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    {r.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        className="flex gap-3 text-sm text-c-sub leading-relaxed"
                        variants={reduced ? {} : {
                          hidden:  { opacity: 0, x: -12 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: ease.out } },
                        }}
                      >
                        <span className="flex-shrink-0 font-mono font-semibold mt-0.5" style={{ color: r.accent }}>
                          →
                        </span>
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            </div>
          ))}
          <hr className="h-rule" />
        </div>
      </div>
    </section>
  )
}
