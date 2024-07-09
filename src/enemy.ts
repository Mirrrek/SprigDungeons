import { Direction } from '@/constants';
import getSprite from '@/sprites';

const loot = [
    { name: 'apple', chance: 0.05 },
    { name: 'shield-potion', chance: 0.02 },
    { name: 'sight-potion', chance: 0.015 },
    { name: 'health-potion', chance: 0.01 },
    { name: 'handgun', chance: 0.005 },
    { name: 'rifle', chance: 0.0025 },
    { name: 'shotgun', chance: 0.001 }
] as const;

export type Loot = typeof loot[number]['name'];

export default class Enemy {
    private boss: boolean;

    private x: number;
    private y: number;

    private direction: Direction;
    private health: number;
    private spawnTime: number;
    private dieTime: number | null;
    private proximityTime: number | null;

    private loot: Loot | null;

    constructor(x: number, y: number, direction: Direction, bossHealth: number = -1) {
        this.boss = bossHealth > 0;
        this.health = this.boss ? bossHealth : 1;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.spawnTime = 0;
        this.dieTime = null;
        this.proximityTime = null;

        const randomLoot = loot[Math.floor(Math.random() * loot.length)];
        this.loot = (this.boss || Math.random() < randomLoot.chance * loot.length) ? randomLoot.name : null;
    }

    render(time: number): void {
        if (this.getState() === 'waiting') {
            return;
        }

        if (this.dieTime !== null) {
            if (Date.now() - this.dieTime < 500) {
                addSprite(this.x, this.y, getSprite(this.boss ? 'boss-death-0' : 'enemy-death-0'));
            } else {
                addSprite(this.x, this.y, getSprite(this.boss ? 'boss-death-1' : 'enemy-death-1'));
                if (this.loot !== null) {
                    const step = Math.floor(time / 500) % 2 === 0 ? '0' : '1';
                    addSprite(this.x, this.y, getSprite(`loot-${this.loot}-${step}`));
                }
            }
            return;
        }

        const step = Math.floor(time / 500) % 2 === 0 ? '0' : '1';
        if (this.boss) {
            addSprite(this.x, this.y - 1, getSprite(`boss-${step}-0-${this.direction}`));
            addSprite(this.x, this.y, getSprite(`boss-${step}-1-${this.direction}`));
        } else {
            addSprite(this.x, this.y, getSprite(`enemy-${step}-${this.direction}`));
        }

        const timeSinceSpawn = Date.now() - this.spawnTime;
        if (!this.boss && timeSinceSpawn < 1000) {
            if (timeSinceSpawn < 500) {
                addSprite(this.x, this.y, getSprite('enemy-spawn-0'));
            } else if (timeSinceSpawn < 750) {
                addSprite(this.x, this.y, getSprite('enemy-spawn-1'));
            } else {
                addSprite(this.x, this.y, getSprite('enemy-spawn-2'));
            }
        }
    }

    spawn(): void {
        this.spawnTime = Date.now();
    }

    update(playerPosition: { x: number, y: number }, enemies: Enemy[]): void {
        if (this.getState() !== 'active') {
            return;
        }

        const dx = playerPosition.x - this.x;
        const dy = playerPosition.y - this.y;

        if (Math.sqrt(dx ** 2 + dy ** 2) <= 1) {
            return;
        }

        let newX = this.x;
        let newY = this.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 ? 1 : -1;
            this.direction = dx > 0 ? 'east' : 'west';
        } else {
            newY += dy > 0 ? 1 : -1;
            this.direction = dy > 0 ? 'south' : 'north';
        }

        if (enemies.some((enemy) => enemy.getState() === 'active' && enemy.getPosition().x === newX && enemy.getPosition().y === newY)) {
            return;
        }

        this.x = newX;
        this.y = newY;
    }

    hit(): boolean {
        if (this.getState() !== 'spawning' && this.getState() !== 'active') {
            return false;
        }

        this.health--;

        if (this.health <= 0) {
            this.dieTime = Date.now();
            return true;
        }

        return false;
    }

    setPlayerProximity(proximity: boolean): boolean {
        if (this.getState() !== 'active') {
            return false;
        }

        if (!proximity) {
            this.proximityTime = null;
            return false;
        }

        if (this.proximityTime === null) {
            this.proximityTime = Date.now();
        } else if (Date.now() - this.proximityTime > (this.boss ? 1250 : 750)) {
            return true;
        }

        return false;
    }

    getState(): 'waiting' | 'spawning' | 'active' | 'dead' {
        if (this.spawnTime === 0) {
            return 'waiting';
        }

        if (this.dieTime !== null) {
            return 'dead';
        }

        if (Date.now() - this.spawnTime < 1000) {
            return 'spawning';
        }

        return 'active';
    }

    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }

    getLoot(): Loot | null {
        return this.loot;
    }

    collectLoot(): void {
        this.loot = null;
    }
}
