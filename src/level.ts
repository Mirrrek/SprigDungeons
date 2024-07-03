import getSprite from '@/sprites';
import { screenWidth, screenHeight, doorWidth, Direction } from '@/constants';

export default class Level {
    state: 'waiting' | 'active' | 'conquered';

    private readonly previousLevel: { level: Level, direction: Exclude<Direction, 'east'> } | null;

    private northLevel: Level | null;
    private eastLevel: Level | null;
    private southLevel: Level | null;

    private readonly map: string;

    constructor(previousLevel: { level: Level, direction: Exclude<Direction, 'east'> } | null) {
        this.previousLevel = previousLevel;

        this.state = 'waiting';

        this.northLevel = null;
        this.eastLevel = null;
        this.southLevel = null;

        this.map = '';
        for (let y = 0; y < screenHeight; y++) {
            this.map += '\n';
            for (let x = 0; x < screenWidth; x++) {
                this.map += getSprite(Math.random() < 0.25 ? 'level-floor-1' : 'level-floor-0');
            }
        }
    }

    generateChildLevels(): void {
        if (this.state !== 'waiting') {
            throw new Error('Cannot generate child levels for a level that is not waiting');
        }

        let nextLevelDirection: Exclude<Direction, 'west'> = 'east';
        do {
            nextLevelDirection = (['north', 'east', 'south'] as const)[Math.floor(Math.random() * 3)];
        } while (nextLevelDirection === this.previousLevel?.direction);

        switch (nextLevelDirection) {
            case 'north': {
                this.northLevel = new Level({ level: this, direction: 'south' });
                if (Math.random() < 0.15) {
                    this.eastLevel = new Level({ level: this, direction: 'west' });
                }
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'south') {
                    this.southLevel = new Level({ level: this, direction: 'north' });
                }
            } break;
            case 'east': {
                this.eastLevel = new Level({ level: this, direction: 'west' });
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'north') {
                    this.northLevel = new Level({ level: this, direction: 'south' });
                }
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'south') {
                    this.southLevel = new Level({ level: this, direction: 'north' });
                }
            } break;
            case 'south': {
                this.southLevel = new Level({ level: this, direction: 'north' });
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'north') {
                    this.northLevel = new Level({ level: this, direction: 'south' });
                }
                if (Math.random() < 0.15) {
                    this.eastLevel = new Level({ level: this, direction: 'west' });
                }
            } break;
        }
    }

    getLevel(direction: Direction): Level | null {
        if (direction === this.previousLevel?.direction) {
            return this.previousLevel.level;
        }

        switch (direction) {
            case 'north': return this.northLevel;
            case 'east': return this.eastLevel;
            case 'south': return this.southLevel;
            case 'west': return null;
        }
    }

    render(): void {
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

        if (this.previousLevel !== null) {
            this.renderDoor(this.previousLevel.direction, this.state !== 'active');
        }

        if (this.northLevel !== null) {
            this.renderDoor('north', this.state === 'conquered');
        }

        if (this.eastLevel !== null) {
            this.renderDoor('east', this.state === 'conquered');
        }

        if (this.southLevel !== null) {
            this.renderDoor('south', this.state === 'conquered');
        }
    }

    private renderDoor(direction: Direction, open: boolean): void {
        switch (direction) {
            case 'north': {
                const doorPosition = Math.floor(screenWidth / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-south'))
                    .filter((sprite) => sprite.x >= doorPosition && sprite.x < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(i, 0, getSprite(open ? 'level-floor-0' : 'level-door-south'));
                }
            } break;
            case 'west': {
                const doorPosition = Math.floor(screenHeight / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-east'))
                    .filter((sprite) => sprite.y >= doorPosition && sprite.y < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(0, i, getSprite(open ? 'level-floor-0' : 'level-door-east'));
                }
            } break;
            case 'south': {
                const doorPosition = Math.floor(screenWidth / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-north'))
                    .filter((sprite) => sprite.x >= doorPosition && sprite.x < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(i, screenHeight - 1, getSprite(open ? 'level-floor-0' : 'level-door-north'));
                }
            } break;
            case 'east': {
                const doorPosition = Math.floor(screenHeight / 2 - doorWidth / 2);
                getAll(getSprite('level-floor-edge-west'))
                    .filter((sprite) => sprite.y >= doorPosition && sprite.y < doorPosition + doorWidth)
                    .forEach((sprite) => sprite.remove());
                for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                    addSprite(screenWidth - 1, i, getSprite(open ? 'level-floor-0' : 'level-door-west'));
                }
            } break;
        }
    }
}
