import Phaser from "phaser";
import { SplashScene } from "./scenes/SplashScene";
import { NextScene } from "./scenes/MiscScenes";
import { GameScene } from "./scenes/GameScene";
import { TriadLevel } from "./scenes/TriadLevel";
import StartMenuScene from "./scenes/StartMenuScene";

const superlandscape = {
    width: 1280,
    height: 540
}

const superportrait = {
    width: 540 * 0.5,
    height: 1280 * 0.5
}

const square = {
    height: 1280,
    width: 1280
}

const config: Phaser.Types.Core.GameConfig = {
    parent: "app",
    type: Phaser.AUTO,
    // ...superportrait,
     ...superlandscape,
    // ...square,
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
        StartMenuScene,
        SplashScene,
        NextScene,
        GameScene,
        TriadLevel,
    ]
};

export default new Phaser.Game(config);