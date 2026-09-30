"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"
import {
  atmosphereFragment,
  atmosphereVertex,
  cloudFragment,
  earthFragment,
  moonFragment,
  sphereVertex,
  starFragment,
  starVertex,
  streakFragment,
  streakVertex,
} from "@/lib/space-shaders"
import { buildCockpit, FRAME_HALF_WIDTH, WINDOW_HALF_WIDTH } from "@/lib/cockpit"

const EARTH_R = 10
const ATMO_R = 10.36
const SUN_DIR = new THREE.Vector3(0.4, 0.78, -0.3).normalize()
const MOON_POS = new THREE.Vector3(-70, 12, -150)

type V3 = [number, number, number]
type Shot = {
  pos: V3
  look: V3
  fov: number
  cupola: number // 1 = inside the cabin, 0 = out in open space
  exposure: number
  shift: number // horizontal framing offset (fraction of width) on wide screens
  up?: V3
}

// Orbital sunrise: sit in Earth's shadow, just off-axis so the Sun peeks past the limb.
const sunrisePos = (() => {
  const side = new THREE.Vector3(0, 1, 0).cross(SUN_DIR).normalize()
  const up = SUN_DIR.clone().cross(side).normalize()
  return SUN_DIR.clone()
    .multiplyScalar(-26)
    .addScaledVector(up, 10.9)
    .addScaledVector(side, -3)
})()
// Night side, looking along the surface: city lights under a black sky.
const nightPos = SUN_DIR.clone().multiplyScalar(-13.2)
const nightLook = (() => {
  const side = new THREE.Vector3(0, 1, 0).cross(SUN_DIR).normalize()
  return nightPos.clone().addScaledVector(side, 20).addScaledVector(SUN_DIR, 15)
})()
const moonShot = MOON_POS.clone().add(new THREE.Vector3(10, 1.5, 15))
const moonLook = MOON_POS.clone().add(new THREE.Vector3(0, 3.4, 0))

// One shot per [data-scene] section, in document order.
const SHOTS: Shot[] = [
  { pos: [0, 12.4, 1.5], look: [0, 4.3, -20], fov: 52, cupola: 1, exposure: 1, shift: 0 },
  { pos: [2, 26, 22], look: [-1, 6, 0], fov: 46, cupola: 0, exposure: 1, shift: 0.18 },
  { pos: sunrisePos.toArray() as V3, look: [0, 0, 0], fov: 44, cupola: 0, exposure: 1.1, shift: 0.2 },
  { pos: [30, 10, 34], look: [0, 0, 0], fov: 40, cupola: 0, exposure: 1, shift: 0.22 },
  { pos: moonShot.toArray() as V3, look: moonLook.toArray() as V3, fov: 42, cupola: 0, exposure: 1, shift: 0 },
  { pos: [60, 70, 460], look: [0, 0, 0], fov: 38, cupola: 0, exposure: 0.95, shift: 0 },
  { pos: [0, 12.4, 1.5], look: [0, 4.3, -20], fov: 52, cupola: 1, exposure: 1, shift: 0 },
  {
    pos: nightPos.toArray() as V3,
    look: nightLook.toArray() as V3,
    up: SUN_DIR.clone().negate().toArray() as V3,
    fov: 50,
    cupola: 0,
    exposure: 0.9,
    shift: 0,
  },
]

