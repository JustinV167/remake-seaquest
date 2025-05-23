import CollisionObject from '../entities/CollisionObject.js'
import EnemySpawner from '../entities/EnemySpawner.js'
import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import Person from '../entities/Person.js'
import PersonsMenu from '../components/PersonsMenu.js'
import OxygenBar from '../components/OxygenBar.js'
import WorldTemplate from '../components/WorldTemplate.js'
import RechargeZone from '../components/RechargeZone.js'


class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" })
    this.personSave = 0
    this.points = 0
    this.forRound = 20
    this.level = 1
    this.difficultyLevel = 1;
    this.nextDifficulty = 2;
    this.enemySpeed = 180
    this.direction = this.randomSign()
    this.x = this.direction === -1 ? 920 : -20
    this.y = this.randomHigh()
  }
  create() {
    // Elementos visuales
    this.worldTemplate = new WorldTemplate(this)
    this.enemySpawner = new EnemySpawner(this)
    this.personsMenu = new PersonsMenu(this)
    this.personSave = this.personsMenu.counter.length
    this.OxygenBar = new OxygenBar(this,null,
      ()=>this.player.disableBody(true,true),//destruir cuando no tenga oxigeno
      ()=>this.player.body.moves=true)//habilitar movimiento cuando se llene la barra de oxigeno
    this.rechargeZone = new RechargeZone(this, this.OxygenBar,0, 70)

    // Entidades
    this.player = new Player(this, this.cameras.main.width / 2, 80, 'submarine')
    this.rechargeZone.entity = this.player
    this.worldTemplate.addEntityCollider(this.player)

    this.person = new Person(this, 100, 200, 'person', false)
    this.activeEnemies = 0;

    this.enemies = this.physics.add.group()
    this.enemies.setDepth(0)
  
    // Eventos
    this.max = this.cameras.main.width
    this.cursors = this.input.keyboard.createCursorKeys()

  }

  update(time, delta) {
    if (this.level >= this.nextDifficulty) {
      this.nextDifficulty++
      this.difficultyLevel++
      this.forRound += 10
      this.player.speed += 2.5
      this.enemySpawner.increaseDifficulty(this.difficultyLevel, this.nextDifficulty);
    }

    this.enemySpawner.update(time, delta)
    this.player.movement(this.cursors)
    this.player.update()
    this.person.update()
    this.physics.world.collide(this.person, this.player, this.personCollider.bind(this))
    this.physics.add.collider(this.player.missile, this.enemies, this.projectileHitEnemy.bind(this));
    this.physics.add.collider(this.enemies, this.player, this.playerHitEnemy.bind(this));
  }

  personCollider() {
    this.person.reset()
    if (this.personSave < 6) {
      this.personSave++
      this.level++
      this.personsMenu.addPerson()
    }
  }

  projectileHitEnemy(projectile, enemies) {
    projectile.reset()
    enemies.die()
    this.activeEnemies--;
    this.points += this.forRound
    console.log(this.points)
  }

  playerHitEnemy(player, enemy) {
    player.takeDamage()
    enemy.reset()
  }

  randomSign() {
    const sign = Math.floor((Math.random() * 2))
    return sign === 0 ? -1 : 1
  }

  randomHigh() {
    const sign = Math.max(79, Math.floor((Math.random() * 401)))
    return sign
  }

}

export default Game
