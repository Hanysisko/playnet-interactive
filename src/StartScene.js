import Phaser from 'phaser'
import { gameSize } from './main'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  create() {
    this.add.text(gameSize.width * 0.5, gameSize.height * 0.25, 'Target Tapper', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5)

    const startButton = this.add.text(gameSize.width * 0.5, gameSize.height * 0.4, 'Start Game', {
      fontSize: '32px',
      color: '#00ff00',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5)
      .setInteractive()

    startButton.on('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }
}
