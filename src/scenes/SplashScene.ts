import { Scene } from "phaser";

type config = {
    version: string;
}

export class SplashScene extends Scene {

    constructor() {
        super("SplashScene");
    }

    preload() {
        this.load.image("vite-phaser", "assets/images/vite-phaser.png");
        this.load.json("config", "config/scene/splash_config.json");
    }

    create() {
        const mcam = this.cameras.main
        const config = this.cache.json.get("config") || {} as config;

        if (!config.version)
            throw new Error("No version found in splash config");

        mcam.fadeIn(1000, 0, 0, 0);   

        this.add.image(
            this.scale.width / 2, 
            this.scale.height / 2, 
            "vite-phaser");

        this.add.text(
            this.scale.width / 2 - 28,
            this.scale.height / 2 + 250,
            config.version,
            { color: "#FFF" }
        )

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                mcam.fadeOut(1000, 0, 0, 0);
                mcam.once("camerafadeoutcomplete", () => {
                    // s.start("NextScene");
                });
            }
        });
    }
}