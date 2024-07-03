const sprites = [
    ...generateRotatedSprites('level-door', `
3333333333333333
3333333333333333
333FFFFFFFF6F333
3FFFFFFFFFFFFFF3
FF6FFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFF6FFFFFFF6FFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFF6FFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`),
    ...generateRotatedSprites('level-floor-edge', `
................
................
................
................
................
................
................
................
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC9CCC
C9CCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCC9CCCCCCC
CCCCCCCCCCCCCCCC`),
    ...generateRotatedSprites('level-floor-corner', `
........CCCCCCCC
........CCC9CCCC
........CCCCCCCC
........CCCCCCCC
........CCCCCCCC
........CCCCCC9C
........CCCCCCCC
........CCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C9CCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCC9C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`),
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

const spriteTypes: { [key in typeof sprites[number]['name']]: Sprig.SpriteType } = sprites.reduce((acc, sprite, i) => {
    const char = String.fromCharCode(97 + i);
    if (!/^[a-z]$/.test(char)) {
        throw new Error('Too many sprites');
    }

    acc[sprite.name] = char;
    return acc;
}, {} as any);

setLegend(...sprites.map<[Sprig.SpriteType, Sprig.Bitmap]>(({ name, bitmap }) => [spriteTypes[name], bitmap]));

export default function getSprite(name: typeof sprites[number]['name']): Sprig.SpriteType {
    return spriteTypes[name];
}
