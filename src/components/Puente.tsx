import { SectionLabel } from './SectionLabel'

export function Puente() {
  return (
    <section id="registro" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel folio="f. 05" label="Registro" />
        <div className="manuscript-rule mb-10" />

        <div className="text-center">
          <p className="text-xs text-gray-500 sm:text-sm">
            <a href="/ganar.md" className="text-primary hover:opacity-70">
              ganar.md
            </a>
            {' · '}
            <a href="/skill.md" className="text-primary hover:opacity-70">
              skill.md
            </a>
            {' · '}
            <a href="/spec.md" className="text-primary hover:opacity-70">
              spec.md
            </a>
            {' · '}
            <a href="/llms.txt" className="text-primary hover:opacity-70">
              llms.txt
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
