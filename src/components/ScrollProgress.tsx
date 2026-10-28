import { motion, useScroll } from 'motion/react'

// After Magic UI's ScrollProgress (MIT): a hairline that fills as the manuscript is read.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-transparent via-primary/70 to-primary"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
