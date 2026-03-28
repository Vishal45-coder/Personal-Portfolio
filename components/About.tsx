'use client'

import { useEffect, useRef } from 'react'

interface StatCardProps {
  value: string
  label: string
  color: string
}

function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="glass glass-hover rounded-xl p-4 sm:p-5 flex flex-col gap-1.5 h-full">
      <span className="text-2xl sm:text-3xl font-black leading-none" style={{ color }}>
        {value}
      </span>
      <span className="text-xs sm:text-sm text-c-muted leading-snug">{label}</span>
    </div>
  )
}

export default function About() {
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left column — story */}
          <div className="lg:col-span-3 space-y-6">
            <div className="reveal-up">
              <span className="section-label">// 01. ABOUT</span>
            </div>

            <h2 className="reveal-up delay-100 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
              Building at the intersection of{' '}
              <span className="gradient-text-blue">Software &amp; Security</span>
            </h2>

            <div className="space-y-4 sm:space-y-5 text-slate-400 leading-relaxed text-sm sm:text-base md:text-lg">
              <p className="reveal-up delay-200">
                I&apos;m a Master&apos;s student in Cybersecurity at the University of
                Maryland (GPA: 3.88), with a background in Computer Science from GITAM
                University. For the past 2+ years, I&apos;ve been building production
                systems at the Center for Advanced Life Cycle Engineering (CALCE) —
                full-stack web platforms, containerized microservices, REST APIs, and
                data visualization tools used by researchers daily.
              </p>
              <p className="reveal-up delay-300">
                What sets me apart is the combination: I don&apos;t just build systems —
                I attack them too. I&apos;ve executed full offensive kill chains in isolated
                CTF environments: black-box reconnaissance, SQL injection exploitation,
                webshell deployment, privilege escalation, and data exfiltration. That
                attacker&apos;s perspective directly informs how I write and review code.
              </p>
              <p className="reveal-up delay-400">
                I&apos;m actively pursuing the Burp Suite Certified Practitioner (BSCP)
                certification and targeting roles at the intersection of secure software
                engineering and information security — where building and breaking converge.
              </p>
            </div>

            {/* Education + certification pills */}
            <div className="reveal-up delay-500 flex flex-wrap gap-2 sm:gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-bg-surface border border-white/5 text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-c-primary flex-shrink-0" />
                <span className="text-slate-300 font-medium">M.Eng. Cybersecurity</span>
                <span className="text-c-muted hidden sm:inline">· UMD, 2025</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-bg-surface border border-white/5 text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-c-primary flex-shrink-0" />
                <span className="text-slate-300 font-medium">Grad. Cert. Cloud Engineering</span>
                <span className="text-c-muted hidden sm:inline">· UMD, 2025</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-bg-surface border border-white/5 text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-c-secondary flex-shrink-0" />
                <span className="text-slate-300 font-medium">B.Tech CS</span>
                <span className="text-c-muted hidden sm:inline">· GITAM, 2023</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-bg-surface border border-white/5 text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-slate-300 font-medium">BSCP</span>
                <span className="text-amber-400/80 text-xs">In Progress</span>
              </div>
            </div>
          </div>

          {/* Right column — stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="reveal-up delay-100 col-span-2">
                <StatCard
                  value="3.88 / 4.0"
                  label="M.Eng. Cybersecurity + Grad. Cert. Cloud Engineering · UMD"
                  color="#38bdf8"
                />
              </div>
              <div className="reveal-up delay-200">
                <StatCard
                  value="2+ Yrs"
                  label="Production dev at CALCE"
                  color="#818cf8"
                />
              </div>
              <div className="reveal-up delay-300">
                <StatCard
                  value="850+"
                  label="Software downloads via platform"
                  color="#34d399"
                />
              </div>
              <div className="reveal-up delay-400 col-span-2">
                <StatCard
                  value="17.4M+"
                  label="Log entries indexed · EK Stack security lab"
                  color="#34d399"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
