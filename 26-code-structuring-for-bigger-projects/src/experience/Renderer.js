import { CineonToneMapping, PCFSoftShadowMap, WebGLRenderer } from 'three'

export default class Renderer {
    constructor(experience) {
        // Options
        this.canvas = experience.canvas
        this.sizes = experience.sizes
        this.scene = experience.scene
        this.camera = experience.camera

        // Instantiate
        this.setInstance()
    }

    setInstance() {
        this.instance = new WebGLRenderer({ canvas: this.canvas, antialias: true })
        this.instance.toneMapping = CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = PCFSoftShadowMap
        this.instance.setClearColor(0x211d20)
        this.resize()
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}