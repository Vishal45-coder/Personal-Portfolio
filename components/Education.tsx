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
    location: 'Visakhapatnam, India',
    period: '2019 – 2023',
    gpa: null,
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

        {/* Degree entries */}
        <div className="grid lg:grid-cols-2 gap-0">
          {degrees.map((d, i) => (
            <div key={d.num}>
              {i === 0 && <hr className="h-rule lg:hidden" />}
              {i === 0 && <div className="hidden lg:block h-px mb-0" style={{ background: 'var(--c-line)' }} />}
              <hr className="h-rule hidden lg:block" />
              <motion.div
                className="py-10 lg:pr-10"
                style={i === 0 ? { borderRight: 'none' } : {}}
                variants={reduced ? {} : i === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {/* Number + period */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className="font-display font-bold leading-none flex-shrink-0"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: d.accent, opacity: 0.28 }}
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

                {/* Degree title */}
                <h3
                  className="font-display font-bold text-c-text leading-tight mb-1"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
                >
                  {d.degree}
                </h3>

                {/* Certificate (if any) */}
                {d.cert && (
                  <p
                    className="font-mono text-[10px] tracking-[0.1em] uppercase mb-1"
                    style={{ color: d.accent, opacity: 0.7 }}
                  >
                    + {d.cert}
                  </p>
                )}

                {/* School + location */}
                <p
                  className="font-mono text-[11px] tracking-[0.1em] uppercase mb-5"
                  style={{ color: d.accent, opacity: 0.55 }}
                >
                  {d.school} · {d.location}
                </p>

                {/* GPA */}
                {d.gpa && (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-5"
                    style={{
                      border: `1px solid ${d.accent}33`,
                      background: `${d.accent}0d`,
                    }}
                  >
                    <span className="font-mono text-[10px] tracking-wider uppercase text-c-muted">GPA</span>
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
              </motion.div>
              <hr className="h-rule" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
