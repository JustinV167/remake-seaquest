import Enemy from './Enemy.js'

class EnemySpawner {
  constructor(scene){
  this.scene = scene;
        this.maxEnemies = 5;
        this.maxWidth = this.scene.cameras.main.width
        this.activeEnemies = 0;
        this.enemySpeed = 180;
        this.spawnInterval = 3000;
        this.waveCooldown = 0;
        this.enemyTypes = ['fish', 'evilSubmarine'];
  }

  update(time, delta) {
       this.waveCooldown += delta;
        if (this.waveCooldown >= this.spawnInterval) {
            this.spawnWave();
            this.waveCooldown = 0;
        }
  }

  increaseDifficulty(difficulty, next) {
    this.maxEnemies = Math.min(5 + difficulty, 15);
    this.waveSize = Math.min(2 + Math.floor(difficulty / 2), 6);
    this.spawnInterval = Math.max(1500, 3000 - (difficulty + 5));
    this.enemySpeed = Math.min(350, this.enemySpeed + 5);
    console.log('Dificultad aumentada a nivel ' + difficulty);
    console.log(this.scene.difficultyLevel)
  }

  spawnWave() {
  if (this.activeEnemies >= this.maxEnemies) return;

  const waveSize = Phaser.Math.Between(2, 4);
  const delay = 300;

    for (let i = 0; i < waveSize; i++) {
      this.scene.time.delayedCall(i * delay, () => {
        if (this.activeEnemies < this.maxEnemies) {
          this.spawnEnemy(this.activeEnemies, this.maxEnemies, this.maxWidth);
        }
      });
    }
  }

  spawnEnemy(active, maxEnemies, maxWidth) {
  if (active >= maxEnemies) return;

  const direction = Phaser.Math.Between(0, 1) ? 1 : -1;
  const x = direction === -1 ? maxWidth + 10 : 0;
  const enemyType = Phaser.Math.RND.pick(this.enemyTypes);
  const y = Phaser.Math.Between(100, 400);

  let enemy;
  if (enemyType === 'fish' && y >= 110) {
    enemy = new Enemy(this.scene, x, y, 'fish', false, direction);
  } else {
    enemy = new Enemy(this.scene, x, y, 'evilSubmarine', true, direction);
        this.scene.physics.add.collider(this.scene.player, enemy.missile, this.scene.playerHitEnemy.bind(this));
  }
  enemy.speed = this.enemySpeed
  active++;
  this.scene.enemies.add(enemy);
  this.scene.enemies.setDepth(0);

  enemy.on('enemyOut', () => {
    active--;
    });
  }
}

export default EnemySpawner
