import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Bid } from 'orm/entities/bids/Bid';
import { Item } from 'orm/entities/items/Item';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ConstsItem } from 'consts/ConstsItem';

export const bid = async (req: Request, res: Response, next: NextFunction) => {
  const { item_id, price } = req.body;

  const userRepository = getRepository(User);
  const itemRepository = getRepository(Item);
  const bidRepository = getRepository(Bid);
  try {
    const user = await userRepository.findOne({ where: { id: req.jwtPayload.id } });
    if (!user) {
      const customError = new CustomError(404, 'General', `User not found.`, ['User not found.']);
      return next(customError);
    }
    if (user.deposit < price) {
      const customError = new CustomError(400, 'General', 'Deposit invalid', []);
      return next(customError);
    }

    const item = await itemRepository.findOne({ where: { id: item_id } });
    if (!item) {
      const customError = new CustomError(400, 'General', 'Item not exists', []);
      return next(customError);
    } else {
      if (item.end_at <= new Date()) {
        const customError = new CustomError(400, 'General', 'Item invalid', []);
        return next(customError);
      }
      if (item.price >= price) {
        const customError = new CustomError(400, 'General', 'Price invalid', []);
        return next(customError);
      }
    }
    const lastBid = await bidRepository.findOne({
      where: { user_id: req.jwtPayload.id },
      order: {
        id: 'DESC',
      },
    });
    if (lastBid && new Date().getTime() - new Date(lastBid.created_at).getTime() <= ConstsItem.LIMIT_TIME_BID_ITEM) {
      const customError = new CustomError(400, 'General', 'Try after several seconds', []);
      return next(customError);
    }
    try {
      user.deposit = user.deposit - price;
      await userRepository.save(user);
      item.price = price;
      await itemRepository.save(item);
      const newBid = new Bid();
      newBid.user_id = req.jwtPayload.id;
      newBid.item_id = item_id;
      newBid.price = price;
      newBid.created_at = new Date();
      await bidRepository.save(newBid);
      res.customSuccess(200, 'Bid successfully created.');
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `Bid can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
