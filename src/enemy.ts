import { Direction } from '@/constants';
import getSprite from '@/sprites';

export default class Enemy {
    private x: number;
    private y: number;

    private direction: Direction;
    private spawnTime: number;
    private lastMove: number;
    private dieTime: number | null;

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.spawnTime = 0;
        this.lastMove = 0;
        this.dieTime = null;
    }

    render(time: number): void {
        if (this.spawnTime === 0) {
            return;
        }

        if (this.dieTime !== null) {
            const timeSinceDead = Date.now() - this.dieTime;
            if (timeSinceDead < 500) {
                addSprite(this.x, this.y, getSprite('enemy-death-0'));
            } else {
                addSprite(this.x, this.y, getSprite('enemy-death-1'));
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
        this.lastMove = Date.now() + 1000;
    }

    update(playerPosition: { x: number, y: number }, movementSpeed: number): void {
        if (this.spawnTime === 0 || this.dieTime !== null) {
            return;
        }

        if (Date.now() - this.lastMove < 1000 / movementSpeed) {
            return;
        }

        const dx = playerPosition.x - this.x;
        const dy = playerPosition.y - this.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            this.x += dx > 0 ? 1 : -1;
            this.direction = dx > 0 ? 'east' : 'west';
        } else {
            this.y += dy > 0 ? 1 : -1;
            this.direction = dy > 0 ? 'south' : 'north';
        }

        this.lastMove = Date.now();
    }

    die(): void {
        if (this.dieTime !== null) {
            return;
        }

        this.dieTime = Date.now();
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
}
