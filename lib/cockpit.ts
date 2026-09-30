// A physically-shaded spacecraft cupola, built procedurally and parented to the camera.
// Geometry is authored on a 1600×900 sketch grid (the same one the old SVG used) and
// converted to scene units, so the window reads identically at 16:9.

import * as THREE from "three"

const S = 0.0013 // sketch px → units
const WINDOW =
  "M410 250Q800 214 1190 250Q1250 256 1226 306L1086 660Q1069 696 1030 698Q800 706 570 698Q531 696 514 660L374 306Q350 256 410 250Z"
const FRAME =
  "M388 204Q800 162 1212 204Q1302 214 1266 292L1116 690Q1093 744 1036 747Q800 757 564 747Q507 744 484 690L334 292Q298 214 388 204Z"
const SIDE_L = "M-60 600Q20 565 84 628L236 960H-60Z"
const SIDE_R = "M1660 600Q1580 565 1516 628L1364 960H1660Z"

export const FRAME_HALF_WIDTH = ((1302 - 298) / 2) * S
export const WINDOW_HALF_WIDTH = ((1250 - 350) / 2) * S

const px = (x: number) => (x - 800) * S
const py = (y: number) => -(y - 450) * S

function parsePath(d: string, target: THREE.Path) {
  const tokens = d.match(/[MLQHZ]|-?\d+(?:\.\d+)?/g) ?? []
  let i = 0
  let cx = 0
  let cy = 0
  const num = () => Number(tokens[i++])
  while (i < tokens.length) {
    const cmd = tokens[i++]
    if (cmd === "M") {
      cx = num()
      cy = num()
      target.moveTo(px(cx), py(cy))
    } else if (cmd === "L") {
      cx = num()
      cy = num()
      target.lineTo(px(cx), py(cy))
    } else if (cmd === "H") {
      cx = num()
      target.lineTo(px(cx), py(cy))
    } else if (cmd === "Q") {
      const qx = num()
      const qy = num()
      cx = num()
      cy = num()
      target.quadraticCurveTo(px(qx), py(qy), px(cx), py(cy))
    } else if (cmd === "Z") {
      target.closePath()
    }
  }
  return target
}
const shapeOf = (d: string) => parsePath(d, new THREE.Shape()) as THREE.Shape
const pathOf = (d: string) => parsePath(d, new THREE.Path())

// ── Procedural textures ─────────────────────────────────────────────────────

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

function heightToNormal(height: Float32Array, w: number, h: number, strength: number) {
  const data = new Uint8Array(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const l = height[y * w + ((x - 1 + w) % w)]
      const r = height[y * w + ((x + 1) % w)]
      const u = height[((y - 1 + h) % h) * w + x]
      const d = height[((y + 1) % h) * w + x]
      const nx = (l - r) * strength
      const ny = (d - u) * strength
      const len = Math.hypot(nx, ny, 1)
      const o = (y * w + x) * 4
      data[o] = ((nx / len) * 0.5 + 0.5) * 255
      data[o + 1] = ((ny / len) * 0.5 + 0.5) * 255
      data[o + 2] = ((1 / len) * 0.5 + 0.5) * 255
      data[o + 3] = 255
    }
  }
  const tex = new THREE.DataTexture(data, w, h)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.needsUpdate = true
  return tex
}

function canvasTex(canvas: HTMLCanvasElement, color: boolean) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  if (color) tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

