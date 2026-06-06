import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(join(__dirname, '../public/og.svg'))

await sharp(svg)
  .resize(1200, 630)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(join(__dirname, '../public/og.png'))

console.log('Generated public/og.png (1200×630)')
