import { SectionLabel } from './SectionLabel'

const ACEPCIONES = [
  {
    n: '1',
    text: 'Adquirir caudal o aumentarlo con cualquier género de comercio, industria o trabajo.',
    ejemplo: 'Ganarse la vida. Ganar el sustento.',
  },
  {
    n: '2',
    text: 'Obtener lo que se disputa en un juego, batalla, oposición o pleito.',
    ejemplo: 'Ganar la partida. Ganar un juicio.',
  },
  {
    n: '3',
    text: 'Conquistar, tomar posesión de algo ajeno o recuperar lo propio.',
    ejemplo: 'Ganar terreno. Ganar la calle.',
  },
  {
    n: '4',
    text: 'Adelantar, aventajar, exceder en algo a alguien.',
    ejemplo: 'Ganar distancia. Ganar tiempo.',
  },
]

const LOCUCIONES = [
  { frase: 'ganar vida', nota: 'Sustentarse con el producto del trabajo.' },
  { frase: 'ganar terreno', nota: 'Avanzar, hacerse con espacio o influencia.' },
  { frase: 'ganar honra', nota: 'Recuperar o conquistar el respeto ajeno.' },
]

export function Acepciones() {
  return (
    <section id="acepciones" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel folio="f. 01" label="Acepciones" />
        <div className="manuscript-rule mb-10" />

        <ol className="space-y-8">
          {ACEPCIONES.map((item) => (
            <li key={item.n} className="flex gap-4">
              <span
                className="shrink-0 font-serif text-2xl italic text-primary/40 sm:text-3xl"
                aria-hidden
              >
                {item.n}
              </span>
              <div>
                <p className="text-sm leading-relaxed text-primary/90 sm:text-base">
                  {item.text}
                </p>
                <p className="mt-2 font-serif text-xs italic text-gray-500 sm:text-sm">
                  {item.ejemplo}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="manuscript-rule my-12" />

        <p className="manuscript-label mb-6">Locuciones</p>
        <ul className="space-y-4">
          {LOCUCIONES.map((loc) => (
            <li key={loc.frase} className="codex-card px-5 py-4">
              <p className="font-serif text-base italic text-primary sm:text-lg">
                {loc.frase}
              </p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{loc.nota}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
