'use client'

import { useEffect, useRef } from 'react'
import { Target, ShieldCheck, Cloud, BookOpen, Server } from 'lucide-react'

interface LabCard {
  icon: React.ReactNode
  title: string
  course: string
  badge: string
  badgeColor: string
  accentColor: string
  accentClass: string
  content: React.ReactNode
  tools: string[]
  delay: string
}

const offensiveTools = [
  'Metasploit', 'Burp Suite', 'Nmap', 'SQLmap', 'Hydra', 'Wireshark',
  'Weevely', 'Shodan', 'arp-scan', 'CyberChef', 'Sublist3r',
]

const defensiveTools = [
  'Elasticsearch', 'Kibana', 'Filebeat', 'UFW', 'auditd', 'CloudWatch',
  'CloudTrail', 'IAM Analyzer', 'NIST CSF', 'CIS Benchmarks',
]

const labCards: LabCard[] = [
  {
    icon: <Target size={18} />,
    title: 'Solo CTF — 6-Flag Full-Chain Exploitation',
    course: 'ENPM634, University of Maryland',
    badge: 'Full Kill Chain • Root',
    badgeColor: 'text-c-danger bg-c-danger/10 border-c-danger/25',
    accentColor: '#f43f5e',
    accentClass: 'card-accent-rose',
    delay: 'delay-100',
    tools: ['arp-scan', 'Nmap', 'SQLmap', 'Weevely', 'Hydra', 'CyberChef', 'Wireshark'],
    content: (
      <div className="space-y-2">
        <p className="text-xs text-c-muted font-mono mb-3">Attack chain:</p>
        {[
          'Network Recon → ifconfig, arp-scan',
          'Port Enum → Nmap (HTTP/80, SSH/22)',
          'SQL Injection → SQLmap → Database Dump → CEO Credentials',
          'File Upload → Weevely PHP Webshell → RCE',
          'SSH Pivot → Admin Private Key Exfiltration',
          'User Enum → /etc/passwd → Hydra Password Spray',
          'Root Escalation → Python ZIP Decryption → Hex Dump → CyberChef',
        ].map((step, i) => (
          <div key={i} className="flex gap-2.5 text-xs text-slate-400">
            <span className="text-c-danger font-mono flex-shrink-0 font-bold">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <Target size={18} />,
    title: 'Penetration Testing — CTF VM Exploitation',
    course: 'ENPM634, University of Maryland',
    badge: 'Black-Box Pentest',
    badgeColor: 'text-c-primary bg-c-primary/10 border-c-primary/25',
    accentColor: '#38bdf8',
    accentClass: 'card-accent-sky',
    delay: 'delay-200',
    tools: ['Nmap', 'Wireshark', 'Hydra', 'CyberChef', 'SSH'],
    content: (
      <ul className="space-y-2">
        {[
          'Nmap enumeration (SSH/22, HTTP/80, SMB/139, SMB/445)',
          'Wireshark credential capture — plaintext HTTP traffic exploitation',
          'Hydra brute-force attack + lateral movement via SSH',
          'Hex dump + CyberChef data exfiltration',
        ].map((item, i) => (
          <li key={i} className="flex gap-2.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-c-primary flex-shrink-0 mt-1"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: <Cloud size={18} />,
    title: 'Cloud Security Assessment — AWS',
    course: 'ENPM665, University of Maryland',
    badge: 'AWS • NIST CSF • CIS',
    badgeColor: 'text-c-accent bg-c-accent/10 border-c-accent/25',
    accentColor: '#34d399',
    accentClass: 'card-accent-emerald',
    delay: 'delay-300',
    tools: ['AWS CLI', 'IAM Analyzer', 'NIST CSF', 'CIS Benchmarks'],
    content: (
      <ul className="space-y-2">
        {[
          'IAM trust relationship enumeration + audit',
          'EC2 hardening: absent patch management, chmod -R 755 exposing .env + API keys',
          'Missing iptables/nftables firewall + no IDS/IPS (Snort/Suricata)',
          'SELinux in permissive mode (sestatus: Current mode: permissive)',
          'Synthesized 6-domain risk report aligned to NIST CSF + CIS Benchmarks',
        ].map((item, i) => (
          <li key={i} className="flex gap-2.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-c-accent flex-shrink-0 mt-1"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: <BookOpen size={18} />,
    title: 'Enterprise Security Assessment — Threat Modeling',
    course: 'ENPM686, University of Maryland',
    badge: 'STRIDE • DREAD • ISO 27001',
    badgeColor: 'text-c-secondary bg-c-secondary/10 border-c-secondary/25',
    accentColor: '#818cf8',
    accentClass: 'card-accent-indigo',
    delay: 'delay-100',
    tools: ['STRIDE', 'DREAD', 'NIST CSF', 'ISO 27001', 'PCI DSS', 'GDPR'],
    content: (
      <ul className="space-y-2">
        {[
          'STRIDE threat modeling — mapped 16 vulnerabilities across 6 threat categories',
          'DREAD scoring across 12 threat scenarios: DoS (7.8), Phishing (7.8), Credential Theft (7.6)',
          '65+ workstations/servers assessed (Ubuntu 22.04, Windows 10, macOS)',
          '$250,400/year remediation roadmap: Cloudflare WAF, Okta IAM, Splunk, HashiCorp Vault',
          'Compliance gap analysis: NIST CSF, ISO 27001, PCI DSS, GDPR',
        ].map((item, i) => (
          <li key={i} className="flex gap-2.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-c-secondary flex-shrink-0 mt-1"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: <Server size={18} />,
    title: 'Linux Infrastructure & SIEM',
    course: 'ENPM818P, University of Maryland',
    badge: 'EK Stack • 17.4M+ Logs',
    badgeColor: 'text-c-accent bg-c-accent/10 border-c-accent/25',
    accentColor: '#34d399',
    accentClass: 'card-accent-emerald',
    delay: 'delay-200',
    tools: ['Elasticsearch', 'Kibana', 'Filebeat', 'UFW', 'Apache2', 'auditd'],
    content: (
      <ul className="space-y-2">
        {[
          '2-tier LAMP stack (www-vm + db-vm): Apache2, PHP, MySQL, phpMyAdmin, WordPress',
          'Least-privilege RBAC with ACLs + UFW firewall (SSH restricted to VM host IP)',
          'EK Stack (Elasticsearch + Kibana) — eliminated Logstash overhead',
          '17.4M+ log entries indexed and queryable in real-time via Kibana Discover',
          'MySQL port 3306 locked to www-vm IP only (network segmentation)',
        ].map((item, i) => (
          <li key={i} className="flex gap-2.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-c-accent flex-shrink-0 mt-1"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
]

function LabCard({ card }: { card: LabCard }) {
  return (
    <div
      className={`reveal-up ${card.delay} bg-bg-surface/60 backdrop-blur-sm border border-white/5 ${card.accentClass} rounded-xl overflow-hidden hover:border-white/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: `${card.accentColor}15`,
              color: card.accentColor,
            }}
          >
            {card.icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 leading-snug mb-1">
              {card.title}
            </h3>
            <p className="text-xs text-c-muted font-mono">{card.course}</p>
          </div>
        </div>

        {/* Badge */}
        <span
          className={`inline-block text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border mb-4 ${card.badgeColor}`}
        >
          {card.badge}
        </span>

        {/* Content */}
        <div className="mb-4">{card.content}</div>

        {/* Tools */}
        <div className="pt-3 border-t border-white/5">
          <p className="text-xs text-c-muted mb-2 font-mono">Tools used:</p>
          <div className="flex flex-wrap gap-1.5">
            {card.tools.map((tool) => (
              <span
                key={tool}
                className="bg-bg-surface-2 text-slate-400 text-xs px-2 py-0.5 rounded-full border border-white/5"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Security() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'rgba(2, 8, 23, 0.98)' }}
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 dot-grid opacity-5" aria-hidden="true" />

      {/* Left glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #34d399 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="reveal-up">
            <span className="section-label-green">// 05. SECURITY</span>
          </div>
          <h2 className="reveal-up delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100">
            Offensive Security Practice
          </h2>
          <p className="reveal-up delay-200 text-c-muted text-base sm:text-lg max-w-2xl mx-auto">
            From black-box recon to root access — documented attack chains and
            security research
          </p>
        </div>

        {/* Certification badge */}
        <div className="reveal-up delay-300 flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-amber-400/25 bg-amber-400/5">
            <ShieldCheck size={18} className="text-amber-400" />
            <div>
              <p className="text-sm font-semibold text-amber-400">
                Burp Suite Certified Practitioner (BSCP)
              </p>
              <p className="text-xs text-c-muted font-mono">
                Certification In Progress · PortSwigger
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full">
              In Progress
            </span>
          </div>
        </div>

        {/* Lab cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-12 md:mb-14">
          {labCards.map((card) => (
            <LabCard key={card.title} card={card} />
          ))}
        </div>

        {/* Security tools */}
        <div className="reveal-up delay-400 glass rounded-2xl p-5 sm:p-6 md:p-8">
          <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-5 sm:mb-6 font-mono text-center">
            Security Tools &amp; Frameworks
          </h3>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <p className="text-xs font-mono text-c-danger mb-3 uppercase tracking-wider">
                Offensive
              </p>
              <div className="flex flex-wrap gap-2">
                {offensiveTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-full border text-c-danger/80 border-c-danger/20 bg-c-danger/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-c-accent mb-3 uppercase tracking-wider">
                Defensive / SIEM
              </p>
              <div className="flex flex-wrap gap-2">
                {defensiveTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-full border text-c-accent/80 border-c-accent/20 bg-c-accent/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
