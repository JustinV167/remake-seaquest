class Missile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction, resetCallback) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setCollideWorldBounds(false);
        this.resetCallback = resetCallback
        this.direction = direction
        this.flipX = direction
        this.speed = 600
        this.scene = scene
        this.id = Math.floor(Math.random() * 999)
    }
  isActive() {
    return this.active; 
  }
    update() {
        if (!this.active) return;
        this.setVelocityX(this.direction ? - this.speed : this.speed)
        if (this.x > this.scene.cameras.main.width + 10) {
            this.reset();
        } else if (this.x < -50) {
            this.reset();
        }
    }
    reset(x, y, flipX) {
          this.setPosition(x, y);
          this.flipX = flipX;
          this.setActive(true);
    this.setVisible(true);
        if (this.resetCallback)
            this.resetCallback(this.id)
      if (this.body) {
        this.scene.physics.world.remove(this.body);
      this.body.enable = true;
      this.body.velocity.x = 0; // Resetear física si es necesario
      this.body.velocity.y = 0;
    }
    
    // 2. Limpiar todos los eventos
    this.removeAllListeners();
    
    // 4. Destrucción final
        this.destroy();
    }
}
export default Missile
