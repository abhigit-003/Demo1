import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const createTestDb = async () => {
  const dbName = 'raffine_test';

  // Default connection to 'postgres' database to perform administrative tasks
  // Adjust the connection string as needed or rely on environment variables
  // If DATABASE_URL is set, we parse it to get host/user/password but change the DB name to 'postgres'

  let connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

  // If the provided URL points to a specific DB, we might want to connect to 'postgres' instead to create a new DB
  // For now, let's assume we can connect to the default 'postgres' database if the user hasn't specified otherwise.
  // A robust way is to replace the database name in the connection string.

  try {
    const url = new URL(connectionString);
    url.pathname = '/postgres'; // Connect to default maintenance DB
    connectionString = url.toString();
  } catch (e) {
    console.warn('Could not parse DATABASE_URL, using default postgres://postgres:postgres@localhost:5432/postgres');
    connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
  }

  const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log(`Connected to database at ${client.host}:${client.port}`);

    // Check if database exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);

    if (res.rowCount === 0) {
      console.log(`Creating database "${dbName}"...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error creating test database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
};

createTestDb();
