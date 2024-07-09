import Player from '@/player';
import Level from '@/level';
import input from '@/input';
import play, { setSfx } from '@/audio';
import menu from '@/menu';

let gameState: 'start-menu' | 'difficulty-menu' | 'game' | 'dead' | 'summary';
let gameSettings: { difficulty: 'rampage' | 'normal' | 'hard' | 'impossible', music: boolean, sfx: boolean };
let startMenuOption: 'music' | 'sfx' | 'start';

let levelsConquered: number;
let deathTime: number;

let player: Player;
let currentLevel: Level;

let musicPlayer: Sprig.Playback;

init();

function init() {
    gameState = 'start-menu';
    gameSettings = {
        difficulty: 'normal',
        music: false,
        sfx: true
    }
    startMenuOption = 'start';

    levelsConquered = 0;
    deathTime = 0;

    player = new Player((direction) => {
        if (currentLevel.getState() !== 'conquered') {
            return;
        }

        const nextLevel = currentLevel.getLevel(direction);
        if (nextLevel === null) {
            return;
        }

        currentLevel = nextLevel;
        player.teleport(direction);
        if (currentLevel.getState() === 'waiting') {
            currentLevel.initialize(calculateBossHealth(), calculateEnemySpeed(), calculateEnemiesPerWave(), gameSettings.difficulty === 'rampage');
        }
    }, () => {
        deathTime = Date.now();
        gameState = 'dead';
        musicPlayer.end();
        play('death');
        if (gameSettings.music) {
            musicPlayer = play('theme-death', Infinity);
        }
    });

    currentLevel = new Level(() => levelsConquered, () => levelsConquered++, null);
    currentLevel.initialize(calculateBossHealth(), calculateEnemySpeed(), calculateEnemiesPerWave(), gameSettings.difficulty === 'rampage');

    musicPlayer = gameSettings.music ? play('theme-main', Infinity) : { end: () => { } };
}

function loop(time: number): void {
    switch (gameState) {
        case 'start-menu':
            startMenuLoop(time);
            break;
        case 'difficulty-menu':
            difficultyMenuLoop(time);
            break;
        case 'game':
            gameLoop(time);
            break;
        case 'dead':
            deadLoop(time);
            break;
        case 'summary':
            summaryLoop(time);
            break;
    }
}

function startMenuLoop(time: number): void {
    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render(time);
    menu([
        { text: 'sprig dungeons\n\n', color: 'BLACK' },
        { text: `music: ${gameSettings.music ? 'on' : 'off'}\n\n`, color: 'DARK_GRAY', highlight: startMenuOption === 'music' },
        { text: `sfx: ${gameSettings.sfx ? 'on' : 'off'}\n\n`, color: 'DARK_GRAY', highlight: startMenuOption === 'sfx' },
        { text: 'start', color: 'RED', highlight: startMenuOption === 'start' }
    ]);
    if (input.primary.up()) {
        switch (startMenuOption) {
            case 'sfx':
                startMenuOption = 'music';
                play('menu-move');
                break;
            case 'start':
                startMenuOption = 'sfx';
                play('menu-move');
                break;
        }
    }
    if (input.primary.down()) {
        switch (startMenuOption) {
            case 'music':
                startMenuOption = 'sfx';
                play('menu-move');
                break;
            case 'sfx':
                startMenuOption = 'start';
                play('menu-move');
                break;
        }
    }
    if (input.primary.right()) {
        switch (startMenuOption) {
            case 'music':
                gameSettings.music = !gameSettings.music;
                if (gameSettings.music) {
                    musicPlayer = play('theme-main', Infinity);
                } else {
                    musicPlayer.end();
                }
                play('menu-select');
                break;
            case 'sfx':
                gameSettings.sfx = !gameSettings.sfx;
                setSfx(gameSettings.sfx);
                play('menu-select');
                break;
            case 'start':
                setSfx(gameSettings.sfx);
                gameState = 'difficulty-menu';
                clearText();
                play('menu-select');
                break;
        }
    }
}

