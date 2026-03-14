import express from 'express';
import cors from 'cors';
import path from 'path';
import './models'; // Import models to initialize associations
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import productRoutes from './routes/productRoutes';
import bookingRoutes from './routes/bookingRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);

// API 404 handler - matches any /api route not caught above
app.all(/^\/api.*$/, (req, res) => {
  res.status(404).json({ error: `API route ${req.originalUrl} not found` });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

export default app;
