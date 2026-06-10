import { useState } from 'react'
import { SectionLabel } from './SectionLabel'

const ESTADOS = [
  { palabra: 'lograr', nota: 'Obtener el resultado deseado.' },
  { palabra: 'merecer', nota: 'Obtener por mérito.' },
  { palabra: 'conseguir', nota: 'Alcanzar lo buscado con esfuerzo.' },
  { palabra: 'triunfar', nota: 'Llegar al éxito en lo emprendido.' },
  { palabra: 'vencer', nota: 'Superar resistencia o adversario.' },
  { palabra: 'cobrar', nota: 'Recibir lo que corresponde.' },
  { palabra: 'conquistar', nota: 'Tomar con decisión.' },
  { palabra: 'ceder', nota: 'Ceder terreno.' },
  { palabra: 'capitular', nota: 'Rendirse formalmente.' },
  { palabra: 'renunciar', nota: 'Abandonar antes de disputar.' },
  { palabra: 'fracasar', nota: 'Quedar alejado del objetivo.' },
  { palabra: 'sucumbir', nota: 'Caer ante fuerza mayor.' },
  { palabra: 'perder', nota: 'Dejar de tener lo disputado.' },
]

export function Estados() {
  const [elegido, setElegido] = useState<string | null>(null)
  const actual = ESTADOS.find((e) => e.palabra === elegido)

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
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ESTADOS.map(({ palabra }) => {
              const activo = elegido === palabra
              const reposo = elegido === null
              return (
                <li key={palabra}>
                  <button
                    type="button"
                    aria-pressed={activo}
                    onClick={() => setElegido(activo ? null : palabra)}
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
