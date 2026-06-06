import { useLenis } from 'lenis/react'
import { useEffect, useRef, type RefObject } from 'react'

function seekVideo(video: HTMLVideoElement, time: number) {
  if (video.readyState < 2) return
  try {
    if (time < 0.05) {
      video.currentTime = 0
      return
    }
    if (time >= video.duration - 0.05) {
      video.currentTime = Math.max(0, video.duration - 0.05)
      return
    }
    video.currentTime = time
  } catch {
    // Frame not decoded yet
  }
}

function scopeProgress(scope: HTMLElement, scroll: number) {
  const start = scope.offsetTop
  const end = scope.offsetTop + scope.offsetHeight - window.innerHeight
  const range = end - start
  if (range <= 0) return 0
  return Math.min(1, Math.max(0, (scroll - start) / range))
}

export function useScrollScrubVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const durationRef = useRef(0)
  const progressRef = useRef(0)
  const readyRef = useRef(false)

  useLenis((lenis) => {
    const scope = scopeRef.current
    if (!enabled || !scope) return
    progressRef.current = scopeProgress(scope, lenis.scroll)
  }, [enabled, scopeRef])

  useEffect(() => {
    if (!enabled) return

    const video = videoRef.current
    if (!video) return

    const prime = () => {
      durationRef.current = video.duration
      video.pause()
      readyRef.current = true
      seekVideo(video, progressRef.current * durationRef.current)
    }

    const onCanPlay = () => prime()

    video.addEventListener('loadedmetadata', prime)
    video.addEventListener('canplay', onCanPlay)
    if (video.readyState >= 2) prime()

    let running = true
    let frame = 0

    const tick = () => {
      if (!running) return
      const duration = durationRef.current
      const v = videoRef.current
      if (v && readyRef.current && duration > 0) {
        seekVideo(v, progressRef.current * duration)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      readyRef.current = false
      video.removeEventListener('loadedmetadata', prime)
      video.removeEventListener('canplay', onCanPlay)
    }
  }, [videoRef, enabled])
}
