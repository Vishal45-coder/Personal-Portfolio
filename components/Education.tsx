import { education } from '@/lib/content'

export default function Education() {
  return (
    <article className="grid md:grid-cols-[10rem_1fr] gap-3 md:gap-8">
      <p className="font-mono text-xs text-c-muted md:pt-1">{education.period}</p>

      <div>
        <h3 className="text-lg font-bold tracking-tight text-c-text leading-snug">
          {education.degree}
        </h3>
        <p className="text-sm text-c-cyan font-medium mt-0.5 mb-3">
          {education.school} · {education.location}
        </p>

        <p className="text-sm text-c-sub mb-3">
          <span className="font-semibold text-c-text">GPA {education.gpa}</span>
        </p>

        <div>
          <h4 className="text-sm font-semibold text-c-text mb-2">Relevant coursework</h4>
          <ul className="flex flex-wrap gap-1.5">
            {education.coursework.map((course) => (
              <li key={course} className="tag">{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
