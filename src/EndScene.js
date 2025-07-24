export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene')
  }

  init(data) {
    this.finalScore = data.score || 0
    this.reactionTimes = data.reactionTimes || []
  }

  create() {
    const centerX = this.scale.width / 2
    const centerY = this.scale.height / 2

    let average = 0
    if (this.reactionTimes.length > 0) {
      const sum = this.reactionTimes.reduce((a, b) => a + b, 0)
      average = Math.round(sum / this.reactionTimes.length)
    }

    this.add.text(centerX, centerY - 80, 'Game Over', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5)

    this.add.text(centerX, centerY - 20, `Score: ${this.finalScore}`, {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5)

    this.add.text(centerX, centerY + 30, `Avg Reaction: ${average} ms`, {
      fontSize: '28px',
      color: '#ffffff'
    }).setOrigin(0.5)

    const playAgain = this.add.text(centerX, centerY + 100, 'Play Again', {
      fontSize: '28px',
      color: '#00ff00',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    })
      .setOrigin(0.5)
      .setInteractive()

    playAgain.on('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }
}
