import { useSyncExternalStore } from 'react'

const KEY = 'ganar:sonido'
const listeners = new Set<() => void>()

function read(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

let enabled = typeof window === 'undefined' ? true : read()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setSoundEnabled(next: boolean) {
  enabled = next
  try {
    localStorage.setItem(KEY, next ? 'on' : 'off')
  } catch {
    // Storage blocked: keep the choice for this visit only.
  }
  for (const l of listeners) l()
}

export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, () => enabled, () => true)
}
