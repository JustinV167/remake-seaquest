class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(1.5);
    this.setCollideWorldBounds(false);
    this.scene = scene;
    this.speed = 200;
    this.direction = 1;
  }

  update() {
    this.setVelocityX(this.speed * this.direction);

    if (this.x > this.scene.cameras.main.width + 10) {
      this.reset();
    } else if (this.x < -50) {
      this.reset();
    }
  }

  reset() {
    this.disableBody(true, true);
  }

}

export default Enemy
