import type { SaveV1 } from './schema'

type Migrator = (s: unknown) => unknown

export const MIGRATIONS: Record<number, Migrator> = {
  // future: 1: (s) => ({ ...(s as SaveV1), v: 2, ... })
}

export function migrateSave(raw: unknown): SaveV1 | { error: string; raw: unknown } {
  if (!raw || typeof raw !== 'object') {
    return { error: 'Partida inválida', raw }
  }
  const obj = raw as { v?: number }
  if (typeof obj.v !== 'number') {
    return { error: 'Versión desconocida', raw }
  }
  if (obj.v > 1) {
    return { error: 'Partida de una versión más nueva', raw }
  }
  let cur: unknown = raw
  let v = obj.v
  while (v < 1) {
    const m = MIGRATIONS[v]
    if (!m) return { error: `Sin migración desde v${v}`, raw }
    cur = m(cur)
    v += 1
  }
  return cur as SaveV1
}
