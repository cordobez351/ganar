import { SectionLabel } from './SectionLabel'

const LENGUAJES = [
  {
    lang: 'Asturiano',
    forma: 'ganar',
    clase: 'verbo',
    etimologia: 'Del leonés antiguo ganar; latín medieval ganāre. Pariente del español ganar.',
    sentidos: ['vencer', 'ganar', 'obtener', 'recibir', 'batir'],
    nota: 'Indicativo presente 1.ª pers. gano; participio ganáu.',
  },
  {
    lang: 'Español',
    forma: 'ganar',
    clase: 'verbo',
    etimologia: 'Del español antiguo ganar; latín medieval ganāre.',
    sentidos: [
      'ganar, obtener',
      'granjear',
      'vencer (deporte)',
      'derrotar',
      'alcanzar',
    ],
    nota: 'Reflexivo: ganarse algo. En Chile, reflexivo: ubicarse, situarse.',
  },
  {
    lang: 'Ladino',
    forma: 'ganar',
    clase: 'verbo',
    sentidos: ['granjear', 'vencer'],
  },
  {
    lang: 'Ido',
    forma: 'ganar',
    clase: 'verbo',
    sentidos: ['vencer', 'granjear'],
    nota: 'Antónimo: perdar.',
  },
  {
    lang: 'Malayo',
    forma: 'ganar',
    clase: 'adjetivo',
    etimologia: 'Posible préstamo del minangkabau.',
    sentidos: ['mareado', 'aturdido', 'confuso'],
    nota: 'Como sustantivo, en otra línea: artillero, cañonero.',
  },
  {
    lang: 'Indonesio',
    forma: 'ganar',
    clase: 'adjetivo',
    etimologia: 'Heredado del malayo ganar.',
    sentidos: ['mareado', 'aturdido', 'confuso'],
    nota: 'Variante no estándar: gana.',
  },
  {
    lang: 'Yagara',
    forma: 'ganar',
    clase: 'numeral',
    sentidos: ['forma alternativa de kunnar'],
  },
]

export function Lenguas() {
  return (
    <section id="lenguas" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel folio="f. 03" label="En otras lenguas" />
        <div className="manuscript-rule mb-10" />

        <ul className="space-y-6">
          {LENGUAJES.map((item) => (
            <li key={item.lang} className="codex-card px-5 py-5 sm:px-7 sm:py-6">
              <div className="mb-3">
                <p className="manuscript-label mb-1">{item.lang}</p>
                <p className="font-serif text-base italic lowercase text-primary sm:text-lg">
                  {item.forma} {item.clase}
                </p>
              </div>

              {item.etimologia && (
                <p className="text-xs leading-relaxed text-gray-500 sm:text-sm">
                  {item.etimologia}
                </p>
              )}

              <p className="mt-3 text-sm leading-relaxed text-primary/90 sm:text-base">
                {item.sentidos.join(' · ')}
              </p>

              {item.nota && (
                <p className="mt-2 text-xs text-gray-500 sm:text-sm">{item.nota}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
