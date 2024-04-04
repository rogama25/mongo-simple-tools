import topLevelAwait from "vite-plugin-top-level-await";
import {defineConfig} from "vite";
import includeHtml from "vite-include-html-plugin";
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        topLevelAwait({
            // The export name of top-level await promise for each chunk module
            promiseExportName: "__tla",
            // The function to generate import names of top-level await promise in each chunk module
            promiseImportName: i => `__tla_${i}`
        }),
        includeHtml()
    ],
    "root": "src",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                ejson: resolve(__dirname, 'src/ejson/index.html'),
            },
        },
        outDir: "../dist"
    },
    base: "/"
});