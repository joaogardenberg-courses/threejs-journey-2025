import {
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace
} from 'three'

export default class Environment {
  constructor(experience) {
    // Options
    this.scene = experience.scene
    this.resources = experience.resources
    this.debug = experience.debug

    // Debug
    if (this.debug.active)
      this.debugFolder = this.debug.gui.addFolder('Environment')

    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new DirectionalLight(0xffffff, 4)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, -1.25)
    this.scene.add(this.sunLight)

    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('Sun light intensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('Sun light X')
        .min(-5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('Sun light Y')
        .min(-5)
        .max(5)
        .step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('Sun light Z')
        .min(-5)
        .max(5)
        .step(0.001)
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentMapTexture
    }

    this.environmentMap.texture.colorSpace = SRGBColorSpace
    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterials = () =>
      this.scene.traverse((child) => {
        if (
          child instanceof Mesh &&
          child.material instanceof MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })

    this.environmentMap.updateMaterials()

    if (this.debug.active)
      this.debugFolder
        .add(this.environmentMap, 'intensity')
        .name('Environment intensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onFinishChange(this.environmentMap.updateMaterials)
  }
}
