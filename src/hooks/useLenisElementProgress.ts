import type Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { useCallback, useRef, type RefObject } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function scopeProgress(scope: HTMLElement, scroll: number) {
  const top = scope.offsetTop
  const height = scope.offsetHeight
  const viewport = window.innerHeight
  const range = height - viewport
  if (range <= 0) return 1
  return clamp((scroll - top) / range, 0, 1)
}

function heroFade(scroll: number) {
  const hero = window.innerHeight
  if (scroll < hero * 0.25) return 0
  if (scroll < hero * 0.7) return (scroll - hero * 0.25) / (hero * 0.45)
  return 1
}

export function useLenisElementProgress(
  scopeRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number, fade: number) => void,
) {
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  const handleScroll = useCallback((lenis: Lenis) => {
    const scope = scopeRef.current
    const scroll = lenis.scroll
    const fade = heroFade(scroll)
    const progress = scope ? scopeProgress(scope, scroll) : 0
    onProgressRef.current(progress, fade)
  }, [scopeRef])

  useLenis(handleScroll, [handleScroll])
}
