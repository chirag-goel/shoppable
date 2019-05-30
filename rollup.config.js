import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {
    terser
} from "rollup-plugin-terser";
// delete old typings to avoid issues
require('fs').unlink('dist/index.d.ts', (err) => {});
export default {
    input: 'src/index.ts', // our source file
    output: {
        file: pkg.module,
        dir: './dist',
        format: 'iife'
    },
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        terser() // minifies generated bundles
    ]
};