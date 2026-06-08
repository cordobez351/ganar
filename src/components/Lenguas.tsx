import { SectionLabel } from './SectionLabel'

type LenguaIntro = {
  headword: string
  pronunciation?: string
  headwordLine: string
  description: string
  tagline: string
  states: string
  reference: {
    label: string
    site: string
    canon: string
    humans: string
    agents: string
  }
}

type LenguaEntry = {
  lang: string
  intro: LenguaIntro
  forma: string
  clase: string
  etimologia?: string
  sentidos: string[]
  nota?: string
}

const LENGUAJES: LenguaEntry[] = [
  {
    lang: 'Asturiano',
    intro: {
      headword: 'ganar',
      pronunciation: '/ɡaˈnaɾ/',
      headwordLine: 'ganar /ɡaˈnaɾ/ — verbu transitivu del asturianu.',
      description:
        'ganar.com.ar ye un rexistru filosóficu y manuscritu sobre\'l verbu ganar: aceiciones, etimoloxía, locuciones, otres llingües y estados posibles. Nun ye un productu nin un serviciu; ye una referencia canónica publicada na web.',
      tagline: 'posibilidaes. eleición.',
      states:
        'Cada usu del verbu escueye un estáu ente munches — llograr, merecer, consiguir, triunfar, vencer, cobrar, conquistar, ceder, capitular, renunciar, fracasar, sucumbir, perder — ensin xerarquía impuesta.',
      reference: {
        label: 'Referencia',
        site: 'Sitiu',
        canon: 'Canon',
        humans: 'Humanos',
        agents: 'Axentes',
      },
    },
    forma: 'ganar',
    clase: 'verbu',
    etimologia:
      'Del vieyu leonés ganar; llatín medieval ganāre. Pariente del castellán ganar.',
    sentidos: ['vencer', 'ganar', 'obtener', 'recibir', 'galiar'],
    nota: 'Indicativu presente 1.ª pers. gano; participiu ganáu.',
  },
  {
    lang: 'Español',
    intro: {
      headword: 'ganar',
      pronunciation: '/ɡaˈnaɾ/',
      headwordLine: 'ganar /ɡaˈnaɾ/ — verbo transitivo del español.',
      description:
        'ganar.com.ar es un registro filosófico y manuscrito sobre el verbo ganar: acepciones, etimología, locuciones, otras lenguas y estados posibles. No es un producto ni un servicio; es una referencia canónica publicada en la web.',
      tagline: 'posibilidades. elección.',
      states:
        'Cada uso del verbo elige un estado entre muchos — lograr, merecer, conseguir, triunfar, vencer, cobrar, conquistar, ceder, capitular, renunciar, fracasar, sucumbir, perder — sin jerarquía impuesta.',
      reference: {
        label: 'Referencia',
        site: 'Sitio',
        canon: 'Canon',
        humans: 'Humanos',
        agents: 'Agentes',
      },
    },
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
    intro: {
      headword: 'ganar',
      headwordLine: 'ganar — vervo transitivo del ladino.',
      description:
        'ganar.com.ar es un registro filosofiko i manuskrito sovra el vervo ganar: asepsiones, etimolojia, espressiones, otras linguas i estados posibles. No es un produkto ni un servisio; es una referensia canonical publicada en la red.',
      tagline: 'posibilidades. eleksion.',
      states:
        'Kada uzo del vervo eskoje un estado entre munchos — lograr, mereser, konsiguir, triunfar, venser, kobrar, konquistar, seder, kapituular, renunsyar, frakasar, sukumbir, perder — sin jeararkia impuesta.',
      reference: {
        label: 'Referensia',
        site: 'Sitio',
        canon: 'Canon',
        humans: 'Umanos',
        agents: 'Agentes',
      },
    },
    forma: 'ganar',
    clase: 'vervo',
    sentidos: ['granjear', 'venser'],
  },
  {
    lang: 'Ido',
    intro: {
      headword: 'ganar',
      headwordLine: 'ganar — transitiva verbo en Ido.',
      description:
        'ganar.com.ar esas filozofiala e manuskriptala registro pri la verbo ganar: senci, etimologio, locucioni, altra lingui e posibla stati. Ol ne esas produkto o servado; ol esas kanonala refero publikigita en la reto.',
      tagline: 'posibligi. selekto.',
      states:
        'Omna uzo di la verbo selektas stato inter multa — sucesar, meritar, obtenar, triumphar, vinkar, enkasar, konquestar, cedir, kapitular, rezignar, faliar, sucumbir, perdar — sen impozita hierarkio.',
      reference: {
        label: 'Refero',
        site: 'Sitio',
        canon: 'Kanon',
        humans: 'Homini',
        agents: 'Agenti',
      },
    },
    forma: 'ganar',
    clase: 'verbo',
    sentidos: ['vinkar', 'meritagar'],
    nota: 'Antonomo: perdar.',
  },
  {
    lang: 'Malayo',
    intro: {
      headword: 'ganar',
      headwordLine: 'ganar — kata adjektif dalam bahasa Melayu.',
      description:
        'ganar.com.ar ialah rekod falsafah dan manuskrip tentang perkataan ganar: erti, etimologi, ungkapan, bahasa lain dan keadaan yang mungkin. Ia bukan produk mahupun perkhidmatan; ia ialah rujukan kanonik yang diterbitkan di web.',
      tagline: 'kemungkinan. pilihan.',
      states:
        'Setiap penggunaan memilih keadaan antara banyak — mencapai, layak, memperoleh, menang, mengalahkan, mengutip, menakluk, menyerah, mengaku kalah, melepaskan, gagal, tunduk, kalah — tanpa hierarki yang dipaksakan.',
      reference: {
        label: 'Rujukan',
        site: 'Laman',
        canon: 'Kanon',
        humans: 'Manusia',
        agents: 'Ejen',
      },
    },
    forma: 'ganar',
    clase: 'kata adjektif',
    etimologia: 'Kemungkinan pinjaman daripada Minangkabau.',
    sentidos: ['pening', 'pening kepala', 'keliru'],
    nota: 'Sebagai kata nama, dalam garis lain: artileri, kanunir.',
  },
  {
    lang: 'Indonesio',
    intro: {
      headword: 'ganar',
      headwordLine: 'ganar — kata sifat dalam bahasa Indonesia.',
      description:
        'ganar.com.ar adalah catatan filosofis dan manuskrip tentang kata ganar: makna, etimologi, ungkapan, bahasa lain, dan kemungkinan keadaan. Bukan produk atau layanan; ini adalah referensi kanonik yang diterbitkan di web.',
      tagline: 'kemungkinan. pilihan.',
      states:
        'Setiap penggunaan memilih keadaan di antara banyak — mencapai, pantas, memperoleh, menang, mengalahkan, menerima, menakluk, menyerah, mengaku kalah, melepaskan, gagal, menyerah, kalah — tanpa hierarki yang dipaksakan.',
      reference: {
        label: 'Referensi',
        site: 'Situs',
        canon: 'Kanon',
        humans: 'Manusia',
        agents: 'Agen',
      },
    },
    forma: 'ganar',
    clase: 'kata sifat',
    etimologia: 'Diwarisi dari bahasa Melayu ganar.',
    sentidos: ['pusing', 'pening', 'bingung'],
    nota: 'Varian tidak baku: gana.',
  },
  {
    lang: 'Yagara',
    intro: {
      headword: 'ganar',
      headwordLine: 'ganar — yagaradul numeral dhawun.',
      description:
        'ganar.com.ar — yagaradul ganar verbo kuypa wanggarrang filosofikal manuscrito. Acepciones, etimologia, locuciones, barranggulli dhawun, garrigarrang states. Product nil, service nil; canonical reference web-la published.',
      tagline: 'garrigarrang. choice.',
      states:
        'Verb use — state chosen from many — lograr, merecer, conseguir, triunfar, vencer, cobrar, conquistar, ceder, capitular, renunciar, fracasar, sucumbir, perder — hierarchy nil imposed.',
      reference: {
        label: 'Reference',
        site: 'Site',
        canon: 'Canon',
        humans: 'Humans',
        agents: 'Agents',
      },
    },
    forma: 'ganar',
    clase: 'numeral',
    sentidos: ['kunnar-garrigarrang alternate form'],
    nota: 'Attested variant; Yuggera resources limited.',
  },
]

