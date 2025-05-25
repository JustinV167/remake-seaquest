class OxygenBar {
    constructor(scene, init = 100, endOxygenCallback, fullOxygenCallback) {
        this.scene = scene
        this.nOxygen = init
        this.endOxygenCallback = endOxygenCallback
        this.fullOxygenCallback = fullOxygenCallback
        const baseEvent = {
            delay: 20,
            callbackScope: this,
            loop: true,
            paused: true,
            startAt: 0
        }
        this.oxygenDiscounter = this.scene.time.addEvent({ ...baseEvent, callback: this.discountOxygen, })
        this.oxygenRecover = this.scene.time.addEvent({ ...baseEvent, callback: this.recoverOxygen, })
        this.positionY = (this.scene.cameras.main.height - 60)
        this.positionX = this.scene.cameras.main.width / 3
        this.oxygenBar
        this.oxygenWidth = 200
        this.generateMenu()
    }
    generateMenu() {
        this.text = this.scene.add.text(this.positionX + 16, this.positionY, 'oxigeno:', {
            fontSize: '28px',
            fontFamily: 'Retropix',
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
        this.text.setOrigin(0.5)
        this.progressRect = this.scene.add.rectangle(this.positionX + 90, this.positionY + 3, this.oxygenWidth + 5, 15, 0x333333).setOrigin(0, 0.5);
        this.oxygenBar = this.scene.add.rectangle(this.positionX + 92.5, this.positionY + 3, this.oxygenWidth, 10, 0xffffff).setOrigin(0, 0.5);
    }
    setStateDiscount(newState = {}) {
        Object.keys(newState).forEach(item=>{
            this.oxygenDiscounter[item]=newState[item]
        })
    }
    discountOxygen() {
        if (this.nOxygen <= 0) {
            if (this.endOxygenCallback) this.endOxygenCallback()
            this.oxygenDiscounter.paused = true
            return
        }

        if (this.nOxygen < 40) {
        this.oxygenBar.setFillStyle(0xff0000)
        }

        this.updateOxygenBar()
        this.nOxygen -= 0.1
    }
    recoverOxygen() {
        if (this.nOxygen >= 100) {
        this.oxygenBar.setFillStyle(0xffffff)
            if (this.fullOxygenCallback) this.fullOxygenCallback()
            this.recoverOxygen.paused = true
            return
        }
        this.nOxygen += 0.1
        this.updateOxygenBar()
    }
    setStateRecover(newState = {}) {
        Object.keys(newState).forEach(item=>{
            this.oxygenRecover[item]=newState[item]
        })
    }
    updateOxygenBar() {
        this.oxygenBar.width = this.oxygenWidth * this.nOxygen / 100
    }
}
export default OxygenBar
