import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <ReactLenis
      root
      options={{
        lerp: reduced ? 1 : 0.08,
        smoothWheel: !reduced,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.15,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
