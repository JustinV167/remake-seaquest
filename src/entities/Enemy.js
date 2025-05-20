import Missile from '../entities/Missile.js'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, bool, sign) {
    super(scene, x, y, texture, bool, sign)

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.missile= []
    this.limit = 90
    this.surface = false
    this.setCollideWorldBounds(false);
    this.setScale(1.5);
    this.scene = scene;
    this.speed = 200;
    this.direction = sign;
    this.bool = bool;
    this.shootInterval = 2000;
    this.shootTimer = 0;
  }

 preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    this.setVelocityX(this.speed * this.direction);

    this.movement()
    this.underWater()
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
    movement() {
    if (this.direction === -1) {
      this.flipX = true;
    } else{
      this.flipX = false;
    }
  }
  reset() {
    this.disableBody(true, true);
  }
    deleteMissile() {
    this.missile.shift()
  }
  underWater() {
    this.surface = this.y <= this.limit;
  }
  shoot(bool){
    if (bool === true && this.surface == false) {
    const missile = new Missile(this.scene, this.x, this.y, "missile", this.flipX, this.deleteMissile.bind(this))
    this.missile.push(missile)
    }
  }

}

export default Enemy
