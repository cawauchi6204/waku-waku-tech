"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { buildShapes, SHAPE_COUNT } from "@/lib/shapes"

// Per-shape behaviour: breathing noise amplitude and idle spin (rad/s).
const NOISE = [0.2, 0.12, 0.07, 0.0, 0.02, 0.22, 0.015]
const SPIN = [0.14, 0.05, 0.22, 0.12, 0.0, 0.015, 0.0]

const vertexShader = /* glsl */ `
  attribute vec3 aS0;
  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aS4;
  attribute vec3 aS5;
  attribute vec3 aS6;
  attribute vec4 aSeed; // x: delay, y: size, z: tint, w: phase

  uniform float uTime;
  uniform float uMix;
  uniform int uFrom;
  uniform int uTo;
  uniform float uNoise[${SHAPE_COUNT}];
  uniform float uIntro;
  uniform float uSize;
  uniform float uDpr;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vAlpha;

  // Ashima simplex noise 3D
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  vec3 shapeAt(int i){
    if(i==0) return aS0;
    if(i==1) return aS1;
    if(i==2) return aS2;
    if(i==3) return aS3;
    if(i==4){
      vec3 p=aS4;
      p.y=sin(p.x*0.75+uTime*1.1+p.z*0.6)*0.75+sin(p.x*1.9-uTime*1.5)*0.14*cos(p.z*1.3+uTime*0.7);
      float c=cos(0.42); float s=sin(0.42);
      return vec3(p.x, p.y*c-p.z*s, p.y*s+p.z*c);
    }
    if(i==5) return aS5;
    return aS6;
  }

  float noiseAt(int i){
    for(int k=0;k<${SHAPE_COUNT};k++){ if(k==i) return uNoise[k]; }
    return 0.0;
  }

  void main(){
    float m=clamp((uMix*1.35)-aSeed.x*0.35,0.0,1.0);
    m=m*m*(3.0-2.0*m);
    vec3 a=shapeAt(uFrom);
    vec3 b=shapeAt(uTo);
    vec3 pos=mix(a,b,m);

    // swirl while travelling between shapes
    float travel=sin(m*3.14159);
    vec3 n=vec3(
      snoise(pos*0.45+vec3(uTime*0.12,0.0,aSeed.w)),
      snoise(pos*0.45+vec3(0.0,uTime*0.12+11.0,aSeed.w)),
      snoise(pos*0.45+vec3(aSeed.w,23.0,uTime*0.12))
    );
    float amp=mix(noiseAt(uFrom),noiseAt(uTo),m);
    pos+=n*(amp+travel*0.9);

    // intro: burst out of a single point
    float intro=clamp(uIntro*1.4-aSeed.x*0.4,0.0,1.0);
    intro=1.0-pow(1.0-intro,4.0);
    pos*=intro;

    vec4 mv=modelViewMatrix*vec4(pos,1.0);
    gl_Position=projectionMatrix*mv;

    // cursor repulsion in screen space
    vec2 ndc=gl_Position.xy/gl_Position.w;
    vec2 d=ndc-uMouse; d.x*=uAspect;
    float dist=length(d);
    float f=smoothstep(0.32,0.0,dist);
    gl_Position.xy+=(d/(dist+0.0001))*f*0.07*gl_Position.w*vec2(1.0/uAspect,1.0);

    float twinkle=0.75+0.25*sin(uTime*2.0+aSeed.w*6.2831);
    gl_PointSize=aSeed.y*uSize*uDpr*(1.0/-mv.z)*(1.0+f*1.5);

    vec3 white=vec3(1.0,0.96,0.92);
    vec3 ember=vec3(1.0,0.36,0.12);
    vec3 rose=vec3(1.0,0.2,0.42);
    vec3 col=white;
    if(aSeed.z>0.84) col=ember;
    if(aSeed.z>0.95) col=rose;
    col=mix(col,ember,f*0.8);
    vColor=col;
    vAlpha=twinkle*uOpacity*intro*smoothstep(-26.0,-6.0,mv.z);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main(){
    vec2 c=gl_PointCoord-0.5;
    float d=length(c);
    if(d>0.5) discard;
    float core=smoothstep(0.5,0.0,d);
    float glow=pow(core,2.2);
    gl_FragColor=vec4(vColor*glow*1.4,glow*vAlpha);
    gl_FragColor.rgb*=vAlpha;
  }
`

type SceneStop = { shape: number; x: number; y: number; dim: number; top: number; height: number }

