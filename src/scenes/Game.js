import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'

class Game extends Phaser.Scene {
  constructor() {
    super({key: "Game"})
  }

  create() {
   
  this.player = new Player(this, 100, 300, 'submarine')
  this.enemy = new Enemy(this, 200, 350, 'fish')

  this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
  this.player.movement(this.cursors)
  this.enemy.update()
  }

}

export default Game

