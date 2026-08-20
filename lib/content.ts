export const profile = {
  name: 'Vishal Raavi',
  role: 'Software Security Engineer',
  credentials: 'OSCP certified · M.Eng. Cybersecurity, University of Maryland · 3.88 GPA',
  location: 'College Park, MD',
  email: 'vishalraavi.work@gmail.com',
  phone: '240-854-2384',
  linkedin: 'https://linkedin.com/in/vishalraavi',
  github: 'https://github.com/vishal45-coder',
  resume: '/Vishal_Resume.pdf',
  summary:
    'I work in application and product security, covering threat modeling, secure design review, manual and dynamic testing, and remediation validation. I also build the systems I review, using React, Flask, Python, and Docker, which keeps my findings specific to how the software actually ships.',
  availability:
    'Open to full time roles in application security, product security, and cloud security.',
}

export interface Metric {
  value: string
  label: string
  detail: string
}

export const metrics: Metric[] = [
  { value: 'OSCP',   label: 'Certified 2026',        detail: 'OffSec Certified Professional, OSID57747451' },
  { value: '100+',   label: 'Apps and APIs assessed', detail: 'Production web applications and REST APIs security tested' },
  { value: '50%',    label: 'Fewer software defects', detail: 'Achieved through OWASP Top 10 review and remediation' },
  { value: '17.4M+', label: 'Events monitored',         detail: 'SSH and web events indexed for real time investigation' },
]

export interface Role {
  period: string
  current: boolean
  title: string
  company: string
  location: string
  summary: string
  bullets: string[]
  stack: string[]
}

export const roles: Role[] = [
  {
    period: 'Apr 2024 to Present',
    current: true,
    title: 'Software Security Engineer, Product Security',
    company: 'University of Maryland',
    location: 'College Park, MD',
    summary:
      'Own application security across the development lifecycle for research software that is exposed to external users, and build production features on the same codebase.',
    bullets: [
      'Cut software defects by 50% through OWASP Top 10 code review and remediation of XSS, insecure design, input validation, and cross origin weaknesses, using server and client side validation, CORS hardening, and DOM safe content handling.',
      'Run manual and dynamic testing with Burp Suite across API endpoints, authentication and authorization flows, session handling, input validation, CORS behavior, and business logic, then reproduce findings and confirm real impact before remediation.',
      'Embed security into the SDLC by reviewing attack surface, trust boundaries, REST APIs, user controlled inputs, file processing paths, and externally exposed functionality at design, development, and release.',
      'Lead threat modeling and security design reviews across frontend and backend data flows, service integrations, and privilege boundaries, turning high risk attack paths into concrete engineering controls.',
      'Design token authenticated Flask REST APIs and access controlled workflows that strengthen authentication, authorization, and session boundaries for externally accessible functionality.',
      'Partner with developers on triage, root cause analysis, code level fixes, and retesting before release to confirm remediation and prevent regression.',
      'Reduced application response time by 50% while building production services with React, Flask, Python, REST APIs, and Docker.',
      'Standardized releases with GitHub Actions, CI/CD, Docker, and shell automation, improving deployment reliability, logging visibility, and secure configuration management.',
    ],
    stack: ['Burp Suite', 'OWASP Top 10', 'Threat Modeling', 'Flask', 'React', 'Python', 'Docker', 'GitHub Actions'],
  },
  {
    period: 'Nov 2022 to Dec 2023',
    current: false,
    title: 'Application Security Engineer',
    company: 'Sathayush Technologies',
    location: 'Hyderabad, India',
    summary:
      'Delivered security assessments for client web applications and APIs, then worked with their engineering teams through remediation and retest.',
    bullets: [
      'Assessed more than 100 production web applications and REST APIs, identifying SQL injection, XSS, CSRF, IDOR, authentication and authorization bypasses, insecure file handling, and security misconfigurations using Burp Suite, Nmap, and custom payloads.',
      'Reviewed authentication, authorization, user controlled inputs, API endpoints, session management, business logic, and sensitive data exposure, and gave developers specific remediation guidance for every confirmed finding.',
      'Worked with software engineers through reproduction, root cause analysis, secure implementation changes, and retesting before closure.',
      'Ran threat modeling, attack surface analysis, and security design reviews for web and cloud hosted applications, prioritizing controls by likelihood and potential impact.',
      'Built Python and Bash tooling for reconnaissance, endpoint discovery, fuzzing, and payload testing, which widened coverage and reserved manual effort for higher risk functionality.',
      'Performed internal and external infrastructure assessments, validating SMB, LDAP, and identity misconfigurations with Metasploit, NetExec, and BloodHound.',
    ],
    stack: ['Burp Suite', 'Nmap', 'Metasploit', 'BloodHound', 'NetExec', 'Python', 'Bash'],
  },
]

