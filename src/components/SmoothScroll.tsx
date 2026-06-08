import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.15,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
