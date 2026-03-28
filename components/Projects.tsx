'use client'

import { useEffect, useRef } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'

interface ProjectMetric {
  label: string
}

interface Project {
  accentColor: string
  accentClass: string
  badge: string
  badgeColor: string
  title: string
  description: string
  bullets: string[]
  metrics: ProjectMetric[]
  techStack: string[]
}

const workProjects: Project[] = [
  {
    accentColor: '#38bdf8',
    accentClass: 'card-accent-sky',
    badge: 'Work Project · Full Stack',
    badgeColor: 'text-c-primary bg-c-primary/10 border-c-primary/20',
    title: 'MOSTCOOL Reliability Web Platform',
    description:
      'Sole architect of an enterprise-grade R(t)/A(t) analysis tool for data center liquid cooling. Modernized a legacy desktop application into a full-stack containerized web platform — accessible from any device with a single Docker command.',
    bullets: [
      'Microservice-decoupled React.js + Flask architecture with 8 REST endpoints',
      'React Flow graph editor with 7 custom node types and centralized useReducer state manager (14 action types, 6 parallel Map collections)',
      'Brute-force state enumeration (Python, NetworkX) — evaluates all 2ᴺ states via DFS, capped at N=22 (4.2M evaluations)',
      'Multi-sheet Excel round-trip serialization (SheetJS, 5 worksheets) with backward compatibility and orphaned-node cleanup',
      'Cross-platform Bash/Shell automation suite for ARM64 + x86_64 Docker orchestration',
    ],
    metrics: [
      { label: '50% API Latency Reduction' },
      { label: '4.2M State Evaluations' },
      { label: '5 Worksheet Export' },
    ],
    techStack: ['React.js', 'Flask', 'Docker', 'Python', 'NetworkX', 'React Flow', 'SheetJS'],
  },
  {
    accentColor: '#818cf8',
    accentClass: 'card-accent-indigo',
    badge: 'Work Project · Full Stack + Security',
    badgeColor: 'text-c-secondary bg-c-secondary/10 border-c-secondary/20',
    title: 'MOSTCOOL Research Platform — Public Facing',
    description:
      'Designed and built the public-facing hub for a federally funded research initiative: a 10+ page responsive MPA serving 850+ software downloads, researcher onboarding, and stakeholder engagement.',
    bullets: [
      'Data-driven UI systems in Vanilla JS: modal modules directory (7+ modules), team directory with filtering (15+ members), timeline news feed with URL deep-link routing',
      'Flask REST API + GitHub Issues API integration (token-authenticated) for automated support ticketing from the web UI',
      'Gated ZIP download pipeline for secure software distribution — deployed with GitHub Actions CI/CD and Gunicorn WSGI',
      'OWASP Top 10 remediation (XSS, Insecure Design): input validation, CORS whitelisting — cut production bugs by 50%',
    ],
    metrics: [
      { label: '850+ Software Downloads' },
      { label: '50% Bug Reduction' },
      { label: '10+ Pages' },
    ],
    techStack: ['HTML5', 'Tailwind CSS', 'Vanilla JS', 'Flask', 'GitHub API', 'GitHub Actions', 'Gunicorn'],
  },
]

const personalProjects: Project[] = [
  {
    accentColor: '#34d399',
    accentClass: 'card-accent-emerald',
    badge: 'Personal Project · Cloud Security',
    badgeColor: 'text-c-accent bg-c-accent/10 border-c-accent/20',
    title: 'Scalable & Secure E-Commerce Platform on AWS',
    description:
      'Independently designed, architected, and deployed a production-grade, full-stack e-commerce platform on AWS with defense-in-depth security at every layer. Built to handle variable load with zero single points of failure.',
    bullets: [
      'Multi-tier high availability: ALB → EC2 Auto Scaling Group → Multi-AZ RDS (MySQL)',
      'AWS WAF with custom rule sets blocking SQL injection and XSS at the edge',
      'ACM for end-to-end TLS/HTTPS + KMS with customer-managed keys (AES-256 encryption at rest)',
      'CloudFront CDN with custom cache behaviors and TTL policies for global content delivery',
      'Least-privilege IAM with role-based access policies across all services',
      'Private VPC with public/private subnet segmentation, NAT Gateway, and Security Groups',
      'Full observability: CloudWatch dashboards + CloudTrail for immutable API audit logging',
    ],
    metrics: [
      { label: 'Multi-AZ Redundancy' },
      { label: 'Defense-in-Depth Security' },
      { label: 'Zero Single Point of Failure' },
    ],
    techStack: [
      'AWS EC2', 'S3', 'RDS', 'VPC', 'ALB',
      'WAF', 'CloudFront', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail',
    ],
  },
]

function ProjectCard({ project, delay }: { project: Project; delay: string }) {
  return (
    <div
      className={`reveal-up ${delay} group relative flex flex-col bg-bg-surface/60 backdrop-blur-sm border border-white/5 ${project.accentClass} rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
        {/* Badge */}
        <div className="mb-4">
          <span
            className={`inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full border ${project.badgeColor}`}
          >
            {project.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Technical bullets */}
        <ul className="space-y-2 mb-5 flex-1">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                style={{ background: project.accentColor }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Metrics */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 py-3.5 border-y border-white/5 mb-5">
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: project.accentColor }}
              />
              <span className="text-xs font-semibold" style={{ color: project.accentColor }}>
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-bg-surface-2 text-slate-300 text-xs px-2.5 py-0.5 rounded-full border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SubsectionHeader({
  icon,
  label,
  meta,
  iconBg,
}: {
  icon: React.ReactNode
  label: string
  meta: string
  iconBg: string
}) {
  return (
    <div className="reveal-up flex items-center gap-3 mb-8 flex-wrap">
      <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-200 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        {label}
      </div>
      <div className="flex-1 h-px bg-white/5 min-w-[24px]" />
      <span className="text-xs font-mono text-c-muted bg-bg-surface px-3 py-1 rounded-full border border-white/5 flex-shrink-0">
        {meta}
      </span>
    </div>
  )
}

export default function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="reveal-up">
            <span className="section-label">// 03. PROJECTS</span>
          </div>
          <h2 className="reveal-up delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100">
            What I&apos;ve Built
          </h2>
          <p className="reveal-up delay-200 text-c-muted text-base sm:text-lg max-w-2xl mx-auto">
            Production systems, cloud architecture, and security research — built to last
          </p>
        </div>

        {/* ── Professional Work (CALCE) ── */}
        <div className="mb-16">
          <SubsectionHeader
            icon={<Briefcase size={15} className="text-c-primary" />}
            label="Professional Work"
            meta="CALCE · University of Maryland"
            iconBg="rgba(56,189,248,0.1)"
          />
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {workProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                delay={i === 0 ? 'delay-100' : 'delay-200'}
              />
            ))}
          </div>
        </div>

        {/* ── Personal & Academic Projects ── */}
        <div>
          <SubsectionHeader
            icon={<GraduationCap size={15} className="text-c-accent" />}
            label="Personal &amp; Academic Projects"
            meta="Independent Work"
            iconBg="rgba(52,211,153,0.1)"
          />
          <div className="max-w-3xl mx-auto">
            {personalProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                delay={`delay-${(i + 1) * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
