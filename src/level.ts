import getSprite from '@/sprites';
import { screenWidth, screenHeight, doorWidth } from '@/constants';

export default class Level {
    // conquered: boolean;

    // private up: Level | null;
    // private forward: Level | null;
    // private down: Level | null;

    private previousLevelDirection: 'up' | 'back' | 'down' | null;

    private map: string;

    constructor(previousLevelDirection: 'up' | 'back' | 'down' | null) {
        this.previousLevelDirection = previousLevelDirection;

        // this.conquered = false;
        // this.up = null;
        // this.forward = null;
        // this.down = null;

        this.map = '';
        for (let y = 0; y < screenHeight; y++) {
            this.map += '\n';
            for (let x = 0; x < screenWidth; x++) {
                this.map += getSprite(Math.random() < 0.25 ? 'level-floor-1' : 'level-floor-0');
            }
        }
    }

    render(locked: boolean) {
        setMap(this.map);
        for (let x = 0; x < screenWidth; x++) {
            if (x === 0) {
                addSprite(x, 0, getSprite('level-floor-corner-south'));
                addSprite(x, screenHeight - 1, getSprite('level-floor-corner-east'));
            } else if (x === screenWidth - 1) {
                addSprite(x, 0, getSprite('level-floor-corner-west'));
                addSprite(x, screenHeight - 1, getSprite('level-floor-corner-north'));
            } else {
                addSprite(x, 0, getSprite('level-floor-edge-south'));
                addSprite(x, screenHeight - 1, getSprite('level-floor-edge-north'));
            }
        }
        for (let y = 1; y < screenHeight - 1; y++) {
            addSprite(0, y, getSprite('level-floor-edge-east'));
            addSprite(screenWidth - 1, y, getSprite('level-floor-edge-west'));
        }
        switch (this.previousLevelDirection) {
            case 'up': {
                const doorPosition = Math.floor(screenWidth / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-south'))
                    .filter((sprite) => sprite.x >= doorPosition && sprite.x < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(i, 0, getSprite(locked ? 'level-door-south' : 'level-floor-0'));
                }
            } break;
            case 'back': {
                const doorPosition = Math.floor(screenHeight / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-east'))
                    .filter((sprite) => sprite.y >= doorPosition && sprite.y < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(0, i, getSprite(locked ? 'level-door-east' : 'level-floor-0'));
                }
            } break;
            case 'down': {
                const doorPosition = Math.floor(screenWidth / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-north'))
                    .filter((sprite) => sprite.x >= doorPosition && sprite.x < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(i, screenHeight - 1, getSprite(locked ? 'level-door-north' : 'level-floor-0'));
                }
            } break;
        }
    }
}
