class Person extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, initDirection = false, speed = 130) {
    super(scene, x, y, texture)
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
    if (!this.scene.anims.get('person__move')) {
    this.scene.anims.create({
      key: 'person__move',
      frames: this.anims.generateFrameNumbers(texture, { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      repeat: -1
    })
  }
    this.speed = speed;
    this.flipX = initDirection
    this.direction = initDirection
    this.anims.play('person__move', true)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    if (!this.active) return
    this.setVelocityX(this.direction ? -this.speed : this.speed)
    if (this.x > this.scene.cameras.main.width + 10) {
      this.reset();
    } else if (this.x < -50) {
      this.reset();
    }
  }
  reset() {
    if (this.body) {
        this.scene.physics.world.remove(this.body);
    }
    
    // 2. Limpiar todos los eventos
    this.removeAllListeners();
    
    // 3. Remover de grupos
    if (this.scene.persons.contains(this)) {
        this.scene.persons.remove(this, true, true);
    }
    
    // 4. Destrucción final
    this.destroy();
  }
}

export default Person
