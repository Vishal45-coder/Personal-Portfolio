import Link from 'next/link'
import { Mail, Linkedin, Github, FileText, MapPin } from 'lucide-react'
import { profile, metrics } from '@/lib/content'

export default function Hero() {
  return (
    <section className="pt-12 pb-12 sm:pt-16 sm:pb-14">
      <p className="eyebrow mb-3">{profile.role}</p>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-c-text leading-[1.05] mb-5">
        {profile.name}
      </h1>

      <p className="text-base sm:text-lg text-c-sub leading-relaxed max-w-2xl mb-5">
        {profile.summary}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-c-muted mb-7">
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} /> {profile.location}
        </span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>{profile.credentials}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 mb-12">
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md transition-opacity duration-150 hover:opacity-90"
          style={{ background: 'var(--c-cyan)', color: 'var(--ink)' }}
        >
          <FileText size={15} /> Download resume
        </a>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md text-c-text transition-colors duration-150 hover:text-c-cyan"
          style={{ border: '1px solid var(--border-md)' }}
        >
          View projects
        </Link>

        <div className="flex items-center gap-1 sm:ml-2">
          {[
            { href: `mailto:${profile.email}`, label: 'Email',    Icon: Mail },
            { href: profile.linkedin,          label: 'LinkedIn', Icon: Linkedin },
            { href: profile.github,            label: 'GitHub',   Icon: Github },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="p-2.5 text-c-muted transition-colors duration-150 hover:text-c-cyan"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* Achievement strip. gap-px over a line-coloured background draws the
          dividers, so cells stay flush inside one rounded container. */}
      <dl
        className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-lg overflow-hidden border"
        style={{ background: 'var(--c-line)' }}
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-ink p-5 flex flex-col">
            <dt className="sr-only">{metric.label}</dt>
            <dd className="flex flex-col h-full">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-c-cyan mb-1.5">
                {metric.value}
              </span>
              <span className="text-sm font-semibold text-c-text leading-snug mb-1.5">
                {metric.label}
              </span>
              <span className="text-xs text-c-muted leading-relaxed">
                {metric.detail}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
