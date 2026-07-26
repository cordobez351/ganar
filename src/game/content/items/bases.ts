import type { EquipSlot, HeroClass, ItemBase } from '../../types'

type Spec = {
  prefix: string
  slot: EquipSlot
  classes: readonly HeroClass[] | 'all'
  sprite: string
  kind: 'weapon' | 'armor' | 'jewel'
  names: string[]
}

const WEAPON_SPECS: Spec[] = [
  {
    prefix: 'espada',
    slot: 'arma',
    classes: ['guerrero', 'picaro', 'clerigo'],
    sprite: 'item_sword',
    kind: 'weapon',
    names: [
      'Espada Corta',
      'Espada Larga',
      'Sable',
      'Bracamarte',
      'Mandoble',
      'Florete',
      'Alfanje',
      'Espada Rúnica',
      'Hoja del Alba',
      'Tajo Nocturno',
      'Filo Quebrado',
      'Espada del Foso',
    ],
  },
  {
    prefix: 'arco',
    slot: 'arma',
    classes: ['arquero'],
    sprite: 'item_bow',
    kind: 'weapon',
    names: [
      'Arco Corto',
      'Arco Largo',
      'Arco Recurvo',
      'Arco de Caza',
      'Arco Tormenta',
      'Arco de Fresno',
      'Arco Sombrío',
      'Arco del Valle',
      'Arco Lunar',
      'Arco de Hueso',
    ],
  },
  {
    prefix: 'baston',
    slot: 'arma',
    classes: ['mago', 'clerigo'],
    sprite: 'item_staff',
    kind: 'weapon',
    names: [
      'Bastón Simple',
      'Bastón de Roble',
      'Vara Arcana',
      'Cetro Menor',
      'Bastón del Eco',
      'Vara de Escarcha',
      'Bastón Solar',
      'Cetro del Vacío',
      'Bastón de Ébano',
      'Vara Primigenia',
    ],
  },
  {
    prefix: 'maza',
    slot: 'arma',
    classes: ['guerrero', 'clerigo', 'barbaro'],
    sprite: 'item_mace',
    kind: 'weapon',
    names: [
      'Maza',
      'Martillo',
      'Maza con Pinchos',
      'Martillo de Guerra',
      'Maza Pesada',
      'Rompeescudos',
      'Maza Sagrada',
      'Martillo del Yunque',
      'Maza de Hierro',
      'Martillo Ancestral',
    ],
  },
  {
    prefix: 'daga',
    slot: 'arma',
    classes: ['picaro', 'mago'],
    sprite: 'item_dagger',
    kind: 'weapon',
    names: [
      'Daga',
      'Puñal',
      'Estilete',
      'Daga Curva',
      'Navaja',
      'Daga Venenosa',
      'Puñal de Seda',
      'Daga del Callejón',
      'Filo Corto',
      'Daga Espectral',
    ],
  },
  {
    prefix: 'ballesta',
    slot: 'arma',
    classes: ['ballestero', 'arquero'],
    sprite: 'item_xbow',
    kind: 'weapon',
    names: [
      'Ballesta Ligera',
      'Ballesta',
      'Ballesta Pesada',
      'Ballesta de Repetición',
      'Ballesta de Asedio',
      'Ballesta de Hueso',
      'Ballesta Rúnica',
      'Ballesta del Faro',
      'Ballesta Negra',
      'Ballesta Estelar',
    ],
  },
  {
    prefix: 'hacha',
    slot: 'arma',
    classes: ['barbaro', 'guerrero'],
    sprite: 'item_axe',
    kind: 'weapon',
    names: [
      'Hacha',
      'Hacha Doble',
      'Hacha de Guerra',
      'Hacha de Leñador',
      'Hacha Dentada',
      'Hacha del Norte',
      'Hacha de Sangre',
      'Hacha Rúnica',
    ],
  },
]

