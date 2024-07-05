
const colors = {
    BLACK: '0',
    DARK_GRAY: 'L',
    LIGHT_GRAY: '1',
    WHITE: '2',
    RED: '3',
    BROWN: 'C',
    CYAN: '7',
    BLUE: '5',
    YELLOW: '6',
    DARK_YELLOW: 'F',
    GREEN: '4',
    DARK_GREEN: 'D',
    PINK: '8',
    PURPLE: 'H',
    ORANGE: '9',
    TRANSPARENT: '.'
}

export type Color = keyof typeof colors;

export function getColor(color: Color): Sprig.Color {
    return colors[color];
}

const sprites = [
    ...generateYMirrorSprites('menu-highlight-corner', `
..11111111111111
.111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
.111111111111111
..11111111111111`),
    {
        name: 'menu-highlight', bitmap: `
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`
    },
    ...generateRotatedSprites('menu-background-edge', `
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000`),
    ...generateRotatedSprites('menu-background-corner', `
2222222222222L00
2222222222222L00
2222222222222L00
2222222222222L00
2222222222222L00
2222222222222L00
2222222222222L00
2222222222222L00
222222222222L000
222222222222L000
222222222222L000
22222222222L000.
22222222LLL0000.
LLLLLLLL0000000.
00000000000000..
00000000000.....`),
    {
        name: 'menu-background', bitmap: `
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`
    },
    {
        name: 'light-0', bitmap: `
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0
................
.0.0.0.0.0.0.0.0`
    },
    {
        name: 'light-1', bitmap: `
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0
0.0.0.0.0.0.0.0.
.0.0.0.0.0.0.0.0`
    },
    {
        name: 'light-2', bitmap: `
0.0.0.0.0.0.0.0.
.000.000.000.000
0.0.0.0.0.0.0.0.
00.000.000.000.0
0.0.0.0.0.0.0.0.
.000.000.000.000
0.0.0.0.0.0.0.0.
00.000.000.000.0
0.0.0.0.0.0.0.0.
.000.000.000.000
0.0.0.0.0.0.0.0.
00.000.000.000.0
0.0.0.0.0.0.0.0.
.000.000.000.000
0.0.0.0.0.0.0.0.
00.000.000.000.0`
    },
    {
        name: 'light-3', bitmap: `
.000.000.000.000
0000000000000000
00.000.000.000.0
0000000000000000
.000.000.000.000
0000000000000000
00.000.000.000.0
0000000000000000
.000.000.000.000
0000000000000000
00.000.000.000.0
0000000000000000
.000.000.000.000
0000000000000000
00.000.000.000.0
0000000000000000`
    },
    ...generateRotatedSprites('muzzle-flash', `
.......336......
......6336......
.....663396.....
.....693396.....
.....693396.....
.....693396.....
.....693396.....
.....6933966....
....66933996....
....69933996....
....699339966...
...6999339996...
...6993333996...
....69333396....
....69333396....
.....693396.....`),
    ...generateRotatedSprites('muzzle-flash-3way', `
33.....336....33
336....336..6933
6336...336..6336
63396..339..933.
.9339.633969339.
.63396933969336.
.6933993399339..
..933993399339..
..693393393396..
..693393393396..
...6933333396...
...6933333396...
...6993333996...
....69333396....
....69333396....
.....693396.....`),
    ...generateRotatedSprites('bullet-path-0', `
.......93.......
.......39.......
........9.......
.......3........
.......33.......
........3.......
.......93.......
.......33.......
.......39.......
.......33.......
.......93.......
........3.......
.......33.......
.......33.......
.......33.......
.......33.......`),
    ...generateRotatedSprites('bullet-path-1', `
.......6........
.......96.......
.......66.......
........6.......
.......9........
.......69.......
.......6........
.......9........
........9.......
.......96.......
........9.......
.......99.......
.......99.......
................
.......3........
.......99.......`),
    ...generateRotatedSprites('bullet-path-2', `
................
.......6........
.......6........
................
........6.......
.......6........
........6.......
................
........6.......
.......6........
................
.......6........
.......6........
................
........6.......
.......66.......`),
    ...generateXMirrorSprites('bullet-path-angled-0a', `
.......99.......
........3.......
......39........
.......9........
.....33.........
.....93.........
....33..........
....33..........
...33...........
...3............
..39............
..33............
.33.............
.33.............
33..............
33..............`).map((sprite) => generateRotatedSprites(sprite.name, sprite.bitmap)).flat(),
    ...generateXMirrorSprites('bullet-path-angled-1b', `
...............6
...............9
..............6.
..............66
.............9..
..............6.
............6...
............96..
............9...
...........9....
..........96....
..........6.....
..........9.....
..........3.....
.........9......
........99......`).map((sprite) => generateRotatedSprites(sprite.name, sprite.bitmap)).flat(),
    ...generateXMirrorSprites('bullet-path-angled-2a', `
.......66.......
................
........6.......
........6.......
.........6......
.........6......
..........66....
...........6....
................
............6...
............66..
.............6..
................
.............66.
..............66
...............6`).map((sprite) => generateRotatedSprites(sprite.name, sprite.bitmap)).flat(),
    ...generateXMirrorSprites('bullet-path-angled-2b', `
6...............
6...............
................
.6..............
.6..............
..6.............
..6.............
...6............
................
...66...........
.....6..........
................
.....66.........
.....6..........
.......6........
.......6........`).map((sprite) => generateRotatedSprites(sprite.name, sprite.bitmap)).flat(),
    {
        name: 'shield', bitmap: `
.....555555.....
...5577777755...
..577..7...775..
.57..7..7.7..75.
57..7.....77..75
57............75
577.........7775
577..7.7.....775
57......7.....75
57.7....7..7..75
57..7.......7.75
.577.....77..75.
.57...7..7..775.
..577..7...775..
...5577777755...
.....555555.....`
    },
    ...generateYMirrorSprites('player-0', `
....00000000....
...0666666660...
..066666666060..
..066666666060..
..066666666660..
...0666666660...
....00000000....
.......070......
.......07000.333
.......070..03..
.......070......
......0000......
......00D0......
.......0D0......
.......0D0......
.......000......`),
    ...generateYMirrorSprites('player-1', `
................
....00000000....
...0666666660...
..066666666060..
..066666666060..
..066666666660..
...0666666660...
....00000000....
.......07000.333
.......070..03..
.......070......
......0000......
......00D0......
.......0D0......
.......0D0......
.......000......`),
    {
        name: 'player-0-north', bitmap: `
.....000000.....
....06666660....
...0666666660...
...0666666660...
...0666666660...
....06666660....
.....000000.....
......0770......
.....007700.....
.....007700.....
.....007700.....
.....00000......
......0DD0......
......0DD0......
......0DD0......
......0000......`
    },
    {
        name: 'player-1-north', bitmap: `
................
.....000000.....
....06666660....
...0666666660...
...0666666660...
...0666666660...
....06666660....
.....000000.....
.....007700.....
.....007700.....
.....007700.....
.....00000......
......0DD0......
......0DD0......
......0DD0......
......0000......`
    },
    {
        name: 'player-0-south', bitmap: `
.....000000.....
....06666660....
...0660660660...
...0660660660...
...0666666660...
....06666660....
.....000000.....
......0770......
.....007700.....
.....007733.....
.....007703.....
.....00000......
......0DD0......
......0DD0......
......0DD0......
......0000......`
    },
    {
        name: 'player-1-south', bitmap: `
................
.....000000.....
....06666660....
...0660660660...
...0660660660...
...0666666660...
....06666660....
.....000000.....
.....007700.....
.....007733.....
.....007703.....
.....00000......
......0DD0......
......0DD0......
......0DD0......
......0000......`
    },
    {
        name: 'player-death-0', bitmap: `
................
................
................
................
.....000000.....
....06666660....
...0666666660...
...0666666660...
...0660660660...
....06666660....
.....000000.....
.....007700.....
.....000000.....
......0000......
......0DD0......
......0000......`
    },
    {
        name: 'player-death-1', bitmap: `
................
................
................
................
................
................
................
................
................
................
................
.....000000.....
....06666660....
....060606600...
..000607700D00..
..000000700D00..`
    },
    {
        name: 'enemy-spawn-0', bitmap: `
.......222......
.....222222.....
....2.22.222....
...2222222222...
...222222222....
..2222.2222222..
..222222222222..
.22222222222222.
.2222222222.222.
.22222222222222.
..2222222222222.
.22222222222222.
..222.22222222..
..2222222222.2..
...2222222222...
....2222.222....`
    },
    {
        name: 'enemy-spawn-1', bitmap: `
.......2.2......
.....222222.....
.2..2.22.2.2....
...22.222.2222..
....2222.222....
...222.222.22...
..22.22.22222.2.
..2222222.22....
..222.2.222.22..
..22..22222222..
...222.222222...
..222222.22.2...
....2.222222....
.....22.2.2..2..
......22.2......
................`
    },
    {
        name: 'enemy-spawn-2', bitmap: `
..2.2..2.2..2...
.....2...22.....
.2..2.22.2.2....
....2..22.222.2.
....2..2...2....
.......22...2...
..22..2.2.222...
...22.2...22...2
......2.222.2...
......2.2..2....
....2...........
................
................
................
................
................`
    },
    {
        name: 'loot-shotgun-0', bitmap: `
................
................
................
............00..
..........00110.
........001110..
......0011100...
....0011100.....
..0011100CC0....
.0C0100CC00.....
.0CC0.000.......
0CCC00..........
0CC0............
0CC0............
.00.............
................`
    },
    {
        name: 'loot-shotgun-1', bitmap: `
................
............00..
..........00110.
........001110..
......0011100...
....0011100.....
..0011100CC0....
.0C0100CC00.....
.0CC0.000.......
0CCC00..........
0CC0............
0CC0............
.00.............
................
................
................`
    },
    {
        name: 'loot-shield-potion-0', bitmap: `
................
................
................
................
.....222222.....
....2......2....
.....222222.....
......2..2......
......2..2......
.....2....2.....
....27777772....
...2757777772...
...2777757772...
...2775777572...
....27777772....
.....222222.....`
    },
    {
        name: 'loot-shield-potion-1', bitmap: `
................
................
.....222222.....
....2......2....
.....222222.....
......2..2......
......2..2......
.....2....2.....
....27777772....
...2777777572...
...2577577772...
...2777777772...
....27777572....
.....222222.....
................
................`
    },
    {
        name: 'loot-sight-potion-0', bitmap: `
................
................
................
................
.....222222.....
....2......2....
.....222222.....
......2..2......
......2..2......
.....2....2.....
....24444442....
...24D4444442...
...2444444D42...
...244D444442...
....24444442....
.....222222.....`
    },
    {
        name: 'loot-sight-potion-1', bitmap: `
................
................
.....222222.....
....2......2....
.....222222.....
......2..2......
......2..2......
.....2....2.....
....24444442....
...244D444442...
...2444444D42...
...2444D44442...
....24444442....
.....222222.....
................
................`
    },
    {
        name: 'loot-apple-0', bitmap: `
................
................
................
................
................
................
................
.......000......
......044D0.....
.....04D00......
....0333330.....
...033333330....
...033333330....
....0330330.....
.....00.00......
................`
    },
    {
        name: 'loot-apple-1', bitmap: `
................
................
................
................
................
.......000......
......044D0.....
.....04D00......
....0333330.....
...033333330....
...033333330....
....0330330.....
.....00.00......
................
................
................`
    },
    ...generateYMirrorSprites('enemy-0', `
....00000000....
...0333333330...
..033333333030..
..033333333030..
..033333333330..
...0333333330...
....00000000....
.......0H0......
.......0H000....
.......0H0......
.......0H0......
......0000......
......00H0......
.......0H0......
.......0H0......
.......000......`),
    ...generateYMirrorSprites('enemy-1', `
................
....00000000....
...0333333330...
..033333333030..
..033333333030..
..033333333330..
...0333333330...
....00000000....
.......0H0......
.......0H000....
.......0H0......
......0000......
......00H0......
.......0H0......
.......0H0......
.......000......`),
    {
        name: 'enemy-0-north', bitmap: `
.....000000.....
....03333330....
...0333333330...
...0333333330...
...0333333330...
....03333330....
.....000000.....
......0HH0......
.....00HH00.....
.....00HH00.....
.....00HH00.....
.....000000.....
......0HH0......
......0HH0......
......0HH0......
......0000......`
    },
    {
        name: 'enemy-1-north', bitmap: `
.....000000.....
....03333330....
...0333333330...
...0333333330...
...0333333330...
....03333330....
.....000000.....
......0HH0......
.....00HH00.....
.....00HH00.....
.....00HH00.....
.....000000.....
......0HH0......
......0HH0......
......0HH0......
......0000......`
    },
    {
        name: 'enemy-0-south', bitmap: `
.....000000.....
....03333330....
...0330330330...
...0330330330...
...0333333330...
....03333330....
.....000000.....
......0HH0......
.....00HH00.....
.....00HH00.....
.....00HH00.....
.....000000.....
......0HH0......
......0HH0......
......0HH0......
......0000......`
    },
    {
        name: 'enemy-1-south', bitmap: `
................
.....000000.....
....03333330....
...0330330330...
...0330330330...
...0333333330...
....03333330....
.....000000.....
.....00HH00.....
.....00HH00.....
.....00HH00.....
.....000000.....
......0HH0......
......0HH0......
......0HH0......
......0000......`
    },
    {
        name: 'enemy-death-0', bitmap: `
................
................
................
................
.....000000.....
....03333330....
...0333333330...
...0333333330...
...0330330330...
....03333330....
.....000000.....
.....00HH00.....
.....000000.....
......0000......
......0HH0......
......0000......`
    },
    {
        name: 'enemy-death-1', bitmap: `
................
................
................
................
................
................
................
................
................
................
................
.....000000.....
....03333330....
....030303300...
..00030HH00H00..
..000000H00H00..`
    },
    ...generateRotatedSprites('level-door', `
................
................
...0000000000...
..0CCCCCCCCCC0..
.0CCCCCLCCCCCC0.
.0CLCCCCCCCLCC0.
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCLCCCCCCCCC0
0CCCCCCCCCCCCLC0
0CCCCCCCCLCCCCC0
0CCCLCCCCCCCCCC0
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
..0CCCCCLCCCC0..
...0000000000...`),
    ...generateRotatedSprites('level-wall-edge', `
................
................
................
...00L000.......
0000000000000...
0001100000L00000
0L01000000L00010
000000L000000000
0000000000000000
00001000000L0001
0000000000000011
000000L000100000
01000LL00000LL00
010000000000LL00
0000000100000000
0000000000000000`),
    ...generateRotatedSprites('level-wall-corner', `
.....00000010000
.....00L00110000
......0000000L00
......0000000000
......0100000000
00..000000000000
00000000000LL000
000000000000L000
0100000000000000
0000000000000000
00000LL000000011
0LL00000L0000000
0L00000000000000
0000011000000L00
0000000000000000
0000000000000000`),
...generateRotatedSprites('level-wall-cap', `
................
................
....000000......
00000100000.....
00000100L000....
000L00000000....
000LL0000001....
000000000000....
011000L000000...
0000000L00000...
0000000000000...
00001000000L00..
00000000010000..
00000000110000..
00LL0000000000..
0000000000000L..`),
    {
        name: 'level-floor-0', bitmap: `
1111LLLL11111LLL
1111LLLL1111LLLL
111LLLLLL111LLLL
1111L1LL1111LLLL
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1111L1LL11L1
1L11LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLL1
LLLL1111LLLL1111
LLLL11111LLL1111
LLLL1L11LLLL1111
LLLL1111LLLL1111`
    },
    {
        name: 'level-floor-1', bitmap: `
1111LLL11111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL
LL1L1111LLLLL111
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1L11LLLL1111
1111LLLL1111LLLL
1111LLL11111LLLL
1111LLLL1111LLLL
L111LLLL1111LLLL
LLLL1111LLLL1L11
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL11111LLL1111`
    }
] as const;