export default function Universe() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = mount.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" })
    } catch {
      host.dataset.fallback = "true"
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 760px)").matches
    const count = mobile ? 16000 : 42000
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.6 : 1.75)

    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 1)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 10)

    const group = new THREE.Group()
    scene.add(group)

    const geometry = new THREE.BufferGeometry()
    const uniforms = {
      uTime: { value: 0 },
      uMix: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uNoise: { value: NOISE },
      uIntro: { value: reduced ? 1 : 0 },
      uSize: { value: mobile ? 34 : 30 },
      uDpr: { value: dpr },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uAspect: { value: 1 },
      uOpacity: { value: 1 },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    points.frustumCulled = false
    points.visible = false
    group.add(points)

    let disposed = false
    const build = () => {
      if (disposed) return
      const shapes = buildShapes(count)
      shapes.forEach((shape, i) => geometry.setAttribute(`aS${i}`, new THREE.BufferAttribute(shape, 3)))
      const seed = new Float32Array(count * 4)
      for (let i = 0; i < count; i++) {
        const r = Math.random()
        seed[i * 4] = Math.random()
        seed[i * 4 + 1] = 0.55 + Math.pow(r, 6) * 3.2
        seed[i * 4 + 2] = Math.random()
        seed[i * 4 + 3] = Math.random() * 10
      }
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4))
      geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3))
      points.visible = true
      host.dataset.ready = "true"
    }
    ;(document.fonts?.ready ?? Promise.resolve()).then(build)

    // Scroll-driven scene stops, read from [data-scene] sections.
    let stops: SceneStop[] = []
    const measure = () => {
      const desktop = window.innerWidth > 900
      stops = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]")).map((el) => {
        const rect = el.getBoundingClientRect()
        return {
          shape: Number(el.dataset.scene),
          x: desktop ? Number(el.dataset.x ?? 0) : 0,
          y: Number((desktop ? el.dataset.y : el.dataset.ym ?? el.dataset.y) ?? 0),
          dim: Number((desktop ? el.dataset.dim : el.dataset.dimm ?? el.dataset.dim) ?? 1),
          top: rect.top + window.scrollY,
          height: rect.height,
        }
      })
    }

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      uniforms.uAspect.value = w / h
      const fit = Math.min(1, Math.max(0.52, (w / h) * 0.72))
      group.scale.setScalar(fit)
      measure()
    }
    resize()
    window.addEventListener("resize", resize)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    const mouse = new THREE.Vector2(9, 9)
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
    }
    const onLeave = () => mouse.set(9, 9)
    window.addEventListener("pointermove", onMove)
    document.addEventListener("pointerleave", onLeave)

    // Continuous progress through the stops: holds on a section, morphs near its end.
    const targetProgress = () => {
      if (!stops.length) return 0
      const center = window.scrollY + window.innerHeight * 0.5
      const zone = window.innerHeight * 0.75
      for (let i = 0; i < stops.length - 1; i++) {
        const nextTop = stops[i + 1].top
        if (center < nextTop) {
          const start = nextTop - zone
          return i + Math.min(1, Math.max(0, (center - start) / zone))
        }
      }
      return stops.length - 1
    }

    let progress = targetProgress()
    let spin = 0
    const pointerSmoothed = new THREE.Vector2(9, 9)
    let last = performance.now()
    const introStart = performance.now() + 900
    let raf = 0
    let visible = true

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reduced) uniforms.uTime.value += dt

      if (!reduced && uniforms.uIntro.value < 1) {
        uniforms.uIntro.value = Math.min(1, Math.max(0, (performance.now() - introStart) / 2400))
      }

      const target = targetProgress()
      progress += (target - progress) * (reduced ? 1 : 1 - Math.pow(0.0015, dt))
      const i = Math.min(Math.floor(progress), Math.max(stops.length - 1, 0))
      const j = Math.min(i + 1, stops.length - 1)
      const t = progress - i
      const a = stops[i]
      const b = stops[j] ?? a
      if (a && b) {
        uniforms.uFrom.value = a.shape
        uniforms.uTo.value = b.shape
        uniforms.uMix.value = t
        const lerp = (x: number, y: number) => x + (y - x) * (t * t * (3 - 2 * t))
        group.position.x += (lerp(a.x, b.x) - group.position.x) * 0.08
        group.position.y += (lerp(a.y, b.y) - group.position.y) * 0.08
        uniforms.uOpacity.value += (lerp(a.dim, b.dim) - uniforms.uOpacity.value) * 0.08

        const spinRate = lerp(SPIN[a.shape], SPIN[b.shape])
        if (spinRate > 0.001) {
          spin += spinRate * dt * (reduced ? 0 : 1)
        } else {
          const nearest = Math.round(spin / (Math.PI * 2)) * Math.PI * 2
          spin += (nearest - spin) * 0.05
        }
      }

      pointerSmoothed.lerp(mouse, 0.12)
      uniforms.uMouse.value.copy(pointerSmoothed)
      const mx = Math.abs(mouse.x) > 2 ? 0 : mouse.x
      const my = Math.abs(mouse.y) > 2 ? 0 : mouse.y
      group.rotation.y += (spin + mx * 0.18 - group.rotation.y) * 0.08
      group.rotation.x += (-my * 0.12 - group.rotation.x) * 0.08

      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(tick)

    const onVisibility = () => {
      visible = document.visibilityState === "visible"
      last = performance.now()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mount} className="universe" aria-hidden="true" />
}
