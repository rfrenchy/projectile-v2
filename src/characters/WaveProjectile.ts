import { GameObjects, Scene } from "phaser";

export type WaveConfig = {
    texture: string
    // to_left: boolean,
    // to_right: boolean
}

export class WaveProjectile extends GameObjects.Sprite {
    x_path: number[] = []
    y_path: number[] = []

    x_direction: Phaser.Math.Vector2
    speed: number

    constructor(scene: Scene, config: WaveConfig) {
        super(scene, 0, scene.scale.height / 2, config.texture)   
    
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.x_direction = Phaser.Math.Vector2.RIGHT
        this.speed = Phaser.Math.GetSpeed(100, 1)

        // add to phaser physics engine
        // take y coords from a rotation
    }

    start() {
        
    }

    update (time: number, delta: number) {
        if (this.active) {
            this.x += this.x_direction.x * this.speed * delta
        }

        if (this.x > this.scene.sys.canvas.width || this.x < 0 ) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }

}