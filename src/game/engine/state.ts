import type { GameState, HeroState } from '../types'
import { CLASS_BY_ID } from '../content/classes'
import { heroStats } from './combat'

export function createHero(
  id: string,
  classId: HeroState['classId'],
  name: string,
): HeroState {
  const cls = CLASS_BY_ID[classId]
  return {
    id,
    classId,
    name,
    level: 1,
    exp: 0,
    hp: cls.baseStats.maxHp,
    maxHp: cls.baseStats.maxHp,
    equipped: {},
    alive: true,
  }
}

export function createInitialState(seed = 0xc0ffee): GameState {
  const hero = createHero('h1', 'guerrero', 'Capitán')
  const now = Date.now()
  const state: GameState = {
    v: 1,
    seed,
    rngState: seed >>> 0,
    gold: 50,
    heroes: [hero],
    heroSlots: 2,
    bag: [],
    stash: [],
    cube: Array.from({ length: 9 }, () => null),
    cubeMode: 'sintesis',
    runesUnlocked: [],
    stageIndex: 0,
    difficulty: 'vencer',
    waveIndex: 0,
    kills: 0,
    totalKills: 0,
    totalGoldEarned: 0,
    achievements: [],
    achievementRewardsClaimed: [],
    settings: {
      speed: 1,
      sound: false,
      pixelScale: 0,
      reducedMotion: false,
      stashInCube: true,
    },
    simPhase: 'live',
    lastTickAt: now,
    savedAt: now,
    combatants: [],
    floaters: [],
    groundLoot: [],
    stageKills: 0,
    pendingOffline: null,
    uidCounter: 1,
    stats: {},
  }
  syncHeroHp(state)
  return state
}

export function syncHeroHp(state: GameState) {
  for (const h of state.heroes) {
    const stats = heroStats(state, h)
    const maxHp = Math.round(stats.maxHp ?? h.maxHp)
    h.maxHp = maxHp
    if (h.hp > maxHp) h.hp = maxHp
    if (!h.alive && h.hp <= 0) {
      // keep dead until stage clears
    }
  }
}

export function nextUid(state: GameState): string {
  state.uidCounter += 1
  return `i${state.uidCounter}`
}
