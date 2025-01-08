import Phaser from "phaser";
import { SplashScene } from "./scenes/SplashScene";
import { NextScene } from "./scenes/MiscScenes";
import { GameScene } from "./scenes/GameScene";

const superlandscape = {
    width: 1280,
    height: 540
}

const superportrait = {
    width: 540 * 0.5,
    height: 1280 * 0.5
}

const config: Phaser.Types.Core.GameConfig = {
    parent: "app",
    type: Phaser.AUTO,
    ...superportrait,
    // scale: {
    //     mode: Phaser.Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT,

    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        // HelloScene,
        // SplashScene,
        // NextScene,
        GameScene
    ]
};

export default new Phaser.Game(config);