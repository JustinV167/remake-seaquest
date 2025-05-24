class SystemPoints {
    constructor(scene, initPoints = 0) {
        this.scene = scene
        this.points = initPoints
        this.pointText
        this.generateMenu()
    }
    generateMenu() {
        this.text = this.scene.add.text(this.scene.cameras.main.width / 2, 10, 'puntos:', {
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
        this.text.setOrigin(1, 0)
        this.text.setDepth(2)
        this.pointText = this.scene.add.text(this.scene.cameras.main.width / 2, 10, this.points, {
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
    }
    clearPoints(jump = this.points, interval = 0) {
        let count = setInterval(() => {
            this.points = jump > this.points ? 0 : this.points - jump
            this.pointText.setText(this.points)
            if (this.points == 0) { clearInterval(count) }
        }, interval)
    }
    addPoints(mount = 10, jump = mount, interval = 0) {
        let count = setInterval(() => {
            let onlySum=jump > mount ? mount : jump
            mount=mount-onlySum
            this.points=this.points+onlySum 
            this.pointText.setText(this.points)
            if (mount == 0) { clearInterval(count) }
        }, interval)
    }
}
export default SystemPoints