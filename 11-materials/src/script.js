import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import GUI from 'lil-gui'

// Debug
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.generateMipmaps = false
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter

// Objects

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({
//   //   color: 0xff0000,
//   map: doorColorTexture,
//   //   alphaMap: doorAlphaTexture,
//   side: THREE.DoubleSide
//   //   transparent: true,
//   //   opacity: 0.5,
//   //   wireframe: true
// })

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial({
//   side: THREE.DoubleSide
//   //   flatShading: true,
//   //   transparent: true,
//   //   opacity: 0.5
//   //   wireframe: true
// })

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
//   side: THREE.DoubleSide
//   //   flatShading: true,
//   //   transparent: true,
//   //   opacity: 0.5
// })

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial({
//   side: THREE.DoubleSide
//   //   transparent: true,
//   //   opacity: 0.5,
//   //   wireframe: true
// })

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial({
//   //   color: 0xff0000,
//   //   map: doorColorTexture,
//   side: THREE.DoubleSide
//   //   flatShading: true,
//   //   transparent: true,
//   //   opacity: 0.5,
//   //   wireframe: true
// })

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial({
//   //   color: 0xff0000,
//   //   map: doorColorTexture,
//   shininess: 100,
//   specular: 0x1188ff,
//   side: THREE.DoubleSide
//   //   transparent: true,
//   //   opacity: 0.5,
//   //   wireframe: true
// })

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial({
//   //   color: 0xff0000,
//   //   map: doorColorTexture,
//   gradientMap: gradientTexture,
//   side: THREE.DoubleSide
//   //   transparent: true,
//   //   opacity: 0.5,
//   //   wireframe: true
// })

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial({
//   map: doorColorTexture,
//   aoMap: doorAmbientOcclusionTexture,
//   aoMapIntensity: 1,
//   displacementMap: doorHeightTexture,
//   displacementScale: 0.05,
//   metalnessMap: doorMetalnessTexture,
//   roughnessMap: doorRoughnessTexture,
//   normalMap: doorNormalTexture,
//   normalScale: new THREE.Vector2(0.5, 0.5),
//   alphaMap: doorAlphaTexture,
//   metalness: 1,
//   roughness: 1,
//   side: THREE.DoubleSide,
//   transparent: true
//   //   opacity: 0.5,
//   //   wireframe: true
// })

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial({
  map: doorColorTexture,
  aoMap: doorAmbientOcclusionTexture,
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture,
  displacementScale: 0.05,
  metalnessMap: doorMetalnessTexture,
  roughnessMap: doorRoughnessTexture,
  normalMap: doorNormalTexture,
  normalScale: new THREE.Vector2(0.5, 0.5),
  alphaMap: doorAlphaTexture,
  metalness: 1,
  roughness: 1,
  side: THREE.DoubleSide,
  transparent: true,
  //   clearcoat: 1,
  //   clearcoatRoughness: 0,
  //   sheen: 1,
  //   sheenRoughness: 0.25,
  //   sheenColor: 0xffffff,
  //   iridescence: 1,
  //   iridescenceIOR: 1,
  //   iridescenceThicknessRange: [100, 800],
  transmission: 1,
  ior: 1.5,
  thickness: 0.5
  //   opacity: 0.5,
  //   wireframe: true
})

gui.add(material, 'metalness').name('Metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').name('Roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoat').name('Clearcoat').min(0).max(1).step(0.0001)
// gui
//   .add(material, 'clearcoatRoughness')
//   .name('Clearcoat roughness')
//   .min(0)
//   .max(1)
//   .step(0.0001)
// gui.add(material, 'sheen').name('Sheen').min(0).max(1).step(0.0001)
// gui
//   .add(material, 'sheenRoughness')
//   .name('Sheen roughness')
//   .min(0)
//   .max(1)
//   .step(0.0001)
// gui.addColor(material, 'sheenColor').name('Sheen color')
// gui.add(material, 'iridescence').name('Iridescence').min(0).max(1).step(0.0001)
// gui
//   .add(material, 'iridescenceIOR')
//   .name('Iridescence IOR')
//   .min(1)
//   .max(2.333)
//   .step(0.0001)
// gui
//   .add(material.iridescenceThicknessRange, '0')
//   .name('Iridescence thickness lower range')
//   .min(1)
//   .max(1000)
//   .step(1)
// gui
//   .add(material.iridescenceThicknessRange, '1')
//   .name('Iridescence thickness higher range')
//   .min(1)
//   .max(1000)
//   .step(1)
gui
  .add(material, 'transmission')
  .name('Transmission')
  .min(0)
  .max(1)
  .step(0.0001)
gui.add(material, 'ior').name('IOR').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').name('Thickness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)

sphere.position.x = -1.5
torus.position.x = 1.5
scene.add(sphere, plane, torus)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.x = -0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
