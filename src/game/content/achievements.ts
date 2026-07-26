import type { AchievementDef } from '../types'

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'a_first_blood',
    nameKey: 'Primera sangre',
    descKey: 'Derrotá tu primer monstruo.',
    rewardGold: 25,
    predicate: (s) => s.totalKills >= 1,
  },
  {
    id: 'a_kills_50',
    nameKey: 'Cincuenta',
    descKey: 'Derrotá 50 monstruos.',
    rewardGold: 100,
    predicate: (s) => s.totalKills >= 50,
  },
  {
    id: 'a_kills_500',
    nameKey: 'Quinientos',
    descKey: 'Derrotá 500 monstruos.',
    rewardGold: 500,
    predicate: (s) => s.totalKills >= 500,
  },
  {
    id: 'a_kills_5000',
    nameKey: 'Legión',
    descKey: 'Derrotá 5000 monstruos.',
    rewardGold: 2500,
    predicate: (s) => s.totalKills >= 5000,
  },
  {
    id: 'a_gold_1k',
    nameKey: 'Bolsa llena',
    descKey: 'Acumulá 1000 de oro ganado.',
    rewardGold: 100,
    predicate: (s) => s.totalGoldEarned >= 1000,
  },
  {
    id: 'a_gold_10k',
    nameKey: 'Tesorería',
    descKey: 'Acumulá 10000 de oro ganado.',
    rewardGold: 1000,
    predicate: (s) => s.totalGoldEarned >= 10000,
  },
  {
    id: 'a_stage_10',
    nameKey: 'Decena',
    descKey: 'Alcanzá la etapa 10.',
    rewardGold: 150,
    predicate: (s) => s.stageIndex >= 9,
  },
  {
    id: 'a_stage_30',
    nameKey: 'Fin del acto I',
    descKey: 'Completá el acto 1.',
    rewardGold: 400,
    predicate: (s) => s.stageIndex >= 30,
  },
  {
    id: 'a_stage_60',
    nameKey: 'Fin del acto II',
    descKey: 'Completá el acto 2.',
    rewardGold: 800,
    predicate: (s) => s.stageIndex >= 60,
  },
  {
    id: 'a_party_3',
    nameKey: 'Trío',
    descKey: 'Tené 3 héroes.',
    rewardGold: 200,
    predicate: (s) => s.heroes.length >= 3,
  },
  {
    id: 'a_party_full',
    nameKey: 'Compañía',
    descKey: 'Llená todos los huecos de héroe.',
    rewardGold: 500,
    predicate: (s) => s.heroes.length >= s.heroSlots && s.heroSlots >= 3,
  },
  {
    id: 'a_level_10',
    nameKey: 'Veterano',
    descKey: 'Un héroe alcanza nivel 10.',
    rewardGold: 200,
    predicate: (s) => s.heroes.some((h) => h.level >= 10),
  },
  {
    id: 'a_level_25',
    nameKey: 'Élite',
    descKey: 'Un héroe alcanza nivel 25.',
    rewardGold: 600,
    predicate: (s) => s.heroes.some((h) => h.level >= 25),
  },
  {
    id: 'a_rare',
    nameKey: 'Brillo azul',
    descKey: 'Obtené un objeto raro o mejor.',
    rewardGold: 80,
    predicate: (s) =>
      [...s.bag, ...s.stash].some((i) =>
        [
          'rara',
          'legendaria',
          'inmortal',
          'arcana',
          'mas_alla',
          'celestial',
          'divina',
          'cosmica',
        ].includes(i.rarity),
      ),
  },
  {
    id: 'a_legendary',
    nameKey: 'Leyenda',
    descKey: 'Obtené un objeto legendario o mejor.',
    rewardGold: 200,
    predicate: (s) =>
      [...s.bag, ...s.stash].some((i) =>
        [
          'legendaria',
          'inmortal',
          'arcana',
          'mas_alla',
          'celestial',
          'divina',
          'cosmica',
        ].includes(i.rarity),
      ),
  },
  {
    id: 'a_cosmic',
    nameKey: 'Cósmico',
    descKey: 'Obtené un objeto cósmico.',
    rewardGold: 5000,
    predicate: (s) =>
      [...s.bag, ...s.stash].some((i) => i.rarity === 'cosmica'),
  },
  {
    id: 'a_unique',
    nameKey: 'Único',
    descKey: 'Obtené un objeto único.',
    rewardGold: 300,
    predicate: (s) => [...s.bag, ...s.stash].some((i) => !!i.uniqueId),
  },
  {
    id: 'a_rune_1',
    nameKey: 'Primera runa',
    descKey: 'Desbloqueá una runa.',
    rewardGold: 50,
    predicate: (s) => s.runesUnlocked.length >= 1,
  },
  {
    id: 'a_rune_5',
    nameKey: 'Sendero rúnico',
    descKey: 'Desbloqueá 5 runas.',
    rewardGold: 250,
    predicate: (s) => s.runesUnlocked.length >= 5,
  },
  {
    id: 'a_rune_10',
    nameKey: 'Árbol vivo',
    descKey: 'Desbloqueá 10 runas.',
    rewardGold: 600,
    predicate: (s) => s.runesUnlocked.length >= 10,
  },
  {
    id: 'a_cube',
    nameKey: 'Alquimista',
    descKey: 'Usá el Cubo al menos una vez (modo síntesis con resultado).',
    rewardGold: 150,
    predicate: (s) => s.kills >= 0 && s.achievements.includes('a_cube_flag'),
  },
  {
    id: 'a_diff_2',
    nameKey: 'Conquistar',
    descKey: 'Jugá en dificultad Conquistar.',
    rewardGold: 300,
    predicate: (s) =>
      s.difficulty === 'conquistar' ||
      s.difficulty === 'merecer' ||
      s.difficulty === 'triunfar',
  },
  {
    id: 'a_diff_3',
    nameKey: 'Merecer',
    descKey: 'Jugá en dificultad Merecer.',
    rewardGold: 600,
    predicate: (s) =>
      s.difficulty === 'merecer' || s.difficulty === 'triunfar',
  },
  {
    id: 'a_diff_4',
    nameKey: 'Triunfar',
    descKey: 'Jugá en dificultad Triunfar.',
    rewardGold: 1200,
    predicate: (s) => s.difficulty === 'triunfar',
  },
  {
    id: 'a_stash_20',
    nameKey: 'Almacén',
    descKey: 'Guardá 20 objetos en el almacén.',
    rewardGold: 100,
    predicate: (s) => s.stash.length >= 20,
  },
  {
    id: 'a_equipped',
    nameKey: 'Ateneado',
    descKey: 'Equipá un arma en un héroe.',
    rewardGold: 40,
    predicate: (s) => s.heroes.some((h) => !!h.equipped.arma),
  },
  {
    id: 'a_full_gear',
    nameKey: 'Arsenal',
    descKey: 'Un héroe con 5 ranuras ocupadas.',
    rewardGold: 250,
    predicate: (s) =>
      s.heroes.some((h) => Object.keys(h.equipped).length >= 5),
  },
]

