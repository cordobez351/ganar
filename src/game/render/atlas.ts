import { PALETTE_SWAPS, SPRITES, type SpriteDef } from './sprites'

export type AtlasEntry = {
  canvas: HTMLCanvasElement
  w: number
  h: number
}

const atlas = new Map<string, AtlasEntry>()

function bakeOne(def: SpriteDef, palette: string[]): AtlasEntry {
  const canvas = document.createElement('canvas')
  canvas.width = def.w
  canvas.height = def.h
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(def.w, def.h)
  for (let y = 0; y < def.h; y++) {
    const row = def.rows[y] ?? ''
    for (let x = 0; x < def.w; x++) {
      const ch = row[x] ?? '.'
      if (ch === '.' || ch === ' ') continue
      const idx = Number(ch)
      const hex = palette[idx] || def.palette[idx]
      if (!hex) continue
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      const i = (y * def.w + x) * 4
      img.data[i] = r
      img.data[i + 1] = g
      img.data[i + 2] = b
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return { canvas, w: def.w, h: def.h }
}

export function bakeAtlas() {
  atlas.clear()
  for (const [name, def] of Object.entries(SPRITES)) {
    atlas.set(name, bakeOne(def, def.palette))
    for (let p = 1; p < PALETTE_SWAPS.length; p++) {
      const swap = PALETTE_SWAPS[p]!
      if (!swap.length) continue
      atlas.set(`${name}__p${p}`, bakeOne(def, swap))
    }
  }
}

export function getSprite(name: string, palette = 0): AtlasEntry | undefined {
  if (palette > 0) {
    const swapped = atlas.get(`${name}__p${palette}`)
    if (swapped) return swapped
  }
  return atlas.get(name)
}

export function isAtlasReady() {
  return atlas.size > 0
}
