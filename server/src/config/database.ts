import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

let dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/raffine';

if (isTest) {
  try {
    const url = new URL(dbUrl);
    url.pathname = '/raffine_test';
    dbUrl = url.toString();
    console.log(`Test environment detected. Using database: ${dbUrl}`);
  } catch (e) {
    console.warn('Could not parse DATABASE_URL for test modification. Using provided URL.');
  }
}

console.log(`Initializing database connection... Environment: ${process.env.NODE_ENV}`);

const sequelize = new Sequelize(dbUrl, {
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

export default sequelize;
