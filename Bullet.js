export class Bullet extends Phaser.GameObjects.Sprite {
  constructor (scene) {

    var x = scene.player.x
    var y = scene.player.y

    super(scene, x, y, 'bullet')
    scene.add.existing(this)

    this.play('bullet')
    scene.physics.world.enabelBody(this)
    this.body.velocity.y = -250
  }

  update() {
    if (this.y < 32) {
      this.destroy()
    }
  }
}
