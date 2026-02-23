import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const sort = req.query.sort as string;

    const options: any = {
      limit: limit || undefined
    };

    if (sort === 'rating') {
      options.order = [['rating', 'DESC']];
    }

    const services = await Service.findAll(options);
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByPk(String(req.params.id));
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { rating, reviews, ...serviceData } = req.body;
    const service = await Service.create({ ...serviceData, providerId: req.user?.userId });
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByPk(String(req.params.id));
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    // Check ownership if provider
    if (req.user?.role === 'provider' && service.providerId !== req.user.userId) {
       res.status(403).json({ message: 'Unauthorized' });
       return;
    }

    const { rating, reviews, ...updateData } = req.body;
    await service.update(updateData);
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByPk(String(req.params.id));
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
     // Check ownership if provider
    if (req.user?.role === 'provider' && service.providerId !== req.user.userId) {
       res.status(403).json({ message: 'Unauthorized' });
       return;
    }

    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
