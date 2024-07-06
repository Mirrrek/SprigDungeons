import { screenWidth, screenHeight, doorWidth, Direction } from '@/constants';
import getSprite from '@/sprites';
import Enemy from '@/enemy';
import play from '@/audio';

const powerUps = {
    shield: 10000,
    sight: 30000
}

export type PowerUp = keyof typeof powerUps;

const weapons = {
    handgun: { ammo: 16, range: 4 },
    rifle: { ammo: 12, range: 12 },
    shotgun: { ammo: 18, range: 6 }
}

export default class Player {
    private x: number;
    private y: number;

    private direction: Direction;
    private health: number;
    private lastAttack: { time: number, direction: Direction, distance: [number, number, number] };
    private powerUps: { type: PowerUp, time: number }[];
    private ammo: { handgun: number, rifle: number, shotgun: number };
    private dieTime: number | null;
    private killCount: number;
    private applesCollected: number;

    onEnterLevel: ((direction: Direction) => void) | null = null;
    onDeath: (() => void) | null = null;

    constructor() {
        this.x = Math.floor(screenWidth / 2);
        this.y = Math.floor(screenHeight / 2);
        this.direction = 'east';
        this.health = 6;
        this.lastAttack = { time: 0, direction: 'north', distance: [-1, -1, -1] };
        this.powerUps = [];
        this.ammo = { handgun: 0, rifle: 0, shotgun: 0 };
        this.dieTime = null;
        this.killCount = 0;
        this.applesCollected = 0;
    }

