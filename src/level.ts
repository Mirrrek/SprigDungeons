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
                if (x === 0) {
                    this.map += getSprite(y === 0 ? 'level-floor-corner-south' : y === screenHeight - 1 ? 'level-floor-corner-east' : 'level-floor-edge-east');
                } else if (x === screenWidth - 1) {
                    this.map += getSprite(y === 0 ? 'level-floor-corner-west' : y === screenHeight - 1 ? 'level-floor-corner-north' : 'level-floor-edge-west');
                } else if (y === 0) {
                    this.map += getSprite('level-floor-edge-south');
                } else if (y === screenHeight - 1) {
                    this.map += getSprite('level-floor-edge-north');
                } else {
                    this.map += getSprite(Math.random() < 0.25 ? 'level-floor-1' : 'level-floor-0');
                }
            }
        }
    }

    render(locked: boolean) {
        setMap(this.map);
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
