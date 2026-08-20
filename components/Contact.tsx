'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react'
import { profile } from '@/lib/content'

const channels = [
  { label: 'Email',    value: profile.email,                 href: `mailto:${profile.email}`, Icon: Mail,     copyable: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/vishalraavi', href: profile.linkedin,          Icon: Linkedin, copyable: false },
  { label: 'GitHub',   value: 'github.com/vishal45-coder',   href: profile.github,            Icon: Github,   copyable: false },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <ul className="grid sm:grid-cols-3 gap-4">
      {channels.map(({ label, value, href, Icon, copyable }) => (
        <li key={label} className="card p-5 flex flex-col">
          <h3 className="subhead flex items-center gap-2 mb-2.5">
            <Icon size={14} className="text-c-cyan" aria-hidden="true" />
            {label}
          </h3>

          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-sm text-c-sub break-all link-underline"
          >
            {value}
          </a>

          {copyable && (
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 mt-3 text-xs text-c-muted self-start transition-colors duration-150 hover:text-c-cyan"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy address'}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
