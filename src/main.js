import Phaser from 'phaser'
import StartScene from './StartScene.js'
import GameScene from './GameScene.js'
import EndScene from './EndScene.js'

export const gameSize = {
  width: window.innerWidth,
  height: window.innerHeight,
  padding: 80
}

const config = {
  type: Phaser.AUTO,
  width: gameSize.width,
  height: gameSize.height,
  backgroundColor: '#1d1d1d',
  parent: 'game-container',
  scene: [StartScene, GameScene, EndScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: gameSize.width,
    height: gameSize.height,
  }
}

const game = new Phaser.Game(config)
