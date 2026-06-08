import { useMotionValueEvent, useScroll } from 'framer-motion'
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

export function useScrollScrubVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
) {
  const durationRef = useRef(0)
  const progressRef = useRef(0)
  const readyRef = useRef(false)

  const { scrollYProgress } = useScroll({
    target: scopeRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    progressRef.current = latest
  })

  useEffect(() => {
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
  }, [videoRef])
}
