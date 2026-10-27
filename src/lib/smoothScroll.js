import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

// Same wiring as Sean's site: Lenis drives the scroll, GSAP's ticker drives
// Lenis, so ScrollTrigger and the smoothed position never disagree by a frame.
export function startSmoothScroll() {
  if (lenis) return lenis
  lenis = new Lenis({ autoRaf: false, lerp: 0.09 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  // Dev only: lets the browser console jump the smoothed scroll around.
  if (import.meta.env.DEV) window.__lenis = lenis
  return lenis
}

function raf(time) {
  lenis?.raf(time * 1000)
}

export function stopSmoothScroll() {
  gsap.ticker.remove(raf)
  lenis?.destroy()
  lenis = null
}

export function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6, offset: 0 })
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}

export function lockScroll(locked) {
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}
