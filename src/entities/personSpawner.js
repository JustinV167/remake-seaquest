import Person from '../entities/Person.js'

export default class PersonSpawner{
    constructor(scene,max=4,time=8){
        this.scene=scene
        this.max=max
        this.time=time
        this.maxWidth=this.scene.cameras.main.width
         const baseEvent = {
            delay: time*1000,
            callbackScope: this,
            loop: true,
            startAt: 0
        }
        this.spawnTimer = this.scene.time.addEvent({ ...baseEvent, callback: this.spawnPersons, })
    }
    setStateTimer(newState = {}) {
        Object.keys(newState).forEach(item=>{
            this.spawnTimer[item]=newState[item]
        })
    }
    spawnPersons(){
        const roundGenerate=Math.round(Math.random()*this.max)
        for(let i=0;roundGenerate>i;i++){
            const positionX=Math.round(Math.random()*2)
            const positionY= Phaser.Math.Between(100, 400);
            const person=new Person(this.scene, positionX==1?0:this.maxWidth + 10, positionY, 'person', positionX!=1)
        this.scene.persons.add(person);
        }        
    }

}
