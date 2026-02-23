import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { seedDatabase } from './seedData';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Database Sync and Seed
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models
    await sequelize.sync();

    // Seed data
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