function generateXMirrorSprites<T extends string>(baseName: T, northBitmap: string): [
    { name: `${T}-north`, bitmap: string },
    { name: `${T}-south`, bitmap: string }] {
    return [
        { name: `${baseName}-north`, bitmap: northBitmap },
        { name: `${baseName}-south`, bitmap: northBitmap.split('\n').reverse().join('\n') }
    ]
}

function generateYMirrorSprites<T extends string>(baseName: T, eastBitmap: string): [
    { name: `${T}-east`, bitmap: string },
    { name: `${T}-west`, bitmap: string }] {
    return [
        { name: `${baseName}-east`, bitmap: eastBitmap },
        { name: `${baseName}-west`, bitmap: eastBitmap.split('\n').map(line => [...line].reverse().join('')).join('\n') }
    ]
}

function generateRotatedSprites<T extends string>(baseName: T, northBitmap: string): [
    { name: `${T}-north`, bitmap: string },
    { name: `${T}-south`, bitmap: string },
    { name: `${T}-east`, bitmap: string },
    { name: `${T}-west`, bitmap: string }] {
    return [
        { name: `${baseName}-north`, bitmap: northBitmap },
        { name: `${baseName}-south`, bitmap: rotateBitmap(northBitmap, 2) },
        { name: `${baseName}-east`, bitmap: rotateBitmap(northBitmap, 1) },
        { name: `${baseName}-west`, bitmap: rotateBitmap(northBitmap, 3) }
    ]
}

