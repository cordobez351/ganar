import { SectionLabel } from './SectionLabel'

const ESTADOS = [
  'lograr',
  'merecer',
  'conseguir',
  'triunfar',
  'vencer',
  'cobrar',
  'conquistar',
  'ceder',
  'capitular',
  'renunciar',
  'fracasar',
  'sucumbir',
  'perder',
]

export function Patrones() {
  return (
    <section id="estados" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel folio="f. 04" label="Estados" />
        <div className="manuscript-rule mb-10" />

        <div className="codex-card p-6 sm:p-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ESTADOS.map((word) => (
              <li key={word} className="font-serif text-base italic text-primary/80 sm:text-lg">
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
