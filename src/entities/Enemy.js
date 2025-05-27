import Missile from '../entities/Missile.js'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, bool, sign) {
    super(scene, x, y, texture)

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.missile= []
    this.limit = 90
    this.surface = false
    this.setCollideWorldBounds(false);
    this.setScale(1.5);
    this.scene = scene;
    this.speed = 180;
    this.direction = sign;
    this.bool = bool;
    this.shootInterval = 1500;
    this.shootTimer = 0;
    this.initialY = y; 
    this.amplitude = 6; 
    this.frequency = 0.009; 
  }

 preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    this.setVelocityX(this.speed * this.direction);
    this.y = this.initialY + Math.sin(this.x * this.frequency) * this.amplitude;
    this.movement()
    this.underWater()

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
   if (this.x > this.scene.cameras.main.width + 10) {
      this.emit('enemyOut')
      this.reset();
  } else if (this.x < -50) {
      this.emit('enemyOut')
      this.reset();
  }

    if (this.direction === -1) {
      this.flipX = true;
    } else{
      this.flipX = false;
    }
  }

  die() {

    const deathEmitter = this.scene.add.particles(this.x, this.y, 'Enemyflares', {
    speed: { min: 20, max: 100 },
    angle: { min: 0, max: 360 },
    lifespan: 200,
    scale: { start: 0.1, end: 0.3 },
    gravityY: 50,
    accelerationX: { min: -10, max: 10 },
    accelerationY: { min: -10, max: 10 },
    alpha: { start: 1, end: 0 },
    });
 
    this.scene.time.delayedCall(500, () => {
      deathEmitter.setVisible(false); 
    });

    this.scene.cameras.main.shake(300, 0.02);
    this.reset()
  }

  reset() {

    if (this.body) {
        this.scene.physics.world.remove(this.body);
    }
    
    // 2. Limpiar todos los eventos
    this.removeAllListeners();
    
    // 3. Remover de grupos
    if (this.scene.enemies.contains(this)) {
        this.scene.enemies.remove(this, true, true);
    }
    this.destroy();
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
