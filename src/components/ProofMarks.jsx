import { useLayoutEffect, useRef, useState } from 'react'

// The red-pen Proof Marks. Every stroke is an SVG path with pathLength 1 that
// starts undrawn (see .pen in the CSS); the motion draws it in by animating its
// dash offset (data-pen). Notes in handwriting are revealed left to right
// (data-pen-write).
//
// Each mark is drawn at the real pixel size of its box, so a loop around a wide
// word keeps the same pen width as a small tick. Shapes are written on a
// 0–100 grid and scaled into the box.

// Small seeded random, so a loop keeps the same wobble on every render.
function seeded(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// A loop drawn the way a hand draws it: a little more than one turn, slightly
// uneven, spiralling outwards so the end overshoots the start.
function scribbleLoop(seed) {
  const rand = seeded(seed)
  const steps = 40
  const turns = 1.14
  const start = -Math.PI * (0.55 + rand() * 0.2)
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = start + t * turns * Math.PI * 2
    const wobble = 1 + (rand() - 0.5) * 0.04
    pts.push([50 + Math.cos(a) * 47 * (wobble + t * 0.05), 50 + Math.sin(a) * 44 * (wobble + t * 0.1) + t * 3])
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i]
    const mx = (x + pts[i + 1][0]) / 2
    const my = (y + pts[i + 1][1]) / 2
    d += `Q${x.toFixed(1)} ${y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  return `${d}L${last[0].toFixed(1)} ${last[1].toFixed(1)}`
}

// Scales a path written on the 0–100 grid into a w × h box. Only absolute
// commands with coordinate pairs are used, so numbers simply alternate x, y.
function fit(d, w, h) {
  let i = 0
  return d.replace(/-?\d*\.?\d+/g, (n) => (((i++ % 2 ? h : w) * parseFloat(n)) / 100).toFixed(1))
}

function useBox() {
  const ref = useRef(null)
  const [box, setBox] = useState(null)
  useLayoutEffect(() => {
    const el = ref.current
    const measure = (w, h) => setBox((b) => (b && Math.abs(b.w - w) < 0.5 && Math.abs(b.h - h) < 0.5 ? b : { w, h }))
    const r = el.getBoundingClientRect()
    measure(r.width, r.height)
    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width, entry.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, box]
}

function Pen({ className = '', shapes, delay }) {
  const [ref, box] = useBox()
  return (
    <svg
      ref={ref}
      className={`pen ${className}`}
      viewBox={box ? `0 0 ${box.w} ${box.h}` : undefined}
      fill="none"
      aria-hidden
      data-pen
      data-pen-delay={delay}
    >
      {box && box.w > 0 && [].concat(shapes).map((d, i) => <path key={i} d={fit(d, box.w, box.h)} pathLength="1" />)}
    </svg>
  )
}

export function PenCircle({ className, seed = 7, style, delay }) {
  return (
    <span className={`pen-circle ${className ?? ''}`} style={style}>
      <Pen shapes={scribbleLoop(seed)} delay={delay} />
    </span>
  )
}

export function PenTick({ className, delay }) {
  return <Pen className={`pen-tick ${className ?? ''}`} shapes="M6 54C15 61 23 72 31 89C43 61 63 30 95 6" delay={delay} />
}

export function PenStrike({ className, delay }) {
  return <Pen className={`pen-strike ${className ?? ''}`} shapes="M-2 62C18 42 42 72 60 46S88 52 102 36" delay={delay} />
}

export function PenCaret({ className, delay }) {
  return <Pen className={`pen-caret ${className ?? ''}`} shapes="M12 90L50 14L88 90" delay={delay} />
}

export function PenUnderline({ className, delay }) {
  return <Pen className={`pen-underline ${className ?? ''}`} shapes={['M1 42C28 18 62 58 99 22', 'M8 78C38 52 70 88 95 62']} delay={delay} />
}

export function PenNote({ children, className, delay }) {
  return (
    <span className={`pen-note ${className ?? ''}`} data-pen-write data-pen-delay={delay}>
      {children}
    </span>
  )
}

// The approval stamp, inked in Proof Red, that lands on the Back Cover.
export function Stamp({ top, bottom, initials, className }) {
  return (
    <div className={`stamp ${className ?? ''}`} data-stamp aria-label={`${top}, ${bottom}`} role="img">
      <span className="stamp-top">{top}</span>
      <span className="stamp-rule" />
      <span className="stamp-bottom">
        {bottom} <em>{initials}</em>
      </span>
    </div>
  )
}
