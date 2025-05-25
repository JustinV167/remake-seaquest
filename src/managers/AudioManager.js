class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.sounds = new Map();
    }

    add(key, config = {}) {
        const sound = this.scene.sound.add(key, config);
        this.sounds.set(key, sound);
        return sound;
    }

    play(key, overrides = {}) {
        if (!this.sounds.has(key)) {
            this.add(key);
        }
        this.sounds.get(key).play(overrides);
    }
}

export default AudioManager
