import { ESTADOS } from '../constants/estados'
import CurvedLoop from './bits/CurvedLoop'

const TEXTO = ESTADOS.map((e) => e.palabra).join(' · ')

export function EstadosLoop() {
  return (
    <div className="relative z-10 py-6 font-serif italic md:py-10" aria-hidden>
      <div className="bits-font">
        <CurvedLoop
          marqueeText={TEXTO}
          speed={1.2}
          curveAmount={120}
          fontSize={56}
          fontWeight={400}
          direction="left"
          interactive
          color="#DEDBC8"
          separator="·"
          separatorColor="rgba(222, 219, 200, 0.35)"
          edgeFade={0.18}
          scrollBoost={1.5}
        />
      </div>
    </div>
  )
}
