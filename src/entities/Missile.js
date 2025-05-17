class Missile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction, resetCallback) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(false);
        this.resetCallback = resetCallback
        this.direction = direction
        this.flipX = direction
        this.speed = 600
        this.scene = scene
        this.id = Math.floor(Math.random() * 999)
    }
    update() {
        this.setVelocityX(this.direction ? - this.speed : this.speed)
        if (this.x > this.scene.cameras.main.width + 10) {
            this.reset();
        } else if (this.x < -50) {
            this.reset();
        }
    }
    reset() {
        if (this.resetCallback)
            this.resetCallback(this.id)
        this.disableBody(true, true);
    }
}
export default Missile
