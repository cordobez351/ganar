import type { AffixDef } from '../../types'

function tiers(base: number, step: number) {
  // T1 strongest … T10 weakest
  return Array.from({ length: 10 }, (_, i) => {
    const t = 10 - i
    const mid = base + step * (t - 1)
    return { min: +(mid * 0.85).toFixed(2), max: +(mid * 1.15).toFixed(2) }
  })
}

export const AFFIXES: AffixDef[] = [
  {
    id: 'inc_dmg',
    family: 'grabado',
    stat: 'increasedDamage',
    tiers: tiers(4, 3),
    nameKey: 'daño aumentado',
  },
  {
    id: 'flat_dmg',
    family: 'inscripcion',
    stat: 'damage',
    tiers: tiers(2, 2),
    nameKey: 'daño plano',
  },
  {
    id: 'aps',
    family: 'decoracion',
    stat: 'attackSpeed',
    tiers: tiers(3, 2),
    nameKey: 'velocidad de ataque',
  },
  {
    id: 'crit_c',
    family: 'grabado',
    stat: 'critChance',
    tiers: tiers(2, 1.5),
    nameKey: 'prob. crítico',
  },
  {
    id: 'crit_d',
    family: 'inscripcion',
    stat: 'critDamage',
    tiers: tiers(10, 5),
    nameKey: 'daño crítico',
  },
  {
    id: 'armor',
    family: 'decoracion',
    stat: 'armor',
    tiers: tiers(5, 4),
    nameKey: 'armadura',
  },
  {
    id: 'hp',
    family: 'grabado',
    stat: 'maxHp',
    tiers: tiers(12, 10),
    nameKey: 'vida máxima',
  },
  {
    id: 'regen',
    family: 'decoracion',
    stat: 'hpRegen',
    tiers: tiers(0.5, 0.4),
    nameKey: 'regeneración',
  },
  {
    id: 'gold',
    family: 'inscripcion',
    stat: 'goldFind',
    tiers: tiers(5, 3),
    nameKey: 'hallazgo de oro',
  },
  {
    id: 'magic',
    family: 'grabado',
    stat: 'magicFind',
    tiers: tiers(5, 3),
    nameKey: 'hallazgo mágico',
  },
  {
    id: 'exp',
    family: 'decoracion',
    stat: 'expBonus',
    tiers: tiers(4, 2),
    nameKey: 'experiencia',
  },
  {
    id: 'fire',
    family: 'inscripcion',
    stat: 'flatFire',
    tiers: tiers(1, 1.2),
    nameKey: 'fuego',
  },
  {
    id: 'ice',
    family: 'inscripcion',
    stat: 'flatIce',
    tiers: tiers(1, 1.2),
    nameKey: 'hielo',
  },
  {
    id: 'light',
    family: 'inscripcion',
    stat: 'flatLightning',
    tiers: tiers(1, 1.2),
    nameKey: 'rayo',
  },
]

export const AFFIX_BY_ID = Object.fromEntries(
  AFFIXES.map((a) => [a.id, a]),
) as Record<string, AffixDef>
