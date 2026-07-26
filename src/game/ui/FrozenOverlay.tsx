import { t } from '../content/strings'
import { resumeFromFrozen } from '../engine/loop'
import { useGameSlice } from '../hooks/useGameSlice'

export function FrozenOverlay() {
  const phase = useGameSlice((s) => s.simPhase)
  if (phase !== 'frozen') return null
  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/60 p-4">
      <div className="juego-panel max-w-sm space-y-3 border border-[#dedbc8]/30 bg-[#0c0c0a] p-4 text-center">
        <h2 className="font-serif text-lg">{t('frozenTitle')}</h2>
        <p className="text-[12px] opacity-70">{t('frozenBody')}</p>
        <button
          type="button"
          className="border border-[#dedbc8]/40 px-4 py-2"
          onClick={() => resumeFromFrozen()}
        >
          {t('resume')}
        </button>
      </div>
    </div>
  )
}
