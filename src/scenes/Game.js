import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import Person from '../entities/Person.js'

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" })
    this.personSave=0
    this.points=0
  }
  create() {
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.platforms = this.physics.add.staticGroup()
    this.projectiles = this.physics.add.group()
    this.enemies = this.physics.add.group()
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
    this.enemy = new Enemy(this, 50, 150, 'fish', true);
    this.enemies.add(this.enemy)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.player, this.enemies, this.playerHitEnemy, null, this);
  }
  update() {
    this.player.movement(this.cursors)
    this.player.update()
    this.enemy.update()
    this.person.update()
    this.physics.world.collide(this.person,this.player,this.personCollider.bind(this))
    this.physics.add.collider(this.player.missile, this.enemies, this.projectileHitEnemy.bind(this));
    console.log(this.points)
  }
  personCollider(){
    this.personSave++
    this.person.reset()
  }
  projectileHitEnemy(projectile, enemies){
  projectile.reset()
  enemies.reset()
  this.points += 20
  } 
  playerHitEnemy(player, enemy){
  player.reset()
  enemy.reset()
  }
}

export default Game

