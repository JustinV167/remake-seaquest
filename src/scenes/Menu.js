export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        this.title = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 4, 'Seaquest', {
            font: '48px Retropix',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(2);

        this.image = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'menu'
        )
        this.buttonsBlocked = false;
        this.createButtons();
    }

    createButtons() {

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.skipKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playButton = this.add.text(this.sys.game.config.width / 2, ((this.sys.game.config.height / 5) * 2) + 20, 'Jugar', {
            font: '24px retropix',
            fill: '#ffffff',
            backgroundColor: '#2d2d2d',
            padding: { y: 10 },
            align: "center",
            fixedWidth: 150,
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true, });

        this.playButton.on('pointerover', () => {
            this.playButton.setBackgroundColor('#4d4d4d');
        });

        this.playButton.on('pointerout', () => {
            this.playButton.setBackgroundColor('#2d2d2d');
        });

        this.playButton.on('pointerdown', () => {
            this.blockingButtons()
        });

        this.enterKey.on('down', () => {
            this.blockingButtons()
        })

        this.exitButton = this.add.text((this.sys.game.config.width / 2), ((this.sys.game.config.height / 6) * 3) + 30, 'Salir', {
            fontFamily: 'Retropix',
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#2d2d2d',
            padding: { y: 10 },
            align: "center",
            fixedWidth: 150,
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true, });
        this.exitButton.on('pointerover', () => {
            this.exitButton.setBackgroundColor('#4d4d4d');
        });

        this.exitButton.on('pointerout', () => {
            this.exitButton.setBackgroundColor('#2d2d2d');
        });

        this.exitButton.on('pointerdown', () => {
            this.blockingButtons(true)
        });

        this.exitKey.on('down', () => {
            this.blockingButtons(true)
        })

    }

    createInstructive() {

        this.instrucciones = this.add.image(
            this.cameras.main.width / 3.4,
            this.cameras.main.height / 2,
            'instructive'
        ).setAlpha(0).setDepth(3);
        this.instrucciones.setScale(1 / 3.5)

        this.rules = this.add.image(
            this.cameras.main.width / 1.4,
            this.cameras.main.height / 2,
            'rules'
        ).setAlpha(0).setDepth(3);
        this.rules.setScale(1 / 3.5)

        this.skip = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.width / 2, 'Pulsa la barra espaciadora para empezar', {
            font: '24px Retropix',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(3);

        this.tweens.add({
            targets: [this.instrucciones, this.rules, this.skip],
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        })

        this.skipKey.on('down', () => {
            this.scene.start('Game');
        })

    }

    blockingButtons(escapeKey) {
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
            const { ipcRenderer } = require('electron');
            ipcRenderer.send('close-game');
        }
    }

}
