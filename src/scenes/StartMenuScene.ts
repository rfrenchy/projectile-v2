
// TODO next/previous working

enum SceneKey { None, Triad, Wave }

type MenuItem = {
    key: SceneKey
    name: string
    available: boolean
    gameobject?: Phaser.GameObjects.Text
}

type Menu = {
    selected: SceneKey, // make a menu item?
    scenes: MenuItem[] 
    index: number

    next: () => void
    previous: () => void 
    open: () => void
}

export default class StartMenuScene extends Phaser.Scene {    
    selected: SceneKey = SceneKey.None

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys // set in init

    menu: Menu = {
        selected: SceneKey.Triad,
        index: 0,
        scenes: [
            { key: SceneKey.Triad, name: "TriadLevel", available: true },
            { key: SceneKey.Wave,  name: "WaveLevel", available: true },
        ],
        next: function() {
            // reset current
            this.scenes[this.index].gameobject?.setBackgroundColor("none")

            // incr index
            this.index = (this.index + 1) % this.scenes.length

            // update new
            this.scenes[this.index].gameobject?.setBackgroundColor("blue")
        },
        previous: function() {
            // reset current
            this.scenes[this.index].gameobject?.setBackgroundColor("none")

            // incr index
            this.index = (this.index - 1) % this.scenes.length

            // update new
            this.scenes[this.index].gameobject?.setBackgroundColor("blue")
        }, 
        open: () => {
            this.scene.start(this.menu.scenes[this.menu.index].name)
        }
    }

    constructor() {
        super('start-menu-scene');
    }

    init() { 
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const { width, height } = this.scale;

        // divide space into grid
        const col = width * 0.5; // 1 column
        const row = height / 10; // 10 rows

        // write level name text object in each cell
        this.menu.scenes
            .filter(s => s.available)
            .forEach((s,i) => {
                s.gameobject = this.add.text(col, row * (i+1), s.name, {})
            })
    }

    update() {
        // handle change selection
        if (this.cursors.down.isDown) {
            this.menu.next()
        }

        if (this.cursors.up.isDown) {
            this.menu.previous()
        }

        if (this.cursors.space.isDown) {
            this.menu.open()
        }
    }
}