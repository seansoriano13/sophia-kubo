import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import PressRun from './components/PressRun'
import Nav from './components/Nav'
import Cover from './components/Cover'
import Contents from './components/Contents'
import CoverStory from './components/CoverStory'
import Departments from './components/Departments'
import Method from './components/Method'
import Interview from './components/Interview'
import BackCover from './components/BackCover'
import { lockScroll, startSmoothScroll, stopSmoothScroll } from './lib/smoothScroll'
import { FINE_POINTER, pointerParallax, scrollDepth } from './lib/parallax'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

const REDUCED = '(prefers-reduced-motion: reduce)'

export default function App() {
  const [reduced] = useState(() => window.matchMedia(REDUCED).matches)
  const [entered, setEntered] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    startSmoothScroll()
    lockScroll(true)
    return stopSmoothScroll
  }, [reduced])

  useEffect(() => {
    document.documentElement.classList.toggle('motion-reduce', reduced)
    document.documentElement.classList.toggle('is-loading', !entered)
    if (entered) {
      lockScroll(false)
      ScrollTrigger.refresh()
    }
  }, [entered, reduced])

  return (
    <>
      {!reduced && <PressRun onExit={() => setEntered(true)} />}
      <Nav entered={entered} />
      <main>
        <Cover entered={entered} reduced={reduced} />
        <Contents />
        <CoverStory reduced={reduced} />
        <Departments />
        <Method />
        <Interview />
      </main>
      <BackCover />
      <Motion ready={entered} reduced={reduced} />
    </>
  )
}

// The Issue-wide motion. Hover parallax on every [data-parallax] area, and the
// scroll reveals: headlines rise line by line, pictures wipe open and drift
// inside their frames, answers darken word by word, and the red pen draws.
function Motion({ ready, reduced }) {
  useGSAP(
    () => {
      if (!ready || reduced) return
      const mm = gsap.matchMedia()

      mm.add(FINE_POINTER, () => {
        const off = gsap.utils.toArray('[data-parallax]').map(pointerParallax)
        return () => off.forEach((fn) => fn())
      })
      mm.add(`not all and ${FINE_POINTER}`, () => {
        gsap.utils.toArray('[data-parallax="touch"]').forEach(scrollDepth)
      })

      gsap.utils.toArray('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => {
            // Let descenders and italic overhangs out of the line masks.
            for (const m of self.masks ?? []) {
              m.style.padding = '0 0.08em 0.16em'
              m.style.margin = '0 -0.08em -0.16em'
            }
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.4,
              stagger: 0.09,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            })
          },
        })
      })

      gsap.set('[data-rise]', { autoAlpha: 0, y: 34 })
      ScrollTrigger.batch('[data-rise]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out' }),
      })

      gsap.utils.toArray('[data-figure]').forEach((frame) => {
        const layer = frame.querySelector('.fig-scroll')
        const img = frame.querySelector('img')
        const speed = parseFloat(layer.dataset.speed || 1)
        const reveal = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 88%' } })
        reveal
          .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.out' })
          .fromTo(img, { scale: 1.28 }, { scale: 1, duration: 1.9, ease: 'expo.out' }, 0)
          .set(frame, { clearProps: 'clipPath' })
        // The picture is cut a little larger than its frame; it travels
        // through that bleed as the frame crosses the screen.
        const travel = () => ((layer.offsetHeight - frame.offsetHeight) / 2) * 0.62 * speed
        gsap.fromTo(
          layer,
          { y: travel },
          {
            y: () => -travel(),
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
          },
        )
      })

      gsap.utils.toArray('[data-drift]').forEach((el) => {
        const amount = () => window.innerHeight * parseFloat(el.dataset.drift)
        gsap.fromTo(
          el,
          { y: () => amount() * 0.5 },
          {
            y: () => -amount() * 0.5,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
          },
        )
      })

      gsap.utils.toArray('[data-words]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true },
          },
        )
      })

      // The red pen. Cover marks belong to the Cover's own timeline.
      const own = (el) => !el.closest('[data-manual-pen]')
      gsap.utils.toArray('[data-pen]').filter(own).forEach((svg) => {
        gsap.to(svg.querySelectorAll('path'), {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.inOut',
          delay: parseFloat(svg.dataset.penDelay || 0.25),
          scrollTrigger: { trigger: svg, start: 'top 82%' },
        })
      })
      gsap.utils.toArray('[data-pen-write]').filter(own).forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(-20% 100% -20% 0%)' },
          {
            clipPath: 'inset(-20% -6% -20% 0%)',
            duration: 0.9,
            ease: 'power2.out',
            delay: parseFloat(el.dataset.penDelay || 0.7),
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        )
      })

      gsap.utils.toArray('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.count)
        const n = { v: 0 }
        gsap.to(n, {
          v: to,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => (el.textContent = Math.round(n.v).toLocaleString('en-US')),
        })
      })

      gsap.utils.toArray('[data-stamp]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 1.9, rotation: -22 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: -9,
            duration: 0.55,
            ease: 'power4.in',
            scrollTrigger: { trigger: el, start: 'top 78%' },
            onComplete: () => gsap.fromTo(el, { x: -2, y: 2 }, { x: 0, y: 0, duration: 0.35, ease: 'elastic.out(1.2, 0.4)' }),
          },
        )
      })

      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    },
    { dependencies: [ready, reduced] },
  )
  return null
}
