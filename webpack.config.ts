import { join } from 'path';
import TypedocWebpackPlugin from 'typedoc-webpack-plugin';

module.exports = {
    target: 'node',
    mode: 'development',
    entry: join(__dirname, 'src/main.ts'),
    node: {
        __dirname: false
    },
    plugins: [
        new TypedocWebpackPlugin({})
    ],
    output: {
        filename: 'main.js',
        path: join(__dirname, 'dist')
    },
    resolve: {
        extensions: [
            '.js',
            '.ts',
            '.tsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /ci/
                ]
            }
        ]
    }
};
