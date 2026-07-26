import { Site } from './components/Site'
import { Game } from './game/Game'
import { usePath } from './router'

function App() {
  const path = usePath()
  if (path === '/juego' || path.startsWith('/juego/')) {
    return <Game />
  }
  return <Site />
}

export default App
