 class CollisionObject extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);
    
    const {
      scale = 1.5,
      speed = 200,
      collideWorldBounds = false,
      enablePhysics = true
    } = config;

    scene.add.existing(this);
    if (enablePhysics) {
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(collideWorldBounds);
    }

    // Propiedades
    this.setScale(scale);
    this.speed = speed;
    this.direction = 1;
    this.scene = scene;
  }
}

export default CollisionObject
