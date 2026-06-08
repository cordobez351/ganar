import { HeroVideo } from './HeroVideo'
import { Logo } from './Logo'

const NAV_ITEMS = [
  { label: 'Humanos', href: '/humans.txt', external: true },
  { label: 'Agentes', href: '/ganar.md', external: true },
]

export function Hero() {
  return (
    <section className="relative z-20 h-screen pb-4 md:pb-6">
      <div className="relative h-full overflow-hidden rounded-b-2xl md:rounded-b-[2rem]">
        <HeroVideo />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45" />

        <nav className="absolute inset-x-0 top-0 z-20 flex justify-center">
          <div className="relative">
            <a
              href="/"
              aria-label="ganar"
              className="absolute right-full top-1/2 mr-2 flex -translate-y-1/2 items-center sm:mr-3"
            >
              <Logo
                size={24}
                className="block opacity-90 transition-opacity hover:opacity-100"
              />
            </a>
            <div className="flex items-center gap-4 rounded-b-2xl bg-black/90 px-4 py-2 sm:gap-6 sm:px-5 md:gap-8 md:rounded-b-3xl md:px-8 md:py-2.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="whitespace-nowrap text-[9px] text-primary/80 transition-colors hover:text-primary sm:text-[10px] md:text-xs"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="absolute inset-0 z-10 flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="text-center lg:col-span-7 lg:text-left">
              <h1 className="relative inline-block text-[22vw] font-medium lowercase leading-none tracking-[-0.07em] text-[#E1E0CC] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[14vw]">
                ganar
                <span className="absolute text-[0.31em]" style={{ top: '0.65em', right: '-0.3em' }}>
                  *
                </span>
              </h1>
              <p className="mt-3 font-serif text-lg italic text-primary/60 sm:text-xl">
                /ɡaˈnaɾ/
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 text-center lg:col-span-5 lg:items-start lg:text-left">
              <p
                className="text-xs lowercase text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.65 }}
              >
                posibilidades. eleccion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
