import { useEffect, useRef } from 'react'
import { HERO_VIDEO } from '../constants/media'
import heroPoster from '../assets/hero.png'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }

    const play = () => {
      video.play().catch(() => {})
    }

    const onEnded = () => {
      video.currentTime = 0
      play()
    }

    video.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', play)

    play()

    return () => {
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', play)
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
      poster={heroPoster}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      src={HERO_VIDEO}
    />
  )
}
