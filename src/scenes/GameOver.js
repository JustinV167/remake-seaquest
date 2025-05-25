import EnemySpawner from '../entities/EnemySpawner.js'
import PersonsMenu from '../components/PersonsMenu.js'
import OxygenBar from '../components/OxygenBar.js'
import WorldTemplate from '../components/WorldTemplate.js'
import Lifes from '../components/Lifes.js'

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        this.worldTemplate = new WorldTemplate(this)
        this.enemySpawner = new EnemySpawner(this)
        this.personsMenu = new PersonsMenu(this)
        this.personSave = this.personsMenu.counter.length
        this.oxygenBar = new OxygenBar(this, null)
        this.lifes = new Lifes(this, null, null, 0, 0)

        this.title = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.width / 4, 'Has Perdido!', {
            font: '48px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);


        this.createButtons()
    }

    createButtons() {
        this.playButton = this.add.text(this.sys.game.config.width / 2, 300, 'Reintentar', {
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

        this.exitButton = this.add.text((this.sys.game.config.width / 2), 360, 'Salir', {
            font: '24px Arial',
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
            this.game.destroy(true)
        });

        this.exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.exitKey.on('down', () => {
            this.game.destroy(true)
        })

    }
}