// Painted hull panels: seams, rivets, scuffs and paint grain.
function hullTextures() {
  const N = 1024
  const rand = rng(7)
  const height = new Float32Array(N * N)
  const albedo = document.createElement("canvas")
  albedo.width = albedo.height = N
  const a = albedo.getContext("2d")!
  const rough = document.createElement("canvas")
  rough.width = rough.height = N
  const r = rough.getContext("2d")!

  a.fillStyle = "#3b4048"
  a.fillRect(0, 0, N, N)
  r.fillStyle = "#b4b4b4"
  r.fillRect(0, 0, N, N)

  // Panel tints
  const cols = [0, 300, 560, 820, N]
  const rows = [0, 220, 470, 760, N]
  for (let c = 0; c < cols.length - 1; c++) {
    for (let k = 0; k < rows.length - 1; k++) {
      const v = 52 + Math.floor(rand() * 10)
      a.fillStyle = `rgb(${v},${v + 4},${v + 10})`
      a.fillRect(cols[c] + 3, rows[k] + 3, cols[c + 1] - cols[c] - 6, rows[k + 1] - rows[k] - 6)
      r.fillStyle = `rgb(${160 + rand() * 50},${160 + rand() * 50},${160 + rand() * 50})`
      r.fillRect(cols[c] + 3, rows[k] + 3, cols[c + 1] - cols[c] - 6, rows[k + 1] - rows[k] - 6)
    }
  }
  // Grain + scuffs
  const img = a.getImageData(0, 0, N, N)
  for (let i = 0; i < N * N; i++) {
    const g = (rand() - 0.5) * 10
    img.data[i * 4] += g
    img.data[i * 4 + 1] += g
    img.data[i * 4 + 2] += g
    height[i] = rand() * 0.04
  }
  a.putImageData(img, 0, 0)
  r.globalAlpha = 0.25
  for (let i = 0; i < 260; i++) {
    const x = rand() * N
    const y = rand() * N
    const len = 10 + rand() * 60
    const ang = rand() * Math.PI
    r.strokeStyle = rand() > 0.5 ? "#6a6a6a" : "#e6e6e6"
    r.lineWidth = 0.6 + rand()
    r.beginPath()
    r.moveTo(x, y)
    r.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len)
    r.stroke()
  }
  r.globalAlpha = 1

  // Seams (grooves) and rivets (bumps) into the height field + albedo
  const groove = (x0: number, y0: number, x1: number, y1: number) => {
    a.strokeStyle = "rgba(8,10,12,0.9)"
    a.lineWidth = 3
    a.beginPath()
    a.moveTo(x0, y0)
    a.lineTo(x1, y1)
    a.stroke()
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
    for (let s = 0; s <= steps; s++) {
      const x = Math.round(x0 + ((x1 - x0) * s) / steps)
      const y = Math.round(y0 + ((y1 - y0) * s) / steps)
      for (let o = -2; o <= 2; o++) {
        const xx = x1 === x0 ? x + o : x
        const yy = y1 === y0 ? y + o : y
        if (xx >= 0 && xx < N && yy >= 0 && yy < N) height[yy * N + xx] = -0.9 + Math.abs(o) * 0.3
      }
    }
  }
  const rivet = (x: number, y: number) => {
    a.fillStyle = "rgba(120,128,138,0.9)"
    a.beginPath()
    a.arc(x, y, 3, 0, Math.PI * 2)
    a.fill()
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const d = Math.hypot(dx, dy)
        const xx = Math.round(x + dx)
        const yy = Math.round(y + dy)
        if (d < 4 && xx >= 0 && xx < N && yy >= 0 && yy < N) height[yy * N + xx] = Math.cos((d / 4) * Math.PI * 0.5) * 0.9
      }
    }
  }
  cols.slice(1, -1).forEach((x) => {
    groove(x, 0, x, N - 1)
    for (let y = 20; y < N; y += 42) {
      rivet(x - 12, y)
      rivet(x + 12, y)
    }
  })
  rows.slice(1, -1).forEach((y) => {
    groove(0, y, N - 1, y)
    for (let x = 20; x < N; x += 42) rivet(x, y - 12)
  })
  // Grime pooled along the lower edges of seams
  const grime = a.createLinearGradient(0, 0, 0, N)
  grime.addColorStop(0, "rgba(0,0,0,0)")
  grime.addColorStop(1, "rgba(0,0,0,0.25)")
  a.fillStyle = grime
  a.fillRect(0, 0, N, N)

  return {
    map: canvasTex(albedo, true),
    roughnessMap: canvasTex(rough, false),
    normalMap: heightToNormal(height, N, N, 3.2),
  }
}

