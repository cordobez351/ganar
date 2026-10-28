import { useEffect, useRef } from 'react'
import createGlobe, { type Marker } from 'cobe'

// Adapted from Magic UI's Globe (MIT): https://magicui.design/docs/components/globe

export type Lugar = { nombre: string; lat: number; lng: number }

interface LenguasGlobeProps {
  /** Every language with its places; the globe draws all of them. */
  lenguas: { lang: string; lugares: Lugar[] }[]
  /** The language to turn to, or null to drift. */
  activa: string | null
}

const TAU = Math.PI * 2
const CREMA: [number, number, number] = [0.87, 0.86, 0.78]
const TENUE: [number, number, number] = [0.42, 0.41, 0.36]

/** cobe's phi/theta that put a point in front of the camera. */
function enfocar(lat: number, lng: number): [number, number] {
  return [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

function centro(lugares: Lugar[]): [number, number] | null {
  if (lugares.length === 0) return null
  // Average on the unit sphere so places on both sides of 180° do not cancel out.
  let x = 0
  let y = 0
  let z = 0
  for (const { lat, lng } of lugares) {
    const a = (lat * Math.PI) / 180
    const b = (lng * Math.PI) / 180
    x += Math.cos(a) * Math.cos(b)
    y += Math.cos(a) * Math.sin(b)
    z += Math.sin(a)
  }
  const lng = (Math.atan2(y, x) * 180) / Math.PI
  const lat = (Math.atan2(z, Math.hypot(x, y)) * 180) / Math.PI
  return enfocar(lat, lng)
}

export function LenguasGlobe({ lenguas, activa }: LenguasGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const estado = useRef({
    phi: 0,
    theta: 0.3,
    foco: null as [number, number] | null,
    markers: [] as Marker[],
    nuevos: false,
    arrastre: null as number | null,
    empuje: 0,
  })

  // Markers and the focus point follow the open language.
  useEffect(() => {
    const s = estado.current
    const elegida = lenguas.find((l) => l.lang === activa)
    s.foco = elegida ? centro(elegida.lugares) : null
    s.markers = lenguas.flatMap(({ lang, lugares }) =>
      lugares.map(({ lat, lng }) => ({
        location: [lat, lng] as [number, number],
        size: lang === activa ? 0.09 : 0.035,
        color: lang === activa ? CREMA : TENUE,
      })),
    )
    s.nuevos = true
  }, [lenguas, activa])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = estado.current
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ancho = canvas.offsetWidth
    const onResize = () => {
      ancho = canvas.offsetWidth
    }
    window.addEventListener('resize', onResize)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: ancho * 2,
      height: ancho * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.02,
      baseColor: [0.22, 0.215, 0.19],
      markerColor: CREMA,
      glowColor: [0.16, 0.155, 0.13],
      markers: s.markers,
      onRender: (state) => {
        if (s.foco && s.arrastre === null) {
          const [fPhi, fTheta] = s.foco
          const adelante = (((fPhi - s.phi) % TAU) + TAU) % TAU
          const atras = (((s.phi - fPhi) % TAU) + TAU) % TAU
          const k = quieto ? 1 : 0.06
          s.phi += adelante < atras ? adelante * k : -atras * k
          s.theta += (fTheta - s.theta) * k
        } else if (s.arrastre === null) {
          if (!quieto) s.phi += 0.0025
          s.theta += (0.3 - s.theta) * 0.04
        }
        state.phi = s.phi + s.empuje
        state.theta = s.theta
        if (s.nuevos) {
          // cobe 0.6 counts updated markers as length, not length * 2, so its
          // shader only reads the first half. Sending the list twice draws all of it.
          state.markers = s.markers.concat(s.markers)
          s.nuevos = false
        }
        state.width = ancho * 2
        state.height = ancho * 2
      },
    })

    // Stop drawing while the globe is off screen.
    const io = new IntersectionObserver(([entry]) => globe.toggle(entry.isIntersecting))
    io.observe(canvas)
    requestAnimationFrame(() => {
      canvas.style.opacity = '1'
    })

    return () => {
      io.disconnect()
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const soltar = () => {
    const s = estado.current
    s.phi += s.empuje
    s.empuje = 0
    s.arrastre = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="aspect-square w-full cursor-grab opacity-0 transition-opacity duration-1000 [touch-action:pan-y]"
      onPointerDown={(e) => {
        estado.current.arrastre = e.clientX
        e.currentTarget.style.cursor = 'grabbing'
      }}
      onPointerMove={(e) => {
        const s = estado.current
        if (s.arrastre !== null) s.empuje = (e.clientX - s.arrastre) / 200
      }}
      onPointerUp={soltar}
      onPointerLeave={soltar}
      onPointerCancel={soltar}
    />
  )
}
