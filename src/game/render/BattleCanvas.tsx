import { useEffect, useRef } from 'react'
import { getState } from '../engine/store'
import { bakeAtlas, isAtlasReady } from './atlas'
import { chooseScale, drawFrame } from './draw'

const LOGICAL_W = 320
const LOGICAL_H = 180

export function BattleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isAtlasReady()) bakeAtlas()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const parent = canvas.parentElement

    const render = () => {
      const cssW = parent?.clientWidth ?? 640
      const cssH = parent?.clientHeight ?? 360
      const forced = getState().settings.pixelScale
      const scale = chooseScale(cssW, cssH, LOGICAL_W, LOGICAL_H, forced)
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const bw = Math.floor(LOGICAL_W * scale * dpr)
      const bh = Math.floor(LOGICAL_H * scale * dpr)
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
        canvas.style.width = `${LOGICAL_W * scale}px`
        canvas.style.height = `${LOGICAL_H * scale}px`
      }
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
      drawFrame(ctx, getState(), LOGICAL_W, LOGICAL_H)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="juego-canvas mx-auto block max-h-full max-w-full"
      aria-label="Campo de batalla"
    />
  )
}
