export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    create() {
        this.title = this.add.text(this.sys.game.config.width/2, this.sys.game.config.width/4, 'Seaquest', {
            font: '48px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.createButtons();
    }

    createButtons() {
        this.playButton = this.add.text(this.sys.game.config.width/2, 300, 'Jugar', {
            font: '24px Arial',
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
            this.scene.start('Game'); 
        });

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.enterKey.on('down', () => {
            this.scene.start('Game')
        })
    }
}