function glowTexture(stops: [number, string][]) {
  const size = 256
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  stops.forEach(([o, c]) => g.addColorStop(o, c))
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function starField(count: number, radius: number, galaxy: boolean) {
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  const size = new Float32Array(count)
  const phase = new Float32Array(count)
  const tilt = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.9, 0.3, 0.5))
  const v = new THREE.Vector3()
  const palette = [
    [0.75, 0.83, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 0.92, 0.8],
    [1.0, 0.78, 0.62],
  ]
  for (let i = 0; i < count; i++) {
    if (galaxy) {
      // A thick band around a tilted great circle — the Milky Way.
      const a = Math.random() * Math.PI * 2
      const spread = (Math.random() + Math.random() + Math.random() - 1.5) * 0.22
      v.set(Math.cos(a), spread, Math.sin(a)).normalize().applyMatrix4(tilt)
    } else {
      v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize()
    }
    v.multiplyScalar(radius)
    pos.set([v.x, v.y, v.z], i * 3)
    const c = palette[Math.floor(Math.random() * palette.length)]
    const dim = galaxy ? 0.45 + Math.random() * 0.5 : 0.6 + Math.random() * 0.4
    col.set([c[0] * dim, c[1] * dim, c[2] * dim], i * 3)
    const r = Math.random()
    size[i] = galaxy ? 1 + r * 1.6 : 1.2 + Math.pow(r, 8) * 5
    phase[i] = Math.random()
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
  geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3))
  geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1))
  geo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1))
  return geo
}

