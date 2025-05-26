import Preload from './scenes/Preload.js'
import Menu from './scenes/Menu.js'
import Game from './scenes/Game.js'
import GameOver from './scenes/GameOver.js'

const baseWidth = 320 * 3;
const baseHeight = 180 * 3;

const config={
    width:baseWidth,
    height:baseHeight,
    backgroundColor: 0x374aa1,
    parent:"container",
    type:Phaser.AUTO,
    scene:[
        Preload,
        Menu,
        Game,
        GameOver
    ],
    fps: {
    target: 50,           // Límite de FPS deseado
    forceSetTimeOut: true // Mejor precisión en el límite
    },
    render: {
    pixelArt: true,  // Si usas sprites pixelados
    antialias: false // Mejor rendimiento
    },
    scale:{
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default:"arcade",
    },
}
const game=new Phaser.Game(config)

if (typeof require !== 'undefined') {
    const { ipcRenderer } = require('electron');
    window.ipcRenderer = ipcRenderer;
}
