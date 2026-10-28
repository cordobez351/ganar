import { useState } from 'react'
import { useLenis } from 'lenis/react'
import { Volume, VolumeOff } from '@keyline-icons/react'
import { setSoundEnabled, useSoundEnabled } from '../sound/preference'
import { playSound } from '../sound/sound-engine'
import { bookCloseSound } from '../sound/sounds/book-close'
import { bookOpenSound } from '../sound/sounds/book-open'
import { clickSoftSound } from '../sound/sounds/click-soft'
import { impactBellHeavy000Sound } from '../sound/sounds/impact-bell-heavy-000'
import { useUiSound } from '../sound/useUiSound'
import DecryptedText from './bits/DecryptedText'
import LightRays from './bits/LightRays'
import Shuffle from './bits/Shuffle'
import { CanonView } from './CanonView'
import { HeroVideo } from './HeroVideo'
import { Logo } from './Logo'

const NAV_ITEMS = [
  { label: 'Humanos', href: '/humans.txt', external: true },
  { label: 'Agentes', href: '/skill.md', external: true },
]

export function Hero() {
  const [canonOpen, setCanonOpen] = useState(false)
  const soundEnabled = useSoundEnabled()
  const playOpen = useUiSound(bookOpenSound)
  const playClose = useUiSound(bookCloseSound)
  const playBell = useUiSound(impactBellHeavy000Sound, 0.3)
  const lenis = useLenis()

  return (
    <section className="relative z-20 h-screen pb-4 md:pb-6">
      <div className="relative h-full overflow-hidden rounded-b-2xl md:rounded-b-[2rem]">
        <HeroVideo />

        <LightRays
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
          raysOrigin="top-center"
          raysColor="#DEDBC8"
          raysSpeed={0.6}
          lightSpread={0.9}
          rayLength={1.6}
          followMouse
          mouseInfluence={0.12}
          noiseAmount={0.08}
          distortion={0.04}
          opacity={0.55}
        />

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
              <button
                type="button"
                onClick={() => {
                  playOpen()
                  setCanonOpen(true)
                }}
                className="whitespace-nowrap text-[9px] text-primary/80 transition-colors hover:text-primary sm:text-[10px] md:text-xs"
              >
                Canon
              </button>
              <button
                type="button"
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
                onClick={() => {
                  if (!soundEnabled) playSound(clickSoftSound.dataUri, { volume: 0.6 })
                  setSoundEnabled(!soundEnabled)
                }}
                className="text-primary/60 transition-colors hover:text-primary"
              >
                {soundEnabled ? (
                  <Volume className="size-3 md:size-3.5" aria-hidden />
                ) : (
                  <VolumeOff className="size-3 md:size-3.5" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </nav>

        <div className="absolute inset-0 z-10 flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="text-center lg:col-span-7 lg:text-left">
              <h1 className="relative inline-block text-[22vw] font-medium lowercase leading-none tracking-[-0.07em] text-[#E1E0CC] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[14vw]">
                <Shuffle
                  text="ganar"
                  tag="span"
                  shuffleDirection="up"
                  duration={0.45}
                  shuffleTimes={2}
                  animationMode="evenodd"
                  stagger={0.05}
                  scrambleCharset="abcdefghijklmnñopqrstuvwxyz"
                  triggerOnHover
                  style={{ fontFamily: 'inherit' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    playBell({ playbackRate: 0.8 + Math.random() * 0.15 })
                    lenis?.scrollTo('#historia', { duration: 2.2 })
                  }}
                  title="* forma reconstruida: lo que ningún texto atestigua"
                  aria-label="Ir a la etimología. El asterisco marca una forma no atestiguada."
                  className="asterisco absolute leading-none text-[0.31em] transition-[color,transform] duration-500 hover:rotate-90 hover:text-white"
                  style={{ top: '0.65em', right: '-0.3em' }}
                >
                  *
                </button>
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
                <DecryptedText
                  text="posibilidades. elección."
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={45}
                  characters="abcdefghijklmnñopqrstuvwxyzáéíóú·*"
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <CanonView
        open={canonOpen}
        onClose={() => {
          playClose()
          setCanonOpen(false)
        }}
      />
    </section>
  )
}
