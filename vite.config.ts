import { resolve } from "path";
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        zoos: resolve(__dirname, "pages/zoos/zoos.html"),
        map: resolve(__dirname, "pages/map/map.html"),
        contact: resolve(__dirname, "pages/contact_us/contact.html"),
        signin: resolve(__dirname, 'pages/signin/signin.html'),
        register: resolve(__dirname, 'pages/register/register.html')
      }
    }
  }
});
