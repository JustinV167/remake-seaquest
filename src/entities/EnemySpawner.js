import Enemy from './Enemy.js'

class EnemySpawner {
  constructor(scene){
  this.scene = scene;
        this.maxEnemies = 4;
        this.maxWidth = this.scene.cameras.main.width
        this.activeEnemies = 0;
        this.enemySpeed = 180;
        this.spawnInterval = 3000;
        this.waveCooldown = 0;
        this.enemyTypes = ['fish', 'evilSubmarine'];
  }

  update(time, delta, alive) {
       this.waveCooldown += delta;
        if (this.waveCooldown >= this.spawnInterval) {
          
            this.scene.time.delayedCall(1000, () => {
              if (this.alive === false) this.scene.enemySpawner.clearAllEnemies();
            });
            this.spawnWave(alive);
            this.waveCooldown = 0;
        }
  }

  clearAllEnemies() {
    this.scene.enemies.clear(true, true); 
    this.activeEnemies = 0; 
    this.waveCooldown = 0;
  }

  increaseDifficulty(difficulty, next) {
    this.maxEnemies = Math.min(2 + difficulty, 7);
    this.waveSize = Math.min(2 + Math.floor(difficulty / 2), 5);
    this.spawnInterval = Math.max(3000, 4000 - (difficulty + 1));
    this.enemySpeed = Math.min(220, this.enemySpeed + 2.5);
  }

  spawnWave(alive) {
  if (this.activeEnemies >= this.maxEnemies) return;
  const waveSize = Phaser.Math.Between(2, 4);
  const delay = 2000;

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
  this.activeEnemies++ ;
  this.scene.enemies.add(enemy);
  this.scene.enemies.setDepth(0);

  enemy.on('enemyOut', () => {
    this.activeEnemies--;
    });
  }
}

export default EnemySpawner
