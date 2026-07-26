import { useState } from 'react'
import { t } from '../content/strings'
import { updateSettings } from '../engine/actions'
import { useGameSlice } from '../hooks/useGameSlice'
import {
  exportSaveString,
  importSaveString,
  resetSave,
} from '../save/persist'

export function SettingsPanel() {
  const settings = useGameSlice((s) => s.settings)
  const [importText, setImportText] = useState('')
  const [msg, setMsg] = useState('')

  return (
    <div className="juego-panel space-y-3 text-[11px]">
      <label className="flex items-center justify-between gap-2">
        <span>{t('speed')}</span>
        <input
          type="range"
          min={0.5}
          max={3}
          step={0.5}
          value={settings.speed}
          onChange={(e) => updateSettings({ speed: Number(e.target.value) })}
        />
        <span>{settings.speed}x</span>
      </label>

      <label className="flex items-center justify-between gap-2">
        <span>{t('sound')}</span>
        <input
          type="checkbox"
          checked={settings.sound}
          onChange={(e) => updateSettings({ sound: e.target.checked })}
        />
      </label>

      <label className="flex items-center justify-between gap-2">
        <span>{t('pixelScale')}</span>
        <select
          className="border border-[#dedbc8]/25 bg-[#121210] px-1"
          value={settings.pixelScale}
          onChange={(e) =>
            updateSettings({ pixelScale: Number(e.target.value) })
          }
        >
          <option value={0}>Auto</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
          <option value={4}>4x</option>
        </select>
      </label>

      <label className="flex items-center justify-between gap-2">
        <span>{t('stashInCube')}</span>
        <input
          type="checkbox"
          checked={settings.stashInCube}
          onChange={(e) => updateSettings({ stashInCube: e.target.checked })}
        />
      </label>

      <label className="flex items-center justify-between gap-2">
        <span>Menos movimiento</span>
        <input
          type="checkbox"
          checked={settings.reducedMotion}
          onChange={(e) =>
            updateSettings({ reducedMotion: e.target.checked })
          }
        />
      </label>

      <div className="border-t border-[#dedbc8]/15 pt-2 space-y-2">
        <button
          type="button"
          className="w-full border border-[#dedbc8]/30 px-2 py-1"
          onClick={async () => {
            const s = exportSaveString()
            await navigator.clipboard.writeText(s)
            setMsg('Exportado al portapapeles')
          }}
        >
          {t('exportSave')}
        </button>
        <textarea
          className="h-16 w-full border border-[#dedbc8]/20 bg-[#0a0a08] p-1 font-mono text-[10px]"
          placeholder="Pegá la partida aquí…"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
        />
        <button
          type="button"
          className="w-full border border-[#dedbc8]/30 px-2 py-1"
          onClick={() => {
            const r = importSaveString(importText.trim())
            setMsg(r.ok ? 'Importada' : r.error)
          }}
        >
          {t('importSave')}
        </button>
        <button
          type="button"
          className="w-full border border-[#ff4d6d]/40 px-2 py-1 text-[#ff4d6d]"
          onClick={() => {
            if (confirm('¿Borrar partida local?')) resetSave()
          }}
        >
          {t('resetSave')}
        </button>
        {msg && <div className="opacity-70">{msg}</div>}
      </div>
    </div>
  )
}
