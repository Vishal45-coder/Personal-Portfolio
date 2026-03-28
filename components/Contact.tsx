'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Linkedin, Github, Download, Check, Copy } from 'lucide-react'

interface ContactCard {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  isEmail?: boolean
}

const contactCards: ContactCard[] = [
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'vishalraavi.work@gmail.com',
    href: 'mailto:vishalraavi.work@gmail.com',
    isEmail: true,
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vishalraavi',
    href: 'https://linkedin.com/in/vishalraavi',
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    value: 'github.com/vishal45-coder',
    href: 'https://github.com/vishal45-coder',
  },
]

function ContactCardItem({ card, delay }: { card: ContactCard; delay: string }) {
  const [copied, setCopied] = useState(false)

  const handleEmailCopy = async (e: React.MouseEvent) => {
    if (!card.isEmail) return
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(card.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: open mailto
      window.location.href = card.href
    }
  }

  const inner = (
    <div
      className={`reveal-up ${delay} glass glass-hover h-full rounded-xl p-5 sm:p-6 flex flex-col items-center gap-3 text-center group cursor-pointer`}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-c-primary/10 flex items-center justify-center text-c-primary group-hover:bg-c-primary/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
        {card.icon}
      </div>
      <div className="min-w-0 w-full">
        <p className="text-xs text-c-muted font-mono mb-1">{card.label}</p>
        <p className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-c-primary transition-colors duration-200 break-words leading-snug">
          {card.value}
        </p>
      </div>
      {card.isEmail && (
        <div className="flex items-center gap-1.5 text-xs text-c-muted mt-auto">
          {copied ? (
            <>
              <Check size={12} className="text-c-accent flex-shrink-0" />
              <span className="text-c-accent">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} className="flex-shrink-0" />
              <span>Click to copy</span>
            </>
          )}
        </div>
      )}
    </div>
  )

  if (card.isEmail) {
    return <div onClick={handleEmailCopy} className="block h-full">{inner}</div>
  }

  return (
    <a href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full">
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
            entry.target
              .querySelectorAll('.reveal-up')
              .forEach((el) => el.classList.add('in-view'))
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
      className="relative py-24 md:py-32 bg-bg-surface/20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="reveal-up">
            <span className="section-label">// 06. CONTACT</span>
          </div>
          <h2 className="reveal-up delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100">
            Let&apos;s Work Together
          </h2>
          <p className="reveal-up delay-200 text-c-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Open to full-time roles in Software Engineering, Security Engineering, and
            Cloud Security
          </p>

          {/* Availability badge */}
          <div className="reveal-up delay-300 flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-c-accent/25 bg-c-accent/5">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-c-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-c-accent" />
              </span>
              <span className="text-xs sm:text-sm text-c-accent font-medium">
                Available for full-time opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Contact cards — stack on small screens, 3-col on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {contactCards.map((card, i) => {
            const delays = ['delay-100', 'delay-200', 'delay-300']
            return (
              <ContactCardItem key={card.label} card={card} delay={delays[i]} />
            )
          })}
        </div>

        {/* CTA Buttons */}
        <div className="reveal-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="/Vishal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400
              shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-105
              transition-all duration-200"
          >
            <Download size={16} />
            Download Resume
          </a>
          <a
            href="mailto:vishalraavi.work@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-c-primary text-sm
              border border-c-primary/50 hover:border-c-primary hover:bg-c-primary/10
              transition-all duration-200"
          >
            <Mail size={16} />
            Send an Email
          </a>
        </div>
      </div>
    </section>
  )
}
