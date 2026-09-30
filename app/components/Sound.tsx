"use client"

import { useEffect, useRef, useState } from "react"

type Engine = {
  ctx: AudioContext
  master: GainNode
  thrustGain: GainNode
  thrustFilter: BiquadFilterNode
  whooshGain: GainNode
  stop: () => void
}

function brownNoise(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = last * 3.5
  }
  return buffer
}

// Synthesised cabin ambience: low hull hum, air hiss, thruster rumble and a warp whoosh.
function createEngine(): Engine {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const noise = brownNoise(ctx, 4)
  const source = (buffer: AudioBuffer) => {
    const s = ctx.createBufferSource()
    s.buffer = buffer
    s.loop = true
    s.start()
    return s
  }

  // Air handling hiss
  const air = source(noise)
  const airFilter = ctx.createBiquadFilter()
  airFilter.type = "lowpass"
  airFilter.frequency.value = 520
  const airGain = ctx.createGain()
  airGain.gain.value = 0.16
  air.connect(airFilter).connect(airGain).connect(master)

  // Hull hum: slightly detuned low sines with a slow swell
  const hum = ctx.createGain()
  hum.gain.value = 0.05
  hum.connect(master)
  const oscs = [55, 55.35, 110.2, 164.9].map((f, i) => {
    const o = ctx.createOscillator()
    o.type = i === 2 ? "triangle" : "sine"
    o.frequency.value = f
    const g = ctx.createGain()
    g.gain.value = i < 2 ? 0.6 : 0.18
    o.connect(g).connect(hum)
    o.start()
    return o
  })
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.07
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 0.02
  lfo.connect(lfoGain).connect(hum.gain)
  lfo.start()

  // Thrusters: band-passed rumble opened by press-and-hold
  const thrust = source(noise)
  const thrustFilter = ctx.createBiquadFilter()
  thrustFilter.type = "bandpass"
  thrustFilter.frequency.value = 180
  thrustFilter.Q.value = 0.7
  const thrustGain = ctx.createGain()
  thrustGain.gain.value = 0
  thrust.connect(thrustFilter).connect(thrustGain).connect(master)

  // Warp whoosh driven by scroll speed
  const whoosh = source(noise)
  const whooshFilter = ctx.createBiquadFilter()
  whooshFilter.type = "highpass"
  whooshFilter.frequency.value = 900
  const whooshGain = ctx.createGain()
  whooshGain.gain.value = 0
  whoosh.connect(whooshFilter).connect(whooshGain).connect(master)

  return {
    ctx,
    master,
    thrustGain,
    thrustFilter,
    whooshGain,
    stop: () => {
      ;[air, thrust, whoosh, lfo, ...oscs].forEach((n) => n.stop())
      ctx.close()
    },
  }
}

export default function Sound() {
  const [on, setOn] = useState(false)
  const engine = useRef<Engine | null>(null)

  useEffect(() => {
    if (!on) return
    const e = engine.current ?? (engine.current = createEngine())
    e.ctx.resume()
    const now = e.ctx.currentTime
    e.master.gain.cancelScheduledValues(now)
    e.master.gain.setTargetAtTime(0.9, now, 0.8)

    let holding = false
    const down = (ev: PointerEvent) => {
      if (!(ev.target as HTMLElement).closest("a, button, input, textarea, nav")) holding = true
    }
    const up = () => (holding = false)
    window.addEventListener("pointerdown", down)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointercancel", up)

    let lastY = window.scrollY
    let lastT = performance.now()
    let speed = 0
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const t = performance.now()
      const dt = Math.max((t - lastT) / 1000, 0.001)
      speed += (Math.abs(window.scrollY - lastY) / dt - speed) * 0.1
      lastY = window.scrollY
      lastT = t
      const ct = e.ctx.currentTime
      e.thrustGain.gain.setTargetAtTime(holding ? 0.55 : 0, ct, holding ? 0.35 : 0.15)
      e.thrustFilter.frequency.setTargetAtTime(holding ? 520 : 180, ct, 0.6)
      e.whooshGain.gain.setTargetAtTime(Math.min(speed / 4000, 0.35), ct, 0.12)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
      window.removeEventListener("pointercancel", up)
      const ct = e.ctx.currentTime
      e.master.gain.cancelScheduledValues(ct)
      e.master.gain.setTargetAtTime(0, ct, 0.25)
    }
  }, [on])

  useEffect(() => () => engine.current?.stop(), [])

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={on}
      aria-label={on ? "サウンドをオフにする" : "サウンドをオンにする"}
      onClick={() => setOn((v) => !v)}
    >
      <span className="sound-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="sound-label">{on ? "Sound on" : "Sound off"}</span>
    </button>
  )
}