export const education = {
  degree: 'Master of Engineering, Cybersecurity',
  school: 'University of Maryland, College Park',
  location: 'College Park, MD',
  period: 'Jan 2024 to Dec 2025',
  gpa: '3.88 / 4.0',
  coursework: ['Cloud Security', 'Penetration Testing', 'Security Tools', 'Secure Software Design'],
}

export interface Credential {
  name: string
  issuer: string
  detail: string
  status: 'Earned' | 'In progress' | 'Completed'
  year: string
}

export const certifications: Credential[] = [
  {
    name: 'OffSec Certified Professional (OSCP)',
    issuer: 'OffSec',
    detail: 'OSID57747451',
    status: 'Earned',
    year: '2026',
  },
  {
    name: 'Burp Suite Certified Practitioner (BSCP)',
    issuer: 'PortSwigger',
    detail: 'Web and API security testing',
    status: 'In progress',
    year: '',
  },
  {
    name: 'Software Design Threats and Mitigations',
    issuer: 'University of Colorado System',
    detail: 'Secure software design',
    status: 'Completed',
    year: '',
  },
  {
    name: 'Software Design as an Element of the Software Development Lifecycle',
    issuer: 'University of Colorado System',
    detail: 'Secure SDLC',
    status: 'Completed',
    year: '',
  },
]

export interface SkillGroup {
  category: string
  primary: boolean
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Application and product security',
    primary: true,
    skills: [
      'Secure SDLC', 'Threat modeling', 'Attack surface analysis',
      'Security architecture and design review', 'Secure code review',
      'Web and API security', 'Vulnerability management',
      'Remediation validation', 'Security retesting',
    ],
  },
  {
    category: 'Application security testing',
    primary: true,
    skills: [
      'DAST', 'Burp Suite', 'OWASP Top 10', 'SQL injection', 'XSS', 'CSRF', 'IDOR',
      'Authentication and authorization testing', 'Session management',
      'File upload security', 'CORS', 'Business logic testing',
    ],
  },
  {
    category: 'Advanced web security',
    primary: true,
    skills: [
      'API testing', 'Access control', 'SSRF', 'JWT security',
      'HTTP request smuggling', 'Web cache issues', 'Path traversal',
      'XXE', 'Command injection',
    ],
  },
  {
    category: 'Security tools',
    primary: true,
    skills: [
      'Burp Suite', 'BloodHound', 'Impacket', 'NetExec', 'Chisel',
      'WinPEAS', 'LinPEAS', 'msfvenom', 'Nmap', 'SQLmap', 'Wireshark',
    ],
  },
  {
    category: 'Security automation',
    primary: false,
    skills: ['Python', 'Bash', 'Recon', 'Endpoint discovery', 'Fuzzing', 'Payload testing', 'Custom payloads'],
  },
  {
    category: 'Programming and web',
    primary: false,
    skills: ['Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React', 'Node.js', 'Flask', 'REST APIs'],
  },
  {
    category: 'DevSecOps and engineering',
    primary: false,
    skills: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Bash', 'Secure deployment', 'Logging'],
  },
  {
    category: 'Cloud and infrastructure security',
    primary: false,
    skills: [
      'AWS EC2', 'S3', 'RDS', 'VPC', 'ALB', 'CloudFront', 'Route 53',
      'WAF', 'IAM', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail',
      'VPC Flow Logs', 'Security groups', 'NACLs',
    ],
  },
  {
    category: 'Frameworks and hardening',
    primary: false,
    skills: [
      'OWASP Top 10', 'STRIDE', 'DREAD', 'NIST CSF', 'CIS Benchmarks',
      'Least privilege', 'RBAC and ACLs', 'Network segmentation',
      'SELinux', 'UFW', 'Patch management',
    ],
  },
  {
    category: 'Operating systems',
    primary: false,
    skills: ['Linux (Ubuntu, Kali)', 'Windows', 'macOS'],
  },
]

