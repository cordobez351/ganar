import { useState } from 'react'
import { t } from '../content/strings'
import {
  moveToBag,
  moveToStash,
  sellItem,
} from '../engine/actions'
import { findItem } from '../engine/combat'
import { useGameSlice } from '../hooks/useGameSlice'
import { ItemIcon } from './ItemIcon'
import { Tooltip } from './Tooltip'

export function InventoryPanel() {
  const bag = useGameSlice((s) => s.bag)
  const stash = useGameSlice((s) => s.stash)
  const [tab, setTab] = useState<'inv' | 'stash'>('inv')
  const [tip, setTip] = useState<{
    item: NonNullable<ReturnType<typeof findItem>>
    x: number
    y: number
  } | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const list = tab === 'inv' ? bag : stash

  return (
    <div className="juego-panel space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          className={`border px-2 py-1 text-[11px] ${tab === 'inv' ? 'border-[#dedbc8]' : 'border-[#dedbc8]/20'}`}
          onClick={() => setTab('inv')}
        >
          {t('inventory')} ({bag.length})
        </button>
        <button
          type="button"
          className={`border px-2 py-1 text-[11px] ${tab === 'stash' ? 'border-[#dedbc8]' : 'border-[#dedbc8]/20'}`}
          onClick={() => setTab('stash')}
        >
          {t('stash')} ({stash.length})
        </button>
      </div>

      <div className="flex max-h-56 flex-wrap gap-1 overflow-auto">
        {list.map((item) => (
          <ItemIcon
            key={item.uid}
            item={item}
            selected={selected === item.uid}
            onHover={(e) => setTip({ item, x: e.clientX, y: e.clientY })}
            onLeave={() => setTip(null)}
            onClick={() => setSelected(item.uid)}
          />
        ))}
        {!list.length && (
          <span className="text-[11px] opacity-40">{t('noItems')}</span>
        )}
      </div>

      {selected && (
        <div className="flex flex-wrap gap-2">
          {tab === 'inv' ? (
            <button
              type="button"
              className="border border-[#dedbc8]/30 px-2 py-1 text-[11px]"
              onClick={() => {
                moveToStash(selected)
                setSelected(null)
              }}
            >
              → {t('stash')}
            </button>
          ) : (
            <button
              type="button"
              className="border border-[#dedbc8]/30 px-2 py-1 text-[11px]"
              onClick={() => {
                moveToBag(selected)
                setSelected(null)
              }}
            >
              → {t('inventory')}
            </button>
          )}
          <button
            type="button"
            className="border border-[#ff4d6d]/40 px-2 py-1 text-[11px] text-[#ff4d6d]"
            onClick={() => {
              sellItem(selected)
              setSelected(null)
            }}
          >
            {t('sell')}
          </button>
        </div>
      )}

      {tip && <Tooltip item={tip.item} x={tip.x} y={tip.y} />}
    </div>
  )
}