function IntroReference({ intro }: { intro: LenguaIntro }) {
  const { reference } = intro
  return (
    <div className="mt-4 text-xs leading-relaxed text-gray-500 sm:text-sm">
      <p className="manuscript-label mb-2">{reference.label}</p>
      <ul className="space-y-1">
        <li>
          {reference.site}:{' '}
          <a
            href="https://ganar.com.ar"
            className="text-primary/80 transition-colors hover:text-primary"
          >
            https://ganar.com.ar
          </a>
        </li>
        <li>
          {reference.canon}:{' '}
          <a href="/ganar.md" className="text-primary/80 transition-colors hover:text-primary">
            ganar.md
          </a>
        </li>
        <li>
          {reference.humans}:{' '}
          <a href="/humans.txt" className="text-primary/80 transition-colors hover:text-primary">
            humans.txt
          </a>
        </li>
        <li>
          {reference.agents}:{' '}
          <a href="/skill.md" className="text-primary/80 transition-colors hover:text-primary">
            skill.md
          </a>
          {' · '}
          <a href="/spec.md" className="text-primary/80 transition-colors hover:text-primary">
            spec.md
          </a>
          {' · '}
          <a href="/llms.txt" className="text-primary/80 transition-colors hover:text-primary">
            llms.txt
          </a>
        </li>
      </ul>
    </div>
  )
}