export interface Project {
  slug: string
  title: string
  category: string
  summary: string
  problem: string
  work: string[]
  results: { value: string; label: string }[]
  stack: string[]
}

export const projects: Project[] = [
  {
    slug: 'secure-aws-ecommerce',
    title: 'Secure AWS E-Commerce Platform',
    category: 'Application and cloud security',
    summary:
      'Built a production style AWS environment, then assessed it as a target across identity, network, host, and data controls.',
    problem:
      'Cloud environments are usually reviewed against a diagram rather than tested as a live target. I built the full stack first so I could assess real running infrastructure instead of intended architecture.',
    work: [
      'Deployed a scalable environment on EC2, ALB, Auto Scaling, RDS, S3, CloudFront, Route 53, and VPC networking, with WAF, ACM, KMS, security groups, and NACLs providing layered protection.',
      'Reviewed IAM permissions, EC2 hardening, authentication boundaries, network controls, encryption, logging, and patching, and found exposed secrets, insecure file permissions, and firewall gaps.',
      'Remediated with least privilege IAM, HTTPS and TLS, encryption at rest, CloudWatch, CloudTrail, and VPC Flow Logs, prioritizing fixes by exploitability, severity, and blast radius.',
      'Documented full attack paths from exposed credentials and cloud misconfiguration through to privilege escalation and data exposure, each mapped to a remediation and a detection control.',
    ],
    results: [
      { value: '14', label: 'AWS services integrated' },
      { value: 'Least privilege', label: 'IAM model enforced' },
      { value: 'Full', label: 'Audit trail with CloudTrail and Flow Logs' },
    ],
    stack: ['AWS EC2', 'ALB', 'Auto Scaling', 'RDS', 'S3', 'CloudFront', 'Route 53', 'VPC', 'WAF', 'ACM', 'KMS', 'IAM', 'CloudWatch', 'CloudTrail'],
  },
  {
    slug: 'secure-infrastructure-monitoring',
    title: 'Secure Application Infrastructure and Security Monitoring',
    category: 'Threat modeling and detection',
    summary:
      'Segmented a two tier LAMP environment, threat modeled it with STRIDE and DREAD, and instrumented it with centralized log monitoring.',
    problem:
      'A working LAMP stack says nothing about whether an intrusion would be contained or even noticed. I set out to segment the tiers, model the threats formally, and prove the environment was observable at scale.',
    work: [
      'Architected a two tier LAMP environment across Ubuntu servers, separating web and database tiers running Apache, PHP, and MySQL.',
      'Hardened access with least privilege RBAC and ACLs, restricted SSH, service specific UFW rules, and network segmentation that limits lateral movement between tiers.',
      'Applied STRIDE threat modeling to classify 16 vulnerabilities across trust boundaries, then scored 12 threat scenarios with DREAD to prioritize remediation by risk.',
      'Deployed centralized monitoring with Filebeat, Elasticsearch, and Kibana, ingesting over 17.4 million SSH and web events for real time investigation.',
    ],
    results: [
      { value: '16', label: 'Vulnerabilities classified with STRIDE' },
      { value: '12', label: 'Threat scenarios scored with DREAD' },
      { value: '17.4M+', label: 'Events indexed and searchable' },
    ],
    stack: ['Ubuntu', 'Apache', 'PHP', 'MySQL', 'UFW', 'RBAC and ACLs', 'STRIDE', 'DREAD', 'Elasticsearch', 'Kibana', 'Filebeat'],
  },
]

export const aboutParagraphs = [
  'I am a Software Security Engineer at the University of Maryland, where I own application security across the development lifecycle for software that is exposed to external users. My work covers attack surface review, threat modeling, manual and dynamic testing with Burp Suite, and working directly with developers through triage, remediation, and retest.',
  'Before this I spent a year at Sathayush Technologies assessing client web applications and REST APIs. I tested more than 100 production applications for SQL injection, XSS, CSRF, IDOR, authentication and authorization flaws, insecure file handling, and misconfigurations, then worked with their engineering teams until each finding was closed and verified.',
  'I hold the OSCP and a Master of Engineering in Cybersecurity from the University of Maryland, completed with a 3.88 GPA. I am currently working toward the Burp Suite Certified Practitioner certification.',
  'I still write production code. Most of my engineering work is in React, Flask, Python, REST APIs, and Docker, with releases running through GitHub Actions. Knowing how a system is built is what makes a security review specific and actionable rather than generic.',
]
