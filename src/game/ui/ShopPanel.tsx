import { DIFFICULTIES } from '../types'
import { t } from '../content/strings'
import {
  buyExpTome,
  buyHeal,
  buyHeroSlot,
  setDifficulty,
} from '../engine/actions'
import { useGameSlice } from '../hooks/useGameSlice'

export function ShopPanel() {
  const gold = useGameSlice((s) => s.gold)
  const slots = useGameSlice((s) => s.heroSlots)
  const difficulty = useGameSlice((s) => s.difficulty)

  return (
    <div className="juego-panel space-y-3 text-[11px]">
      <p className="opacity-60">{t('shopHint')}</p>
      <div className="opacity-80">
        {t('gold')}: {gold}
      </div>

      <button
        type="button"
        className="block w-full border border-[#dedbc8]/25 px-2 py-2 text-left disabled:opacity-30"
        disabled={gold < 30}
        onClick={() => buyHeal()}
      >
        {t('buyHeal')} — 30g
      </button>
      <button
        type="button"
        className="block w-full border border-[#dedbc8]/25 px-2 py-2 text-left disabled:opacity-30"
        disabled={gold < 80}
        onClick={() => buyExpTome()}
      >
        {t('buyExp')} — 80g
      </button>
      <button
        type="button"
        className="block w-full border border-[#dedbc8]/25 px-2 py-2 text-left disabled:opacity-30"
        disabled={gold < 250 * slots || slots >= 7}
        onClick={() => buyHeroSlot()}
      >
        {t('buyHeroSlot')} — {250 * slots}g ({slots}/7)
      </button>

      <div className="border-t border-[#dedbc8]/15 pt-2">
        <div className="mb-1 opacity-50">{t('difficulty')}</div>
        <div className="flex flex-wrap gap-1">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`border px-2 py-1 ${
                difficulty === d
                  ? 'border-[#dedbc8]'
                  : 'border-[#dedbc8]/20 opacity-60'
              }`}
            >
              {t(`diff_${d}` as 'diff_vencer')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
