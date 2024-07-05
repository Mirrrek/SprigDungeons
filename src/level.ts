import { screenWidth, screenHeight, doorWidth, Direction } from '@/constants';
import getSprite from '@/sprites';
import Enemy from '@/enemy';
import play from '@/audio';

export default class Level {
    private state: 'waiting' | 'active' | 'conquered';

    private readonly previousLevel: { level: Level, direction: Exclude<Direction, 'east'> } | null;

    private northLevel: Level | null;
    private eastLevel: Level | null;
    private southLevel: Level | null;

    private readonly map: string;

    private readonly enemies: [Enemy[], Enemy[], Enemy[]];
    private currentWave: 0 | 1 | 2;
    private newWaveTime: number;

    private getLevelsConquered: () => number;
    private onLevelConquered: (() => void) | null = null;

    constructor(getLevelsConquered: () => number, previousLevel: { level: Level, direction: Exclude<Direction, 'east'> } | null) {
        this.getLevelsConquered = getLevelsConquered;
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

        this.enemies = [[], [], []];
        this.currentWave = 0;
        this.newWaveTime = 0;
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
                this.northLevel = new Level(this.getLevelsConquered, { level: this, direction: 'south' });
                if (Math.random() < 0.15) {
                    this.eastLevel = new Level(this.getLevelsConquered, { level: this, direction: 'west' });
                }
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'south') {
                    this.southLevel = new Level(this.getLevelsConquered, { level: this, direction: 'north' });
                }
            } break;
            case 'east': {
                this.eastLevel = new Level(this.getLevelsConquered, { level: this, direction: 'west' });
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'north') {
                    this.northLevel = new Level(this.getLevelsConquered, { level: this, direction: 'south' });
                }
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'south') {
                    this.southLevel = new Level(this.getLevelsConquered, { level: this, direction: 'north' });
                }
            } break;
            case 'south': {
                this.southLevel = new Level(this.getLevelsConquered, { level: this, direction: 'north' });
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'north') {
                    this.northLevel = new Level(this.getLevelsConquered, { level: this, direction: 'south' });
                }
                if (Math.random() < 0.15) {
                    this.eastLevel = new Level(this.getLevelsConquered, { level: this, direction: 'west' });
                }
            } break;
        }
    }

    skipFight(): void {
        this.state = 'conquered';
    }

    startFight(onLevelConquered: () => void): void {
        this.onLevelConquered = onLevelConquered;

        this.enemies[0] = new Array(3 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)]));
        this.enemies[1] = new Array(5 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)]));
        this.enemies[2] = new Array(7 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)]));

        this.state = 'active';
        this.enemies[0].forEach((enemy) => enemy.spawn());
        play('level-start');
    }

    update(playerPosition: { x: number, y: number }, enemySpeed: number): void {
        if (this.state !== 'active') {
            return;
        }

        if (this.enemies[this.currentWave].every((enemy) => enemy.getState() === 'dead')) {
            if (this.newWaveTime === 0) {
                if (this.currentWave === 2) {
                    this.state = 'conquered';
                    play('level-cleared');
                    if (this.onLevelConquered !== null) {
                        this.onLevelConquered();
                    }
                } else {
                    this.newWaveTime = Date.now();
                }
            } else if (Date.now() - this.newWaveTime > 1500) {
                this.newWaveTime = 0;
                this.currentWave++;
                this.enemies[this.currentWave].forEach((enemy) => enemy.spawn());
                play('spawn');
            }
        }

        this.enemies.forEach((wave) => wave.forEach((enemy) => enemy.update(playerPosition, enemySpeed)));
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

    render(time: number): void {
        setMap(this.map);

        for (let x = 0; x < screenWidth; x++) {
            if (x === 0) {
                addSprite(x, 0, getSprite('level-wall-corner-south'));
                addSprite(x, screenHeight - 1, getSprite('level-wall-corner-east'));
            } else if (x === screenWidth - 1) {
                addSprite(x, 0, getSprite('level-wall-corner-west'));
                addSprite(x, screenHeight - 1, getSprite('level-wall-corner-north'));
            } else {
                addSprite(x, 0, getSprite('level-wall-edge-south'));
                addSprite(x, screenHeight - 1, getSprite('level-wall-edge-north'));
            }
        }
        for (let y = 1; y < screenHeight - 1; y++) {
            addSprite(0, y, getSprite('level-wall-edge-east'));
            addSprite(screenWidth - 1, y, getSprite('level-wall-edge-west'));
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

        this.enemies.forEach((wave) => wave.forEach((enemy) => enemy.render(time)));
    }

    private renderDoor(direction: Direction, open: boolean): void {
        switch (direction) {
            case 'north': {
                const doorPosition = Math.floor(screenWidth / 2 - doorWidth / 2);
                getAll(getSprite('level-wall-edge-south'))
                    .filter((sprite) => sprite.x >= doorPosition - 1 && sprite.x < doorPosition + doorWidth + 1)
                    .forEach((sprite) => sprite.remove());
                addSprite(doorPosition - 1, 0, getSprite('level-wall-cap-east'));
                addSprite(doorPosition + doorWidth, 0, getSprite('level-wall-cap-south'));
                if (!open) {
                    for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                        addSprite(i, 0, getSprite('level-door-south'));
                    }
                }
            } break;
            case 'west': {
                const doorPosition = Math.floor(screenHeight / 2 - doorWidth / 2);
                getAll(getSprite('level-wall-edge-east'))
                    .filter((sprite) => sprite.y >= doorPosition - 1 && sprite.y < doorPosition + doorWidth + 1)
                    .forEach((sprite) => sprite.remove());
                addSprite(0, doorPosition - 1, getSprite('level-wall-cap-east'));
                addSprite(0, doorPosition + doorWidth, getSprite('level-wall-cap-north'));
                if (!open) {
                    for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                        addSprite(0, i, getSprite('level-door-east'));
                    }
                }
            } break;
            case 'south': {
                const doorPosition = Math.floor(screenWidth / 2 - doorWidth / 2);
                getAll(getSprite('level-wall-edge-north'))
                    .filter((sprite) => sprite.x >= doorPosition - 1 && sprite.x < doorPosition + doorWidth + 1)
                    .forEach((sprite) => sprite.remove());
                addSprite(doorPosition - 1, screenHeight - 1, getSprite('level-wall-cap-north'));
                addSprite(doorPosition + doorWidth, screenHeight - 1, getSprite('level-wall-cap-west'));
                if (!open) {
                    for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                        addSprite(i, screenHeight - 1, getSprite('level-door-north'));
                    }
                }
            } break;
            case 'east': {
                const doorPosition = Math.floor(screenHeight / 2 - doorWidth / 2);
                getAll(getSprite('level-wall-edge-west'))
                    .filter((sprite) => sprite.y >= doorPosition - 1 && sprite.y < doorPosition + doorWidth + 1)
                    .forEach((sprite) => sprite.remove());
                addSprite(screenWidth - 1, doorPosition - 1, getSprite('level-wall-cap-south'));
                addSprite(screenWidth - 1, doorPosition + doorWidth, getSprite('level-wall-cap-west'));
                if (!open) {
                    for (let i = doorPosition; i < doorPosition + doorWidth; i++) {
                        addSprite(screenWidth - 1, i, getSprite('level-door-west'));
                    }
                }
            } break;
        }
    }

    getState(): 'waiting' | 'active' | 'conquered' {
        return this.state;
    }

    getEnemies(): Enemy[] {
        return this.enemies.flat();
    }
}
