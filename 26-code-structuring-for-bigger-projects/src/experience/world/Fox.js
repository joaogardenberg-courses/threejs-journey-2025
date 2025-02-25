import { AnimationMixer, Mesh } from 'three'

export default class Fox {
    constructor(experience) {
        this.scene = experience.scene
        this.resources = experience.resources
        this.time = experience.time
        this.debug = experience.debug

        // Debug
        if (this.debug.active) this.debugFolder = this.debug.gui.addFolder('Fox')

        // Setup
        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.setScalar(0.02)

        this.model.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true
            }
        })

        this.scene.add(this.model)
    }

    setAnimation() {
        this.animation = { mixer: new AnimationMixer(this.model) }

        this.animation.actions = {
            idle: this.animation.mixer.clipAction(this.resource.animations[0]),
            walking: this.animation.mixer.clipAction(this.resource.animations[1]),
            running: this.animation.mixer.clipAction(this.resource.animations[2]),
        }

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(this.animation.actions.current, 1)

            this.animation.actions.current = newAction
        }

        if (this.debug.active) {
            const debugObject = {
                playIdle: () => this.animation.play('idle'),
                playWalking: () => this.animation.play('walking'),
                playRunning: () => this.animation.play('running'),
            }

            this.debugFolder.add(debugObject, 'playIdle').name('Idle')
            this.debugFolder.add(debugObject, 'playWalking').name('Walking')
            this.debugFolder.add(debugObject, 'playRunning').name('Running')
        }
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}