function rotateBitmap(bitmap: string, rotations: number): string {
    const lines = bitmap.trim().split('\n');
    const width = lines[0].length;
    const height = lines.length;

    const rotatedLines = Array.from({ length: width }, () => Array.from({ length: height }, () => ' '));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = lines[y][x];
            const rotatedX = rotations === 0 ? x : rotations === 1 ? height - 1 - y : rotations === 2 ? width - 1 - x : y;
            const rotatedY = rotations === 0 ? y : rotations === 1 ? x : rotations === 2 ? height - 1 - y : width - 1 - x;
            rotatedLines[rotatedY][rotatedX] = char;
        }
    }

    return rotatedLines.map(line => line.join('')).join('\n');
}

const spriteTypeChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ';

const spriteTypes: { [key in typeof sprites[number]['name']]: Sprig.SpriteType } = sprites.reduce((acc, sprite, i) => {
    if (i >= spriteTypeChars.length) {
        throw new Error('Too many sprites');
    }

    acc[sprite.name] = spriteTypeChars[i];
    return acc;
}, {} as any);

setLegend(...sprites.map<[Sprig.SpriteType, Sprig.Bitmap]>(({ name, bitmap }) => [spriteTypes[name], bitmap]));

export default function getSprite(name: typeof sprites[number]['name']): Sprig.SpriteType {
    return spriteTypes[name];
}
