import { ReactLenis } from 'lenis/react'
import { About } from './About'
import { Acepciones } from './Acepciones'
import { Estados } from './Estados'
import { FolioRail } from './FolioRail'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Lenguas } from './Lenguas'
import { Puente } from './Puente'
import { ScrollAmbient } from './ScrollAmbient'

export function Site() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="relative bg-black">
        <Hero />
        <FolioRail />
        <div className="relative">
          <ScrollAmbient />
          <div className="relative z-10">
            <Acepciones />
            <About />
            <Lenguas />
            <Estados />
            <Puente />
            <Footer />
          </div>
        </div>
      </div>
    </ReactLenis>
  )
}
