import Link from 'next/link'

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-content mx-auto px-6 sm:px-8">{children}</div>
}

interface PageHeaderProps {
  eyebrow: string
  title: string
  intro?: string
  children?: React.ReactNode
}

/** Top-of-page heading block. Shared by /about, /projects and /blog. */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <div className="pt-12 pb-10 sm:pt-16">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-c-text leading-[1.15] mb-4 max-w-3xl">
        {title}
      </h1>
      {intro && <p className="text-c-sub leading-relaxed max-w-2xl">{intro}</p>}
      {children}
    </div>
  )
}

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  action?: { label: string; href: string }
  children: React.ReactNode
}

export function Section({ id, eyebrow, title, intro, action, children }: SectionProps) {
  return (
    <section id={id} className="py-12 sm:py-14 border-t">
      <div className="mb-7">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-c-text">
            {title}
          </h2>
          {action && (
            <Link
              href={action.href}
              className="text-sm font-medium text-c-cyan whitespace-nowrap transition-opacity duration-150 hover:opacity-75"
            >
              {action.label} →
            </Link>
          )}
        </div>

        {intro && <p className="mt-2 text-c-sub leading-relaxed max-w-2xl">{intro}</p>}
      </div>

      {children}
    </section>
  )
}
