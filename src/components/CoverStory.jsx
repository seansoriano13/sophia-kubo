import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Figure from './Figure'
import { PenCircle, PenNote, PenTick } from './ProofMarks'
import { COVER_STORY as S } from '../data/content'

// The Cover Story: RedBank across four spreads. The opening, the story with
// its brief, the STAT queue (the Issue's one pinned moment), and what got
// checked.
export default function CoverStory({ reduced }) {
  const [requests, form, users] = S.figures

  return (
    <section className="story" id={S.id}>
      <header className="story-open">
        <div className="story-open-text">
          <p className="kicker">
            <span>{S.page}</span> {S.kicker}
          </p>
          <h2 className="story-title" data-split>
            {S.title[0]}
            <br />
            <em>{S.title[1]}</em>
          </h2>
          <p className="story-deck" data-rise>
            {S.deck}
          </p>
          <p className="story-byline" data-rise>
            {S.byline}
          </p>
        </div>
        <Figure className="story-open-fig" kind="shot" fig="Fig. 1" {...S.opening}>
          <PenCircle seed={3} style={{ left: '1.6%', top: '48%', width: '15.5%', height: '15%' }} delay={1.1} />
          <PenNote className="story-open-note" delay={1.7}>
            starts here
          </PenNote>
        </Figure>
      </header>

      <div className="story-body">
        <aside className="brief" data-rise>
          <p className="kicker">The brief</p>
          <h3 className="brief-name">{S.brief.name}</h3>
          <p className="brief-what">{S.brief.what}</p>
          <p className="brief-body">{S.brief.body}</p>
          <dl className="brief-rows">
            {S.brief.rows.map((r) => (
              <div key={r.term}>
                <dt>{r.term}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
        <div className="story-columns">
          {S.story.map((p, i) => (
            <p key={i} className={i === 0 ? 'story-lede' : undefined} data-rise>
              {p}
            </p>
          ))}
        </div>
      </div>

      <StatQueue reduced={reduced} />

      <blockquote className="story-quote">
        <p data-split>“{S.quote}”</p>
      </blockquote>

      <div className="story-tested">
        <Figure className="tested-a" kind="shot" fig="Fig. 3" {...requests}>
          <PenCircle seed={5} style={{ ...pct(requests.circle) }} />
          <PenNote className="tested-a-note">{requests.note}</PenNote>
        </Figure>

        <div className="test-log" data-rise>
          <p className="kicker">Check log</p>
          <ol>
            {S.log.map((row, i) => (
              <li key={row.id}>
                <span className="log-id">{row.id}</span>
                <span className="log-area">{row.area}</span>
                <span className="log-result">
                  Pass
                  <PenTick delay={0.3 + i * 0.12} />
                </span>
              </li>
            ))}
          </ol>
        </div>

        <Figure className="tested-b" kind="shot" fig="Fig. 4" speed={1.3} {...form} />
        <Figure className="tested-c" kind="shot" fig="Fig. 5" speed={0.8} {...users} />
      </div>
    </section>
  )
}

const pct = (box) => Object.fromEntries(Object.entries(box).map(([k, v]) => [k, `${v}%`]))

// The STAT queue: the laboratory dashboard starts as a red column in the
// middle of the page and, as you scroll, opens out to the full spread while
// the screen inside it comes up to size.
function StatQueue({ reduced }) {
  const root = useRef(null)

  useGSAP(
    () => {
      if (reduced) return
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add({ wide: '(min-width: 768px)', narrow: '(max-width: 767px)' }, (ctx) => {
        const { wide } = ctx.conditions
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160%', pin: true, scrub: 1, refreshPriority: 1 },
          })
          .fromTo(
            q('.stat-panel'),
            { clipPath: wide ? 'inset(19% 35% 19% 35% round 6px)' : 'inset(20% 10% 20% 10% round 6px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1 },
            0,
          )
          .fromTo(q('.stat-shot'), { scale: wide ? 0.4 : 0.78 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
          .fromTo(q('.stat-word'), { scale: 0.55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: 'power2.out', duration: 0.9 }, 0.1)
          .to(q('.stat-side'), { autoAlpha: 0, y: -24, duration: 0.25, ease: 'power1.in' }, 0)
          .fromTo(q('.stat-copy > *'), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.3, ease: 'power2.out' }, 0.72)
          .to({}, { duration: 0.35 })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <div className="stat" ref={root}>
      <p className="stat-side stat-side-l">
        <span className="fig-no">Fig. 2</span> The laboratory dashboard
      </p>
      <p className="stat-side stat-side-r" aria-hidden>
        Keep scrolling ↓
      </p>
      <div className="stat-panel">
        <span className="stat-word" aria-hidden>
          STAT
        </span>
        <div className="stat-shot">
          <img src={S.stat.src} alt={S.stat.alt} loading="lazy" decoding="async" />
        </div>
        <div className="stat-copy">
          <p className="kicker">Fig. 2 — The laboratory dashboard</p>
          <h3>{S.stat.title}</h3>
          <p>{S.stat.body}</p>
        </div>
      </div>
    </div>
  )
}
