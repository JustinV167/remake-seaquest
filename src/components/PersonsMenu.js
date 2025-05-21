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
        this.counter[this.counter.length].disableBody(true, true);
        this.counter.shift()
    }
    removeAllPerson(){
        this.counter.forEach(item=>item.disableBody(true, true))
        this.counter=[]
    }
}
export default PersonsMenu