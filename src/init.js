import Preload from './scenes/Preload.js'
import Menu from './scenes/Menu.js'
import Game from './scenes/Game.js'

const config={
    width:320 * 2,
    height:180 * 2,
    backgroundColor: 0x374aa1,
    parent:"container",
    type:Phaser.AUTO,
    scene:[
        Preload,
        Menu,
        Game
    ],
    physics:{
        default:"arcade",
    },
}
const game=new Phaser.Game(config)
