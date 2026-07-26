import { useEffect, useRef, type MouseEvent } from 'react'
import type { ItemInstance } from '../types'
import { ITEM_BASE_BY_ID } from '../content/items/bases'
import { RARITY_DEFS } from '../content/items/tiers'
import { bakeAtlas, getSprite, isAtlasReady } from '../render/atlas'

type Props = {
  item: ItemInstance
  size?: number
  onHover?: (e: MouseEvent) => void
  onLeave?: () => void
  onClick?: () => void
  selected?: boolean
}

export function ItemIcon({
  item,
  size = 32,
  onHover,
  onLeave,
  onClick,
  selected,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const base = ITEM_BASE_BY_ID[item.baseId]
  const color = RARITY_DEFS[item.rarity].color

  useEffect(() => {
    if (!isAtlasReady()) bakeAtlas()
    const canvas = ref.current
    if (!canvas || !base) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const spr = getSprite(base.sprite)
    ctx.clearRect(0, 0, size, size)
    ctx.imageSmoothingEnabled = false
    if (spr) {
      const scale = Math.floor(size / spr.w)
      const dx = Math.floor((size - spr.w * scale) / 2)
      const dy = Math.floor((size - spr.h * scale) / 2)
      ctx.drawImage(spr.canvas, dx, dy, spr.w * scale, spr.h * scale)
    }
  }, [item, base, size])

  return (
    <button
      type="button"
      className={`relative inline-flex items-center justify-center border bg-[#121210] ${
        selected ? 'border-[#dedbc8]' : 'border-[#dedbc8]/20'
      }`}
      style={{ width: size + 4, height: size + 4, boxShadow: `inset 0 0 0 1px ${color}55` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <canvas ref={ref} width={size} height={size} />
    </button>
  )
}
