const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    use: 'ts-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        output: {
            filename: 'sprig-dungeons.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        optimization: {
            minimizer: [new TerserPlugin({
                terserOptions: {
                    compress: false
                }
            })]
        },
        watch: isDevelopment
    }
};
