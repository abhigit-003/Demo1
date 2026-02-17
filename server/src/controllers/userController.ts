import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Wishlist from '../models/Wishlist';
import Service from '../models/Service';
import Product from '../models/Product';

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

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { serviceId, date } = req.body;
    const booking = await Booking.create({
      userId: req.user?.userId,
      serviceId,
      date,
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

    if (itemType === 'service') data.serviceId = itemId;
    else if (itemType === 'product') data.productId = itemId;
    else {
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
