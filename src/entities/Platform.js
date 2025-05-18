import CollisionObject from "./CollisionObject.js";

class Platform extends CollisionObject {
  constructor(scene, x, y, texture, tileConfig) {
    super(scene, x, y, texture, { enablePhysics: false });
    
    // Configuración específica de tiles
    this.tileWidth = tileConfig?.width || 128;
    this.tileHeight = tileConfig?.height || 40;
    this.tileTexture = texture;
    this.setVisible(false).setActive(false);
  }

  createPlatformRow(yPosition) {
    const tilesNeeded = Math.ceil(this.scene.cameras.main.width / this.tileWidth) + 1;
    const platforms = this.scene.physics.add.staticGroup();

    for (let i = 0; i < tilesNeeded; i++) {
      platforms.create(
        i * this.tileWidth,
        yPosition - (this.tileHeight / 2),
        this.tileTexture
      )
      .setOrigin(0, 0.5)
      .refreshBody();
    }

    return platforms;
  }
}

export default Platform
