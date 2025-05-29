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
        this.points = this.registry.get("Points") ?? 0
        this.bestPoint = localStorage.getItem("bestPoint") ?? 0
        this.bestPointText = (this.points > this.bestPoint ? "Antiguo" : "") + " Mejor Puntaje"
        if (this.points > this.bestPoint) {
            localStorage.setItem("bestPoint", this.points)
        }
        this.createTexts()
        this.createButtons()
    }
    createTexts() {
        this.title = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 6, 'Has Perdido!', {
            font: '48px Retropix',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);
        this.BestPText = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 7) * 2, this.bestPointText + ": " + this.bestPoint, {
            font: '24px Retropix',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);
        this.pointText = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 7) * 3, "Tu Puntaje: " + this.points, {
            font: '24px Retropix',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);
    }
    createButtons() {
        this.playButton = this.add.text(this.sys.game.config.width / 2, 300, 'Reintentar', {
            font: '24px Retropix',
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
            this.scene.start('Game');
        });

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.enterKey.on('down', () => {
            this.scene.start('Game')
        })

        this.exitButton = this.add.text((this.sys.game.config.width / 2), 360, 'Salir', {
            font: '24px Retropix',
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
            this.render()
        });

        this.exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.exitKey.on('down', () => {
            this.render()
        })

    }

    render() {

        if (typeof require !== 'undefined' && typeof process !== 'undefined') {
            const { ipcRenderer } = require('electron');
            ipcRenderer.send('close-game');
        } else {
            this.game.destroy(true)
        }
    }
}
