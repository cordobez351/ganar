import type { Rarity } from '../../types'

export type RarityDef = {
  id: Rarity
  labelKey: string
  color: string
  affixMin: number
  affixMax: number
  rollMult: number
  nameBand: number
  weight: number
}

export const RARITY_DEFS: Record<Rarity, RarityDef> = {
  comun: {
    id: 'comun',
    labelKey: 'common',
    color: '#9aa08a',
    affixMin: 0,
    affixMax: 1,
    rollMult: 1,
    nameBand: 0,
    weight: 40,
  },
  poco_comun: {
    id: 'poco_comun',
    labelKey: 'uncommon',
    color: '#6fbf73',
    affixMin: 1,
    affixMax: 2,
    rollMult: 1.1,
    nameBand: 0,
    weight: 25,
  },
  rara: {
    id: 'rara',
    labelKey: 'rare',
    color: '#4aa3ff',
    affixMin: 2,
    affixMax: 3,
    rollMult: 1.25,
    nameBand: 1,
    weight: 15,
  },
  legendaria: {
    id: 'legendaria',
    labelKey: 'legendary',
    color: '#c9a227',
    affixMin: 3,
    affixMax: 4,
    rollMult: 1.45,
    nameBand: 1,
    weight: 8,
  },
  inmortal: {
    id: 'inmortal',
    labelKey: 'immortal',
    color: '#e8e8e8',
    affixMin: 3,
    affixMax: 5,
    rollMult: 1.7,
    nameBand: 2,
    weight: 5,
  },
  arcana: {
    id: 'arcana',
    labelKey: 'arcane',
    color: '#b46cff',
    affixMin: 4,
    affixMax: 5,
    rollMult: 2,
    nameBand: 2,
    weight: 3,
  },
  mas_alla: {
    id: 'mas_alla',
    labelKey: 'beyond',
    color: '#ff6b9d',
    affixMin: 4,
    affixMax: 6,
    rollMult: 2.4,
    nameBand: 3,
    weight: 2,
  },
  celestial: {
    id: 'celestial',
    labelKey: 'celestial',
    color: '#7ee7ff',
    affixMin: 5,
    affixMax: 6,
    rollMult: 2.9,
    nameBand: 3,
    weight: 1.2,
  },
  divina: {
    id: 'divina',
    labelKey: 'divine',
    color: '#ffe08a',
    affixMin: 5,
    affixMax: 7,
    rollMult: 3.5,
    nameBand: 4,
    weight: 0.6,
  },
  cosmica: {
    id: 'cosmica',
    labelKey: 'cosmic',
    color: '#ff4d6d',
    affixMin: 6,
    affixMax: 8,
    rollMult: 4.2,
    nameBand: 4,
    weight: 0.25,
  },
}

export const NAME_BANDS = [
  ['', 'Oxidado', 'Humilde', 'Simple'],
  ['Tempestad', 'Sombrío', 'Rúnico', 'Ácido'],
  ['Eterno', 'Ancestral', 'Vacío', 'Espectral'],
  ['Celeste', 'Aurora', 'Nadir', 'Órbita'],
  ['Cósmico', 'Estelar', 'Absoluto', 'Primigenio'],
] as const

export function itemDisplayName(baseName: string, rarity: Rarity): string {
  const band = RARITY_DEFS[rarity].nameBand
  const prefix = NAME_BANDS[band]?.[0] ?? ''
  if (!prefix) return baseName
  return `${baseName} ${prefix}`
}
