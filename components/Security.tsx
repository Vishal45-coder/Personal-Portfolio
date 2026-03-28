'use client'

import { useEffect, useRef } from 'react'
import { ShieldCheck } from 'lucide-react'

interface Lab {
  num: string
  title: string
  course: string
  badge: string
  badgeClass: string
  accent: string
  steps?: string[]
  bullets?: string[]
  tools: string[]
}

const labs: Lab[] = [
  {
    num: '01', badge: 'Full Kill Chain · Root', badgeClass: 'tag-rose', accent: 'var(--c-rose)',
    title: 'Solo CTF — 6-Flag Full-Chain Exploitation',
    course: 'ENPM634 · University of Maryland',
    steps: [
      'Network Recon → ifconfig, arp-scan',
      'Port Enum → Nmap (HTTP/80, SSH/22)',
      'SQL Injection → SQLmap → DB Dump → CEO Creds',
      'File Upload → Weevely PHP Webshell → RCE',
      'SSH Pivot → Admin Private Key Exfil',
      'User Enum → /etc/passwd → Hydra Spray',
      'Root Escalation → Python ZIP Decrypt → Hex → CyberChef',
    ],
    tools: ['arp-scan', 'Nmap', 'SQLmap', 'Weevely', 'Hydra', 'CyberChef', 'Wireshark'],
  },
  {
    num: '02', badge: 'Black-Box Pentest', badgeClass: 'tag-cyan', accent: 'var(--c-cyan)',
    title: 'Penetration Testing — CTF VM Exploitation',
    course: 'ENPM634 · University of Maryland',
    bullets: [
      'Nmap enumeration (SSH/22, HTTP/80, SMB/139, SMB/445)',
      'Wireshark credential capture — plaintext HTTP traffic exploitation',
      'Hydra brute-force + lateral movement via SSH',
      'Hex dump + CyberChef data exfiltration',
    ],
    tools: ['Nmap', 'Wireshark', 'Hydra', 'CyberChef', 'SSH'],
  },
  {
    num: '03', badge: 'AWS · NIST CSF · CIS', badgeClass: 'tag-green', accent: 'var(--c-green)',
    title: 'Cloud Security Assessment — AWS',
    course: 'ENPM665 · University of Maryland',
    bullets: [
      'IAM trust relationship enumeration + audit',
      'EC2 hardening: chmod -R 755 exposing .env + API keys, absent patch management',
      'Missing iptables/nftables firewall + no IDS/IPS (Snort/Suricata)',
      'SELinux in permissive mode (sestatus: Current mode: permissive)',
      'Synthesized 6-domain risk report aligned to NIST CSF + CIS Benchmarks',
    ],
    tools: ['AWS CLI', 'IAM Analyzer', 'NIST CSF', 'CIS Benchmarks'],
  },
  {
    num: '04', badge: 'STRIDE · DREAD · ISO 27001', badgeClass: 'tag-violet', accent: 'var(--c-violet)',
    title: 'Enterprise Security Assessment — Threat Modeling',
    course: 'ENPM686 · University of Maryland',
    bullets: [
      'STRIDE threat modeling — mapped 16 vulnerabilities across 6 threat categories',
      'DREAD scoring across 12 scenarios: DoS (7.8), Phishing (7.8), Credential Theft (7.6)',
      '65+ workstations/servers assessed (Ubuntu 22.04, Windows 10, macOS)',
      '$250,400/year remediation roadmap: Cloudflare WAF, Okta IAM, Splunk, HashiCorp Vault',
      'Compliance gap analysis: NIST CSF, ISO 27001, PCI DSS, GDPR',
    ],
    tools: ['STRIDE', 'DREAD', 'NIST CSF', 'ISO 27001', 'PCI DSS', 'GDPR'],
  },
  {
    num: '05', badge: 'EK Stack · 17.4M+ Logs', badgeClass: 'tag-green', accent: 'var(--c-green)',
    title: 'Linux Infrastructure & SIEM',
    course: 'ENPM818P · University of Maryland',
    bullets: [
      '2-tier LAMP stack (www-vm + db-vm): Apache2, PHP, MySQL, phpMyAdmin, WordPress',
      'Least-privilege RBAC with ACLs + UFW firewall (SSH restricted to VM host IP)',
      'EK Stack (Elasticsearch + Kibana) — 17.4M+ log entries indexed and queryable in real-time',
      'MySQL port 3306 locked to www-vm IP only (network segmentation)',
    ],
    tools: ['Elasticsearch', 'Kibana', 'Filebeat', 'UFW', 'Apache2', 'auditd'],
  },
]

