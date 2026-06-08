import { useEffect, useState } from 'react'
import { SCROLL_AMBIENT_VIDEO } from '../constants/media'

const REVEAL_AFTER_PX = 120

export function ScrollAmbient() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > REVEAL_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <video
        className="scroll-ambient-video absolute inset-0 h-full w-full object-cover"
        src={SCROLL_AMBIENT_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_65%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.28)_55%,transparent_82%)]" />
    </div>
  )
}
