import { useEffect, useRef } from 'react'
import { HERO_VIDEO } from '../constants/media'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = () => {
      video.play().catch(() => {
        // Autoplay blocked until gesture — retry once on first interaction
        const onInteract = () => {
          video.play().catch(() => {})
          window.removeEventListener('pointerdown', onInteract)
        }
        window.addEventListener('pointerdown', onInteract, { once: true })
      })
    }

    video.addEventListener('canplay', play)
    if (video.readyState >= 3) play()

    return () => {
      video.removeEventListener('canplay', play)
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
