import type { GameState } from '../types'
import { createInitialState } from './state'

type Listener = () => void

let state: GameState = createInitialState()
let version = 0
const listeners = new Set<Listener>()
let notifyAccum = 0
const NOTIFY_MS = 100

export function getState() {
  return state
}

export function getVersion() {
  return version
}

export function setState(next: GameState) {
  state = next
  bump(true)
}

export function subscribe(fn: Listener) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function bump(force = false) {
  const now = performance.now()
  if (!force && now - notifyAccum < NOTIFY_MS) return
  notifyAccum = now
  version += 1
  for (const l of listeners) l()
}

export function mutate(fn: (s: GameState) => void) {
  fn(state)
  bump(true)
}
