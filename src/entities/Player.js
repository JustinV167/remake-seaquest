import Missile from '../entities/Missile.js'

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.missile
    this.setScale(1.5);
    this.setCollideWorldBounds(true);
    this.scene = scene;
    this.speed = 200;
    this.fireOn = true
  }

  movement(cursors) {
    if (!cursors) return

    this.setVelocity(0);

    if (cursors.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);
    }

    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.flipX = true;
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.flipX = false;
    }
    if (cursors.space.isDown && !this.missile) {
      this.missile = new Missile(this.scene, this.x, this.y, "missile", this.flipX, this.deleteMissile.bind(this))
    }
  }
  deleteMissile() {
    this.missile = null
  }
  update() {
    if (this.missile)
      this.missile.update()
  }
}

export default Player
