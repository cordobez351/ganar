import { useState } from 'react'
import { CLASSES, type EquipSlot, type HeroClass } from '../types'
import { CLASS_BY_ID } from '../content/classes'
import { ITEM_BASE_BY_ID } from '../content/items/bases'
import { t } from '../content/strings'
import {
  equipItem,
  hireHero,
  unequipItem,
} from '../engine/actions'
import { expToLevel, findItem, heroStats, weaponAps } from '../engine/combat'
import { useGameSlice } from '../hooks/useGameSlice'
import { ItemIcon } from './ItemIcon'
import { Tooltip } from './Tooltip'

const SLOTS: EquipSlot[] = [
  'arma',
  'escudo',
  'casco',
  'peto',
  'guantes',
  'botas',
  'anillo',
  'amuleto',
  'reliquia',
]

export function HeroPanel() {
  const heroes = useGameSlice((s) => s.heroes)
  const bag = useGameSlice((s) => s.bag)
  const slots = useGameSlice((s) => s.heroSlots)
  const gold = useGameSlice((s) => s.gold)
  const snapshot = useGameSlice((s) => s)
  const [heroId, setHeroId] = useState(heroes[0]?.id ?? '')
  const [tip, setTip] = useState<{
    item: NonNullable<ReturnType<typeof findItem>>
    x: number
    y: number
  } | null>(null)

  const hero = heroes.find((h) => h.id === heroId) ?? heroes[0]
  if (!hero) return null

  const stats = heroStats(snapshot, hero)

  return (
    <div className="juego-panel space-y-3">
      <div className="flex flex-wrap gap-2">
        {heroes.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setHeroId(h.id)}
            className={`border px-2 py-1 text-[11px] ${
              h.id === hero.id
                ? 'border-[#dedbc8] text-[#dedbc8]'
                : 'border-[#dedbc8]/20 text-[#dedbc8]/60'
            }`}
          >
            {h.name} · {t(`class_${h.classId}` as 'class_guerrero')} Lv{h.level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-[11px]">
        <div>
          <div>
            {t('hp')}: {Math.round(hero.hp)}/{hero.maxHp}
          </div>
          <div>
            EXP: {Math.floor(hero.exp)}/{expToLevel(hero.level)}
          </div>
          <div>
            {t('damage')}: {(stats.damage ?? 0).toFixed(1)}
          </div>
          <div>
            {t('armor')}: {(stats.armor ?? 0).toFixed(1)}
          </div>
          <div>
            {t('aps')}: {weaponAps(snapshot, hero).toFixed(2)}
          </div>
          <div>
            {t('crit')}: {(stats.critChance ?? 0).toFixed(1)}%
          </div>
          <div className="mt-1 opacity-60">
            {t(CLASS_BY_ID[hero.classId].skillKey as 'skill_guerrero')}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {SLOTS.map((slot) => {
            const uid = hero.equipped[slot]
            const item = uid ? findItem(snapshot, uid) : undefined
            return (
              <div key={slot} className="text-center">
                <div className="mb-0.5 text-[9px] opacity-40">{slot}</div>
                {item ? (
                  <ItemIcon
                    item={item}
                    size={28}
                    onHover={(e) =>
                      setTip({ item, x: e.clientX, y: e.clientY })
                    }
                    onLeave={() => setTip(null)}
                    onClick={() => unequipItem(hero.id, slot)}
                  />
                ) : (
                  <div className="mx-auto flex h-8 w-8 items-center justify-center border border-dashed border-[#dedbc8]/20 text-[9px] opacity-30">
                    —
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <div className="mb-1 text-[10px] opacity-50">{t('inventory')} (equipar)</div>
        <div className="flex max-h-28 flex-wrap gap-1 overflow-auto">
          {bag.map((item) => {
            const base = ITEM_BASE_BY_ID[item.baseId]
            const ok =
              base &&
              (base.classes === 'all' || base.classes.includes(hero.classId))
            return (
              <ItemIcon
                key={item.uid}
                item={item}
                size={28}
                onHover={(e) =>
                  setTip({ item, x: e.clientX, y: e.clientY })
                }
                onLeave={() => setTip(null)}
                onClick={() => ok && equipItem(hero.id, item.uid)}
              />
            )
          })}
          {!bag.length && (
            <span className="text-[11px] opacity-40">{t('noItems')}</span>
          )}
        </div>
      </div>

      {heroes.length < slots && (
        <div className="border-t border-[#dedbc8]/15 pt-2">
          <div className="mb-1 text-[10px] opacity-50">
            {t('hireHero')} ({100 * (heroes.length + 1)}g) · huecos {heroes.length}/
            {slots}
          </div>
          <div className="flex flex-wrap gap-1">
            {CLASSES.map((c) => (
              <button
                key={c}
                type="button"
                disabled={gold < 100 * (heroes.length + 1)}
                onClick={() => hireHero(c as HeroClass)}
                className="border border-[#dedbc8]/25 px-2 py-1 text-[10px] disabled:opacity-30"
              >
                {t(`class_${c}` as 'class_guerrero')}
              </button>
            ))}
          </div>
        </div>
      )}

      {tip && <Tooltip item={tip.item} x={tip.x} y={tip.y} />}
    </div>
  )
}
