class Scene2 extends Phaser.Scene {
  constructor () {
    super('playGame')
  }

  create () {
    this.add.text(20, 20, 'Playing Game',
      { font: '25px Arial', fill: 'yellow' })

    this.background = this.add.tileSprite(0, 0, config.width, config.height,
      'background')
    this.background.setOrigin(0, 0)

    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2,
      'ship1')
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2')
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2,
      'ship3')

    this.ship1.play('ship1_anim')
    this.ship2.play('ship2_anim')
    this.ship3.play('ship3_anim')

    this.ship1.setInteractive()
    this.ship2.setInteractive()
    this.ship3.setInteractive()

    this.input.on('gameobjectdown', this.destroyShip, this)

    this.physics.world.setBoundsCollision()
    this.powerUps = this.physics.add.group()

    var maxObjects = 4
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, 'power-up')
      this.powerUps.add(powerUp)
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height)

      if (Math.random() > 0.5) {
        powerUp.play('red')
      } else {
        powerUp.play('gray')
      }

      powerUp.setVelocity(80, 80)
      powerUp.setCollideWorldBounds(true)
      powerUp.setBounce(1)

      this.player = this.physics.add.sprite(config.width / 2 - 32, config.height - 64, 'player')
      this.player.play('player-move')
      this.player.setOrigin(0, 0)

      this.cursorKeys = this.input.keyboard.createCursorKeys()
      this.player.setCollideWorldBounds(true)

      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      this.projectiles = this.add.group()
    }
  }

  moveShip (ship, speed) {
    ship.y += speed
    if (ship.y > config.height) {
      this.resetShipPosition(ship)
    }
  }

  resetShipPosition (ship) {
    ship.y = 0
    ship.x = Phaser.Math.Between(0, config.width)
  }

  destroyShip (pointer, gameObject) {
    gameObject.setTexture('explosion')
    gameObject.play('explode')
  }

  movePlayerManager () {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed)
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed)
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed)
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed)
    }
  }

  playerShoot() {
    let bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet')
    // var bullet = new Bullet(this)
  }

  update () {
    this.moveShip(this.ship1, 1)
    this.moveShip(this.ship2, 2)
    this.moveShip(this.ship3, 3)

    this.background.tilePositionY -= 0.5

    this.movePlayerManager()

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.playerShoot()
    }
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      var bullet = this.projectiles.getChildren()[i]
      bullet.update()
    }
  }
}
