const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo + tagline */}
          <div>
            <div className="text-2xl font-black gradient-text-blue mb-1">VR</div>
            <p className="text-sm text-slate-400">
              Vishal Raavi — Software Engineer &amp; Security Engineer
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-c-muted hover:text-c-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-sm h-px bg-white/5" />

          {/* Copyright */}
          <div className="space-y-1">
            <p className="text-xs text-c-muted">
              &copy; {new Date().getFullYear()} Vishal Raavi. Built with Next.js
              and Tailwind CSS.
            </p>
            <p className="text-xs text-c-muted/60 font-mono">
              Designed &amp; engineered with attention to security
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
