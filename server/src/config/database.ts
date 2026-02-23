import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

let sequelize: Sequelize;

const dbUrl = process.env.DATABASE_URL;

if (dbUrl) {
  let finalDbUrl = dbUrl;
  if (isTest) {
    try {
      const url = new URL(dbUrl);
      url.pathname = '/raffine_test';
      finalDbUrl = url.toString();
      console.log(`Test environment detected. Using database: ${finalDbUrl}`);
    } catch (e) {
      console.warn('Could not parse DATABASE_URL for test modification. Using provided URL.');
    }
  }

  console.log(`Initializing database connection using PostgreSQL... Environment: ${process.env.NODE_ENV}`);
  sequelize = new Sequelize(finalDbUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: isProduction ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  });
} else {
  // Fallback to SQLite
  const storage = isTest ? ':memory:' : 'database.sqlite';
  console.log(`Initializing database connection using SQLite (${storage})... Environment: ${process.env.NODE_ENV}`);
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage,
    logging: false
  });
}

export default sequelize;
