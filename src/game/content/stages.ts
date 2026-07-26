import type { StageDef } from '../types'
import { MONSTERS } from './monsters'

const BG: [string, string][] = [
  ['#0b1410', '#1a2a22'],
  ['#120e18', '#241830'],
  ['#181208', '#2a1e10'],
  ['#0e1418', '#1a2830'],
  ['#140a0a', '#281414'],
]

function monstersForAct(act: number) {
  return MONSTERS.filter((m) => m.act <= act)
}

function buildStages(): StageDef[] {
  const out: StageDef[] = []
  let id = 1
  for (let act = 1; act <= 3; act++) {
    const pool = monstersForAct(act)
    for (let s = 0; s < 30; s++) {
      const a = pool[(s * 3) % pool.length]!
      const b = pool[(s * 5 + 1) % pool.length]!
      const c = pool[(s * 7 + 2) % pool.length]!
      const waves = [
        { monsterId: a.id, count: 2 + (s % 3) },
        { monsterId: b.id, count: 2 + ((s + 1) % 3) },
        { monsterId: c.id, count: 3 + (s % 2) },
      ]
      const isBoss = s === 29
      out.push({
        id: id++,
        act,
        nameKey: `Acto ${act} · Paraje ${s + 1}`,
        waves,
        bossId: isBoss ? `boss_act${act}` : undefined,
        bg: BG[(act + s) % BG.length]!,
      })
    }
  }
  return out
}

export const STAGES = buildStages()
export const STAGE_BY_INDEX = STAGES
