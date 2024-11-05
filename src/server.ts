import "reflect-metadata";

import express from 'express';
import { AppDataSource } from './db';
import cors from 'cors';

import moviesRoutes from './routes/movies.routes';
import categoriesRoutes from './routes/categories.routes';
import platformsRoutes from './routes/platforms.routes';
import favoriteMoviesRoutes from './routes/favorite.movies.routes';
import authRoutes from './routes/auth.routes';

async function startServer() {
  const app = express();
  
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.use(express.json());

  app.use('/movies', moviesRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/platforms', platformsRoutes);
  app.use('/favorite-movies', favoriteMoviesRoutes);
  app.use('/auth', authRoutes);
  
  const port = process.env.PORT;
  
  await AppDataSource.initialize();
  
  const server = app.listen(port, () => {
    console.log(`⚡ Server is running on http://localhost:${port} ⚡`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
          throw error;
      }

      console.error(`Error starting the server: ${error.message}`);
      process.exit(1);
  });

  console.log('Database connected');
}

startServer();