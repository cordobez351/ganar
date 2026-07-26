import type { GameState, ItemInstance, OfflineReport } from '../types'
import { STAGE_BY_INDEX } from '../content/stages'
import { createItem } from '../content/items/generate'
import { binomialSample } from './rng'
import { monsterScaled, partyDps } from './combat'
import { nextUid } from './state'

const EFFICIENCY_CAP_HOURS = 8

export function computeOffline(
  state: GameState,
  elapsedMs: number,
): OfflineReport {
  const elapsedSec = Math.max(0, elapsedMs / 1000)
  const hours = elapsedSec / 3600
  const efficiency =
    hours <= EFFICIENCY_CAP_HOURS
      ? 1
      : EFFICIENCY_CAP_HOURS / hours + 0.15 * (1 - EFFICIENCY_CAP_HOURS / hours)

  const stage = STAGE_BY_INDEX[state.stageIndex] ?? STAGE_BY_INDEX[0]!
  const sampleId = stage.waves[0]?.monsterId ?? 'limo_0'
  const mon = monsterScaled(sampleId, state.stageIndex, state.difficulty)
  const dps = partyDps(state)
  const killRate = dps / Math.max(1, mon.hp) // kills per second
  const kills = Math.floor(elapsedSec * killRate * efficiency)

  const gold = Math.floor(kills * mon.gold * 0.85)
  const exp = Math.floor(kills * mon.exp * 0.85)

  let s = state.rngState
  const items: ItemInstance[] = []
  const dropChance = 0.12
  const { hits, state: s2 } = binomialSample(s, kills, dropChance, 12)
  s = s2
  for (let i = 0; i < hits; i++) {
    const made = createItem(s, {
      ilvl: 1 + state.stageIndex,
      magicFind: state.stats.magicFind ?? 0,
      uid: nextUid(state),
    })
    s = made.state
    items.push(made.item)
  }
  state.rngState = s

  return { elapsedMs, kills, gold, exp, items }
}

export function applyOfflineReport(state: GameState, report: OfflineReport) {
  state.gold += report.gold
  state.totalGoldEarned += report.gold
  state.totalKills += report.kills
  state.kills += report.kills
  for (const item of report.items) {
    item.tags = ['bag:loot']
    state.bag.push(item)
  }
  // distribute EXP roughly
  if (state.heroes.length) {
    const share = Math.floor(report.exp / state.heroes.length)
    for (const h of state.heroes) {
      h.exp += share
    }
  }
  state.pendingOffline = null
}
