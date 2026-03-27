"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 600
const SPREAD_X = 14
const SPREAD_Y = 8
const SPREAD_Z = 4
const DRIFT_SPEED = 0.00018
const DRIFT_AMPLITUDE = 0.12
const MOUSE_PARALLAX_STRENGTH = 0.012

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    // Scene & camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 8

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const phases = new Float32Array(PARTICLE_COUNT)      // per-particle time offset
    const axes = new Float32Array(PARTICLE_COUNT * 3)    // drift direction per particle

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD_X
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      phases[i] = Math.random() * Math.PI * 2
      // drift direction: mostly horizontal, slight vertical
      axes[i * 3]     = (Math.random() - 0.5) * 2
      axes[i * 3 + 1] = (Math.random() - 0.5) * 0.6
      axes[i * 3 + 2] = (Math.random() - 0.5) * 0.4
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3))

    // Detect color scheme for particle color
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const particleColor = isDark ? 0xffffff : 0x1a1a1a

    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.04,
      transparent: true,
      opacity: isDark ? 0.28 : 0.18,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Mouse tracking
    const mouse = { x: 0, y: 0 }
    const targetCameraOffset = { x: 0, y: 0 }
    const currentCameraOffset = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      targetCameraOffset.x = mouse.x * MOUSE_PARALLAX_STRENGTH
      targetCameraOffset.y = mouse.y * MOUSE_PARALLAX_STRENGTH
    }
    window.addEventListener("mousemove", onMouseMove)

    // Resize handling
    const setSize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    setSize()

    const resizeObserver = new ResizeObserver(setSize)
    resizeObserver.observe(canvas)

    // Animation
    let frameId: number
    const basePositions = positions.slice()

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate)

      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const t = time * DRIFT_SPEED + phases[i]
        const drift = Math.sin(t) * DRIFT_AMPLITUDE
        arr[i * 3]     = basePositions[i * 3]     + axes[i * 3]     * drift
        arr[i * 3 + 1] = basePositions[i * 3 + 1] + axes[i * 3 + 1] * drift
        arr[i * 3 + 2] = basePositions[i * 3 + 2] + axes[i * 3 + 2] * drift
      }
      posAttr.needsUpdate = true

      // Smooth camera parallax
      currentCameraOffset.x += (targetCameraOffset.x - currentCameraOffset.x) * 0.05
      currentCameraOffset.y += (targetCameraOffset.y - currentCameraOffset.y) * 0.05
      camera.position.x = currentCameraOffset.x
      camera.position.y = currentCameraOffset.y

      renderer.render(scene, camera)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
