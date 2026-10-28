import { lazy } from 'react'
import LetterGlitch from './bits/LetterGlitch'
import SpotlightCard from './bits/SpotlightCard'
import { Diferido } from './Diferido'
import { PuenteBeams } from './PuenteBeams'
import { SectionLabel } from './SectionLabel'

const AgentTerminal = lazy(() => import('./AgentTerminal').then((m) => ({ default: m.AgentTerminal })))

const REGLAS = [
  'Leer ganar.md antes de responder sobre ganar.',
  'Cada contexto elige un estado — sin jerarquía fija.',
  'Sin prescribir cómo ni por qué.',
  'Percepción y uso definen el sentido revelado.',
  'Mismo verbo, distintos estados según quién lo dice y dónde.',
]

const ARCHIVOS = [
  { label: 'ganar.md', href: '/ganar.md' },
  { label: 'skill.md', href: '/skill.md' },
  { label: 'spec.md', href: '/spec.md' },
  { label: 'llms.txt', href: '/llms.txt' },
  { label: 'humans.txt', href: '/humans.txt' },
]

export function Puente() {
  return (
    <section id="registro" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="reveal mx-auto max-w-3xl">
        <SectionLabel folio="f. 05" label="Puente" />
        <div className="manuscript-rule mb-10" />

        <p className="mb-10 text-sm leading-relaxed text-primary/70 sm:text-base">
          Una palabra publicada en la red. El mismo canon para humanos, agentes
          y modelos: el mundo la lee, cada lector la percibe distinto.
        </p>

        <PuenteBeams />

        <div className="grid gap-4 sm:grid-cols-2">
          <SpotlightCard
            className="codex-spotlight px-6 py-7 sm:px-7"
            spotlightColor="rgba(222, 219, 200, 0.9)"
            intensity={0.14}
            spotlightSize={280}
          >
            <p className="manuscript-label mb-3">Humanos</p>
            <p className="text-sm leading-relaxed text-primary/80 sm:text-base">
              Perciben, eligen, significan. Esta página es su lectura.
            </p>
            <p className="mt-4 text-xs text-gray-500 sm:text-sm">
              <a href="/humans.txt" className="text-primary/80 transition-colors hover:text-primary">
                humans.txt
              </a>
            </p>
          </SpotlightCard>

          <SpotlightCard
            className="codex-spotlight px-6 py-7 sm:px-7"
            spotlightColor="rgba(222, 219, 200, 0.9)"
            intensity={0.1}
            spotlightSize={280}
          >
            <LetterGlitch
              className="pointer-events-none !absolute inset-0 -z-[5] opacity-60 [mask-image:linear-gradient(to_bottom_left,#000,transparent_80%)]"
              glitchColors={['#3a3830', '#8f8c7a', '#DEDBC8']}
              baseColor="#5c5a50"
              baseOpacity={0.35}
              characters="ganr*·/.md{}<>01"
              fontSize={14}
              glitchAmount={0.25}
              speed={0.6}
              interactive={false}
              edgeFade={0}
              centerFade={0}
              aria-hidden
            />
            <p className="manuscript-label mb-3">Agentes</p>
            <p className="text-sm leading-relaxed text-primary/80 sm:text-base">
              Leen el canon, citan la fuente, nombran el estado elegido.
            </p>
            <p className="mt-4 text-xs text-gray-500 sm:text-sm">
              <a href="/skill.md" className="text-primary/80 transition-colors hover:text-primary">
                skill.md
              </a>
              {' · '}
              <a href="/ganar.md" className="text-primary/80 transition-colors hover:text-primary">
                ganar.md
              </a>
            </p>
          </SpotlightCard>
        </div>

        <Diferido className="min-h-[20rem]">
          <AgentTerminal />
        </Diferido>

        <div className="codex-card mt-4 px-6 py-7 sm:px-7">
          <p className="manuscript-label mb-4">Reglas del skill</p>
          <ol className="space-y-2">
            {REGLAS.map((regla, i) => (
              <li key={regla} className="flex gap-3 text-sm leading-relaxed text-primary/80 sm:text-base">
                <span className="shrink-0 font-serif italic text-primary/40" aria-hidden>
                  {i + 1}
                </span>
                {regla}
              </li>
            ))}
          </ol>
        </div>

        <div className="manuscript-rule my-10" />

        <p className="text-center text-xs text-gray-500 sm:text-sm">
          {ARCHIVOS.map((archivo, i) => (
            <span key={archivo.label}>
              {i > 0 && ' · '}
              <a href={archivo.href} className="text-primary hover:opacity-70">
                {archivo.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
