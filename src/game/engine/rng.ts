/** Mulberry32 — deterministic, seedable. */
export function nextRng(state: number): { value: number; state: number } {
  let t = (state + 0x6d2b79f5) >>> 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  const value = ((t ^ (t >>> 14)) >>> 0) / 4294967296
  return { value, state: t >>> 0 }
}

export function rngInt(state: number, min: number, max: number) {
  const { value, state: next } = nextRng(state)
  const n = min + Math.floor(value * (max - min + 1))
  return { n: Math.min(max, Math.max(min, n)), state: next }
}

export function rngPick<T>(state: number, arr: readonly T[]) {
  const { n, state: next } = rngInt(state, 0, arr.length - 1)
  return { item: arr[n]!, state: next }
}

export function rngFloat(state: number, min: number, max: number) {
  const { value, state: next } = nextRng(state)
  return { n: min + value * (max - min), state: next }
}

/** Approximate binomial via sequential Bernoulli (capped). */
export function binomialSample(
  state: number,
  trials: number,
  p: number,
  cap: number,
) {
  let s = state
  let hits = 0
  const n = Math.min(trials, 10_000)
  for (let i = 0; i < n && hits < cap; i++) {
    const r = nextRng(s)
    s = r.state
    if (r.value < p) hits++
  }
  return { hits, state: s }
}
