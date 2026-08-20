interface SkillRow {
  category: string
  tags: string[]
}

const rows: SkillRow[] = [
  {
    category: 'Application & Product Security',
    tags: [
      'Secure SDLC', 'Threat Modeling', 'Attack Surface Analysis',
      'Security Architecture & Design Review', 'Secure Code Review',
      'Web/API Security', 'Vulnerability Management', 'Remediation Validation',
      'Security Retesting',
    ],
  },
  {
    category: 'Application Security Testing',
    tags: [
      'DAST', 'Burp Suite', 'OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'IDOR',
      'Authentication/Authorization Testing', 'Session Management',
      'File Upload Security', 'CORS', 'Business Logic Testing',
    ],
  },
  {
    category: 'Advanced Web Security',
    tags: [
      'API Testing', 'Access Control', 'SSRF', 'JWT Security',
      'HTTP Request Smuggling', 'Web Cache Issues', 'Path Traversal',
      'XXE', 'Command Injection',
    ],
  },
  {
    category: 'Security Tools',
    tags: [
      'Burp Suite', 'BloodHound', 'Impacket', 'NetExec', 'Chisel',
      'WinPEAS', 'LinPEAS', 'msfvenom', 'Nmap', 'SQLmap', 'Wireshark',
    ],
  },
  {
    category: 'Security Automation',
    tags: ['Python', 'Bash / Shell', 'Recon', 'Endpoint Discovery', 'Fuzzing', 'Payload Testing', 'Custom Payloads'],
  },
  {
    category: 'Programming & Web',
    tags: ['Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React.js', 'Node.js', 'Flask', 'RESTful APIs'],
  },
  {
    category: 'DevSecOps & Engineering',
    tags: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Bash / Shell', 'Secure Deployment', 'Logging'],
  },
  {
    category: 'Cloud & Infrastructure Security',
    tags: [
      'AWS EC2', 'S3', 'RDS', 'VPC', 'ALB', 'CloudFront', 'Route 53',
      'WAF', 'IAM', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail',
      'VPC Flow Logs', 'Security Groups', 'NACLs',
    ],
  },
  {
    category: 'Frameworks & Hardening',
    tags: [
      'OWASP Top 10', 'STRIDE', 'DREAD', 'NIST CSF', 'CIS Benchmarks',
      'Least Privilege', 'RBAC/ACLs', 'Network Segmentation',
      'SELinux', 'UFW', 'Patch Management',
    ],
  },
  {
    category: 'Operating Systems',
    tags: ['Linux (Ubuntu, Kali Linux)', 'Windows', 'macOS'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-6">Skills</h2>

      <dl className="space-y-3.5">
        {rows.map((row) => (
          <div key={row.category} className="sm:flex sm:gap-6">
            <dt className="text-sm font-medium text-c-text sm:w-56 sm:flex-shrink-0 mb-1 sm:mb-0">
              {row.category}
            </dt>
            <dd className="text-sm text-c-sub leading-relaxed">{row.tags.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
