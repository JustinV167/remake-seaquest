class PersonsMenu{
    constructor(scene,init=0){
        this.scene=scene
        this.counter=[]
        this.positionY=(this.scene.cameras.main.height-30)
        this.positionX=this.scene.cameras.main.width/3
        this.addPerson(init)
    }
    addPerson(number=1){
        for(let i=0;number>i;i++){
            const personSprite=this.scene.physics.add.image(this.positionX+(this.counter.length*48),this.positionY,"person")
            this.counter.push(personSprite)
        }
    }
    removePerson(){
        this.counter[this.counter.length-1]?.destroy();
        this.counter.pop()
    }
    removeAllPerson(interval=0){
         let count = setInterval(() => {
             if (this.counter.length == 0) {return clearInterval(count) }
            this.counter[this.counter.length-1]?.destroy()
            this.counter.pop()
        }, interval)
    }
}
export default PersonsMenu