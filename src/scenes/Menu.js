export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        this.title = this.add.text(this.sys.game.config.width/2, this.sys.game.config.width/4, 'Seaquest', {
            font: '48px Retropix',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

      this.image = this.add.image(
            this.cameras.main.width/2,
            this.cameras.main.height/2,
            'menu'
        )
        this.buttonsBlocked = false;
        this.createButtons();
    }

createProgressBar() {
    const barWidth = 400;
    const barHeight = 10;
    const x = this.cameras.main.width/2;
    const y = this.cameras.main.height - 15;

    this.barBg = this.add.graphics();
    this.barBg.lineStyle(4, 0xffffff, 1);
    this.barBg.fillStyle(0x333333, 0.8);
    this.barBg.strokeRect(x - barWidth/2, y - barHeight/2, barWidth, barHeight);
    this.barBg.fillRect(x - barWidth/2, y - barHeight/2, barWidth, barHeight);

    this.progressBar = this.add.graphics();
    
    this.progress = 1;
    this.updateProgressBar();
    
    this.time.addEvent({
        delay: 100,
        callback: () => {
            this.progress -= 0.01;
            this.updateProgressBar();
            
            if (this.progress < 0.2) {
                this.progressBar.fillStyle(0xff0000, 1);
            }
            
            if (this.progress <= 0) {
                this.scene.start('Game');
            }
        },
        callbackScope: this,
        repeat: 99
    });
}

updateProgressBar() {
    const barWidth = 400;
    const barHeight = 10;
    const x = this.cameras.main.width / 2 - barWidth/2;
    const y = this.cameras.main.height - 15 - barHeight/2;
    
    this.progressBar.clear();
    
    const color = Phaser.Display.Color.Interpolate.ColorWithColor(
        Phaser.Display.Color.ValueToColor(0xffffff),
        Phaser.Display.Color.ValueToColor(0xffff00),
        100,
        100 * (1 - this.progress)
    );
    
    this.progressBar.fillStyle(color.color, 1);
    this.progressBar.fillRect(x + 2, y + 2, (barWidth - 4) * this.progress, barHeight - 4);
}

    createInstructive() {
     this.instrucciones = this.add.image(
            this.cameras.main.width/2,
            this.cameras.main.height/2,
            'instructive'
        ).setAlpha(0); 
      this.instrucciones.setScale(1/3.5)
        this.tweens.add({
            targets: this.instrucciones,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });

      this.createProgressBar()
        
    }

    blockingButtons(escapeKey){
      if (!this.buttonsBlocked && !escapeKey) {
                this.buttonsBlocked = true; 
                this.playButton.disableInteractive(); 
                this.exitButton.disableInteractive(); 
                
                this.tweens.add({
                    targets: this.playButton,
                    alpha: 0.6,
                    duration: 200
                });

                this.time.removeAllEvents();
                
                this.time.delayedCall(300, () => {
                this.createInstructive()
                });
            } else if (!this.buttonsBlocked) {
            this.buttonsBlocked = true;
            this.game.destroy(true)
            }
    }

    createButtons() {
        this.playButton = this.add.text(this.sys.game.config.width/2, 300, 'Jugar', {
            font: '24px retropix',
            fill: '#ffffff',
            backgroundColor: '#2d2d2d',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        this.playButton.on('pointerover', () => {
            this.playButton.setBackgroundColor('#4d4d4d');
        });

        this.playButton.on('pointerout', () => {
            this.playButton.setBackgroundColor('#2d2d2d');
        });

        this.playButton.on('pointerdown', () => {
        this.blockingButtons()
        });

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.enterKey.on('down', () => {
        this.blockingButtons()
        })

        this.exitButton = this.add.text((this.sys.game.config.width / 2), 360, 'Salir', {
            fontFamily: 'Retropix',
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#2d2d2d',
            padding: { x: 20, y: 10 }
        })
            .setOrigin(0.5)
            .setInteractive();
        this.exitButton.on('pointerover', () => {
            this.exitButton.setBackgroundColor('#4d4d4d');
        });

        this.exitButton.on('pointerout', () => {
            this.exitButton.setBackgroundColor('#2d2d2d');
        });

        this.exitButton.on('pointerdown', () => {
        this.blockingButtons(true)
        });

        this.exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.exitKey.on('down', () => {
        this.blockingButtons(true)
        })

    }
}
