import Level from '@/level';

const spawn = new Level(null);

function loop() {
    getAll().forEach((sprite) => sprite.remove());
    spawn.render(false);
}

function update() {
    loop();
    setTimeout(() => {
        update();
    }, 100);
}

update();
