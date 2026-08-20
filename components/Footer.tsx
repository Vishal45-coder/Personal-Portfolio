import Link from 'next/link'

const footerLinks = [
  { label: 'About',   href: '/about' },
  { label: 'Skills',  href: '/#skills' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--c-line)' }}>
      <div className="max-w-2xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-c-muted">
        <span>© {new Date().getFullYear()} Vishal Raavi</span>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors duration-150 hover:text-c-cyan">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
