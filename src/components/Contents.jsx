import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { jumpTo } from './Nav'
import { FINE_POINTER } from '../lib/parallax'
import { CONTENTS, ISSUE } from '../data/content'

// The Contents. Hovering a row brings up a preview card that trails the
// cursor and tilts with its speed, while the picture inside it leans the other
// way; the other rows step back. On touch screens each row carries its own
// thumbnail instead.
export default function Contents() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${FINE_POINTER} and (prefers-reduced-motion: no-preference)`, () => {
        const list = root.current.querySelector('.toc-body')
        const card = root.current.querySelector('.toc-preview')
        const pics = gsap.utils.toArray('.toc-preview-pic', card)
        const rows = gsap.utils.toArray('.toc-row', list)

        const x = gsap.quickTo(card, 'x', { duration: 0.75, ease: 'power3.out' })
        const y = gsap.quickTo(card, 'y', { duration: 0.75, ease: 'power3.out' })
        const tilt = gsap.quickTo(card, 'rotation', { duration: 0.9, ease: 'power3.out' })
        const leanX = pics.map((p) => gsap.quickTo(p.firstChild, 'x', { duration: 1, ease: 'power3.out' }))
        const leanY = pics.map((p) => gsap.quickTo(p.firstChild, 'y', { duration: 1, ease: 'power3.out' }))
        const settle = gsap.delayedCall(0.12, () => tilt(0)).pause()

        let lastX = null
        let active = -1
        let z = 1

        const move = (e) => {
          const r = list.getBoundingClientRect()
          const px = e.clientX - r.left
          const py = e.clientY - r.top
          x(px)
          y(py)
          if (lastX !== null) tilt(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.7))
          lastX = e.clientX
          settle.restart(true)
          const nx = px / r.width - 0.5
          const ny = py / r.height - 0.5
          leanX.forEach((fn) => fn(nx * -46))
          leanY.forEach((fn) => fn(ny * -30))
        }

        const show = (i) => {
          if (i === active) return
          active = i
          rows.forEach((row, j) => row.classList.toggle('is-dim', j !== i))
          const pic = pics[i]
          gsap.set(pic, { zIndex: ++z })
          gsap.fromTo(pic, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out', overwrite: true })
          gsap.fromTo(pic.firstChild, { scale: 1.35 }, { scale: 1.12, duration: 1.1, ease: 'expo.out', overwrite: 'auto' })
        }

        const enter = (e) => {
          const r = list.getBoundingClientRect()
          gsap.set(card, { x: e.clientX - r.left, y: e.clientY - r.top })
          gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'expo.out', overwrite: 'auto' })
        }
        const leave = () => {
          active = -1
          lastX = null
          rows.forEach((row) => row.classList.remove('is-dim'))
          gsap.to(card, { autoAlpha: 0, scale: 0.7, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
        }

        const onRow = rows.map((row, i) => {
          const fn = () => show(i)
          row.addEventListener('pointerenter', fn)
          return fn
        })
        list.addEventListener('pointerenter', enter)
        list.addEventListener('pointermove', move)
        list.addEventListener('pointerleave', leave)
        return () => {
          rows.forEach((row, i) => row.removeEventListener('pointerenter', onRow[i]))
          list.removeEventListener('pointerenter', enter)
          list.removeEventListener('pointermove', move)
          list.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="toc" id="contents" ref={root}>
      <header className="toc-head">
        <p className="kicker">
          <span>02</span> Contents
        </p>
        <h2 className="toc-title" data-split>
          Contents
        </h2>
        <p className="toc-issue" data-rise>
          {ISSUE.title}
          <br />
          {ISSUE.number} · {ISSUE.month}
        </p>
      </header>

      <div className="toc-body">
        <ol className="toc-list">
          {CONTENTS.map((row) => (
          <li key={row.href} className="toc-row" data-rise>
            <a href={row.href} onClick={jumpTo}>
              <span className="toc-page">{row.page}</span>
              <span className="toc-kicker">{row.kicker}</span>
              <span className="toc-name">{row.title}</span>
              <span className="toc-meta">{row.meta}</span>
              <span className="toc-thumb" aria-hidden>
                <img src={row.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="toc-arrow" aria-hidden>
                →
              </span>
            </a>
          </li>
          ))}
        </ol>
        <div className="toc-preview" aria-hidden>
          {CONTENTS.map((row) => (
            <span key={row.href} className="toc-preview-pic">
              <img src={row.image} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
