import AudioManager from '../managers/AudioManager.js'
import EnemySpawner from '../entities/EnemySpawner.js'
import Player from '../entities/Player.js'
import PersonsMenu from '../components/PersonsMenu.js'
import OxygenBar from '../components/OxygenBar.js'
import WorldTemplate from '../components/WorldTemplate.js'
import RechargeZone from '../components/RechargeZone.js'
import Lifes from '../components/Lifes.js'
import SystemPoints from '../components/SystemPoints.js'
import PersonSpawner from '../entities/personSpawner.js'


class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" })
    this.personSave = 0
    this.points = 0
    this.extraLifeTrigger = 10000
    this.forRound
    this.level = 1
    this.difficultyLevel = 1;
    this.nextDifficulty = 2;
    this.enemySpeed = 180
    this.direction = this.randomSign()
    this.x = this.direction === -1 ? 920 : -20
    this.y = this.randomHigh()
    this.enemyTypes = ['fish', 'evilSubmarine'];
    this.spawnCooldown = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 3000;
    this.lifes = 3
    this.pointOfOxygen=10
    this.pointOfPerson=50

  }
  create() {
    this.audioManager = new AudioManager(this);
    this.forRound = 20
    // Elementos visuales
    this.worldTemplate = new WorldTemplate(this)
    this.enemySpawner = new EnemySpawner(this)
    this.personsMenu = new PersonsMenu(this)
    this.personSave = this.personsMenu.counter.length
    this.oxygenBar = new OxygenBar(this, null, this.audioManager)
    this.lifes = new Lifes(this, null, () => setTimeout(() => this.scene.start('GameOver'), 1000))
    this.systemPoints = new SystemPoints(this)
    this.personsSpawner = new PersonSpawner(this)
    this.rechargeZone = new RechargeZone(this, this.oxygenBar, 0, 70, async () => {
      this.player.body.moves = false
      if (this.personsMenu.counter.length < 6) {
        this.personsMenu.removePerson()
        return true
      } else {
        this.oxygenBar.setStateDiscount({ paused: true })
        let oxygenPoints=this.pointOfOxygen*parseInt(this.oxygenBar.nOxygen/10)
        this.oxygenBar.timerReduceOxygen(10, 500)
        this.systemPoints.addPoints(oxygenPoints,this.pointOfOxygen,500)
        await new Promise((res)=>setTimeout(()=>res(),500*parseInt((this.oxygenBar.nOxygen/10)+1)))
        let timerPersons=this.personsMenu.counter.length*500
        this.personsMenu.removeAllPerson(500)
        this.systemPoints.addPoints(this.pointOfPerson*6,this.pointOfPerson,500)
        await new Promise((res)=>setTimeout(()=>res(),timerPersons))
        return true        
      }
    })
    // Entidades
    this.player = new Player(this, this.cameras.main.width / 2, 80, 'submarine', this.lifes, this.audioManager)
    this.debugText = this.add.text(800, 10, '', { font: '16px Courier', fill: '#00ff00' });
    this.rechargeZone.entity = this.player
    this.worldTemplate.addEntityCollider(this.player)
    this.oxygenBar.endOxygenCallback = this.player.outOxigen.bind(this.player)
    this.oxygenBar.fullOxygenCallback = this.player.rechargeAllOxygen.bind(this.player)
    this.lifes.restLifeCallback = this.player.recover.bind(this.player)

    this.persons = this.physics.add.group()
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
      this.player.speed <= 240 ? this.player.speed += 2.5 : undefined
      this.enemySpawner.increaseDifficulty(this.difficultyLevel, this.nextDifficulty);
    }

    if (this.systemPoints.points >= this.extraLifeTrigger) {
      this.extraLifeTrigger += 10000
      this.lifes.addLifes(1)
    }

    //debug de fps de acuerdo a los enemigos
    this.debugText.setText([
      `Enemigos: ${this.enemySpawner.activeEnemies}/${this.enemySpawner.maxEnemies}`,
      `FPS: ${Math.floor(this.game.loop.actualFps)}`
    ]);

    this.enemySpawner.update(time, delta, this.player.alive)
    this.player.movement(this.cursors)
    this.player.update()
    this.physics.world.collide(this.persons, this.player, this.personCollider.bind(this))
    this.physics.add.collider(this.player.missile, this.enemies, this.projectileHitEnemy.bind(this));
    this.physics.add.collider(this.enemies, this.player, this.playerHitEnemy.bind(this));
  }

  personCollider(player, person) {
    this.audioManager.play('get', { seek: 0.5, rate: 1, volume: 2 });
    person.reset()
    if (this.personsMenu.counter.length < 6) {
      this.personSave = this.personsMenu.counter.length
      this.level++
      this.personsMenu.addPerson()
    }
  }

  projectileHitEnemy(projectile, enemies) {
    this.audioManager.play('hit', { seek: 0, volume: 1 });
    projectile.reset()
    enemies.die()
    this.enemySpawner.activeEnemies--;
    this.systemPoints.addPoints(this.forRound)
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
