'use client'

/**
 * HeroGraph — Live threat visualization.
 * Threat creatures (virus, trojan, worm) drift toward the system,
 * look alive with blinking eyes, wobbling bodies, and expressions,
 * then explode when intercepted by the WAF node.
 */

import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

type Hue   = 'cyan' | 'violet' | 'green' | 'rose' | 'amber'
type TType = 'virus' | 'trojan' | 'worm'

interface Node   { id: string; nx: number; ny: number; r: number; hue: Hue }
interface Edge   { from: string; to: string; hue: Hue }
interface Packet { edgeIdx: number; t: number; speed: number }

interface Threat {
  x: number; y: number
  vx: number; vy: number
  angle: number; spin: number
  size: number
  type: TType
  state: 'alive' | 'dying'
  dyingT: number
  shards: { dx: number; dy: number }[]
  // Alive feel
  wobble: number       // oscillation phase (body breathing)
  blinkTimer: number   // counts up to trigger blink
  blinkT: number       // 0 = open, 1 = closed
  blinking: boolean
  mouthOpen: number    // 0-1 chomping
  mouthPhase: number
}

const NODES: Node[] = [
  { id: 'internet', nx: 0.08, ny: 0.50, r: 7,  hue: 'rose'   },
  { id: 'waf',      nx: 0.30, ny: 0.50, r: 10, hue: 'amber'  },
  { id: 'lb',       nx: 0.52, ny: 0.50, r: 9,  hue: 'cyan'   },
  { id: 'api1',     nx: 0.68, ny: 0.26, r: 7,  hue: 'violet' },
  { id: 'api2',     nx: 0.68, ny: 0.74, r: 7,  hue: 'violet' },
  { id: 'auth',     nx: 0.82, ny: 0.50, r: 7,  hue: 'cyan'   },
  { id: 'db',       nx: 0.93, ny: 0.74, r: 8,  hue: 'green'  },
  { id: 'store',    nx: 0.93, ny: 0.26, r: 6,  hue: 'violet' },
]

const EDGES: Edge[] = [
  { from: 'internet', to: 'waf',   hue: 'rose'   },
  { from: 'waf',      to: 'lb',    hue: 'cyan'   },
  { from: 'lb',       to: 'api1',  hue: 'violet' },
  { from: 'lb',       to: 'api2',  hue: 'violet' },
  { from: 'api1',     to: 'auth',  hue: 'cyan'   },
  { from: 'api2',     to: 'auth',  hue: 'cyan'   },
  { from: 'auth',     to: 'db',    hue: 'green'  },
  { from: 'api1',     to: 'store', hue: 'violet' },
]

const COLORS: Record<Hue, [string, string]> = {
  cyan:   ['#22D3EE', '#0891B2'],
  violet: ['#8B5CF6', '#7C3AED'],
  green:  ['#10B981', '#059669'],
  rose:   ['#F43F5E', '#E11D48'],
  amber:  ['#F59E0B', '#D97706'],
}

