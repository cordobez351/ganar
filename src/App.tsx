import { About } from './components/About'
import { Acepciones } from './components/Acepciones'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Lenguas } from './components/Lenguas'
import { Patrones } from './components/Patrones'
import { Puente } from './components/Puente'
import { ScrollAmbient } from './components/ScrollAmbient'

function App() {
  return (
    <div className="relative bg-black">
      <Hero />
      <div className="relative">
        <ScrollAmbient />
        <div className="relative z-10">
          <Acepciones />
          <About />
          <Lenguas />
          <Patrones />
          <Puente />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
