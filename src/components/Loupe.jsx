// Pea's Loupe: Sean's glasses mark mirrored, so the two face each other, with
// a short handle on the steady lens that turns it into a magnifying glass.
// Same lenses, same uneven bridge, same faded temple line. Drawn in
// currentColor and cropped like Sean's Mark so they sit at the same size.
export default function Loupe({ className, strokeWidth = 2.6, title }) {
  return (
    <svg
      className={className}
      viewBox="7 31 81 43"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="63" cy="50" r="16" />
      <ellipse cx="25" cy="55" rx="14.5" ry="15.5" transform="rotate(-4 25 55)" />
      <path d="M47 49.5L39.5 53.5" />
      <path d="M74.6 61.6L83.5 70.5" strokeWidth={strokeWidth * 1.55} />
      <path d="M79 50H85" opacity="0.4" />
    </svg>
  )
}

// Sean's own glasses, unchanged, for the Contributors credit where the two
// marks sit side by side.
export function SeanMark({ className, strokeWidth = 2.6 }) {
  return (
    <svg className={className} viewBox="7 31 81 43" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden>
      <circle cx="32" cy="50" r="16" />
      <ellipse cx="70" cy="55" rx="14.5" ry="15.5" transform="rotate(4 70 55)" />
      <path d="M48 49.5L55.5 53.5" />
      <path d="M16 50H10" opacity="0.4" />
    </svg>
  )
}
