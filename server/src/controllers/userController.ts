import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Wishlist from '../models/Wishlist';
import Service from '../models/Service';
import Product from '../models/Product';
import User from '../models/User';

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user?.userId },
      include: [Service],
      order: [['date', 'ASC']]
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProviderBookings = async (req: Request, res: Response) => {
  try {
    // Find all services owned by this provider
    const services = await Service.findAll({
      where: { providerId: req.user?.userId },
      attributes: ['id']
    });

    const serviceIds = services.map(s => s.id);

    if (serviceIds.length === 0) {
      res.json([]);
      return;
    }

    const bookings = await Booking.findAll({
      where: { serviceId: serviceIds },
      include: [
        { model: Service },
        { model: User, attributes: ['id', 'name', 'email'] }
      ],
      order: [['date', 'ASC']]
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { serviceId, date } = req.body;

    // Validate date
    if (!date || isNaN(Date.parse(date))) {
      res.status(400).json({ message: 'Invalid date format' });
      return;
    }

    const service = await Service.findByPk(serviceId);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    const booking = await Booking.create({
      userId: req.user?.userId,
      serviceId,
      date: new Date(date),
      status: 'pending'
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId: req.user?.userId },
      include: [Service, Product]
    });
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { itemId, itemType } = req.body;
    const data: any = { userId: req.user?.userId };

    if (itemType === 'service') {
      const service = await Service.findByPk(itemId);
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }
      data.serviceId = itemId;
    } else if (itemType === 'product') {
      const product = await Product.findByPk(itemId);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      data.productId = itemId;
    } else {
      res.status(400).json({ message: 'Invalid item type' });
      return;
    }

    const [item, created] = await Wishlist.findOrCreate({
      where: data,
      defaults: data
    });

    if (!created) {
      res.status(200).json({ message: 'Already in wishlist' });
      return;
    }
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { type } = req.query;

    const where: any = { userId: req.user?.userId };
    if (type === 'service') where.serviceId = itemId;
    else if (type === 'product') where.productId = itemId;
    else {
         res.status(400).json({ message: 'Type query param required (service/product)' });
         return;
    }

    await Wishlist.destroy({ where });
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
