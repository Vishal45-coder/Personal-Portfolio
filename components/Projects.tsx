'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { fadeUp, fadeIn, staggerContainer, tagPop, staggerTags, viewport } from '@/lib/motion'

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
    tagline: 'I rebuilt a legacy Windows-only desktop tool into a containerized web platform — one command deploys it anywhere, on any machine.',
    accent: 'var(--c-cyan)',
    challenge: 'Researchers at CALCE were locked into a Windows-only desktop app with no web access, no API, and no scalability. I needed to rebuild the entire system as a modern, deployable web platform.',
    built: [
      'Built a microservice-decoupled React.js + Flask architecture with 8 REST endpoints',
      'Designed a React Flow graph editor with 7 custom node types, 14 action types, 6 parallel Map collections',
      'Implemented brute-force DFS state enumeration (Python + NetworkX) — 2ᴺ states, capped at N=22 (4.2M evaluations)',
      'Engineered multi-sheet Excel round-trip serialization via SheetJS (5 worksheets, full backward compat)',
      'Wrote cross-platform Bash automation for Docker orchestration across ARM64 + x86_64',
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
    tagline: 'I built the entire public web presence for a federally funded research lab from scratch — automated software distribution, OWASP-hardened, serving 850+ downloads.',
    accent: 'var(--c-violet)',
    challenge: 'The lab had no public web presence, no way to distribute software to researchers, and no support infrastructure. I designed and built the full platform from zero.',
    built: [
      'Designed a 10+ page responsive MPA: modal modules directory, team directory, timeline news feed',
      'Built a Flask REST API integrated with GitHub Issues API for automated support ticketing',
      'Engineered a gated ZIP download pipeline with GitHub Actions CI/CD + Gunicorn WSGI deployment',
      'Remediated OWASP Top 10 vulnerabilities (XSS, Insecure Design) — input validation + CORS whitelisting cut production bugs by 50%',
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
    tagline: 'I designed and deployed a production-grade AWS architecture with defense-in-depth security at every layer — zero single points of failure, end-to-end encrypted.',
    accent: 'var(--c-green)',
    challenge: 'I set out to build a production e-commerce system on AWS from scratch — handling variable load, eliminating single points of failure, and embedding security at every layer rather than bolting it on after.',
    built: [
      'Architected a multi-tier HA system: ALB → EC2 Auto Scaling Group → Multi-AZ RDS (MySQL)',
      'Configured AWS WAF with custom rule sets blocking SQL injection and XSS at the edge',
      'Set up ACM for end-to-end TLS/HTTPS and KMS customer-managed keys (AES-256 at rest)',
      'Deployed CloudFront CDN with custom cache behaviors for global content delivery',
      'Designed a private VPC with public/private subnet segmentation, NAT Gateway, and Security Groups',
      'Built full observability: CloudWatch dashboards + CloudTrail immutable API audit logs',
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
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="py-12"
      variants={reduced ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
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

      {/* 3-column case study grid — lifts slightly on hover */}
      <motion.div
        className="grid sm:grid-cols-3 gap-0 border rounded overflow-hidden"
        style={{ borderColor: 'var(--c-line)' }}
        whileHover={reduced ? {} : { y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', transition: { duration: 0.22 } }}
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
      </motion.div>

      {/* Tech tags */}
      <motion.div
        className="flex flex-wrap gap-1.5 mt-4"
        variants={reduced ? {} : staggerTags}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {project.tech.map((t) => (
          <motion.span key={t} className="tag" variants={reduced ? {} : tagPop}>
            {t}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

function SubLabel({ icon, label, meta }: { icon: React.ReactNode; label: string; meta: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="flex items-center gap-3 mb-2 flex-wrap"
      variants={reduced ? {} : fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="flex items-center gap-2">
        <span className="text-c-muted">{icon}</span>
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-c-sub font-semibold">
          {label}
        </span>
      </div>
      <div className="flex-1 h-px min-w-4" style={{ background: 'var(--c-line)' }} />
      <span className="tag">{meta}</span>
    </motion.div>
  )
}

export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-0 right-0 watermark" aria-hidden="true">03</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          className="mb-16 space-y-4"
          variants={reduced ? {} : staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={reduced ? {} : fadeUp}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium text-c-muted">03</span>
              <div className="w-6 h-px" style={{ background: 'var(--c-line)' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-muted">Projects</span>
            </div>
          </motion.div>
          <motion.h2
            className="font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            variants={reduced ? {} : fadeUp}
          >
            What I&apos;ve Built
          </motion.h2>
        </motion.div>

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
