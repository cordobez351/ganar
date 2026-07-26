import type { MonsterDef } from '../types'

const ARCHETYPES = [
  { id: 'limo', name: 'Limo', hp: 40, dmg: 4, armor: 2, exp: 8, gold: 3 },
  {
    id: 'esqueleto',
    name: 'Esqueleto',
    hp: 55,
    dmg: 6,
    armor: 4,
    exp: 12,
    gold: 5,
  },
  {
    id: 'murcielago',
    name: 'Murciélago',
    hp: 30,
    dmg: 5,
    armor: 1,
    exp: 7,
    gold: 2,
  },
  { id: 'gnoll', name: 'Gnoll', hp: 70, dmg: 8, armor: 5, exp: 16, gold: 7 },
  { id: 'orco', name: 'Orco', hp: 95, dmg: 10, armor: 8, exp: 22, gold: 10 },
  {
    id: 'espectro',
    name: 'Espectro',
    hp: 60,
    dmg: 12,
    armor: 3,
    exp: 20,
    gold: 8,
  },
  { id: 'golem', name: 'Gólem', hp: 140, dmg: 9, armor: 18, exp: 30, gold: 14 },
  { id: 'bestia', name: 'Bestia', hp: 85, dmg: 11, armor: 6, exp: 18, gold: 9 },
  {
    id: 'insecto',
    name: 'Insecto',
    hp: 45,
    dmg: 7,
    armor: 4,
    exp: 11,
    gold: 4,
  },
  {
    id: 'demonio',
    name: 'Demonio',
    hp: 120,
    dmg: 14,
    armor: 10,
    exp: 35,
    gold: 16,
  },
] as const

const VARIANTS = [
  { suffix: '', palette: 0, scale: 1, actBias: 0 },
  { suffix: ' Verdoso', palette: 1, scale: 1, actBias: 0 },
  { suffix: ' Pálido', palette: 2, scale: 0.95, actBias: 0 },
  { suffix: ' Oscuro', palette: 3, scale: 1.05, actBias: 1 },
  { suffix: ' Antiguo', palette: 4, scale: 1.15, actBias: 1 },
  { suffix: ' Feral', palette: 5, scale: 1.1, actBias: 2 },
]

export const MONSTERS: MonsterDef[] = (() => {
  const out: MonsterDef[] = []
  for (const arch of ARCHETYPES) {
    for (const v of VARIANTS) {
      const act = Math.min(3, 1 + v.actBias + (arch.id === 'demonio' ? 1 : 0))
      out.push({
        id: `${arch.id}_${v.palette}`,
        nameKey: `${arch.name}${v.suffix}`,
        archetype: arch.id,
        act,
        hp: Math.round(arch.hp * (1 + v.palette * 0.08)),
        damage: Math.round(arch.dmg * (1 + v.palette * 0.07)),
        armor: Math.round(arch.armor * (1 + v.actBias * 0.1)),
        exp: Math.round(arch.exp * (1 + v.palette * 0.1)),
        gold: Math.round(arch.gold * (1 + v.palette * 0.1)),
        sprite: `mon_${arch.id}`,
        palette: v.palette,
        scale: v.scale,
        behaviours: v.palette >= 4 ? ['fast', 'tanky'] : ['basic'],
      })
    }
  }
  return out
})()

export const MONSTER_BY_ID = Object.fromEntries(
  MONSTERS.map((m) => [m.id, m]),
) as Record<string, MonsterDef>

export const BOSSES: MonsterDef[] = [
  {
    id: 'boss_act1',
    nameKey: 'Celador del Foso',
    archetype: 'golem',
    act: 1,
    hp: 800,
    damage: 22,
    armor: 25,
    exp: 200,
    gold: 80,
    sprite: 'mon_golem',
    palette: 4,
    scale: 1.6,
    boss: true,
    behaviours: ['tanky', 'aoe'],
  },
  {
    id: 'boss_act2',
    nameKey: 'Señora de la Bruma',
    archetype: 'espectro',
    act: 2,
    hp: 1600,
    damage: 35,
    armor: 18,
    exp: 450,
    gold: 160,
    sprite: 'mon_espectro',
    palette: 5,
    scale: 1.5,
    boss: true,
    behaviours: ['fast', 'aoe'],
  },
  {
    id: 'boss_act3',
    nameKey: 'Verbo Roto',
    archetype: 'demonio',
    act: 3,
    hp: 3200,
    damage: 50,
    armor: 30,
    exp: 1000,
    gold: 400,
    sprite: 'mon_demonio',
    palette: 5,
    scale: 1.8,
    boss: true,
    behaviours: ['tanky', 'fast', 'aoe'],
  },
]

export const BOSS_BY_ID = Object.fromEntries(
  BOSSES.map((b) => [b.id, b]),
) as Record<string, MonsterDef>
