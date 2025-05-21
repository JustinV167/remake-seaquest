import Platform from '../entities/Platform.js'

class WorldTemplate {
    constructor(scene,) {
        this.scene = scene
        const width = this.scene.cameras.main.width
        const height = this.scene.cameras.main.height

        //Limites de movimiento
        const rectangle = this.scene.add.graphics();
        rectangle.fillStyle(0x465bbb, 1);
        rectangle.fillRect(0, 0, width, height / 7.9);
        this.scene.physics.world.setBoundsCollision(true, true, true, true);

        //Arena
        const floor = new Platform(this.scene, null, null, 'sand')
        this.ground = floor.createPlatformRow(height);

        //arcoiris Superior 
        const topLimit = new Platform(this.scene, null, null, 'rainbow', { width: 50, height: 40 })
        this.rainbow = topLimit.createPlatformRow(height / 7)

        //olas superiores
        const seaTop = new Platform(this.scene, 0, 0, 'sea', { width: 128, height: 40 })
        this.sea = seaTop.createPlatformRow(height / 4.5)
        this.sea.setDepth(10)

        this.platforms2 = this.scene.physics.add.staticGroup()
        this.projectiles = this.scene.physics.add.group()
    }
    addEntityCollider(entity) {
        this.scene.physics.add.collider(entity, this.ground)
        this.scene.physics.add.collider(entity, this.seaTop)
        this.scene.physics.add.collider(entity, this.rainbow)
    }
}
export default WorldTemplate