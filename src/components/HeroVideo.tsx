import { useEffect, useRef } from 'react'
import { HERO_VIDEO } from '../constants/media'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const resume = () => {
      if (video.paused) video.play().catch(() => {})
    }

    video.addEventListener('ended', resume)
    document.addEventListener('visibilitychange', resume)

    video.play().catch(() => {
      window.addEventListener('pointerdown', resume, { once: true })
    })

    return () => {
      video.removeEventListener('ended', resume)
      document.removeEventListener('visibilitychange', resume)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      src={HERO_VIDEO}
    />
  )
}
