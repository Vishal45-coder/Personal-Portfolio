'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { fadeUp, fadeIn, staggerContainer, dur, ease } from '@/lib/motion'

const roles = [
  'SOFTWARE ENGINEER',
  'SECURITY ENGINEER',
  'PENETRATION TESTER',
]


const heroContainer = staggerContainer(0.12, 0.1)

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [fading, setFading]   = useState(false)
  const reduced = useReducedMotion()

  // Mouse parallax for ambient glows
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 })

  useEffect(() => {
    if (reduced) return
    const el = sectionRef.current
    if (!el) return
    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 40)
      mouseY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 30)
    }
    el.addEventListener('mousemove', handleMouse)
    return () => el.removeEventListener('mousemove', handleMouse)
  }, [reduced, mouseX, mouseY])

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length)
        setFading(false)
      }, 280)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden bg-ink grid-bg">
      {/* Ambient glows — parallax on mouse move */}
      <motion.div
        className="absolute top-0 left-1/3 w-[700px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          x: reduced ? 0 : springX,
          y: reduced ? 0 : springY,
          background: `radial-gradient(ellipse at center, var(--c-cyan-glow) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          x: reduced ? 0 : springX,
          y: reduced ? 0 : springY,
          background: `radial-gradient(ellipse at bottom right, var(--c-violet-glow) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Left rail — editorial accent, desktop only */}
      <div
        className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-10"
        aria-hidden="true"
      >
        <div className="w-px h-16" style={{ background: 'var(--c-line)' }} />
        <span
          className="font-mono text-[9px] tracking-[0.22em] uppercase text-c-muted"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          College Park · MD
        </span>
        <div className="w-px h-16" style={{ background: 'var(--c-line)' }} />
      </div>

      <motion.div
        className="relative z-10 flex flex-col flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-12"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Thin rule */}
        <motion.hr className="h-rule mb-10 sm:mb-14 mt-0" variants={fadeIn} />

        {/* MAIN */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Cycling role */}
          <motion.div
            className="mb-5 h-5 overflow-hidden"
            variants={fadeUp}
          >
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-c-muted"
              style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease' }}
            >
              {roles[roleIdx]}
            </span>
          </motion.div>

          {/* Headline — two lines stagger independently */}
          <motion.div variants={fadeUp}>
            <h1 className="font-display font-extrabold leading-[0.92] tracking-tight">
              <motion.span
                className="block text-c-text"
                style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)' }}
                variants={{
                  hidden:  { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
                }}
              >
                I BUILD SYSTEMS
              </motion.span>
              <motion.span
                className="block text-c-cyan"
                style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)' }}
                variants={{
                  hidden:  { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out, delay: 0.12 } },
                }}
              >
                THAT HOLD.
              </motion.span>
            </h1>
          </motion.div>

          {/* Tagline + CTAs */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            variants={fadeUp}
          >
            <p className="text-c-sub text-sm sm:text-base leading-relaxed max-w-xs">
              M.Eng. Cybersecurity at UMD. I&apos;ve spent 2+ years building production
              systems at CALCE — and breaking them to make them stronger.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] tracking-[0.12em] uppercase font-bold"
                style={{ background: 'var(--c-cyan)', color: 'var(--ink)' }}
                whileHover={reduced ? {} : { opacity: 0.85, scale: 1.02 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                View My Work <ArrowRight size={12} />
              </motion.button>
              <motion.button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-200"
                style={{
                  border: '1px solid var(--border-md)',
                  color: 'var(--c-sub)',
                }}
                whileHover={reduced ? {} : { backgroundColor: 'var(--overlay-sm)' }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <Mail size={12} /> Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </div>


      </motion.div>
    </section>
  )
}
