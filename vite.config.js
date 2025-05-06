import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5174,
        strictPort: true,
        hmr: {
            host: 'localhost',
            port: 5174,
        },
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        react(),
        laravel({
            input: ['resources/js/index.tsx'],
            refresh: true,
        }),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
    },
    build: {
        outDir: 'public/build',
        assetsDir: 'assets',
        manifest: true,
        rollupOptions: {
            input: 'resources/js/index.tsx',
        },
    },
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
        include: ['react', 'react-dom', 'react-router-dom'],
    },
});