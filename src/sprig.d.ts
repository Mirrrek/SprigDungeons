declare namespace Sprig {
    // Types
    type SpriteType = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
    type InputType = 'w' | 'a' | 's' | 'd' | 'i' | 'j' | 'k' | 'l';

    // Classes
    interface Tile {
        x: number;
        y: number;
    }

    interface Sprite {
        type: SpriteType;
        x: number;
        y: number;

        remove(): void;
    }

    interface Playback {
        end(): void;
    }

    // Objects
    interface Bitmap { }
    interface Map { }
    interface Color { }
    interface Tune { }
}

// Object constructors
declare function bitmap(data: TemplateStringsArray): Sprig.Bitmap;
declare function map(data: TemplateStringsArray): Sprig.Map;
declare function color(data: TemplateStringsArray): Sprig.Color;
declare function tune(data: TemplateStringsArray): Sprig.Tune;

// Functions
declare function setLegend(...bitmaps: [Sprig.SpriteType, Sprig.Bitmap][]): void;
declare function setBackground(type: Sprig.SpriteType): void;
declare function setMap(map: Sprig.Map): void;
declare function setSolids(types: Sprig.SpriteType[]): void;
declare function setPushables(pushables: { [type in Sprig.SpriteType]?: Sprig.SpriteType[] }): void;
declare function width(): number;
declare function height(): number;

declare function onInput(type: Sprig.InputType, callback: () => void): void;
declare function afterInput(callback: () => void): void;

declare function getTile(x: number, y: number): Sprig.SpriteType[];
declare function tilesWith(...types: Sprig.SpriteType[]): Sprig.Tile[];
declare function addSprite(x: number, y: number, type: Sprig.SpriteType): void;
declare function clearTile(x: number, y: number): void;
declare function getAll(type?: Sprig.SpriteType): Sprig.Sprite[];
declare function getFirst(type: Sprig.SpriteType): Sprig.Sprite | undefined;

declare function addText(text: string, options: { x: number, y: number, color: Sprig.Color }): void;
declare function clearText(): void;

declare function playTune(tune: Sprig.Tune, repeat?: number): Sprig.Playback;
