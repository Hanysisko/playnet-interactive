import Phaser from 'phaser'
import { gameSize } from './main'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
    this.score = 0
    this.timeLeft = 20
    this.reactionTimes = []
    this.lastSpawnTime = null
  }

  preload() {
    this.load.audio('pop', './pop.mp3')
    this.load.audio('miss', './miss.ogg')
  }

  create() {
    this.score = 0
    this.timeLeft = 20
    this.reactionTimes = []

    this.flash = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x00ff00, 0)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(999)

    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '48px',
      color: '#ffffff'
    })

    this.timerText = this.add.text(gameSize.width - 10, 10, 'Time: 20', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(1, 0)

    this.timer = this.time.addEvent({
      delay: 1000,
      repeat: this.timeLeft - 1,
      callback: () => {
        this.timeLeft--
        this.timerText.setText(`Time: ${this.timeLeft}`)
        if (this.timeLeft <= 0) {
          this.scene.start('EndScene', { 
            score: this.score,
            reactionTimes: this.reactionTimes
          })
          console.log(this.reactionTimes)
        }
      }
    })

    this.spawnTarget()
  }

  flashColor(color) {
    this.flash.setFillStyle(color)
    this.flash.setAlpha(0.3)

    this.tweens.add({
      targets: this.flash,
      alpha: 0,
      duration: 150,
      ease: 'Power2'
    })
  }

  spawnTarget() {
    if (this.timeLeft <= 0) return

    const x = Phaser.Math.Between(gameSize.padding, gameSize.width - gameSize.padding)
    const y = Phaser.Math.Between(gameSize.padding, gameSize.height - gameSize.padding)

    const target = this.add.circle(x, y, 30, 0xff0000).setInteractive()
    this.lastSpawnTime = this.time.now

    let wasHit = false

    target.on('pointerdown', () => {
      wasHit = true

      const reactionTime = this.time.now - this.lastSpawnTime
      this.reactionTimes.push(reactionTime)

      this.sound.play('pop')
      this.flashColor(0x00ff00)

      this.score++
      this.scoreText.setText(`Score: ${this.score}`)

      target.destroy()
      this.spawnTarget()
    })

    this.time.delayedCall(1500, () => {
      if (!wasHit && target.active) {
        this.sound.play('miss')
        this.flashColor(0xff0000)
        target.destroy()
        this.spawnTarget()
      }
    })
  }
}
