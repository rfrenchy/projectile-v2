import { GameObjects, Physics, Scene } from "phaser";
import { Bullet } from "../props/Bullet";

enum PlayerState { waiting, start, can_move, dead }

export enum Direction { up, down, left, right }

export class Player extends Physics.Arcade.Image {
    state: PlayerState = PlayerState.waiting;
    scene: Phaser.Scene;

    // propulsion_fire: GameObjects.Sprite
    // bullets: Physics.Arcade.Group;

    constructor(scene: Phaser.Scene) {
        super(scene, 50, 400, "player");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // this.propulsion_fire = this.scene.add.sprite(this.x - 32, this.y, "propulsion-fire");
        // this.propulsion_fire.play("fire");

        // // weird ass phaser physics grouping
        
        // // Bullets group to create pool
        // this.bullets = this.scene.physics.add.group({
        //     classType: Bullet,
        //     maxSize: 100,
        //     runChildUpdate: true
        // });

    }

    start() {
        this.state = PlayerState.start
        const propulsion_fires_trail: any = [];

        // this.state = PlayerState.can_move;

        // return
        
        // Effect to move the player from left to right
        // this.scene.tweens.add({
            // targets: this,
            // x: 200,
            // duration: 800,
            // delay: 1000,
            // ease: "Power2",
            // yoyo: false,
            // onUpdate: () => {
                // // Just a little trail FX
                // const propulsion = this.scene.add.sprite(this.x - 32, this.y, "propulsion-fire");
                // propulsion.play("fire");
                // propulsion_fires_trail.push(propulsion);
            // },
            // onComplete: () => {
                // // Destroy all the trail FX
                // propulsion_fires_trail.forEach((propulsion: any, i: any) => {
                    // this.scene.tweens.add({
                        // targets: propulsion,
                        // alpha: 0,
                        // scale: 0.5,
                        // duration: 200 + (i * 2),
                        // ease: "Power2",
                        // onComplete: () => {
                            // propulsion.destroy();
                        // }
                    // });
                // });

                // // this.propulsion_fire.setPosition(this.x - 32, this.y);

                // // When all tween are finished, the player can move
                // this.state = PlayerState.can_move;
            // }
        // });

        this.state = PlayerState.can_move
    }

    move(direction: Direction) {
        if (!this.scene) {
            console.error("player destroyed?")
            return
        }

        if (this.state === PlayerState.dead) {
            return
        }

        if(this.state === PlayerState.can_move) {
            if (direction === Direction.up && this.y - 10 > 0) {
                this.y -= 5;
                this.updatePropulsionFire();
            } else if (direction === Direction.down && this.y + 75 < this.scene.scale.height) {
                this.y += 5;
                this.updatePropulsionFire();
            }

            if (direction === Direction.left && this.x - 10 > 0) {
                this.x -= 5;
                this.updatePropulsionFire();
            }

            if (direction === Direction.right && this.x + 75 < this.scene.scale.width) {
                this.x += 5;
                this.updatePropulsionFire();
            }
        }
    }

    fire(x: number, y: number) {
        return // do nothing for now

        // if (this.state === PlayerState.dead) {
        //     return
        // }

        // if (this.state === PlayerState.can_move) {
        //     const bullet = this.bullets.get();
        //     if (bullet) {
        //         bullet.fire(this.x + 16, this.y + 5, x, y);
        //     }
        // }
    }

    updatePropulsionFire() {
        return // do nothing for now

        // this.propulsion_fire.setPosition(this.x - 32, this.y);
    }

    update(time: number, delta: number) {
        // why still update when destory called?

        if (this.scene) { 
            // Sinusoidal movement up and down up and down 2px
            // simulates inertia? 
            this.y += Math.sin(this.scene.time.now / 200) * 0.10; 
            
            // this.propulsion_fire.y = this.y;
        }
    }

    destroy() {
        this.state = PlayerState.dead;
        // this.propulsion_fire.destroy();
        // this.bullets.clear(true, true);
        super.destroy();
    }
}