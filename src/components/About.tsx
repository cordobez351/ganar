import { SectionLabel } from './SectionLabel'

const ESTRATOS = [
  {
    era: 'Indoeuropeo',
    forma: '*ǵʰeh₂-',
    sentido: '«estar abierto», «bostezar»',
    nota: 'La boca abierta. De la misma familia antigua: el griego cháos «abertura primordial» y el inglés yawn «bostezar».',
  },
  {
    era: 'Protogermánico',
    forma: '*ganōną',
    sentido: '«abrir la boca», «mirar con avidez»',
    nota: 'De aquí el nórdico antiguo gana «abrir la boca», «desear con avidez», y el noruego gana «mirar con ansia».',
  },
  {
    era: 'Gótico',
    forma: '*ganan',
    sentido: '«codiciar»',
    nota: 'Forma reconstruida, no atestiguada. Llegó a Hispania con los godos.',
  },
  {
    era: 'Cruce ibérico',
    forma: '*waidanjan',
    sentido: '«cosechar», «obtener alimento»',
    nota: 'Germánico occidental (cf. alemán Weide «pasto»). En Iberia ambos verbos se cruzaron. De esta línea: guadaña, y los romances guadagnare, gagner, gazanhar, guanyar, ganhar.',
  },
  {
    era: 'Latín medieval',
    forma: 'ganāre',
    sentido: '«ganar»',
    nota: 'Latín medieval de Hispania, en la línea leonesa. El asturiano conserva la misma forma.',
  },
  {
    era: 'Español medieval',
    forma: 'ganar',
    sentido: '«obtener», «vencer»',
    nota: 'Ya en el Cantar de mio Cid. Derivados: ganancia; ganado — «lo ganado»: la riqueza era el rebaño. De la misma raíz, el sustantivo gana: deseo, avidez.',
  },
  {
    era: 'América',
    forma: 'ganarse',
    sentido: '«situarse», «ponerse en un lugar»',
    nota: 'Chilenismo recogido por el Diccionario de la lengua española. El verbo sigue abierto; cada uso elige.',
  },
]

export function About() {
  return (
    <section id="historia" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="reveal mx-auto max-w-3xl">
        <SectionLabel folio="f. 02" label="Historia y etimología" />
        <div className="manuscript-rule mb-10" />

        <div className="codex-card px-6 py-10 sm:px-10 sm:py-12 md:px-14">
          <p className="drop-cap text-sm leading-relaxed text-primary/80 sm:text-base">
            El origen de <em className="font-serif italic text-primary">ganar</em> es
            incierto. La hipótesis más aceptada lo hace venir del gótico{' '}
            <em className="font-serif italic">*ganan</em> «codiciar», cruzado en Iberia
            con el germánico <em className="font-serif italic">*waidanjan</em>{' '}
            «cosechar». Codiciar y cosechar: desear lo abierto y recogerlo. Debajo,
            los estratos.
          </p>
        </div>

        <ol className="mt-12">
          {ESTRATOS.map((estrato) => (
            <li
              key={estrato.era}
              className="relative border-l border-primary/15 pb-10 pl-6 last:pb-0 sm:pl-8"
            >
              <span
                className="absolute -left-[3px] top-1.5 h-[5px] w-[5px] rounded-full bg-primary/40"
                aria-hidden
              />
              <p className="manuscript-label">{estrato.era}</p>
              <p className="mt-1.5 font-serif text-xl italic text-primary sm:text-2xl">
                {estrato.forma}{' '}
                <span className="text-base text-primary/60 sm:text-lg">
                  {estrato.sentido}
                </span>
              </p>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
                {estrato.nota}
              </p>
            </li>
          ))}
        </ol>

        <div className="manuscript-rule my-10" />

        <p className="text-center font-serif text-sm italic text-primary/60 sm:text-base">
          en el fondo de la palabra, una boca abierta ante lo posible.
        </p>
      </div>
    </section>
  )
}
