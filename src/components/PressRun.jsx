import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Loupe from './Loupe'
import { COVER, ISSUE, PERSON } from '../data/content'

const SEEN = 'kubo:printed'
const INKS = ['#00a3e0', '#e5007e', '#ffe600', '#17130f', '#2a4bd7', '#d3261c', '#1f9d55', '#8a8178']

function seenBefore() {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN, '1')
  } catch {
    // Private windows can refuse storage; the next visit just prints in full.
  }
}

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })
}

// The Press Run: crop marks, registration targets and colour bars draw in
// around the sheet, the counter runs to 100, then the sheet lifts off the
// Cover. A repeat visit in the same session gets a short run.
export default function PressRun({ onExit }) {
  const root = useRef(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const quick = seenBefore()
      const q = gsap.utils.selector(root)
      const counter = q('.press-count-num')[0]
      const count = { v: 0 }
      const ready = Promise.all([document.fonts.ready, preload(COVER.cutout)])

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(q('.crop'), { scale: 0, duration: 0.9, stagger: 0.05 }, 0)
        .from(q('.reg'), { rotation: -90, scale: 0.4, autoAlpha: 0, duration: 1 }, 0.1)
        .from(q('.ink'), { scaleY: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' }, 0.15)
        .from(q('.press-meta > *'), { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.06 }, 0.2)
        .to(
          count,
          {
            v: 100,
            duration: quick ? 0.55 : 1.7,
            ease: 'power2.inOut',
            onUpdate: () => (counter.textContent = String(Math.round(count.v)).padStart(3, '0')),
          },
          0.2,
        )
        .add(() => {
          tl.pause()
          ready.then(() => tl.resume())
        })
        .add(() => {
          markSeen()
          onExit()
        })
        .to(q('.press-inner'), { autoAlpha: 0, y: -30, duration: 0.5, ease: 'power2.in' })
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '<0.1')
        .add(() => setGone(true))
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div className="press" ref={root} aria-hidden>
      <div className="press-inner">
        <span className="crop crop-tl" />
        <span className="crop crop-tr" />
        <span className="crop crop-bl" />
        <span className="crop crop-br" />

        <svg className="reg reg-l" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="11" />
          <circle cx="20" cy="20" r="5" />
          <path d="M20 2V38M2 20H38" />
        </svg>
        <svg className="reg reg-r" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="11" />
          <circle cx="20" cy="20" r="5" />
          <path d="M20 2V38M2 20H38" />
        </svg>

        <div className="inks">
          {INKS.map((c) => (
            <span key={c} className="ink" style={{ background: c }} />
          ))}
        </div>

        <div className="press-meta">
          <Loupe className="press-loupe" strokeWidth={2.4} />
          <p className="press-count">
            <span className="press-count-num">000</span>
          </p>
          <p className="press-line">
            Printing {ISSUE.title}, {ISSUE.number}
          </p>
        </div>

        <p className="press-slug">
          KUBO_Proof_{ISSUE.number.replace(' ', '')}.pdf · Plate 1 of 4 · {PERSON.name}
        </p>
      </div>
    </div>
  )
}
