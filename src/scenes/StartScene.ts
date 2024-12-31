

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('start-menu');
    }

    preload() {
        // this.load.image('start-menu', 'assets/images/start-menu.png');
    }

    create() {
        const { width, height } = this.scale;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        this.add.text(centerX, centerY, '')        
        // this.add.image(centerX, centerY, 'start-menu');
    }
}