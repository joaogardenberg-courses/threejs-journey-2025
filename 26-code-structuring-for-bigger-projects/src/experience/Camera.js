import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

export default class Camera {
  constructor(experience) {
    // Options
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.canvas = experience.canvas

    // Instantiate
    this.setInstance()

    // Add orbit controls
    this.setOrbitControls()
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
