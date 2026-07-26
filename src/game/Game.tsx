import { useEffect } from 'react'
import { startLoop, stopLoop } from './engine/loop'
import { computeOffline } from './engine/offline'
import { mutate } from './engine/store'
import { bakeAtlas } from './render/atlas'
import { bindAutosave, loadGame, saveGame } from './save/persist'
import { GameShell } from './ui/GameShell'

export function Game() {
  useEffect(() => {
    bakeAtlas()
    loadGame()
    const stateSavedAt = () => {
      // offline on load if savedAt is old
      mutate((s) => {
        const elapsed = Date.now() - s.savedAt
        if (elapsed > 5_000 && !s.pendingOffline) {
          s.pendingOffline = computeOffline(s, elapsed)
          s.lastTickAt = Date.now()
        }
      })
    }
    stateSavedAt()
    startLoop()
    const unbind = bindAutosave()
    document.title = 'Ganar: Crónica Ociosa'
    return () => {
      saveGame()
      stopLoop()
      unbind()
      document.title = 'ganar'
    }
  }, [])

  return <GameShell />
}