export default function SpaceJourney() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = mount.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
    } catch {
      host.dataset.fallback = "true"
      return
    }

    const root = document.documentElement
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 760px)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.6)
    renderer.setPixelRatio(dpr)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 3000)
    scene.add(camera)

    // ── Stars & Milky Way (kept centred on the camera so they sit at infinity)
    const sky = new THREE.Group()
    scene.add(sky)
    const starMat = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: starFragment,
      uniforms: { uTime: { value: 0 }, uDpr: { value: dpr }, uFade: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    sky.add(new THREE.Points(starField(mobile ? 5000 : 9000, 1400, false), starMat))
    sky.add(new THREE.Points(starField(mobile ? 12000 : 26000, 1400, true), starMat))

    // ── Sun
    const sunGroup = new THREE.Group()
    const sunCore = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture([
          [0, "rgba(255,255,255,1)"],
          [0.12, "rgba(255,250,235,1)"],
          [0.3, "rgba(255,210,150,0.35)"],
          [1, "rgba(255,160,80,0)"],
        ]),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    sunCore.scale.setScalar(120)
    const sunHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture([
          [0, "rgba(255,200,140,0.35)"],
          [0.4, "rgba(255,140,70,0.08)"],
          [1, "rgba(255,120,60,0)"],
        ]),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    sunHalo.scale.setScalar(620)
    sunGroup.add(sunHalo, sunCore)
    scene.add(sunGroup)

    // ── Earth, clouds, atmosphere
    const earth = new THREE.Group()
    earth.rotation.z = 0.41
    scene.add(earth)
    const sunUniform = { value: SUN_DIR.clone() }
    const camUniform = { value: new THREE.Vector3() }
    const timeUniform = { value: 0 }
    const seg = mobile ? 96 : 160
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R, seg, seg),
      new THREE.ShaderMaterial({
        vertexShader: sphereVertex,
        fragmentShader: earthFragment,
        uniforms: { uSunDir: sunUniform, uCamPos: camUniform },
      })
    )
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R * 1.012, seg, seg),
      new THREE.ShaderMaterial({
        vertexShader: sphereVertex,
        fragmentShader: cloudFragment,
        uniforms: { uSunDir: sunUniform, uTime: timeUniform },
        transparent: true,
        depthWrite: false,
      })
    )
    earth.add(planet, clouds)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(ATMO_R, 96, 96),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: {
          uSunDir: sunUniform,
          uCamPos: camUniform,
          uInner: { value: Math.sqrt(ATMO_R * ATMO_R - EARTH_R * EARTH_R) / ATMO_R },
        },
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    scene.add(atmosphere)

    // ── Moon
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(2.7, 96, 96),
      new THREE.ShaderMaterial({
        vertexShader: sphereVertex,
        fragmentShader: moonFragment,
        uniforms: { uSunDir: sunUniform },
      })
    )
    moon.position.copy(MOON_POS)
    scene.add(moon)

    // ── Warp streaks, parented to the camera
    const streakCount = mobile ? 700 : 1400
    const seeds = new Float32Array(streakCount * 2 * 3)
    const ends = new Float32Array(streakCount * 2)
    for (let i = 0; i < streakCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 4 + Math.pow(Math.random(), 0.6) * 60
      const z = Math.random() * 190
      for (let k = 0; k < 2; k++) {
        seeds.set([Math.cos(a) * r, Math.sin(a) * r, z], (i * 2 + k) * 3)
        ends[i * 2 + k] = k
      }
    }
    const streakGeo = new THREE.BufferGeometry()
    streakGeo.setAttribute("position", new THREE.BufferAttribute(seeds, 3))
    streakGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3))
    streakGeo.setAttribute("aEnd", new THREE.BufferAttribute(ends, 1))
    const streakMat = new THREE.ShaderMaterial({
      vertexShader: streakVertex,
      fragmentShader: streakFragment,
      uniforms: { uTravel: { value: 0 }, uWarp: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const streaks = new THREE.LineSegments(streakGeo, streakMat)
    streaks.frustumCulled = false
    camera.add(streaks)

    // ── Cockpit, riding with the camera
    const cockpit = buildCockpit(renderer)
    camera.add(cockpit.root)

    // ── Post-processing
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.38, 0.32, 0.9)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())

    // ── Scroll → shot progress
    let stops: number[] = []
    const measure = () => {
      stops = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")).map(
        (el) => el.getBoundingClientRect().top + window.scrollY
      )
    }
    const targetProgress = () => {
      if (!stops.length) return 0
      // Hold each shot while its section owns the screen; travel during the last stretch before the next.
      const probe = window.scrollY
      const zone = window.innerHeight * 0.9
      for (let i = 0; i < stops.length - 1; i++) {
        const next = stops[i + 1]
        if (probe < next) return i + Math.min(1, Math.max(0, (probe - (next - zone)) / zone))
      }
      return stops.length - 1
    }

    let width = 1
    let height = 1
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      composer.setSize(width, height)
      bloom.resolution.set(width / 2, height / 2)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      measure()
    }
    resize()
    window.addEventListener("resize", resize)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    // ── Pointer parallax + press-and-hold thrusters
    const mouse = new THREE.Vector2()
    const mouseSmooth = new THREE.Vector2()
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      mouse.set((e.clientX / width) * 2 - 1, (e.clientY / height) * 2 - 1)
    }
    let thrustTarget = 0
    let thrust = 0
    let thrustVel = 0
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, nav")) return
      thrustTarget = 1
      root.dataset.charging = "true"
    }
    const onUp = () => {
      thrustTarget = 0
      delete root.dataset.charging
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)

    // ── Frame loop
    const pos = new THREE.Vector3()
    const look = new THREE.Vector3()
    const lookSmooth = new THREE.Vector3()
    const up = new THREE.Vector3(0, 1, 0)
    const WORLD_UP: V3 = [0, 1, 0]
    const prevPos = new THREE.Vector3()
    const tmp = new THREE.Vector3()
    const a3 = new THREE.Vector3()
    const b3 = new THREE.Vector3()
    let progress = targetProgress()
    let warp = 0
    let travel = 0
    let first = true
    let last = performance.now()
    let raf = 0
    let visible = true
    const ease = (t: number) => t * t * (3 - 2 * t)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reduced) timeUniform.value += dt
      starMat.uniforms.uTime.value = timeUniform.value

      const target = targetProgress()
      progress += (target - progress) * (reduced ? 1 : 1 - Math.pow(0.02, dt))
      const i = Math.min(Math.floor(progress), SHOTS.length - 1)
      const j = Math.min(i + 1, SHOTS.length - 1)
      const t = ease(Math.min(1, Math.max(0, progress - i)))
      const A = SHOTS[i]
      const B = SHOTS[j]
      const mix = (x: number, y: number) => x + (y - x) * t

      pos.lerpVectors(a3.fromArray(A.pos), b3.fromArray(B.pos), t)
      look.lerpVectors(a3.fromArray(A.look), b3.fromArray(B.look), t)
      const cupola = mix(A.cupola, B.cupola)

      // Portrait screens: step back from the subject when out in open space.
      if (width < height) {
        tmp.subVectors(pos, look).multiplyScalar(1 + 0.45 * (1 - cupola))
        pos.copy(look).add(tmp)
      }

      // Thruster spring: slow build-up, springy release.
      if (!reduced) {
        const k = thrustTarget > thrust ? 10 : 70
        thrustVel += (thrustTarget - thrust) * k * dt
        thrustVel *= Math.pow(thrustTarget > 0 ? 0.05 : 0.01, dt)
        thrust += thrustVel * dt
      }
      const boost = Math.max(thrust, 0)

      mouseSmooth.lerp(mouse, 0.05)
      const shake = boost * 0.06
      pos.x += mouseSmooth.x * 0.35 + (Math.random() - 0.5) * shake
      pos.y += -mouseSmooth.y * 0.25 + (Math.random() - 0.5) * shake

      if (first) {
        lookSmooth.copy(look)
        prevPos.copy(pos)
        first = false
      }
      lookSmooth.lerp(look, 0.12)
      up.lerpVectors(a3.fromArray(A.up ?? WORLD_UP), b3.fromArray(B.up ?? WORLD_UP), t).normalize()
      camera.up.copy(up)
      camera.position.copy(pos)
      camera.lookAt(lookSmooth)
      camera.fov = mix(A.fov, B.fov) + boost * 10
      const shift = width > 900 ? mix(A.shift, B.shift) : 0
      camera.setViewOffset(width, height, -shift * width, 0, width, height)
      camera.updateProjectionMatrix()

      // Speed through space turns into warp streaks.
      const speed = dt > 0 ? pos.distanceTo(prevPos) / dt : 0
      prevPos.copy(pos)
      const warpTarget = reduced ? 0 : Math.min(1, Math.max(0, (speed - 30) / 220)) + boost * 0.9
      warp += (Math.min(warpTarget, 1.2) - warp) * (1 - Math.pow(0.02, dt))
      travel += dt * (40 + warp * 520)
      streakMat.uniforms.uWarp.value = warp
      streakMat.uniforms.uTravel.value = travel
      starMat.uniforms.uFade.value = 1 - Math.min(warp, 1) * 0.5

      sky.position.copy(camera.position)
      sunGroup.position.copy(camera.position).addScaledVector(SUN_DIR, 1200)
      camUniform.value.copy(camera.position)
      earth.rotation.y = timeUniform.value * 0.012 + progress * 0.35
      clouds.rotation.y = timeUniform.value * 0.004
      moon.rotation.y = timeUniform.value * 0.01

      renderer.toneMappingExposure = mix(A.exposure, B.exposure) * (1 + boost * 0.25)
      // Park the cupola so its frame fits the screen, then fly out through the window.
      // Landscape fits the whole frame; portrait fits the window glass and drops it to the horizon.
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      const dist = 1.05
      const visibleHalfW = halfH * camera.aspect * dist
      const portrait = camera.aspect < 1
      const scale = Math.min(1, visibleHalfW / ((portrait ? WINDOW_HALF_WIDTH * 1.04 : FRAME_HALF_WIDTH * 1.06)))
      const out = 1 - cupola
      cockpit.root.visible = cupola > 0.002
      cockpit.root.scale.setScalar(scale)
      cockpit.root.position.set(0, portrait ? -halfH * dist * 0.16 : 0, -dist + out * out * (dist + 0.4))
      cockpit.root.rotation.set(mouseSmooth.y * 0.02, mouseSmooth.x * 0.03, 0)
      cockpit.update(timeUniform.value, boost)

      composer.render()
      if (!host.dataset.ready) host.dataset.ready = "true"
    }
    raf = requestAnimationFrame(tick)

    const onVisibility = () => {
      visible = document.visibilityState === "visible"
      last = performance.now()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      document.removeEventListener("visibilitychange", onVisibility)
      ro.disconnect()
      cockpit.dispose()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        mesh.geometry?.dispose()
        const m = mesh.material as THREE.Material | undefined
        m?.dispose()
      })
      composer.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mount} className="space" aria-hidden="true" />
}
