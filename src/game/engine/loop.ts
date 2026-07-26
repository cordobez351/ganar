import { computeOffline } from './offline'
import { bump, getState, mutate } from './store'
import { tick } from './tick'

export const TICK_MS = 100
export const MAX_CATCHUP_TICKS = 300
export const CATCHUP_BUDGET_MS = 48

let raf = 0
let heartbeat = 0
let running = false
let acc = 0
let lastFrame = 0

function drainCatchup(now: number) {
  const state = getState()
  if (state.simPhase === 'frozen') return

  const elapsed = now - state.lastTickAt
  if (elapsed < TICK_MS) return

  let owed = Math.floor(elapsed / TICK_MS)

  // Long absence → closed-form offline
  if (elapsed > MAX_CATCHUP_TICKS * TICK_MS) {
    const offlineMs = elapsed - MAX_CATCHUP_TICKS * TICK_MS
    mutate((s) => {
      if (!s.pendingOffline) {
        s.pendingOffline = computeOffline(s, offlineMs)
      }
      s.lastTickAt = now - MAX_CATCHUP_TICKS * TICK_MS
    })
    owed = MAX_CATCHUP_TICKS
  }

  if (owed > MAX_CATCHUP_TICKS) {
    mutate((s) => {
      s.simPhase = 'frozen'
    })
    bump(true)
    return
  }

  const start = performance.now()
  mutate((s) => {
    s.simPhase = owed > 5 ? 'catchingUp' : 'live'
  })

  let done = 0
  while (done < owed) {
    if (performance.now() - start > CATCHUP_BUDGET_MS) {
      // leave residual debt for next frames
      break
    }
    tick(getState())
    done++
  }

  mutate((s) => {
    s.lastTickAt += done * TICK_MS
    if (s.simPhase === 'catchingUp' && done >= owed) s.simPhase = 'live'
  })
  bump(true)
}

function frame(ts: number) {
  if (!running) return
  if (!lastFrame) lastFrame = ts
  const dt = ts - lastFrame
  lastFrame = ts
  acc += dt

  drainCatchup(Date.now())

  // live ticks from accumulator when visible
  if (getState().simPhase === 'live' && !document.hidden) {
    while (acc >= TICK_MS) {
      tick(getState())
      acc -= TICK_MS
      getState().lastTickAt = Date.now()
    }
    bump()
  }

  raf = requestAnimationFrame(frame)
}

function onVisibility() {
  if (document.hidden) {
    // checkpoint handled by save layer
    return
  }
  drainCatchup(Date.now())
  lastFrame = 0
  acc = 0
}

export function startLoop() {
  if (running) return
  running = true
  lastFrame = 0
  acc = 0
  document.addEventListener('visibilitychange', onVisibility)
  heartbeat = window.setInterval(() => {
    drainCatchup(Date.now())
  }, 1000)
  raf = requestAnimationFrame(frame)
}

export function stopLoop() {
  running = false
  cancelAnimationFrame(raf)
  clearInterval(heartbeat)
  document.removeEventListener('visibilitychange', onVisibility)
}

export function resumeFromFrozen() {
  mutate((s) => {
    s.simPhase = 'live'
    s.lastTickAt = Date.now()
  })
  bump(true)
}
