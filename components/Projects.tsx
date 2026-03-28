'use client'

import { useEffect, useRef } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'

interface CaseStudy {
  num: string
  badge: string
  badgeClass: string
  title: string
  tagline: string
  accent: string
  challenge: string
  built: string[]
  impact: { value: string; label: string }[]
  tech: string[]
}

const workProjects: CaseStudy[] = [
  {
    num: '01',
    badge: 'Professional · Full Stack',
    badgeClass: 'tag-cyan',
    title: 'MOSTCOOL Reliability Web Platform',
    tagline: 'Enterprise-grade R(t)/A(t) analysis tool — containerized, zero-config, anywhere-deployable.',
    accent: 'var(--c-cyan)',
    challenge: 'Researchers were locked to a legacy Windows-only desktop tool with no scalability, no access from other devices, and no API surface.',
    built: [
      'Microservice-decoupled React.js + Flask architecture with 8 REST endpoints',
      'React Flow graph editor: 7 custom node types, 14 action types, 6 parallel Map collections',
      'Brute-force DFS state enumeration (Python + NetworkX) — 2ᴺ states, capped at N=22 (4.2M evaluations)',
      'Multi-sheet Excel round-trip serialization via SheetJS (5 worksheets, backward compat)',
      'Cross-platform Bash automation for Docker orchestration across ARM64 + x86_64',
    ],
    impact: [
      { value: '50%',   label: 'API Latency Reduction' },
      { value: '4.2M',  label: 'State Evaluations' },
      { value: '1 CMD', label: 'Docker Deploy' },
    ],
    tech: ['React.js', 'Flask', 'Docker', 'Python', 'NetworkX', 'React Flow', 'SheetJS'],
  },
  {
    num: '02',
    badge: 'Professional · Full Stack + Security',
    badgeClass: 'tag-violet',
    title: 'MOSTCOOL Research Platform',
    tagline: 'Public-facing hub for a federally funded research initiative — distribution platform, OWASP-hardened, serving 850+ downloads across MOSTCOOL modules.',
    accent: 'var(--c-violet)',
    challenge: 'A federally funded research initiative had no public web presence, no automated software distribution, and no stakeholder engagement platform.',
    built: [
      '10+ page responsive MPA: modal modules directory, team directory, timeline news feed',
      'Flask REST API + GitHub Issues API integration for automated support ticketing',
      'Gated ZIP download pipeline with GitHub Actions CI/CD + Gunicorn WSGI deployment',
      'OWASP Top 10 remediation (XSS, Insecure Design) — input validation + CORS whitelisting',
    ],
    impact: [
      { value: '850+', label: 'Downloads Served via Platform' },
      { value: '50%',  label: 'Bug Reduction' },
      { value: '10+',  label: 'Pages' },
    ],
    tech: ['HTML5', 'Tailwind CSS', 'Vanilla JS', 'Flask', 'GitHub API', 'GitHub Actions', 'Gunicorn'],
  },
]

const personalProjects: CaseStudy[] = [
  {
    num: '03',
    badge: 'Personal · Cloud Security',
    badgeClass: 'tag-green',
    title: 'Scalable & Secure E-Commerce Platform on AWS',
    tagline: 'Production-grade cloud-native architecture with defense-in-depth security at every layer.',
    accent: 'var(--c-green)',
    challenge: 'Design and deploy a production-grade e-commerce platform from scratch on AWS — handling variable load, zero single points of failure, security embedded at every layer.',
    built: [
      'Multi-tier HA: ALB → EC2 Auto Scaling Group → Multi-AZ RDS (MySQL)',
      'AWS WAF with custom rule sets blocking SQL injection and XSS at the edge',
      'ACM for end-to-end TLS/HTTPS + KMS customer-managed keys (AES-256 at rest)',
      'CloudFront CDN with custom cache behaviors for global content delivery',
      'Private VPC: public/private subnet segmentation, NAT Gateway, Security Groups',
      'Full observability: CloudWatch dashboards + CloudTrail immutable API audit logs',
    ],
    impact: [
      { value: 'Multi-AZ', label: 'Redundancy' },
      { value: 'D-in-D',   label: 'Security Model' },
      { value: 'Zero',     label: 'Single Point of Failure' },
    ],
    tech: ['AWS EC2', 'S3', 'RDS', 'VPC', 'ALB', 'WAF', 'CloudFront', 'KMS', 'ACM', 'CloudWatch', 'CloudTrail'],
  },
]

