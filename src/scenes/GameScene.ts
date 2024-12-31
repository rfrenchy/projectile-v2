import { Scene, GameObjects } from "phaser";

// class NullObject extends GameObjects.Sprite {
//     constructor(scene: Phaser.Scene) {
//         super(scene)
//     }
// }

export class GameScene extends Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        // Load Background
        this.load.image("background", "assets/images/21-9-background.png");

    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // this.hud = new Hud({ scene: this });
    }

    create() {
        // Add Background
        this.add.image(0, 0, "background").setOrigin(0, 0);
     //    this.add.image(0, this.scale.height, "floor").setOrigin(0, 1);
    }

    update(time: number, delta: number) {

    }
}

type HudTextUpdate = "points" | "timeout"

class Hud extends GameObjects.Container {
    remaining_time: number
    remaining_time_text: Phaser.GameObjects.BitmapText;
    points_text: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.remaining_time = 0;
        this.remaining_time_text = new GameObjects.BitmapText(
            scene, 
            scene.scale.width - 10, 
            0, 
            "pixelfont", 
            "x", 
            24).setOrigin(1, 0)
        
        this.points_text = new GameObjects.BitmapText(
            scene, 
            10,
            10,
            "pixelfont",
            "y",
            24).setOrigin(0, 0);

        scene.add.existing(this.points_text);
    }

    init(data: any) {
        // this.cameras.main.fadeIn(1000, 0, 0, 0);
        // this.points_text = this.add.bitmapText(10, 10, "pixelfont", "POINTS:0000", 24);
        this.remaining_time = data.remaining_time;
        this.remaining_time_text.setText(`REMAINING:${this.remaining_time}s`)
            .setActive(true)
            .setVisible(true);

        this.points_text.setText("POINTS:0000")
            .setActive(true)
            .setVisible(true);
    }

    update(type: HudTextUpdate, text: string) {
        switch (type.toLowerCase()) {
            case "points":
                this.points_text.setText(`POINTS:${text.toString().padStart(4, "0")}`);
                return;
            case "timeout":
                this.remaining_time_text.setText(`REMAINING:${text.toString().padStart(2, "0")}s`);
                return;
            default:
                console.warn("HUD: hud update type not found", type);
        }
    }
}