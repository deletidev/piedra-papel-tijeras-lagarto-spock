import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
export default defineConfig({
  plugins: [ViteMinifyPlugin({}), ViteImageOptimizer({})],
  base: '',
  root: 'src',
  build: {
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        original: resolve(root, 'original.html'),
        version: resolve(root, 'version.html')
      }
    }
  }
});
