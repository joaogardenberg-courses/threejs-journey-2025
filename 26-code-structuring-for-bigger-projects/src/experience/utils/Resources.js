import { CubeTextureLoader, Path, TextureLoader } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import EventEmitter from './EventEmitter'
import sources from '../sources.json'

export default class Resources extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.items = {}
        this.toLoad = sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new TextureLoader(),
            cubeTextureLoader: new CubeTextureLoader(),
        }
    }

    startLoading() {
        sources.forEach((source) => {
            switch (source.type) {
                case 'gltfModel':
                    this.loaders.gltfLoader.load(source.path, (file) => this.sourceLoaded(source, file))
                    break;
                case 'cubeTexture':
                    this.loaders.cubeTextureLoader.load(source.path, (file) => this.sourceLoaded(source, file))
                    break;
                default: // Texture
                    this.loaders.textureLoader.load(source.path, (file) => this.sourceLoaded(source, file))
            }
        })
    }

    sourceLoaded({ name }, file) {
        this.items[name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}