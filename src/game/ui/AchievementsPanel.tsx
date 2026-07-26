import { ACHIEVEMENTS } from '../content/achievements'
import { t } from '../content/strings'
import { claimAchievement } from '../engine/actions'
import { useGameSlice } from '../hooks/useGameSlice'

export function AchievementsPanel() {
  const unlocked = useGameSlice((s) => s.achievements)
  const claimed = useGameSlice((s) => s.achievementRewardsClaimed)

  return (
    <div className="juego-panel max-h-[60vh] space-y-2 overflow-auto">
      <div className="text-[11px] opacity-60">
        {unlocked.length}/{ACHIEVEMENTS.length} {t('unlocked').toLowerCase()}
      </div>
      {ACHIEVEMENTS.map((a) => {
        const on = unlocked.includes(a.id)
        const done = claimed.includes(a.id)
        return (
          <div
            key={a.id}
            className={`border p-2 text-[11px] ${
              on ? 'border-[#dedbc8]/30' : 'border-[#dedbc8]/10 opacity-50'
            }`}
          >
            <div className="font-bold">{a.nameKey}</div>
            <div className="opacity-70">{a.descKey}</div>
            {a.rewardGold != null && (
              <div className="mt-1 text-[#c9a227]">
                {t('reward')}: {a.rewardGold}g
              </div>
            )}
            {on && !done && (
              <button
                type="button"
                className="mt-1 border border-[#c9a227]/40 px-2 py-0.5 text-[#c9a227]"
                onClick={() => claimAchievement(a.id)}
              >
                {t('claim')}
              </button>
            )}
            {done && (
              <div className="mt-1 text-[#5fd08a] text-[10px]">✓</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
