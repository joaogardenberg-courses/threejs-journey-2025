import { Mesh, Scene } from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Resources from './utils/Resources'
import Debug from './utils/Debug'
import World from './world/World'
import Camera from './Camera'
import Renderer from './Renderer'

export default class Experience {
    constructor(canvas) {
        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources()
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.world = new World(this)

        // Resize event
        this.sizes.on('resize', this.resize.bind(this))

        // Tick event
        this.time.on('tick', this.update.bind(this))

        // Make it globally available for debugging and testing
        window.experience = this
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.geometry.dispose()

                Object.entries(child.material).forEach(([, value]) =>
                    value && typeof value.dispose === 'function' &&
                    value.dispose()
                )
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active) this.debug.gui.destroy()
    }
}