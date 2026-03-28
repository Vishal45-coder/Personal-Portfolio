'use client'

import { useEffect, useRef } from 'react'
import {
  Code2,
  Layers,
  Bug,
  Crosshair,
  Cloud,
  ShieldCheck,
  Activity,
  BookOpen,
  Terminal,
} from 'lucide-react'

interface SkillCategory {
  icon: React.ReactNode
  title: string
  iconColor: string
  iconBg: string
  tags: string[]
  delay: string
}

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 size={18} />,
    title: 'Programming Languages',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.1)',
    tags: ['Python', 'Java', 'JavaScript', 'C', 'PHP', 'SQL', 'HTML', 'CSS'],
    delay: 'delay-100',
  },
  {
    icon: <Layers size={18} />,
    title: 'Frameworks & Libraries',
    iconColor: '#818cf8',
    iconBg: 'rgba(129,140,248,0.1)',
    tags: ['React.js', 'Node.js', 'Flask', 'Pandas', 'NumPy', 'React Flow', 'SheetJS', 'Plotly.js', 'RESTful API'],
    delay: 'delay-200',
  },
  {
    icon: <Bug size={18} />,
    title: 'Penetration Testing Tools',
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,0.1)',
    tags: ['Metasploit', 'Burp Suite', 'Nmap', 'SQLmap', 'Hydra', 'Wireshark', 'Weevely', 'Shodan', 'Sublist3r', 'arp-scan', 'CyberChef'],
    delay: 'delay-300',
  },
  {
    icon: <Crosshair size={18} />,
    title: 'Offensive Security',
    iconColor: '#f43f5e',
    iconBg: 'rgba(244,63,94,0.1)',
    tags: ['SQL Injection', 'XSS', 'File Upload Exploitation', 'Privilege Escalation', 'Lateral Movement', 'Password Spraying', 'Webshell Deployment', 'Credential Harvesting'],
    delay: 'delay-100',
  },
  {
    icon: <Cloud size={18} />,
    title: 'Cloud (AWS)',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.1)',
    tags: ['EC2', 'S3', 'RDS (MySQL)', 'VPC', 'ALB', 'Auto Scaling', 'CloudFront', 'Route 53', 'NAT Gateway'],
    delay: 'delay-200',
  },
  {
    icon: <ShieldCheck size={18} />,
    title: 'Cloud Security',
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,0.1)',
    tags: ['WAF', 'IAM', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail', 'VPC Flow Logs', 'Security Groups', 'NACLs'],
    delay: 'delay-300',
  },
  {
    icon: <Activity size={18} />,
    title: 'SIEM & Log Management',
    iconColor: '#818cf8',
    iconBg: 'rgba(129,140,248,0.1)',
    tags: ['Elasticsearch', 'Kibana', 'Filebeat', 'auditd', 'journalctl', 'EK Stack'],
    delay: 'delay-100',
  },
  {
    icon: <BookOpen size={18} />,
    title: 'Security Frameworks',
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,0.1)',
    tags: ['STRIDE', 'DREAD', 'OWASP Top 10', 'NIST CSF', 'ISO 27001', 'PCI DSS', 'GDPR'],
    delay: 'delay-200',
  },
  {
    icon: <Terminal size={18} />,
    title: 'DevOps & Tools',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.1)',
    tags: ['Git', 'GitHub Actions', 'Docker', 'Apache2', 'Gunicorn', 'Bash/Shell Scripting', 'Azure (Basics)'],
    delay: 'delay-300',
  },
]

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div
      className={`reveal-up ${category.delay} flex flex-col bg-bg-surface/60 backdrop-blur-sm border border-white/5 hover:border-sky-400/20 hover:shadow-lg hover:shadow-sky-400/5 hover:-translate-y-1 transition-all duration-300 rounded-xl p-4 sm:p-5`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: category.iconBg, color: category.iconColor }}
        >
          {category.icon}
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-slate-200 leading-tight">
          {category.title}
        </h3>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {category.tags.map((tag) => (
          <span
            key={tag}
            className="bg-bg-surface-2 text-slate-300 text-xs px-2 py-0.5 rounded-full border border-white/5 leading-relaxed"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-up')
              .forEach((el) => el.classList.add('in-view'))
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
      className="relative py-24 md:py-32 bg-bg-surface/20"
    >
      <div className="absolute inset-0 dot-grid opacity-10" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="reveal-up">
            <span className="section-label">// 02. SKILLS</span>
          </div>
          <h2 className="reveal-up delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100">
            Technical Arsenal
          </h2>
          <p className="reveal-up delay-200 text-c-muted text-base sm:text-lg max-w-xl mx-auto">
            From secure coding to offensive security — the complete toolkit
          </p>
        </div>

        {/* Grid — 1 col on mobile, 2 on sm, 3 on lg */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
