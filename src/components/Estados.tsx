import { useState } from 'react'
import { ESTADOS } from '../constants/estados'
import { glass002Sound } from '../sound/sounds/glass-002'
import { hoverTickSound } from '../sound/sounds/hover-tick'
import { useUiSound } from '../sound/useUiSound'
import DecryptedText from './bits/DecryptedText'
import { SectionLabel } from './SectionLabel'


export function Estados() {
  const [elegido, setElegido] = useState<string | null>(null)
  const actual = ESTADOS.find((e) => e.palabra === elegido)
  const playCollapse = useUiSound(glass002Sound, 0.35)
  const playRestore = useUiSound(hoverTickSound, 0.5)

  return (
    <section id="estados" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="reveal mx-auto max-w-3xl">
        <SectionLabel folio="f. 04" label="Estados" />
        <div className="manuscript-rule mb-10" />

        <p className="mb-8 text-sm leading-relaxed text-primary/70 sm:text-base">
          Trece estados, una palabra. Máxima entropía hasta el uso: cada
          elección traza un camino y colapsa el resto.
        </p>

        <div className="codex-card p-6 sm:p-8">
          <p
            className="mb-6 min-h-[1.2em] font-serif text-5xl italic leading-none text-primary sm:text-6xl md:text-7xl"
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

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ESTADOS.map(({ palabra }) => {
              const activo = elegido === palabra
              const reposo = elegido === null
              return (
                <li key={palabra}>
                  <button
                    type="button"
                    aria-pressed={activo}
                    onClick={() => {
                      if (activo) playRestore()
                      else playCollapse({ playbackRate: 0.9 + Math.random() * 0.25 })
                      setElegido(activo ? null : palabra)
                    }}
                    className={`font-serif text-base italic transition-all duration-300 sm:text-lg ${
                      activo
                        ? 'text-primary'
                        : reposo
                          ? 'text-primary/80 hover:text-primary'
                          : 'text-primary/25 hover:text-primary/60'
                    }`}
                  >
                    {palabra}
                  </button>
                </li>
              )
            })}
          </ul>

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
