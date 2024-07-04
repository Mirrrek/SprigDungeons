import { screenWidth, screenHeight, doorWidth, Direction } from '@/constants';
import getSprite from '@/sprites';
import Enemy from '@/enemy';
import play from '@/audio';

export default class Player {
    private x: number;
    private y: number;

    private direction: Direction;
    private lastShot: number = 0;
    private lastShotDistance: number = -1;

    onEnterLevel: ((direction: Direction) => void) | null = null;
    onDeath: (() => void) | null = null;

    constructor() {
        this.x = Math.floor(screenWidth / 2);
        this.y = Math.floor(screenHeight / 2);
        this.direction = 'east';
    }

    render(time: number): void {
        const step = Math.floor(time / 500) % 2 === 0 ? '0' : '1';
        addSprite(this.x, this.y, getSprite(`player-${step}-${this.direction}`));

        if (Date.now() - this.lastShot < 100) {
            addSprite(this.x + (this.direction === 'east' ? 1 : this.direction === 'west' ? -1 : 0),
                this.y + (this.direction === 'south' ? 1 : this.direction === 'north' ? -1 : 0),
                getSprite(`muzzle-flash-${this.direction}`));
            for (let i = 0; i < Math.max(screenWidth, screenHeight); i++) {
                if (this.lastShotDistance !== -1 && i > this.lastShotDistance - 3) break;
                if (this.direction === 'north' && this.y - 2 - i < 1) break;
                if (this.direction === 'south' && this.y + 2 + i >= screenHeight - 1) break;
                if (this.direction === 'west' && this.x - 2 - i < 1) break;
                if (this.direction === 'east' && this.x + 2 + i >= screenWidth - 1) break;
                addSprite(this.x + (this.direction === 'east' ? 2 + i : this.direction === 'west' ? -2 - i : 0),
                    this.y + (this.direction === 'south' ? 2 + i : this.direction === 'north' ? -2 - i : 0),
                    getSprite(`bullet-path-${i === 0 ? '0' : i === 1 ? '1' : '2'}-${this.direction}`));
            }
        }
    }

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;

        if (this.onEnterLevel !== null) {
            const doorPositionX = Math.floor(screenWidth / 2 - doorWidth / 2);
            const doorPositionY = Math.floor(screenHeight / 2 - doorWidth / 2);
            if (this.x === 0 && this.y >= doorPositionY && this.y < doorPositionY + doorWidth) {
                this.onEnterLevel('west');
            } else if (this.x === screenWidth - 1 && this.y >= doorPositionY && this.y < doorPositionY + doorWidth) {
                this.onEnterLevel('east');
            } else if (this.y === 0 && this.x >= doorPositionX && this.x < doorPositionX + doorWidth) {
                this.onEnterLevel('north');
            } else if (this.y === screenHeight - 1 && this.x >= doorPositionX && this.x < doorPositionX + doorWidth) {
                this.onEnterLevel('south');
            }
        }

        if (this.x < 1) {
            this.x = 1;
        }
        if (this.x > screenWidth - 2) {
            this.x = screenWidth - 2;
        }
        if (this.y < 1) {
            this.y = 1;
        }
        if (this.y > screenHeight - 2) {
            this.y = screenHeight - 2;
        }

        play('move');
    }

    update(enemies: Enemy[]): void {
        if (enemies.some((enemy) => {
            const enemyPosition = enemy.getPosition();
            return enemyPosition.x === this.x && enemyPosition.y === this.y;
        })) {
            play('death');
            if (this.onDeath !== null) {
                this.onDeath();
            }
        }
    }

    setX(x: number): void {
        this.x = x;

        if (this.x < 1) {
            this.x = 1;
        }
        if (this.x > screenWidth - 2) {
            this.x = screenWidth - 2;
        }
    }

    setY(y: number): void {
        this.y = y;

        if (this.y < 1) {
            this.y = 1;
        }
        if (this.y > screenHeight - 2) {
            this.y = screenHeight - 2;
        }
    }

    shoot(direction: Direction, enemies: Enemy[]): void {
        this.direction = direction;
        this.lastShot = Date.now();

        play('shoot');

        let enemiesInLine: Enemy[] = [];

        enemies.forEach((enemy) => {
            const enemyPosition = enemy.getPosition();
            switch (direction) {
                case 'north':
                    if (enemyPosition.x === this.x && enemyPosition.y <= this.y) {
                        enemiesInLine.push(enemy);
                    }
                    break;
                case 'south':
                    if (enemyPosition.x === this.x && enemyPosition.y >= this.y) {
                        enemiesInLine.push(enemy);
                    }
                    break;
                case 'west':
                    if (enemyPosition.y === this.y && enemyPosition.x <= this.x) {
                        enemiesInLine.push(enemy);
                    }
                    break;
                case 'east':
                    if (enemyPosition.y === this.y && enemyPosition.x >= this.x) {
                        enemiesInLine.push(enemy);
                    }
                    break;
            }
        });

        enemiesInLine.sort((a, b) => {
            const aPosition = a.getPosition();
            const bPosition = b.getPosition();
            switch (direction) {
                case 'north':
                    return bPosition.y - aPosition.y;
                case 'south':
                    return aPosition.y - bPosition.y;
                case 'west':
                    return bPosition.x - aPosition.x;
                case 'east':
                    return aPosition.x - bPosition.x;
            }
        });

        if (enemiesInLine.length > 0) {
            switch (direction) {
                case 'north':
                    this.lastShotDistance = this.y - enemiesInLine[0].getPosition().y;
                    break;
                case 'south':
                    this.lastShotDistance = enemiesInLine[0].getPosition().y - this.y;
                    break;
                case 'west':
                    this.lastShotDistance = this.x - enemiesInLine[0].getPosition().x;
                    break;
                case 'east':
                    this.lastShotDistance = enemiesInLine[0].getPosition().x - this.x;
                    break;
            }
            enemiesInLine[0].die();
        } else {
            this.lastShotDistance = -1;
        }
    }

    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
}
