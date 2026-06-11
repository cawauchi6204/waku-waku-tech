"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

type MovingDot = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> & {
  userData: {
    baseX: number
    baseY: number
    baseZ: number
    speed: number
    radius: number
    drift: number
  }
}

const disposeMaterial = (material: THREE.Material | THREE.Material[]) => {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose())
    return
  }
  material.dispose()
}

export default function RocketStage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.8, 8.4)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.setAttribute("aria-hidden", "true")
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.inset = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.pointerEvents = "none"
    container.appendChild(renderer.domElement)

    const ambient = new THREE.HemisphereLight(0xf8f3e9, 0xb7c2ce, 2.1)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 3.4)
    key.position.set(4.5, 5.2, 5.5)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xf47b42, 1.1)
    rim.position.set(-5, 2.8, 2)
    scene.add(rim)

    const rocket = new THREE.Group()
    rocket.position.set(1.35, -0.35, 0)
    scene.add(rocket)

    const cream = new THREE.MeshStandardMaterial({
      color: 0xf6f0e7,
      roughness: 0.58,
      metalness: 0.08,
    })
    const ink = new THREE.MeshStandardMaterial({
      color: 0x15120f,
      roughness: 0.42,
      metalness: 0.18,
    })
    const orange = new THREE.MeshStandardMaterial({
      color: 0xef5b24,
      roughness: 0.36,
      metalness: 0.12,
    })
    const blue = new THREE.MeshStandardMaterial({
      color: 0x2a6aa8,
      roughness: 0.32,
      metalness: 0.2,
    })
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7a1a,
      transparent: true,
      opacity: 0.86,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const smokeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd9d0c2,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    })

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.42, 2.35, 56), cream)
    body.castShadow = true
    rocket.add(body)

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.78, 56), orange)
    nose.position.y = 1.56
    rocket.add(nose)

    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.347, 0.347, 0.09, 56), ink)
    belt.position.y = 0.62
    rocket.add(belt)

    const windowFrame = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.026, 16, 48), ink)
    windowFrame.position.set(0, 0.72, 0.35)
    rocket.add(windowFrame)

    const windowGlass = new THREE.Mesh(new THREE.CircleGeometry(0.15, 48), blue)
    windowGlass.position.set(0, 0.72, 0.382)
    rocket.add(windowGlass)

    const finGeometry = new THREE.BoxGeometry(0.14, 0.58, 0.5)
    const finLeft = new THREE.Mesh(finGeometry, orange)
    finLeft.position.set(-0.38, -0.93, 0)
    finLeft.rotation.z = -0.18
    rocket.add(finLeft)
    const finRight = finLeft.clone()
    finRight.position.x = 0.38
    finRight.rotation.z = 0.18
    rocket.add(finRight)

    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.22, 40), ink)
    nozzle.position.y = -1.27
    rocket.add(nozzle)

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1.12, 42, 1, true), flameMaterial)
    flame.position.y = -1.86
    flame.rotation.x = Math.PI
    rocket.add(flame)

    const railMaterial = new THREE.LineBasicMaterial({
      color: 0x1c1713,
      transparent: true,
      opacity: 0.16,
    })
    const makeLine = (points: THREE.Vector3[]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, railMaterial)
      scene.add(line)
      return line
    }
    const rails = [
      makeLine([new THREE.Vector3(-5.2, -2.7, -2.2), new THREE.Vector3(4.5, 1.7, -2.2)]),
      makeLine([new THREE.Vector3(-4.9, -3.1, -2.2), new THREE.Vector3(4.7, 1.25, -2.2)]),
      makeLine([new THREE.Vector3(-5.8, -1.35, -2.8), new THREE.Vector3(4.8, -0.65, -2.8)]),
    ]

    const dots: MovingDot[] = []
    const dotGeometry = new THREE.SphereGeometry(0.035, 14, 14)
    const dotColors = [0xef5b24, 0x16213a, 0x5ea6c9, 0xe9c46a]
    for (let index = 0; index < 70; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: dotColors[index % dotColors.length],
        transparent: true,
        opacity: 0.16 + Math.random() * 0.32,
      })
      const dot = new THREE.Mesh(dotGeometry, material) as MovingDot
      dot.userData = {
        baseX: -4.8 + Math.random() * 9.6,
        baseY: -2.2 + Math.random() * 5.4,
        baseZ: -3.8 + Math.random() * 2.6,
        speed: 0.15 + Math.random() * 0.34,
        radius: 0.04 + Math.random() * 0.06,
        drift: Math.random() * Math.PI * 2,
      }
      dot.position.set(dot.userData.baseX, dot.userData.baseY, dot.userData.baseZ)
      scene.add(dot)
      dots.push(dot)
    }

    const smoke: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] = []
    for (let index = 0; index < 18; index += 1) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.22 + index * 0.012, 18, 18), smokeMaterial.clone())
      puff.position.set(
        0.9 + Math.sin(index) * 0.34,
        -2.05 - index * 0.035,
        -0.08 - index * 0.018,
      )
      rocket.add(puff)
      smoke.push(puff)
    }

    const mouse = { x: 0, y: 0 }
    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    container.addEventListener("pointermove", handlePointerMove)

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width < 720 ? 10.4 : 8.4
      camera.position.x = width < 720 ? 0.5 : 0
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener("resize", resize)

    const startedAt = performance.now()
    const animate = () => {
      const time = (performance.now() - startedAt) / 1000
      const isCompact = container.clientWidth < 720
      const scrollLift = Math.min(window.scrollY / 900, 1) * 0.55
      const baseX = isCompact ? 2.1 : 1.35
      const baseY = isCompact ? -1.12 : -0.35
      rocket.position.x = baseX + mouse.x * 0.16
      rocket.position.y = baseY + scrollLift + Math.sin(time * 1.15) * 0.08
      rocket.scale.setScalar(isCompact ? 0.92 : 1)
      rocket.rotation.z = -0.18 + mouse.x * 0.045 + Math.sin(time * 0.8) * 0.018
      rocket.rotation.x = mouse.y * 0.025
      flame.scale.set(0.85 + Math.sin(time * 18) * 0.12, 1 + Math.sin(time * 24) * 0.16, 0.85)

      smoke.forEach((puff, index) => {
        const phase = time * (0.55 + index * 0.012) + index
        puff.position.x = 0.85 + Math.sin(phase) * (0.2 + index * 0.012)
        puff.position.y = -2.05 - index * 0.036 - (time * 0.05 + index * 0.004) % 0.25
        puff.scale.setScalar(0.78 + Math.sin(phase * 1.7) * 0.09)
        puff.material.opacity = Math.max(0.06, 0.28 - index * 0.009)
      })

      dots.forEach((dot) => {
        const data = dot.userData
        dot.position.x = data.baseX + Math.sin(time * data.speed + data.drift) * data.radius * 8
        dot.position.y = data.baseY + Math.cos(time * data.speed * 1.2 + data.drift) * data.radius * 5
        dot.rotation.y = time * data.speed
      })

      rails.forEach((rail, index) => {
        rail.rotation.z = Math.sin(time * 0.35 + index) * 0.006
      })

      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)

    return () => {
      renderer.setAnimationLoop(null)
      container.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("resize", resize)
      container.removeChild(renderer.domElement)

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          disposeMaterial(object.material)
        }
        if (object instanceof THREE.Line) {
          object.geometry.dispose()
        }
      })
      railMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}
