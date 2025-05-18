import CollisionObject from '../entities/CollisionObject.js'
import Platform from '../entities/Platform.js'
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
    const rectangle = this.add.graphics();
    rectangle.fillStyle(0x465bbb, 1);
    rectangle.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height/7.5);
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.platforms2 = this.physics.add.staticGroup()
    this.projectiles = this.physics.add.group()
    this.enemies = this.physics.add.group()
    const floor = new Platform(this, null, null, 'sand')
    this.ground = floor.createPlatformRow(this.cameras.main.height);
    const topLimit = new Platform(this, null, null, 'rainbow', {width: 50, height: 40})
    this.rainbow = topLimit.createPlatformRow(this.cameras.main.height/7)

    this.player = new Player(this, 100, 300, 'submarine')
    this.person = new Person(this, 100, 200, 'person',false)
    this.enemy = new Enemy(this, 50, 350, 'fish', true);

    const seaTop = new Platform(this, 0, 0, 'sea', {width: 128, height: 40})
    this.sea = seaTop.createPlatformRow(this.cameras.main.height/4.5)

    this.enemies.add(this.enemy)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.ground)
    this.physics.add.collider(this.player, this.rainbow)
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

