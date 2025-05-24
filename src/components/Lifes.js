class Lifes {
    constructor(scene,restLifeCallback,outLifesCallback, maxLife = 3, initLife = 3) {
        this.scene = scene
        this.maxLife = maxLife
        this.onlyLifes = []
        this.restLifeCallback=restLifeCallback
        this.generateMenu(initLife)
    }
    generateMenu(initLife) {
        this.text = this.scene.add.text(15, 10, 'vidas:', {
            fontSize: '28px',
            fontFamily: 'Courier',
            color: 'white',
            stroke: '#000000',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 2,
                stroke: true,
                fill: true
            }
        })
        this.text.setDepth(2)
        this.addLifes(initLife)
    }
    addLifes(number = 1) {
        for (let i = 0; number > i; i++) {
            const lifeSprite = this.scene.physics.add.image(140 + (this.onlyLifes.length * 32), 25, "submarine")
            this.onlyLifes.push(lifeSprite)
        }
    }
    removeLife(number = 1) {
        if(number>this.onlyLifes.length){
            console.log('morio');
            return
        }
        for (let i = this.onlyLifes.length-1; this.onlyLifes.length-1>i-number;) {
            this.onlyLifes[this.onlyLifes.length-1].disableBody(true, true);
            this.onlyLifes.pop()
        }
        if(this.restLifeCallback)this.restLifeCallback()
    }
}
export default Lifes