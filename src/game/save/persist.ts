import type { GameState } from '../types'
import { createInitialState } from '../engine/state'
import { getState, setState } from '../engine/store'
import { migrateSave } from './migrate'
import { packItem, unpackItem, type SaveV1 } from './schema'

const KEY = 'ganar.juego.save.v1'

export function toSave(state: GameState): SaveV1 {
  return {
    v: 1,
    savedAt: Date.now(),
    seed: state.seed,
    rngState: state.rngState,
    gold: state.gold,
    heroes: state.heroes.map((h) => ({
      id: h.id,
      classId: h.classId,
      name: h.name,
      level: h.level,
      exp: h.exp,
      hp: h.hp,
      equipped: { ...h.equipped },
    })),
    heroSlots: state.heroSlots,
    bag: state.bag.map(packItem),
    stash: state.stash.map(packItem),
    cube: [...state.cube],
    cubeMode: state.cubeMode,
    runesUnlocked: [...state.runesUnlocked],
    stageIndex: state.stageIndex,
    difficulty: state.difficulty,
    waveIndex: state.waveIndex,
    kills: state.kills,
    totalKills: state.totalKills,
    totalGoldEarned: state.totalGoldEarned,
    achievements: [...state.achievements],
    achievementRewardsClaimed: [...state.achievementRewardsClaimed],
    settings: { ...state.settings },
    uidCounter: state.uidCounter,
  }
}

export function fromSave(save: SaveV1): GameState {
  const state = createInitialState(save.seed)
  state.rngState = save.rngState
  state.gold = save.gold
  state.heroSlots = save.heroSlots
  state.uidCounter = save.uidCounter
  let uid = 1
  state.bag = save.bag.map((p) => unpackItem(p, `i${uid++}`))
  state.stash = save.stash.map((p) => unpackItem(p, `i${uid++}`))
  state.uidCounter = Math.max(save.uidCounter, uid)
  state.cube = save.cube.length === 9 ? [...save.cube] : state.cube
  state.cubeMode = save.cubeMode
  state.runesUnlocked = [...save.runesUnlocked]
  state.stageIndex = save.stageIndex
  state.difficulty = save.difficulty
  state.waveIndex = save.waveIndex
  state.kills = save.kills
  state.totalKills = save.totalKills
  state.totalGoldEarned = save.totalGoldEarned
  state.achievements = [...save.achievements]
  state.achievementRewardsClaimed = [...save.achievementRewardsClaimed]
  state.settings = { ...state.settings, ...save.settings }
  state.heroes = save.heroes.map((h) => ({
    id: h.id,
    classId: h.classId,
    name: h.name,
    level: h.level,
    exp: h.exp,
    hp: h.hp,
    maxHp: h.hp,
    equipped: { ...h.equipped },
    alive: h.hp > 0,
  }))
  state.savedAt = save.savedAt
  state.lastTickAt = save.savedAt
  state.combatants = []
  return state
}

export function saveGame() {
  try {
    const save = toSave(getState())
    localStorage.setItem(KEY, JSON.stringify(save))
    getState().savedAt = save.savedAt
  } catch {
    // quota
  }
}

export function loadGame(): boolean {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return false
    const parsed: unknown = JSON.parse(raw)
    const migrated = migrateSave(parsed)
    if ('error' in migrated) {
      console.warn(migrated.error)
      return false
    }
    setState(fromSave(migrated))
    return true
  } catch {
    return false
  }
}

function checksum(str: string): string {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

export function exportSaveString(): string {
  const json = JSON.stringify(toSave(getState()))
  const payload = `${checksum(json)}.${btoa(unescape(encodeURIComponent(json)))}`
  return payload
}

export function importSaveString(str: string): { ok: true } | { ok: false; error: string } {
  try {
    const dot = str.indexOf('.')
    if (dot < 0) return { ok: false, error: 'Formato inválido' }
    const sum = str.slice(0, dot)
    const b64 = str.slice(dot + 1)
    const json = decodeURIComponent(escape(atob(b64)))
    if (checksum(json) !== sum) return { ok: false, error: 'Checksum inválido' }
    const migrated = migrateSave(JSON.parse(json) as unknown)
    if ('error' in migrated) return { ok: false, error: migrated.error }
    setState(fromSave(migrated))
    saveGame()
    return { ok: true }
  } catch {
    return { ok: false, error: 'No se pudo importar' }
  }
}

export function resetSave() {
  localStorage.removeItem(KEY)
  setState(createInitialState())
  saveGame()
}

export function bindAutosave() {
  const id = window.setInterval(saveGame, 15_000)
  const onHide = () => {
    if (document.hidden) saveGame()
  }
  document.addEventListener('visibilitychange', onHide)
  window.addEventListener('pagehide', saveGame)
  return () => {
    clearInterval(id)
    document.removeEventListener('visibilitychange', onHide)
    window.removeEventListener('pagehide', saveGame)
  }
}
