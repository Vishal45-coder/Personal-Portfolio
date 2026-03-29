'use client'

/**
 * ArchDiagram — SVG-based architecture visualization for project entries.
 * Shows system topology as a schematic with animated data-flow lines.
 * Activates/intensifies on parent hover via CSS class.
 * Theme-aware. Zero extra dependencies (uses Framer Motion + SVG).
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface ArchNode {
  id:    string
  x:     number   // 0–100 in SVG units
  y:     number
  label: string
  sub?:  string   // small sublabel
  type:  'service' | 'db' | 'shield' | 'cdn' | 'store' | 'pipe'
}

export interface ArchEdge {
  from: string
  to:   string
  dir?: 'forward' | 'back' | 'both'  // default: forward
}

interface Props {
  nodes:    ArchNode[]
  edges:    ArchEdge[]
  accent:   string  // CSS variable e.g. 'var(--c-cyan)'
  isActive: boolean
}

// Icon paths for node types (simple SVG d-strings, centred on 0,0, ≈10×10)
const TYPE_ICONS: Record<ArchNode['type'], string> = {
  service: 'M-4-3h8v6h-8z',
  db:      'M-4-3h8v2h-8z M-4 0h8v2h-8z M-4 3h8v1h-8z',
  shield:  'M0-4 L4-2 L4 1 Q4 4 0 5 Q-4 4 -4 1 L-4-2 Z',
  cdn:     'M-4 0 Q-4-4 0-4 Q4-4 4 0 Q4 4 0 4 Q-4 4-4 0 M-2-1h4 M0-3v6',
  store:   'M-4-3h8v6h-8z M-2-1h4',
  pipe:    'M-4-1h8 M-4 1h8 M-3-2v4 M3-2v4',
}

export default function ArchDiagram({ nodes, edges, accent, isActive }: Props) {
  const reduced  = useReducedMotion()
  const svgRef   = useRef<SVGSVGElement>(null)
  const [paths, setPaths] = useState<Record<string, { len: number; d: string }>>({})

  // Pre-compute straight-line paths and their lengths for dash animation
  useEffect(() => {
    const nodeMap: Record<string, ArchNode> = {}
    nodes.forEach(n => { nodeMap[n.id] = n })

    const p: Record<string, { len: number; d: string }> = {}
    edges.forEach((e, i) => {
      const a = nodeMap[e.from]
      const b = nodeMap[e.to]
      if (!a || !b) return
      const dx = b.x - a.x, dy = b.y - a.y
      const len = Math.sqrt(dx * dx + dy * dy)
      // Shorten line to not overlap node circles (r≈6 SVG units)
      const trim = 7 / len
      const x1 = a.x + dx * trim, y1 = a.y + dy * trim
      const x2 = b.x - dx * trim, y2 = b.y - dy * trim
      p[`${e.from}-${e.to}`] = { len, d: `M${x1} ${y1} L${x2} ${y2}` }
    })
    setPaths(p)
  }, [nodes, edges])

  // Animation speeds
  const dashDur = reduced ? 999999 : (isActive ? 1.4 : 2.8)

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 50"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Glow filter */}
        <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle particle glow */}
        <filter id="particle-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Arrow marker */}
        <marker id={`arrow-${accent}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L0 6 L5 3 z" fill={accent} opacity="0.5" />
        </marker>
      </defs>

      {/* ── EDGES ─────────────────────────────────────────────────── */}
      {edges.map((e) => {
        const key = `${e.from}-${e.to}`
        const p   = paths[key]
        if (!p) return null

        const dashLen   = Math.max(p.len * 0.12, 3)
        const gapLen    = p.len * 0.06
        const totalDash = dashLen + gapLen

        return (
          <g key={key}>
            {/* Static base line */}
            <path
              d={p.d}
              stroke={accent}
              strokeWidth="0.4"
              strokeOpacity="0.2"
              fill="none"
            />

            {/* Animated dash — the "data flow" */}
            {!reduced && (
              <motion.path
                d={p.d}
                fill="none"
                stroke={accent}
                strokeWidth="0.7"
                strokeOpacity={isActive ? 0.7 : 0.35}
                strokeDasharray={`${dashLen} ${gapLen}`}
                filter="url(#arch-glow)"
                initial={{ strokeDashoffset: totalDash }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration:  dashDur,
                  ease:      'linear',
                  repeat:    Infinity,
                }}
              />
            )}

            {/* Moving particle dot */}
            {!reduced && (
              <motion.circle
                r="0.9"
                fill={accent}
                filter="url(#particle-glow)"
                opacity={isActive ? 0.9 : 0.5}
              >
                <animateMotion
                  path={p.d}
                  dur={`${dashDur * 2.2}s`}
                  repeatCount="indefinite"
                />
              </motion.circle>
            )}
          </g>
        )
      })}

      {/* ── NODES ─────────────────────────────────────────────────── */}
      {nodes.map((n) => (
        <motion.g
          key={n.id}
          transform={`translate(${n.x} ${n.y})`}
          animate={reduced ? {} : {
            scale:  isActive ? [1, 1.08, 1] : 1,
          }}
          transition={reduced ? {} : {
            duration: 2.5,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        >
          {/* Node backing circle */}
          <circle
            r="5.5"
            fill={accent}
            fillOpacity="0.08"
            stroke={accent}
            strokeWidth="0.5"
            strokeOpacity={isActive ? 0.6 : 0.35}
          />

          {/* Outer pulse ring — only when active */}
          {!reduced && isActive && (
            <motion.circle
              r="5.5"
              fill="none"
              stroke={accent}
              strokeWidth="0.5"
              strokeOpacity={0}
              animate={{
                r:            [5.5, 9],
                strokeOpacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat:   Infinity,
                ease:     'easeOut',
              }}
            />
          )}

          {/* Type icon */}
          <path
            d={TYPE_ICONS[n.type]}
            fill={accent}
            fillOpacity={isActive ? 0.75 : 0.5}
            transform="scale(0.55)"
          />

          {/* Label */}
          <text
            y="9"
            textAnchor="middle"
            fontSize="3.4"
            fill={accent}
            fillOpacity={isActive ? 0.85 : 0.6}
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="500"
            letterSpacing="0.02"
          >
            {n.label}
          </text>
          {n.sub && (
            <text
              y="12.5"
              textAnchor="middle"
              fontSize="2.6"
              fill={accent}
              fillOpacity="0.4"
              fontFamily="'JetBrains Mono', monospace"
            >
              {n.sub}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  )
}