// Pad to 50+ with kill/gold/stage milestones
for (const n of [100, 250, 750, 1000, 2000, 3000, 7500, 10000]) {
  ACHIEVEMENTS.push({
    id: `a_k_${n}`,
    nameKey: `${n} caídos`,
    descKey: `Derrotá ${n} monstruos.`,
    rewardGold: Math.round(n / 5),
    predicate: (s) => s.totalKills >= n,
  })
}
for (const n of [5, 15, 20, 40, 50, 70, 80]) {
  ACHIEVEMENTS.push({
    id: `a_st_${n}`,
    nameKey: `Etapa ${n}`,
    descKey: `Alcanzá la etapa ${n}.`,
    rewardGold: n * 20,
    predicate: (s) => s.stageIndex >= n - 1,
  })
}
for (const n of [5, 15, 20, 30, 40, 50]) {
  ACHIEVEMENTS.push({
    id: `a_lv_${n}`,
    nameKey: `Nivel ${n}`,
    descKey: `Un héroe alcanza nivel ${n}.`,
    rewardGold: n * 30,
    predicate: (s) => s.heroes.some((h) => h.level >= n),
  })
}
for (const n of [200, 500, 2000, 5000, 20000, 50000]) {
  ACHIEVEMENTS.push({
    id: `a_g_${n}`,
    nameKey: `${n} de oro`,
    descKey: `Acumulá ${n} de oro ganado.`,
    rewardGold: Math.round(n / 20),
    predicate: (s) => s.totalGoldEarned >= n,
  })
}
for (const n of [2, 4, 6]) {
  ACHIEVEMENTS.push({
    id: `a_party_${n}`,
    nameKey: `Grupo ×${n}`,
    descKey: `Tené ${n} héroes en el grupo.`,
    rewardGold: n * 80,
    predicate: (s) => s.heroes.length >= n,
  })
}


export const ACHIEVEMENT_BY_ID = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a]),
) as Record<string, AchievementDef>