    render(time: number): void {
        addSprite(screenWidth - 4, screenHeight - 1, getSprite(this.health >= 6 ? 'heart-0' : this.health === 5 ? 'heart-1' : 'heart-2'));
        addSprite(screenWidth - 3, screenHeight - 1, getSprite(this.health >= 4 ? 'heart-0' : this.health === 3 ? 'heart-1' : 'heart-2'));
        addSprite(screenWidth - 2, screenHeight - 1, getSprite(this.health >= 2 ? 'heart-0' : this.health === 1 ? 'heart-1' : 'heart-2'));

        addSprite(0, screenHeight - 1, getSprite(this.getActiveWeapon() === 'katana' ? 'ammo-0-0' : `ammo-${Math.floor(this.ammo[this.getActiveWeapon() as Exclude<ReturnType<typeof this.getActiveWeapon>, 'katana'>] / 10) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}-0`));
        addSprite(1, screenHeight - 1, getSprite(this.getActiveWeapon() === 'katana' ? 'ammo-0-1' : `ammo-${this.ammo[this.getActiveWeapon() as Exclude<ReturnType<typeof this.getActiveWeapon>, 'katana'>] % 10 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}-1`));

        if (this.dieTime !== null) {
            if (Date.now() - this.dieTime < 500) {
                addSprite(this.x, this.y, getSprite('player-death-0'));
            } else {
                addSprite(this.x, this.y, getSprite('player-death-1'));
            }
            return;
        }

        const step = Math.floor(time / 300) % 2 === 0 ? '0' : '1';
        addSprite(this.x, this.y, getSprite(`player-${step}-${this.direction}`));

        if (Date.now() - this.lastAttack.time < 100) {
            addSprite(this.x + (this.lastAttack.direction === 'east' ? 1 : this.lastAttack.direction === 'west' ? -1 : 0),
                this.y + (this.lastAttack.direction === 'south' ? 1 : this.lastAttack.direction === 'north' ? -1 : 0),
                getSprite(this.getActiveWeapon() === 'katana' ? `katana-swoosh-${Date.now() - this.lastAttack.time < 50 ? '0' : '1'}-${this.lastAttack.direction}` :
                    this.getActiveWeapon() === 'shotgun' ? `muzzle-flash-3way-${this.lastAttack.direction}` : `muzzle-flash-${this.lastAttack.direction}`));

            if (this.getActiveWeapon() !== 'katana') {
                for (let i = 0; i < 3; i++) {
                    if (this.getActiveWeapon() !== 'shotgun' && i > 0) break;

                    for (let j = 0; j < screenWidth + screenHeight; j++) {
                        if (this.lastAttack.distance[i] !== -1 && j > this.lastAttack.distance[i] - 2) break;

                        let x;
                        let y;

                        switch (this.lastAttack.direction) {
                            case 'north':
                                if (i === 0) {
                                    x = this.x;
                                    y = this.y - 2 - j;
                                } else {
                                    x = this.x + (i === 1 ? -Math.floor(j / 2) - 1 : Math.floor(j / 2) + 1);
                                    y = this.y - 2 - j;
                                }
                                break;
                            case 'south':
                                if (i === 0) {
                                    x = this.x;
                                    y = this.y + 2 + j;
                                } else {
                                    x = this.x - (i === 1 ? -Math.floor(j / 2) - 1 : Math.floor(j / 2) + 1);
                                    y = this.y + 2 + j;
                                }
                                break;
                            case 'west':
                                if (i === 0) {
                                    x = this.x - 2 - j;
                                    y = this.y;
                                } else {
                                    x = this.x - 2 - j;
                                    y = this.y - (i === 1 ? -Math.floor(j / 2) - 1 : Math.floor(j / 2) + 1);
                                }
                                break;
                            case 'east':
                                if (i === 0) {
                                    x = this.x + 2 + j;
                                    y = this.y;
                                } else {
                                    x = this.x + 2 + j;
                                    y = this.y + (i === 1 ? -Math.floor(j / 2) - 1 : Math.floor(j / 2) + 1);
                                }
                                break;
                        }

                        if (x < 1 || x >= screenWidth - 1 || y < 1 || y >= screenHeight - 1) break;

                        addSprite(x, y, getSprite(i === 0 ? `bullet-path-${j === 0 ? '0' : j === 1 ? '1' : '2'}-${this.lastAttack.direction}` : `bullet-path-angled-${j === 0 ? '0a' : j === 1 ? '1b' : j % 2 === 0 ? '2a' : '2b'}-${j >= 2 ? i === 1 ? 'north' : 'south' : i === 1 ? 'south' : 'north'}-${j >= 2 ? i === 1 ? this.lastAttack.direction : this.oppositeDirection(this.lastAttack.direction) : i === 1 ? this.oppositeDirection(this.lastAttack.direction) : this.lastAttack.direction}`));
                    }
                }
            }
        }

        if (this.powerUps.some((p) => p.type === 'shield')) {
            if (Math.max(...this.powerUps.filter((p) => p.type === 'shield').map((p) => p.time)) + powerUps['shield'] - Date.now() > 3000 || Math.floor(time / 150) % 2 === 0) {
                addSprite(this.x, this.y, getSprite('shield'));
            }
        }

        const extendedVision = this.powerUps.some((p) => p.type === 'sight') && (Math.max(...this.powerUps.filter((p) => p.type === 'sight').map((p) => p.time)) + powerUps['sight'] - Date.now() > 5000 || Math.floor(time / 750) % 2 === 0);
        for (let y = 0; y < screenHeight; y++) {
            for (let x = 0; x < screenWidth; x++) {
                const d = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);

                if (d >= (extendedVision ? 9 : 2.5)) {
                    if (d < (extendedVision ? 14 : 7)) {
                        addSprite(x, y, getSprite('light-0'));
                    } else if (d < (extendedVision ? 20 : 9)) {
                        addSprite(x, y, getSprite('light-1'));
                    } else if (d < (extendedVision ? 26 : 11)) {
                        addSprite(x, y, getSprite('light-2'));
                    } else {
                        addSprite(x, y, getSprite('light-3'));
                    }
                }
            }
        }
    }

    private oppositeDirection(direction: Direction): Direction {
        switch (direction) {
            case 'north':
                return 'south';
            case 'south':
                return 'north';
            case 'west':
                return 'east';
            case 'east':
                return 'west';
        }
    }

    move(direction: Direction): void {
        if (direction === 'north') {
            this.y--;
            this.direction = 'north';
        } else if (direction === 'south') {
            this.y++;
            this.direction = 'south';
        } else if (direction === 'west') {
            this.x--;
            this.direction = 'west';
        } else if (direction === 'east') {
            this.x++;
            this.direction = 'east';
        }

        if (this.onEnterLevel !== null) {
            const doorPositionX = Math.floor(screenWidth / 2 - doorWidth / 2);
            const doorPositionY = Math.floor(screenHeight / 2 - doorWidth / 2);
            if (this.x <= 0 && this.y >= doorPositionY && this.y < doorPositionY + doorWidth) {
                this.onEnterLevel('west');
            } else if (this.x >= screenWidth - 1 && this.y >= doorPositionY && this.y < doorPositionY + doorWidth) {
                this.onEnterLevel('east');
            } else if (this.y <= 0 && this.x >= doorPositionX && this.x < doorPositionX + doorWidth) {
                this.onEnterLevel('north');
            } else if (this.y >= screenHeight - 1 && this.x >= doorPositionX && this.x < doorPositionX + doorWidth) {
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
        const lootEnemy = enemies.find((enemy) => {
            if (enemy.getState() !== 'dead' || enemy.getLoot() === null) return false;
            const enemyPosition = enemy.getPosition();
            return enemyPosition.x === this.x && enemyPosition.y === this.y;
        }) ?? null;

        if (lootEnemy !== null) {
            const loot = lootEnemy.getLoot();
            lootEnemy.collectLoot();

            play('pickup');

            switch (loot) {
                case 'apple':
                    this.applesCollected++;
                    break;
                case 'shield-potion':
                    this.powerUps.push({ type: 'shield', time: Date.now() });
                    break;
                case 'sight-potion':
                    this.powerUps.push({ type: 'sight', time: Date.now() });
                    break;
                case 'health-potion':
                    this.health++;
                    if (this.health > 6) {
                        this.health = 6;
                    }
                    break;
                case 'handgun':
                case 'rifle':
                case 'shotgun':
                    this.ammo[loot] += weapons[loot].ammo;
                    if (this.ammo[loot] > 99) {
                        this.ammo[loot] = 99;
                    }
                    break;
            }
        }

        this.powerUps = this.powerUps.filter((powerUp) => {
            return powerUps[powerUp.type] === -1 || Date.now() - powerUp.time < powerUps[powerUp.type];
        });
    }

    hit(): void {
        if (this.powerUps.some((p) => p.type === 'shield')) {
            return;
        }

        this.health--;
        play('hurt');
        if (this.health <= 0) {
            this.dieTime = Date.now();
            if (this.onDeath !== null) {
                this.onDeath();
            }
        }
    }

    teleport(direction: Direction): void {
        switch (direction) {
            case 'north':
                this.y = screenHeight - 2;
                break;
            case 'south':
                this.y = 1;
                break;
            case 'west':
                this.x = screenWidth - 2;
                break;
            case 'east':
                this.x = 1;
                break;
        }
    }

    attack(direction: Direction, enemies: Enemy[]): void {
        if (this.getActiveWeapon() === 'katana' && Date.now() - this.lastAttack.time < 250) return;

        if (this.getActiveWeapon() !== 'katana') {
            this.ammo[this.getActiveWeapon() as Exclude<ReturnType<typeof this.getActiveWeapon>, 'katana'>]--;
        }

        this.direction = direction;
        const defaultDistance = this.getActiveWeapon() === 'katana' ? 1 : weapons[this.getActiveWeapon() as Exclude<ReturnType<typeof this.getActiveWeapon>, 'katana'>].range;
        this.lastAttack = { time: Date.now(), direction, distance: [defaultDistance, defaultDistance, defaultDistance] };

        play(this.getActiveWeapon() === 'katana' ? 'katana-swoosh' : `shoot-${this.getActiveWeapon() as Exclude<ReturnType<typeof this.getActiveWeapon>, 'katana'>}`);

        let enemiesInLine: [Enemy[], Enemy[], Enemy[]] = [[], [], []];

        enemies.forEach((enemy) => {
            if (enemy.getState() !== 'spawning' && enemy.getState() !== 'active') return;

            const enemyPosition = enemy.getPosition();
            switch (direction) {
                case 'north':
                    if (enemyPosition.x === this.x && enemyPosition.y <= this.y) {
                        enemiesInLine[0].push(enemy);
                    }
                    break;
                case 'south':
                    if (enemyPosition.x === this.x && enemyPosition.y >= this.y) {
                        enemiesInLine[0].push(enemy);
                    }
                    break;
                case 'west':
                    if (enemyPosition.y === this.y && enemyPosition.x <= this.x) {
                        enemiesInLine[0].push(enemy);
                    }
                    break;
                case 'east':
                    if (enemyPosition.y === this.y && enemyPosition.x >= this.x) {
                        enemiesInLine[0].push(enemy);
                    }
                    break;
            }

            if (this.getActiveWeapon() === 'shotgun') {
                for (let i = 0; i < screenWidth + screenHeight; i++) {
                    switch (direction) {
                        case 'north':
                            if (enemyPosition.x === this.x - Math.floor(i / 2) && enemyPosition.y === this.y - i) {
                                enemiesInLine[1].push(enemy);
                            }
                            if (enemyPosition.x === this.x + Math.floor(i / 2) && enemyPosition.y === this.y - i) {
                                enemiesInLine[2].push(enemy);
                            }
                            break;
                        case 'south':
                            if (enemyPosition.x === this.x + Math.floor(i / 2) && enemyPosition.y === this.y + i) {
                                enemiesInLine[1].push(enemy);
                            }
                            if (enemyPosition.x === this.x - Math.floor(i / 2) && enemyPosition.y === this.y + i) {
                                enemiesInLine[2].push(enemy);
                            }
                            break;
                        case 'west':
                            if (enemyPosition.x === this.x - i && enemyPosition.y === this.y + Math.floor(i / 2)) {
                                enemiesInLine[1].push(enemy);
                            }
                            if (enemyPosition.x === this.x - i && enemyPosition.y === this.y - Math.floor(i / 2)) {
                                enemiesInLine[2].push(enemy);
                            }
                            break;
                        case 'east':
                            if (enemyPosition.x === this.x + i && enemyPosition.y === this.y - Math.floor(i / 2)) {
                                enemiesInLine[1].push(enemy);
                            }
                            if (enemyPosition.x === this.x + i && enemyPosition.y === this.y + Math.floor(i / 2)) {
                                enemiesInLine[2].push(enemy);
                            }
                            break;
                    }
                }
            }
        });

        enemiesInLine.forEach((line) => line.sort((a, b) => {
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
        }));

        for (let i = 0; i < 3; i++) {
            if (enemiesInLine[i].length === 0) {
                continue;
            }

            let distance = 0;

            switch (direction) {
                case 'north':
                    distance = this.y - enemiesInLine[i][0].getPosition().y;
                    break;
                case 'south':
                    distance = enemiesInLine[i][0].getPosition().y - this.y;
                    break;
                case 'west':
                    distance = this.x - enemiesInLine[i][0].getPosition().x;
                    break;
                case 'east':
                    distance = enemiesInLine[i][0].getPosition().x - this.x;
                    break;
            }

            const weaponRange = this.getActiveWeapon() === 'katana' ? 1 : weapons[this.getActiveWeapon() as Exclude<ReturnType<typeof this.getActiveWeapon>, 'katana'>].range;

            if (distance <= weaponRange) {
                this.lastAttack.distance[i] = distance;
                if (enemiesInLine[i][0].hit()) {
                    this.killCount++;
                }
                play('hit');
            }
        }
    }

    private getActiveWeapon(): 'katana' | 'handgun' | 'rifle' | 'shotgun' {
        let activeWeapon: 'katana' | 'handgun' | 'rifle' | 'shotgun' = 'katana';
        (Object.keys(weapons) as (keyof typeof weapons)[]).forEach((weapon) => {
            if (this.ammo[weapon] > 0) {
                activeWeapon = weapon;
            }
        });

        return activeWeapon;
    }

    getKillCount(): number {
        return this.killCount;
    }

    getApplesCollected(): number {
        return this.applesCollected;
    }

    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
}
