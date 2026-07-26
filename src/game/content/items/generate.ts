import type { AffixRoll, ItemInstance, Rarity } from '../../types'
import { nextRng, rngFloat, rngInt, rngPick } from '../../engine/rng'
import { AFFIXES } from './affixes'
import { ITEM_BASES, ITEM_BASE_BY_ID } from './bases'
import { RARITY_DEFS, RARITIES_ORDER } from './rarityOrder'
import { ALL_UNIQUES } from './uniques'

export { itemDisplayName } from './tiers'
export { ITEM_BASE_BY_ID, ITEM_BASES }

function pickRarity(state: number, magicFind: number): {
  rarity: Rarity
  state: number
} {
  let s = state
  const boost = 1 + magicFind / 100
  let total = 0
  const weights: number[] = []
  for (const r of RARITIES_ORDER) {
    const w = RARITY_DEFS[r].weight * (r === 'comun' ? 1 : boost)
    weights.push(w)
    total += w
  }
  const roll = nextRng(s)
  s = roll.state
  let acc = 0
  const target = roll.value * total
  for (let i = 0; i < RARITIES_ORDER.length; i++) {
    acc += weights[i]!
    if (target <= acc) return { rarity: RARITIES_ORDER[i]!, state: s }
  }
  return { rarity: 'comun', state: s }
}

function rollAffixes(
  state: number,
  rarity: Rarity,
): { affixes: AffixRoll[]; state: number } {
  const def = RARITY_DEFS[rarity]
  let s = state
  const countRoll = rngInt(s, def.affixMin, def.affixMax)
  s = countRoll.state
  const affixes: AffixRoll[] = []
  const used = new Set<string>()
  for (let i = 0; i < countRoll.n; i++) {
    const pick = rngPick(
      s,
      AFFIXES.filter((a) => !used.has(a.id)),
    )
    s = pick.state
    if (!pick.item) break
    used.add(pick.item.id)
    // Higher rarity → better (lower) tier numbers
    const maxTier = Math.max(1, 10 - def.nameBand * 2)
    const minTier = Math.max(1, maxTier - 3)
    const tierRoll = rngInt(s, minTier, maxTier)
    s = tierRoll.state
    const valueRoll = rngFloat(s, 0, 1)
    s = valueRoll.state
    affixes.push({
      affixId: pick.item.id,
      tier: tierRoll.n,
      roll: valueRoll.n,
    })
  }
  return { affixes, state: s }
}

export function createItem(
  state: number,
  opts: {
    ilvl: number
    magicFind?: number
    forceRarity?: Rarity
    forceBaseId?: string
    uid: string
  },
): { item: ItemInstance; state: number } {
  let s = state
  const mf = opts.magicFind ?? 0

  // Small unique chance
  const uRoll = nextRng(s)
  s = uRoll.state
  if (!opts.forceBaseId && !opts.forceRarity && uRoll.value < 0.02 * (1 + mf / 200)) {
    const eligible = ALL_UNIQUES.filter((u) => {
      const base = ITEM_BASE_BY_ID[u.baseId]
      return base && opts.ilvl >= base.levelMin - 5
    })
    if (eligible.length) {
      const pick = rngPick(s, eligible)
      s = pick.state
      const u = pick.item
      return {
        item: {
          uid: opts.uid,
          baseId: u.baseId,
          rarity: u.rarity,
          ilvl: opts.ilvl,
          affixes: u.fixedAffixes.map((a) => ({ ...a })),
          uniqueId: u.id,
          tags: ['bag:loot'],
        },
        state: s,
      }
    }
  }

  const rarityRes = opts.forceRarity
    ? { rarity: opts.forceRarity, state: s }
    : pickRarity(s, mf)
  s = rarityRes.state

  let baseId = opts.forceBaseId
  if (!baseId) {
    const eligible = ITEM_BASES.filter(
      (b) => opts.ilvl >= b.levelMin - 3 && opts.ilvl <= b.levelMax + 10,
    )
    const pool = eligible.length ? eligible : ITEM_BASES
    const pick = rngPick(s, pool)
    s = pick.state
    baseId = pick.item.id
  }

  const aff = rollAffixes(s, rarityRes.rarity)
  s = aff.state

  return {
    item: {
      uid: opts.uid,
      baseId,
      rarity: rarityRes.rarity,
      ilvl: opts.ilvl,
      affixes: aff.affixes,
      tags: ['bag:loot'],
    },
    state: s,
  }
}

export function affixValue(roll: AffixRoll): number {
  const def = AFFIXES.find((a) => a.id === roll.affixId)
  if (!def) return 0
  const tier = def.tiers[roll.tier - 1] ?? def.tiers[9]!
  return tier.min + (tier.max - tier.min) * roll.roll
}

export function itemGoldValue(item: ItemInstance): number {
  const base = ITEM_BASE_BY_ID[item.baseId]
  const r = RARITY_DEFS[item.rarity]
  const affSum = item.affixes.reduce((a, x) => a + affixValue(x), 0)
  return Math.max(
    1,
    Math.round((10 + (base?.levelMin ?? 1) * 2 + affSum) * r.rollMult),
  )
}
