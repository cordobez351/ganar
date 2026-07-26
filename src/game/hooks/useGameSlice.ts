import { useSyncExternalStore } from 'react'
import { getState, getVersion, subscribe } from '../engine/store'
import type { GameState } from '../types'

/** Subscribe to store version; re-read mutable state on each notify (~10 Hz). */
export function useGameSlice<T>(selector: (s: GameState) => T): T {
  useSyncExternalStore(subscribe, getVersion, () => 0)
  return selector(getState())
}
