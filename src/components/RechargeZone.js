class RechargeZone {
    constructor(scene, OxygenBar,x,y) {
        this.scene = scene
        this.OxygenBar = OxygenBar
        let rectagleEntity = this.scene.add.rectangle(x,y, this.scene.cameras.main.width, 10, 0xffffff).setOrigin(0, 0.5).setAlpha(0)
        this.rechargeZone = this.scene.physics.add.existing(rectagleEntity)
        this.rechargeZone.body.moves = false
        const baseEvent = {
            delay: 1,
            callbackScope: this,
            loop: true,
            paused: false,
            startAt: 0
        }
        this.scene.time.addEvent({ ...baseEvent, callback: this.update, })
        this.entity
        this.prevCollision = true
    }
    collisionRechargeZone() {
        if (this.OxygenBar.nOxygen < 100) {
            this.OxygenBar.setStateRecover({ paused: false, delay: 1 })
            this.OxygenBar.setStateDiscount({ paused: true })
            this.entity.body.moves=false
        }
    }

    endCollisionRechargeZone() {
        this.OxygenBar.setStateDiscount({ paused: false })
        this.OxygenBar.setStateRecover({ paused: true })
    }
    update() {
        if (!this.entity) return
        if (this.scene.physics.overlap(this.entity, this.rechargeZone)) {
            this.collisionRechargeZone()
            this.prevCollision = true
        } else {
            if (this.prevCollision) {
                this.endCollisionRechargeZone()
                this.prevCollision = false
            }
        }
    }

}
export default RechargeZone
