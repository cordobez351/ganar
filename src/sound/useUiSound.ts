import type { SoundAsset } from './sound-types'
import { useSoundEnabled } from './preference'
import { useSound } from './use-sound'

/** Plays a UI sound unless the visitor has turned sound off. */
export function useUiSound(sound: SoundAsset, volume = 0.4) {
  const soundEnabled = useSoundEnabled()
  const [play] = useSound(sound, { volume, soundEnabled, interrupt: true })
  return play
}
