import { useEffect, useRef, type RefObject } from 'react'

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function useScrollScrubVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  progress: number,
  active: boolean,
) {
  const readyRef = useRef(false)
  const progressRef = useRef(progress)
  progressRef.current = progress

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
      seekVideo(video, progressRef.current * video.duration)
    }

    video.addEventListener('loadedmetadata', prime)
    if (video.readyState >= 1) prime()

    return () => {
      readyRef.current = false
      video.removeEventListener('loadedmetadata', prime)
    }
  }, [videoRef, active])

  useEffect(() => {
    if (!active || !readyRef.current) return
    const video = videoRef.current
    if (!video) return
    seekVideo(video, progress * video.duration)
  }, [videoRef, progress, active])
}
