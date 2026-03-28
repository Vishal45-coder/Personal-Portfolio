'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react'

const roles = [
  'Software Engineer',
  'Security Engineer',
  'Full Stack Developer',
  'Penetration Tester',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState(roles[0])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setIsTyping(false)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setDisplayedRole(roles[roleIndex])
  }, [roleIndex])

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 dot-grid opacity-30"
        aria-hidden="true"
      />

      {/* Gradient blobs */}
      <div
        className="blob-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />
      <div
        className="blob-2 absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />
      <div
        className="blob-3 absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, #34d399 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-c-primary/25 bg-c-primary/5 mb-8"
          style={{
            animation: 'fadeUp 0.6s ease-out forwards',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-c-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-c-accent"></span>
          </span>
          <span className="font-mono text-xs text-c-primary tracking-widest">
            &lt; AVAILABLE FOR HIRE /&gt;
          </span>
        </div>

        {/* Name */}
        <h1
          className="text-6xl md:text-8xl font-black gradient-text leading-none tracking-tight mb-6"
          style={{
            animation: 'fadeUp 0.6s ease-out 0.1s forwards',
            opacity: 0,
          }}
        >
          Vishal Raavi
        </h1>

        {/* Cycling role */}
        <div
          className="flex items-center justify-center gap-2 text-2xl md:text-3xl text-slate-300 font-mono mb-4 h-10"
          style={{
            animation: 'fadeUp 0.6s ease-out 0.2s forwards',
            opacity: 0,
          }}
        >
          <span
            className={`transition-opacity duration-300 ${isTyping ? 'opacity-0' : 'opacity-100'}`}
          >
            {displayedRole}
          </span>
          <span className="animate-blink text-c-primary font-thin">|</span>
        </div>

        {/* Tagline */}
        <p
          className="italic text-slate-400 text-lg mt-4 mb-6 max-w-2xl mx-auto"
          style={{
            animation: 'fadeUp 0.6s ease-out 0.3s forwards',
            opacity: 0,
          }}
        >
          I build systems from the ground up — then break them to make them
          better.
        </p>

        {/* Stats row */}
        <div
          className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap mb-10 text-xs sm:text-sm text-c-muted font-mono"
          style={{
            animation: 'fadeUp 0.6s ease-out 0.4s forwards',
            opacity: 0,
          }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-c-primary flex-shrink-0"></span>
            M.Eng. Cybersecurity
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-c-secondary flex-shrink-0"></span>
            3.88 GPA
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-c-accent flex-shrink-0"></span>
            2+ Years Production
          </span>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{
            animation: 'fadeUp 0.6s ease-out 0.5s forwards',
            opacity: 0,
          }}
        >
          {/* Primary */}
          <button
            onClick={() => handleScroll('projects')}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400
              shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-105
              transition-all duration-200"
          >
            View Projects
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Secondary */}
          <a
            href="/Vishal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-c-primary text-sm
              border border-c-primary/50 hover:border-c-primary hover:bg-c-primary/10
              transition-all duration-200"
          >
            <Download size={16} />
            Download Resume
          </a>

          {/* Ghost */}
          <button
            onClick={() => handleScroll('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-400 text-sm
              hover:text-slate-200 relative group transition-colors duration-200"
          >
            <Mail size={16} />
            Get In Touch
            <span className="absolute bottom-2 left-6 right-6 h-px bg-slate-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{
          animation: 'fadeUp 0.6s ease-out 0.8s forwards',
          opacity: 0,
        }}
      >
        <span className="text-xs text-c-muted font-mono tracking-widest uppercase">
          scroll
        </span>
        <ChevronDown
          size={18}
          className="text-c-muted animate-bounce"
        />
      </div>
    </section>
  )
}
