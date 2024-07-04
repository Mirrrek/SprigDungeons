import { screenWidth, screenHeight } from '@/constants';
import getSprite from '@/sprites';
import Player from '@/player';
import Level from '@/level';
import input from '@/input';
import play from '@/audio';

let inMenu = true;
let died = false;

const player = new Player();

const spawn = new Level(null);
spawn.generateChildLevels();
spawn.skipFight();

let currentLevel = spawn;

let levelsConquered = 0;

const mainThemePlayer = play('main-theme', Infinity);

player.onEnterLevel = (direction) => {
    if (currentLevel.getState() !== 'conquered') {
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
    if (currentLevel.getState() === 'waiting') {
        currentLevel.generateChildLevels();
        currentLevel.startFight(() => {
            levelsConquered++;
        });
    }
}

player.onDeath = () => {
    died = true;
    mainThemePlayer.end();
    play('death-theme', Infinity);
}

function loop(time: number): void {
    if (inMenu) {
        getAll().forEach((sprite) => sprite.remove());
        clearText();
        currentLevel.render(time);
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 11; x++) {
                let sprite = getSprite('menu-background');
                if (x === 0) {
                    sprite = getSprite(y === 0 ? 'menu-background-corner-south' : y === 4 ? 'menu-background-corner-east' : 'menu-background-edge-east');
                } else if (x === 10) {
                    sprite = getSprite(y === 0 ? 'menu-background-corner-west' : y === 4 ? 'menu-background-corner-north' : 'menu-background-edge-west');
                } else if (y === 0) {
                    sprite = getSprite('menu-background-edge-south');
                } else if (y === 4) {
                    sprite = getSprite('menu-background-edge-north');
                }

                addSprite(Math.floor(screenWidth / 2 - 5.5) + x, Math.floor(screenHeight / 2 - 2.5) + y, sprite);
            }
        }
        addText('Press any', { x: Math.floor(screenWidth / 2 - 4.5), y: Math.floor(screenHeight / 2 - 1.5), color: '0' });
        addText('arrow key', { x: Math.floor(screenWidth / 2 - 4.5), y: Math.floor(screenHeight / 2 - 1.5) + 1, color: '5' });
        addText('to start', { x: Math.floor(screenWidth / 2 - 4.5), y: Math.floor(screenHeight / 2 - 1.5) + 2, color: '0' });
        if (!input.primary.up() && !input.primary.down() && !input.primary.left() && !input.primary.right()) {
            return;
        }
        inMenu = false;
        clearText();
        play('game-start');
    }

    if (died) {
        getAll().forEach((sprite) => sprite.remove());
        clearText();
        currentLevel.render(time);
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 11; x++) {
                let sprite = getSprite('menu-background');
                if (x === 0) {
                    sprite = getSprite(y === 0 ? 'menu-background-corner-south' : y === 2 ? 'menu-background-corner-east' : 'menu-background-edge-east');
                } else if (x === 10) {
                    sprite = getSprite(y === 0 ? 'menu-background-corner-west' : y === 2 ? 'menu-background-corner-north' : 'menu-background-edge-west');
                } else if (y === 0) {
                    sprite = getSprite('menu-background-edge-south');
                } else if (y === 2) {
                    sprite = getSprite('menu-background-edge-north');
                }

                addSprite(Math.floor(screenWidth / 2 - 5.5) + x, Math.floor(screenHeight / 2 - 1.5) + y, sprite);
            }
        }
        addText('You died!', { x: Math.floor(screenWidth / 2 - 4.5), y: Math.floor(screenHeight / 2 - 0.5), color: '0' });
        return;
    }

    // Movement
    if (input.primary.up() && !input.primary.down()) {
        player.move(0, -1);
    }
    if (input.primary.down() && !input.primary.up()) {
        player.move(0, 1);
    }
    if (input.primary.left() && !input.primary.right()) {
        player.move(-1, 0);
    }
    if (input.primary.right() && !input.primary.left()) {
        player.move(1, 0);
    }

    // Shooting
    if (input.secondary.up() && !input.secondary.left() && !input.secondary.down() && !input.secondary.right()) {
        player.shoot('north', currentLevel.getEnemies(false));
    }
    if (!input.secondary.up() && input.secondary.left() && !input.secondary.down() && !input.secondary.right()) {
        player.shoot('west', currentLevel.getEnemies(false));
    }
    if (!input.secondary.up() && !input.secondary.left() && input.secondary.down() && !input.secondary.right()) {
        player.shoot('south', currentLevel.getEnemies(false));
    }
    if (!input.secondary.up() && !input.secondary.left() && !input.secondary.down() && input.secondary.right()) {
        player.shoot('east', currentLevel.getEnemies(false));
    }

    // Update
    currentLevel.update(player.getPosition(), levelsConquered);
    player.update(currentLevel.getEnemies());

    // Rendering
    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render(time);
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
