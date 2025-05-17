class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" })
  }

  preload() {
  this.load.on("complete", () => {
    this.scene.start("Menu")
  })
  const width = 300;
  const height = 20;
  const x = this.cameras.main.centerX - width / 2;
  const y = this.cameras.main.height / 2;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(x, y, width, height);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(x, y, width * value, height);
    });

    this.load.spritesheet('person', '../../assets/personSwimming.png',
      {
        frameWidth: 48,frameHeight:48, 
        startFrame: 0, endFrame: 5
      });

  this.load.image('submarine', '../../assets/submarine_0.png');
  this.load.image('missile', '../../assets/missile.png');
  this.load.image('evilSubmarine', '../../assets/evilSubmarine.png');
  this.load.image('fish', '../../assets/fish.png');
  this.load.image('person', '../../assets/personSwimming.png');
  this.load.image('bar', '../../assets/bar.png');
  this.load.image('progress', '../../assets/progress.png');
  this.load.image('sand', '../../assets/sandcube.png');

  }

}

export default Preload