const ARMOR_SPECS: Spec[] = [
  {
    prefix: 'casco',
    slot: 'casco',
    classes: 'all',
    sprite: 'item_helm',
    kind: 'armor',
    names: [
      'Capucha',
      'Yelmo de Cuero',
      'Casco de Hierro',
      'Yelmo Alado',
      'Casco de Placas',
      'Máscara Rúnica',
      'Yelmo del Vigía',
      'Casco Espectral',
      'Corona Menor',
      'Yelmo Cósmico',
      'Capucha del Viento',
      'Casco del Foso',
    ],
  },
  {
    prefix: 'peto',
    slot: 'peto',
    classes: 'all',
    sprite: 'item_chest',
    kind: 'armor',
    names: [
      'Túnica',
      'Jubón',
      'Cota de Malla',
      'Peto de Cuero',
      'Coraza',
      'Peto Rúnico',
      'Armadura de Placas',
      'Manto Arcano',
      'Peto del Alba',
      'Coraza Estelar',
      'Jubón Sombrío',
      'Peto Primigenio',
    ],
  },
  {
    prefix: 'guantes',
    slot: 'guantes',
    classes: 'all',
    sprite: 'item_gloves',
    kind: 'armor',
    names: [
      'Guantes de Tela',
      'Guantes de Cuero',
      'Guanteletes',
      'Mitones',
      'Guantes Rúnicos',
      'Guanteletes de Guerra',
      'Guantes del Arquero',
      'Manoplas',
      'Guantes Espectrales',
      'Guanteletes Estelares',
    ],
  },
  {
    prefix: 'botas',
    slot: 'botas',
    classes: 'all',
    sprite: 'item_boots',
    kind: 'armor',
    names: [
      'Sandalias',
      'Botas de Cuero',
      'Botas Claveteadas',
      'Grebas',
      'Botas Rúnicas',
      'Botas del Mensajero',
      'Grebas de Guerra',
      'Botas Espectrales',
      'Botas del Valle',
      'Grebas Cósmicas',
    ],
  },
  {
    prefix: 'escudo',
    slot: 'escudo',
    classes: ['guerrero', 'clerigo', 'barbaro'],
    sprite: 'item_shield',
    kind: 'armor',
    names: [
      'Broquel',
      'Escudo de Madera',
      'Escudo de Hierro',
      'Escudo Torre',
      'Escudo Rúnico',
      'Escudo del Alba',
      'Pavés',
      'Escudo Espectral',
      'Escudo Sagrado',
      'Escudo Estelar',
    ],
  },
]

const JEWEL_SPECS: Spec[] = [
  {
    prefix: 'anillo',
    slot: 'anillo',
    classes: 'all',
    sprite: 'item_ring',
    kind: 'jewel',
    names: [
      'Anillo de Cobre',
      'Anillo de Plata',
      'Anillo de Oro',
      'Anillo Rúnico',
      'Anillo del Eco',
      'Anillo de Sangre',
      'Anillo Lunar',
      'Anillo del Vacío',
      'Anillo Estelar',
      'Anillo Primigenio',
      'Sello Menor',
      'Sello del Foso',
    ],
  },
  {
    prefix: 'amuleto',
    slot: 'amuleto',
    classes: 'all',
    sprite: 'item_amulet',
    kind: 'jewel',
    names: [
      'Amuleto de Hueso',
      'Amuleto de Jade',
      'Colgante',
      'Amuleto Rúnico',
      'Talismán',
      'Amuleto del Alba',
      'Colgante Arcano',
      'Amuleto Espectral',
      'Talismán Estelar',
      'Amuleto Cósmico',
    ],
  },
  {
    prefix: 'reliquia',
    slot: 'reliquia',
    classes: 'all',
    sprite: 'item_relic',
    kind: 'jewel',
    names: [
      'Reliquia Menor',
      'Fragmento',
      'Reliquia Ósea',
      'Cristal',
      'Reliquia Rúnica',
      'Orbe Menor',
      'Reliquia del Eco',
      'Fragmento Estelar',
      'Orbe del Vacío',
      'Reliquia Primigenia',
      'Cristal del Alba',
      'Orbe Cósmico',
    ],
  },
]

function buildBases(): ItemBase[] {
  const out: ItemBase[] = []
  const all = [...WEAPON_SPECS, ...ARMOR_SPECS, ...JEWEL_SPECS]
  for (const spec of all) {
    spec.names.forEach((name, i) => {
      const band = Math.floor(i / 3)
      const levelMin = 1 + band * 8 + (i % 3) * 2
      const levelMax = levelMin + 12
      const base: ItemBase = {
        id: `${spec.prefix}_${i}`,
        nameKey: name,
        slot: spec.slot,
        classes: spec.classes,
        levelMin,
        levelMax,
        sprite: spec.sprite,
      }
      if (spec.kind === 'weapon') {
        base.baseDamage = 4 + i * 2.2 + band * 3
        base.baseAps = 0.85 + (i % 4) * 0.08 - (spec.prefix === 'maza' ? 0.15 : 0)
      } else if (spec.kind === 'armor') {
        base.baseArmor = 3 + i * 1.8 + band * 2
      } else {
        base.baseArmor = 1 + i * 0.4
        base.baseDamage = 1 + i * 0.3
      }
      out.push(base)
    })
  }
  return out
}

export const ITEM_BASES: ItemBase[] = buildBases()
export const ITEM_BASE_BY_ID = Object.fromEntries(
  ITEM_BASES.map((b) => [b.id, b]),
) as Record<string, ItemBase>

export const ITEM_BASE_COUNT = ITEM_BASES.length
