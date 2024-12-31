import Phaser from "phaser";
import { SplashScene } from "./scenes/SplashScene";
import { NextScene } from "./scenes/MiscScenes";
import { GameScene } from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
    parent: "app",
    type: Phaser.AUTO,
    width: 1280,
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
        NextScene,
        GameScene
    ]
};

export default new Phaser.Game(config);