/**
 * Determinism check: seeded RNG + fixed ticks → identical gold/EXP.
 * Run: npm run sim
 */

function nextRng(state) {
  let t = (state + 0x6d2b79f5) >>> 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return { value: ((t ^ (t >>> 14)) >>> 0) / 4294967296, state: t >>> 0 }
}

function simulate(seed, ticks) {
  let rng = seed >>> 0
  let gold = 0
  let exp = 0
  let hp = 100
  let monHp = 40
  for (let i = 0; i < ticks; i++) {
    const hit = nextRng(rng)
    rng = hit.state
    const dmg = 8 + Math.floor(hit.value * 4)
    monHp -= dmg
    if (monHp <= 0) {
      const g = nextRng(rng)
      rng = g.state
      gold += 3 + Math.floor(g.value * 5)
      exp += 8
      monHp = 40 + Math.floor(i / 50)
    }
    const retal = nextRng(rng)
    rng = retal.state
    if (retal.value < 0.3) hp -= 2
    if (hp <= 0) hp = 100
  }
  return { gold, exp, rng }
}

const a = simulate(0xc0ffee, 600)
const b = simulate(0xc0ffee, 600)
if (a.gold !== b.gold || a.exp !== b.exp || a.rng !== b.rng) {
  console.error('FAIL: non-deterministic', a, b)
  process.exit(1)
}
console.log('OK: 60s replay gold=%d exp=%d', a.gold, a.exp)
