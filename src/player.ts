import { screenWidth, screenHeight, Direction } from '@/constants';
import getSprite from '@/sprites';

export default class Player {
    private x: number;
    private y: number;

    private direction: Direction;

    constructor() {
        this.x = Math.floor(screenWidth / 2);
        this.y = Math.floor(screenHeight / 2);
        this.direction = 'east';
    }

    render(time: number) {
        const step = Math.floor(time / 500) % 2 === 0 ? '0' : '1';
        addSprite(this.x, this.y, getSprite(`player-${step}-${this.direction}`));
    }

    move(x: number, y: number) {
        this.x += x;
        this.y += y;
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
    }

    shoot(direction: Direction) {
        this.direction = direction;
    }
}
