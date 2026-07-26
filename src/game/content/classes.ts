import type { ClassDef } from '../types'

export const CLASS_DEFS: ClassDef[] = [
  {
    id: 'guerrero',
    nameKey: 'class_guerrero',
    body: 'pesado',
    baseStats: {
      damage: 8,
      maxHp: 120,
      armor: 12,
      attackSpeed: 0.9,
      critChance: 5,
    },
    weaponSlots: ['arma', 'escudo'],
    skillKey: 'skill_guerrero',
  },
  {
    id: 'arquero',
    nameKey: 'class_arquero',
    body: 'ligero',
    baseStats: {
      damage: 7,
      maxHp: 90,
      armor: 6,
      attackSpeed: 1.15,
      critChance: 10,
    },
    weaponSlots: ['arma'],
    skillKey: 'skill_arquero',
  },
  {
    id: 'mago',
    nameKey: 'class_mago',
    body: 'ligero',
    baseStats: {
      damage: 10,
      maxHp: 75,
      armor: 3,
      attackSpeed: 0.85,
      critChance: 8,
    },
    weaponSlots: ['arma'],
    skillKey: 'skill_mago',
  },
  {
    id: 'picaro',
    nameKey: 'class_picaro',
    body: 'ligero',
    baseStats: {
      damage: 6,
      maxHp: 85,
      armor: 5,
      attackSpeed: 1.35,
      critChance: 18,
    },
    weaponSlots: ['arma'],
    skillKey: 'skill_picaro',
  },
  {
    id: 'clerigo',
    nameKey: 'class_clerigo',
    body: 'medio',
    baseStats: {
      damage: 6,
      maxHp: 110,
      armor: 10,
      attackSpeed: 0.95,
      critChance: 6,
    },
    weaponSlots: ['arma', 'escudo'],
    skillKey: 'skill_clerigo',
  },
  {
    id: 'barbaro',
    nameKey: 'class_barbaro',
    body: 'pesado',
    baseStats: {
      damage: 11,
      maxHp: 140,
      armor: 8,
      attackSpeed: 0.8,
      critChance: 7,
    },
    weaponSlots: ['arma'],
    skillKey: 'skill_barbaro',
  },
  {
    id: 'ballestero',
    nameKey: 'class_ballestero',
    body: 'medio',
    baseStats: {
      damage: 9,
      maxHp: 95,
      armor: 7,
      attackSpeed: 0.75,
      critChance: 12,
    },
    weaponSlots: ['arma'],
    skillKey: 'skill_ballestero',
  },
]

export const CLASS_BY_ID = Object.fromEntries(
  CLASS_DEFS.map((c) => [c.id, c]),
) as Record<string, ClassDef>
