import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';

export default defineConfig({
    plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths()],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
});
