import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import Person from '../entities/Person.js'

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" })
    this.personSave=0
  }
  create() {
     this.platforms = this.physics.add.staticGroup()
    
    const tileWidth = 128;
    const tileHeight = 40;
    const tilesNeeded = Math.ceil(this.cameras.main.width / tileWidth) + 1;
    
    for (let i = 0; i < tilesNeeded; i++) {
      this.platforms.create(
        i * tileWidth,
        this.cameras.main.height - tileHeight/2,
        'sand'
      )
      .setOrigin(0, 0.5)
      .refreshBody()
    }
    this.player = new Player(this, 100, 200, 'submarine')
    this.person = new Person(this, 100, 100, 'person',false)
    this.enemy = new Enemy(this, 200, 150, 'fish');
    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.platforms)
  }
  update() {
    this.player.movement(this.cursors)
    this.player.update()
    this.enemy.update()
    this.person.update()
    this.physics.world.collide(this.person,this.player,this.personCollider.bind(this))
  }
  personCollider(){
    this.personSave++
    this.person.reset()
  this.player.movement(this.cursors);
  this.player.update();
  this.enemy.update();
  }
}

export default Game

