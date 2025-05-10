const config={
    width:320,
    height:180,
    parent:"container",
    type:Phaser.AUTO,
    scene:{
        preload,
        create,
        update
    },
    physics:{
        default:"arcade",
        
    }
}
const game=new Phaser.Game(config)

function preload(){
   this.load.image("submarine","./assets/submarine.png")
}
function create(){
    this.submarine=this.physics.add.image(180,90,"submarine")
    this.submarine.setScale(0.1)
    this.submarine.setCollideWorldBounds(true)
    this.cursor=this.input.keyboard.createCursorKeys()
    this.keyEvents=keyEvents
}
function update(time,delta){
    this.keyEvents()
}
function keyEvents(){
    if(this.cursor.up.isDown){
        this.submarine.y--
    }
    
    if(this.cursor.down.isDown){
        this.submarine.y++
    }
    
    if(this.cursor.left.isDown){
        this.submarine.x--
    }
    
    if(this.cursor.right.isDown){
        this.submarine.x++
    }
}