import { Scene } from "phaser";
import { TriadProjectile } from "../characters/TriadProjectile";
import { Player } from "../characters/Player1";
import { handlePlayerInput } from "../input";

export class TriadLevel extends Scene {
    // Input
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    // Agents
    player!: Player
    triad!: TriadProjectile 

    constructor() {
        super("TriadLevel")
    }

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
    }

    create() {
        // Add Background
        this.add.image(0, 0, "background").setOrigin(0, 0);

        // Create Player
        this.player = new Player(this)
        this.player.start()

        // Create Triad
        this.triad = new TriadProjectile({ scene: this, x: 100, y: 50 })
        this.triad.start()
    }

    update(time: number, delta: number) {
        // assumes agents are created

        this.player.update(time, delta)

        // should just handle input in player update?
        handlePlayerInput(this.player, this.cursors)

        this.triad.update(time, delta, this.player.x)
    }
}