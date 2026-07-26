import type { EquipSlot, GameState, HeroClass, Rarity } from '../types'
import { CLASSES } from '../types'
import { CLASS_BY_ID } from '../content/classes'
import { ITEM_BASE_BY_ID } from '../content/items/bases'
import { createItem, itemGoldValue } from '../content/items/generate'
import { RARITIES_ORDER } from '../content/items/rarityOrder'
import { RUNE_BY_ID, RUNE_NODES } from '../content/runes'
import { ACHIEVEMENTS } from '../content/achievements'
import { findItem, heroStats, runeStats } from './combat'
import { applyOfflineReport } from './offline'
import { createHero, nextUid, syncHeroHp } from './state'
import { mutate } from './store'

export function claimOffline() {
  mutate((s) => {
    if (s.pendingOffline) applyOfflineReport(s, s.pendingOffline)
  })
}

export function equipItem(heroId: string, itemUid: string) {
  mutate((s) => {
    const hero = s.heroes.find((h) => h.id === heroId)
    const item = findItem(s, itemUid)
    if (!hero || !item) return
    const base = ITEM_BASE_BY_ID[item.baseId]
    if (!base) return
    if (
      base.classes !== 'all' &&
      !base.classes.includes(hero.classId)
    ) {
      return
    }
    const slot = base.slot
    const prev = hero.equipped[slot]
    hero.equipped[slot] = item.uid
    // move from stash to bag if needed for findItem
    if (!s.bag.some((i) => i.uid === item.uid)) {
      const idx = s.stash.findIndex((i) => i.uid === item.uid)
      if (idx >= 0) s.bag.push(s.stash.splice(idx, 1)[0]!)
    }
    if (prev && prev !== item.uid) {
      // previous stays in bag
    }
    syncHeroHp(s)
  })
}

export function unequipItem(heroId: string, slot: EquipSlot) {
  mutate((s) => {
    const hero = s.heroes.find((h) => h.id === heroId)
    if (!hero) return
    delete hero.equipped[slot]
    syncHeroHp(s)
  })
}

export function moveToStash(uid: string) {
  mutate((s) => {
    const idx = s.bag.findIndex((i) => i.uid === uid)
    if (idx < 0) return
    // don't move if equipped
    if (s.heroes.some((h) => Object.values(h.equipped).includes(uid))) return
    s.stash.push(s.bag.splice(idx, 1)[0]!)
  })
}

export function moveToBag(uid: string) {
  mutate((s) => {
    const idx = s.stash.findIndex((i) => i.uid === uid)
    if (idx < 0) return
    s.bag.push(s.stash.splice(idx, 1)[0]!)
  })
}

export function sellItem(uid: string) {
  mutate((s) => {
    if (s.heroes.some((h) => Object.values(h.equipped).includes(uid))) return
    let item = s.bag.find((i) => i.uid === uid)
    let from: 'bag' | 'stash' = 'bag'
    if (!item) {
      item = s.stash.find((i) => i.uid === uid)
      from = 'stash'
    }
    if (!item) return
    s.gold += itemGoldValue(item)
    if (from === 'bag') s.bag = s.bag.filter((i) => i.uid !== uid)
    else s.stash = s.stash.filter((i) => i.uid !== uid)
  })
}

export function hireHero(classId: HeroClass) {
  mutate((s) => {
    if (s.heroes.length >= s.heroSlots) return
    const cost = 100 * (s.heroes.length + 1)
    if (s.gold < cost) return
    s.gold -= cost
    const cls = CLASS_BY_ID[classId]
    const h = createHero(
      `h${s.uidCounter++}`,
      classId,
      cls.id.charAt(0).toUpperCase() + cls.id.slice(1),
    )
    s.heroes.push(h)
  })
}

export function buyHeroSlot() {
  mutate((s) => {
    const cost = 250 * s.heroSlots
    if (s.gold < cost) return
    if (s.heroSlots >= 7) return
    s.gold -= cost
    s.heroSlots += 1
  })
}

export function buyHeal() {
  mutate((s) => {
    if (s.gold < 30) return
    s.gold -= 30
    for (const h of s.heroes) {
      h.alive = true
      h.hp = h.maxHp
    }
  })
}

export function buyExpTome() {
  mutate((s) => {
    if (s.gold < 80) return
    s.gold -= 80
    for (const h of s.heroes) h.exp += 50 * h.level
  })
}

export function setCubeMode(mode: GameState['cubeMode']) {
  mutate((s) => {
    s.cubeMode = mode
  })
}

export function placeInCube(index: number, uid: string | null) {
  mutate((s) => {
    if (index < 0 || index > 8) return
    s.cube[index] = uid
  })
}

export function autoFillCube() {
  mutate((s) => {
    const pool = s.settings.stashInCube ? [...s.bag, ...s.stash] : [...s.bag]
    const equipped = new Set(
      s.heroes.flatMap((h) => Object.values(h.equipped)),
    )
    // group by rarity+base band
    const free = pool.filter((i) => !equipped.has(i.uid) && !s.cube.includes(i.uid))
    const groups = new Map<string, typeof free>()
    for (const item of free) {
      const key = `${item.rarity}:${ITEM_BASE_BY_ID[item.baseId]?.slot}`
      const g = groups.get(key) ?? []
      g.push(item)
      groups.set(key, g)
    }
    let best: typeof free = []
    for (const g of groups.values()) {
      if (g.length >= 9 && g.length > best.length) best = g
    }
    if (best.length < 9) {
      // fallback any 9 same rarity
      const byR = new Map<Rarity, typeof free>()
      for (const item of free) {
        const g = byR.get(item.rarity) ?? []
        g.push(item)
        byR.set(item.rarity, g)
      }
      for (const g of byR.values()) {
        if (g.length >= 9) {
          best = g
          break
        }
      }
    }
    s.cube = Array.from({ length: 9 }, () => null)
    for (let i = 0; i < 9 && i < best.length; i++) {
      s.cube[i] = best[i]!.uid
    }
  })
}

