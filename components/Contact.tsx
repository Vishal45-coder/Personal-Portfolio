'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Linkedin, Github, Download, Check, Copy, ArrowUpRight } from 'lucide-react'
import { fadeUp, fadeIn, staggerContainer, viewport, ease } from '@/lib/motion'

const links = [
  {
    icon: <Mail size={15} />,
    label: 'Email',
    value: 'vishalraavi.work@gmail.com',
    href: 'mailto:vishalraavi.work@gmail.com',
    isEmail: true,
  },
  {
    icon: <Linkedin size={15} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vishalraavi',
    href: 'https://linkedin.com/in/vishalraavi',
  },
  {
    icon: <Github size={15} />,
    label: 'GitHub',
    value: 'github.com/vishal45-coder',
    href: 'https://github.com/vishal45-coder',
  },
]

// Headline lines split for word-by-word stagger
const headlineLines = [
  { text: "LET'S BUILD",      color: 'text-c-text' },
  { text: 'SOMETHING',        color: 'text-c-text' },
  { text: 'WORTH BREAKING.',  color: 'text-c-cyan' },
]

function ContactRow({ item }: { item: (typeof links)[0] }) {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()

  const handleClick = async (e: React.MouseEvent) => {
    if (item.isEmail) {
      e.preventDefault()
      try {
        await navigator.clipboard.writeText(item.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        window.location.href = item.href
      }
    }
  }

  const inner = (
    <motion.div
      className="flex items-center justify-between gap-3 py-5 border-b"
      style={{ borderColor: 'var(--c-line)' }}
      whileHover={reduced ? {} : { x: 4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <motion.span
          className="text-c-muted flex-shrink-0"
          whileHover={reduced ? {} : { color: 'var(--c-cyan)', transition: { duration: 0.15 } }}
        >
          {item.icon}
        </motion.span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-c-muted mb-0.5">
            {item.label}
          </p>
          <p className="text-c-sub text-sm transition-colors duration-200 group-hover:text-c-text break-all">
            {item.value}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 text-c-muted transition-colors duration-200 group-hover:text-c-cyan">
        {item.isEmail ? (
          copied ? (
            <>
              <Check size={13} className="text-c-green" />
              <span className="font-mono text-[10px] tracking-wider text-c-green">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span className="font-mono text-[10px] tracking-wider hidden sm:inline">Copy</span>
            </>
          )
        ) : (
          <ArrowUpRight size={15} />
        )}
      </div>
    </motion.div>
  )

  if (item.isEmail) {
    return <div onClick={handleClick} className="cursor-pointer group">{inner}</div>
  }
  return <a href={item.href} target="_blank" rel="noopener noreferrer" className="group">{inner}</a>
}

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 grid-bg overflow-hidden bg-ink-1"
    >
      {/* Watermark */}
      <div className="absolute top-0 left-0 watermark" aria-hidden="true">07</div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse at bottom, var(--c-cyan-glow) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={reduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium text-c-muted">07</span>
            <div className="w-6 h-px" style={{ background: 'var(--c-line)' }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-muted">Contact</span>
          </div>
        </motion.div>

        {/* Headline — word-by-word reveal, line by line */}
        <motion.div
          className="mb-10"
          variants={reduced ? {} : staggerContainer(0.18, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <h2
            className="font-display font-extrabold leading-[1] tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
          >
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                className={`block ${line.color}`}
                variants={reduced ? {} : {
                  hidden:  { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.div
          className="mb-10"
          variants={reduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="text-c-sub text-sm leading-relaxed max-w-sm">
            Open to full-time roles in Software Engineering, Security Engineering, and Cloud Security.
          </p>
        </motion.div>

        <motion.hr
          className="h-rule"
          variants={reduced ? {} : fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        />

        {/* Contact rows — staggered */}
        <motion.div
          variants={reduced ? {} : staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {links.map((item) => (
            <motion.div
              key={item.label}
              variants={reduced ? {} : fadeUp}
            >
              <ContactRow item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Resume CTA */}
        <motion.div
          className="mt-10"
          variants={reduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.a
            href="/Vishal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded font-mono text-[11px] tracking-[0.12em] uppercase font-bold"
            style={{ background: 'var(--c-cyan)', color: 'var(--ink)' }}
            whileHover={reduced ? {} : { opacity: 0.85, scale: 1.02, transition: { duration: 0.15 } }}
            whileTap={reduced ? {} : { scale: 0.97 }}
          >
            <Download size={13} /> Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
