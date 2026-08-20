interface Role {
  period: string
  current: boolean
  role: string
  company: string
  location: string
  bullets: string[]
}

const roles: Role[] = [
  {
    period: 'Apr 2024 – Present', current: true,
    role: 'Software Security Engineer — Product Security',
    company: 'University of Maryland', location: 'College Park, MD',
    bullets: [
      'Integrated application security into the Secure SDLC, reviewing attack surface, trust boundaries, REST APIs, user-controlled inputs, browser behavior, file-processing paths, and externally exposed functionality during design, development, and release',
      'Performed manual and dynamic application security testing using Burp Suite across API endpoints, authentication and authorization flows, session handling, input validation, CORS behavior, and business logic; reproduced findings and validated security impact before remediation',
      'Conducted OWASP Top 10 reviews of the application codebase and remediated XSS, Insecure Design, input-validation, and cross-origin weaknesses using server-side/client-side validation, CORS hardening, DOM-safe handling, and stronger application boundaries, reducing software defects by 50%',
      'Designed and implemented token-authenticated Flask REST APIs and access-controlled application workflows, strengthening authentication, authorization, API security, and session boundaries for externally accessible functionality',
      'Performed threat modeling and security design reviews across frontend/backend data flows, service integrations, privilege boundaries, and abuse cases, identifying high-risk attack paths early and translating them into engineering controls',
      'Worked with developers and researchers on vulnerability triage and remediation, performing root-cause analysis, recommending code-level fixes, and retesting changes before release to verify remediation and prevent regression',
      'Secured REST API and service integrations with schema and payload validation, structured error handling, controlled data exchange, and defensive input processing to block malformed or untrusted data and reduce application attack surface',
      'Architected and developed production software using React.js, Flask, Python, REST APIs, and Docker, building backend services and integrations while improving serialization and request handling to reduce application response time by 50%',
      'Integrated GitHub Actions, CI/CD, Docker, Bash/Shell automation, application logging, and standardized deployment workflows, improving release reliability, deployment security, logging visibility, and secure configuration management',
    ],
  },
  {
    period: 'Nov 2022 – Dec 2023', current: false,
    role: 'Application Security Engineer',
    company: 'Sathayush Technologies', location: 'Hyderabad, India',
    bullets: [
      'Performed manual and automated security assessments of 100+ production web applications and REST APIs, identifying SQL injection, XSS, CSRF, IDOR, authentication/authorization bypasses, insecure file handling, and security misconfigurations using Burp Suite, Nmap, and custom payloads',
      'Conducted application security reviews across authentication, authorization, user-controlled inputs, API endpoints, session management, business logic, and sensitive-data exposure; provided developers with remediation guidance for confirmed findings',
      'Worked with software engineers on vulnerability remediation, reproducing findings, performing root-cause analysis, explaining security impact, recommending secure implementation changes, and retesting fixes before closure',
      'Conducted threat modeling, attack-surface analysis, and security design reviews for web and cloud-hosted applications, evaluating trust boundaries, exposed services, application data flows, and high-risk attack paths to prioritize security controls based on likelihood and potential impact',
      'Built Python and Bash security tooling for reconnaissance, endpoint discovery, fuzzing, and payload testing, increasing coverage and reserving manual analysis for higher-risk application functionality',
      'Performed internal and external infrastructure assessments, validating SMB/LDAP and identity misconfigurations with Metasploit, NetExec, and BloodHound to assess application and product security impact',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-6">Experience</h2>

      <div className="space-y-8">
        {roles.map((r) => (
          <div key={r.role}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
              <h3 className="font-medium text-c-text">{r.role}</h3>
              <span className="text-sm text-c-muted">
                {r.period}{r.current && <span className="text-c-cyan"> · Present</span>}
              </span>
            </div>
            <p className="text-sm text-c-muted mb-3">{r.company} · {r.location}</p>
            <ul className="space-y-1.5 list-disc list-outside pl-5">
              {r.bullets.map((b, j) => (
                <li key={j} className="text-sm text-c-sub leading-relaxed">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
