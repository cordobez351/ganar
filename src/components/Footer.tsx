import { navigate } from '../router'
import FuzzyText from './bits/FuzzyText'
import Threads from './bits/Threads'

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6">
      <Threads
        className="pointer-events-none !absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_35%,#000)]"
        color="#DEDBC8"
        amplitude={1}
        distance={0.2}
        enableMouseInteraction
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-10 flex justify-center text-[#E1E0CC]" aria-hidden>
          <FuzzyText
            fontSize="clamp(4rem, 18vw, 11rem)"
            fontWeight={700}
            fontFamily="Almarai, sans-serif"
            letterSpacing={-6}
            baseIntensity={0.08}
            hoverIntensity={0.45}
            glitchMode
            glitchInterval={4200}
            glitchDuration={180}
          >
            ganar
          </FuzzyText>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-500">
          <button
            type="button"
            onClick={() => navigate('/juego')}
            className="transition-colors hover:text-primary"
          >
            /juego
          </button>
          <a href="/ganar.md" className="transition-colors hover:text-primary">
            ganar.md
          </a>
          <a href="/skill.md" className="transition-colors hover:text-primary">
            skill.md
          </a>
          <a href="/spec.md" className="transition-colors hover:text-primary">
            spec.md
          </a>
          <a href="/llms.txt" className="transition-colors hover:text-primary">
            llms.txt
          </a>
          <a href="/humans.txt" className="transition-colors hover:text-primary">
            humans.txt
          </a>
          <a href="/sitemap.xml" className="transition-colors hover:text-primary">
            sitemap
          </a>
        </nav>
      </div>
    </footer>
  )
}