function dark()                     { return typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') !== 'light' }
function hexC(hue: Hue)             { return COLORS[hue][dark() ? 0 : 1] }
function rgba(h: string, a: number) { const n = parseInt(h.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})` }

// ─── Creature drawing ─────────────────────────────────────────────────────────

function drawEyes(
  ctx: CanvasRenderingContext2D,
  ex1: number, ey1: number,
  ex2: number, ey2: number,
  er: number,
  blinkT: number,
  lookDx: number, lookDy: number,
) {
  const eyeH = er * (1 - blinkT * 0.95)  // squish to 0 when blinking
  const pupilOff = er * 0.28              // pupil follows movement direction
  const norm = Math.sqrt(lookDx ** 2 + lookDy ** 2) || 1
  const px = (lookDx / norm) * pupilOff
  const py = (lookDy / norm) * pupilOff

  ;[[ex1, ey1], [ex2, ey2]].forEach(([ex, ey]) => {
    // White of eye
    ctx.beginPath()
    ctx.ellipse(ex, ey, er, eyeH, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.fill()

    // Pupil (only when not fully blinking)
    if (blinkT < 0.85) {
      ctx.beginPath()
      ctx.arc(ex + px, ey + py * (eyeH / er), er * 0.52, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,0,0,0.85)'
      ctx.fill()
      // Highlight dot
      ctx.beginPath()
      ctx.arc(ex + px + er * 0.14, ey + py * (eyeH / er) - er * 0.14, er * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.fill()
    }
  })
}

function drawVirus(ctx: CanvasRenderingContext2D, t: Threat, dk: boolean) {
  const c    = hexC('rose')
  const s    = t.size
  const bob  = Math.sin(t.wobble) * 0.9  // gentle up-down breathing

  ctx.save()
  ctx.translate(t.x, t.y + bob)

  if (dk) { ctx.shadowBlur = s * 1.6; ctx.shadowColor = c }

  // Body — wobbly blob (slightly squash/stretch with wobble)
  const scaleX = 1 + Math.sin(t.wobble * 1.3) * 0.06
  const scaleY = 1 - Math.sin(t.wobble * 1.3) * 0.06
  ctx.scale(scaleX, scaleY)

  // Spiky outline
  const spikes = 8
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const a = (i / (spikes * 2)) * Math.PI * 2
    const r = i % 2 === 0 ? s : s * 0.62
    i === 0
      ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
      : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  ctx.closePath()
  ctx.fillStyle   = rgba(c, 0.22)
  ctx.strokeStyle = rgba(c, 0.9)
  ctx.lineWidth   = 1.4
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.stroke()
  ctx.scale(1 / scaleX, 1 / scaleY)

  // Eyes
  drawEyes(ctx, -s * 0.28, -s * 0.18, s * 0.28, -s * 0.18,
    s * 0.22, t.blinkT, t.vx, t.vy)

  // Fanged mouth
  const mouthY = s * 0.18
  const mouthW = s * 0.42
  const mouthOpen = (Math.sin(t.mouthPhase) * 0.5 + 0.5) * 0.7
  ctx.beginPath()
  ctx.arc(0, mouthY, mouthW, 0, Math.PI)
  ctx.strokeStyle = rgba(c, 0.8)
  ctx.lineWidth   = 1.2
  ctx.stroke()
  // Fangs
  ;[-mouthW * 0.55, -mouthW * 0.15, mouthW * 0.15, mouthW * 0.55].forEach((fx) => {
    ctx.beginPath()
    ctx.moveTo(fx, mouthY)
    ctx.lineTo(fx, mouthY + s * 0.18 + mouthOpen * s * 0.1)
    ctx.strokeStyle = rgba(c, 0.75)
    ctx.lineWidth   = 1.4
    ctx.stroke()
  })

  ctx.restore()
}

function drawTrojan(ctx: CanvasRenderingContext2D, t: Threat, dk: boolean) {
  const c   = hexC('amber')
  const s   = t.size
  const bob = Math.sin(t.wobble * 0.9) * 0.7

  ctx.save()
  ctx.translate(t.x, t.y + bob)
  if (dk) { ctx.shadowBlur = s * 1.5; ctx.shadowColor = c }

  // Angular helmet-like hexagon body
  const pulse = 1 + Math.sin(t.wobble * 1.1) * 0.05
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6
    i === 0
      ? ctx.moveTo(Math.cos(a) * s * pulse, Math.sin(a) * s * pulse)
      : ctx.lineTo(Math.cos(a) * s * pulse, Math.sin(a) * s * pulse)
  }
  ctx.closePath()
  ctx.fillStyle   = rgba(c, 0.18)
  ctx.strokeStyle = rgba(c, 0.88)
  ctx.lineWidth   = 1.4
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.stroke()

  // Visor line across middle (helmet look)
  ctx.beginPath()
  ctx.moveTo(-s * 0.72, -s * 0.12)
  ctx.lineTo(s * 0.72, -s * 0.12)
  ctx.strokeStyle = rgba(c, 0.4)
  ctx.lineWidth   = 0.8
  ctx.stroke()

  // Menacing narrow eyes (slitted, angry)
  const eyeY  = -s * 0.24
  const eyeW  = s * 0.24
  const eyeH  = s * 0.14 * (1 - t.blinkT * 0.9)
  ;[-s * 0.3, s * 0.3].forEach((ex) => {
    ctx.beginPath()
    ctx.ellipse(ex, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2)
    ctx.fillStyle = rgba(c, 0.9)
    ctx.fill()
    // Slit pupil
    if (t.blinkT < 0.8) {
      ctx.beginPath()
      ctx.ellipse(ex + (t.vx / (Math.abs(t.vx) || 1)) * eyeW * 0.3, eyeY, eyeW * 0.22, eyeH, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,0,0,0.75)'
      ctx.fill()
    }
  })

  // Grimace mouth
  const mouthOpen = Math.sin(t.mouthPhase) * 0.5 + 0.5
  ctx.beginPath()
  ctx.moveTo(-s * 0.3, s * 0.22)
  // Jagged/grimace line
  ctx.lineTo(-s * 0.15, s * 0.22 + mouthOpen * s * 0.12)
  ctx.lineTo(0, s * 0.22)
  ctx.lineTo(s * 0.15, s * 0.22 + mouthOpen * s * 0.12)
  ctx.lineTo(s * 0.3, s * 0.22)
  ctx.strokeStyle = rgba(c, 0.8)
  ctx.lineWidth   = 1.3
  ctx.stroke()

  ctx.restore()
}

function drawWorm(ctx: CanvasRenderingContext2D, t: Threat, dk: boolean) {
  const c       = hexC('rose')
  const s       = t.size
  const dir     = Math.atan2(t.vy, t.vx)
  const segments = 4

  ctx.save()
  ctx.translate(t.x, t.y)
  ctx.rotate(dir)
  if (dk) { ctx.shadowBlur = s * 1.4; ctx.shadowColor = c }

  // Body segments (drawn back to front)
  for (let i = segments - 1; i >= 0; i--) {
    const ox      = -(i + 0.5) * s * 0.95
    const wobbleY = Math.sin(t.wobble + i * 0.8) * s * 0.28
    const segR    = s * (i === 0 ? 1 : 0.7 - i * 0.06)

    ctx.beginPath()
    ctx.arc(ox, wobbleY, segR, 0, Math.PI * 2)
    ctx.fillStyle   = rgba(c, 0.16 + (segments - i) * 0.04)
    ctx.strokeStyle = rgba(c, 0.82)
    ctx.lineWidth   = 1.2
    ctx.shadowBlur  = dk ? s * 0.8 : 0
    ctx.fill()
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  // Head (segment 0 = front)
  const headWobY = Math.sin(t.wobble) * s * 0.28
  // Eyes on head
  const er  = s * 0.26
  const lok = { x: Math.cos(dir) * 10, y: Math.sin(dir) * 10 }
  drawEyes(ctx,
    -er * 0.8, headWobY - s * 0.38,
     er * 0.8, headWobY - s * 0.38,
    er, t.blinkT, lok.x, lok.y)

  // Little frowning mouth on head
  const mouthOpen = (Math.sin(t.mouthPhase) * 0.5 + 0.5) * 0.5
  ctx.beginPath()
  ctx.arc(0, headWobY + s * 0.28, s * 0.3, Math.PI * 0.15, Math.PI * 0.85)
  ctx.strokeStyle = rgba(c, 0.8)
  ctx.lineWidth   = 1.3
  ctx.stroke()
  // Tiny fangs
  ;[-s * 0.2, s * 0.2].forEach((fx) => {
    ctx.beginPath()
    ctx.moveTo(fx, headWobY + s * 0.28)
    ctx.lineTo(fx, headWobY + s * 0.28 + s * 0.14 + mouthOpen * s * 0.08)
    ctx.strokeStyle = rgba(c, 0.7)
    ctx.lineWidth   = 1.2
    ctx.stroke()
  })

  ctx.restore()
}

function drawThreat(ctx: CanvasRenderingContext2D, t: Threat, dk: boolean) {
  if (t.state === 'dying') {
    const c = t.type === 'trojan' ? hexC('amber') : hexC('rose')
    t.shards.forEach(s => {
      const dist = t.dyingT * t.size * 7
      ctx.beginPath()
      ctx.arc(t.x + s.dx * dist, t.y + s.dy * dist, 2 * (1 - t.dyingT), 0, Math.PI * 2)
      ctx.fillStyle = rgba(c, (1 - t.dyingT) * 0.9)
      if (dk) { ctx.shadowBlur = 8; ctx.shadowColor = c }
      ctx.fill()
      ctx.shadowBlur = 0
    })
    return
  }

  if (t.type === 'virus')  drawVirus(ctx, t, dk)
  if (t.type === 'trojan') drawTrojan(ctx, t, dk)
  if (t.type === 'worm')   drawWorm(ctx, t, dk)
}

// ─── Spawn ────────────────────────────────────────────────────────────────────

function spawnThreat(W: number, H: number): Threat {
  const types: TType[] = ['virus', 'trojan', 'worm']
  const type = types[Math.floor(Math.random() * 3)]
  const size = type === 'worm' ? 8 + Math.random() * 4 : 7 + Math.random() * 5

  const x = Math.random() * W * 0.15
  const y = Math.random() * H
  const tx = W * (0.22 + Math.random() * 0.12)
  const ty = H * (0.28 + Math.random() * 0.44)
  const d  = Math.sqrt((tx - x) ** 2 + (ty - y) ** 2)
  const sp = 0.35 + Math.random() * 0.4

  const shards = Array.from({ length: 12 }, () => {
    const a = Math.random() * Math.PI * 2
    return { dx: Math.cos(a), dy: Math.sin(a) }
  })

  return {
    x, y,
    vx: ((tx - x) / d) * sp,
    vy: ((ty - y) / d) * sp,
    angle: 0,
    spin: (Math.random() - 0.5) * 0.04,
    size,
    type,
    state: 'alive',
    dyingT: 0,
    shards,
    wobble: Math.random() * Math.PI * 2,
    blinkTimer: Math.random() * 120,
    blinkT: 0,
    blinking: false,
    mouthOpen: 0,
    mouthPhase: Math.random() * Math.PI * 2,
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

interface State {
  raf: number
  pulses: number[]
  packets: Packet[]
  threats: Threat[]
  mx: number; my: number
  lw: number; lh: number
  tick: number
}

export default function HeroGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced   = useReducedMotion()

  const S = useRef<State>({
    raf: 0,
    pulses: NODES.map(() => Math.random() * Math.PI * 2),
    packets: [],
    threats: [],
    mx: -9999, my: -9999,
    lw: 0, lh: 0,
    tick: 0,
  })

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const s   = S.current
    const dpr = window.devicePixelRatio || 1
    const W   = s.lw
    const H   = s.lh
    const dk  = dark()
    s.tick++

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)

    const ns = NODES.map(n => ({ ...n, sx: n.nx * W, sy: n.ny * H }))
    const nm: Record<string, typeof ns[0]> = {}
    ns.forEach(n => { nm[n.id] = n })
    const wafNode = nm['waf']

    // ── Spawn threats ──────────────────────────────────────────────────────
    if (s.tick % 85 === 0 && s.threats.filter(t => t.state === 'alive').length < 5) {
      s.threats.push(spawnThreat(W, H))
    }
    // Seed a couple at start
    if (s.tick === 10) {
      s.threats.push(spawnThreat(W, H))
      s.threats.push(spawnThreat(W, H))
    }

    // ── Spawn data packets (safe edges only) ───────────────────────────────
    if (s.tick % 38 === 0 && s.packets.length < 8) {
      const safeIdx = 1 + Math.floor(Math.random() * (EDGES.length - 1))
      s.packets.push({ edgeIdx: safeIdx, t: 0, speed: 0.004 + Math.random() * 0.004 })
    }

    // ── Edges ──────────────────────────────────────────────────────────────
    EDGES.forEach((e, ei) => {
      const a = nm[e.from], b = nm[e.to]
      const c = hexC(e.hue)
      const isUntrusted = ei === 0
      ctx.beginPath()
      ctx.moveTo(a.sx, a.sy)
      ctx.lineTo(b.sx, b.sy)
      ctx.strokeStyle = rgba(c, isUntrusted ? (dk ? 0.14 : 0.2) : (dk ? 0.09 : 0.14))
      ctx.lineWidth   = isUntrusted ? 1.5 : 1
      if (isUntrusted) ctx.setLineDash([4, 6])
      ctx.stroke()
      ctx.setLineDash([])
    })

    // ── Packets ────────────────────────────────────────────────────────────
    for (let i = s.packets.length - 1; i >= 0; i--) {
      const p = s.packets[i]
      p.t += p.speed
      if (p.t > 1) { s.packets.splice(i, 1); continue }
      const e    = EDGES[p.edgeIdx]
      const a    = nm[e.from], b = nm[e.to]
      const px   = a.sx + (b.sx - a.sx) * p.t
      const py   = a.sy + (b.sy - a.sy) * p.t
      const fade = Math.sin(p.t * Math.PI)
      const c    = hexC(e.hue)
      const ang  = Math.atan2(b.sy - a.sy, b.sx - a.sx)
      ctx.save()
      ctx.translate(px, py)
      ctx.rotate(ang)
      ctx.fillStyle = rgba(c, fade * (dk ? 0.9 : 0.7))
      if (dk) { ctx.shadowBlur = 7; ctx.shadowColor = c }
      ctx.fillRect(-3.5, -3.5, 7, 7)
      ctx.shadowBlur = 0
      ctx.restore()
    }

    // ── Update threat animations ───────────────────────────────────────────
    for (let i = s.threats.length - 1; i >= 0; i--) {
      const t = s.threats[i]
      if (t.state === 'dying') {
        t.dyingT += 0.045
        if (t.dyingT >= 1) { s.threats.splice(i, 1) }
        continue
      }

      // Move
      t.x += t.vx
      t.y += t.vy

      // Alive animations
      t.wobble     += 0.07
      t.mouthPhase += 0.05

      // Blink logic
      t.blinkTimer++
      if (!t.blinking && t.blinkTimer > 100 + Math.random() * 120) {
        t.blinking   = true
        t.blinkT     = 0
        t.blinkTimer = 0
      }
      if (t.blinking) {
        t.blinkT += 0.18
        if (t.blinkT >= 1) {
          t.blinking = false
          t.blinkT   = 0
        }
      }

      // Check WAF proximity → die
      const dx   = t.x - wafNode.sx
      const dy   = t.y - wafNode.sy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < wafNode.r + t.size + 5) {
        t.state  = 'dying'
        t.dyingT = 0
        s.pulses[NODES.findIndex(n => n.id === 'waf')] += Math.PI
        continue
      }

      // Off screen
      if (t.x < -80 || t.x > W + 80 || t.y < -80 || t.y > H + 80) {
        s.threats.splice(i, 1)
      }
    }

    // ── Draw threats (alive first, then dying on top) ──────────────────────
    const alive = s.threats.filter(t => t.state === 'alive')
    const dying = s.threats.filter(t => t.state === 'dying')
    alive.forEach(t => drawThreat(ctx, t, dk))
    dying.forEach(t => drawThreat(ctx, t, dk))

    // ── Nodes ──────────────────────────────────────────────────────────────
    ns.forEach((n, ni) => {
      s.pulses[ni] += 0.018
      const pulse = (Math.sin(s.pulses[ni]) + 1) * 0.5
      const dx    = n.sx - s.mx, dy = n.sy - s.my
      const prox  = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 160)
      const c     = hexC(n.hue)
      const αc    = (dk ? 0.78 : 0.68) + pulse * 0.22

      // Radial glow
      const gR = (n.r + pulse * 4 + prox * 14) * 3.2
      const gr = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, gR)
      gr.addColorStop(0, rgba(c, (dk ? 0.25 : 0.15) + prox * 0.12))
      gr.addColorStop(1, rgba(c, 0))
      ctx.beginPath()
      ctx.arc(n.sx, n.sy, gR, 0, Math.PI * 2)
      ctx.fillStyle = gr
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(n.sx, n.sy, n.r, 0, Math.PI * 2)
      ctx.fillStyle = rgba(c, αc)
      if (dk) { ctx.shadowBlur = (n.r + pulse * 5 + prox * 8) * 2.4; ctx.shadowColor = c }
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.beginPath()
      ctx.arc(n.sx, n.sy, n.r, 0, Math.PI * 2)
      ctx.strokeStyle = rgba(c, dk ? 0.55 : 0.45)
      ctx.lineWidth   = 1.2
      ctx.stroke()

      // Specular
      ctx.beginPath()
      ctx.arc(n.sx - n.r * 0.28, n.sy - n.r * 0.28, n.r * 0.38, 0, Math.PI * 2)
      ctx.fillStyle = rgba(c, dk ? 0.4 : 0.2)
      ctx.fill()

      // WAF shield ring
      if (n.id === 'waf') {
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, n.r + 6 + pulse * 4, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(c, (dk ? 0.38 : 0.28) + pulse * 0.18)
        ctx.lineWidth   = 1.6
        ctx.stroke()
      }

      if (prox > 0.08) {
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, n.r + 6 + prox * 14, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(c, prox * 0.38)
        ctx.lineWidth   = 1
        ctx.stroke()
      }
    })

    s.raf = requestAnimationFrame(loop)
  }, [])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!
    const dpr    = window.devicePixelRatio || 1

    const resize = () => {
      const w = parent.clientWidth, h = parent.clientHeight
      canvas.width        = w * dpr
      canvas.height       = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      S.current.lw = w
      S.current.lh = h
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      S.current.mx = e.clientX - r.left
      S.current.my = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    S.current.raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(S.current.raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [loop, reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.9 }}
    />
  )
}
