# bits

Third-party components copied into the repo as source. Lint skips this folder
(see `eslint.config.js`); keep local edits small and listed here.

| File | Source | License |
| --- | --- | --- |
| AnimatedContent, ClickSpark, CurvedLoop, DecryptedText, FuzzyText, LetterGlitch, LightRays, ShinyText, Shuffle, SpotlightCard, Threads | [React Bits](https://github.com/DavidHDev/react-bits) (TS + Tailwind) | MIT + Commons Clause, © David Haz |
| DiamondOrbitSmoothLoader | [AtomLoader](https://github.com/HimanshuTamoli24/loader) | MIT, © Himanshu Tamoli |

Local edits:

- `CurvedLoop`: removed `min-h-screen` from the wrapper and `uppercase` from the SVG.
- `Shuffle`: removed the forced `uppercase text-[4rem]` classes.
- `DiamondOrbitSmoothLoader`: removed the `"use client"` line.

Sounds in `src/sound/` come from [soundcn](https://github.com/kapishdima/soundcn)
(MIT); the clips are CC0 by Kenney.
