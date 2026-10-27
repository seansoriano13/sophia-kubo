import Figure from './Figure'
import { DEPARTMENTS } from '../data/content'

// The Departments: shorter Work after the Cover Story, each laid out as its own
// spread. A second picture always travels at a different speed from the
// first, so the spread has depth as it scrolls by.
export default function Departments() {
  return (
    <section className="depts" id="departments" aria-labelledby="depts-title">
      <header className="depts-head">
        <p className="kicker">
          <span>{DEPARTMENTS[0].page}</span> Departments
        </p>
        <h2 id="depts-title" className="depts-title" data-split>
          Shorter pieces from <em>the checking desk.</em>
        </h2>
      </header>

      {DEPARTMENTS.map((d, i) => (
        <article key={d.id} id={d.id} className={`dept dept-${d.layout}`}>
          <div className="dept-text">
            <p className="dept-no" data-rise>
              <span>Dept. {String(i + 1).padStart(2, '0')}</span>
              <span>p. {d.page}</span>
            </p>
            <p className="kicker" data-rise>
              {d.kicker} · {d.year}
            </p>
            <h3 className="dept-title" data-split>
              {d.title}
            </h3>
            <p className="dept-summary" data-rise>
              {d.summary}
            </p>
            <ul className="dept-scope" data-rise>
              {d.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="dept-tools" data-rise>
              {d.tools.join(' · ')}
            </p>
          </div>
          {d.images.map((img, j) => (
            <Figure
              key={img.src}
              className={`dept-fig dept-fig-${j}`}
              src={img.src}
              alt={img.alt}
              ratio={img.ratio}
              speed={j ? 1.5 : 1}
              drift={j ? 0.22 : undefined}
            />
          ))}
        </article>
      ))}
    </section>
  )
}
