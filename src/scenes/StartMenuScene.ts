
enum SelectedScene { None, Triad, Wave }

type MenuItem = {
    name: string
}

// TODO ask copilot why typescript not letting me index with enum
type MenuItemList = {
  [key: SelectedScene]: MenuItem 
}

type SceneSelection = {
    index: number
    selected: SelectedScene,
    available: SelectedScene[],
    unavailable: SelectedScene[],
    levels: MenuItemList 
}

export default class StartMenuScene extends Phaser.Scene {    
    selected: SelectedScene = SelectedScene.None
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    sceneselection: SceneSelection = {
        index: -1,
        selected: SelectedScene.None,
        levels: {
            [SelectedScene.None]: {},
            [SelectedScene.Triad]: { name: "Triad" },
            [SelectedScene.Wave]: { name: "Wave" }, 
            
        },
        available: [SelectedScene.Triad, SelectedScene.Wave],
        unavailable: []
    }

    levelSelectionText: Phaser.GameObjects.Text[] = []

    constructor() {
        super('start-menu-scene');
    }

    preload() {
        // this.load.image('start-menu', 'assets/images/start-menu.png');
    }

    init() { 
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const { width, height } = this.scale;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        const tenth = height / 10

        this.levelSelectionText = this.sceneselection.available.map((s, i) => {
            const y = tenth * i+1

            // TODO ask copilot why typescript not letting me index with enum
            const fu = this.sceneselection.levels as any
            const name = fu[s].name 
            return this.add.text(centerX, y, name, {})
        })
    }

    update() {
        // handle change selection
        if (this.cursors.down.isDown) {
            // reset color of prior selection

            // really bad but tired when coded it 

            let scenetext = this.levelSelectionText[this.sceneselection.index]
            if (scenetext) {
                scenetext.setBackgroundColor("none")
                // scenetext.setStroke("white", 16)
            }
            
            this.sceneselection.index = (this.sceneselection.index + 1) % 2

            scenetext = this.levelSelectionText[this.sceneselection.index]
            if (scenetext) {
                scenetext.setBackgroundColor("blue")
            }


            this.selected = this.sceneselection.available[this.sceneselection.index]
        }

        if (this.cursors.up.isDown) {
            // todo
        }

        if (this.cursors.space.isDown) {
            switch (this.selected) {
                case SelectedScene.None:
                    return
                case SelectedScene.Triad:
                    this.scene.start("TriadLevel")
                    return
                case SelectedScene.Wave:
                    this.scene.start("WaveLevel")
                    return
            }
        }
    }
}