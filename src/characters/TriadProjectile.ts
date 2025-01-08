import { GameObjects } from "phaser";
import { Bullet } from "./Bullet";

type BulletSet = {
    [key: string]: {
        bullet: Phaser.Physics.Arcade.Group | null,
        angle: number
    }
}

export class TriadProjectile extends GameObjects.Sprite {
    bulletsv2: BulletSet = {
        b1: { "bullet": null, "angle": 0 },
        b2: { "bullet": null, "angle": Math.PI / 6 },
        b3: { "bullet": null, "angle": Math.PI * 2 - (Math.PI / 6) }
    } 

    bulletsv3: BulletSet = {
        b1: { "bullet": null, "angle": 0 },
        b2: { "bullet": null, "angle": Math.PI / 16 },
        b3: { "bullet": null, "angle": Math.PI * 2 - (Math.PI / 16) }
    } 

    constructor(config: any) {
        super(config.scene, config.x, config.y, "projectile-orange")

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this) // add an arcarde physics body
        // this.body.setSize(1, 1)

        this.addBulletPhysics(this.bulletsv2)
        this.addBulletPhysics(this.bulletsv3)
    }

    addBulletPhysics(bulletset: BulletSet) {
        // TODO bad use of phaser, fix to so using group efficiently?
        Object.keys(bulletset).forEach((key) => {
            bulletset[key].bullet = this.scene.physics.add.group({
                classType: Bullet,
                maxSize: 100,
                runChildUpdate: true
            })
        })
    }

    entrance = () => ({
        targets: this,
        y: 50,
        duration: 1000,
        delay: 1000,
    })

    defaultmove = () => ({
        targets: this,
        x: this.scene.scale.width - 50,
        duration: 1000,
        yoyo: true,
        repeat: -1
    })

    trackplayer = (player_x: number) => ({
        targets: this,
        x: player_x,
        y: this.y,
        duration: 250,
        delay: 1000,
    })

    fireBullets(bulletset: BulletSet) {
        Object.keys(bulletset).forEach((k) => {
            const { bullet, angle } = bulletset[k]
            if (bullet) {
                bullet.get().firev3(this.x, this.y, angle, "triad-bullet")
            }
        })
    }

    fire({ continuous = true } = {}) {
        // this.fireBullets(this.bulletsv2)
        this.fireBullets(this.bulletsv3)

        // fire every 3 seconds forever
        const firerate = 3000
        if (continuous) {
            this.scene.time.addEvent({
                delay: firerate,
                callback: () => {
                    this.fire({ continuous })
                }
            })
        }
    }

    start() {
        // start movements
        // this.scene.tweens.add(this.entrance())
        // this.scene.tweens.add(this.defaultmove())
        // this.scene.tweens.add(this.trackplayer())

        this.scene.time.addEvent({
            delay: 3000,
            callback: () => {
                this.fire({ continuous: true })
            }
        })
    }

    update(time: number, delta: number, player_x: number) {
        this.scene.tweens.add(this.trackplayer(player_x))

        // read docs on 'tweens'
    }
}