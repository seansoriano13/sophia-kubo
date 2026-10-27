import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Loupe from './Loupe'
import { scrollToTarget } from '../lib/smoothScroll'

const LINKS = [
  { href: '#contents', label: 'Contents' },
  { href: '#cover-story', label: 'Cover Story', wide: true },
  { href: '#method', label: 'Method', wide: true },
  { href: '#interview', label: 'Interview', wide: true },
  { href: '#contact', label: 'Contact' },
]

export function jumpTo(e) {
  const href = e.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return
  e.preventDefault()
  scrollToTarget(href)
}

// The black pill, after Palace's. It drops in once the Cover is printed,
// tucks away while you read down, and comes back as soon as you scroll up.
export default function Nav({ entered }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!entered) {
        gsap.set(ref.current, { yPercent: -180 })
        return
      }
      let shown = false
      const show = (on) => {
        if (on === shown) return
        shown = on
        gsap.to(ref.current, { yPercent: on ? 0 : -180, duration: on ? 0.8 : 0.5, ease: on ? 'expo.out' : 'power2.in', overwrite: true })
      }
      gsap.delayedCall(0.9, () => show(true))
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (self.scroll() < 240) show(true)
          else show(self.direction < 0)
        },
      })
    },
    { dependencies: [entered] },
  )

  return (
    <nav className="nav" ref={ref} aria-label="Sections">
      <a className="nav-brand" href="#cover" onClick={jumpTo} aria-label="Back to the Cover">
        <Loupe className="nav-loupe" strokeWidth={3} />
        <span>KUBO</span>
      </a>
      <span className="nav-rule" aria-hidden />
      {LINKS.map((l) => (
        <a key={l.href} className={`nav-link ${l.wide ? 'nav-link-wide' : ''}`} href={l.href} onClick={jumpTo}>
          {l.label}
        </a>
      ))}
    </nav>
  )
}
