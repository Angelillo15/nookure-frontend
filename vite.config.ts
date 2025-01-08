import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';
import { ViteImageOptimizer as viteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths(), viteImageOptimizer()],
});
