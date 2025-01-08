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

    // todo remove
    y_index: number = 0;

    constructor(scene: Scene, config: WaveConfig) {
        super(scene, 0, scene.scale.height / 2, config.texture)   
    
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.x_direction = Phaser.Math.Vector2.RIGHT
        this.speed = Phaser.Math.GetSpeed(200, 1)

        const seg = (Math.PI * 2) / 360
        const scale = 2
        for (let i = 0; i < 360; i++) {
            this.y_path[i] = Math.sin(seg * i) * scale
        }

        // add to phaser physics engine
        // take y coords from a rotation

        // pre calc y?



        // assume y 0 on an edge of a circle, 
        // simulate rotation around repeatedly
        
        // def rotation(theta):
        // return np.array([[ np.cos(theta), -np.sin(theta)   ],
        //                  [ np.sin(theta),  np.cos(theta)   ]])
     
        
    }

    start() {
        
    }

    update (time: number, delta: number) {
        if (this.active) {
            this.x += this.x_direction.x * this.speed * delta
            // console.log(time % 360)
            console.log(this.y)
            this.y += this.y_path[this.y_index % 360] 
            this.y_index++
        }

        if (this.x > this.scene.sys.canvas.width || this.x < 0 ) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }

}