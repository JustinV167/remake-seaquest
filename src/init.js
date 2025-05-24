import Preload from './scenes/Preload.js'
import Menu from './scenes/Menu.js'
import Game from './scenes/Game.js'
import GameOver from './scenes/GameOver.js'
const config={
    width:320 * 3,
    height:180 * 3,
    backgroundColor: 0x374aa1,
    parent:"container",
    type:Phaser.AUTO,
    scene:[
        Preload,
        Menu,
        Game,
        GameOver
    ],
    physics:{
        default:"arcade",
    },
}
const game=new Phaser.Game(config)
