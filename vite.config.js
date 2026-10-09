import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import { apiRouter } from './server/apiRouter.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server',
      configureServer(server) {
        const app = express();
        app.use(express.json());
        app.use('/api', apiRouter);
        server.middlewares.use(app);
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
