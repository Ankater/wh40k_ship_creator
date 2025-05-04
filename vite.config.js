import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
    server: {
        port: 5173,
        host: 'localhost',
        strictPort: true,
        hmr: {
            host: 'localhost',
            port: 5173
        }
    },
    plugins: [
        react({
            include: /\.(js|jsx|ts|tsx)$/,
        }),

        laravel({
            input: ['resources/js/index.tsx'],
            refresh: true,
        }),
    ],

    build: {
        outDir: 'public/build',
        assetsDir: 'assets',
        manifest: true,
        rollupOptions: {
            input: {
                app: 'resources/js/index.tsx'
            }
        }
    },

    publicDir: 'public',

    resolve: {
        alias: {
            '@': resolve('resources/js'),
            '@components': resolve('resources/js/components'),
            '@api': resolve('resources/js/api'),
            '@types': resolve('resources/js/types'),
            '@pages': resolve('resources/js/pages'),
            '@store': resolve('resources/js/store'),
        },
    },

    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom']
    }
});