function difficultyMenuLoop(time: number): void {
    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render(time);
    menu([
        { text: 'select\ndifficulty\n\n', color: 'BLACK' },
        { text: 'rampage\n\n', color: 'DARK_GRAY', highlight: gameSettings.difficulty === 'rampage' },
        { text: 'normal\n\n', color: 'DARK_GRAY', highlight: gameSettings.difficulty === 'normal' },
        { text: 'hard\n\n', color: 'DARK_GRAY', highlight: gameSettings.difficulty === 'hard' },
        { text: 'impossible', color: 'DARK_GRAY', highlight: gameSettings.difficulty === 'impossible' }
    ]);
    if (input.primary.up()) {
        switch (gameSettings.difficulty) {
            case 'normal':
                gameSettings.difficulty = 'rampage';
                play('menu-move');
                break;
            case 'hard':
                gameSettings.difficulty = 'normal';
                play('menu-move');
                break;
            case 'impossible':
                gameSettings.difficulty = 'hard';
                play('menu-move');
                break;
        }
    }
    if (input.primary.down()) {
        switch (gameSettings.difficulty) {
            case 'rampage':
                gameSettings.difficulty = 'normal';
                play('menu-move');
                break;
            case 'normal':
                gameSettings.difficulty = 'hard';
                play('menu-move');
                break;
            case 'hard':
                gameSettings.difficulty = 'impossible';
                play('menu-move');
                break;
        }
    }
    if (input.primary.right()) {
        gameState = 'game';
        clearText();
        play('menu-select');
    }
}

function gameLoop(time: number): void {
    if (input.primary.up()) {
        player.move('north');
    }
    if (input.primary.down()) {
        player.move('south');
    }
    if (input.primary.left()) {
        player.move('west');
    }
    if (input.primary.right()) {
        player.move('east');
    }

    if (input.secondary.up()) {
        player.attack('north', currentLevel.getEnemies());
    }
    if (input.secondary.left()) {
        player.attack('west', currentLevel.getEnemies());
    }
    if (input.secondary.down()) {
        player.attack('south', currentLevel.getEnemies());
    }
    if (input.secondary.right()) {
        player.attack('east', currentLevel.getEnemies());
    }

    if (currentLevel.update(player.getPosition())) {
        player.hit();
    }
    player.update(currentLevel.getEnemies());

    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render(time);
    player.render(time);
}

function deadLoop(time: number): void {
    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render(time);
    player.render(time);
    menu([{ text: 'you died!', color: 'RED' }]);

    if ((input.primary.up() || input.primary.down() || input.primary.left() || input.primary.right()) && Date.now() - deathTime > 1000) {
        gameState = 'summary';
        clearText();
        play('menu-select');
    }
}

function summaryLoop(time: number): void {
    getAll().forEach((sprite) => sprite.remove());
    currentLevel.render(time);
    player.render(time);
    menu([
        { text: `level ${levelsConquered + 1}\n`, color: 'BLACK' },
        { text: `${gameSettings.difficulty}\n\n`, color: 'LIGHT_GRAY' },
        { text: 'kills: ', color: 'RED' }, { text: `${player.getKillCount().toString().padStart(7)}\n`, color: 'DARK_GRAY' },
        { text: 'apples:', color: 'GREEN' }, { text: `${player.getApplesCollected().toString().padStart(7)}`, color: 'DARK_GRAY' }
    ]);

    if (input.primary.up() || input.primary.down() || input.primary.left() || input.primary.right()) {
        musicPlayer.end();
        init();
    }
}

function calculateBossHealth(): number {
    switch (gameSettings.difficulty) {
        case 'rampage':
            return Math.floor(25 + levelsConquered * 2.5);
        case 'normal':
            return Math.floor(4 + levelsConquered);
        case 'hard':
            return Math.floor(8 + levelsConquered * 1.25);
        case 'impossible':
            return Math.floor(12 + levelsConquered * 1.5);
    }
}

function calculateEnemySpeed(): number {
    switch (gameSettings.difficulty) {
        case 'rampage':
            return 2.5 + levelsConquered * 0.25;
        case 'normal':
            return 1 + levelsConquered * 0.1;
        case 'hard':
            return 2 + levelsConquered * 0.15;
        case 'impossible':
            return 3 + levelsConquered * 0.2;
    }
}

function calculateEnemiesPerWave(): number[] {
    switch (gameSettings.difficulty) {
        case 'rampage':
            return [
                5 + levelsConquered,
                7 + levelsConquered,
                9 + levelsConquered
            ]
        case 'normal':
            return [
                Math.floor(3 + levelsConquered * 0.2),
                Math.floor(5 + levelsConquered * 0.2),
                Math.floor(7 + levelsConquered * 0.2)
            ]
        case 'hard':
            return [
                Math.floor(4 + levelsConquered * 0.2),
                Math.floor(6 + levelsConquered * 0.2),
                Math.floor(8 + levelsConquered * 0.2)
            ]
        case 'impossible':
            return [
                Math.floor(5 + levelsConquered * 0.4),
                Math.floor(7 + levelsConquered * 0.4),
                Math.floor(9 + levelsConquered * 0.4)
            ]
    }
}

const startTime = Date.now();
function update(): void {
    loop(Date.now() - startTime);
    setTimeout(() => {
        update();
    }, 50);
}

update();
