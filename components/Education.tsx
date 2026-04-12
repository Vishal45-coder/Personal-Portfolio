'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, tagPop, staggerContainer, staggerTags, viewport } from '@/lib/motion'

const degrees = [
  {
    num: '01',
    degree: 'Master of Engineering — Cybersecurity',
    cert: 'Graduate Certificate in Cloud Engineering',
    school: 'University of Maryland',
    location: 'College Park, MD',
    period: '2024 – 2025',
    gpa: '3.88 / 4.0',
    accent: 'var(--c-cyan)',
    tagClass: 'tag-cyan',
    courses: [
      'Network Security', 'Penetration Testing', 'Cloud Security',
      'Threat Modeling', 'Linux Infrastructure', 'SIEM',
      'Secure Software Engineering',
    ],
  },
  {
    num: '02',
    degree: 'B.Tech — Computer Science',
    cert: null,
    school: 'GITAM University',
    location: 'Bangalore, India',
    period: '2019 – 2023',
    gpa: '3.2 / 4.0',
    accent: 'var(--c-violet)',
    tagClass: 'tag-violet',
    courses: [
      'Data Structures & Algorithms', 'Computer Networks',
      'Operating Systems', 'DBMS', 'OOP',
      'Software Engineering', 'Web Technologies',
    ],
  },
]

export default function Education() {
  const reduced = useReducedMotion()

  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden bg-ink">
      {/* Watermark */}
      <div className="absolute top-0 right-0 watermark" aria-hidden="true">05</div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          className="mb-14 space-y-4"
          variants={reduced ? {} : staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={reduced ? {} : fadeUp}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium text-c-muted">05</span>
              <div className="w-6 h-px" style={{ background: 'var(--c-line)' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-muted">Education</span>
            </div>
          </motion.div>
          <motion.h2
            className="font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            variants={reduced ? {} : fadeUp}
          >
            Where I Studied
          </motion.h2>
        </motion.div>

        {/* Top rule */}
        <hr className="h-rule" />

        {/* Degrees — side by side on desktop with vertical separator */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr]">

          {/* Degree 01 */}
          <motion.div
            className="py-10 lg:pr-12"
            variants={reduced ? {} : fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <DegreeCard degree={degrees[0]} reduced={!!reduced} />
          </motion.div>

          {/* Vertical separator — desktop only */}
          <div
            className="hidden lg:block"
            style={{ background: 'var(--c-line)' }}
          />

          {/* Mobile separator */}
          <hr className="h-rule lg:hidden" />

          {/* Degree 02 */}
          <motion.div
            className="py-10 lg:pl-12"
            variants={reduced ? {} : fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <DegreeCard degree={degrees[1]} reduced={!!reduced} />
          </motion.div>
        </div>

        {/* Bottom rule */}
        <hr className="h-rule" />
      </div>
    </section>
  )
}

function DegreeCard({
  degree: d,
  reduced,
}: {
  degree: (typeof degrees)[0]
  reduced: boolean
}) {
  return (
    <div>
      {/* Number + period row */}
      <div className="flex items-baseline gap-4 mb-5">
        <span
          className="font-display font-bold leading-none flex-shrink-0"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: d.accent, opacity: 0.25 }}
        >
          {d.num}
        </span>
        <span
          className="font-mono text-[11px] tracking-[0.12em] uppercase"
          style={{ color: d.accent }}
        >
          {d.period}
        </span>
      </div>

      {/* Degree */}
      <h3
        className="font-display font-bold text-c-text leading-tight mb-1"
        style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
      >
        {d.degree}
      </h3>

      {/* Certificate */}
      {d.cert && (
        <p
          className="font-mono text-[10px] tracking-[0.1em] uppercase mb-1"
          style={{ color: d.accent, opacity: 0.65 }}
        >
          + {d.cert}
        </p>
      )}

      {/* School · Location */}
      <p
        className="font-mono text-[11px] tracking-[0.1em] uppercase mb-5"
        style={{ color: d.accent, opacity: 0.5 }}
      >
        {d.school} · {d.location}
      </p>

      {/* GPA badge */}
      {d.gpa && (
        <div
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded mb-6"
          style={{
            border: '1px solid var(--c-line)',
            background: 'var(--overlay-xs)',
          }}
        >
          <span className="font-mono text-[10px] tracking-wider uppercase text-c-muted">GPA</span>
          <div className="w-px h-3" style={{ background: 'var(--c-line)' }} />
          <span className="font-mono text-sm font-bold" style={{ color: d.accent }}>{d.gpa}</span>
        </div>
      )}

      {/* Course tags */}
      <motion.div
        className="flex flex-wrap gap-1.5"
        variants={reduced ? {} : staggerTags}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {d.courses.map((c) => (
          <motion.span key={c} className={`tag ${d.tagClass}`} variants={reduced ? {} : tagPop}>
            {c}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
