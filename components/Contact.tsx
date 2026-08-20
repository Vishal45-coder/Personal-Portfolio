'use client'

import { useState } from 'react'

const links = [
  { label: 'Email', value: 'vishalraavi.work@gmail.com', href: 'mailto:vishalraavi.work@gmail.com', isEmail: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/vishalraavi', href: 'https://linkedin.com/in/vishalraavi' },
  { label: 'GitHub', value: 'github.com/vishal45-coder', href: 'https://github.com/vishal45-coder' },
]

function ContactRow({ item }: { item: (typeof links)[0] }) {
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
    <div className="group flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-c-muted w-20 flex-shrink-0">{item.label}</span>
      <span className="text-sm text-c-sub flex-1 transition-colors duration-150 group-hover:text-c-cyan">
        {item.value}
      </span>
      {item.isEmail && (
        <span className="text-xs text-c-muted flex-shrink-0">{copied ? 'Copied' : 'Copy'}</span>
      )}
    </div>
  )

  if (item.isEmail) {
    return <div onClick={handleClick} className="cursor-pointer">{inner}</div>
  }
  return <a href={item.href} target="_blank" rel="noopener noreferrer">{inner}</a>
}

export default function Contact() {
  return (
    <section id="contact" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-1">Contact</h2>
      <p className="text-sm text-c-sub mb-4">
        Open to full-time roles in Software Engineering, Security Engineering, and Cloud Security.
      </p>

      <div className="max-w-md">
        {links.map((item) => (
          <ContactRow key={item.label} item={item} />
        ))}
      </div>

      <a
        href="/Vishal_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm underline underline-offset-2 text-c-text transition-colors duration-150 hover:text-c-cyan"
      >
        Download Resume
      </a>
    </section>
  )
}
