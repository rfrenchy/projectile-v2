import Phaser from "phaser";
import { SplashScene } from "./scenes/SplashScene";

const config: Phaser.Types.Core.GameConfig = {
    parent: "app",
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    // scale: {
    //     mode: Phaser.Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT,

    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        // HelloScene,
        SplashScene,
    ]
};

export default new Phaser.Game(config);