// Anodised, brushed frame metal.
function brushedTextures() {
  const W = 512
  const H = 512
  const rand = rng(11)
  const height = new Float32Array(W * H)
  const rough = document.createElement("canvas")
  rough.width = W
  rough.height = H
  const r = rough.getContext("2d")!
  const img = r.createImageData(W, H)
  for (let y = 0; y < H; y++) {
    let v = rand()
    for (let x = 0; x < W; x++) {
      v = v * 0.96 + rand() * 0.04
      const h = v + (rand() - 0.5) * 0.08
      height[y * W + x] = h * 0.35
      const g = 90 + h * 70
      const o = (y * W + x) * 4
      img.data[o] = img.data[o + 1] = img.data[o + 2] = g
      img.data[o + 3] = 255
    }
  }
  r.putImageData(img, 0, 0)
  return { roughnessMap: canvasTex(rough, false), normalMap: heightToNormal(height, W, H, 1.2) }
}

function placard(lines: string[], opts: { w: number; h: number; bg: string; fg: string; stripes?: boolean }) {
  const scale = 4
  const c = document.createElement("canvas")
  c.width = opts.w * scale
  c.height = opts.h * scale
  const g = c.getContext("2d")!
  g.scale(scale, scale)
  g.fillStyle = opts.bg
  g.fillRect(0, 0, opts.w, opts.h)
  if (opts.stripes) {
    g.save()
    g.beginPath()
    g.rect(0, opts.h - 10, opts.w, 10)
    g.clip()
    for (let x = -20; x < opts.w + 20; x += 12) {
      g.fillStyle = "#e3b53a"
      g.beginPath()
      g.moveTo(x, opts.h)
      g.lineTo(x + 6, opts.h)
      g.lineTo(x + 16, opts.h - 10)
      g.lineTo(x + 10, opts.h - 10)
      g.fill()
    }
    g.restore()
  }
  g.fillStyle = opts.fg
  g.textBaseline = "top"
  lines.forEach((line, i) => {
    const size = i === 0 ? 11 : 7
    g.font = `${i === 0 ? 700 : 500} ${size}px "Inter Tight", Arial, sans-serif`
    g.fillText(line, 6, 5 + i * 13)
  })
  // tiny barcode
  for (let x = opts.w - 40, k = 0; x < opts.w - 8; x += 2, k++) {
    if ((k * 7) % 3) g.fillRect(x, 6, 1, 10)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function tagTexture() {
  const c = document.createElement("canvas")
  c.width = 96
  c.height = 320
  const g = c.getContext("2d")!
  g.fillStyle = "#c8341c"
  g.fillRect(0, 0, 96, 320)
  g.fillStyle = "#f2efe8"
  g.save()
  g.translate(62, 300)
  g.rotate(-Math.PI / 2)
  g.font = '700 30px "Inter Tight", Arial, sans-serif'
  g.fillText("REMOVE BEFORE FLIGHT", 0, 0)
  g.restore()
  g.fillStyle = "#1a1a1a"
  g.beginPath()
  g.arc(48, 22, 9, 0, Math.PI * 2)
  g.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// A soft studio for reflections: the window glows blue ahead, a warm cabin strip behind.
function cabinEnvironment(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene()
  env.background = new THREE.Color(0x05070a)
  const add = (w: number, h: number, color: THREE.Color, p: THREE.Vector3, look: THREE.Vector3) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }))
    m.position.copy(p)
    m.lookAt(look)
    env.add(m)
  }
  add(8, 4, new THREE.Color(0.35, 0.55, 1.1), new THREE.Vector3(0, -0.6, -6), new THREE.Vector3())
  add(10, 1.2, new THREE.Color(0.08, 0.16, 0.4), new THREE.Vector3(0, -3, -4), new THREE.Vector3())
  add(5, 0.35, new THREE.Color(1.3, 1.05, 0.85), new THREE.Vector3(0, 3.5, 3), new THREE.Vector3())
  add(0.4, 4, new THREE.Color(0.5, 0.8, 1.4), new THREE.Vector3(5, 0, 0), new THREE.Vector3())
  const pmrem = new THREE.PMREMGenerator(renderer)
  const tex = pmrem.fromScene(env, 0.035).texture
  pmrem.dispose()
  env.traverse((o) => {
    const mesh = o as THREE.Mesh
    mesh.geometry?.dispose()
    ;(mesh.material as THREE.Material | undefined)?.dispose()
  })
  return tex
}

