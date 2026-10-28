import { ReactLenis } from 'lenis/react'
import { About } from './About'
import ClickSpark from './bits/ClickSpark'
import { Acepciones } from './Acepciones'
import { Estados } from './Estados'
import { EstadosLoop } from './EstadosLoop'
import { FolioRail } from './FolioRail'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Lenguas } from './Lenguas'
import { Puente } from './Puente'
import { ScrollAmbient } from './ScrollAmbient'
import { ScrollProgress } from './ScrollProgress'

export function Site() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <ClickSpark
        className="bg-black"
        sparkColor={['#DEDBC8', '#E1E0CC', '#8f8c7a']}
        sparkSize={9}
        sparkRadius={22}
        sparkCount={10}
        duration={520}
        shape="streak"
        glow={0.5}
      >
        <ScrollProgress />
        <Hero />
        <EstadosLoop />
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
      </ClickSpark>
    </ReactLenis>
  )
}
