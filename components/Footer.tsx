import Link from 'next/link'
import { Linkedin, Github, Mail } from 'lucide-react'
import { profile } from '@/lib/content'

const footerLinks = [
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Skills',   href: '/#skills' },
  { label: 'Contact',  href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="max-w-content mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-c-text">{profile.name}</p>
          <p className="text-sm text-c-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-c-muted transition-colors duration-150 hover:text-c-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-c-muted transition-colors duration-150 hover:text-c-cyan">
            <Mail size={17} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-c-muted transition-colors duration-150 hover:text-c-cyan">
            <Linkedin size={17} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-c-muted transition-colors duration-150 hover:text-c-cyan">
            <Github size={17} />
          </a>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-content mx-auto px-6 sm:px-8 py-4">
          <p className="text-xs text-c-muted text-center">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
