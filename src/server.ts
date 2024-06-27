import express, { Request, Response } from 'express';
import { AppDataSource } from './db';
import moviesRoutes from './routes/movies.routes';
import categoriesRoutes from './routes/categories.routes';
import platformsRoutes from './routes/platforms.routes';

async function startServer() {
  // Create an Express application
  const app = express();
  
  app.use(express.json());
  
  app.use('/movies', moviesRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/platforms', platformsRoutes);
  
  // Set the port number for the server
  const port: number = 3001;
  
  // Define a route for the root path ('/')
  app.get('/', (req, res) => {
    // Send a response to the client
    res.send('Hello, TypeScript + Node.js + Express!');
  });
  
  // Start the server and listen on the specified port
  
  await AppDataSource.initialize();
  
  const server = app.listen(port, () => {
    // Log a message when the server is successfully running
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