import { useEffect, useState } from 'react'

interface CanonViewProps {
  open: boolean
  onClose: () => void
}

export function CanonView({ open, onClose }: CanonViewProps) {
  const [texto, setTexto] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open || texto !== null || error) return
    fetch('/ganar.md')
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then(setTexto)
      .catch(() => setError(true))
  }, [open, texto, error])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ganar.md — canon"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="manuscript-label">ganar.md — lo que lee un agente</p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-primary/60 transition-colors hover:text-primary sm:text-sm"
          >
            cerrar ×
          </button>
        </div>
        <div className="manuscript-rule mb-4" />
        <pre className="canon-pre flex-1 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-primary/80 sm:text-sm">
          {error ? 'No se pudo cargar /ganar.md' : (texto ?? 'cargando…')}
        </pre>
        <div className="manuscript-rule mt-4" />
        <p className="mt-3 text-[0.6rem] text-gray-500 sm:text-xs">
          mismo canon, otra lectura ·{' '}
          <a href="/ganar.md" className="text-primary/70 transition-colors hover:text-primary">
            abrir crudo
          </a>
        </p>
      </div>
    </div>
  )
}
