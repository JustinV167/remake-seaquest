import CollisionObject from '../entities/CollisionObject.js'
import Platform from '../entities/Platform.js'
import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import Person from '../entities/Person.js'
import PersonsMenu from './PersonsMenu.js'
import OxygenBar from './OxygenBar.js'

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" })
    this.personSave = 0
    this.points = 0
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
    this.maxEnemies = 5; 
    this.spawnInterval = 3000;    
  }
  create() {
    // Elementos visuales
    const rectangle = this.add.graphics();
    rectangle.fillStyle(0x465bbb, 1);
    rectangle.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height / 7.9);
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.platforms2 = this.physics.add.staticGroup()
    this.projectiles = this.physics.add.group()
    const floor = new Platform(this, null, null, 'sand')
    this.ground = floor.createPlatformRow(this.cameras.main.height);
    const topLimit = new Platform(this, null, null, 'rainbow', { width: 50, height: 40 })
    this.rainbow = topLimit.createPlatformRow(this.cameras.main.height / 7)
    const seaTop = new Platform(this, 0, 0, 'sea', { width: 128, height: 40 })
    this.sea = seaTop.createPlatformRow(this.cameras.main.height / 4.5)
    this.sea.setDepth(10)

    this.personsMenu = new PersonsMenu(this)
    this.personSave = this.personsMenu.counter.length
    this.OxygenBar = new OxygenBar(this)
    this.rechargeZone = this.physics.add.existing(this.add.rectangle(0, 70, this.cameras.main.width, 10, 0xffffff).setOrigin(0, 0.5).setAlpha(0))
    this.rechargeZone.body.moves = false

    // Entidades
    this.player = new Player(this, this.cameras.main.width / 2, 80, 'submarine')
    this.person = new Person(this, 100, 200, 'person', false)
    this.player.setDepth(0)
    this.enemies = this.physics.add.group()
    this.enemies.setDepth(0)
    this.activeEnemies = 0;
    
    // Eventos
    this.max = this.cameras.main.width
    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.ground)
    this.physics.add.collider(this.player, this.seaTop)
    this.physics.add.collider(this.player, this.rainbow)
    this.prevCollision = true
  }

  collisionRechargeZone() {
    if (this.OxygenBar.nOxygen < 100) {
      this.OxygenBar.setStateRecover({ paused: false,delay:1 })
      this.OxygenBar.setStateDiscount({ paused: true })
    }
  }

  endCollisionRechargeZonere() {
    this.OxygenBar.setStateDiscount({ paused: false })
    this.OxygenBar.setStateRecover({ paused: true })
  }

  update(time, delta) {
    if (this.level >= this.nextDifficulty) {
        this.increaseDifficulty();
    }

    this.spawnCooldown += delta;
    if (this.spawnCooldown >= this.spawnInterval) {
        this.spawnWave();
        this.spawnCooldown = 0;
    }

    this.player.movement(this.cursors)
    this.player.update()
    this.person.update()
    this.physics.world.collide(this.person, this.player, this.personCollider.bind(this))
    this.physics.add.collider(this.player.missile, this.enemies, this.projectileHitEnemy.bind(this));

    if (this.physics.overlap(this.player, this.rechargeZone)) {
      this.collisionRechargeZone()
      this.prevCollision = true
    } else {
      if (this.prevCollision) {
        this.endCollisionRechargeZonere()
        this.prevCollision = false
      }
    }
  }

spawnWave() {
    if (this.activeEnemies >= this.maxEnemies) return;

    const waveSize = Phaser.Math.Between(2, 4);
    const delay = 300;

    for (let i = 0; i < waveSize; i++) {
        this.time.delayedCall(i * delay, () => {
            if (this.activeEnemies < this.maxEnemies) {
                this.spawnEnemy();
            }
        });
    }
}

    spawnEnemy() {
    if (this.activeEnemies >= this.maxEnemies) return;

    const direction = Phaser.Math.Between(0, 1) ? 1 : -1;
    const x = direction === -1 ? this.max : -20;
    const enemyType = Phaser.Math.RND.pick(this.enemyTypes);
      const y = Phaser.Math.Between(100, 400);
    
    let enemy;
    if (enemyType === 'fish' && y >= 110) {
      enemy = new Enemy(this, x, y, 'fish', false, direction);
    } else {
      enemy = new Enemy(this, x, y, 'evilSubmarine', true, direction);
      this.physics.add.collider(enemy.missile, this.player, this.playerHitEnemy.bind(this));
    }
    enemy.speed = this.enemySpeed
    this.activeEnemies++;
    this.enemies.add(enemy);
    this.enemies.setDepth(0);
    this.physics.add.collider(this.player, this.enemies, this.playerHitEnemy, null, this);

      enemy.on('enemyOut', () => {
      this.activeEnemies--;
    });

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
    enemies.reset()
    this.activeEnemies--;
    this.points += 20
  }

  playerHitEnemy(player, enemy) {
    player.reset()
  }

  randomSign() {
  const sign = Math.floor((Math.random() * 2))
  return sign === 0 ? -1 : 1
  } 

  randomHigh() {
  const sign = Math.max(79, Math.floor((Math.random() * 401)))
  return sign
  }

  increaseDifficulty() {
        this.difficultyLevel++;
        this.maxEnemies = Math.min(5 + this.difficultyLevel, 15);
        this.waveSize = Math.min(2 + Math.floor(this.difficultyLevel/2), 6);
        this.spawnInterval = Math.max(1500, 3000 - (this.difficultyLevel * 200));
        this.enemySpeed = Math.min(350, this.enemySpeed + 10);
    console.log(this.enemySpeed)
        this.nextDifficulty++;
        console.log('Dificultad aumentada a nivel ' + this.difficultyLevel);
    }

}

export default Game

