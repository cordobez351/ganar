import { useRef, type RefObject } from 'react'
import { SCROLL_AMBIENT_VIDEO } from '../constants/media'
import { useScrollAmbient } from '../hooks/useScrollAmbient'

type ScrollAmbientProps = {
  scopeRef: RefObject<HTMLElement | null>
}

export function ScrollAmbient({ scopeRef }: ScrollAmbientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { mounted } = useScrollAmbient(scopeRef, videoRef, containerRef)

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ opacity: 0, visibility: 'hidden' }}
      aria-hidden
    >
      {mounted && (
        <video
          ref={videoRef}
          className="scroll-ambient-video absolute inset-0 h-full w-full object-cover"
          src={SCROLL_AMBIENT_VIDEO}
          muted
          playsInline
          preload="auto"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_65%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.28)_55%,transparent_82%)]" />
    </div>
  )
}
