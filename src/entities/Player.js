import Missile from '../entities/Missile.js'

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.missile = [];
    this.limit = 90
    this.surface = false
    this.alive = true;
    this.setCollideWorldBounds(true);
    this.setScale(1.5);
    this.speed = 200;
    this.fireOn = true;
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

    if (cursors.space.isDown && this.fireOn && this.alive == true && this.surface == false) {
      const missile = new Missile(this.scene, this.x, this.y, "missile", this.flipX, this.deleteMissile.bind(this))
      this.missile.push(missile)
      this.cooldownFire()
    }
  }
  reset() {
    this.disableBody(true, true)
    this.fireOn = false
    this.alive = false
  }
  deleteMissile() {
    this.missile.shift()
  }
  cooldownFire() {
    this.fireOn = false
    setTimeout(() => { this.fireOn = true }, 400)
  }
  underWater() {
    this.surface = this.y <= this.limit;
  }
  update() {
    // this.missile = this.missile.filter(m => m.active);
    this.underWater()
    this.missile.forEach(m => m.update());

  }
}

export default Player
