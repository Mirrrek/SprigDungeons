const tunes = [
    {
        name: 'move', tune: `
50: F4^50,
1550`
    },
    {
        name: 'shoot', tune: `
50: E4-50 + F4-50 + C4-50 + D4-50 + E5/50,
50: F4-50 + D4-50 + E5/50,
1500`
    },
    {
        name: 'hit', tune: `
60: F4-60 + E4-60 + D4-60 + C4-60,
60: D4-60 + E4-60 + C4-60,
60: C4-60,
1740`
    },
    {
        name: 'spawn', tune: `
50,
50: C4~50,
50: D4~50,
50: E4~50,
50: F4~50,
50: G4~50,
1300`
    },
    {
        name: 'level-start', tune: `
100: D4~100 + E4~100 + F4~100 + G4~100 + C4^100,
100,
100: D4~100 + E4~100 + F4~100 + C4^100,
200,
100: C4^100 + D4~100 + E4~100,
2600`
    },
    {
        name: 'level-cleared', tune: `
83.33333333333333: E4~83.33333333333333,
83.33333333333333: A4~83.33333333333333,
83.33333333333333: D5~83.33333333333333,
83.33333333333333: E5~83.33333333333333,
2333.333333333333`
    }
] as const;

export default function play(name: typeof tunes[number]['name']) {
    playTune(tunes.find((tune) => tune.name === name)!.tune);
}
