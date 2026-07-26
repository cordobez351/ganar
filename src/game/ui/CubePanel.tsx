import { useState } from 'react'
import { t } from '../content/strings'
import {
  autoFillCube,
  craftCube,
  placeInCube,
  setCubeMode,
} from '../engine/actions'
import { findItem } from '../engine/combat'
import { useGameSlice } from '../hooks/useGameSlice'
import { ItemIcon } from './ItemIcon'
import { Tooltip } from './Tooltip'

export function CubePanel() {
  const cube = useGameSlice((s) => s.cube)
  const mode = useGameSlice((s) => s.cubeMode)
  const bag = useGameSlice((s) => s.bag)
  const snapshot = useGameSlice((s) => s)
  const [pick, setPick] = useState<string | null>(null)
  const [tip, setTip] = useState<{
    item: NonNullable<ReturnType<typeof findItem>>
    x: number
    y: number
  } | null>(null)

  return (
    <div className="juego-panel space-y-3">
      <select
        className="w-full border border-[#dedbc8]/25 bg-[#121210] px-2 py-1 text-[11px]"
        value={mode}
        onChange={(e) =>
          setCubeMode(e.target.value as 'sintesis' | 'anadir' | 'reroll')
        }
      >
        <option value="sintesis">{t('cubeModeSynth')}</option>
        <option value="anadir">{t('cubeModeAdd')}</option>
        <option value="reroll">{t('cubeModeReroll')}</option>
      </select>

      <div className="mx-auto grid w-max grid-cols-3 gap-1">
        {cube.map((uid, i) => {
          const item = uid ? findItem(snapshot, uid) : null
          return (
            <button
              key={i}
              type="button"
              className="flex h-12 w-12 items-center justify-center border border-[#dedbc8]/25 bg-[#0a0a08]"
              onClick={() => {
                if (uid) {
                  placeInCube(i, null)
                  return
                }
                if (pick) {
                  placeInCube(i, pick)
                  setPick(null)
                }
              }}
            >
              {item ? (
                <ItemIcon
                  item={item}
                  size={28}
                  onHover={(e) =>
                    setTip({ item, x: e.clientX, y: e.clientY })
                  }
                  onLeave={() => setTip(null)}
                />
              ) : (
                <span className="text-[9px] opacity-30">{i + 1}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="border border-[#dedbc8]/30 px-2 py-1 text-[11px]"
          onClick={() => autoFillCube()}
        >
          {t('cubeFill')}
        </button>
        <button
          type="button"
          className="border border-[#c9a227]/50 px-2 py-1 text-[11px] text-[#c9a227]"
          onClick={() => craftCube()}
        >
          {t('cubeCraft')}
        </button>
      </div>

      <div className="text-[10px] opacity-50">
        Elegí un objeto y tocá una celda vacía.
      </div>
      <div className="flex max-h-32 flex-wrap gap-1 overflow-auto">
        {bag.map((item) => (
          <ItemIcon
            key={item.uid}
            item={item}
            selected={pick === item.uid}
            size={28}
            onHover={(e) => setTip({ item, x: e.clientX, y: e.clientY })}
            onLeave={() => setTip(null)}
            onClick={() => setPick(item.uid)}
          />
        ))}
      </div>

      {tip && <Tooltip item={tip.item} x={tip.x} y={tip.y} />}
    </div>
  )
}
