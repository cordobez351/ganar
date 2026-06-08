import type Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState, type RefObject } from 'react'

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function scopeProgress(scope: HTMLElement) {
  const rect = scope.getBoundingClientRect()
  const range = rect.height - window.innerHeight
  if (range <= 0) return 1
  return clamp(-rect.top / range, 0, 1)
}

function heroFade(scroll: number) {
  const hero = window.innerHeight
  if (scroll < hero * 0.25) return 0
  if (scroll < hero * 0.7) return (scroll - hero * 0.25) / (hero * 0.45)
  return 1
}

function seekVideo(video: HTMLVideoElement, time: number) {
  if (video.readyState < 2 || !Number.isFinite(video.duration)) return
  const t = clamp(time, 0, Math.max(0, video.duration - 0.04))
  if (Math.abs(video.currentTime - t) < 0.08) return
  try {
    video.currentTime = t
  } catch {
    // Frame not decoded yet
  }
}

export function useScrollAmbient(
  scopeRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLDivElement | null>,
) {
  const readyRef = useRef(false)
  const mountedRef = useRef(false)
  const pendingProgressRef = useRef(0)
  const rafRef = useRef(0)
  const [mounted, setMounted] = useState(false)

  useLenis((lenis: Lenis) => {
    const scope = scopeRef.current
    const container = containerRef.current
    if (!scope || !container) return

    const fade = heroFade(lenis.scroll)
    const progress = scopeProgress(scope)

    pendingProgressRef.current = progress
    container.style.opacity = String(fade)
    container.style.visibility = fade > 0 ? 'visible' : 'hidden'

    if (fade > 0 && !mountedRef.current) {
      mountedRef.current = true
      setMounted(true)
    }

    if (!readyRef.current || fade <= 0) return

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const video = videoRef.current
      if (video && readyRef.current) {
        seekVideo(video, pendingProgressRef.current * video.duration)
      }
    })
  }, [scopeRef, videoRef, containerRef])

  useEffect(() => {
    if (!mounted) return

    const video = videoRef.current
    if (!video) return

    const prime = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      video.pause()
      readyRef.current = true
      seekVideo(video, pendingProgressRef.current * video.duration)
    }

    video.addEventListener('loadedmetadata', prime)
    if (video.readyState >= 1) prime()

    return () => {
      readyRef.current = false
      video.removeEventListener('loadedmetadata', prime)
    }
  }, [mounted, videoRef])

  return { mounted }
}
