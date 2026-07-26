import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ItemInstance } from '../types'
import { AFFIX_BY_ID } from '../content/items/affixes'
import { ITEM_BASE_BY_ID } from '../content/items/bases'
import { UNIQUE_BY_ID } from '../content/items/uniques'
import {
  affixValue,
  itemDisplayName,
  itemGoldValue,
} from '../content/items/generate'
import { RARITY_DEFS } from '../content/items/tiers'
import { t } from '../content/strings'

type Props = {
  item: ItemInstance | null
  x: number
  y: number
}

export function Tooltip({ item, x, y }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let left = x + 12
    let top = y + 12
    if (left + rect.width > window.innerWidth - 8) {
      left = x - rect.width - 8
    }
    if (top + rect.height > window.innerHeight - 8) {
      top = window.innerHeight - rect.height - 8
    }
    setPos({ left: Math.max(8, left), top: Math.max(8, top) })
  }, [x, y, item])

  useEffect(() => {
    // keep portal mounted
  }, [item])

  if (!item) return null
  const base = ITEM_BASE_BY_ID[item.baseId]
  const rarity = RARITY_DEFS[item.rarity]
  const unique = item.uniqueId ? UNIQUE_BY_ID[item.uniqueId] : undefined
  const name = unique?.nameKey ?? itemDisplayName(base?.nameKey ?? '?', item.rarity)
  const classes =
    base?.classes === 'all'
      ? 'Todas'
      : (base?.classes ?? []).join(', ')

  return (
    <div
      ref={ref}
      className="juego-tooltip pointer-events-none fixed z-[80] max-w-[260px] border border-[#dedbc8]/25 bg-[#0c0c0a]/95 p-3 text-[11px] text-[#dedbc8] shadow-lg"
      style={{ left: pos.left, top: pos.top }}
    >
      <div className="mb-1 text-sm font-bold" style={{ color: rarity.color }}>
        {name}
      </div>
      <div className="mb-2 text-[10px] opacity-60">{t(rarity.labelKey as 'common')}</div>
      {base?.baseDamage != null && (
        <div>
          {t('damage')}: {base.baseDamage.toFixed(1)}
        </div>
      )}
      {base?.baseAps != null && (
        <div>
          {t('aps')}: {base.baseAps.toFixed(2)}
        </div>
      )}
      {base?.baseArmor != null && (
        <div>
          {t('armor')}: {base.baseArmor.toFixed(1)}
        </div>
      )}
      <div className="my-2 h-px bg-[#dedbc8]/15" />
      <div className="mb-1 opacity-50">{t('innate')}</div>
      {item.affixes.map((a, i) => {
        const aff = AFFIX_BY_ID[a.affixId]
        const val = affixValue(a)
        return (
          <div key={i} className="text-[#7ee7ff]">
            +{val.toFixed(1)} {aff?.nameKey ?? a.affixId}{' '}
            <span className="opacity-50">
              T{a.tier} · {aff?.family}
            </span>
          </div>
        )
      })}
      <div className="my-2 h-px bg-[#dedbc8]/15" />
      <div>
        {t('requiresClass')}: {classes}
      </div>
      <div>
        {t('requiresLevel')}: {base?.levelMin ?? 1}
      </div>
      <div>
        {t('value')}: {itemGoldValue(item)}g
      </div>
      {unique?.flavorKey && (
        <div className="mt-2 italic opacity-60">{unique.flavorKey}</div>
      )}
    </div>
  )
}
