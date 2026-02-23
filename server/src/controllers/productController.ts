import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const products = await Product.findAll({
      limit: limit || undefined
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { rating, reviews, ...productData } = req.body;
    const product = await Product.create({ ...productData, providerId: req.user?.userId });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
     if (req.user?.role === 'provider' && product.providerId !== req.user.userId) {
       res.status(403).json({ message: 'Unauthorized' });
       return;
    }

    const { rating, reviews, ...updateData } = req.body;
    await product.update(updateData);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(String(req.params.id));
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
     if (req.user?.role === 'provider' && product.providerId !== req.user.userId) {
       res.status(403).json({ message: 'Unauthorized' });
       return;
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
