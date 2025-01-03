import { Scene, GameObjects } from "phaser";
import { Direction, Player } from "../characters/Player1";
import { TriadProjectile } from "../characters/TriadProjectile";
import { WaveProjectile } from "../characters/WaveProjectile";

export class GameScene extends Scene {
    player!: Player;
    triad!: TriadProjectile
    wave!: WaveProjectile

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super("GameScene");
    }

    // Preload assets required for the scene
    preload() {
        // Background
        this.load.setPath("assets")
        this.load.image("background", "images/21-9-background.png");

        // Player
        this.load.image("player", "player/player.png");
        this.load.atlas("propulsion-fire", "player/propulsion/propulsion-fire.png", "player/propulsion/propulsion-fire_atlas.json");
        this.load.animation("propulsion-fire-anim", "player/propulsion/propulsion-fire_anim.json");

        // Triad Projectile
        this.load.image("projectile-orange", "triad/projectile-orange-0.png")
        this.load.image("triad-bullet", "triad/bullet.png");

    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Keyboard Input
        this.cursors = this.input.keyboard.createCursorKeys()

        // Linter? to flag when objects constructed in init and not create?
        // to work properly with phaser's framework?

        // setup physics

        // this.hud = new Hud({ scene: this });
    }

    create() {
        // Add Background
        this.add.image(0, 0, "background").setOrigin(0, 0);

        // Add Floor

        // this.add.image(0, this.scale.height, "floor").setOrigin(0, 1);

        // 24 frames a second
        // over one second, how many times do i want player to have to dodge?
        // How often does cuphead make player dodge?
        // whats the 'rhythm'?

        this.player = new Player(this);
        this.player.start();
        
        this.triad = new TriadProjectile({ scene: this, x: 100, y: 50 })
        this.triad.start()

        this.wave = new WaveProjectile(this, { texture: "projectile-orange"})
        this.wave.start()

        this.playerhitsetup();
    }

    private playerhitsetup() {
        let bullets;
        // bullets = this.triad.bulletsv2.b1.bullet        
        bullets = Object.keys(this.triad.bulletsv2)
            .map(k => this.triad.bulletsv2[k].bullet);

        console.log(bullets);

        this.physics.overlap(
            bullets,
            this.player,
            () => console.log("player hit"));
    }

    update(time: number, delta: number) {
        // Update Player
        this.player.update(time, delta);
        this.keyboardInput()

        // Update Triad enemy
        this.triad.update(time, delta, this.player.x)

        // Update Wave enemy
        this.wave.update(time, delta)
    }

    keyboardInput() {
        // Move player's character on keyboard input 
        if (this.cursors.up.isDown)
            this.player.move(Direction.up);
        if (this.cursors.down.isDown)
            this.player.move(Direction.down);

        if (this.cursors.left.isDown)
            this.player.move(Direction.left);

        if (this.cursors.right.isDown) 
            this.player.move(Direction.right);
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
