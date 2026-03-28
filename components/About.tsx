'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  fadeUp, fadeLeft, fadeRight, tagPop,
  staggerContainer, staggerNormal, viewport,
} from '@/lib/motion'

const stats = [
  { value: '3.88 / 4.0', label: 'M.Eng. Cybersecurity + GCEN · UMD', color: 'var(--c-cyan)' },
  { value: '2+ Years',   label: 'Production engineering at CALCE',     color: 'var(--c-violet)' },
  { value: '17.4M+',    label: 'Log entries indexed · EK Stack lab',   color: 'var(--c-green)' },
]

const credentials = [
  { label: 'M.Eng. Cybersecurity',         meta: 'UMD · 2025',  dot: 'var(--c-cyan)' },
  { label: 'Grad. Cert. Cloud Engineering', meta: 'UMD · 2025',  dot: 'var(--c-cyan)' },
  { label: 'B.Tech Computer Science',       meta: 'GITAM · 2023', dot: 'var(--c-violet)' },
  { label: 'BSCP',                          meta: 'In Progress',  dot: 'var(--c-amber)', amber: true },
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
            <div>
              <span className="label text-c-cyan">// 01. ABOUT</span>
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

            {/* Credentials — staggered tag pop */}
            <motion.div
              className="flex flex-wrap gap-2 pt-1"
              variants={reduced ? {} : staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {credentials.map((c) => (
                <motion.div
                  key={c.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded"
                  style={{
                    background: 'var(--overlay-xs)',
                    border: '1px solid var(--c-line)',
                  }}
                  variants={reduced ? {} : tagPop}
                  whileHover={reduced ? {} : { scale: 1.03, transition: { duration: 0.15 } }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.dot }} />
                  <span className="text-c-sub text-xs font-medium">{c.label}</span>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: c.amber ? 'var(--c-amber)' : 'var(--c-muted)' }}
                  >
                    {c.meta}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — data lines */}
          <motion.div
            className="lg:col-span-2"
            variants={reduced ? {} : fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.div
              className="space-y-0"
              variants={reduced ? {} : staggerContainer(0.12, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {stats.map((s, i) => (
                <motion.div key={i} variants={reduced ? {} : fadeUp}>
                  <div className="py-6">
                    <div
                      className="font-display font-bold leading-none mb-2"
                      style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: s.color }}
                    >
                      {s.value}
                    </div>
                    <div className="font-mono text-[11px] tracking-wider uppercase text-c-muted">
                      {s.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && <hr className="h-rule" />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
