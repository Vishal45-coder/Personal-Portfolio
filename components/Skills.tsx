'use client'

import { useEffect, useRef } from 'react'

interface SkillRow {
  num: string
  category: string
  accent: string
  tagClass: string
  tags: string[]
}

const rows: SkillRow[] = [
  {
    num: '01',
    category: 'Software Engineering',
    accent: 'var(--c-cyan)',
    tagClass: 'tag-cyan',
    tags: [
      'Python', 'Java', 'JavaScript', 'C', 'PHP', 'SQL',
      'React.js', 'Node.js', 'Flask', 'Pandas', 'NumPy',
      'Docker', 'Git', 'GitHub Actions', 'Bash / Shell',
      'REST API', 'Gunicorn', 'Azure (Basics)',
    ],
  },
  {
    num: '02',
    category: 'Offensive Security',
    accent: 'var(--c-rose)',
    tagClass: 'tag-rose',
    tags: [
      'Metasploit', 'Burp Suite', 'Nmap', 'SQLmap', 'Hydra',
      'Wireshark', 'Weevely', 'Shodan', 'Sublist3r', 'arp-scan', 'CyberChef',
      'SQL Injection', 'XSS', 'File Upload Exploitation',
      'Privilege Escalation', 'Lateral Movement', 'Webshell Deployment',
      'Password Spraying', 'Credential Harvesting',
    ],
  },
  {
    num: '03',
    category: 'Cloud & Infrastructure',
    accent: 'var(--c-violet)',
    tagClass: 'tag-violet',
    tags: [
      'AWS EC2', 'S3', 'RDS (MySQL)', 'VPC', 'ALB', 'Auto Scaling',
      'CloudFront', 'Route 53', 'NAT Gateway',
      'WAF', 'IAM', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail',
      'VPC Flow Logs', 'Security Groups', 'NACLs',
    ],
  },
  {
    num: '04',
    category: 'Security Practice',
    accent: 'var(--c-green)',
    tagClass: 'tag-green',
    tags: [
      'STRIDE', 'DREAD', 'OWASP Top 10', 'NIST CSF', 'ISO 27001',
      'PCI DSS', 'GDPR',
      'Elasticsearch', 'Kibana', 'Filebeat', 'auditd', 'EK Stack',
      'UFW', 'Apache2', 'SELinux', 'RBAC / ACL',
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) =>
              el.classList.add('in-view')
            )
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--ink-1)' }}
    >
      {/* Watermark */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(10rem, 22vw, 22rem)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.018)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14 md:mb-18 space-y-4">
          <div className="reveal">
            <span className="label" style={{ color: 'var(--c-cyan)' }}>// 02. SKILLS</span>
          </div>
          <h2
            className="reveal delay-100 font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Technical Arsenal
          </h2>
        </div>

        {/* Rows */}
        <div className="space-y-0">
          {rows.map((row, i) => (
            <div key={row.num}>
              <hr className="h-rule" />
              <div
                className={`reveal delay-${(i + 1) * 100} py-7 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10`}
              >
                {/* Left: num + category */}
                <div className="flex-shrink-0 sm:w-52">
                  <div
                    className="flex items-baseline gap-3"
                  >
                    <span
                      className="font-display text-2xl font-bold leading-none"
                      style={{ color: row.accent, opacity: 0.45 }}
                    >
                      {row.num}
                    </span>
                    <span
                      className="font-mono text-[11px] tracking-[0.15em] uppercase font-semibold"
                      style={{ color: row.accent }}
                    >
                      {row.category}
                    </span>
                  </div>
                </div>

                {/* Right: tags */}
                <div className="flex flex-wrap gap-1.5">
                  {row.tags.map((tag) => (
                    <span key={tag} className={`tag ${row.tagClass}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <hr className="h-rule" />
        </div>
      </div>
    </section>
  )
}
