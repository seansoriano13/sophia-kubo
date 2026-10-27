// A picture as the Issue prints it. Three nested layers, one motion each:
// the frame wipes open (data-figure), the picture travels through its bleed as
// you scroll (.fig-scroll), and it leans toward the cursor with a slight zoom
// on hover (.fig-hover). Pen marks go in `children`, positioned in % of the
// picture, so they move with it.
export default function Figure({ src, alt, ratio, fig, caption, kind = 'photo', speed = 1, drift, className = '', eager, children }) {
  const shot = kind === 'shot'
  return (
    <figure className={`fig fig-${kind} ${className}`} data-drift={drift}>
      <div className="fig-frame" style={{ aspectRatio: ratio }} data-figure data-parallax>
        <div className="fig-scroll" data-speed={speed}>
          <div className="fig-hover" data-depth={shot ? -9 : -18} data-zoom={shot ? 0.02 : 0.045}>
            <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
            {children}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="fig-caption">
          {fig && <span className="fig-no">{fig}</span>}
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  )
}
