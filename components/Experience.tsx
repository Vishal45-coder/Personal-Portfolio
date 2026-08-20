import { roles } from '@/lib/content'

export default function Experience() {
  return (
    <div className="space-y-10">
      {roles.map((role) => (
        <article key={role.title} className="grid md:grid-cols-[10rem_1fr] gap-3 md:gap-8">
          <div className="md:pt-1">
            <p className="font-mono text-xs text-c-muted leading-relaxed">{role.period}</p>
            {role.current && (
              <span
                className="inline-block mt-1.5 px-2 py-0.5 rounded font-mono text-[0.65rem] uppercase tracking-wider"
                style={{
                  color: 'var(--c-cyan)',
                  background: 'var(--c-cyan-tint)',
                  border: '1px solid var(--c-cyan-border)',
                }}
              >
                Current
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold tracking-tight text-c-text leading-snug">
              {role.title}
            </h3>
            <p className="text-sm text-c-cyan font-medium mt-0.5 mb-3">
              {role.company} · {role.location}
            </p>

            <p className="text-sm text-c-sub leading-relaxed mb-4">{role.summary}</p>

            <ul className="space-y-2 mb-4">
              {role.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-c-sub leading-relaxed">
                  <span aria-hidden="true" className="text-c-cyan flex-shrink-0 mt-0.5">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-1.5">
              {role.stack.map((tech) => (
                <li key={tech} className="tag">{tech}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  )
}
