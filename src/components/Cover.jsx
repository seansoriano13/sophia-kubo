import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Loupe from './Loupe'
import Barcode from './Barcode'
import { PenCaret, PenCircle, PenNote, PenStrike } from './ProofMarks'
import { jumpTo } from './Nav'
import { COVER, ISSUE, PERSON } from '../data/content'

// The Cover. Five layers, back to front: the paper backdrop, the cover lines
// printed on it, the KUBO masthead, Pea's cut-out, and the labels nearest the
// glass. Each sits in two wrappers: the outer one carries the scroll-out, the
// inner one ([data-depth]) the hover parallax, so the two never fight.
export default function Cover({ entered, reduced }) {
  const root = useRef(null)

  useGSAP(
    () => {
      if (reduced) return
      const q = gsap.utils.selector(root)
      const notes = q('[data-pen-write]')

      if (!entered) {
        gsap.set(q('.mast-char'), { yPercent: 108 })
        gsap.set(q('.cover-cutout-img'), { yPercent: 9, scale: 1.05 })
        gsap.set(q('.cover-backdrop-paper'), { scale: 1.14 })
        gsap.set(q('[data-cover-in]'), { autoAlpha: 0, y: 20 })
        gsap.set(notes, { clipPath: 'inset(-20% 100% -20% 0%)' })
        return
      }

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to(q('.cover-backdrop-paper'), { scale: 1, duration: 2.4 }, 0)
        .to(q('.cover-cutout-img'), { yPercent: 0, scale: 1, duration: 2 }, 0.1)
        .to(q('.mast-char'), { yPercent: 0, duration: 1.5, stagger: 0.08 }, 0.25)
        .to(q('[data-cover-in]'), { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.05, ease: 'power3.out' }, 0.75)
        // The Correction: strike the typo, mark it, write it right.
        .to(q('.correction [data-pen] path'), { strokeDashoffset: 0, duration: 0.5, stagger: 0.25, ease: 'power2.inOut' }, 1.9)
        .to(q('.correction [data-pen-write]'), { clipPath: 'inset(-20% -6% -20% 0%)', duration: 0.8, ease: 'power2.out' }, 2.35)
        .to(q('.cover-issue [data-pen] path'), { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 2.6)
        .to(q('.cover-sign [data-pen-write]'), { clipPath: 'inset(-20% -6% -20% 0%)', duration: 1.4, ease: 'power1.inOut' }, 1.2)

      // Leaving the Cover: the paper and the masthead lag behind while Pea
      // comes forward, so you pull away from it in depth.
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
        .to(q('.cover-backdrop'), { yPercent: 34, ease: 'none' }, 0)
        .to(q('.cover-print'), { yPercent: 18, autoAlpha: 0, ease: 'none' }, 0)
        .to(q('.cover-mast'), { yPercent: 46, ease: 'none' }, 0)
        .to(q('.cover-cutout'), { yPercent: 4, scale: 1.12, ease: 'none' }, 0)
        .to(q('.cover-near'), { yPercent: -16, autoAlpha: 0, ease: 'none' }, 0)
    },
    { scope: root, dependencies: [entered, reduced] },
  )

  const { headline } = COVER

  return (
    <section className="cover" id="cover" ref={root} data-parallax="touch" data-manual-pen>
      <div className="cover-layer cover-backdrop">
        <div className="cover-depth" data-depth="8">
          <div className="cover-backdrop-paper">
            <span className="cover-halftone cover-halftone-a" />
            <span className="cover-halftone cover-halftone-b" />
            <span className="cover-rule cover-rule-v1" />
            <span className="cover-rule cover-rule-v2" />
            <span className="cover-rule cover-rule-h" />
          </div>
        </div>
      </div>

      <div className="cover-layer cover-print">
        <div className="cover-depth" data-depth="16">
          <div className="cover-top" data-cover-in>
            <Loupe className="cover-loupe" strokeWidth={2.8} />
            <p>
              Portfolio :: {ISSUE.year}
              <br />
              {PERSON.role} :: {ISSUE.number}
            </p>
          </div>
          <p className="cover-issue" data-cover-in>
            <span className="cover-issue-no">
              {ISSUE.number}
              <PenCircle seed={11} />
            </span>
            <span>
              {ISSUE.month}
              <br />
              {ISSUE.price}
            </span>
          </p>

          <div className="cover-feature">
            <p className="cover-kicker" data-cover-in>
              {ISSUE.title}
            </p>
            <p className="cover-headline" data-cover-in>
              {headline.lead}
              <br />
              {headline.before}{' '}
              <span className="correction">
                <span className="correction-wrong" aria-hidden>
                  {headline.wrong}
                  <PenStrike />
                </span>
                <PenCaret className="correction-caret" />
                {headline.after}
                <PenNote className="correction-right">{headline.right}</PenNote>
              </span>
            </p>
            <p className="cover-sub" data-cover-in>
              {PERSON.name} — {PERSON.role}
            </p>
          </div>

          <ul className="cover-lines">
            {COVER.lines.map((l) => (
              <li key={l.page} data-cover-in>
                <a href={l.href} onClick={jumpTo}>
                  <span className="cover-line-kicker">
                    {l.kicker} <span>p. {l.page}</span>
                  </span>
                  <span className="cover-line-title">{l.title}</span>
                  {l.body && <span className="cover-line-body">{l.body}</span>}
                </a>
              </li>
            ))}
          </ul>

          <Barcode className="cover-barcode" label={`${ISSUE.title} · ${ISSUE.number}`} />
        </div>
      </div>

      <div className="cover-layer cover-mast">
        <div className="cover-depth" data-depth="24">
          <h1 className="masthead">
            <span className="sr-only">
              {PERSON.name}, {PERSON.role}.
            </span>
            <span className="masthead-word" aria-hidden>
              {COVER.masthead.split('').map((ch, i) => (
                <span key={i} className="mast-clip">
                  <span className="mast-char">{ch}</span>
                </span>
              ))}
            </span>
          </h1>
        </div>
      </div>

      <div className="cover-layer cover-cutout">
        <div className="cover-depth" data-depth="44">
          <span className="cover-shadow" aria-hidden />
          <img className="cover-cutout-img" src={COVER.cutout} alt={`${PERSON.name}, photographed for the Cover`} fetchPriority="high" />
        </div>
      </div>

      <div className="cover-layer cover-near">
        <div className="cover-depth" data-depth="72">
          <p className="cover-label cover-label-l" data-cover-in>
            {COVER.labels[0]}
            <span aria-hidden>★</span>
          </p>
          <p className="cover-label cover-label-r" data-cover-in>
            {COVER.labels[1]}
            <span aria-hidden>★</span>
          </p>
          <p className="cover-sign" aria-hidden>
            <span data-pen-write>{PERSON.name}</span>
          </p>
          <p className="cover-cue" data-cover-in>
            Scroll to read <span aria-hidden>↓</span>
          </p>
        </div>
      </div>
    </section>
  )
}