export function craftCube() {
  mutate((s) => {
    const uids = s.cube.filter((x): x is string => !!x)
    if (uids.length === 0) return
    const items = uids
      .map((u) => findItem(s, u))
      .filter((x): x is NonNullable<typeof x> => !!x)

    if (s.cubeMode === 'sintesis') {
      if (items.length !== 9) return
      const rarity = items[0]!.rarity
      if (!items.every((i) => i.rarity === rarity)) return
      const idx = RARITIES_ORDER.indexOf(rarity)
      if (idx < 0 || idx >= RARITIES_ORDER.length - 1) return
      const nextR = RARITIES_ORDER[idx + 1]!
      // consume
      removeItems(s, uids)
      const made = createItem(s.rngState, {
        ilvl: Math.max(...items.map((i) => i.ilvl)),
        forceRarity: nextR,
        forceBaseId: items[0]!.baseId,
        uid: nextUid(s),
      })
      s.rngState = made.state
      made.item.tags = ['bag:loot']
      s.bag.push(made.item)
      s.cube = Array.from({ length: 9 }, () => null)
      if (!s.achievements.includes('a_cube_flag')) {
        s.achievements.push('a_cube_flag')
      }
      return
    }

    if (s.cubeMode === 'reroll') {
      if (items.length !== 1) return
      const item = items[0]!
      removeItems(s, [item.uid])
      const made = createItem(s.rngState, {
        ilvl: item.ilvl,
        forceRarity: item.rarity,
        forceBaseId: item.baseId,
        uid: nextUid(s),
      })
      s.rngState = made.state
      s.bag.push(made.item)
      s.cube = Array.from({ length: 9 }, () => null)
      return
    }

    if (s.cubeMode === 'anadir') {
      if (items.length !== 2) return
      // sacrifice second to add a random affix to first
      const [keep, sac] = items
      if (!keep || !sac) return
      removeItems(s, [sac.uid])
      const made = createItem(s.rngState, {
        ilvl: keep.ilvl,
        forceRarity: keep.rarity,
        forceBaseId: keep.baseId,
        uid: keep.uid,
      })
      s.rngState = made.state
      keep.affixes = [...keep.affixes, ...made.item.affixes.slice(0, 1)].slice(
        0,
        8,
      )
      s.cube = Array.from({ length: 9 }, () => null)
    }
  })
}

function removeItems(s: GameState, uids: string[]) {
  const set = new Set(uids)
  for (const h of s.heroes) {
    for (const [slot, uid] of Object.entries(h.equipped)) {
      if (uid && set.has(uid)) delete h.equipped[slot as EquipSlot]
    }
  }
  s.bag = s.bag.filter((i) => !set.has(i.uid))
  s.stash = s.stash.filter((i) => !set.has(i.uid))
}

export function unlockRune(id: string) {
  mutate((s) => {
    const node = RUNE_BY_ID[id]
    if (!node) return
    if (s.runesUnlocked.includes(id)) return
    if (!node.prereqs.every((p) => s.runesUnlocked.includes(p))) return
    if (s.gold < node.cost) return
    s.gold -= node.cost
    s.runesUnlocked.push(id)
    // hero slots
    const rs = runeStats(s)
    if (rs.heroSlots) {
      s.heroSlots = Math.max(s.heroSlots, 2 + Math.floor(rs.heroSlots))
    }
    s.stats = { ...s.stats, ...rs }
    syncHeroHp(s)
  })
}

export function refundLastRune() {
  mutate((s) => {
    const last = s.runesUnlocked[s.runesUnlocked.length - 1]
    if (!last) return
    // ensure nothing depends on it
    const dependent = RUNE_NODES.some(
      (n) =>
        s.runesUnlocked.includes(n.id) &&
        n.prereqs.includes(last) &&
        n.id !== last,
    )
    if (dependent) return
    const node = RUNE_BY_ID[last]
    if (!node) return
    s.runesUnlocked.pop()
    s.gold += Math.floor(node.cost * 0.7)
    s.stats = runeStats(s)
  })
}

export function claimAchievement(id: string) {
  mutate((s) => {
    if (!s.achievements.includes(id)) return
    if (s.achievementRewardsClaimed.includes(id)) return
    const a = ACHIEVEMENTS.find((x) => x.id === id)
    if (!a) return
    s.achievementRewardsClaimed.push(id)
    if (a.rewardGold) {
      s.gold += a.rewardGold
      s.totalGoldEarned += a.rewardGold
    }
  })
}

export function updateSettings(partial: Partial<GameState['settings']>) {
  mutate((s) => {
    s.settings = { ...s.settings, ...partial }
  })
}

export function setDifficulty(d: GameState['difficulty']) {
  mutate((s) => {
    s.difficulty = d
  })
}

export function randomHireClass(): HeroClass {
  return CLASSES[Math.floor(Math.random() * CLASSES.length)]!
}

export function refreshHeroStats() {
  mutate((s) => {
    s.stats = { ...s.stats, ...runeStats(s) }
    for (const h of s.heroes) {
      const st = heroStats(s, h)
      h.maxHp = Math.round(st.maxHp ?? h.maxHp)
    }
  })
}
