import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

export default class World {
    constructor(experience) {
        // Options
        this.scene = experience.scene
        this.resources = experience.resources

        // Setup
        this.resources.on('ready', () => {
            this.floor = new Floor(experience)
            this.fox = new Fox(experience)
            this.environment = new Environment(experience)
        })
    }

    update() {
        if (this.fox) this.fox.update()
    }
}