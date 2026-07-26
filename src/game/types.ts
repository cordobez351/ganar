export const RARITIES = [
  'comun',
  'poco_comun',
  'rara',
  'legendaria',
  'inmortal',
  'arcana',
  'mas_alla',
  'celestial',
  'divina',
  'cosmica',
] as const
export type Rarity = (typeof RARITIES)[number]

export const SLOTS = [
  'arma',
  'casco',
  'peto',
  'guantes',
  'botas',
  'escudo',
  'anillo',
  'amuleto',
  'reliquia',
] as const
export type EquipSlot = (typeof SLOTS)[number]

export const CLASSES = [
  'guerrero',
  'arquero',
  'mago',
  'picaro',
  'clerigo',
  'barbaro',
  'ballestero',
] as const
export type HeroClass = (typeof CLASSES)[number]

export const DIFFICULTIES = [
  'vencer',
  'conquistar',
  'merecer',
  'triunfar',
] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const SOCKET_FAMILIES = ['decoracion', 'grabado', 'inscripcion'] as const
export type SocketFamily = (typeof SOCKET_FAMILIES)[number]

export const SIM_PHASES = ['live', 'catchingUp', 'frozen'] as const
export type SimPhase = (typeof SIM_PHASES)[number]

export type StatId =
  | 'damage'
  | 'increasedDamage'
  | 'attackSpeed'
  | 'critChance'
  | 'critDamage'
  | 'armor'
  | 'maxHp'
  | 'hpRegen'
  | 'goldFind'
  | 'magicFind'
  | 'expBonus'
  | 'flatFire'
  | 'flatIce'
  | 'flatLightning'
  | 'heroSlots'

export type StatMap = Partial<Record<StatId, number>>

export type ItemBase = {
  id: string
  nameKey: string
  slot: EquipSlot
  classes: readonly HeroClass[] | 'all'
  levelMin: number
  levelMax: number
  baseDamage?: number
  baseAps?: number
  baseArmor?: number
  sprite: string
}

export type AffixDef = {
  id: string
  family: SocketFamily
  stat: StatId
  /** T1 = strongest, T10 = weakest */
  tiers: readonly { min: number; max: number }[]
  nameKey: string
}

export type AffixRoll = {
  affixId: string
  tier: number
  roll: number
}

export type ItemInstance = {
  uid: string
  baseId: string
  rarity: Rarity
  ilvl: number
  affixes: AffixRoll[]
  uniqueId?: string
  tags: string[]
}

export type UniqueDef = {
  id: string
  baseId: string
  nameKey: string
  rarity: Rarity
  fixedAffixes: AffixRoll[]
  flavorKey?: string
}

export type MonsterDef = {
  id: string
  nameKey: string
  archetype: string
  act: number
  hp: number
  damage: number
  armor: number
  exp: number
  gold: number
  sprite: string
  palette: number
  scale: number
  boss?: boolean
  behaviours: readonly string[]
}

export type WaveComp = {
  monsterId: string
  count: number
}

export type StageDef = {
  id: number
  act: number
  nameKey: string
  waves: WaveComp[]
  bossId?: string
  bg: [string, string]
}

export type RuneNode = {
  id: string
  group: 'exploracion' | 'combate' | 'botin' | 'oficio'
  x: number
  y: number
  cost: number
  prereqs: readonly string[]
  grants: StatMap
  nameKey: string
  descKey: string
}

export type AchievementDef = {
  id: string
  nameKey: string
  descKey: string
  rewardGold?: number
  rewardStat?: StatMap
  predicate: (s: GameState) => boolean
}

export type ClassDef = {
  id: HeroClass
  nameKey: string
  body: 'ligero' | 'medio' | 'pesado'
  baseStats: {
    damage: number
    maxHp: number
    armor: number
    attackSpeed: number
    critChance: number
  }
  weaponSlots: readonly EquipSlot[]
  skillKey: string
}

export type Equipped = Partial<Record<EquipSlot, string>>

export type HeroState = {
  id: string
  classId: HeroClass
  name: string
  level: number
  exp: number
  hp: number
  maxHp: number
  equipped: Equipped
  alive: boolean
}

export type Combatant = {
  id: string
  side: 'hero' | 'monster'
  heroId?: string
  monsterId?: string
  hp: number
  maxHp: number
  x: number
  y: number
  anim: 'idle' | 'walk' | 'attack' | 'hit' | 'death'
  animT: number
  attackCd: number
  dead: boolean
}

export type FloatingText = {
  id: string
  x: number
  y: number
  text: string
  color: string
  age: number
}

export type DroppedLoot = {
  item: ItemInstance
  x: number
  y: number
  age: number
}

export type OfflineReport = {
  elapsedMs: number
  kills: number
  gold: number
  exp: number
  items: ItemInstance[]
}

export type Settings = {
  speed: number
  sound: boolean
  pixelScale: number
  reducedMotion: boolean
  stashInCube: boolean
}

export type GameState = {
  v: 1
  seed: number
  rngState: number
  gold: number
  heroes: HeroState[]
  heroSlots: number
  bag: ItemInstance[]
  stash: ItemInstance[]
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
  simPhase: SimPhase
  lastTickAt: number
  savedAt: number
  combatants: Combatant[]
  floaters: FloatingText[]
  groundLoot: DroppedLoot[]
  stageKills: number
  pendingOffline: OfflineReport | null
  uidCounter: number
  stats: StatMap
}
