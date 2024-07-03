import { screenWidth, screenHeight } from '@/constants';
import Player from '@/player';
import Level from '@/level';
import input from '@/input';

const player = new Player();

const spawn = new Level(null);
spawn.generateChildLevels();
spawn.state = 'conquered';

let currentLevel = spawn;

player.onEnterLevel = (direction) => {
    if (currentLevel.state !== 'conquered') {
        return;
    }

    const nextLevel = currentLevel.getLevel(direction);
    if (nextLevel === null) {
        return;
    }

    currentLevel = nextLevel;
    switch (direction) {
        case 'north':
            player.setY(screenHeight - 2);
            break;
        case 'south':
            player.setY(1);
            break;
        case 'west':
            player.setX(screenWidth - 2);
            break;
        case 'east':
            player.setX(1);
            break;
    }
    if (currentLevel.state === 'waiting') {
        currentLevel.generateChildLevels();
        currentLevel.state = 'conquered';
    }
}

function loop(time: number): void {
    // Movement
    if (input.primary.up && !input.primary.down) {
        player.move(0, -1);
    }
    if (input.primary.down && !input.primary.up) {
        player.move(0, 1);
    }
    if (input.primary.left && !input.primary.right) {
        player.move(-1, 0);
    }
    if (input.primary.right && !input.primary.left) {
        player.move(1, 0);
    }

    // Shooting
    if (input.secondary.up && !input.secondary.left && !input.secondary.down && !input.secondary.right) {
        player.shoot('north');
    }
    if (!input.secondary.up && input.secondary.left && !input.secondary.down && !input.secondary.right) {
        player.shoot('west');
    }
    if (!input.secondary.up && !input.secondary.left && input.secondary.down && !input.secondary.right) {
        player.shoot('south');
    }
    if (!input.secondary.up && !input.secondary.left && !input.secondary.down && input.secondary.right) {
        player.shoot('east');
    }

    // Rendering
    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render();
    player.render(time);
}

const startTime = Date.now();
function update(): void {
    loop(Date.now() - startTime);
    setTimeout(() => {
        update();
    }, 100);
}

update();
