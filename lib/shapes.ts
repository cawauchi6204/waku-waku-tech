// Particle target shapes for the WAKU WAKU universe.
// Every generator returns a Float32Array of length count * 3.

export const SHAPE = {
  CORE: 0,
  GALAXY: 1,
  KNOT: 2,
  LATTICE: 3,
  WAVE: 4,
  DUST: 5,
  WORD: 6,
} as const

export const SHAPE_COUNT = 7

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-6)
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function core(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const theta = golden * i
    const shell = rand() < 0.78
    const r = shell ? 1.65 + gaussian(rand) * 0.035 : 1.65 * Math.cbrt(rand()) * 0.92
    out[i * 3] = Math.cos(theta) * ring * r
    out[i * 3 + 1] = y * r
    out[i * 3 + 2] = Math.sin(theta) * ring * r
  }
  return out
}

function galaxy(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  const arms = 3
  const tilt = 0.52
  const cosT = Math.cos(tilt)
  const sinT = Math.sin(tilt)
  for (let i = 0; i < count; i++) {
    const t = Math.pow(rand(), 0.7)
    const radius = 0.15 + t * 5.6
    const arm = (i % arms) * ((Math.PI * 2) / arms)
    const spread = gaussian(rand) * 0.32 * (1.1 - t * 0.6)
    const angle = arm + radius * 0.95 + spread
    const x = Math.cos(angle) * radius + gaussian(rand) * 0.08
    const z = Math.sin(angle) * radius + gaussian(rand) * 0.08
    const y = gaussian(rand) * 0.12 * (1.2 - t)
    out[i * 3] = x
    out[i * 3 + 1] = y * cosT - z * sinT
    out[i * 3 + 2] = y * sinT + z * cosT
  }
  return out
}

function knot(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  const p = 2
  const q = 3
  const scale = 0.72
  for (let i = 0; i < count; i++) {
    const t = rand() * Math.PI * 2
    const r = Math.cos(q * t) + 2
    const tube = 0.2 * Math.abs(gaussian(rand)) + 0.02
    const a = rand() * Math.PI * 2
    const b = Math.acos(2 * rand() - 1)
    out[i * 3] = (r * Math.cos(p * t) + Math.sin(b) * Math.cos(a) * tube) * scale
    out[i * 3 + 1] = (r * Math.sin(p * t) + Math.sin(b) * Math.sin(a) * tube) * scale
    out[i * 3 + 2] = (-Math.sin(q * t) + Math.cos(b) * tube) * scale * 1.2
  }
  return out
}

function lattice(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  const k = 3
  const size = 1.25
  const rx = 0.62
  const ry = 0.78
  const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry)
  for (let i = 0; i < count; i++) {
    const axis = i % 3
    const u = ((Math.floor(rand() * (k * 2 + 1)) - k) / k) * size
    const v = ((Math.floor(rand() * (k * 2 + 1)) - k) / k) * size
    const w = (rand() * 2 - 1) * size
    const c = [0, 0, 0]
    c[axis] = w
    c[(axis + 1) % 3] = u
    c[(axis + 2) % 3] = v
    // isometric-ish orientation so every edge reads
    const x1 = c[0] * cy + c[2] * sy
    const z1 = -c[0] * sy + c[2] * cy
    out[i * 3] = x1
    out[i * 3 + 1] = c[1] * cx - z1 * sx
    out[i * 3 + 2] = c[1] * sx + z1 * cx
  }
  return out
}

// Flat plane — the wave displacement and tilt are applied in the shader.
function wave(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  const cols = Math.ceil(Math.sqrt(count * 2.2))
  const rows = Math.ceil(count / cols)
  for (let i = 0; i < count; i++) {
    const cx = i % cols
    const cz = Math.floor(i / cols)
    out[i * 3] = (cx / (cols - 1) - 0.5) * 13 + (rand() - 0.5) * 0.03
    out[i * 3 + 1] = 0
    out[i * 3 + 2] = (cz / Math.max(rows - 1, 1) - 0.5) * 3.2 + (rand() - 0.5) * 0.03
  }
  return out
}

function dust(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    out[i * 3] = (rand() * 2 - 1) * 11
    out[i * 3 + 1] = (rand() * 2 - 1) * 6.5
    out[i * 3 + 2] = -14 + rand() * 18
  }
  return out
}

function word(count: number, rand: () => number) {
  const out = new Float32Array(count * 3)
  if (typeof document === "undefined") return out
  const canvas = document.createElement("canvas")
  const w = 1200
  const h = 700
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) return out
  ctx.fillStyle = "#fff"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.font = '800 300px "Inter Tight", "Helvetica Neue", Arial, sans-serif'
  ctx.fillText("WAKU", w / 2, h * 0.3)
  ctx.fillText("WAKU", w / 2, h * 0.73)
  const data = ctx.getImageData(0, 0, w, h).data
  const filled: number[] = []
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 128) filled.push(x, y)
    }
  }
  const pairs = filled.length / 2
  const unit = 5.2 / w
  for (let i = 0; i < count; i++) {
    const j = Math.floor(rand() * pairs) * 2
    out[i * 3] = (filled[j] - w / 2) * unit + (rand() - 0.5) * 0.012
    out[i * 3 + 1] = -(filled[j + 1] - h / 2) * unit + (rand() - 0.5) * 0.012
    out[i * 3 + 2] = gaussian(rand) * 0.05
  }
  return out
}

export function buildShapes(count: number) {
  const rand = mulberry32(20230701)
  return [
    core(count, rand),
    galaxy(count, rand),
    knot(count, rand),
    lattice(count, rand),
    wave(count, rand),
    dust(count, rand),
    word(count, rand),
  ]
}
