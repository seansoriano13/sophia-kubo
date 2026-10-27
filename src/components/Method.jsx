import { PenTick } from './ProofMarks'
import { METHOD as M } from '../data/content'

// The Method: four rules, each ticked off in the margin by the red pen as it
// comes in. The big numerals drift slower than the text beside them.
export default function Method() {
  return (
    <section className="method" id={M.id}>
      <header className="method-head">
        <p className="kicker">
          <span>{M.page}</span> {M.kicker}
        </p>
        <h2 className="method-title" data-split>
          {M.title[0]}
          <br />
          {M.title[1]}
          <br />
          <em>{M.title[2]}</em>
        </h2>
        <p className="method-intro" data-rise>
          {M.intro}
        </p>
      </header>

      <ol className="rules">
        {M.rules.map((r, i) => (
          <li key={r.numeral} className="rule">
            <span className="rule-numeral" data-drift="0.12" aria-hidden>
              {r.numeral}
            </span>
            <div className="rule-body" data-rise>
              <p className="kicker">
                Rule {i + 1} · {r.tag}
              </p>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
            <PenTick className="rule-tick" delay={0.5} />
          </li>
        ))}
      </ol>

      <div className="method-foot">
        <dl className="stats">
          {M.stats.map((s) => (
            <div key={s.caption} data-rise>
              <dt className="stat-num">
                <span data-count={s.value}>{s.value.toLocaleString('en-US')}</span>
                {s.suffix}
              </dt>
              <dd>{s.caption}</dd>
            </div>
          ))}
        </dl>
        <p className="tools" data-rise>
          <span className="kicker">On the desk</span>
          {M.tools.join(' · ')}
        </p>
      </div>
    </section>
  )
}
