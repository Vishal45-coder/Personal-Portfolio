'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Linkedin, Github, Download, Check, Copy, ArrowUpRight } from 'lucide-react'

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

function ContactRow({
  item,
}: {
  item: (typeof links)[0]
}) {
  const [copied, setCopied] = useState(false)

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
    <div
      className="flex items-center justify-between py-5 border-b group transition-colors duration-200"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-4">
        <span className="text-c-muted group-hover:text-c-cyan transition-colors duration-200">
          {item.icon}
        </span>
        <div>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-c-muted mb-0.5">
            {item.label}
          </p>
          <p className="text-c-sub text-sm group-hover:text-c-text transition-colors duration-200">
            {item.value}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-c-muted group-hover:text-c-cyan transition-colors duration-200">
        {item.isEmail ? (
          copied ? (
            <>
              <Check size={13} style={{ color: 'var(--c-green)' }} />
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--c-green)' }}>
                Copied
              </span>
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
    </div>
  )

  if (item.isEmail) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {inner}
      </div>
    )
  }

  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  )
}

export default function Contact() {
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 grid-bg overflow-hidden"
      style={{ background: 'var(--ink-1)' }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(34,211,238,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section label */}
        <div className="reveal mb-6">
          <span className="label" style={{ color: 'var(--c-cyan)' }}>// 06. CONTACT</span>
        </div>

        {/* Headline */}
        <div className="reveal delay-100 mb-10">
          <h2
            className="font-display font-extrabold leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
          >
            <span className="block text-c-text">LET&apos;S BUILD</span>
            <span className="block text-c-text">SOMETHING</span>
            <span className="block" style={{ color: 'var(--c-cyan)' }}>
              WORTH BREAKING.
            </span>
          </h2>
        </div>

        {/* Subtext + availability */}
        <div className="reveal delay-200 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-c-sub text-sm leading-relaxed max-w-sm">
            Open to full-time roles in Software Engineering, Security Engineering, and Cloud Security.
          </p>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded flex-shrink-0 self-start"
            style={{
              border: '1px solid rgba(16,185,129,0.25)',
              background: 'rgba(16,185,129,0.05)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  backgroundColor: 'var(--c-green)',
                  animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <span
                className="relative rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: 'var(--c-green)' }}
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--c-green)' }}>
              Available
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="h-rule reveal delay-300" />

        {/* Contact rows */}
        <div className="reveal delay-300">
          {links.map((item) => (
            <ContactRow key={item.label} item={item} />
          ))}
        </div>

        {/* Resume CTA */}
        <div className="reveal delay-400 mt-10">
          <a
            href="/Vishal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded font-mono text-[11px] tracking-[0.12em] uppercase font-bold transition-opacity duration-200 hover:opacity-80"
            style={{ background: 'var(--c-cyan)', color: 'var(--ink)' }}
          >
            <Download size={13} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
