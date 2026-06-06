interface SectionLabelProps {
  folio: string
  label: string
}

export function SectionLabel({ folio, label }: SectionLabelProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <span className="manuscript-label">{label}</span>
      <span className="manuscript-folio">{folio}</span>
    </div>
  )
}
