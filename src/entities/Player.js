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
    this.setDepth(0)
    this.originalTint = 0xffffff;
    this.hitTint = 0xff0000;
    
    // 2. Cargar sistema de partículas (NUEVA API)
    this.hitEmitter = this.scene.add.particles(0, 0, 'flares', {
      frame: 'red',
      scale: { start: 0.5, end: 0 },
      speed: 100,
      lifespan: 500,
      blendMode: 'ADD',
      emitting: false // No emitir hasta necesario
    });
    this.isDead = false;
    //Debug de hitboxes
    /*this.physics.world.createDebugGraphic();
    const debugGraphics = this.scene.add.graphics({ fillStyle: { color: 0xff00ff, alpha: 0.3 } });
    this.scene.physics.world.debugGraphic = debugGraphics;
    */
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

 takeDamage() {
    this.setTint(this.hitTint);
    
    this.hitEmitter.setPosition(this.x, this.y);
    this.hitEmitter.explode(10); // 10 partículas
    
    this.scene.time.delayedCall(300, () => {
      this.setTint(this.originalTint);
    });
  }

  die() {
    const deathEmitter = this.scene.add.particles(this.x, this.y, 'flares', {
      frame: ['red', 'yellow', 'white'],
      scale: { start: 0.8, end: 0 },
      speed: { min: 50, max: 300 },
      angle: { min: 0, max: 360 },
      lifespan: 800, 
      quantity: 15,
      blendMode: 'ADD',
      gravityY: 200,
      emitting: true
    });

      this.reset()
    this.scene.time.delayedCall(1000, () => {
      deathEmitter.destroy(); 
    });

    this.setTint(0x000000);
    this.scene.cameras.main.shake(300, 0.02);
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
