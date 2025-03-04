import {
  CircleGeometry,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace
} from 'three'

export default class Floor {
  constructor(experience) {
    this.scene = experience.scene
    this.resources = experience.resources

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new CircleGeometry(5, 64)
  }

  setTextures() {
    this.textures = {
      color: this.resources.items.dirtColorTexture,
      normal: this.resources.items.dirtNormalTexture
    }

    this.textures.color.colorSpace = SRGBColorSpace
    this.textures.color.repeat.setScalar(1.5)
    this.textures.color.wrapS = RepeatWrapping
    this.textures.color.wrapT = RepeatWrapping

    this.textures.normal.repeat.setScalar(1.5)
    this.textures.normal.wrapS = RepeatWrapping
    this.textures.normal.wrapT = RepeatWrapping
  }

  setMaterial() {
    this.material = new MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    })
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
