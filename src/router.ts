import { useSyncExternalStore } from 'react'

type Listener = () => void

const listeners = new Set<Listener>()

function emit() {
  for (const l of listeners) l()
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getPath() {
  return window.location.pathname
}

const PUSH_EVENT = 'ganar:pushstate'

const originalPushState = history.pushState.bind(history)
history.pushState = function pushStatePatched(
  data: unknown,
  unused: string,
  url?: string | URL | null,
) {
  const result = originalPushState(data, unused, url)
  window.dispatchEvent(new Event(PUSH_EVENT))
  emit()
  return result
}

window.addEventListener('popstate', emit)
window.addEventListener(PUSH_EVENT, emit)

export function navigate(path: string) {
  if (getPath() === path) return
  history.pushState(null, '', path)
}

export function usePath() {
  return useSyncExternalStore(subscribe, getPath, () => '/')
}
