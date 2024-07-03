import Player from '@/player';
import Level from '@/level';
import input from '@/input';

const player = new Player();

const spawn = new Level(null);

function loop(time: number) {
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
    spawn.render(false);
    player.render(time);
}

const startTime = Date.now();
function update() {
    loop(Date.now() - startTime);
    setTimeout(() => {
        update();
    }, 100);
}

update();
