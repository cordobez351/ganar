# bits

Third-party components copied into the repo as source. Lint skips this folder
(see `eslint.config.js`); keep local edits small and listed here.

| File | Source | License |
| --- | --- | --- |
| AnimatedContent, ClickSpark, CurvedLoop, DecryptedText, FuzzyText, LetterGlitch, LightRays, ShinyText, Shuffle, SpotlightCard, Threads | [React Bits](https://github.com/DavidHDev/react-bits) (TS + Tailwind) | MIT + Commons Clause, © David Haz |
| DiamondOrbitSmoothLoader | [AtomLoader](https://github.com/HimanshuTamoli24/loader) | MIT, © Himanshu Tamoli |
| AnimatedBeam, Highlighter | [Magic UI](https://github.com/magicuidesign/magicui) | MIT, © Magic UI |

Local edits:

- `CurvedLoop`: removed `min-h-screen` from the wrapper and `uppercase` from the SVG.
- `Shuffle`: removed the forced `uppercase text-[4rem]` classes.
- `DiamondOrbitSmoothLoader`: removed the `"use client"` line.
- `AnimatedBeam`: replaced `cn()` with a template string.
- `Highlighter`: added a `delay` prop; the wrapper is `inline` (was `inline-block`)
  so marks follow the letters instead of the full line height.

Outside this folder, also after Magic UI (MIT): `LenguasGlobe` (Globe, on
[cobe](https://github.com/shuding/cobe)), `AgentTerminal` (Terminal look), and
`ScrollProgress`. `AgentTerminal` uses [agentfaces](https://github.com/ajibadedapo/agentfaces) (MIT).

Full license texts: `LICENSES.md`.

Sounds in `src/sound/` come from [soundcn](https://github.com/kapishdima/soundcn)
(MIT); the clips are CC0 by Kenney.
