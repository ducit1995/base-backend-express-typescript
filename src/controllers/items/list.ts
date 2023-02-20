import { Request, Response, NextFunction } from 'express';
import { getRepository, LessThan, MoreThan } from 'typeorm';

import { Item } from 'orm/entities/items/Item';
import { CustomError } from 'utils/response/custom-error/CustomError';

const list = async (req: Request, res: Response, next: NextFunction) => {
  const itemRepository = getRepository(Item);
  try {
    const items = await itemRepository.find({
      select: ['id', 'name', 'price', 'duration', 'end_at'],
    });
    res.customSuccess(200, 'List of items.', items);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of items.`, null, err);
    return next(customError);
  }
};

const listOngoing = async (req: Request, res: Response, next: NextFunction) => {
  const itemRepository = getRepository(Item);
  try {
    const items = await itemRepository.find({
      where: { end_at: MoreThan(new Date()) },
      select: ['id', 'name', 'price', 'duration', 'end_at'],
    });
    res.customSuccess(200, 'List of items.', items);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of items.`, null, err);
    return next(customError);
  }
};
const listCompleted = async (req: Request, res: Response, next: NextFunction) => {
  const itemRepository = getRepository(Item);
  try {
    const items = await itemRepository.find({
      where: { end_at: LessThan(new Date()) },
      select: ['id', 'name', 'price', 'duration', 'end_at'],
    });
    res.customSuccess(200, 'List of items.', items);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of items.`, null, err);
    return next(customError);
  }
};

export { list, listOngoing, listCompleted };
