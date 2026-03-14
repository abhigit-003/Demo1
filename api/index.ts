import app from '../server/src/app';
import sequelize from '../server/src/config/database';

// Initialize connection once per serverless instance
let isDbConnected = false;

export default async function handler(req: any, res: any) {
  if (!isDbConnected) {
    try {
      await sequelize.authenticate();
      console.log('Database connected on Vercel Serverless');
      isDbConnected = true;
    } catch (error) {
      console.error('Database connection error on Vercel:', error);
    }
  }
  
  // Vercel handles the request and passes it to our Express app
  return app(req, res);
}
