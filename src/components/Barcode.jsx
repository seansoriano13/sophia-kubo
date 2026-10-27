// A cover barcode. Decorative: the bars come from the code string, so they
// stay the same on every render, but they don't encode anything.
export default function Barcode({ code = '9771234567003', label, className }) {
  const bars = []
  let x = 0
  for (let i = 0; i < 46; i++) {
    const n = code.charCodeAt(i % code.length) + i * 7
    const w = 1 + (n % 3)
    if (i % 2 === 0) bars.push({ x, w, tall: i < 3 || i > 42 || i === 22 || i === 24 })
    x += w + (n % 2)
  }
  return (
    <div className={`barcode ${className ?? ''}`} aria-hidden>
      <svg viewBox={`0 0 ${x} 40`} preserveAspectRatio="none">
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y="0" width={b.w} height={b.tall ? 40 : 34} fill="currentColor" />
        ))}
      </svg>
      <span className="barcode-digits">{code.replace(/^(\d)(\d{6})(\d{6})$/, '$1 $2 $3')}</span>
      {label && <span className="barcode-label">{label}</span>}
    </div>
  )
}
