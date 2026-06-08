import { useCallback, useRef, useState, type RefObject } from 'react'
import { SCROLL_AMBIENT_VIDEO } from '../constants/media'
import { useLenisElementProgress } from '../hooks/useLenisElementProgress'
import { useScrollScrubVideo } from '../hooks/useScrollScrubVideo'

type ScrollAmbientProps = {
  scopeRef: RefObject<HTMLElement | null>
}

function SideDrift({ side, progress }: { side: 'left' | 'right'; progress: number }) {
  const y = side === 'left' ? progress * -140 : progress * 100
  const opacity =
    progress <= 0.5 ? 0.35 + progress * 0.4 : 0.55 - (progress - 0.5) * 0.5
  const x = side === 'left' ? 'left-6 md:left-10' : 'right-6 md:right-10'

  return (
    <div
      className={`pointer-events-none absolute top-0 ${x} h-full w-6 sm:w-8 lg:w-12`}
      style={{ transform: `translateY(${y}px)`, opacity }}
      aria-hidden
    >
      <div
        className={`absolute top-[12%] h-24 w-px bg-primary/20 ${side === 'left' ? 'left-0' : 'right-0'}`}
      />
      <div
        className={`absolute top-[38%] h-40 w-px bg-primary/10 ${side === 'left' ? 'left-3' : 'right-3'}`}
      />
      <div
        className={`absolute top-[68%] h-16 w-px bg-primary/15 ${side === 'left' ? 'left-1' : 'right-1'}`}
      />
      <div
        className={`absolute top-[22%] h-1 w-1 rounded-full bg-primary/25 ${side === 'left' ? 'left-5' : 'right-5'}`}
      />
      <div
        className={`absolute top-[58%] h-1 w-1 rounded-full bg-primary/20 ${side === 'left' ? 'left-2' : 'right-2'}`}
      />
    </div>
  )
}

export function ScrollAmbient({ scopeRef }: ScrollAmbientProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [fade, setFade] = useState(0)

  const onProgress = useCallback((nextProgress: number, nextFade: number) => {
    setProgress(nextProgress)
    setFade(nextFade)
  }, [])

  useLenisElementProgress(scopeRef, onProgress)

  const active = fade > 0
  useScrollScrubVideo(videoRef, progress, active)

  if (!active) return null

  return (
    <div
      className="scroll-ambient pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ opacity: fade }}
      aria-hidden
    >
      <video
        ref={videoRef}
        className="scroll-ambient-video absolute inset-0 h-full w-full object-cover"
        src={SCROLL_AMBIENT_VIDEO}
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-y-0 left-0 w-[min(30vw,360px)] bg-gradient-to-r from-amber-950/12 via-transparent to-transparent mix-blend-overlay" />
      <div className="absolute inset-y-0 right-0 w-[min(30vw,360px)] bg-gradient-to-l from-slate-900/15 via-transparent to-transparent mix-blend-overlay" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_65%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.28)_55%,transparent_82%)]" />

      <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <SideDrift side="left" progress={progress} />
      <SideDrift side="right" progress={progress} />
    </div>
  )
}
