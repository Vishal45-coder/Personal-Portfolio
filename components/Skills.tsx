'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, tagPop, staggerTags, viewport } from '@/lib/motion'

interface SkillRow {
  num: string
  category: string
  accent: string
  tagClass: string
  tags: string[]
}

const rows: SkillRow[] = [
  {
    num: '01', category: 'Software Engineering', accent: 'var(--c-cyan)', tagClass: 'tag-cyan',
    tags: [
      'Python', 'Java', 'JavaScript', 'C', 'PHP', 'SQL',
      'React.js', 'Node.js', 'Flask', 'Pandas', 'NumPy',
      'Docker', 'Git', 'GitHub Actions', 'Bash / Shell',
      'REST API', 'Gunicorn', 'Azure (Basics)',
    ],
  },
  {
    num: '02', category: 'Offensive Security', accent: 'var(--c-rose)', tagClass: 'tag-rose',
    tags: [
      'Metasploit', 'Burp Suite', 'Nmap', 'SQLmap', 'Hydra',
      'Wireshark', 'Weevely', 'Shodan', 'Sublist3r', 'arp-scan', 'CyberChef',
      'SQL Injection', 'XSS', 'File Upload Exploitation',
      'Privilege Escalation', 'Lateral Movement', 'Webshell Deployment',
      'Password Spraying', 'Credential Harvesting',
    ],
  },
  {
    num: '03', category: 'Cloud & Infrastructure', accent: 'var(--c-violet)', tagClass: 'tag-violet',
    tags: [
      'AWS EC2', 'S3', 'RDS (MySQL)', 'VPC', 'ALB', 'Auto Scaling',
      'CloudFront', 'Route 53', 'NAT Gateway',
      'WAF', 'IAM', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail',
      'VPC Flow Logs', 'Security Groups', 'NACLs',
    ],
  },
  {
    num: '04', category: 'Security Practice', accent: 'var(--c-green)', tagClass: 'tag-green',
    tags: [
      'STRIDE', 'DREAD', 'OWASP Top 10', 'NIST CSF', 'ISO 27001',
      'PCI DSS', 'GDPR',
      'Elasticsearch', 'Kibana', 'Filebeat', 'auditd', 'EK Stack',
      'UFW', 'Apache2', 'SELinux', 'RBAC / ACL',
    ],
  },
]

export default function Skills() {
  const reduced = useReducedMotion()

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden bg-ink-1"
    >
      {/* Watermark */}
      <div className="absolute top-0 left-0 watermark" aria-hidden="true">02</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          className="mb-14 flex items-center justify-between"
          variants={reduced ? {} : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium text-c-muted">02</span>
            <div className="w-6 h-px" style={{ background: 'var(--c-line)' }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-muted">Skills &amp; Tools</span>
          </div>
          <span className="font-mono text-[10px] text-c-muted hidden sm:block">70+ technologies</span>
        </motion.div>

        <div className="space-y-0">
          {rows.map((row, i) => (
            <div key={row.num}>
              <hr className="h-rule" />
              <motion.div
                className="py-7 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10"
                variants={reduced ? {} : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex-shrink-0 sm:w-52">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-display text-2xl font-bold leading-none"
                      style={{ color: row.accent, opacity: 0.4 }}
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

                {/* Tags — staggered terminal-loading appearance */}
                <motion.div
                  className="flex flex-wrap gap-1.5"
                  variants={reduced ? {} : staggerTags}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  {row.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={`tag ${row.tagClass}`}
                      variants={reduced ? {} : tagPop}
                      whileHover={reduced ? {} : { scale: 1.06, transition: { duration: 0.12 } }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          ))}
          <hr className="h-rule" />
        </div>
      </div>
    </section>
  )
}
