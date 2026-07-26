import type { UniqueDef } from '../../types'

export const UNIQUES: UniqueDef[] = [
  {
    id: 'u_filo_ganar',
    baseId: 'espada_7',
    nameKey: 'Filo de Ganar',
    rarity: 'legendaria',
    fixedAffixes: [
      { affixId: 'inc_dmg', tier: 2, roll: 0.9 },
      { affixId: 'crit_c', tier: 3, roll: 0.8 },
      { affixId: 'gold', tier: 2, roll: 1 },
    ],
    flavorKey: 'Quien lo empuña ya disputó el verbo.',
  },
  {
    id: 'u_arco_manuscrito',
    baseId: 'arco_5',
    nameKey: 'Arco del Manuscrito',
    rarity: 'arcana',
    fixedAffixes: [
      { affixId: 'aps', tier: 2, roll: 0.85 },
      { affixId: 'magic', tier: 1, roll: 0.9 },
      { affixId: 'exp', tier: 3, roll: 0.7 },
    ],
  },
  {
    id: 'u_baston_estados',
    baseId: 'baston_6',
    nameKey: 'Bastón de los Estados',
    rarity: 'celestial',
    fixedAffixes: [
      { affixId: 'flat_dmg', tier: 1, roll: 1 },
      { affixId: 'fire', tier: 2, roll: 0.9 },
      { affixId: 'ice', tier: 2, roll: 0.9 },
      { affixId: 'light', tier: 2, roll: 0.9 },
    ],
  },
  {
    id: 'u_daga_callejón',
    baseId: 'daga_4',
    nameKey: 'Navaja del Callejón',
    rarity: 'rara',
    fixedAffixes: [
      { affixId: 'crit_d', tier: 3, roll: 0.95 },
      { affixId: 'aps', tier: 4, roll: 0.8 },
    ],
  },
  {
    id: 'u_maza_yunque',
    baseId: 'maza_5',
    nameKey: 'Yunque Viviente',
    rarity: 'inmortal',
    fixedAffixes: [
      { affixId: 'armor', tier: 2, roll: 1 },
      { affixId: 'hp', tier: 2, roll: 0.9 },
      { affixId: 'flat_dmg', tier: 3, roll: 0.85 },
    ],
  },
  {
    id: 'u_ballesta_faro',
    baseId: 'ballesta_6',
    nameKey: 'Ballesta del Faro',
    rarity: 'mas_alla',
    fixedAffixes: [
      { affixId: 'inc_dmg', tier: 1, roll: 0.95 },
      { affixId: 'crit_c', tier: 2, roll: 0.9 },
      { affixId: 'light', tier: 1, roll: 1 },
    ],
  },
  {
    id: 'u_hacha_norte',
    baseId: 'hacha_5',
    nameKey: 'Hacha del Norte',
    rarity: 'legendaria',
    fixedAffixes: [
      { affixId: 'inc_dmg', tier: 3, roll: 1 },
      { affixId: 'hp', tier: 3, roll: 0.8 },
    ],
  },
  {
    id: 'u_casco_vigia',
    baseId: 'casco_6',
    nameKey: 'Yelmo del Vigía',
    rarity: 'rara',
    fixedAffixes: [
      { affixId: 'armor', tier: 3, roll: 0.9 },
      { affixId: 'exp', tier: 4, roll: 0.85 },
    ],
  },
  {
    id: 'u_peto_alba',
    baseId: 'peto_8',
    nameKey: 'Peto del Alba',
    rarity: 'divina',
    fixedAffixes: [
      { affixId: 'hp', tier: 1, roll: 1 },
      { affixId: 'armor', tier: 1, roll: 0.95 },
      { affixId: 'regen', tier: 2, roll: 0.9 },
    ],
  },
  {
    id: 'u_anillo_verbo',
    baseId: 'anillo_9',
    nameKey: 'Anillo del Verbo',
    rarity: 'cosmica',
    fixedAffixes: [
      { affixId: 'gold', tier: 1, roll: 1 },
      { affixId: 'magic', tier: 1, roll: 1 },
      { affixId: 'exp', tier: 1, roll: 1 },
      { affixId: 'inc_dmg', tier: 2, roll: 0.9 },
    ],
    flavorKey: 'Trece estados, un solo sello.',
  },
]

// Expand to ~80 uniques programmatically from bases
const EXTRA_NAMES = [
  'Eco',
  'Foso',
  'Valle',
  'Nadir',
  'Órbita',
  'Ceniza',
  'Rocío',
  'Trueno',
  'Bruma',
  'Raíz',
  'Mirada',
  'Pacto',
  'Umbral',
  'Cisma',
  'Lamento',
  'Juramento',
  'Vigilia',
  'Cosecha',
  'Relámpago',
  'Marea',
]

function expandUniques(): UniqueDef[] {
  const baseIds = [
    'espada_2',
    'espada_9',
    'arco_3',
    'arco_8',
    'baston_2',
    'baston_8',
    'maza_3',
    'daga_7',
    'ballesta_3',
    'hacha_2',
    'casco_3',
    'casco_9',
    'peto_2',
    'peto_5',
    'guantes_4',
    'guantes_8',
    'botas_3',
    'botas_7',
    'escudo_4',
    'escudo_8',
    'anillo_2',
    'anillo_5',
    'amuleto_3',
    'amuleto_7',
    'reliquia_1',
    'reliquia_6',
    'reliquia_10',
  ]
  const rarities = [
    'rara',
    'legendaria',
    'inmortal',
    'arcana',
    'mas_alla',
    'celestial',
    'divina',
  ] as const
  const affixPool = [
    'inc_dmg',
    'flat_dmg',
    'aps',
    'crit_c',
    'crit_d',
    'armor',
    'hp',
    'gold',
    'magic',
    'exp',
    'fire',
    'ice',
  ]
  const out: UniqueDef[] = [...UNIQUES]
  let n = 0
  for (const baseId of baseIds) {
    for (let k = 0; k < 2; k++) {
      const name = `${EXTRA_NAMES[n % EXTRA_NAMES.length]} ${baseId.split('_')[0]}`
      const rarity = rarities[n % rarities.length]!
      const a1 = affixPool[n % affixPool.length]!
      const a2 = affixPool[(n + 3) % affixPool.length]!
      const a3 = affixPool[(n + 7) % affixPool.length]!
      out.push({
        id: `u_gen_${n}`,
        baseId,
        nameKey: name.charAt(0).toUpperCase() + name.slice(1),
        rarity,
        fixedAffixes: [
          { affixId: a1, tier: 1 + (n % 4), roll: 0.75 + (n % 5) * 0.05 },
          { affixId: a2, tier: 2 + (n % 3), roll: 0.8 },
          { affixId: a3, tier: 3, roll: 0.85 },
        ],
      })
      n++
      if (out.length >= 80) return out
    }
  }
  return out
}

export const ALL_UNIQUES = expandUniques()
export const UNIQUE_BY_ID = Object.fromEntries(
  ALL_UNIQUES.map((u) => [u.id, u]),
) as Record<string, UniqueDef>
