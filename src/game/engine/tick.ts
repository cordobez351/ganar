import type { Combatant, GameState } from '../types'
import { ACHIEVEMENTS } from '../content/achievements'
import { createItem } from '../content/items/generate'
import { BOSS_BY_ID, MONSTER_BY_ID } from '../content/monsters'
import { STAGE_BY_INDEX } from '../content/stages'
import {
  expToLevel,
  heroHitDamage,
  heroStats,
  mitigate,
  monsterScaled,
  weaponAps,
} from './combat'
import { nextRng } from './rng'
import { nextUid, syncHeroHp } from './state'

const TICK_SEC = 0.1

function ensureWave(state: GameState) {
  const living = state.combatants.filter((c) => c.side === 'monster' && !c.dead)
  if (living.length > 0) return

  const stage = STAGE_BY_INDEX[state.stageIndex]
  if (!stage) return

  if (stage.bossId && state.waveIndex >= stage.waves.length) {
    spawnMonster(state, stage.bossId, true)
    state.waveIndex = 0
    return
  }

  if (state.waveIndex >= stage.waves.length) {
    // stage clear
    state.stageIndex = Math.min(STAGE_BY_INDEX.length - 1, state.stageIndex + 1)
    state.waveIndex = 0
    state.stageKills = 0
    // revive heroes
    for (const h of state.heroes) {
      h.alive = true
      h.hp = h.maxHp
    }
    return
  }

  const wave = stage.waves[state.waveIndex]!
  for (let i = 0; i < wave.count; i++) {
    spawnMonster(state, wave.monsterId, false)
  }
  state.waveIndex += 1
}

function spawnMonster(state: GameState, monsterId: string, boss: boolean) {
  const scaled = monsterScaled(monsterId, state.stageIndex, state.difficulty)
  const def = MONSTER_BY_ID[monsterId] ?? BOSS_BY_ID[monsterId]
  const id = `m_${state.uidCounter++}`
  state.combatants.push({
    id,
    side: 'monster',
    monsterId,
    hp: scaled.hp * (boss ? 1 : 1),
    maxHp: scaled.hp,
    x: 220 + (state.combatants.length % 5) * 18,
    y: 80 + (state.combatants.length % 3) * 20,
    anim: 'idle',
    animT: 0,
    attackCd: 0.5 + Math.random() * 0.5,
    dead: false,
  })
  void def
}

function ensureHeroCombatants(state: GameState) {
  for (const h of state.heroes) {
    let c = state.combatants.find((x) => x.heroId === h.id)
    if (!c) {
      c = {
        id: `c_${h.id}`,
        side: 'hero',
        heroId: h.id,
        hp: h.hp,
        maxHp: h.maxHp,
        x: 40 + state.heroes.indexOf(h) * 22,
        y: 100,
        anim: 'idle',
        animT: 0,
        attackCd: 0,
        dead: !h.alive,
      }
      state.combatants.push(c)
    }
    c.hp = h.hp
    c.maxHp = h.maxHp
    c.dead = !h.alive
    c.x = 36 + state.heroes.indexOf(h) * 24
  }
  // prune orphan heroes
  state.combatants = state.combatants.filter(
    (c) =>
      c.side === 'monster' ||
      state.heroes.some((h) => h.id === c.heroId),
  )
}

function addFloater(
  state: GameState,
  x: number,
  y: number,
  text: string,
  color: string,
) {
  if (state.settings.reducedMotion) return
  if (state.floaters.length > 40) state.floaters.shift()
  state.floaters.push({
    id: `f${state.uidCounter++}`,
    x,
    y,
    text,
    color,
    age: 0,
  })
}

function gainExp(state: GameState, amount: number) {
  const alive = state.heroes.filter((h) => h.alive)
  if (!alive.length) return
  const share = amount / alive.length
  for (const h of alive) {
    h.exp += share
    let guard = 0
    while (h.exp >= expToLevel(h.level) && guard++ < 20) {
      h.exp -= expToLevel(h.level)
      h.level += 1
      syncHeroHp(state)
      h.hp = h.maxHp
      addFloater(state, 60, 40, `Nv.${h.level}`, '#ffe08a')
    }
  }
}

function onMonsterDeath(state: GameState, c: Combatant) {
  if (!c.monsterId) return
  const scaled = monsterScaled(c.monsterId, state.stageIndex, state.difficulty)
  state.kills += 1
  state.totalKills += 1
  state.stageKills += 1

  let gold = scaled.gold
  const gf = 1 + ((heroStats(state, state.heroes[0]!)?.goldFind ?? 0) + (state.stats.goldFind ?? 0)) / 100
  // use rune gold from first hero aggregate already in heroStats
  gold = Math.round(gold * gf)
  state.gold += gold
  state.totalGoldEarned += gold
  gainExp(state, scaled.exp)

  const mf = heroStats(state, state.heroes[0]!).magicFind ?? 0
  const dropRoll = nextRng(state.rngState)
  state.rngState = dropRoll.state
  if (dropRoll.value < 0.22 + mf / 400) {
    const made = createItem(state.rngState, {
      ilvl: 1 + state.stageIndex,
      magicFind: mf,
      uid: nextUid(state),
    })
    state.rngState = made.state
    made.item.tags = ['bag:loot']
    state.bag.push(made.item)
    if (state.bag.length > 200) {
      // overflow to stash auto
      state.stash.push(...state.bag.splice(0, 20))
    }
    state.groundLoot.push({
      item: made.item,
      x: c.x,
      y: c.y,
      age: 0,
    })
  }
  addFloater(state, c.x, c.y - 8, `+${gold}g`, '#c9a227')
}

