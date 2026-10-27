import Barcode from './Barcode'
import Loupe, { SeanMark } from './Loupe'
import { PenUnderline, Stamp } from './ProofMarks'
import { jumpTo } from './Nav'
import { BACK_COVER as B, ISSUE, PERSON } from '../data/content'

// The Back Cover: how to reach Pea, the approval stamp that signs the Issue
// off, and the Contributors credit, where Pea's Loupe and Sean's glasses face
// each other.
export default function BackCover() {
  return (
    <footer className="back" id="contact">
      <div className="back-head">
        <p className="kicker">
          <span>28</span> {B.kicker}
        </p>
        <h2 className="back-title" data-split>
          {B.title[0]}
          <br />
          <em>{B.title[1]}</em>
        </h2>
        <Stamp className="back-stamp" {...B.stamp} />
      </div>

      <div className="back-reach">
        <p className="back-invite" data-rise>
          {B.invite}
        </p>
        <a className="back-email" href={`mailto:${PERSON.email}`} data-rise data-manual-pen>
          {PERSON.email}
          <PenUnderline className="back-email-pen" />
        </a>
        <ul className="back-links" data-rise>
          {PERSON.links.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label} ↗</a>
            </li>
          ))}
          <li>{PERSON.location}</li>
          <li>{PERSON.availability}</li>
        </ul>
      </div>

      <div className="back-foot">
        <Barcode className="back-barcode" code="9771234567010" label={`${ISSUE.title} · ${ISSUE.number} · ${ISSUE.year}`} />
        <p className="colophon">{B.colophon}</p>
        <a className="contributors" href={B.contributors.href} target="_blank" rel="noreferrer">
          <span className="contrib-marks" aria-hidden>
            <Loupe strokeWidth={3.2} />
            <SeanMark strokeWidth={3.2} />
          </span>
          <span>
            Contributors · {B.contributors.label} <strong>{B.contributors.name}</strong> ↗
          </span>
        </a>
        <a className="back-top" href="#cover" onClick={jumpTo}>
          Back to the Cover ↑
        </a>
      </div>
    </footer>
  )
}
