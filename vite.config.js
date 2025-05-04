import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import {resolve} from "node:path";
import * as path from "node:path";

export default defineConfig({
    plugins: [
        react[{ include: /\.[js|jsx|ts|tsx]$/ }],
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            resolve: { alias: { '@': path.resolve(__dirname, './js'),
                    '@components': resolve(__dirname, './js/components'),  },
            },
        }),
    ],
});
