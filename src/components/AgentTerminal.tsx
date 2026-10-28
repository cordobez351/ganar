import { useCallback, useEffect, useRef, useState } from 'react'
import { RotateCcw } from '@keyline-icons/react'
import { useInView } from 'motion/react'
import { AgentFace, type AgentState } from 'agentfaces/react'

// Terminal look after Magic UI's Terminal (MIT); face from agentfaces (MIT).

type Linea = { tipo: 'cmd' | 'out' | 'ok'; texto: string }

const ESTADO: Partial<Record<AgentState, string>> = {
  idle: 'en espera',
  thinking: 'pensando',
  working: 'leyendo',
  typing: 'citando',
  done: 'listo',
  alert: 'sin conexión',
}

const PASOS = [
  {
    cmd: 'curl -s ganar.com.ar/skill.md | grep "^1\\."',
    url: '/skill.md',
    filtrar: (t: string) => t.split('\n').filter((l) => /^1\./.test(l)).slice(0, 1),
  },
  {
    cmd: 'curl -s ganar.com.ar/ganar.md | head -7',
    url: '/ganar.md',
    filtrar: (t: string) => t.split('\n').slice(0, 7),
  },
]

const esperar = (ms: number) => new Promise((r) => window.setTimeout(r, ms))

/** A replay of what an agent does first: read the skill, then the canon. The files are real. */
export function AgentTerminal() {
  const raiz = useRef<HTMLDivElement>(null)
  const visto = useInView(raiz, { once: true, amount: 0.4 })
  const [lineas, setLineas] = useState<Linea[]>([])
  const [escribiendo, setEscribiendo] = useState('')
  const [cara, setCara] = useState<AgentState>('idle')
  const [corriendo, setCorriendo] = useState(false)
  const turno = useRef(0)

  const correr = useCallback(async () => {
    const yo = ++turno.current
    const vivo = () => turno.current === yo
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setCorriendo(true)
    setLineas([])
    setEscribiendo('')

    for (const paso of PASOS) {
      setCara('thinking')
      if (quieto) {
        setEscribiendo(paso.cmd)
      } else {
        for (let i = 1; i <= paso.cmd.length; i++) {
          if (!vivo()) return
          setEscribiendo(paso.cmd.slice(0, i))
          await esperar(28 + Math.random() * 40)
        }
      }
      await esperar(quieto ? 0 : 260)
      if (!vivo()) return
      setEscribiendo('')
      setLineas((l) => [...l, { tipo: 'cmd', texto: paso.cmd }])
      setCara('working')

      let salida: string[]
      try {
        const r = await fetch(paso.url)
        if (!r.ok) throw new Error(String(r.status))
        salida = paso.filtrar(await r.text())
      } catch {
        if (!vivo()) return
        setCara('alert')
        setLineas((l) => [...l, { tipo: 'out', texto: `no se pudo leer ${paso.url}` }])
        setCorriendo(false)
        return
      }

      setCara('typing')
      for (const texto of salida) {
        if (!vivo()) return
        await esperar(quieto ? 0 : 90)
        setLineas((l) => [...l, { tipo: 'out', texto }])
      }
      await esperar(quieto ? 0 : 500)
    }

    if (!vivo()) return
    setLineas((l) => [...l, { tipo: 'ok', texto: '✓ leído: skill.md · ganar.md' }])
    setCara('done')
    setCorriendo(false)
  }, [])

  useEffect(() => {
    if (!visto) return
    const id = window.setTimeout(correr, 0)
    return () => window.clearTimeout(id)
  }, [visto, correr])

  useEffect(
    () => () => {
      turno.current++
    },
    [],
  )

  return (
    <div ref={raiz} className="codex-card mt-4 overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-primary/10 px-5 py-3 sm:px-7">
        <div className="flex items-center gap-3">
          <AgentFace state={cara} shape="circle" color="#DEDBC8" size={34} decorative />
          <div>
            <p className="manuscript-label">Así lee un agente</p>
            <p className="text-[0.65rem] text-gray-500 sm:text-xs" aria-live="polite">
              {ESTADO[cara] ?? cara}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[0.6rem] uppercase tracking-[0.14em] text-gray-600">simulación</span>
          <button
            type="button"
            onClick={correr}
            disabled={corriendo}
            aria-label="Leer de nuevo"
            className="text-primary/50 transition-colors hover:text-primary disabled:opacity-30"
          >
            <RotateCcw className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>
      <div className="canon-pre min-h-[16rem] overflow-x-auto px-5 py-4 text-[0.7rem] leading-relaxed sm:px-7 sm:text-xs">
        <div className="bits-font">
          {lineas.map((l, i) => (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words ${
                l.tipo === 'cmd' ? 'text-primary' : l.tipo === 'ok' ? 'mt-2 text-primary/90' : 'text-primary/55'
              }`}
            >
              {l.tipo === 'cmd' && <span className="text-gray-600">$ </span>}
              {l.texto || ' '}
            </p>
          ))}
          {(corriendo || lineas.length === 0) && (
            <p className="text-primary">
              <span className="text-gray-600">$ </span>
              {escribiendo}
              <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-primary/70" />
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
