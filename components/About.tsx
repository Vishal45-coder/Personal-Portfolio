'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  fadeUp, fadeLeft, fadeRight,
  staggerContainer, staggerNormal, viewport,
} from '@/lib/motion'

const stats = [
  { value: '3.88 / 4.0', label: 'M.Eng. GPA · UMD',        color: 'var(--c-cyan)' },
  { value: '2+ Years',   label: 'Production Tenure · CALCE', color: 'var(--c-violet)' },
  { value: '17.4M+',    label: 'Logs Indexed · EK Stack',   color: 'var(--c-green)' },
]


export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-0 right-0 watermark" aria-hidden="true">01</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left — story */}
          <motion.div
            className="lg:col-span-3 space-y-7"
            variants={reduced ? {} : fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium text-c-muted">01</span>
              <div className="w-6 h-px" style={{ background: 'var(--c-line)' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-muted">About</span>
            </div>

            <h2
              className="font-display font-bold leading-tight text-c-text"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Engineering at the intersection of{' '}
              <span className="text-c-cyan">System Design</span>{' '}
              &amp;{' '}
              <span className="text-c-violet">Security</span>
            </h2>

            <motion.div
              className="space-y-4 text-c-sub leading-relaxed text-sm sm:text-base"
              variants={reduced ? {} : staggerNormal}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <motion.p variants={reduced ? {} : fadeUp}>
                I&apos;m a Master&apos;s student in Cybersecurity at the University of Maryland (GPA: 3.88),
                with a background in Computer Science from GITAM University. For the past 2+ years, I&apos;ve
                been building production systems at the Center for Advanced Life Cycle Engineering (CALCE) —
                full-stack web platforms, containerized microservices, REST APIs, and data visualization tools
                used by researchers daily.
              </motion.p>
              <motion.p variants={reduced ? {} : fadeUp}>
                What sets me apart is the combination: I don&apos;t just build systems — I attack them too.
                I&apos;ve executed full offensive kill chains in isolated CTF environments: black-box
                reconnaissance, SQL injection exploitation, webshell deployment, privilege escalation, and
                data exfiltration. That attacker&apos;s perspective directly informs how I write and review code.
              </motion.p>
              <motion.p variants={reduced ? {} : fadeUp}>
                I&apos;m actively pursuing the Burp Suite Certified Practitioner (BSCP) certification and
                targeting roles at the intersection of secure software engineering and information security —
                where building and breaking converge.
              </motion.p>
            </motion.div>

            {/* Approach block */}
            <motion.div
              className="pt-5 border-t space-y-2"
              style={{ borderColor: 'var(--c-line)' }}
              variants={reduced ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-c-muted">
                How I Think
              </p>
              <p className="text-c-sub text-sm leading-relaxed">
                Every system I build starts with one question:{' '}
                <span className="text-c-cyan font-medium">&ldquo;How would I break this?&rdquo;</span>{' '}
                That attacker&apos;s lens — built through real offensive security labs — shapes how I
                architect, review, and harden every system I ship.
              </p>
            </motion.div>

          </motion.div>

          {/* Right — technical readout */}
          <motion.div
            className="lg:col-span-2"
            variants={reduced ? {} : fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-c-muted">Profile</span>
              <div className="flex-1 h-px" style={{ background: 'var(--c-line)' }} />
            </div>
            <motion.div
              className="space-y-0"
              variants={reduced ? {} : staggerContainer(0.12, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {stats.map((s, i) => (
                <motion.div key={i} variants={reduced ? {} : fadeUp}>
                  <div className="py-4 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-c-muted">
                      {s.label}
                    </span>
                    <span
                      className="font-mono font-bold tabular-nums flex-shrink-0"
                      style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: s.color }}
                    >
                      {s.value}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-px" style={{ background: 'var(--c-line)' }} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
