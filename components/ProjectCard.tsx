import type { Project } from '@/lib/content'

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className="card p-6">
      <p className="eyebrow mb-2">{project.category}</p>

      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-c-text leading-snug mb-2">
        {project.title}
      </h3>

      <p className="text-c-sub leading-relaxed mb-6">{project.summary}</p>

      {!compact && (
        <>
          <div className="mb-6">
            <h4 className="subhead mb-2">Problem</h4>
            <p className="text-sm text-c-sub leading-relaxed">{project.problem}</p>
          </div>

          <div className="mb-6">
            <h4 className="subhead mb-2.5">What I did</h4>
            <ul className="space-y-2">
              {project.work.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-c-sub leading-relaxed">
                  <span aria-hidden="true" className="text-c-cyan flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="py-5 mb-5 border-t border-b">
        <h4 className="subhead mb-3">Results</h4>
        <dl className="grid sm:grid-cols-3 gap-4">
          {project.results.map((result) => (
            <div key={result.label}>
              <dt className="sr-only">{result.label}</dt>
              <dd>
                <span className="block text-base font-bold text-c-text leading-snug mb-0.5">
                  {result.value}
                </span>
                <span className="block text-xs text-c-muted leading-relaxed">
                  {result.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {(compact ? project.stack.slice(0, 8) : project.stack).map((tech) => (
          <li key={tech} className="tag">{tech}</li>
        ))}
        {compact && project.stack.length > 8 && (
          <li className="tag">+{project.stack.length - 8} more</li>
        )}
      </ul>
    </article>
  )
}
