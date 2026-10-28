import { lazy, Suspense } from 'react'
import { DiamondOrbitSmoothLoader } from './components/bits/DiamondOrbitSmoothLoader'
import { usePath } from './router'

const Site = lazy(() => import('./components/Site').then((m) => ({ default: m.Site })))
const Game = lazy(() => import('./game/Game').then((m) => ({ default: m.Game })))

function Cargando() {
  return (
    <div className="flex h-screen items-center justify-center bg-black" role="status">
      <DiamondOrbitSmoothLoader color="#DEDBC8" dotSize={5} gap={4} speed={1.2} bloom />
      <span className="sr-only">cargando…</span>
    </div>
  )
}

function App() {
  const path = usePath()
  const juego = path === '/juego' || path.startsWith('/juego/')
  return <Suspense fallback={<Cargando />}>{juego ? <Game /> : <Site />}</Suspense>
}

export default App
