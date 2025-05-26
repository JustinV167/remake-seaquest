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

    //ruta
    this.load.setPath('./assets/');

    //fuente
    this.load.font('retropix', './fonts/retropix.otf');
    
    //spritesheet
    this.load.spritesheet('person', './personSwimming.png',
      {
        frameWidth: 48,frameHeight:48, 
        startFrame: 0, endFrame: 5
      });

  //imagen
  this.load.image('instructive', './instructive.png');
  this.load.image('rules', './rules.png');
  this.load.image('menu', ('./Menu.png'));
  this.load.image('submarine', './submarine_0.png');
  this.load.image('missile', './/missile.png');
  this.load.image('evilSubmarine', './evilSubmarine.png');
  this.load.image('fish', './fish.png');
  this.load.image('bar', './bar.png');
  this.load.image('rainbow', './rainbow.png');
  this.load.image('sand', './sandcube.png');
  this.load.image('sea', './sea.png');  
  this.load.image('flares', './flares.png');
  this.load.image('Enemyflares', './EnemyFlares.png');

  //audio
  this.load.audio('get', './audio/get.mp3')
  this.load.audio('recover', './audio/recover.wav')
  this.load.audio('shoot', './audio/shoot.wav')
  this.load.audio('hit', './audio/hit.wav')
  this.load.audio('die', './audio/die.wav')



  }

  create(){
    WebFont.load({
            custom: {
                families: ['retropix'],
                urls: ['assets/fonts/retropix.css']
            },
            active: () => {
                console.log('Fuente cargada correctamente');
                this.scene.start('Menu');
            }
        });
  }

}

export default Preload

