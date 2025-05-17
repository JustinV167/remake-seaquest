import Missile from '../entities/Missile.js'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, bool) {
    super(scene, x, y, texture, bool)

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.missile= []
    this.setCollideWorldBounds(false);
    this.setScale(1.5);
    this.scene = scene;
    this.speed = 200;
    this.direction = 1;
    this.bool = bool;
    this.shootInterval = 2000;
    this.shootTimer = 0;
  }

 preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    // Movimiento básico
    this.setVelocityX(this.speed * this.direction);

    if (this.x > this.scene.cameras.main.width + 10) {
      this.reset();
    } else if (this.x < -50) {
      this.reset();
    }
    this.missile = this.missile.filter(m => m.active);
    this.missile.forEach(m => m.update());

      this.shootTimer += delta;
    if (this.bool) {
      if (this.shootTimer >= this.shootInterval) {
        this.shoot(this.bool);
        this.shootTimer = 0;
      }
    }
  }
  reset() {
    this.disableBody(true, true);
  }
    deleteMissile() {
    this.missile.shift()
  }
  shoot(bool){
    if (bool === true) {
    const missile = new Missile(this.scene, this.x, this.y, "missile", this.flipX, this.deleteMissile.bind(this))
    this.missile.push(missile)
    }
  }

}

export default Enemy
