interface Credential {
  name: string
  issuer: string
  detail: string
  status: 'Earned' | 'In Progress' | 'Completed'
}

const credentials: Credential[] = [
  {
    name: 'OffSec Certified Professional (OSCP)',
    issuer: 'OffSec',
    detail: 'OSID57747451 · Earned 2026',
    status: 'Earned',
  },
  {
    name: 'Burp Suite Certified Practitioner (BSCP)',
    issuer: 'PortSwigger',
    detail: 'Web application security certification',
    status: 'In Progress',
  },
  {
    name: 'Software Design Threats and Mitigations',
    issuer: 'University of Colorado System',
    detail: 'Secure software design training',
    status: 'Completed',
  },
  {
    name: 'Software Design as an Element of the Software Development Lifecycle',
    issuer: 'University of Colorado System',
    detail: 'Secure SDLC training',
    status: 'Completed',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-6">Certifications</h2>

      <ul className="space-y-4">
        {credentials.map((c) => (
          <li key={c.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium text-c-text">{c.name}</h3>
              <span className="text-sm" style={{ color: c.status === 'Earned' ? 'var(--c-cyan)' : 'var(--c-muted)' }}>
                {c.status}
              </span>
            </div>
            <p className="text-sm text-c-muted">{c.issuer} · {c.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
