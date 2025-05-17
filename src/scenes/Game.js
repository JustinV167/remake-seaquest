import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import Person from '../entities/Person.js'

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" })
    this.personSave=0
  }
  create() {
    this.player = new Player(this, 100, 300, 'submarine')
    this.enemy = new Enemy(this, 200, 350, 'fish')
    this.person = new Person(this, 100, 200, 'person',false)
    this.cursors = this.input.keyboard.createCursorKeys()
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
  }
}

export default Game

