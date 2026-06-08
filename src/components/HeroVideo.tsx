import { HERO_VIDEO } from '../constants/media'

export function HeroVideo() {
  return (
    <video
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
