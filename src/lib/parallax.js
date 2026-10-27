import { gsap } from 'gsap'

export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

// Korowa's hover parallax, turned up. Every [data-depth] layer inside a
// [data-parallax] area moves against the cursor, by up to `depth` px each way,
// so layers with different depths slide past each other. A negative depth
// moves with the cursor instead. [data-zoom] adds a slight scale while hovered.
export function pointerParallax(area) {
  const layers = gsap.utils
    .toArray('[data-depth]', area)
    .filter((el) => el.closest('[data-parallax]') === area)
  if (!layers.length) return () => {}

  const springs = layers.map((el) => ({
    depth: parseFloat(el.dataset.depth),
    zoom: parseFloat(el.dataset.zoom || 0),
    x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
    y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
    scale: el.dataset.zoom ? gsap.quickTo(el, 'scale', { duration: 0.9, ease: 'power3.out' }) : null,
  }))

  const move = (e) => {
    const r = area.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    for (const s of springs) {
      s.x(-nx * 2 * s.depth)
      s.y(-ny * 2 * s.depth)
    }
  }
  const enter = () => {
    for (const s of springs) s.scale?.(1 + s.zoom)
  }
  const leave = () => {
    for (const s of springs) {
      s.x(0)
      s.y(0)
      s.scale?.(1)
    }
  }

  area.addEventListener('pointerenter', enter)
  area.addEventListener('pointermove', move)
  area.addEventListener('pointerleave', leave)
  return () => {
    area.removeEventListener('pointerenter', enter)
    area.removeEventListener('pointermove', move)
    area.removeEventListener('pointerleave', leave)
  }
}

// Phones have no cursor, so areas marked data-parallax="touch" get the same
// depth from scrolling instead: each layer drifts by its depth as the area
// passes through the viewport.
export function scrollDepth(area) {
  gsap.utils
    .toArray('[data-depth]', area)
    .filter((el) => el.closest('[data-parallax]') === area)
    .forEach((el) => {
      const depth = parseFloat(el.dataset.depth) * 0.9
      gsap.fromTo(
        el,
        { y: depth },
        { y: -depth, ease: 'none', scrollTrigger: { trigger: area, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    })
}
