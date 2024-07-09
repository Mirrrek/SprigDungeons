
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
        name: 'heart-0', bitmap: `
................
................
................
................
................
................
.00.00..........
0330330..00.00..
0333330.0330330.
0333330.0333330.
.03330..0333330.
..030....03330..
...0......030...
...........0....
................
................`
    },
    {
        name: 'heart-1', bitmap: `
................
................
................
................
................
................
.00.00..........
0110110..00.00..
0111110.0330330.
0111110.0333330.
.01110..0333330.
..010....03330..
...0......030...
...........0....
................
................`
    },
    {
        name: 'heart-2', bitmap: `
................
................
................
................
................
................
.00.00..........
0110110..00.00..
0111110.0110110.
0111110.0111110.
.01110..0111110.
..010....01110..
...0......010...
...........0....
................
................`
    },
    {
        name: 'ammo-0-0', bitmap: `
................
................
................
................
................
................
...........222..
..........22222.
..........22.22.
..........2...2.
..........2...2.
..........22.22.
..........22222.
...........222..
................
................`
    },
    {
        name: 'ammo-1-0', bitmap: `
................
................
................
................
................
................
............22..
...........222..
..........2222..
..........2.22..
............22..
............22..
............22..
..........22222.
................
................`
    },
    {
        name: 'ammo-2-0', bitmap: `
................
................
................
................
................
................
...........222..
..........22.22.
..........2...2.
.............22.
............22..
...........22...
..........22..2.
..........22222.
................
................`
    },
    {
        name: 'ammo-3-0', bitmap: `
................
................
................
................
................
................
...........222..
..........22.22.
..............2.
............222.
.............22.
..........2...2.
..........22.22.
...........222..
................
................`
    },
    {
        name: 'ammo-4-0', bitmap: `
................
................
................
................
................
................
...........2....
..........22....
..........2.....
..........22.2..
...........2222.
.............2..
.............2..
...........2222.
................
................`
    },
    {
        name: 'ammo-5-0', bitmap: `
................
................
................
................
................
................
..........22222.
..........2.....
..........2.....
..........2222..
.............22.
..............2.
..........2..22.
..........2222..
................
................`
    },
    {
        name: 'ammo-6-0', bitmap: `
................
................
................
................
................
................
...........2222.
..........22....
..........2.....
..........2222..
..........22.22.
..........2...2.
..........22.22.
...........222..
................
................`
    },
    {
        name: 'ammo-7-0', bitmap: `
................
................
................
................
................
................
..........22222.
..........2...2.
.............22.
............22..
............2...
...........22...
..........22....
..........2.....
................
................`
    },
    {
        name: 'ammo-8-0', bitmap: `
................
................
................
................
................
................
...........222..
..........22.22.
..........22.22.
...........222..
..........22.22.
..........2...2.
..........22.22.
...........222..
................
................`
    },
    {
        name: 'ammo-9-0', bitmap: `
................
................
................
................
................
................
...........222..
..........22.22.
..........2...2.
..........22.22.
...........2222.
..............2.
.............22.
...........222..
................
................`
    },
    {
        name: 'ammo-0-1', bitmap: `
................
................
................
................
................
................
..222...........
.22222..........
.22.22..........
.2...2..........
.2...2..........
.22.22..........
.22222..........
..222...........
................
................`
    },
    {
        name: 'ammo-1-1', bitmap: `
................
................
................
................
................
................
...22...........
..222...........
.2222...........
.2.22...........
...22...........
...22...........
...22...........
.22222..........
................
................`
    },
    {
        name: 'ammo-2-1', bitmap: `
................
................
................
................
................
................
..222...........
.22.22..........
.2...2..........
....22..........
...22...........
..22............
.22..2..........
.22222..........
................
................`
    },
    {
        name: 'ammo-3-1', bitmap: `
................
................
................
................
................
................
..222...........
.22.22..........
.....2..........
...222..........
....22..........
.2...2..........
.22.22..........
..222...........
................
................`
    },
    {
        name: 'ammo-4-1', bitmap: `
................
................
................
................
................
................
..2.............
.22.............
.2..............
.22.2...........
..2222..........
....2...........
....2...........
..2222..........
................
................`
    },
    {
        name: 'ammo-5-1', bitmap: `
................
................
................
................
................
................
.22222..........
.2..............
.2..............
.2222...........
....22..........
.....2..........
.2..22..........
.2222...........
................
................`
    },
    {
        name: 'ammo-6-1', bitmap: `
................
................
................
................
................
................
..2222..........
.22.............
.2..............
.2222...........
.22.22..........
.2...2..........
.22.22..........
..222...........
................
................`
    },
    {
        name: 'ammo-7-1', bitmap: `
................
................
................
................
................
................
.22222..........
.2...2..........
....22..........
...22...........
...2............
..22............
.22.............
.2..............
................
................`
    },
    {
        name: 'ammo-8-1', bitmap: `
................
................
................
................
................
................
..222...........
.22.22..........
.22.22..........
..222...........
.22.22..........
.2...2..........
.22.22..........
..222...........
................
................`
    },
    {
        name: 'ammo-9-1', bitmap: `
................
................
................
................
................
................
..222...........
.22.22..........
.2...2..........
.22.22..........
..2222..........
.....2..........
....22..........
..222...........
................
................`
    },
    {
        name: 'loot-shotgun-icon', bitmap: `
................
................
................
............2002
..........200110
........20011102
......200111002.
....200111002...
..20011100CC0...
..0C0100CC002...
.20CC020002.....
.0CCC002.2......
20CC02..........
20CC02..........
.2002...........
................`
    },
    {
        name: 'loot-rifle-icon', bitmap: `
................
.............02.
...........2010.
...........0102.
.........2010...
......2000102...
.....2020002....
....202000L02...
....020000LL0...
...20000020L02..
..22000002.02...
.200000L...2....
20L0000L2.......
.0LL0000L.......
.2002200L2......
..22..2.2.......`
    },
    {
        name: 'loot-handgun-icon', bitmap: `
................
................
................
................
....2.2..2..2...
...200000000002.
..0.011111111102
...0110111111110
..20000000000000
..00000000000002
.200002..2..2.2.
2000002.........
.00002..........
.2000...........
...2............
................`
    },
    {
        name: 'loot-sight-potion-icon', bitmap: `
................
................
................
......2.2.......
.....200002.....
.....02..20.....
.....200002.....
......0..0......
.....20..02.....
....20444402....
....04444D40....
....04444440....
....04D44440....
....2044D402....
.....200002.....
.......2........`
    },
    {
        name: 'loot-shield-potion-icon', bitmap: `
................
................
................
.......2........
.....200002.....
....202..202....
.....200002.....
......0..0......
......0..0......
....20777702....
....075777702...
...2077775702...
....07757770....
....20777702....
.....200002.....
.......2.2......`
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
    ...generateRotatedSprites('katana-swoosh-0', `
................
................
................
................
......1L22.2....
......1L222222..
......1L222.2.2.
......1L22.2.22.
.......1L22.2...
.......1L2.2....
.......1L2222.2.
.......1L22222..
........1L22..2.
........1L222...
........1L2..2..
........1L22.2..`),
    ...generateRotatedSprites('katana-swoosh-1', `
................
................
................
................
................
......2.........
..2.2...........
.22..2..........
22..2...........
.2222..2........
L..222...2......
1L22.222........
.1L.222..2......
..1L22.2.2......
...1L222........
....1L2.2.......`),
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
......0000......
....00CCCC00....
....0CCCCCC0....
...0CCCCCCCC0...
...0CCCCCCCC0...
...0CCCC66C0....
...0C0C66060....
....06066060....
.....0666660....
.....000000.....
.....07060......
....070000......
....077660......
.....00000......
......0550......
......0660......`),
    ...generateYMirrorSprites('player-1', `
....00000000....
....0CCCCCC0....
...0CCCCCCCC0...
...0CCCCCCCC0...
...0CCCC66C0....
...0C0C66060....
....06066060....
.....0666660....
.....000000.....
.....07060......
....070000......
....070770......
....077660......
.....00000......
......0550......
......0660......`),
    {
        name: 'player-0-north', bitmap: `
.......000......
.....00CCC00....
....0CCCCCCC0...
....0CCCCCCC0...
....0CCCCCCC0...
....0CCCCCCC0...
...06CCCCCCC60..
....0CCCCCCC0...
....006666600...
...07700000770..
..0777777777770.
..0770777770770.
..0660000000660.
...00055555000..
.....0550550....
.....0660660....`
    },
    {
        name: 'player-1-north', bitmap: `
.....0000000....
....0CCCCCCC0...
....0CCCCCCC0...
....0CCCCCCC0...
....0CCCCCCC0...
...06CCCCCCC60..
....0CCCCCCC0...
....006666600...
...07700000770..
..0777777777770.
..0777777777770.
..0770777770770.
..0660000000660.
...00055555000..
.....0550550....
.....0660660....`
    },
    {
        name: 'player-0-south', bitmap: `
.......000......
.....00CCC00....
....0CCCCCCC0...
....0CCCCCCC0...
....0CCCCCCC0...
....0C66C66C0...
...06606660660..
....060666060...
....006666600...
...07700000770..
..0777766677770.
..0770777770770.
..0660000000660.
...00055555000..
.....0550550....
.....0660660....`
    },
    {
        name: 'player-1-south', bitmap: `
.....0000000....
....0CCCCCCC0...
....0CCCCCCC0...
....0CCCCCCC0...
....0C66C66C0...
...06606660660..
....060666060...
....006666600...
...07700000770..
..0777766677770.
..0770777770770.
..0770777770770.
..0660000000660.
...00055555000..
.....0550550....
.....0660660....`
    },
    {
        name: 'player-death-0', bitmap: `
................
................
................
................
................
.....00000......
....0CCCCC0.....
...0CCCCCCC0....
...0CC666CC0....
...0CF0606C0....
....0CCFCC0.....
....07CCCC0.....
...050LLLLL0....
...0F00000060...
...0F0C0CC060...
....00000000....`
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
.....00000......
....0CCCCC0.....
...0CCCCCCC0....
...0CFFFFFC0....
...0CC0F0CC0....
..075CCCCC550...
..0F5775577F0...
..0CCC007CCC0...`
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
        name: 'loot-rifle-0', bitmap: `
................
................
.............0..
............010.
...........010..
..........010...
.......00010....
......0.000.....
.....0.000L0....
....0.0000LL0...
....00000.0L0...
....00000..0....
..00000L........
.0L0000L........
.0LL0000L.......
..00..00L.......`
    },
    {
        name: 'loot-rifle-1', bitmap: `
.............0..
............010.
...........010..
..........010...
.......00010....
......0.000.....
.....0.000L0....
....0.0000LL0...
....00000.0L0...
....00000..0....
..00000L........
.0L0000L........
.0LL0000L.......
..00..00L.......
................
................`
    },
    {
        name: 'loot-handgun-0', bitmap: `
................
................
................
................
................
....0000000000..
..0.01111111110.
...0110111111110
...0000000000000
..0000000000000.
..0000..........
.00000..........
.0000...........
..000...........
................
................`
    },
    {
        name: 'loot-handgun-1', bitmap: `
................
................
................
....0000000000..
..0.01111111110.
...0110111111110
...0000000000000
..0000000000000.
..0000..........
.00000..........
.0000...........
..000...........
................
................
................
................`
    },
    {
        name: 'loot-health-potion-0', bitmap: `
................
................
................
................
.....000000.....
....0......0....
.....000000.....
......0..0......
......0..0......
.....0....0.....
....03333330....
...0339333330...
...0333333330...
...0333933330...
....03333930....
.....000000.....`
    },
    {
        name: 'loot-health-potion-1', bitmap: `
................
................
.....000000.....
....0......0....
.....000000.....
......0..0......
......0..0......
.....0....0.....
....03333330....
...0339333330...
...0333333330...
...0333933330...
....03333930....
.....000000.....
................
................`
    },
    {
        name: 'loot-sight-potion-0', bitmap: `
................
................
................
................
.....000000.....
....0......0....
.....000000.....
......0..0......
......0..0......
.....0....0.....
....04444440....
...04D4444440...
...0444444D40...
...044D444440...
....04444440....
.....000000.....`
    },
    {
        name: 'loot-sight-potion-1', bitmap: `
................
................
.....000000.....
....0......0....
.....000000.....
......0..0......
......0..0......
.....0....0.....
....04444440....
...044D444440...
...0444444D40...
...0444D44440...
....04444440....
.....000000.....
................
................`
    },
    {
        name: 'loot-shield-potion-0', bitmap: `
................
................
................
................
.....000000.....
....0......0....
.....000000.....
......0..0......
......0..0......
.....0....0.....
....07777770....
...0757777770...
...0777757770...
...0775777570...
....07777770....
.....000000.....`
    },
    {
        name: 'loot-shield-potion-1', bitmap: `
................
................
.....000000.....
....0......0....
.....000000.....
......0..0......
......0..0......
.....0....0.....
....07777770....
...0777777570...
...0577577770...
...0777777770...
....07777570....
.....000000.....
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
    ...generateYMirrorSprites('boss-0-0', `
................
................
.......000......
......08D40.....
.....08DDD40....
.....0DDD2D0....
.....0DDD2D0....
......04DDD0....
......00000.....
.....0H3H0......
.....033H30.....
.....03H3H0.....
.....030030.....
....030DD0......
....0H04D0......
....0H3000......`),
    ...generateYMirrorSprites('boss-0-1', `
....0H3000......
....03HH330.....
....0333HH0.....
.....0HH330.....
.....03H330.....
....033HH0......
....03H3330.....
....03H33H0.....
....0H3HH30.....
....0H33H30.....
....03H330......
.....0000.......
.....0D40.......
.....0DD40......
.....04DD0......
......000.......`),
    ...generateYMirrorSprites('boss-1-0', `
................
.......000......
......08D40.....
.....08DDD40....
.....0DDD2D0....
.....0DDD2D0....
......04DDD0....
......00000.....
.....0H3H0......
.....033H30.....
.....03H3H0.....
.....030030.....
....030DD0......
....0H04D0......
....0H3000......
....0H3000......`),
    ...generateYMirrorSprites('boss-1-1', `
....03HH330.....
....0333HH0.....
.....0HH330.....
.....03H330.....
....033HH0......
....03H3330.....
....03H33H0.....
....0H3HH30.....
....0H33H30.....
....03H3330.....
....00H300......
.....0000.......
.....0D40.......
.....0DD40......
.....04DD0......
......000.......`),
    {
        name: 'boss-0-0-north', bitmap: `
................
......00000.....
.....0888440....
....0888DDDD0...
....08DDDDDD0...
....0DDDDDD40...
....04DDDDD40...
.....0DDDD40....
...00000000000..
..03HHH33HH33H0.
..0H33H33333HH0.
.0H33333HH333H30
.03H0H33H33303H0
.03303H33HH303H0
..000H33H33H000.
.0D403H33H3H0D40`
    },
    {
        name: 'boss-0-1-north', bitmap: `
.0D403H3333H04D0
.0DD0H333H3304D0
..00.033H330.00.
....033H3HH30...
....0H33333H0...
...03H3H333330..
...0H3H3HH33H0..
...0H3H3033H30..
...03H33033HH0..
...033H0.0H330..
...00030.03000..
....0DD0.04D0...
....0440.04D0...
....04D0.0D40...
....0DD0.0440...
.....00...00....`
    },
    {
        name: 'boss-1-0-north', bitmap: `
......00000.....
.....0888440....
....0888DDDD0...
....08DDDDDD0...
....0DDDDDD40...
....04DDDDD40...
.....0DDDD40....
...00000000000..
..03HHH33HH33H0.
..0H33H33333HH0.
.0H33333HH333H30
.03H0H33H33303H0
.03303H33HH303H0
..000H33H33H000.
.0D403H33H3H0D40
.0D403H3333H04D0`
    },
    {
        name: 'boss-1-1-north', bitmap: `
.0DD0H333H3304D0
..00.033H330.00.
....033H3HH30...
....0H33333H0...
...03H3H333330..
...0H3H3HH33H0..
...0H3H3033H30..
...03H33033HH0..
...033H0.0H330..
...00030.03000..
....0DD0.04D0...
....0440.04D0...
....04D0.0D40...
....04D0.0D40...
....0DD0.0440...
.....00...00....`
    },
    {
        name: 'boss-0-0-south', bitmap: `
................
......00000.....
.....04D8880....
....04DDD8880...
....0DDDDDD80...
....0DD2DD2D0...
....04D2DD2D0...
.....0DDDDD0....
...0000D4D0000..
..03H33000HH330.
..03H33H33H3H30.
.0HH33H33H333H30
.0H303HH333H0H30
.033033333H303H0
..0003HH3HH3000.
.04D0H33333H0D40`
    },
    {
        name: 'boss-0-1-south', bitmap: `
.0D40HH33H3H04D0
.0D403HH33H30440
..00.033H3H0.00.
....033H33H30...
....033HH33H0...
...0HH33HH3H30..
...0H333HH3H30..
...03HH30HH3H0..
..0333H30333HH0.
..0HH3H0.0HH330.
..030030.030030.
...00D40.0DD00..
....0DD0.0440...
...044D0.04DD0..
...04DD0.04D40..
....000...000...`
    },
    {
        name: 'boss-1-0-south', bitmap: `
......00000.....
.....04D8880....
....04DDD8880...
....0DDDDDD80...
....0DD2DD2D0...
....04D2DD2D0...
.....0DDDDD0....
...0000D4D0000..
..03H33000HH330.
..03H33H33H3H30.
.0HH33H33H333H30
.0H303HH333H0H30
.033033333H303H0
..0003HH3HH3000.
.04D0H33333H0D40
.0D40HH33H3H04D0`
    },
    {
        name: 'boss-1-1-south', bitmap: `
.0D403HH33H30440
..00.033H3H0.00.
....033H33H30...
....033HH33H0...
...0HH33HH3H30..
...0H333HH3H30..
...03HH30HH3H0..
..0333H30333HH0.
..0HH3H0.0HH330.
..03H330.033H30.
...00000.00000..
....0DD0.0D40...
....0DD0.0440...
...044D0.04DD0..
...04DD0.04D40..
....000...000...`
    },
    {
        name: 'boss-death-0', bitmap: `
.....000L0......
....0DLD880.....
....04LD180.....
.....01D10......
....0000000.....
...0HL3HLH30....
...L30H330L0....
...0D0L3L0D0....
....0H3H3H0.....
...LH3H3HL30....
...03LH0H3L0....
...0HH3L3H30....
....0000000.....
...L0D0.0D00....
..0DL40.0DLL0...
...000...000....`
    },
    {
        name: 'boss-death-1', bitmap: `
................
................
................
................
................
................
.....0000L0.....
....04LDDD80....
....0D1DD140....
.....01DL10.....
....L000000L0...
...0H3HL3L3H30..
...0D033H3H0D0..
....0L3003L30...
....00DD0L0D0...
.....0000000....`
    },
    ...generateYMirrorSprites('enemy-0', `
................
.......000......
......0D880.....
.....0DDDD80....
.....0DDD2D0....
.....0DDDDD0....
......00DDD0....
.....004900.....
.....04D9C00....
.....0DDD990....
.....094DDC0....
.....09C4D90....
.....099CC90....
......0C99C0....
......00DD0.....
.......0000.....`),
    ...generateYMirrorSprites('enemy-1', `
.......000......
......0D880.....
.....0DDDD80....
.....0DDD2D0....
.....0DDDDD0....
......00DDD0....
.....004900.....
.....04D9C00....
.....0DDD990....
.....0CDD9C0....
.....094DDC0....
.....09C4D90....
.....099CC90....
......0C99C0....
......00DD0.....
.......0000.....`),
    {
        name: 'enemy-0-north', bitmap: `
................
......0000......
.....088DD0.....
....088DDDD0....
....0DDDDDD0....
....0DD4DDD0....
.....0DDDD0.....
....00099000....
...04C9C9C9D0...
..0DD9C99C9D40..
..04DC99C99440..
..0D09CC9CC0D0..
...00D99C9900...
....04D99DD0....
....04D004D0....
.....00..00.....`
    },
    {
        name: 'enemy-1-north', bitmap: `
......0000......
.....088DD0.....
....088DDDD0....
....0DDDDDD0....
....0DD4DDD0....
.....0DDDD0.....
....00099000....
...049CC99CD0...
..0DDC9C9C9D40..
..0449C99C9D40..
..04DC99C99440..
...009CC9CC00...
....0D99C990....
....04D99DD0....
....04D004D0....
.....00..00.....`
    },
    {
        name: 'enemy-0-south', bitmap: `
................
......0000......
.....0DD880.....
....0DDDDD80....
....0DD2D2D0....
....0DD2D2D0....
.....0DD4D0.....
....0009C000....
...04CC99CCD0...
..04D99C9C94D0..
..0DD9C9C994D0..
..0D0C999CC0D0..
...004CC99C00...
....04DC9DD0....
....0DD004D0....
.....00..00.....`
    },
    {
        name: 'enemy-1-south', bitmap: `
......0000......
.....0DD880.....
....0DDDDD80....
....0DD2D2D0....
....0DD2D2D0....
.....0DD4D0.....
....00099000....
...04C99C99D0...
..04DCC99CCDD0..
..04D99C9C94D0..
..0DD9C9C994D0..
...00C999CC00...
....04CC99C0....
....04DC9DD0....
....0DD004D0....
.....00..00.....`
    },
    {
        name: 'enemy-death-0', bitmap: `
................
................
................
................
................
......0000......
.....0DL880.....
....0DLDDL80....
....0DD1D1D0....
....00LDDD00....
...04CC99CLD0...
..0LD9LC9L94D0..
..04LC999CCLL0..
..0D04CL99C0D0..
...00DLD04D00...
....00000000....`
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
......00000.....
.....0DLD880....
...00L91D1000...
..0DLCCC9CLDL0..
..0LDC9LCC9LDL..
..00LDC90LDD00..
...0000000000...`
    },
    ...generateRotatedSprites('level-door', `
................
................
................
................
................
................
................
................
..0000....0000..
.0CCLC0..0CCCC0.
0CCCCCC00CCLCLC0
0CLCCCC00CCCCCC0
0CCCCLC00CLCCCC0
0CCCCCC00CCCCLC0
.0CCLC0..0CCCC0.
..0000....0000..`),
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
        name: 'level-carpet', bitmap: `
3333333333333333
3333333333333333
3333333333333333
33C3333333333333
3333333333333C33
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
33333333C3333333
3333333333333333
3333333333333333`
    },
    ...generateRotatedSprites('level-carpet-corner', `
3333333333332212
3333333333331121
3333C33333332112
333333333333L221
333333333333LLL2
333333333333222L
333333333333LLLL
333333333333L22L
33333333C3332112
3333333333331111
3333333333332211
3333333333331122
1212LL2L121222LL
2112LLL21212LL2L
12112LL221112L22
12112LL21212LLLL`),
    ...generateRotatedSprites('level-carpet-edge', `
3333333333333333
3333333333333333
3333333333333333
3333333333333333
333C333333333333
3333333333333333
3333333333333333
333333333333C333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
12112LL2121L2L2L
1212LL2L11212LL2
11212L2L12121LL2
121L2L2L1212LLL2`),
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

const spriteTypeChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ' +
    'ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž';

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
