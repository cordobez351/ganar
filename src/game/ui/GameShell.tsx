import { useEffect, useState } from 'react'
import { navigate } from '../../router'
import { STAGE_BY_INDEX } from '../content/stages'
import { t } from '../content/strings'
import { partyDps } from '../engine/combat'
import { useGameSlice } from '../hooks/useGameSlice'
import { BattleCanvas } from '../render/BattleCanvas'
import { AchievementsPanel } from './AchievementsPanel'
import { CubePanel } from './CubePanel'
import { FrozenOverlay } from './FrozenOverlay'
import { HeroPanel } from './HeroPanel'
import { InventoryPanel } from './InventoryPanel'
import { OfflineReport } from './OfflineReport'
import { RunesPanel } from './RunesPanel'
import { SettingsPanel } from './SettingsPanel'
import { ShopPanel } from './ShopPanel'

type Panel =
  | 'heroes'
  | 'inv'
  | 'cube'
  | 'runes'
  | 'ach'
  | 'shop'
  | 'settings'
  | null

const DOCK: { id: Panel; label: string }[] = [
  { id: 'heroes', label: 'panelHeroes' },
  { id: 'inv', label: 'panelInv' },
  { id: 'cube', label: 'panelCube' },
  { id: 'runes', label: 'panelRunes' },
  { id: 'ach', label: 'panelAch' },
  { id: 'shop', label: 'panelShop' },
  { id: 'settings', label: 'panelSettings' },
]

export function GameShell() {
  const [panel, setPanel] = useState<Panel>('heroes')
  const gold = useGameSlice((s) => s.gold)
  const stageIndex = useGameSlice((s) => s.stageIndex)
  const difficulty = useGameSlice((s) => s.difficulty)
  const waveIndex = useGameSlice((s) => s.waveIndex)
  const kills = useGameSlice((s) => s.totalKills)
  const snapshot = useGameSlice((s) => s)
  const stage = STAGE_BY_INDEX[stageIndex]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanel(null)
      const map: Record<string, Panel> = {
        '1': 'heroes',
        '2': 'inv',
        '3': 'cube',
        '4': 'runes',
        '5': 'ach',
        '6': 'shop',
        '7': 'settings',
      }
      if (map[e.key]) setPanel(map[e.key]!)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="juego-shell flex h-[100dvh] flex-col overflow-hidden bg-[#050505] text-[#dedbc8]">
      <header className="flex items-center justify-between gap-3 border-b border-[#dedbc8]/15 px-3 py-2 text-[11px] sm:px-4">
        <button
          type="button"
          className="opacity-60 hover:opacity-100"
          onClick={() => navigate('/')}
        >
          {t('backToSite')}
        </button>
        <div className="font-serif text-sm tracking-wide sm:text-base">
          {t('gameTitle')}
        </div>
        <div className="flex items-center gap-3 tabular-nums">
          <span className="text-[#c9a227]">
            {t('gold')}: {gold}
          </span>
          <button
            type="button"
            className="opacity-60 hover:opacity-100"
            onClick={() => setPanel('settings')}
          >
            {t('settings')}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
        <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center bg-[#0a0a08]">
          <div className="pointer-events-none absolute left-3 top-2 z-10 text-[10px] opacity-70 sm:text-[11px]">
            <div>
              {t('act')} {stage?.act ?? 1} · {stage?.nameKey}
            </div>
            <div>
              {t('difficulty')}: {t(`diff_${difficulty}` as 'diff_vencer')} ·{' '}
              {t('wave')} {waveIndex + 1}
            </div>
            <div>
              {t('offlineKills')}: {kills} · {t('partyDps')}:{' '}
              {partyDps(snapshot).toFixed(1)}
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center p-2">
            <BattleCanvas />
          </div>
        </main>

        <aside
          className={`border-[#dedbc8]/15 bg-[#0c0c0a] sm:w-[340px] sm:border-l ${
            panel
              ? 'fixed inset-0 z-40 flex flex-col sm:static sm:z-auto'
              : 'hidden sm:flex sm:flex-col'
          }`}
        >
          {panel && (
            <>
              <div className="flex items-center justify-between border-b border-[#dedbc8]/15 px-3 py-2 text-[12px]">
                <span>{t(DOCK.find((d) => d.id === panel)!.label as 'panelHeroes')}</span>
                <button
                  type="button"
                  className="sm:hidden"
                  onClick={() => setPanel(null)}
                >
                  {t('close')}
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-3">
                {panel === 'heroes' && <HeroPanel />}
                {panel === 'inv' && <InventoryPanel />}
                {panel === 'cube' && <CubePanel />}
                {panel === 'runes' && <RunesPanel />}
                {panel === 'ach' && <AchievementsPanel />}
                {panel === 'shop' && <ShopPanel />}
                {panel === 'settings' && <SettingsPanel />}
              </div>
            </>
          )}
          {!panel && (
            <div className="hidden p-4 text-[11px] opacity-40 sm:block">
              Elegí un panel abajo (teclas 1–7).
            </div>
          )}
        </aside>
      </div>

      <nav className="flex flex-wrap justify-center gap-1 border-t border-[#dedbc8]/15 px-2 py-2">
        {DOCK.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setPanel((p) => (p === d.id ? null : d.id))}
            className={`border px-2 py-1 text-[10px] sm:text-[11px] ${
              panel === d.id
                ? 'border-[#dedbc8] bg-[#dedbc8]/10'
                : 'border-[#dedbc8]/20 opacity-70'
            }`}
          >
            {t(d.label as 'panelHeroes')}
          </button>
        ))}
      </nav>

      <OfflineReport />
      <FrozenOverlay />
    </div>
  )
}
