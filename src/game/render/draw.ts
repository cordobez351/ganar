import type { GameState } from '../types'
import { CLASS_BY_ID } from '../content/classes'
import { STAGE_BY_INDEX } from '../content/stages'
import { getSprite } from './atlas'

export function chooseScale(
  cssW: number,
  cssH: number,
  logicalW: number,
  logicalH: number,
  forced: number,
): number {
  if (forced > 0) return forced
  return Math.max(2, Math.floor(Math.min(cssW / logicalW, cssH / logicalH)))
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  logicalW: number,
  logicalH: number,
) {
  const stage = STAGE_BY_INDEX[state.stageIndex]
  const [c0, c1] = stage?.bg ?? ['#0b1410', '#1a2a22']
  const g = ctx.createLinearGradient(0, 0, 0, logicalH)
  g.addColorStop(0, c0)
  g.addColorStop(1, c1)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, logicalW, logicalH)

  // ground line
  ctx.fillStyle = 'rgba(222,219,200,0.08)'
  ctx.fillRect(0, logicalH - 28, logicalW, 28)

  // stage label area left empty — UI handles text

  for (const c of state.combatants) {
    if (c.dead && c.anim === 'death' && c.animT > 0.35) continue
    let spriteName = 'hero_medio_idle'
    let palette = 0
    let scale = 1
    if (c.side === 'hero' && c.heroId) {
      const hero = state.heroes.find((h) => h.id === c.heroId)
      const body = hero ? CLASS_BY_ID[hero.classId].body : 'medio'
      spriteName =
        c.anim === 'attack'
          ? 'hero_attack'
          : `hero_${body}_idle`
    } else if (c.monsterId) {
      const arch = c.monsterId.split('_')[0] ?? 'limo'
      spriteName = `mon_${arch}`
      palette = Number(c.monsterId.split('_')[1] ?? 0) || 0
      // bosses larger via scale from def — approximate
      if (c.monsterId.startsWith('boss')) scale = 1.5
    }

    const spr = getSprite(spriteName, palette) ?? getSprite('mon_limo')
    if (!spr) continue

    const shake =
      c.anim === 'hit' && c.animT < 0.15 ? Math.sin(c.animT * 40) * 2 : 0
    const alpha = c.dead ? Math.max(0, 1 - c.animT * 2) : 1
    ctx.save()
    ctx.globalAlpha = alpha
    const dw = spr.w * scale
    const dh = spr.h * scale
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(
      spr.canvas,
      Math.round(c.x + shake - dw / 2),
      Math.round(c.y - dh),
      dw,
      dh,
    )
    // hp bar
    if (!c.dead) {
      const bw = 18
      const pct = Math.max(0, c.hp / c.maxHp)
      ctx.fillStyle = '#1a1a18'
      ctx.fillRect(c.x - bw / 2, c.y - dh - 5, bw, 2)
      ctx.fillStyle = c.side === 'hero' ? '#5fd08a' : '#ff4d6d'
      ctx.fillRect(c.x - bw / 2, c.y - dh - 5, bw * pct, 2)
    }
    ctx.restore()
  }

  for (const f of state.floaters) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, 1 - f.age)
    ctx.fillStyle = f.color
    ctx.font = 'bold 8px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(f.text, f.x, f.y)
    ctx.restore()
  }

  // vignette
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.fillRect(0, 0, logicalW, 10)
  ctx.fillRect(0, logicalH - 10, logicalW, 10)
}
