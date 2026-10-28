import { useRef, type ReactNode, type RefObject } from 'react'
import { Bot, FileText, User } from '@keyline-icons/react'
import { AnimatedBeam } from './bits/AnimatedBeam'

function Nodo({
  nodoRef,
  label,
  grande = false,
  children,
}: {
  nodoRef: RefObject<HTMLDivElement | null>
  label: string
  grande?: boolean
  children: ReactNode
}) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div
        ref={nodoRef}
        className={`flex items-center justify-center rounded-full border bg-[#0b0b0b] text-primary ${
          grande
            ? 'size-16 border-primary/30 shadow-[0_0_40px_-6px_rgba(222,219,200,0.45)] sm:size-20'
            : 'size-12 border-primary/15 sm:size-14'
        }`}
      >
        {children}
      </div>
      <span className="manuscript-label">{label}</span>
    </div>
  )
}

/** Humans and agents read the same canon: a bridge drawn as two arches each way. */
export function PuenteBeams() {
  const contenedor = useRef<HTMLDivElement>(null)
  const humanos = useRef<HTMLDivElement>(null)
  const canon = useRef<HTMLDivElement>(null)
  const agentes = useRef<HTMLDivElement>(null)

  const haz = {
    containerRef: contenedor,
    pathColor: '#DEDBC8',
    pathOpacity: 0.1,
    pathWidth: 1.5,
    gradientStartColor: '#DEDBC8',
    gradientStopColor: '#8f8c7a',
    duration: 4.5,
  }

  return (
    <div
      ref={contenedor}
      className="codex-card relative mb-4 flex items-center justify-between overflow-hidden px-6 py-10 sm:px-14 sm:py-12"
      aria-label="ganar.md une a humanos y agentes"
      role="img"
    >
      <Nodo nodoRef={humanos} label="Humanos">
        <User className="size-5 sm:size-6" aria-hidden />
      </Nodo>
      <Nodo nodoRef={canon} label="ganar.md" grande>
        <FileText className="size-6 sm:size-8" aria-hidden />
      </Nodo>
      <Nodo nodoRef={agentes} label="Agentes">
        <Bot className="size-5 sm:size-6" aria-hidden />
      </Nodo>

      <AnimatedBeam {...haz} fromRef={humanos} toRef={canon} curvature={36} />
      <AnimatedBeam {...haz} fromRef={canon} toRef={humanos} curvature={-36} reverse delay={2.2} />
      <AnimatedBeam {...haz} fromRef={agentes} toRef={canon} curvature={36} reverse delay={1.1} />
      <AnimatedBeam {...haz} fromRef={canon} toRef={agentes} curvature={-36} delay={3.3} />
    </div>
  )
}