function evaluateAchievements(state: GameState) {
  for (const a of ACHIEVEMENTS) {
    if (state.achievements.includes(a.id)) continue
    try {
      if (a.predicate(state)) {
        state.achievements.push(a.id)
      }
    } catch {
      // ignore bad predicates
    }
  }
}

export function tick(state: GameState, dt = TICK_SEC) {
  if (state.simPhase === 'frozen') return

  const speed = state.settings.speed || 1
  const step = dt * speed

  ensureHeroCombatants(state)
  ensureWave(state)
  syncHeroHp(state)

  // age floaters / loot
  state.floaters = state.floaters
    .map((f) => ({ ...f, age: f.age + step, y: f.y - step * 20 }))
    .filter((f) => f.age < 1.2)
  state.groundLoot = state.groundLoot
    .map((g) => ({ ...g, age: g.age + step }))
    .filter((g) => g.age < 2.5)

  for (const c of state.combatants) {
    c.animT += step
    if (c.dead) continue
    c.attackCd -= step

    if (c.side === 'hero' && c.heroId) {
      const hero = state.heroes.find((h) => h.id === c.heroId)
      if (!hero || !hero.alive) {
        c.dead = true
        continue
      }
      // regen
      const stats = heroStats(state, hero)
      hero.hp = Math.min(hero.maxHp, hero.hp + (stats.hpRegen ?? 0) * step)
      c.hp = hero.hp

      if (c.attackCd <= 0) {
        const target = state.combatants.find(
          (m) => m.side === 'monster' && !m.dead,
        )
        if (target) {
          const roll = nextRng(state.rngState)
          state.rngState = roll.state
          const hit = heroHitDamage(state, hero, roll.value)
          const monLevel = 1 + Math.floor(state.stageIndex / 2)
          const mon = monsterScaled(
            target.monsterId ?? 'limo_0',
            state.stageIndex,
            state.difficulty,
          )
          // heroes ignore monster armor partially via mitigate inverse — deal raw mitigated by mon armor
          const dealt = Math.max(
            1,
            Math.round(
              hit.damage *
                (1 -
                  mon.armor /
                    (mon.armor + 50 * monLevel + hit.damage)),
            ),
          )
          target.hp -= dealt
          target.anim = 'hit'
          target.animT = 0
          c.anim = 'attack'
          c.animT = 0
          addFloater(
            state,
            target.x,
            target.y,
            hit.crit ? `${dealt}!` : `${dealt}`,
            hit.crit ? '#ff6b9d' : '#dedbc8',
          )
          c.attackCd = 1 / Math.max(0.2, weaponAps(state, hero))
          if (target.hp <= 0) {
            target.hp = 0
            target.dead = true
            target.anim = 'death'
            target.animT = 0
            onMonsterDeath(state, target)
          }
        }
      }
    }

    if (c.side === 'monster' && c.monsterId) {
      if (c.attackCd <= 0) {
        const target = state.combatants.find(
          (h) => h.side === 'hero' && !h.dead,
        )
        if (target && target.heroId) {
          const hero = state.heroes.find((h) => h.id === target.heroId)
          if (hero && hero.alive) {
            const mon = monsterScaled(
              c.monsterId,
              state.stageIndex,
              state.difficulty,
            )
            const stats = heroStats(state, hero)
            const raw = mon.damage
            const taken = Math.max(
              1,
              Math.round(
                mitigate(raw, stats.armor ?? 0, mon.level),
              ),
            )
            hero.hp -= taken
            target.hp = hero.hp
            target.anim = 'hit'
            c.anim = 'attack'
            c.animT = 0
            addFloater(state, target.x, target.y, `-${taken}`, '#ff4d6d')
            if (hero.hp <= 0) {
              hero.hp = 0
              hero.alive = false
              target.dead = true
              target.anim = 'death'
            }
            c.attackCd = 1.2
          }
        }
      }
    }
  }

  // remove dead monsters after anim
  state.combatants = state.combatants.filter(
    (c) => !(c.side === 'monster' && c.dead && c.animT > 0.4),
  )

  // if all heroes dead, soft stage slowly
  if (state.heroes.every((h) => !h.alive)) {
    for (const h of state.heroes) {
      h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.05 * step)
      if (h.hp >= h.maxHp * 0.3) {
        h.alive = true
      }
    }
  }

  evaluateAchievements(state)
  state.lastTickAt = Date.now()
}
