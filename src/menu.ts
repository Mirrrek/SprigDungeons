import { screenWidth, screenHeight } from './constants';
import getSprite, { Color, getColor } from '@/sprites';

export type Menu = {
    type: 'text';
    chunks: { text: string, color: Color }[];
}

export default function menu(chunks: { text: string, color: Color, highlight?: boolean }[]): void {
    const lines = chunks.map(({ text }) => text).join('').split('\n');
    const menuWidth = Math.max(...lines.map((line) => line.length)) + 2;
    const menuHeight = lines.length + 2;

    if (menuWidth > screenWidth || menuHeight > screenHeight) {
        throw new Error('Menu too large');
    }

    for (let y = 0; y < menuHeight; y++) {
        for (let x = 0; x < menuWidth; x++) {
            let sprite = getSprite('menu-background');
            if (x === 0) {
                sprite = getSprite(y === 0 ? 'menu-background-corner-south' : y === menuHeight - 1 ? 'menu-background-corner-east' : 'menu-background-edge-east');
            } else if (x === menuWidth - 1) {
                sprite = getSprite(y === 0 ? 'menu-background-corner-west' : y === menuHeight - 1 ? 'menu-background-corner-north' : 'menu-background-edge-west');
            } else if (y === 0) {
                sprite = getSprite('menu-background-edge-south');
            } else if (y === menuHeight - 1) {
                sprite = getSprite('menu-background-edge-north');
            }

            addSprite(Math.floor((screenWidth - menuWidth) / 2) + x, Math.floor((screenHeight - menuHeight) / 2) + y, sprite);
        }
    }

    clearText();

    let x = 0;
    let y = 0;

    chunks.forEach(({ text, color, highlight }) => {
        const currentLines = text.split('\n');
        currentLines.forEach((line, i) => {
            if (i > 0) {
                x = 0;
                y++;
            }
            const currentLineWidth = lines[y].length;
            if (highlight) {
                for (let j = 0; j < line.length; j++) {
                    let sprite = getSprite('menu-highlight');
                    if (j === 0) {
                        sprite = getSprite('menu-highlight-corner-east');
                    } else if (j === line.length - 1) {
                        sprite = getSprite('menu-highlight-corner-west');
                    }
                    addSprite(Math.floor((screenWidth - menuWidth) / 2) + Math.floor((menuWidth - currentLineWidth) / 2) + x + j, Math.floor((screenHeight - menuHeight) / 2) + 1 + y, sprite);
                }
            }
            addText(line, { x: Math.floor((screenWidth - menuWidth) / 2) + Math.floor((menuWidth - currentLineWidth) / 2) + x, y: Math.floor((screenHeight - menuHeight) / 2) + 1 + y, color: getColor(color) });
            x += line.length;
        });
    });
}
