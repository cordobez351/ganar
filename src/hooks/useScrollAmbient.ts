import type Lenis from 'lenis'
import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState, type RefObject } from 'react'

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function scopeProgress(scope: HTMLElement, scroll: number) {
  const range = scope.offsetHeight - window.innerHeight
  if (range <= 0) return 1
  return clamp((scroll - scope.offsetTop) / range, 0, 1)
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
  if (Math.abs(video.currentTime - t) < 0.04) return
  try {
    video.currentTime = t
  } catch {
    // Frame not decoded yet
  }
}

export function useScrollAmbient(
  scopeRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
) {
  const readyRef = useRef(false)
  const opacityRef = useRef(0)
  const activeRef = useRef(false)
  const [active, setActive] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useLenis((lenis: Lenis) => {
    const scope = scopeRef.current
    if (!scope) return

    const fade = heroFade(lenis.scroll)
    const progress = scopeProgress(scope, lenis.scroll)

    if ((fade > 0) !== activeRef.current) {
      activeRef.current = fade > 0
      setActive(fade > 0)
    }

    if (Math.abs(fade - opacityRef.current) > 0.01) {
      opacityRef.current = fade
      setOpacity(fade)
    }

    const video = videoRef.current
    if (video && readyRef.current && fade > 0) {
      seekVideo(video, progress * video.duration)
    }
  }, [scopeRef, videoRef])

  useEffect(() => {
    if (!active) {
      readyRef.current = false
      return
    }

    const video = videoRef.current
    if (!video) return

    const prime = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      video.pause()
      readyRef.current = true
    }

    video.addEventListener('loadedmetadata', prime)
    if (video.readyState >= 1) prime()

    return () => {
      readyRef.current = false
      video.removeEventListener('loadedmetadata', prime)
    }
  }, [active, videoRef])

  return { opacity, active }
}
