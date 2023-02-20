import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Item } from 'orm/entities/items/Item';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, duration, price } = req.body;

  const itemRepository = getRepository(Item);
  try {
    const newItem = new Item();
    newItem.name = name;
    newItem.duration = duration;
    newItem.price = price;
    newItem.end_at = new Date(new Date().getTime() + duration * 1000);
    await itemRepository.save(newItem);
    res.customSuccess(200, 'Item successfully created.');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Item can't be created`, null, err);
    return next(customError);
  }
};
