import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    cors: true,
    fs: {
      allow: ['.']
    },
    watch: {
      ignored: ['**/Portofolio/**', '**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.mp4']
    }
  }
});
