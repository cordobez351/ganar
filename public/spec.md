# ganar.com.ar — spec

> Especificacion tecnica y estructural del sitio.
> URL: https://ganar.com.ar

## Proposito

Registro del verbo espanol **ganar** (/ga'nar/, IPA ɡaˈnaɾ).

Estados posibles. Eleccion propia.

Audiencias: humanos (pagina) y agentes (archivos markdown/texto).

## Stack

| Capa | Tecnologia |
|------|------------|
| Build | Vite 8 |
| UI | React 18, TypeScript |
| Estilos | Tailwind CSS 3 |
| Scroll | Lenis |
| Fuentes | @fontsource/almarai, @fontsource/instrument-serif |

## Estructura de pagina

| Seccion | id | folio | Contenido |
|---------|-----|-------|-----------|
| Hero | — | — | ganar*, /ɡaˈnaɾ/, posibilidades. eleccion. |
| Acepciones | acepciones | f. 01 | 4 acepciones, locuciones |
| Historia | historia | f. 02 | Etimologia |
| Lenguas | lenguas | f. 03 | Asturiano, espanol, ladino, ido, malayo, indonesio, yagara |
| Estados | estados | f. 04 | 13 estados |
| Registro | registro | f. 05 | Enlaces a archivos |
| Footer | — | — | Navegacion archivos |

## Archivos publicos

| Archivo | Tipo | Funcion |
|---------|------|---------|
| ganar.md | markdown | Referencia canonica del verbo |
| skill.md | markdown | Skill operativo para agentes |
| spec.md | markdown | Esta especificacion |
| llms.txt | text | Indice y resumen para LLM |
| humans.txt | text | Info para humanos |
| robots.txt | text | Politica de crawlers |
| sitemap.xml | xml | Mapa del sitio |
| og.png | image | Open Graph (generado de og.svg) |

## Assets locales

| Ruta | Uso |
|------|-----|
| /videos/hero.mp4 | Video hero (loop, autoplay) |
| /videos/scroll-ambient.mp4 | Video scroll-scrub lateral |
| /favicon.svg | Favicon |
| /logo.svg | Logo, apple-touch-icon |
| /og.svg | Fuente OG image |

Constantes: `src/constants/media.ts`

## Comportamiento

- **Hero**: video local en loop, flush arriba, rounded solo abajo.
- **Scroll ambient**: video local en loop, fijo detras del contenido; aparece al salir del hero. Sin scroll-scrub ni seek por scroll.

## Convenciones de copy

- Sin marketing ni retorica prescriptiva.
- Sin how/why impuestos al lector.
- Estados listados sin jerarquia moral.
- Archivos en `public/` usan ASCII sin acentos (evitar mojibake).

## SEO / GEO

- JSON-LD: WebSite, DefinedTermSet, DefinedTerm, WebPage, FAQPage
- canonical, hreflang es-AR / es
- Crawlers AI permitidos en robots.txt
- noscript con contenido crawlable en index.html

## Build

```bash
npm run dev
npm run build   # incluye og:generate
```

## Enlaces

- https://ganar.com.ar
- https://ganar.com.ar/ganar.md
- https://ganar.com.ar/skill.md
- https://ganar.com.ar/spec.md
- https://ganar.com.ar/llms.txt