function LenguaPanel({ item }: { item: LenguaEntry }) {
  return (
    <div className="space-y-4 border-t border-primary/10 px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
      <div>
        <p className="font-serif text-2xl lowercase text-primary sm:text-3xl">
          {item.intro.headword}
        </p>
        {item.intro.pronunciation && (
          <p className="mt-1 font-serif text-sm italic text-primary/60 sm:text-base">
            {item.intro.pronunciation}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-primary/80 sm:text-base">
          {item.intro.headwordLine}
        </p>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-primary/80 sm:text-base">
        <p>{item.intro.description}</p>
        <p className="text-xs lowercase text-primary/70 sm:text-sm">{item.intro.tagline}</p>
        <p>{item.intro.states}</p>
      </div>

      <IntroReference intro={item.intro} />

      <div className="manuscript-rule" />

      <div>
        <p className="font-serif text-base italic lowercase text-primary sm:text-lg">
          {item.forma} {item.clase}
        </p>

        {item.etimologia && (
          <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
            {item.etimologia}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-primary/90 sm:text-base">
          {item.sentidos.join(' · ')}
        </p>

        {item.nota && (
          <p className="mt-2 text-xs text-gray-500 sm:text-sm">{item.nota}</p>
        )}
      </div>
    </div>
  )
}

export function Lenguas() {
  return (
    <section id="lenguas" className="scroll-mt-8 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel folio="f. 03" label="En otras lenguas" />
        <div className="manuscript-rule mb-10" />

        <ul className="space-y-2">
          {LENGUAJES.map((item) => (
            <li key={item.lang} className="codex-card overflow-hidden">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <p className="manuscript-label">{item.lang}</p>
                    <p className="mt-1 font-serif text-base italic lowercase text-primary/80 sm:text-lg">
                      {item.forma} {item.clase}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-sm text-primary/40 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <LenguaPanel item={item} />
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
