import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { SCROLL_AMBIENT_VIDEO } from '../constants/media'
import { useScrollScrubVideo } from '../hooks/useScrollScrubVideo'

type ScrollAmbientProps = {
  scopeRef: RefObject<HTMLElement | null>
}

function SideDrift({ side }: { side: 'left' | 'right' }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    side === 'left' ? [0, -140] : [0, 100],
  )
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.55, 0.3])

  const x = side === 'left' ? 'left-6 md:left-10' : 'right-6 md:right-10'

  return (
    <motion.div
      className={`pointer-events-none absolute top-0 ${x} hidden h-full w-8 md:block lg:w-12`}
      style={{ y, opacity }}
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
    </motion.div>
  )
}

export function ScrollAmbient({ scopeRef }: ScrollAmbientProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [enabled, setEnabled] = useState(false)

  const { scrollY } = useScroll()
  const fadeOpacity = useTransform(scrollY, (y) => {
    const hero = window.innerHeight
    if (y < hero * 0.55) return 0
    if (y < hero * 0.95) return (y - hero * 0.55) / (hero * 0.4)
    return 1
  })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrow = window.matchMedia('(max-width: 767px)').matches
    setEnabled(!reduced && !narrow)

    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => {
      setEnabled(
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !mq.matches,
      )
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useScrollScrubVideo(videoRef, scopeRef, enabled)

  if (!enabled) return null

  return (
    <motion.div
      className="scroll-ambient pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ opacity: fadeOpacity }}
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

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_70%_at_50%_50%,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.45)_50%,transparent_78%)]" />

      <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <SideDrift side="left" />
      <SideDrift side="right" />
    </motion.div>
  )
}
