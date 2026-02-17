import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { User, Service, Product } from './models/index';
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import productRoutes from './routes/productRoutes';
import bookingRoutes from './routes/bookingRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import { services, products } from './seedData';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Database Sync and Seed
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models
    await sequelize.sync();

    // Seed if empty
    const serviceCount = await Service.count();
    if (serviceCount === 0) {
      console.log('Seeding services...');
      for (const s of services) {
        const { id, ...data } = s as any;
        await Service.create(data);
      }
    }

    const productCount = await Product.count();
    if (productCount === 0) {
      console.log('Seeding products...');
      for (const p of products) {
        const { id, ...data } = p as any;
        await Product.create(data);
      }
    }

    const userCount = await User.count();
    if (userCount === 0) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            name: 'Demo Provider',
            email: 'provider@raffine.com',
            password: hashedPassword,
            role: 'provider',
            providerProfile: { businessName: 'Raffine Spa' }
        });
        await User.create({
            name: 'Demo User',
            email: 'user@raffine.com',
            password: hashedPassword,
            role: 'user'
        });
        console.log('Seeded demo users (provider@raffine.com / password123)');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
