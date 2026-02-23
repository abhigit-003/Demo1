import sequelize from '../src/config/database';
import { seedDatabase } from '../src/seedData';

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    // Force sync to clear database and recreate tables
    await sequelize.sync({ force: true });
    // Seed data
    await seedDatabase();
  } catch (error) {
    console.error('Setup failed:', error);
    throw error;
  }
});

afterAll(async () => {
  await sequelize.close();
});
