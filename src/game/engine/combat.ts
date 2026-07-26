import type {
  Difficulty,
  GameState,
  HeroState,
  ItemInstance,
  StatMap,
} from '../types'
import { CLASS_BY_ID } from '../content/classes'
import { AFFIX_BY_ID } from '../content/items/affixes'
import { ITEM_BASE_BY_ID } from '../content/items/bases'
import { affixValue } from '../content/items/generate'
import { BOSS_BY_ID, MONSTER_BY_ID } from '../content/monsters'
import { RUNE_BY_ID } from '../content/runes'

export const ARMOR_K = 50
export const ACT_SCALE = 1.09

export const DIFFICULTY_MULT: Record<Difficulty, number> = {
  vencer: 1,
  conquistar: 1.45,
  merecer: 2.1,
  triunfar: 3.2,
}

export function findItem(
  state: GameState,
  uid: string | undefined,
): ItemInstance | undefined {
  if (!uid) return undefined
  return (
    state.bag.find((i) => i.uid === uid) ??
    state.stash.find((i) => i.uid === uid)
  )
}

export function aggregateItemStats(item: ItemInstance): StatMap {
  const stats: StatMap = {}
  const base = ITEM_BASE_BY_ID[item.baseId]
  if (base?.baseDamage) stats.damage = (stats.damage ?? 0) + base.baseDamage
  if (base?.baseArmor) stats.armor = (stats.armor ?? 0) + base.baseArmor
  for (const a of item.affixes) {
    const aff = AFFIX_BY_ID[a.affixId]
    if (!aff) continue
    stats[aff.stat] = (stats[aff.stat] ?? 0) + affixValue(a)
  }
  return stats
}

export function runeStats(state: GameState): StatMap {
  const stats: StatMap = {}
  for (const id of state.runesUnlocked) {
    const node = RUNE_BY_ID[id]
    if (!node) continue
    for (const [k, v] of Object.entries(node.grants)) {
      const key = k as keyof StatMap
      stats[key] = (stats[key] ?? 0) + (v ?? 0)
    }
  }
  return stats
}

export function heroStats(state: GameState, hero: HeroState): StatMap {
  const cls = CLASS_BY_ID[hero.classId]
  const stats: StatMap = {
    damage: cls.baseStats.damage + (hero.level - 1) * 1.4,
    maxHp: cls.baseStats.maxHp + (hero.level - 1) * 8,
    armor: cls.baseStats.armor + (hero.level - 1) * 0.8,
    attackSpeed: cls.baseStats.attackSpeed,
    critChance: cls.baseStats.critChance,
    critDamage: 50,
  }
  for (const uid of Object.values(hero.equipped)) {
    const item = findItem(state, uid)
    if (!item) continue
    const add = aggregateItemStats(item)
    for (const [k, v] of Object.entries(add)) {
      const key = k as keyof StatMap
      stats[key] = (stats[key] ?? 0) + (v ?? 0)
    }
  }
  const runes = runeStats(state)
  for (const [k, v] of Object.entries(runes)) {
    const key = k as keyof StatMap
    stats[key] = (stats[key] ?? 0) + (v ?? 0)
  }
  return stats
}

export function weaponAps(state: GameState, hero: HeroState): number {
  const weapon = findItem(state, hero.equipped.arma)
  const base = weapon
    ? (ITEM_BASE_BY_ID[weapon.baseId]?.baseAps ?? 1)
    : CLASS_BY_ID[hero.classId].baseStats.attackSpeed
  const stats = heroStats(state, hero)
  return base * (1 + (stats.attackSpeed ?? 0) / 100)
}

export function heroHitDamage(
  state: GameState,
  hero: HeroState,
  critRoll: number,
): { damage: number; crit: boolean } {
  const stats = heroStats(state, hero)
  const weapon = findItem(state, hero.equipped.arma)
  const baseDmg =
    (weapon ? (ITEM_BASE_BY_ID[weapon.baseId]?.baseDamage ?? 0) : 0) +
    (stats.damage ?? 0)
  let raw =
    baseDmg * (1 + (stats.increasedDamage ?? 0) / 100) +
    (stats.flatFire ?? 0) +
    (stats.flatIce ?? 0) +
    (stats.flatLightning ?? 0)
  const critChance = (stats.critChance ?? 0) / 100
  const crit = critRoll < critChance
  if (crit) raw *= 1 + (stats.critDamage ?? 50) / 100
  return { damage: Math.max(1, raw), crit }
}

export function mitigate(
  raw: number,
  armor: number,
  monsterLevel: number,
): number {
  const reduction = armor / (armor + ARMOR_K * Math.max(1, monsterLevel))
  return raw * (1 - Math.min(0.75, reduction * 0.5))
}

export function monsterScaled(
  monsterId: string,
  stageIndex: number,
  difficulty: Difficulty,
) {
  const def = MONSTER_BY_ID[monsterId] ?? BOSS_BY_ID[monsterId]
  if (!def) {
    return { hp: 50, damage: 5, armor: 2, exp: 5, gold: 2, level: 1 }
  }
  const scale = ACT_SCALE ** stageIndex * DIFFICULTY_MULT[difficulty]
  return {
    hp: Math.round(def.hp * scale),
    damage: Math.round(def.damage * scale * 0.85),
    armor: Math.round(def.armor * Math.sqrt(scale)),
    exp: Math.round(def.exp * scale),
    gold: Math.round(def.gold * scale),
    level: 1 + Math.floor(stageIndex / 2),
  }
}

export function partyDps(state: GameState): number {
  let dps = 0
  for (const h of state.heroes) {
    if (!h.alive) continue
    const stats = heroStats(state, h)
    const cc = (stats.critChance ?? 0) / 100
    const nonCrit = heroHitDamage(state, h, 1).damage
    const crit = heroHitDamage(state, h, 0).damage
    dps += (nonCrit * (1 - cc) + crit * cc) * weaponAps(state, h)
  }
  return Math.max(0.1, dps)
}

export function expToLevel(level: number): number {
  return Math.round(40 * level ** 1.45)
}
