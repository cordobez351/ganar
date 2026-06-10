import { About } from './components/About'
import { Acepciones } from './components/Acepciones'
import { Estados } from './components/Estados'
import { FolioRail } from './components/FolioRail'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Lenguas } from './components/Lenguas'
import { Puente } from './components/Puente'
import { ScrollAmbient } from './components/ScrollAmbient'

function App() {
  return (
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
  )
}

export default App
