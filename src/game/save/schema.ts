import type {
  Difficulty,
  Equipped,
  HeroClass,
  ItemInstance,
  Settings,
} from '../types'

/** Packed affix: [affixId, tier, roll] */
export type PackedAffix = [string, number, number]

/** Packed item: [baseId, rarity, ilvl, affixes, uniqueId?] */
export type PackedItem = [
  string,
  string,
  number,
  PackedAffix[],
  string | null,
]

export type PackedHero = {
  id: string
  classId: HeroClass
  name: string
  level: number
  exp: number
  hp: number
  equipped: Equipped
}

export type SaveV1 = {
  v: 1
  savedAt: number
  seed: number
  rngState: number
  gold: number
  heroes: PackedHero[]
  heroSlots: number
  bag: PackedItem[]
  stash: PackedItem[]
  cube: (string | null)[]
  cubeMode: 'sintesis' | 'anadir' | 'reroll'
  runesUnlocked: string[]
  stageIndex: number
  difficulty: Difficulty
  waveIndex: number
  kills: number
  totalKills: number
  totalGoldEarned: number
  achievements: string[]
  achievementRewardsClaimed: string[]
  settings: Settings
  uidCounter: number
}

export function packItem(item: ItemInstance): PackedItem {
  return [
    item.baseId,
    item.rarity,
    item.ilvl,
    item.affixes.map((a) => [a.affixId, a.tier, a.roll]),
    item.uniqueId ?? null,
  ]
}

export function unpackItem(p: PackedItem, uid: string): ItemInstance {
  return {
    uid,
    baseId: p[0],
    rarity: p[1] as ItemInstance['rarity'],
    ilvl: p[2],
    affixes: p[3].map(([affixId, tier, roll]) => ({ affixId, tier, roll })),
    uniqueId: p[4] ?? undefined,
    tags: ['bag:loot'],
  }
}
