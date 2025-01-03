import { GameObjects, Scene } from "phaser";

export class Bullet extends GameObjects.Image
{
    speed;
    flame: any;
    end_direction = new Phaser.Math.Vector2(0, 0);

    DOWN = new Phaser.Math.Vector2(0, 1)

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "bullet");
        this.speed = Phaser.Math.GetSpeed(300, 1);
        // this.postFX.addBloom(0xffffff, 1, 1, 2, 1.2);
        // Default bullet (player bullet)
        this.name = "bullet";
    }

    fire (x: number, y: number, targetX = 1, targetY = 0, bullet_texture = "bullet")
    {
        // Change bullet change texture
        this.setTexture(bullet_texture);

        // used to calculate physics correctly?
        this.setPosition(x, y); 
        this.setActive(true)
        this.setVisible(true)

        this.end_direction.setTo(targetX - x, targetY - y).normalize();            

        // Calculate direction towards target
        if (targetX === 1 && targetY === 0) {
            this.end_direction.setTo(1, 0);
        } else {
            this.end_direction.setTo(targetX - x, targetY - y).normalize();            

        }
    }

    firev2(x: number, y: number, angle = 0, bullet_texture = "bullet") 
    {
        // Change bullet change texture
        this.setTexture(bullet_texture);

        // Phaser bologna
        this.setPosition(x, y); 
        this.setActive(true)
        this.setVisible(true)

        // direction unit vector
        this.end_direction = this.DOWN.rotate(Phaser.Math.DegToRad(angle))
    }

    destroyBullet ()
    {
        // if (this.flame === undefined) {
        //     // Create particles for flame
        //     this.flame = this.scene.add.particles(this.x, this.y, 'flares',
        //         {
        //             lifespan: 250,
        //             scale: { start: 1.5, end: 0, ease: 'sine.out' },
        //             speed: 200,
        //             advance: 500,
        //             frequency: 20,
        //             blendMode: 'ADD',
        //             duration: 100,
        //         });

        //     this.flame.setDepth(1);
        //     // When particles are complete, destroy them
        //     this.flame.once("complete", () => {
        //         this.flame.destroy();
        //     })
        // }

        // Destroy bullets
        this.setActive(false);
        this.setVisible(false);
        this.destroy();

    }

    // Update bullet position and destroy if it goes off screen
    update (time: number, delta: number)
    {
        this.x += this.end_direction.x * this.speed * delta;
        this.y += this.end_direction.y * this.speed * delta;

        // Verifica si la bala ha salido de la pantalla
        if (this.x > this.scene.sys.canvas.width || this.x < 0 || this.y > this.scene.sys.canvas.height || this.y < 0) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }
}
