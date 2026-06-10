import { SectionLabel } from './SectionLabel'

export function About() {
  return (
    <section id="historia" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="reveal mx-auto max-w-3xl">
        <SectionLabel folio="f. 02" label="Historia y etimología" />
        <div className="manuscript-rule mb-10" />

        <div className="codex-card px-6 py-12 sm:px-10 sm:py-16 md:px-14">
          <div className="space-y-6 text-sm leading-relaxed text-primary/80 sm:text-base">
            <p className="drop-cap">
              El verbo <em className="font-serif italic text-primary">ganar</em> procede del
              gótico <em className="font-serif italic">*ganan</em> «codiciar». Hermano del
              escandinavo antiguo <em className="font-serif italic">gana</em> «abrir la boca»,
              «desear con avidez». Del noruego <em className="font-serif italic">gana</em>{' '}
              «mirar con ansia». De la misma raíz: el sustantivo{' '}
              <em className="font-serif italic">gana</em>.
            </p>

            <p>
              En la línea romance: del leonés antiguo y del latín medieval{' '}
              <em className="font-serif italic">ganāre</em>. El asturiano conserva la
              misma forma. El significado germánico se amplió con{' '}
              <em className="font-serif italic">*waidanjan</em> «cosechar», «ganar». Cognados:
              <em className="font-serif italic"> guadagnare</em>,{' '}
              <em className="font-serif italic">gagner</em>,{' '}
              <em className="font-serif italic">gazanhar</em>,{' '}
              <em className="font-serif italic">guanyar</em>,{' '}
              <em className="font-serif italic">ganhar</em>.
            </p>

            <p>
              En el español medieval ya aparece <em className="font-serif italic">ganar</em>{' '}
              con sentido de obtener y vencer. En América: ganar vida, ganar terreno,
              ganar respeto.
            </p>

          </div>
        </div>
      </div>
    </section>
  )
}