function CaseStudyEntry({ project }: { project: CaseStudy }) {
  return (
    <div className="reveal py-12">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <span
          className="font-display font-bold leading-none flex-shrink-0"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: project.accent, opacity: 0.22, lineHeight: 1 }}
        >
          {project.num}
        </span>
        <div className="flex-1 pt-1">
          <span className={`tag ${project.badgeClass} mb-3 inline-block`}>{project.badge}</span>
          <h3
            className="font-display font-bold text-c-text leading-tight mb-2"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
          >
            {project.title}
          </h3>
          <p className="text-c-muted text-sm leading-relaxed">{project.tagline}</p>
        </div>
      </div>

      {/* 3-column case study grid */}
      <div
        className="grid sm:grid-cols-3 gap-0 border rounded overflow-hidden"
        style={{ borderColor: 'var(--c-line)' }}
      >
        {/* Challenge */}
        <div
          className="p-5 border-b sm:border-b-0 sm:border-r"
          style={{ borderColor: 'var(--c-line)', background: 'var(--overlay-xs)' }}
        >
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: project.accent }}>
            Challenge
          </p>
          <p className="text-c-sub text-xs leading-relaxed">{project.challenge}</p>
        </div>

        {/* What I Built */}
        <div
          className="p-5 border-b sm:border-b-0 sm:border-r"
          style={{ borderColor: 'var(--c-line)', background: 'var(--overlay-sm)' }}
        >
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: project.accent }}>
            What I Built
          </p>
          <ul className="space-y-1.5">
            {project.built.map((b, i) => (
              <li key={i} className="flex gap-2 text-xs text-c-sub leading-relaxed">
                <span className="flex-shrink-0 font-mono" style={{ color: project.accent }}>→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact */}
        <div className="p-5" style={{ background: 'var(--overlay-xs)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: project.accent }}>
            Impact
          </p>
          <div className="space-y-4">
            {project.impact.map((m, i) => (
              <div key={i}>
                <div
                  className="font-display font-bold leading-none mb-0.5"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: project.accent }}
                >
                  {m.value}
                </div>
                <div className="font-mono text-[10px] tracking-wider uppercase text-c-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  )
}

function SubLabel({ icon, label, meta }: { icon: React.ReactNode; label: string; meta: string }) {
  return (
    <div className="reveal flex items-center gap-3 mb-2 flex-wrap">
      <div className="flex items-center gap-2">
        <span className="text-c-muted">{icon}</span>
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-c-sub font-semibold">
          {label}
        </span>
      </div>
      <div className="flex-1 h-px min-w-4" style={{ background: 'var(--c-line)' }} />
      <span className="tag">{meta}</span>
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
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'))
          }
        })
      },
      { threshold: 0.04 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-0 right-0 watermark" aria-hidden="true">03</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-16 space-y-4">
          <div className="reveal">
            <span className="label text-c-cyan">// 03. PROJECTS</span>
          </div>
          <h2
            className="reveal delay-100 font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            What I&apos;ve Built
          </h2>
        </div>

        <SubLabel icon={<Briefcase size={14} />} label="Professional Work" meta="CALCE · University of Maryland" />
        <hr className="h-rule" />
        {workProjects.map((p) => (
          <div key={p.num}>
            <CaseStudyEntry project={p} />
            <hr className="h-rule" />
          </div>
        ))}

        <div className="mt-16">
          <SubLabel icon={<GraduationCap size={14} />} label="Personal &amp; Academic" meta="Independent Work" />
          <hr className="h-rule" />
          {personalProjects.map((p) => (
            <div key={p.num}>
              <CaseStudyEntry project={p} />
              <hr className="h-rule" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
