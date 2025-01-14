import { Scene, GameObjects } from "phaser";
import { Direction, Player } from "../characters/Player1";
import { TriadProjectile } from "../characters/TriadProjectile";

export class TriadLevel extends Scene {
    player!: Player;
    triad!: TriadProjectile

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super("TriadLevel");
    }

    // Preload assets required for the scene
    preload() {
        // Background
        this.load.setPath("assets")
        this.load.image("background", "images/21-9-background.png");
        // this.load.image("background", "images/9-21-background.png");

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
    }

    update(time: number, delta: number) {
        // Update Player
        this.player.update(time, delta);
        this.keyboardInput()

        // Update Triad enemy
        this.triad.update(time, delta, this.player.x)
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