function LabEntry({ lab }: { lab: Lab }) {
  return (
    // terminal-row-border and terminal-tools-divider are always-dark classes from globals.css
    <div className="reveal border-b terminal-row-border">
      <div className="flex overflow-hidden" style={{ borderLeft: `2px solid ${lab.accent}` }}>
        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <span
              className="font-display font-bold flex-shrink-0"
              style={{ fontSize: '1.1rem', color: lab.accent, opacity: 0.45 }}
            >
              {lab.num}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-mono text-xs font-semibold text-c-text">
                  {lab.title}
                </h3>
                <span className={`tag ${lab.badgeClass}`}>{lab.badge}</span>
              </div>
              <p className="font-mono text-[10px] tracking-wider text-c-muted">
                {lab.course}
              </p>
            </div>
          </div>

          {lab.steps && (
            <div className="mb-4">
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase mb-2 text-c-muted">
                Attack Chain
              </p>
              <div className="flex flex-col gap-1.5">
                {lab.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="font-mono text-[10px] font-bold flex-shrink-0" style={{ color: lab.accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] leading-relaxed text-c-sub">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lab.bullets && (
            <ul className="space-y-1.5 mb-4">
              {lab.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[11px] leading-relaxed text-c-sub">
                  <span className="flex-shrink-0 font-mono" style={{ color: lab.accent }}>→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 pt-2 border-t terminal-tools-divider">
            {lab.tools.map((t) => <span key={t} className="tag">{t}</span>)}
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
    <section id="security" ref={sectionRef} className="relative py-24 md:py-32 bg-ink overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-0 right-0 watermark" aria-hidden="true">05</div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-10 space-y-4">
          <div className="reveal">
            <span className="label text-c-green">// 05. SECURITY</span>
          </div>
          <h2
            className="reveal delay-100 font-display font-bold text-c-text leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Offensive Security Practice
          </h2>
          <p className="reveal delay-200 text-c-muted text-sm leading-relaxed max-w-lg">
            From black-box recon to root access — documented attack chains and security research
            from isolated lab environments.
          </p>
        </div>

        {/* BSCP badge */}
        <div className="reveal delay-300 mb-10">
          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded"
            style={{
              border: '1px solid var(--c-amber-border)',
              background: 'var(--c-amber-tint)',
            }}
          >
            <ShieldCheck size={16} className="text-c-amber" />
            <div>
              <p className="font-mono text-xs font-semibold text-c-amber">
                Burp Suite Certified Practitioner (BSCP)
              </p>
              <p className="font-mono text-[10px] text-c-muted tracking-wider mt-0.5">
                Certification In Progress · PortSwigger
              </p>
            </div>
            <span className="tag tag-amber font-mono text-[10px] tracking-wider uppercase">
              In Progress
            </span>
          </div>
        </div>

        {/* Terminal — intentionally always dark (it's a terminal) */}
        <div className="reveal delay-200 terminal overflow-hidden">
          <div className="terminal-header flex items-center gap-2 px-4 py-3">
            <span className="w-2.5 h-2.5 rounded-full bg-c-rose opacity-70" />
            <span className="w-2.5 h-2.5 rounded-full bg-c-amber opacity-70" />
            <span className="w-2.5 h-2.5 rounded-full bg-c-green opacity-70" />
            <span className="ml-3 font-mono text-[11px] text-c-muted">~/security-labs</span>
          </div>
          {labs.map((lab) => <LabEntry key={lab.num} lab={lab} />)}
        </div>
      </div>
    </section>
  )
}