// ── Assembly ────────────────────────────────────────────────────────────────

export function buildCockpit(renderer: THREE.WebGLRenderer) {
  const root = new THREE.Group()
  const rig = new THREE.Group() // floats gently inside root
  root.add(rig)
  const envMap = cabinEnvironment(renderer)

  const hullTex = hullTextures()
  ;[hullTex.map, hullTex.roughnessMap, hullTex.normalMap].forEach((t) => t.repeat.set(0.55, 0.55))
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: hullTex.map,
    roughnessMap: hullTex.roughnessMap,
    normalMap: hullTex.normalMap,
    normalScale: new THREE.Vector2(0.9, 0.9),
    roughness: 0.85,
    metalness: 0.35,
    envMap,
    envMapIntensity: 0.55,
  })
  const brushed = brushedTextures()
  ;[brushed.roughnessMap, brushed.normalMap].forEach((t) => t.repeat.set(2.2, 2.2))
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x4a525c,
    roughnessMap: brushed.roughnessMap,
    normalMap: brushed.normalMap,
    normalScale: new THREE.Vector2(0.35, 0.35),
    roughness: 0.55,
    metalness: 0.9,
    envMap,
    envMapIntensity: 1.25,
  })
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x15181c, roughness: 0.45, metalness: 0.8, envMap, envMapIntensity: 0.9 })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x050506, roughness: 0.95, metalness: 0, envMap, envMapIntensity: 0.2 })
  const railMat = new THREE.MeshStandardMaterial({ color: 0x6b7f96, roughness: 0.3, metalness: 0.85, envMap, envMapIntensity: 1.2 })

  // Hull with the viewports cut out; the bevel rounds every opening.
  const hullShape = new THREE.Shape()
  hullShape.moveTo(-5, -5)
  hullShape.lineTo(5, -5)
  hullShape.lineTo(5, 5)
  hullShape.lineTo(-5, 5)
  hullShape.closePath()
  hullShape.holes.push(pathOf(FRAME), pathOf(SIDE_L), pathOf(SIDE_R))
  const hull = new THREE.Mesh(
    new THREE.ExtrudeGeometry(hullShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 4,
      curveSegments: 48,
    }),
    hullMat
  )
  hull.position.z = -0.04
  rig.add(hull)

  // Thick bevelled window frame standing proud of the hull.
  const frameShape = shapeOf(FRAME)
  frameShape.holes.push(pathOf(WINDOW))
  const frame = new THREE.Mesh(
    new THREE.ExtrudeGeometry(frameShape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.024,
      bevelSize: 0.012,
      bevelSegments: 10,
      curveSegments: 64,
    }),
    frameMat
  )
  frame.position.z = -0.03
  rig.add(frame)

  // Inner rubber seal, recessed behind the frame lip.
  const sealOuter = shapeOf(WINDOW)
  const inner = new THREE.Path()
  sealOuter.getPoints(64).forEach((p, i) => {
    const q = p.clone().multiplyScalar(0.986)
    q.y -= 0.004
    if (i === 0) inner.moveTo(q.x, q.y)
    else inner.lineTo(q.x, q.y)
  })
  sealOuter.holes.push(inner)
  const seal = new THREE.Mesh(new THREE.ExtrudeGeometry(sealOuter, { depth: 0.02, bevelEnabled: false, curveSegments: 64 }), rubber)
  seal.position.z = -0.07
  rig.add(seal)

  // Glass: only a faint specular sheen, blended additively over space.
  const glass = new THREE.Mesh(
    new THREE.ShapeGeometry(shapeOf(WINDOW), 64),
    new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      roughness: 0.06,
      metalness: 0,
      envMap,
      envMapIntensity: 2.4,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  )
  glass.position.z = -0.075
  rig.add(glass)

  // Rivets around the frame lip.
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const rivetPts: [number, number][] = [
    ...Array.from({ length: 13 }, (_, i): [number, number] => {
      const x = 410 + i * 65
      return [x, 205 + 22 * ((x - 800) / 390) ** 2]
    }),
    ...Array.from({ length: 6 }, (_, i): [number, number] => [lerp(356, 498, (i + 1) / 7), lerp(300, 676, (i + 1) / 7)]),
    ...Array.from({ length: 6 }, (_, i): [number, number] => [lerp(1244, 1102, (i + 1) / 7), lerp(300, 676, (i + 1) / 7)]),
    ...Array.from({ length: 8 }, (_, i): [number, number] => [548 + i * 72, 724]),
  ]
  const rivets = new THREE.InstancedMesh(new THREE.SphereGeometry(0.0055, 12, 8), darkMetal, rivetPts.length)
  const m4 = new THREE.Matrix4()
  rivetPts.forEach(([x, y], i) => {
    m4.compose(new THREE.Vector3(px(x), py(y), 0.03), new THREE.Quaternion(), new THREE.Vector3(1, 1, 0.45))
    rivets.setMatrixAt(i, m4)
  })
  rig.add(rivets)

  // Handrails on stand-offs.
  const rail = (a: THREE.Vector3, b: THREE.Vector3) => {
    const lift = 0.055
    const dir = b.clone().sub(a)
    const pts = [
      a.clone(),
      a.clone().add(new THREE.Vector3(0, 0, lift * 0.8)),
      a.clone().addScaledVector(dir, 0.06).add(new THREE.Vector3(0, 0, lift)),
      b.clone().addScaledVector(dir, -0.06).add(new THREE.Vector3(0, 0, lift)),
      b.clone().add(new THREE.Vector3(0, 0, lift * 0.8)),
      b.clone(),
    ]
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.2), 64, 0.011, 16), railMat)
    rig.add(tube)
    ;[a, b].forEach((p) => {
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 0.012, 24), darkMetal)
      foot.rotation.x = Math.PI / 2
      foot.position.copy(p)
      rig.add(foot)
    })
  }
  rail(new THREE.Vector3(px(205), py(330), 0), new THREE.Vector3(px(285), py(560), 0))
  rail(new THREE.Vector3(px(1385), py(350), 0), new THREE.Vector3(px(1330), py(530), 0))

  // Light strips (HDR emissive so bloom picks them up).
  const strip = (x0: number, y0: number, x1: number, y1: number, intensity: number) => {
    const a = new THREE.Vector2(px(x0), py(y0))
    const b = new THREE.Vector2(px(x1), py(y1))
    const len = a.distanceTo(b)
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.028, len + 0.02, 0.014), darkMetal)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.55, 0.85, 1.4).multiplyScalar(intensity) })
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.01, len, 0.006), mat)
    led.position.z = 0.008
    const g = new THREE.Group()
    g.add(housing, led)
    g.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, 0.01)
    g.rotation.z = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2
    rig.add(g)
    return mat
  }
  const stripMats = [strip(1440, 360, 1356, 620, 3.2), strip(160, 380, 222, 560, 1.4)]

  // Instrument cluster, lower right: knobs, a toggle bank and status LEDs.
  const cluster = new THREE.Group()
  cluster.position.set(px(1330), py(800), 0)
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.11, 0.02), darkMetal)
  cluster.add(box)
  const knobGeo = new THREE.CylinderGeometry(0.014, 0.016, 0.018, 24)
  ;[-0.07, -0.035].forEach((x) => {
    const k = new THREE.Mesh(knobGeo, railMat)
    k.rotation.x = Math.PI / 2
    k.position.set(x, 0.02, 0.02)
    cluster.add(k)
  })
  const toggleGeo = new THREE.CylinderGeometry(0.0025, 0.0035, 0.024, 8)
  for (let i = 0; i < 5; i++) {
    const t = new THREE.Mesh(toggleGeo, railMat)
    t.rotation.x = Math.PI / 2 - 0.5
    t.position.set(0.0 + i * 0.018, 0.022, 0.022)
    cluster.add(t)
  }
  const ledMats: THREE.MeshBasicMaterial[] = []
  ;[
    [0.9, 3.0, 0.9],
    [3.0, 1.9, 0.5],
    [0.9, 3.0, 0.9],
    [0.9, 3.0, 0.9],
  ].forEach((c, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]) })
    ledMats.push(mat)
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.0035, 8, 6), mat)
    led.position.set(-0.07 + i * 0.02, -0.03, 0.012)
    cluster.add(led)
  })
  rig.add(cluster)

  // Stencilled placards.
  const addPlacard = (tex: THREE.Texture, w: number, h: number, x: number, y: number, rot = 0) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, metalness: 0.1, envMap, envMapIntensity: 0.4 })
    )
    m.position.set(px(x), py(y), 0.0015)
    m.rotation.z = rot
    rig.add(m)
  }
  addPlacard(placard(["CUPOLA  W-01", "WINDOW 7  ·  DO NOT PUSH"], { w: 150, h: 34, bg: "#d9d6cc", fg: "#1b1d20", stripes: false }), 0.15, 0.034, 800, 790)
  addPlacard(placard(["HANDHOLD", "MAX LOAD 90 kgf"], { w: 110, h: 34, bg: "#1b1f24", fg: "#c9ced6" }), 0.1, 0.031, 300, 660, 0.3)
  addPlacard(placard(["O₂  ▲", "SHUTOFF"], { w: 90, h: 40, bg: "#e0ddd2", fg: "#8c1d12", stripes: true }), 0.08, 0.036, 1470, 690, -0.35)
  addPlacard(placard(["WAKU WAKU TECH", "EXPLORATION MODULE"], { w: 150, h: 34, bg: "#15181c", fg: "#9aa3ae" }), 0.14, 0.032, 470, 840, 0.05)

  // Remove-before-flight tag hanging from the bottom of the frame.
  const tagPivot = new THREE.Group()
  tagPivot.position.set(px(800), py(708), 0.05)
  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.03, 0.1),
    new THREE.MeshStandardMaterial({ map: tagTexture(), roughness: 0.8, side: THREE.DoubleSide, envMap, envMapIntensity: 0.3 })
  )
  tag.position.y = -0.052
  const lanyard = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.0012, 0.02, 6), darkMetal)
  lanyard.position.y = 0.0
  tagPivot.add(tag, lanyard)
  rig.add(tagPivot)

  // Cabin lighting: cool Earth-glow from the window, a dim warm cabin key, soft fill.
  const lights = new THREE.Group()
  const earthGlow = new THREE.PointLight(0x8fbaff, 1.6, 2.4, 1.6)
  earthGlow.position.set(0, -0.18, -0.35)
  const cabinKey = new THREE.SpotLight(0xffe2c4, 3.2, 4, 0.9, 0.8, 1.2)
  cabinKey.position.set(-0.4, 0.9, 0.9)
  cabinKey.target.position.set(0, -0.1, 0)
  const rim = new THREE.PointLight(0x6fb4ff, 0.9, 1.2, 1.5)
  rim.position.set(px(1400), py(480), 0.12)
  const fill = new THREE.HemisphereLight(0x1b2432, 0x050608, 0.9)
  lights.add(earthGlow, cabinKey, cabinKey.target, rim, fill)
  rig.add(lights)

  // Dust motes drifting in the cabin air, catching the window light.
  const moteCount = 180
  const motePos = new Float32Array(moteCount * 3)
  const moteSeed = new Float32Array(moteCount)
  for (let i = 0; i < moteCount; i++) {
    motePos.set([(Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 0.9, 0.05 + Math.random() * 0.8], i * 3)
    moteSeed[i] = Math.random()
  }
  const moteGeo = new THREE.BufferGeometry()
  moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3))
  moteGeo.setAttribute("aSeed", new THREE.BufferAttribute(moteSeed, 1))
  const moteMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDpr: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uDpr;
      varying float vA;
      void main(){
        vec3 p=position;
        p.x+=sin(uTime*0.07+aSeed*40.0)*0.05;
        p.y+=sin(uTime*0.05+aSeed*23.0)*0.04+mod(uTime*0.004+aSeed,1.0)*0.02;
        vec4 mv=modelViewMatrix*vec4(p,1.0);
        gl_Position=projectionMatrix*mv;
        gl_PointSize=(1.2+aSeed*2.2)*uDpr*(0.6/ -mv.z);
        vA=(0.25+0.75*pow(sin(uTime*0.6+aSeed*30.0)*0.5+0.5,3.0))*smoothstep(0.1,0.4,-mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vA;
      void main(){
        float d=length(gl_PointCoord-0.5);
        if(d>0.5) discard;
        float a=exp(-d*d*16.0)*vA;
        gl_FragColor=vec4(vec3(0.75,0.85,1.0)*a*0.9,a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const motes = new THREE.Points(moteGeo, moteMat)
  motes.frustumCulled = false
  rig.add(motes)

  // Fonts may land after the first draw; repaint text textures once they do.
  document.fonts?.ready.then(() => {
    rig.traverse((o) => {
      const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined
      if (mat?.map instanceof THREE.CanvasTexture) mat.map.needsUpdate = true
    })
  })

  return {
    root,
    update(time: number, thrust: number) {
      moteMat.uniforms.uTime.value = time
      rig.position.y = Math.sin(time * 0.45) * 0.004
      rig.position.x = Math.sin(time * 0.3 + 1.2) * 0.003
      rig.rotation.z = Math.sin(time * 0.25) * 0.004
      if (thrust > 0.01) {
        rig.position.x += (Math.random() - 0.5) * thrust * 0.006
        rig.position.y += (Math.random() - 0.5) * thrust * 0.006
      }
      tagPivot.rotation.z = Math.sin(time * 0.9) * 0.12 + Math.sin(time * 2.3) * 0.03 + thrust * Math.sin(time * 18) * 0.25
      tagPivot.rotation.x = Math.sin(time * 0.7) * 0.2
      const pulse = 0.85 + Math.sin(time * 1.3) * 0.15
      stripMats[0].color.setRGB(0.55 * 3.2 * pulse, 0.85 * 3.2 * pulse, 1.4 * 3.2 * pulse)
      ledMats[1].color.setRGB(Math.sin(time * 3) > 0 ? 3 : 0.4, Math.sin(time * 3) > 0 ? 1.9 : 0.25, 0.3)
    },
    dispose() {
      root.traverse((o) => {
        const mesh = o as THREE.Mesh
        mesh.geometry?.dispose()
        const mat = mesh.material as THREE.MeshStandardMaterial | undefined
        mat?.map?.dispose()
        mat?.dispose()
      })
      ;[hullTex.map, hullTex.roughnessMap, hullTex.normalMap, brushed.roughnessMap, brushed.normalMap].forEach((t) => t.dispose())
      envMap.dispose()
    },
  }
}
