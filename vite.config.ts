import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Allow local network access
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
});
