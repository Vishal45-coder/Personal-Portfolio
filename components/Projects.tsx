interface Project {
  title: string
  tagline: string
  built: string[]
  tech: string[]
}

const projects: Project[] = [
  {
    title: 'Secure AWS E-Commerce Platform',
    tagline: 'A production-grade AWS environment, assessed the way an attacker would — auditing IAM, network, and host configuration instead of assuming secure-by-default.',
    built: [
      'Designed and deployed a scalable AWS environment — EC2, ALB, Auto Scaling, RDS, S3, CloudFront, Route 53, and VPC networking — with WAF, ACM, KMS, Security Groups, and NACLs for layered protection',
      'Performed application and cloud security reviews across IAM permissions, EC2 hardening, authentication boundaries, network controls, encryption, logging, and patching — identifying exposed secrets, insecure file permissions, and firewall gaps',
      'Implemented least-privilege IAM, HTTPS/TLS, encryption at rest, CloudWatch, CloudTrail, and VPC Flow Logs, prioritizing fixes by exploitability, severity, and potential blast radius',
      'Documented realistic attack paths from exposed credentials and cloud misconfigurations to privilege escalation and data exposure, linked to practical remediation and monitoring controls',
    ],
    tech: ['AWS EC2', 'ALB', 'Auto Scaling', 'RDS', 'S3', 'CloudFront', 'Route 53', 'VPC', 'WAF', 'ACM', 'KMS', 'IAM', 'CloudWatch', 'CloudTrail'],
  },
  {
    title: 'Secure Application Infrastructure & Security Monitoring',
    tagline: 'A 2-tier LAMP environment, segmented, threat-modeled, and instrumented with the kind of monitoring a security team needs to detect and investigate incidents.',
    built: [
      'Architected a 2-tier LAMP environment across Ubuntu servers, separating web and database tiers with Apache, PHP, and MySQL',
      'Hardened the environment with least-privilege RBAC/ACLs, restricted SSH access, service-specific UFW rules, and network segmentation to limit lateral movement',
      'Applied STRIDE threat modeling to classify 16 vulnerabilities across trust boundaries, then DREAD-scored 12 threat scenarios to prioritize remediation',
      'Deployed centralized security monitoring with Filebeat, Elasticsearch, and Kibana, ingesting 17.4M+ SSH and web events for real-time investigation',
    ],
    tech: ['Ubuntu', 'Apache', 'PHP', 'MySQL', 'UFW', 'RBAC/ACLs', 'STRIDE', 'DREAD', 'Elasticsearch', 'Kibana', 'Filebeat'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <h2 className="text-xl font-semibold text-c-text mb-6">Projects</h2>

      <div className="space-y-8">
        {projects.map((p) => (
          <div key={p.title}>
            <h3 className="font-medium text-c-text mb-1">{p.title}</h3>
            <p className="text-sm text-c-sub leading-relaxed mb-3">{p.tagline}</p>
            <ul className="space-y-1.5 list-disc list-outside pl-5 mb-3">
              {p.built.map((b, i) => (
                <li key={i} className="text-sm text-c-sub leading-relaxed">{b}</li>
              ))}
            </ul>
            <p className="text-sm text-c-muted">{p.tech.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
