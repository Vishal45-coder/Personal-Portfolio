const footerLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Security',   href: '#security' },
  { label: 'Contact',    href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="border-t py-8 bg-ink"
      style={{ borderColor: 'var(--c-line)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-black text-c-text">VR</span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-c-muted">
              Vishal Raavi
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-c-muted transition-colors duration-200 hover:text-c-sub"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="font-mono text-[10px] tracking-wider text-c-muted whitespace-nowrap">
            © {new Date().getFullYear()} Vishal Raavi
          </p>
        </div>
      </div>
    </footer>
  )
}
