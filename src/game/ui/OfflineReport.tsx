import { t } from '../content/strings'
import { claimOffline } from '../engine/actions'
import { useGameSlice } from '../hooks/useGameSlice'
import { itemDisplayName } from '../content/items/generate'
import { ITEM_BASE_BY_ID } from '../content/items/bases'
import { UNIQUE_BY_ID } from '../content/items/uniques'

export function OfflineReport() {
  const report = useGameSlice((s) => s.pendingOffline)
  if (!report) return null

  const hours = (report.elapsedMs / 3600000).toFixed(1)

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4">
      <div className="juego-panel max-w-md space-y-3 border border-[#dedbc8]/30 bg-[#0c0c0a] p-4">
        <h2 className="font-serif text-lg text-[#dedbc8]">{t('offlineTitle')}</h2>
        <p className="text-[12px] opacity-70">
          {t('offlineBody')} ({hours} h)
        </p>
        <ul className="space-y-1 text-[12px]">
          <li>
            {t('offlineKills')}: {report.kills}
          </li>
          <li>
            {t('offlineGold')}: {report.gold}
          </li>
          <li>
            {t('offlineExp')}: {report.exp}
          </li>
        </ul>
        {report.items.length > 0 && (
          <div>
            <div className="mb-1 text-[11px] opacity-50">{t('offlineItems')}</div>
            <ul className="max-h-32 overflow-auto text-[11px]">
              {report.items.map((item) => {
                const base = ITEM_BASE_BY_ID[item.baseId]
                const unique = item.uniqueId
                  ? UNIQUE_BY_ID[item.uniqueId]
                  : undefined
                const name =
                  unique?.nameKey ??
                  itemDisplayName(base?.nameKey ?? '?', item.rarity)
                return <li key={item.uid}>· {name}</li>
              })}
            </ul>
          </div>
        )}
        <button
          type="button"
          className="w-full border border-[#c9a227]/50 py-2 text-[#c9a227]"
          onClick={() => claimOffline()}
        >
          {t('claim')}
        </button>
      </div>
    </div>
  )
}
