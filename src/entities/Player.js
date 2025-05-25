import Missile from '../entities/Missile.js'

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, lifesSystem, audio) {
    super(scene, x, y, texture)
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.audio = audio
    this.lifesSystem = lifesSystem
    this.missile = [];
    this.limit = 90
    this.surface = false
    this.alive = true;
    this.setCollideWorldBounds(true);
    this.setScale(1.8);
    this.speed = 210;
    this.fireOn = true;
    this.setDepth(0)
    this.initX = x
    this.initY = y
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

    if (cursors.left.isDown && this.alive === true) {
      this.setVelocityX(-this.speed);
      this.flipX = true;
    } else if (cursors.right.isDown && this.alive === true) {
      this.setVelocityX(this.speed);
      this.flipX = false;
    }

    if (cursors.space.isDown && this.fireOn && this.alive == true && this.surface == false) {
      this.audio.play('shoot', { seek: 0, rate: 1, volume: 1, loop: false });
      const missile = new Missile(this.scene, this.x, this.y, "missile", this.flipX, this.deleteMissile.bind(this))
      this.missile.push(missile)
      this.cooldownFire()
    }
  }
  reset() {
    this.disableBody(true, true)
    this.audio.play('die', { volume: 0.8 })
    this.lifesSystem.removeLife(1)
    this.fireOn = false
  }
  takeDamage() {
    this.body.enable = false
    this.alive = false 
    this.scene.time.delayedCall(100, () => {
        if (!this.alive) this.scene.enemySpawner.clearAllEnemies();
    });
    this.scene.tweens.addCounter({
      from: 0,
      to: 5, // Número de parpadeos
      duration: 1000, // Duración total
      onUpdate: (tween) => {
        const value = Math.floor(tween.getValue());
        this.setVisible(value % 2 === 0); // Alternar visibilidad
      },
      onComplete: () => {
        this.setVisible(true);
        this.die();
      }
    });
  }
  die() {
    const deathEmitter = this.scene.add.particles(this.x, this.y, 'flares', {
      scale: { start: 0.3, end: 0 },
      speed: { min: 50, max: 300 },
      angle: { min: 0, max: 360 },
      lifespan: 500,
      quantity: 5,
      blendMode: 'ADD',
      gravityY: 200,
      emitting: true
    });

    this.reset()
    this.scene.time.delayedCall(1000, () => {
      deathEmitter.destroy();
      this.fireOn = true
    });

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
    this.missile = this.missile.filter(m => m.active);
    this.underWater()
    this.missile.forEach(m => m.update());

  }
  outOxigen() {
    if (this.alive)
      this.takeDamage()
  }
  rechargeAllOxygen() {
    this.body.moves = true
    this.audio.play('recover', { volume: 0.8 })
  }
  recover() {
    this.surface = false
    this.setActive(true)
    this.setVisible(true)
    this.body.enable = true
    this.alive = true
    this.x = this.initX
    this.y = this.initY
  }
}

export default Player
