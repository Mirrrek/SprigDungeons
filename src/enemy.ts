import { Direction } from '@/constants';
import getSprite from '@/sprites';

const loot = [
    { name: 'apple', chance: 0.05 },
    { name: 'shield-potion', chance: 0.02 },
    { name: 'sight-potion', chance: 0.015 },
    { name: 'health-potion', chance: 0.01 },
    { name: 'gun', chance: 0.005 },
    { name: 'shotgun', chance: 0.001 }
] as const;

export type Loot = typeof loot[number]['name'];

export default class Enemy {
    private x: number;
    private y: number;

    private direction: Direction;
    private spawnTime: number;
    private lastMove: { time: number, attacked: boolean };
    private dieTime: number | null;

    private loot: Loot | null;

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.spawnTime = 0;
        this.lastMove = { time: 0, attacked: false };
        this.dieTime = null;

        const randomLoot = loot[Math.floor(Math.random() * loot.length)];
        this.loot = Math.random() < randomLoot.chance * loot.length ? randomLoot.name : null;
    }

    render(time: number): void {
        if (this.spawnTime === 0) {
            return;
        }

        if (this.dieTime !== null) {
            if (Date.now() - this.dieTime < 500) {
                addSprite(this.x, this.y, getSprite('enemy-death-0'));
            } else {
                addSprite(this.x, this.y, getSprite('enemy-death-1'));
                if (this.loot !== null) {
                    const step = Math.floor(time / 500) % 2 === 0 ? '0' : '1';
                    addSprite(this.x, this.y, getSprite(`loot-${this.loot}-${step}`));
                }
            }
            return;
        }

        const step = Math.floor(time / 500) % 2 === 0 ? '0' : '1';
        addSprite(this.x, this.y, getSprite(`enemy-${step}-${this.direction}`));

        const timeSinceSpawn = Date.now() - this.spawnTime;
        if (timeSinceSpawn < 1000) {
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
        this.lastMove = { time: Date.now() + 1000, attacked: false };
    }

    update(playerPosition: { x: number, y: number }, movementSpeed: number): void {
        if (this.spawnTime === 0 || this.dieTime !== null) {
            return;
        }

        if (Date.now() - this.lastMove.time < 1000 / movementSpeed) {
            return;
        }

        const dx = playerPosition.x - this.x;
        const dy = playerPosition.y - this.y;

        this.lastMove = { time: Date.now(), attacked: true };

        if (dx === 0 && dy === 0) {
            return;
        }

        if (Math.abs(dx) > Math.abs(dy)) {
            this.x += dx > 0 ? 1 : -1;
            this.direction = dx > 0 ? 'east' : 'west';
        } else {
            this.y += dy > 0 ? 1 : -1;
            this.direction = dy > 0 ? 'south' : 'north';
        }
    }

    die(): void {
        if (this.dieTime !== null) {
            return;
        }

        this.dieTime = Date.now();
    }

    hasAttacked(): boolean {
        if (this.lastMove.attacked) {
            this.lastMove.attacked = false;
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
