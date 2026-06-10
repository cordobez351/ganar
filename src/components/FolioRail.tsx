import { useEffect, useState } from 'react'

const FOLIOS = [
  { id: 'acepciones', folio: 'f. 01', label: 'Acepciones' },
  { id: 'historia', folio: 'f. 02', label: 'Historia' },
  { id: 'lenguas', folio: 'f. 03', label: 'Lenguas' },
  { id: 'estados', folio: 'f. 04', label: 'Estados' },
  { id: 'registro', folio: 'f. 05', label: 'Puente' },
]

export function FolioRail() {
  const [visible, setVisible] = useState(false)
  const [activo, setActivo] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActivo(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const { id } of FOLIOS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Folios"
      className={`fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-500 lg:flex ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {FOLIOS.map(({ id, folio, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`group flex items-baseline gap-2 text-[0.6rem] tracking-[0.08em] transition-colors [font-variant:small-caps] ${
            activo === id ? 'text-primary/80' : 'text-primary/30 hover:text-primary/60'
          }`}
        >
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
          <span>{folio}</span>
        </a>
      ))}
    </nav>
  )
}
