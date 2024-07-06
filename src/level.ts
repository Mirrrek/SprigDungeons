import { screenWidth, screenHeight, doorWidth, Direction } from '@/constants';
import getSprite from '@/sprites';
import Enemy from '@/enemy';
import play from '@/audio';

export default class Level {
    private type: 'normal' | 'boss';
    private state: 'waiting' | 'active' | 'conquered';

    private readonly previousLevel: { level: Level, direction: Exclude<Direction, 'east'> } | null;

    private northLevel: Level | null;
    private eastLevel: Level | null;
    private southLevel: Level | null;

    private map: string;

    private readonly enemies: Enemy[][];
    private lastMoveTime: number;
    private currentWave: number;
    private newWaveTime: number;
    private lastBossWave: number;

    private getLevelsConquered: () => number;
    private onLevelConquered: () => void;

    constructor(getLevelsConquered: () => number, onLevelConquered: () => void, previousLevel: { level: Level, direction: Exclude<Direction, 'east'> } | null) {
        this.getLevelsConquered = getLevelsConquered;
        this.onLevelConquered = onLevelConquered;
        this.previousLevel = previousLevel;

        this.type = 'normal';
        this.state = 'waiting';

        this.northLevel = null;
        this.eastLevel = null;
        this.southLevel = null;

        this.map = '';

        this.enemies = [];
        this.lastMoveTime = 0;
        this.currentWave = 0;
        this.newWaveTime = 0;
        this.lastBossWave = 0;
    }

    initialize(): void {
        if (this.state !== 'waiting') {
            return;
        }

        this.type = this.getLevelsConquered() % 4 === 3 ? 'boss' : 'normal';

        const carpetPositionX = Math.floor(screenWidth / 2 - 3);
        const carpetPositionY = Math.floor(screenHeight / 2 - 3);
        for (let y = 0; y < screenHeight; y++) {
            this.map += '\n';
            for (let x = 0; x < screenWidth; x++) {
                if (this.type === 'boss' && x >= carpetPositionX && x < carpetPositionX + 6 && y >= carpetPositionY && y < carpetPositionY + 6) {
                    if (x === carpetPositionX) {
                        this.map += getSprite(y === carpetPositionY ? 'level-carpet-corner-south' : y === carpetPositionY + 5 ? 'level-carpet-corner-east' : 'level-carpet-edge-east');
                    } else if (x === carpetPositionX + 5) {
                        this.map += getSprite(y === carpetPositionY ? 'level-carpet-corner-west' : y === carpetPositionY + 5 ? 'level-carpet-corner-north' : 'level-carpet-edge-west');
                    } else if (y === carpetPositionY) {
                        this.map += getSprite('level-carpet-edge-south');
                    } else if (y === carpetPositionY + 5) {
                        this.map += getSprite('level-carpet-edge-north');
                    } else {
                        this.map += getSprite('level-carpet');
                    }
                } else {
                    this.map += getSprite(Math.random() < 0.25 ? 'level-floor-1' : 'level-floor-0');
                }
            }
        }

        let nextLevelDirection: Exclude<Direction, 'west'> = 'east';
        do {
            nextLevelDirection = (['north', 'east', 'south'] as const)[Math.floor(Math.random() * 3)];
        } while (nextLevelDirection === this.previousLevel?.direction);

        switch (nextLevelDirection) {
            case 'north': {
                this.northLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'south' });
                if (Math.random() < 0.15) {
                    this.eastLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'west' });
                }
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'south') {
                    this.southLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'north' });
                }
            } break;
            case 'east': {
                this.eastLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'west' });
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'north') {
                    this.northLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'south' });
                }
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'south') {
                    this.southLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'north' });
                }
            } break;
            case 'south': {
                this.southLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'north' });
                if (Math.random() < 0.15 && this.previousLevel?.direction !== 'north') {
                    this.northLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'south' });
                }
                if (Math.random() < 0.15) {
                    this.eastLevel = new Level(this.getLevelsConquered, this.onLevelConquered, { level: this, direction: 'west' });
                }
            } break;
        }

        if (this.previousLevel === null) {
            this.state = 'conquered';
            return;
        }

        switch (this.type) {
            case 'normal':
                this.enemies.push(new Array(3 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)])));
                this.enemies.push(new Array(5 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)])));
                this.enemies.push(new Array(7 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)])));
                break;
            case 'boss':
                this.enemies.push([new Enemy(Math.floor(screenWidth / 2), Math.floor(screenHeight / 2), this.previousLevel?.direction ?? 'north', this.getLevelsConquered() + 15)]);
                break;
        }
        this.state = 'active';
        this.enemies[0].forEach((enemy) => enemy.spawn());
        play('level-start');
    }

    update(playerPosition: { x: number, y: number }, enemySpeed: number): boolean {
        if (this.state !== 'active') {
            return false;
        }

        if (this.type === 'boss' && Date.now() - this.lastBossWave > 10000 && this.enemies[0][0].getState() !== 'dead') {
            this.lastBossWave = Date.now();
            this.enemies[0].push(...new Array(3 + Math.floor(this.getLevelsConquered() / 4)).fill(null).map(() => new Enemy(Math.floor(Math.random() * (screenWidth - 2) + 1), Math.floor(Math.random() * (screenHeight - 2) + 1), (['north', 'east', 'south', 'west'] as const)[Math.floor(Math.random() * 4)])));
            this.enemies[0].forEach((enemy) => enemy.getState() === 'waiting' && enemy.spawn());
        }

        if (this.enemies[this.currentWave].every((enemy) => enemy.getState() === 'dead')) {
            if (this.newWaveTime === 0) {
                if (this.currentWave === this.enemies.length - 1) {
                    this.state = 'conquered';
                    play('level-cleared');
                    this.onLevelConquered();
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

        if (Date.now() - this.lastMoveTime > 1000 / enemySpeed) {
            this.lastMoveTime = Date.now();
            this.enemies.forEach((wave) => wave.forEach((enemy) => enemy.update(playerPosition)));
        }

        if (this.enemies[this.currentWave].some((enemy) => enemy.setPlayerProximity(Math.sqrt((enemy.getPosition().x - playerPosition.x) ** 2 + (enemy.getPosition().y - playerPosition.y) ** 2) <= 1))) {
            this.enemies[this.currentWave].forEach((enemy) => enemy.setPlayerProximity(false));
            return true;
        }
        return false;
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
