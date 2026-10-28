import { useEffect, useRef, useState } from 'react'
import { Dice5 } from '@keyline-icons/react'
import { motion, MotionConfig } from 'motion/react'
import { ESTADOS } from '../constants/estados'
import { diceThrow1Sound } from '../sound/sounds/dice-throw-1'
import { glass002Sound } from '../sound/sounds/glass-002'
import { hoverTickSound } from '../sound/sounds/hover-tick'
import { impactSoftMedium001Sound } from '../sound/sounds/impact-soft-medium-001'
import { tick001Sound } from '../sound/sounds/tick-001'
import { useUiSound } from '../sound/useUiSound'
import DecryptedText from './bits/DecryptedText'
import { SectionLabel } from './SectionLabel'

/** Space under the words where the collapsed states land, in px. */
const SUELO = 72

/** Fixed per-word tilt and lag, so each word falls the same way every time. */
const CAIDA = ESTADOS.map((_, i) => ({
  giro: (((i * 37) % 23) - 11) * 3.2,
  deriva: (((i * 53) % 17) - 8) * 1.5,
  demora: ((i * 29) % 11) * 0.025,
}))

type Caida = { y: number; x: number; rotate: number }

export function Estados() {
  const [elegido, setElegido] = useState<string | null>(null)
  const [caidas, setCaidas] = useState<Caida[] | null>(null)
  const [giro, setGiro] = useState<number | null>(null)
  const listaRef = useRef<HTMLUListElement>(null)
  const timers = useRef<number[]>([])
  const actual = ESTADOS.find((e) => e.palabra === elegido)

  const playCollapse = useUiSound(glass002Sound, 0.35)
  const playRestore = useUiSound(hoverTickSound, 0.5)
  const playLand = useUiSound(impactSoftMedium001Sound, 0.45)
  const playTick = useUiSound(tick001Sound, 0.35)
  const playDice = useUiSound(diceThrow1Sound, 0.5)

  useEffect(() => {
    const pendientes = timers.current
    return () => pendientes.forEach((t) => window.clearTimeout(t))
  }, [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  /** Measures how far each word must drop to reach the floor under the list. */
  const medir = (palabra: string): Caida[] => {
    const lista = listaRef.current
    if (!lista) return ESTADOS.map(() => ({ y: 0, x: 0, rotate: 0 }))
    const pad = parseFloat(getComputedStyle(lista).paddingBottom) || 0
    const fondo = lista.clientHeight - pad + SUELO
    return Array.from(lista.children).map((li, i) => {
      if (ESTADOS[i].palabra === palabra) return { y: 0, x: 0, rotate: 0 }
      const el = li as HTMLElement
      return {
        y: fondo - el.offsetTop - el.offsetHeight,
        x: CAIDA[i].deriva,
        rotate: CAIDA[i].giro,
      }
    })
  }

  const elegir = (palabra: string | null, silencio = false) => {
    if (palabra === null) {
      if (!silencio) playRestore()
      setCaidas(null)
      setElegido(null)
      return
    }
    if (!silencio) playCollapse({ playbackRate: 0.9 + Math.random() * 0.25 })
    later(() => playLand({ playbackRate: 0.85 + Math.random() * 0.3 }), 420)
    setCaidas(medir(palabra))
    setElegido(palabra)
  }

  // Re-measure the floor when the layout changes width.
  useEffect(() => {
    if (!elegido) return
    const onResize = () => setCaidas(medir(elegido))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  const azar = () => {
    if (giro !== null) return
    playDice()
    if (elegido) elegir(null, true)
    const final = Math.floor(Math.random() * ESTADOS.length)
    let t = elegido ? 380 : 120
    let paso = 55
    let previo = -1
    for (let n = 0; n < 15; n++) {
      let i = Math.floor(Math.random() * ESTADOS.length)
      if (i === previo) i = (i + 1) % ESTADOS.length
      if (n === 14) i = final
      previo = i
      const idx = i
      later(() => {
        setGiro(idx)
        playTick({ playbackRate: 0.9 + n * 0.04 })
      }, t)
      t += paso
      paso *= 1.17
    }
    later(() => {
      setGiro(null)
      elegir(ESTADOS[final].palabra)
    }, t + 120)
  }

  return (
    <section id="estados" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="reveal mx-auto max-w-3xl">
        <SectionLabel folio="f. 04" label="Estados" />
        <div className="manuscript-rule mb-10" />

        <p className="mb-8 text-sm leading-relaxed text-primary/70 sm:text-base">
          Trece estados, una palabra. Máxima entropía hasta el uso: cada
          elección traza un camino y colapsa el resto.
        </p>

        <div className="codex-card overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <p
              className="min-h-[1.2em] font-serif text-5xl italic leading-none text-primary sm:text-6xl md:text-7xl"
              aria-hidden
            >
              <DecryptedText
                key={elegido ?? 'ganar'}
                text={elegido ?? 'ganar'}
                animateOn="view"
                sequential
                revealDirection="center"
                speed={35}
                parentClassName="bits-font"
                characters="abcdefghijklmnñopqrstuvwxyz"
              />
            </p>
            <button
              type="button"
              onClick={azar}
              disabled={giro !== null}
              className="flex shrink-0 items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-[0.65rem] text-primary/60 transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40 sm:text-xs"
            >
              <Dice5 className="size-3.5" aria-hidden />
              que elija el azar
            </button>
          </div>

          <MotionConfig reducedMotion="user">
            <ul
              ref={listaRef}
              className="relative flex flex-wrap gap-x-6 gap-y-3 transition-[padding] duration-500"
              style={{ paddingBottom: caidas ? SUELO : 0 }}
            >
              {ESTADOS.map(({ palabra }, i) => {
                const activo = elegido === palabra
                const reposo = elegido === null && giro === null
                const girando = giro === i
                const caida = caidas?.[i]
                return (
                  <motion.li
                    key={palabra}
                    animate={{ y: caida?.y ?? 0, x: caida?.x ?? 0, rotate: caida?.rotate ?? 0 }}
                    transition={
                      caida && caida.y > 0
                        ? { type: 'spring', stiffness: 260, damping: 13, mass: 1.1, delay: CAIDA[i].demora }
                        : { type: 'spring', stiffness: 180, damping: 20, delay: CAIDA[i].demora * 0.6 }
                    }
                  >
                    <button
                      type="button"
                      aria-pressed={activo}
                      onClick={() => elegir(activo ? null : palabra)}
                      className={`inline-block font-serif text-base italic transition-[color,transform,text-shadow] duration-150 sm:text-lg ${
                        girando
                          ? 'scale-125 text-white [text-shadow:0_0_14px_rgba(225,224,204,0.8)]'
                          : activo
                            ? 'text-primary'
                            : reposo
                              ? 'text-primary/80 hover:text-primary'
                              : 'text-primary/25 hover:text-primary/60'
                      }`}
                    >
                      {palabra}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </MotionConfig>

          <div className="manuscript-rule my-5" />

          <p
            className="min-h-[1.5rem] text-xs text-gray-500 sm:text-sm"
            aria-live="polite"
          >
            {actual ? (
              <>
                <span className="font-serif italic text-primary/80">
                  {actual.palabra}
                </span>
                {' — '}
                {actual.nota}
              </>
            ) : (
              'orden sin jerarquía. elegir uno colapsa el resto; volver a tocarlo restituye la entropía.'
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
