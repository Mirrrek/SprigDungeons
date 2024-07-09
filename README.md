# Sprig Dungeons

A simple RPG powered by [Sprig](https://github.com/hackclub/sprig).

## Building

1. Clone the repository
    ```
    git clone git@github.com:Mirrrek/SprigDungeons.git && cd SprigDungeons
    ```
2. Install dependencies
    ```
    npm i
    ```
3. Build the project[^1]
    ```
    npm run build
    ```
4. Output is in the `dist` folder!

To run in watch mode (rebuild after any changes), run `npm run dev`.

[^1]: At the moment, the production build doesn't appear to be executable by Sprig. Use `npm run dev` to skip minification.

Beware of the unorganized spaghetti code! I haven't planned this project out in advance too good.
