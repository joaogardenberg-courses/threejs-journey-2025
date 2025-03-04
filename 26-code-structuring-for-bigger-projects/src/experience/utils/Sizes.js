import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.resize()

    // Resize event
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.trigger('resize')
  }
}
