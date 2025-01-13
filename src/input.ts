import { Types } from "phaser";
import { Player } from "./characters/Player1";

enum Direction { up, down, left, right }

type CursorKeys = Types.Input.Keyboard.CursorKeys


// Move player's character on keyboard input 
export function handlePlayerInput(player: Player, cursors: CursorKeys) {
        if (cursors.up.isDown)
            player.move(Direction.up);
        if (cursors.down.isDown)
            player.move(Direction.down);
        if (cursors.left.isDown)
            player.move(Direction.left);
        if (cursors.right.isDown) 
            player.move(Direction.right);
}