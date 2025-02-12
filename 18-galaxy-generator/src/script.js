import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Galaxy
const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 0.5,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984'
}

let geometry = null
let material = null
let galaxy = null

const generateGalaxy = () => {
  if (galaxy) scene.remove(galaxy)

  if (geometry) geometry.dispose()

  if (material) material.dispose()

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)
  const colors = new Float32Array(parameters.count * 3)
  const insideColor = new THREE.Color(parameters.insideColor)
  const outsideColor = new THREE.Color(parameters.outsideColor)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3
    const radius = Math.random() * parameters.radius
    const spinAngle = radius * parameters.spin

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)

    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)

    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = insideColor
      .clone()
      .lerp(outsideColor, radius / parameters.radius)
    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  })

  galaxy = new THREE.Points(geometry, material)
  scene.add(galaxy)
}

generateGalaxy()

gui
  .add(parameters, 'count')
  .name('Count')
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, 'size')
  .name('Size')
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, 'radius')
  .name('Radius')
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, 'branches')
  .name('Branches')
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, 'spin')
  .name('Spin')
  .min(-1.5)
  .max(1.5)
  .step(0.001)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, 'randomness')
  .name('Randomness')
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, 'randomnessPower')
  .name('Randomness power')
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy)

gui
  .addColor(parameters, 'insideColor')
  .name('Inside color')
  .onFinishChange(generateGalaxy)

gui
  .addColor(parameters, 'outsideColor')
  .name('Outside color')
  .onFinishChange(generateGalaxy)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
