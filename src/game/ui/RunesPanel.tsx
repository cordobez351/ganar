import { useRef, useState } from 'react'
import { RUNE_NODES } from '../content/runes'
import { t } from '../content/strings'
import { refundLastRune, unlockRune } from '../engine/actions'
import { useGameSlice } from '../hooks/useGameSlice'

const GROUPS = {
  exploracion: '#7ee7ff',
  combate: '#ff6b9d',
  botin: '#c9a227',
  oficio: '#5fd08a',
} as const

export function RunesPanel() {
  const unlocked = useGameSlice((s) => s.runesUnlocked)
  const gold = useGameSlice((s) => s.gold)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(
    null,
  )
  const [hover, setHover] = useState<string | null>(null)
  const node = hover ? RUNE_NODES.find((n) => n.id === hover) : null

  return (
    <div className="juego-panel space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span>
          {t('runes')} · {unlocked.length}/{RUNE_NODES.length}
        </span>
        <button
          type="button"
          className="border border-[#dedbc8]/25 px-2 py-0.5"
          onClick={() => refundLastRune()}
        >
          {t('runeRefund')}
        </button>
      </div>

      <div
        className="relative h-56 overflow-hidden border border-[#dedbc8]/15 bg-[#0a0a08]"
        onWheel={(e) => {
          e.preventDefault()
          setZoom((z) => Math.min(2, Math.max(0.6, z - e.deltaY * 0.001)))
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          setPan({
            x: drag.current.px + (e.clientX - drag.current.x),
            y: drag.current.py + (e.clientY - drag.current.y),
          })
        }}
        onPointerUp={() => {
          drag.current = null
        }}
      >
        <svg
          width="100%"
          height="100%"
          className="touch-none"
          style={{
            transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {RUNE_NODES.map((n) =>
            n.prereqs.map((p) => {
              const parent = RUNE_NODES.find((x) => x.id === p)
              if (!parent) return null
              return (
                <line
                  key={`${p}-${n.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="rgba(222,219,200,0.2)"
                  strokeWidth={1}
                />
              )
            }),
          )}
          {RUNE_NODES.map((n) => {
            const on = unlocked.includes(n.id)
            const can =
              !on &&
              n.prereqs.every((p) => unlocked.includes(p)) &&
              gold >= n.cost
            return (
              <g
                key={n.id}
                transform={`translate(${n.x},${n.y})`}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => can && unlockRune(n.id)}
                style={{ cursor: can ? 'pointer' : 'default' }}
              >
                <circle
                  r={12}
                  fill={on ? GROUPS[n.group] : '#1a1a18'}
                  stroke={GROUPS[n.group]}
                  strokeWidth={on || can ? 2 : 1}
                  opacity={on || can ? 1 : 0.4}
                />
                <text
                  textAnchor="middle"
                  y={4}
                  fontSize={8}
                  fill="#0c0c0a"
                  style={{ pointerEvents: 'none' }}
                >
                  {on ? '●' : n.cost}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {node && (
        <div className="border border-[#dedbc8]/15 p-2 text-[11px]">
          <div className="font-bold">{node.nameKey}</div>
          <div className="opacity-70">{node.descKey}</div>
          <div className="mt-1 opacity-50">
            {node.cost}g · {node.group}
          </div>
          {unlocked.includes(node.id) ? (
            <div className="text-[#5fd08a]">{t('unlocked')}</div>
          ) : (
            <button
              type="button"
              className="mt-1 border border-[#dedbc8]/30 px-2 py-0.5 disabled:opacity-30"
              disabled={
                !node.prereqs.every((p) => unlocked.includes(p)) ||
                gold < node.cost
              }
              onClick={() => unlockRune(node.id)}
            >
              {t('runeBuy')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
