import { PenNote } from './ProofMarks'
import { INTERVIEW as I } from '../data/content'

// The Interview, opened by the studio portrait. The portrait is the Cover's
// effect in two layers: the print leans toward the cursor while its mount
// slides the other way. Answers darken word by word as you read them.
export default function Interview() {
  return (
    <section className="interview" id={I.id}>
      <div className="interview-portrait" data-parallax="touch">
        <div className="portrait-mount" data-depth="16" aria-hidden />
        <figure className="portrait-print" data-depth="-22">
          <div className="portrait-frame">
            <img src={I.portrait.src} alt={I.portrait.alt} loading="lazy" decoding="async" />
          </div>
          <figcaption className="portrait-caption">{I.caption}</figcaption>
        </figure>
        <span className="portrait-note" data-depth="40">
          <PenNote>that’s Pea ✓</PenNote>
        </span>
      </div>

      <div className="interview-text">
        <p className="kicker">
          <span>{I.page}</span> {I.kicker}
        </p>
        <h2 className="interview-title" data-split>
          {I.title[0]}
          <br />
          <em>{I.title[1]}</em>
        </h2>
        <p className="standfirst" data-rise>
          {I.standfirst}
        </p>
        <dl className="qa">
          {I.qa.map((item) => (
            <div key={item.q} className="qa-item">
              <dt data-rise>{item.q}</dt>
              <dd data-words>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
