
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: true,
            }),
            react(),
        ],
        build: {
            outDir: "public/build",
            manifest: 'manifest.json',
            emptyOutDir: false,
            assetsDir: ".", 
            cacheDir: "node_modules/.cache",
            cssCodeSplit: false,
        },
        optimizeDeps: {
            include: ['react', 'react-dom'],
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/src'),
                '@components': path.resolve(__dirname, './resources/src/components'),
                '@lib': path.resolve(__dirname, './resources/src/lib'),
                '@hooks': path.resolve(__dirname, './resources/src/hooks'),
                '@services': path.resolve(__dirname, './resources/src/services'),
                '@types': path.resolve(__dirname, './resources/src/types'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                    secure: false,
                }
            }
        }
    };
});
