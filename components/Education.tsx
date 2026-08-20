const degree = {
  degree: 'Master of Engineering — Cybersecurity',
  school: 'University of Maryland, College Park',
  location: 'College Park, MD',
  period: 'Jan 2024 – Dec 2025',
  gpa: '3.88 / 4.0',
  courses: ['Cloud Security', 'Penetration Testing', 'Security Tools', 'Secure Software Design'],
}

export default function Education() {
  return (
    <section id="education" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-6">Education</h2>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
          <h3 className="font-medium text-c-text">{degree.degree}</h3>
          <span className="text-sm text-c-muted">{degree.period}</span>
        </div>
        <p className="text-sm text-c-muted mb-2">{degree.school} · {degree.location}</p>
        <p className="text-sm text-c-sub mb-2">GPA: {degree.gpa}</p>
        <p className="text-sm text-c-sub">
          Relevant coursework: {degree.courses.join(', ')}
        </p>
      </div>
    </section>
  )
}
