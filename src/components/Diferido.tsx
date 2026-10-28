import { Suspense, useRef, type ReactNode } from 'react'
import { useInView } from 'motion/react'

/** Renders its children only once the reader scrolls near, so heavy parts load late. */
export function Diferido({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const cerca = useInView(ref, { once: true, margin: '600px 0px' })
  return (
    <div ref={ref} className={className}>
      {cerca && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  )
}
