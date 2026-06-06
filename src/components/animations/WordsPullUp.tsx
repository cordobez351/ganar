import type { CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface WordsPullUpProps {
  text: string
  className?: string
  style?: CSSProperties
  showAsterisk?: boolean
}

export function WordsPullUp({
  text,
  className = '',
  style,
  showAsterisk = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={className} style={style}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1
        const shouldShowAsterisk =
          showAsterisk && isLastWord && word.toLowerCase().includes('a')

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.18em]">
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="relative inline-block">
                {word}
                {shouldShowAsterisk && (
                  <span
                    className="absolute text-[0.31em]"
                    style={{ top: '0.65em', right: '-0.3em' }}
                  >
                    *
                  </span>
                )}
              </span>
              {index < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        )
      })}
    </div>
  )
}
